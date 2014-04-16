from django.conf.urls import patterns, url
from geonode.urls import *
from djgeojson.views import GeoJSONLayerView
from bollettini.models import *


class MapLayer(GeoJSONLayerView):
    # Options
    precision = 2   # float
    simplify = 0.5  # generalization
    properties =['nome','area','pericolo','note','trend','id'] #filter properties
    
urlpatterns = patterns('',

    # Static pages
    url(r'^$', 'geonode.views.index', {'template': 'site_index.html'}, name='home'),
    
    url(r'^bollettini/', 'geonode.views.index', {'template': 'bollettini/index.html'}, name='leaflet'),
    url(r'^dopodomani.geojson$', MapLayer.as_view(model=BollettinoDopodomani), name='dopodomani-data'),
    url(r'^domani.geojson$', MapLayer.as_view(model=BollettinoDomani), name='domani-data'),
    url(r'^oggi.geojson$', MapLayer.as_view(model=BollettinoOggi), name='oggi-data'),    
    
 ) + urlpatterns
