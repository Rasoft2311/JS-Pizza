$(function () {

    function	initialize()	{
//Тут починаємо працювати з картою
        var mapProp =	{
            center:	new	google.maps.LatLng(50.464379,30.519131),
            zoom:	11
        };
        var html_element =	document.getElementById("googleMaps");
        var map	=	new	google.maps.Map(html_element,	 mapProp);
//Карта створена і показана

        var point	=	new	google.maps.LatLng(50.464379,30.519131);
        var marker	=	new	google.maps.Marker({
            position:	point,

            map:	map,
            icon:	"assets/images/map-icon.png"
        });


        function	geocodeLatLng(latlng,	 callback){
//Модуль за роботу з адресою
            var geocoder	=	new	google.maps.Geocoder();
            geocoder.geocode({'location':	latlng},	function(results,	status)	{
                if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
                    var adress =	results[1].formatted_address;
                    callback(null,	adress);
                }	else	{
                    callback(new	Error("Can't	find	adress"));
                }
            });
        }


        function	geocodeAddress(address,	 callback)	{
            var geocoder	=	new	google.maps.Geocoder();
            geocoder.geocode({'address':	address},	function(results,	status)	{
                if	(status	===	google.maps.GeocoderStatus.OK&&	results[0])	{
                    var coordinates	=	results[0].geometry.location;
                    callback(null,	coordinates);
                }	else	{
                    console.log("Cant find adress");
                }
            });
        }

        $("#inputAdress").keyup (function () {
            geocodeAddress($("#inputAdress").val(),function (err, coordinates) {
                if(err)console.log("Cant find adress");
                else {
                    calculateRoute(coordinates,point,function(err,time){
                        console.log("Not found");
                        if(!err)
                        {
                            $(".address-group").addClass("has-success");
                            $(".address-group").removeClass("has-error");
                            $(".address-help-block").css("display","none");
                            $(".neededAdress").text($("#inputAdress").val());
                            $(".timeToGet").text(time.duration.text);


                            marker.setMap(null);
                            directionsDisplay.set('directions', null);

                            var request = {
                                origin: coordinates, //точка старта
                                destination: point, //точка финиша
                                travelMode: google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
                            };

                            var directionsService =	new	google.maps.DirectionsService();
                            directionsService.route(request, function(response, status) {
                                if (status == google.maps.DirectionsStatus.OK) {
                                    directionsDisplay.setDirections(response);
                                }
                            });

                            directionsDisplay.setMap(map);





                        }
                        else{

                            $(".address-group").addClass("has-error");
                            $(".address-group").removeClass("has-success");
                            $(".address-help-block").css("display","block");

                        }

                    });


                }
            });
        });


        function	calculateRoute(A_latlng,	 B_latlng,	callback)	{
            var directionService =	new	google.maps.DirectionsService();
            directionService.route({
                origin:	A_latlng,
                destination:	B_latlng,
                travelMode:	google.maps.TravelMode["DRIVING"]
            },	function(response,	status)	{
                if	(	status	==	google.maps.DirectionsStatus.OK )	{
                    var leg	=	response.routes[	0	].legs[	0	];
                    callback(null,	{
                        duration:	leg.duration
                    });
                }	else	{
                    callback(new	Error("Can'	not	find	direction"));
                }
            });
        }




        var directionsDisplay = new google.maps.DirectionsRenderer();
        google.maps.event.addListener(map,
            'click',function(me){
                var coordinates	=	me.latLng;
                geocodeLatLng(coordinates,	function(err,	adress){
                    if(!err)	{
                        calculateRoute(coordinates,point,function(err,time){
                            console.log(time.duration.text);
                            $(".timeToGet").text(time.duration.text);
                            $(".neededAdress").text(adress);

                        });


                        marker.setMap(null);
                        directionsDisplay.set('directions', null);

                        var request = {
                            origin: coordinates, //точка старта
                            destination: point, //точка финиша
                            travelMode: google.maps.DirectionsTravelMode.DRIVING //режим прокладки маршрута
                        };

                        var directionsService =	new	google.maps.DirectionsService();
                        directionsService.route(request, function(response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                            }
                        });

                       directionsDisplay.setMap(map);



                        console.log(adress);
                    }	else	{
                        console.log("Немає адреси")
                    }
                })
            });
    }

    google.maps.event.addDomListener(window,	 'load',	initialize);











});
