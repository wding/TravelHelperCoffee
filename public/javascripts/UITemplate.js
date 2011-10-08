(function() {
  window.UITemplate = '\
\
<style type="text/css">\
h2 {\
	margin-left: 0 !important;\
	font-size: 18px;\
	font-weight: bold;\
}\
\
#car-placeholder table {\
	border-collapse: collapse;\
}\
\
#car-placeholder tr {\
	border: 1px gray solid;\
}\
\
#car-placeholder td {\
	padding: 3px;\
}\
\
table tr th {\
	color: #000 !important;\
	font-weight: bold !important;\
	height: 2em !important;\
	padding: 2px 4px !important;\
	text-align: left !important;\
	white-space: nowrap !important;\
}\
\
#travelplanner {\
	text-align: left;\
	margin: 10px;\
	padding: 0px 20px 20px;\
	background: none repeat scroll 0% 0% white;\
	border: 5px dotted grey;\
}\
\
#cars-form,#email,#itenary-footer {\
	border: 1px #cccccc solid;\
	background-color: #F2F2F2;\
	padding: 20px;\
	margin-bottom: 20px;\
	width: 80%;\
}\
</style>\
\
<div id="travelplanner" align="left">\
  <h1>Travel Planner</h1>\
\
  <div id="contact">\
    <h2>Contact Details for {{passengerName}}</h2>\
    <span class="formLabel">mobile:</span>\
    <input id="mobileNumber" value="{{mobileNumber}}" />\
    <br /><br />\
  </div>\
\
  <div id="cars-form">\
	<h2>Cars</h2>\
	\
	<table border="0" width="660px" cellspacing="1px" cellpadding="2px">\
		{{#flights}}\
    	<tr>\
			<td colspan="4">\
				<input type="hidden" class="flightNumbers" value="{{flightNumberNoWS}}" />\
				<input type="hidden" id="origin-airport-{{flightNumberNoWS}}" value="{{origin}} Domestic Airport" />\
				<input type="hidden" id="destination-airport-{{flightNumberNoWS}}" value="{{destination}} Domestic Airport" />\
				<input type="hidden" id="origin-datetime-{{flightNumberNoWS}}" value="{{departureTime}} {{formattedDepartureDate}}" />\
				<input type="hidden" id="destination-datetime-{{flightNumberNoWS}}" value="{{arrivalTime}} {{formattedArrivalDate}}" />\
			</td>\
		</tr>\
		<tr>\
			<td>To <b>{{origin}} Domestic Airport</b> from</td>\
			<td><input onchange="return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')"  id="origin-{{flightNumberNoWS}}" type="text" size="35" /></td>\
			<td>will take <input onchange="return UtilScraper.get().handleOnChange(\'origin\', \'{{flightNumberNoWS}}\')" id="origin-cartraveltime-{{flightNumberNoWS}}" type="text" size="5" value="30" /> minutes</td>\
			<td><a href="javascript:void(0)" onclick="return UtilScraper.get().queryGoogleMap($(\'input#origin-{{flightNumberNoWS}}\').val(), $(\'input#destination-{{flightNumberNoWS}}\').val()))">Ask Google about travel time</a>&nbsp;<span id="google-travel-response"></span></td>\
		</tr>\
        <tr>\
            <td>From <b id="destination-airport-{{flightNumberNoWS}}">{{destination}} Domestic Airport</b> to</td>\
            <td colspan="3"><input id="destination-{{flightNumberNoWS}}" onchange="return UtilScraper.get().handleOnChange(\'destination\', \'{{flightNumberNoWS}}\')" type="text" size="35" /></td>\
        </tr>\
		{{/flights}}\
		<tr>\
            <td>All cars before flight should arrive</td>\
			<td colspan="3"><input onchange="return UtilScraper.get().handleOnChangeAll()" id="arrive-before" type="text" size="5" value="45" /> minutes early to airports</td>\
		</tr>\
	</table>\
\
	<div id="car-placeholder">\
    	<h2>Contact Drivers</h2>\
        <p id="car-content">Waiting for Google to respond..</p>\
    </div>\
  </div>\
\
  <div id="email">\
    <h2>Itinerary</h2>\
    <b>Flight Booking Reference: </b> {{reservationNumber}}<br />\
    -----------------------------------------------------------------------<br /><br />\
    Travel Itinerary For:\
    <br/>\
    <span id="passengerName"> {{passengerName}} </span>\
    <span id="mobileNumber"> {{mobileNumber}} </span><br />\
    -----------------------------------------------------------------------<br /><br />\
    <div id="flights">\
    {{#flights}}\
      \
	  <div id="origin-travelinfo-{{flightNumberNoWS}}"></div>\
      \
	  <strong>Flight Time {{departureTime}} {{formattedDepartureDate}}</strong><br />\
      Flight No: {{airline}} {{flightNumber}}<br />\
      Depart: {{departureDate}} {{departureTime}} - {{origin}} Domestic Airport<br />\
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} Domestic Airport\
	  <br /><br />\
 	  <div id="destination-travelinfo-{{flightNumberNoWS}}"></div>\
      \
	{{/flights}}\
    </div>\
  </div>' + window.UIFooterTemplate + '</div>';
}).call(this);
