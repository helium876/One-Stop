angular.module('oneStop.controllers', [
  
])

.controller('AuthCtrl', function($scope) {

})

.controller('MainCtrl', function($scope,$state, $firebaseObject, $rootScope) {
	var ref = firebase.database().ref('drivers/');
	var list = ref.push();
	$scope.drivers = $firebaseObject(ref);

	$scope.getData = function(key){
	    var lastKnownKey = null;
	    var fq = ref.orderByKey().limitToFirst(10);
	    var count = 0;
	    var uID = null;
	    fq.once('value', function(snapshot) {
	      snapshot.forEach(function(childSnapshot) {
	        lastKnownKey = childSnapshot.key;
	        if (count == key) {
	          uID = childSnapshot.key;
	        }
	        count++;
	      });
	      // console.log(uID);
	      $rootScope.uID = uID;
	    }).then(function(data){
	      $state.go('app.map');

	    }).catch(function(error){
	      console.log(error);
	    })
	  }
})

.controller('MapCtrl', function($scope, $state, $firebaseObject, $rootScope) {

	var ref = firebase.database().ref('drivers/');
	ref.once("value")
	  .then(function(snapshot) {
	    $scope.childKey = snapshot.child($rootScope.uID).val(); 
	    var latLng = new google.maps.LatLng($scope.childKey.latitude, $scope.childKey.longitude);

	    var mapOptions = {
	      center: latLng,
	      zoom: 15,
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      disableDefaultUI: true,
	      styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
	    };

	    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

	    //Wait until the map is loaded
	    google.maps.event.addListenerOnce($scope.map, 'idle', function(){


	      $scope.marker = new google.maps.Marker({
	          map: $scope.map,
	          animation: google.maps.Animation.DROP,
	          position: latLng,
	          icon: {
			    url: 'img/mark.png',
			    scaledSize : new google.maps.Size(33, 42)
			  }
	      });      

	      var infoWindow = new google.maps.InfoWindow({
	          content: "Driver Here"
	      });

	      google.maps.event.addListener($scope.marker, 'click', function () {
	          infoWindow.open($scope.map, $scope.marker);
	      });
	    });
    });

	ref.on('value', function(snapshot) {
		
		// setMapOnAll(null);
		$scope.childKey = snapshot.child($rootScope.uID).val();

		var latLng = new google.maps.LatLng($scope.childKey.latitude, $scope.childKey.longitude);
		try{
			$scope.marker.setPosition(latLng);
		}
		catch(e){
			
		}
		// $scope.marker = new google.maps.Marker({
	 //          map: $scope.map,
	 //          animation: google.maps.Animation.DROP,
	 //          position: latLng,
	 //          icon: {
		// 	    url: 'img/mark.png',
		// 	    scaledSize : new google.maps.Size(33, 42)
		// 	  }
	 //     });

	});

});
