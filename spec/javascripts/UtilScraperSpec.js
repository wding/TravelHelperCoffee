(function() {
  describe("UtilScraper", function() {
    it("should perfom sanity check using Google spreadsheet to get hotel output", function() {
      var ac, v;
      v = new VirginScraper();
      ac = v.accommodation();
      UtilScraper.get().getGoogleSpreadsheetAsJson('pgZYLtdPRv50AK70fqJkQSw', 'od6', function(result) {
        return UtilScraper.get().hotelGoogleSpreadsheetAjaxCallback(result, ac);
      });
      return (expect("true")).toEqual("true");
    });
    it("should perfom sanity check using API to get some output (1)", function() {
      var util;
      util = UtilScraper.get();
      util.queryGoogleDistanceMatrix("50 McElhone Street, Woolloomooloo 2011", window.airportAddresses["Sydney"], "some-div-id");
      return (expect("true")).toEqual("true");
    });
    it("should perfom sanity check using API to get some output (2)", function() {
      var util;
      util = UtilScraper.get();
      util.queryGoogleDistanceMatrix("274 Ballarat Road, Footscray 3011", window.airportAddresses["Melbourne"], "some-div-id");
      return (expect("true")).toEqual("true");
    });
    it("should substract minutes from given date string", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('12:10 Sat 08 Oct 2011', 30))).toEqual("11:40AM Saturday 8 October 2011");
    });
    it("should substract minutes from given date string (2)", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('Sat 08 Oct 2011 00:10', 30))).toEqual("23:40 Friday 7 October 2011");
    });
    it("should substract minutes from given date string (3)", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('Tue 01 Mar 2011 00:10', 45))).toEqual("23:25 Monday 28 February 2011");
    });
    it("should substract minutes from given date string (4)", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('Thu 01 Mar 2012 00:10', 45))).toEqual("23:25 Wednesday 29 February 2012");
    });
    it("should substract minutes from given date string (5)", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('7:15 Sat 08 Oct 2011', 90))).toEqual("5:45AM Saturday 8 October 2011");
    });
    it("should substract minutes from given date string (6)", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('7:15 Saturday 8 October 2011', 90))).toEqual("5:45AM Saturday 8 October 2011");
    });
    return it("should substract minutes from given date string (7)", function() {
      var util;
      util = UtilScraper.get();
      return (expect(util.estimateDatetime('18:00 Friday 14 October 2011', 90))).toEqual("16:30 Friday 14 October 2011");
    });
  });
}).call(this);
