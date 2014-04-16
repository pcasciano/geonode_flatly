var leafletMap;
var geoLayer = 0;

var danger_scale =[{
    name:'DEBOLE',
    value: 1,
    color: '#CBFE65'
},{
    name:'MODERATO',
    value: 2,
    color: '#FEFE00'
},{
    name:'MARCATO',
    value: 3,
    color: '#FE9800'
},{
    name:'FORTE',
    value: 4,
    color: '#FE0000'
},{
    name:'MOLTO FORTE',
    value: 5,
    color: '#FE0000'
}];


$('.nav-stacked li a').on('click', function(e){
    e.preventDefault();
    var lnk=$(this).attr('href');
    highlightMenu(lnk);
    loadGeoJSON(null,null,lnk);
});


/**
 * Creates a danger scale legend
 * @method createLegend
 * @param {} position
 * @return
 */
var createLegend = function(position){
    var legend='<table class="popup_legend"><tr>';

    var legendRow='<tr border="1">';

    for (var i=0; i<danger_scale.length;i++)
        {
            if (i!==position-1)
                {
                    legend+='<td></td>';
                }
            else
                legend+='<td align="center"><img src="/static/img/marker.png" /></td>';
            legendRow+='<td style="background-color:'+danger_scale[i].color+';">'+danger_scale[i].name+'</td>';
        }

    legend+='</tr>'+legendRow+'</tr></table>';
    return legend;
};


/**
 * Highlights a "Bollettini" menu element
 * @method highlightMenu
 * @param {} el menu href element
 * @return
 */
var highlightMenu = function(el){
    $('.nav-stacked li').each(function(index){
        if ($(this).children('a').attr('href') === el)
        {
            $(this).addClass('active');
        }
        else
        {
            $(this).removeClass('active');
        }
    });
};

/**
 * Loads a geojson data file in the map
 * @method loadGeoJSON
 * @param {} map Object that contains the leaflet map
 * @param {} options
 * @param {} url geojson data file url
 * @return
 */
var loadGeoJSON  = function(map, options,url){



    if (typeof map === 'object' && map !== null)
        leafletMap = map;
    else
        {
            map = leafletMap;
            if (map.hasLayer(geoLayer))
                {
                    map.removeLayer(geoLayer);
                }
        }


    if (typeof url === 'undefined')
       url ='oggi';
    var dataurl = '/'+url+'.geojson';

    $.getJSON(dataurl, function (data) {
        // Add GeoJSON layer
        geoLayer = L.geoJson(data,{
            /**
             * creates a css style for features
             * @method style
             * @param {} feature Object feature
             * @return
             */
            style: function(feature){
                if (typeof feature.properties.pericolo ==='string')
                {
                    if(feature.properties.pericolo!=='-1')
                    {
                        for (var i=0; i<danger_scale.length; i++)
                        {
                            if (feature.properties.pericolo ==danger_scale[i].value)
                                return {color: danger_scale[i].color};
                        }
                    }
                    else
                    {
                        return {color: '#C0C0C0'};
                    }
                }
            },
            /**
             * Binds a popup for each feature of the layer
             * @method onEachFeature
             * @param {} feature Object feature
             * @param {} layer Object layer
             * @return
             */
            onEachFeature: function(feature, layer){
                if (feature.properties && feature.properties.nome){
                    layer.bindPopup(feature.properties.nome);
                    layer.on({
                        /**
                         * Shows a popup with icon on mouseover event
                         * @method mouseover
                         * @param {} e
                         * @return
                         */
                        mouseover: function(e){
                            var gradoDiPericolo=parseInt(feature.properties.pericolo);

                            if (gradoDiPericolo > 0)
                            {

                                var danger={};
                                for (var i=0; i<danger_scale.length; i++ )
                                {
                                    if (danger_scale[i].value === gradoDiPericolo)
                                    {
                                        danger=danger_scale[i];
                                        break;
                                    }
                                }

                                var img='<img src="/static/img/' + gradoDiPericolo + '.png" />';

                                var trend_img='<img src="/static/img/up.png" />';
                                if (feature.properties.trend==='-1')
                                    trend_img='<img src="/static/img/down.png" />';
                                else if (feature.properties.trend==='0')
                                    trend_img='<img src="/static/img/equal.png" />';

                                var header = '<div class="popup_header" style="background-color:'+danger.color+';">'+img+'<span class="popup_header_text">'+feature.properties.nome+'<br><div class="popup_danger_text">'+danger.value+' - '+danger.name+'</div></span><span class="popup_header_trend">'+trend_img+'</span></div>';


                                var note = '<div class="popup_note"><hr>';
                                if (typeof feature.properties.note==='string' && feature.properties.note!==null)
                                    note += feature.properties.note;
                                note+='</div>';

                                var popup = L.popup({autoPan:false})
                                        .setLatLng(e.latlng)
                                        .setContent('<div class="popup_box">'+header + note+ createLegend(gradoDiPericolo)+'</div>')
                                        .openOn(map);
                            }

                        }
                    });
                }

            }
        });
        geoLayer.addTo(map);
    });
};
