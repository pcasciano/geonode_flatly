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

(example: user: geonode, pwd: geonode)


Now geonode is running and accessible at http://localhost


Leaflet integration
-------------------


Install django-leaflet::

  $ sudo pip install django-leaflet

Install django-geojson::

  $ sudo pip install django-geojson



Create a custom project
-----------------------

Create a custom project (geonode_flatly) from geonode project template::

  $ cd /home/user/

  $ django-admin startproject geonode_flatly --template=https://github.com/pcasciano/geonode_flatly/archive/master.zip -epy,rst

  $ cd geonode_flatly

  $ python manage.py syncdb


Edit /etc/apache2/sites-available/geonode

and change WSGIScriptAlias / /var/www/geonode/wsgi/geonode.wsgi
to WSGIScriptAlias / /home/user/geonode_flatly/my_geonode/wsgi.py

and restart apache server::

  $ sudo service apache2 restart

Now you have a custom geonode project running at http://localhost


Look and Feel Customization
---------------------------

Bootswatch flatly theme is already configured, but if you modify something
in /my_genode/static dir, do not forget to apply changes with::

  $ python manage.py collectstatic
