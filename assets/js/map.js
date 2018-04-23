/**
 * http://usejsdoc.org/
 */
$(document).ready(function() {
	$('#kaerimasu').click(function() {
		$.ajax({
			type : 'PATCH',
			url : '/user/1',
			data : {status:1},
			success : function() {
			},
			dataType : 'json'
		});
		//document.form.submit();
	});
	$('#kaerimasita').click(function() {
		$.ajax({
			type : 'PATCH',
			url : '/user/1',
			data : {status:0},
			success : function() {
			},
			dataType : 'json'
		});
		//document.form.submit();
	});
});

function initMap() {
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : -34.397,
			lng : 150.644
		},
		zoom : 20
	});
	directionsDisplay.setMap(map);
	var infoWindow = new google.maps.InfoWindow({
		map : map
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation
				.getCurrentPosition(
						function(position) {
							var pos = {
								lat : position.coords.latitude,
								lng : position.coords.longitude
							};
							infoWindow.setPosition(pos);
							infoWindow.setContent('現在位置');

							map.setCenter(pos);

							directionsService
									.route(
											{
												origin : pos,
												destination : '大阪狭山市駅',
												travelMode : 'DRIVING'
											},
											function(response, status) {
												if (status === 'OK') {
													var data = {
														'start_address' : response.routes[0].legs[0].start_address,
														'duration' : response.routes[0].legs[0].duration,
														'distance' : response.routes[0].legs[0].distance
													}
													console.log(response);
													$.ajax({
														type : 'PATCH',
														url : '/user/1',
														data : data,
														success : function() {
														},
														dataType : 'json'
													});

													directionsDisplay
															.setDirections(response);
												} else {
													window
															.alert('Directions request failed due to '
																	+ status);
												}
											});

							console.log(pos);
						}, function(error) {
							console.log(error);
							handleLocationError(true, infoWindow, map
									.getCenter());
						});
	}
}