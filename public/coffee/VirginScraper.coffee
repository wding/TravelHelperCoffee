window.VirginScraper = class VirginScraper
  util = UtilScraper.get() 
 
  constructor: () ->
 
  isReady: () ->
    index = ($ document).text().toLowerCase().indexOf("virgin") 
    if index != -1
      console.log('VirginScraper:: VirginScraper is ready for action')
      true
    else
      console.log('VirginScraper:: VirginScraper is NOT ready for action, the target page is not Virgin')
      false

  name: () ->
    "VirginScraper"

  carGoogleSpreadsheetAjaxCallback: (cells) ->
    carHtml = ""
    i = 0
    while i < cells.length
      city = cells[i].content.$t
      company = cells[i + 1].content.$t
      contact = cells[i + 2].content.$t
      phone = cells[i + 3].content.$t
      string = city + ' | ' + company + ' | ' + contact + ' | ' + phone
      console.log string
      carHtml = carHtml + string + '<br />'
      i = i + 4
    ($ "div#car-placeholder").html carHtml

  getCarGoogleSpreadsheetAsJson: () ->
    util.getGoogleSpreadsheetAsJson 'pgZYLtdPRv51beYTHUIrFWg', 'od6', this, @carGoogleSpreadsheetAjaxCallback
    "Alex"

  makePrettyDate: (scrapedDate) ->
    components = []
    
    if scrapedDate.indexOf('-') != -1 
      components = scrapedDate.split('-')
    else
      components = scrapedDate.split(' ')	

   
    if components[2]? && components[2].length < 4
      components[2] = '20' + components[2]

    us_date = components[1] + '/' + components[0] + '/' + components[2]
    date = new Date(Date.parse(us_date))
    formattedDate = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
    formattedDate

  passengerName: () ->
    ($ 'td.itineraryGuestBaggageGuestHeadingWithButton')
      .find('span').eq(0)
      .text().split(/\s+/)
      .filter((word, index) -> index > 0)
      .join(' ')

  mobileNumber: () ->
    ($ 'div#BookingConfirmationMain')
      .find('tr').eq(1)
      .find('td').eq(3)
      .html()?.split(/<br.*?>/g)[0]

  reservationNumber: () ->
    ($ 'td.reservationnumber').text().trim()

  parseFlight: (raw) ->
    f = new Flight()
    f.flightNumber  = ($ raw).find('td.flightContents').eq(0).text()
    f.departureDate = ($ raw).find('td.flightDate').text()
    f.formattedDepartureDate = @makePrettyDate f.departureDate
    f.arrivalDate   = ($ raw).find('td.flightDate').text()
    f.departureTime = ($ raw).find('span.flightTimeTerminus').eq(0).text().replace(' PM','').replace(' AM','')
    f.arrivalTime   = ($ raw).find('span.flightTimeTerminus').eq(1).text().replace(' PM','').replace(' AM','')
    originClone      = ($ raw).find('td.flightContents').eq(1).clone()
    destinationClone = ($ raw).find('td.flightContents').eq(2).clone()
    originClone.find('span.flightTimeTerminus').remove()
    destinationClone.find('span.flightTimeTerminus').remove()
    f.origin        = originClone.text().trim()
    f.destination   = destinationClone.text().trim()
    f

  flights: () ->
    result = (@parseFlight raw) for raw in ($ 'div.passengerDetailsFrame')


  passenger: () ->
    p = new Passenger()
    p.name              = @passengerName()
    p.mobileNumber      = @mobileNumber()
    p.reservationNumber = @reservationNumber()
    p
