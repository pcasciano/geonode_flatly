Geonode 2.0  installation on ubuntu server 12.10 with Leaflet
=============================================================

Note: all of these instructions are done with an user (user) that has this configuration in
/etc/sudoers:

user ALL=(ALL:ALL) ALL


Installation
------------

Install geonode with::

   $ sudo add-apt-repository ppa:geonode/release


if don't have add-apt-repository command install it with::

   $ sudo apt-get install software-properties-common


This repository is for Ubuntu 12.04!
To allow installation on Ubuntu 12.10 you must edit /etc/apt/sources.list.d/geonode-release-quantal.list
and change "quantal" word with "precise"

and then::

   $ sudo apt-get update

   $ sudo apt-get install geonode



First Configuration
-------------------

Set ip address and create a super user::

  $ sudo geonode-updateip 127.0.0.1

  $ geonode createsuperuser

(example: user: geonode, pwd: geo)


Now geonode is running and accessible at http://localhost



Leaflet integration
-------------------


Install django-leaflet::

  $ pip install django-leaflet

Install django-geojson::

    $ pip install django-geojson


add in local_settings.py this minimal leaflet configuration :
.. sourcecode::

   LEAFLET_CONFIG = {
    'SPATIAL_EXTENT': (4.52, 46.96, 19.90, 37.21), #Italy extent
    'RESET_VIEW': False,
}

and in settings.py:
.. sourcecode::
   INSTALLED_APPS += (
     'leaflet',
     'djgeojson',
   )











Create a custom project
-----------------------

Create a custom project (my_geonode) from geonode project template::

  $ cd /home/user/

  $ django-admin startproject my_geonode --template=https://github.com/GeoNode/geonode-project/archive/master.zip -epy,rst

  $ sudo pip install my_geonode

  $ mv my_geonode/my_geonode/local_settings.py.sample my_geonode/my_geonode/local_settings.py


Edit /etc/apache2/sites-available/geonode

and change WSGIScriptAlias / /var/www/geonode/wsgi/geonode.wsgi
to WSGIScriptAlias / /home/user/my_geonode/my_geonode/wsgi.py

and restart apache server::

  $ sudo service apache2 restart

Now you have a custom geonode project running at http://localhost


Look and Feel Customization
---------------------------

Delete all my_geonode/static contents
Copy BLOCKS/assets/* in my_geonode/static

Change templates

apply with::

  $ python manage.py collectstatic
