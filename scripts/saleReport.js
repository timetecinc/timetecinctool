var database = firebase.database();
var requestReportID;
var reportID;
var isSendRequest = false;
let fulfillable = 0;
let reserved = 0;
let inbound = 0;
let receiving = 0;
var totalInv = [];
//request US report
$(document).ready(function() {
  $("#USButton").html(
    "<button type='button' style='margin-bottom:10px'class='btn btn-primary btn-sm' id='USReportBtn' onclick='requestUSReport()'>Get US Report</button>"
  );
  $("#CAButton").html(
    "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='CAReportBtn'  onclick='requestCAReport()'>Get CA Report</button>"
  );
});

//======================================================
function requestNewReport() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      $("#txtHint").append(
        "\nJust sent a request. Please wait 10s then click again"
      );
      $("#USButton").html(
        "<button type='button' style='margin-bottom:10px'class='btn btn-primary btn-sm' id='sendButton' onclick='getReadyReportRequestListUS()'>Wait 10s</button>"
      );
      isSendRequest = true;
      requestReportID = this.responseText;
    }
  };

  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/RequestReportIMR.php",
    true
  );

  xmlhttp.send();
}
//request US ===============================================================================================

function requestUSReport() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      $("#txtHint").append(
        "\nJust sent a request. Please wait 10s then click again"
      );
      $("#USButton").html(
        "<button type='button' style='margin-bottom:10px'class='btn btn-primary btn-sm' id='sendButton' onclick='getReadyReportRequestListUS()'>Wait 10s</button>"
      );
      isSendRequest = true;
      requestReportID = this.responseText;
    }
  };

  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/RequestReportUSIMR.php",
    true
  );

  xmlhttp.send();
}
function getReadyReportRequestListUS() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      let currentTime = getCurrentTime();
      if (this.responseText.includes("DONE")) {
        $("#USButton").empty();
        reportID = this.responseText.split("!")[1].replace(/[^\d.]/g, "");
        console.log("reportID " + reportID);
        firebase
          .database()
          .ref("Report/USReport")
          .update({
            ReportID: reportID,
            ReportDate: currentTime
          });
        getReadyReport("US");
      } else if (this.responseText.includes("CANCELLED")) {
        $("#USButton").empty();
        console.log("in not done");
        firebase
          .database()
          .ref("Report/USReport")
          .once("value")
          .then(function(snapshot) {
            reportID = snapshot.val().ReportID;
            let reportTime = snapshot.val().ReportDate;
            getReadyReport("US");
            document.getElementById("txtHint").innerHTML =
              "Report requested got cancelled, using report at " + reportTime;
          });
      }
    }
  };
  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/GetReportRequestListSampleUSIMR.php?requestID=" +
      requestReportID,
    true
  );
  xmlhttp.send();
}
//request CA report================================================================================
function requestCAReport() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      $("#txtHint").append(
        "\nJust sent a request. Please wait 10s then click again"
      );
      $("#CAButton").html(
        "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='getCAReport'  onclick='getReadyReportRequestListCA()'>Wait for 10s</button>"
      );
      isSendRequest = true;
      requestReportID = this.responseText;
      getReadyReportRequestListCA();
    }
  };

  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/RequestReportCAIMR.php",
    true
  );

  xmlhttp.send();
}

function getReadyReportRequestListCA() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      let currentTime = getCurrentTime();
      if (this.responseText.includes("DONE")) {
        $("#CAButton").empty();
        reportID = this.responseText.split("!")[1].replace(/[^\d.]/g, "");
        console.log("reportID " + reportID);
        firebase
          .database()
          .ref("Report/CAReport")
          .update({
            ReportID: reportID,
            ReportDate: currentTime
          });
        getReadyReport("CA");
      } else if (this.responseText.includes("CANCELLED")) {
        firebase
          .database()
          .ref("Report/CAReport")
          .once("value")
          .then(function(snapshot) {
            $("#CAButton").empty();
            reportID = snapshot.val().ReportID;
            let reportTime = snapshot.val().ReportDate;
            getReadyReport("CA");
            document.getElementById("txtHint").innerHTML =
              "Report requested got cancelled, using report at " + reportTime;
          });
      }
    }
  };
  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/GetReportRequestListSampleCAIMR.php?requestID=" +
      requestReportID,
    true
  );
  xmlhttp.send();
}

function getReadyReport(country) {
  console.log("ReportID " + reportID);
  //requstData = reportID + "/" + country;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("txtHint").innerHTML = this.responseText;
      //reportID = this.responseText;
      //console.log(this.responseText);
      let totalInvTable = getAllCountriesInventory(this.responseText);

      let singleCountryTable = getSingleCountryInventory(this.responseText);
      console.log(country + "Table", singleCountryTable);
      pushToTable(singleCountryTable, country);
      pushToTable(totalInvTable, "ALL");
    }
  };

  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/GetReportSample.php?reportID=" + reportID,
    true
  );

  xmlhttp.send();
}
function getSingleCountryInventory(result) {
  let sinlgeFulfillable = 0;
  let singleReserved = 0;
  let singleInbound = 0;
  let singleReceiving = 0;
  let lines = result.split("\n");
  let sku;
  let line;
  let singleCountryTable = [];
  for (let i = 1; i < lines.length; i++) {
    line = lines[i].split("\t");
    sku = line[0].split(".")[0];

    sinlgeFulfillable = parseInt(line[10]);
    singleReserved = parseInt(line[12]);
    singleInbound = parseInt(line[16]);
    singleReceiving = parseInt(line[17]);

    if (singleCountryTable[sku]) {
      singleCountryTable[sku] = {
        Fulfillable: singleCountryTable[sku].Fulfillable + sinlgeFulfillable,
        Reserved: singleCountryTable[sku].Reserved + singleReserved,
        Inbound: singleCountryTable[sku].Inbound + singleInbound,
        Receiving: singleCountryTable[sku].Receiving + singleReceiving
      };
    } else {
      singleCountryTable[sku] = {
        Fulfillable: sinlgeFulfillable,
        Reserved: singleReserved,
        Inbound: singleInbound,
        Receiving: singleReceiving
      };
    }
  }
  return singleCountryTable;
}
function getAllCountriesInventory(result) {
  fulfillable = 0;
  reserved = 0;
  inbound = 0;
  receiving = 0;
  var lines = result.split("\n");
  var sku;
  var line;

  for (var i = 1; i < lines.length; i++) {
    line = lines[i].split("\t");
    sku = line[0].split(".")[0];
    ASIN = line[2];
    fulfillable = parseInt(line[10]);
    //console.log("fullfillable ", fulfillable);
    reserved = parseInt(line[12]);
    inbound = parseInt(line[16]);
    receiving = parseInt(line[17]);

    if (totalInv[sku]) {
      totalInv[sku] = {
        Fulfillable: totalInv[sku].Fulfillable + fulfillable,
        Reserved: totalInv[sku].Reserved + reserved,
        Inbound: totalInv[sku].Inbound + inbound,
        Receiving: totalInv[sku].Receiving + receiving
      };
    } else {
      totalInv[sku] = {
        Fulfillable: fulfillable,
        Reserved: reserved,
        Inbound: inbound,
        Receiving: receiving
      };
    }
  }

  return totalInv;
}

function pushToTable(invTable, country) {
  $("#my" + country + "Table").empty();
  $("#my" + country + "Table").append(
    "<thead><th>" +
      country +
      " SKU</th><th>FBA Fulfillable</th><th>FBA Inbound</th><th>FBA Reserved</th><th>FBA Receiving</th></thead><tbody id='my" +
      country +
      "TableBody'></tbody>"
  );
  for (var x in invTable) {
    $("#my" + country + "TableBody").append(
      "<tr><td>" +
        x +
        "</td><td>" +
        invTable[x].Fulfillable +
        "</td><td>" +
        invTable[x].Inbound +
        "</td><td>" +
        invTable[x].Reserved +
        "</td><td>" +
        invTable[x].Receiving +
        "</td></tr>"
    );
  }
}
function getCurrentTime() {
  let today = new Date();
  return (
    today.getMonth() +
    1 +
    "/" +
    today.getDate() +
    "/" +
    today.getFullYear() +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes()
  );
}
