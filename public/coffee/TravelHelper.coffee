#javascript:(function(){document.body.appendChild(document.createElement('script')).src='** your external file URL here **';})();


window.TravelHelper = class TravelHelper
  constructor: () ->
    @uiTemplate=' 
<div id="travelplanner">
  <h1>travel planner</h1>

  <div id="contact">
    <h2>Contact Details for {{passengerName}}</h2>
    <span class="formLabel">mobile:</span>
    <input id="mobileNumber" value="{{mobileNumber}} />
    <br/>
  </div>

  <div id="email">
    <h2>Itinerary</h2>
    <b>Flight Booking Reference: </b> {{reservationNumber}}
    <br/>
    -----------------------------------------------------------------------
    <br/>
    Travel Itinerary For:
    <br/>
    <span id="passengerName"> {{passengerName}} </span>
    <span id="mobileNumber"> </span>
    <br/>
    -----------------------------------------------------------------------
    <div id="flights">
    {{#flights}}
      <b> Flight Time {{departureTime}} {{departureDate}} </b>
      <br/>
      Flight No: {{airline}} {{flightNumber}}
      <br/>
      Depart: {{departureDate}} {{departureTime}} - {{origin}} Domestic Airport
      <br/>
      Arrive: {{arrivalDate}} {{arrivalTime}} - {{destination}} Domestic Airport
      <br/>
    {{/flights}}
    </div>

  </div>

</div>
'

  createView: (screenScraper) ->
    passenger = screenScraper.passenger()
    flights   = screenScraper.flights()
    view = 
      passengerName:     passenger.name
      mobileNumber:      passenger.mobileNumber
      reservationNumber: passenger.reservationNumber
      flights:           flight.toJSON for flight in flights
    view
                

  run: () ->
    v = new VirginScraper()

    view = @createView v
    
    inputForm = Mustache.to_html(@uiTemplate, view);

    ($ 'body').prepend inputForm


th = new TravelHelper()
th.run()

