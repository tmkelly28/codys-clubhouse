function initMap () {
  var greenwood = {lat: 40.6588982, lng: -73.9818774}
  var dumbo = {lat: 40.704301, lng: -73.987734}
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
  var map1 = new google.maps.Map(document.getElementById('map-1'), {
    zoom: 14,
    center: dumbo,
    styles: styles
  })
  var marker1 = new google.maps.Marker({
    position: dumbo,
    map: map1
  })

  var map2 = new google.maps.Map(document.getElementById('map-2'), {
    zoom: 14,
    center: greenwood,
    styles: styles
  })
  var marker2 = new google.maps.Marker({
    position: greenwood,
    map: map2
  })
}
