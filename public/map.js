function initMap () {
  var greenwood = {lat: 40.6588982, lng: -73.9818774}
  var styles = [
    {
      'featureType': 'landscape.natural',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'color': '#e0efef'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'hue': '#1900ff'
        },
        {
          'color': '#c0e8e8'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'lightness': 100
        },
        {
          'visibility': 'simplified'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'labels',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'geometry',
      'stylers': [
        {
          'visibility': 'on'
        },
        {
          'lightness': 700
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'all',
      'stylers': [
        {
          'color': '#7dcdcd'
        }
      ]
    }
  ]
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: greenwood,
    styles: styles
  })
  var marker = new google.maps.Marker({
    position: greenwood,
    map: map
  })
}
