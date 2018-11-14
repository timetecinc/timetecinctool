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

      if (this.responseText.includes("DONE")) {
        $("#USButton").empty();
        reportID = this.responseText.split("!")[1].replace(/[^\d.]/g, "");
        console.log("reportID " + reportID);

        getReadyReport();
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
      if (this.responseText.includes("DONE")) {
        $("#CAButton").empty();
        reportID = this.responseText.split("!")[1].replace(/[^\d.]/g, "");
        console.log("reportID " + reportID);

        getReadyReport();
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

function getReadyReportList() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      reportID = this.responseText.replace(/[^\d.]/g, "");
    }
  };
  console.log("requestReportID " + requestReportID);
  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/GetReportListSample.php?requestID=" +
      requestReportID,
    true
  );
  xmlhttp.send();
}
function getReadyReport() {
  console.log("ReportID " + reportID);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("txtHint").innerHTML = this.responseText;
      //reportID = this.responseText;
      //console.log(this.responseText);
      let result = getUsefulData(this.responseText);
      pushToTable(result);
    }
  };
  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/GetReportSample.php?reportId=" + reportID,
    true
  );
  xmlhttp.send();
}
function getUsefulData(result) {
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

function pushToTable(resultTable) {
  $("#myTableBody").empty();
  for (var x in resultTable) {
    console.log("inTable ", resultTable[x].ASIN);
    $("#myTableBody").append(
      "<tr><td>" +
        x +
        "</td><td>" +
        resultTable[x].Fulfillable +
        "</td><td>" +
        resultTable[x].Inbound +
        "</td><td>" +
        resultTable[x].Reserved +
        "</td><td>" +
        resultTable[x].Receiving +
        "</td></tr>"
    );
  }
  readyToSend = true;
  document.getElementById("sendButton").style.visibility = "visible";
}
