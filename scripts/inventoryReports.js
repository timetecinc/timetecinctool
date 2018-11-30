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
let USFBATable = [];
let CAFBATable = [];
let MXFBATable = [];
let totalTable = [];
$(document).ready(function() {
  $("#USButton").html(
    "<button type='button' style='margin-bottom:10px'class='btn btn-primary btn-sm' id='USReportBtn' onclick='requestUSReport()'>Get US Report</button>"
  );
  $("#CAButton").html(
    "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='CAReportBtn'  onclick='requestCAReport()'>Get CA Report</button>"
  );
  $("#MXButton").html(
    "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='MXReportBtn'  onclick='requestMXReport()'>Get MX Report</button>"
  );
  $("#sendButton").html(
    "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='sendBtn'  onclick='handleAuthClick()'>Sign In</button>"
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
        "<button type='button' style='margin-bottom:10px'class='btn btn-primary btn-sm' id='sendButton' disabled>Wait for Generating</button>"
      );
      isSendRequest = true;
      requestReportID = this.responseText;
      getReadyReportRequestListUS();
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
      } else {
        console.log("start to sleep");
        $("#USButton").append(
          "<div id='loader' style='display: inline-block; margin-left: 5px;'></div>"
        );
        sleep(15000).then(() => {
          //do stuff
          getReadyReportRequestListUS();
          console.log("end sleeping");
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
        "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='getCAReport' disabled>Wait for Generating</button>"
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
      } else {
        console.log("start to sleep");
        $("#CAButton").append(
          "<div id='loader' style='display: inline-block; margin-left: 5px;'></div>"
        );
        sleep(15000).then(() => {
          //do stuff
          getReadyReportRequestListCA();
          console.log("end sleeping");
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
//===GET MEX======================================================================================
function requestMXReport() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      $("#txtHint").append(
        "\nJust sent a request. Please wait 10s then click again"
      );
      $("#MXButton").html(
        "<button type='button' style='margin-bottom:10px'class='btn btn-primary btn-sm' id='sendButton' disabled>Wait for generating</button>"
      );
      isSendRequest = true;
      requestReportID = this.responseText;
      getReadyReportRequestListMX();
    }
  };

  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/RequestReportMXIMR.php",
    true
  );

  xmlhttp.send();
}
function getReadyReportRequestListMX() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("txtHint").innerHTML = this.responseText;
      let currentTime = getCurrentTime();
      if (this.responseText.includes("DONE")) {
        $("#MXButton").empty();
        reportID = this.responseText.split("!")[1].replace(/[^\d.]/g, "");
        console.log("reportID " + reportID);
        firebase
          .database()
          .ref("Report/MXReport")
          .update({
            ReportID: reportID,
            ReportDate: currentTime
          });
        getReadyReport("MX");
      } else if (this.responseText.includes("CANCELLED")) {
        $("#MXButton").empty();
        console.log("in not done");
        firebase
          .database()
          .ref("Report/MXReport")
          .once("value")
          .then(function(snapshot) {
            reportID = snapshot.val().ReportID;
            let reportTime = snapshot.val().ReportDate;
            getReadyReport("MX");
            document.getElementById("txtHint").innerHTML =
              "Report requested got cancelled, using report " +
              reportID +
              " at " +
              reportTime;
          });
      } else {
        console.log("start to sleep");
        $("#MXButton").append(
          "<div id='loader' style='display: inline-block; margin-left: 5px;'></div>"
        );
        sleep(15000).then(() => {
          //do stuff
          getReadyReportRequestListMX();
          console.log("end sleeping");
        });
      }
    }
  };
  xmlhttp.open(
    "GET",
    "MarketplaceWebService/Samples/GetReportRequestListSampleMXIMR.php?requestID=" +
      requestReportID,
    true
  );
  xmlhttp.send();
}
//========================================================================================================
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
      if (country == "US") {
        USFBATable = convertToSpreadsheetTable(singleCountryTable);
      }
      if (country == "CA") {
        CAFBATable = convertToSpreadsheetTable(singleCountryTable);
      }
      if (country == "MX") {
        MXFBATable = convertToSpreadsheetTable(singleCountryTable);
      }
      totalTable = convertToSpreadsheetTable(totalInvTable);
      console.log(country + "Table", singleCountryTable);
      pushToTable(singleCountryTable, country);
      pushToTable(totalInvTable, "ALL");
    }
  };
  if (country == "MX") {
    xmlhttp.open(
      "GET",
      "MarketplaceWebService/Samples/GetReportSampleMXIMR.php?reportID=" +
        reportID,
      true
    );
  } else {
    xmlhttp.open(
      "GET",
      "MarketplaceWebService/Samples/GetReportSample.php?reportID=" + reportID,
      true
    );
  }
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
const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

function convertToSpreadsheetTable(data) {
  let sheetTable = [];
  sheetTable.push([
    "SKU",
    "FBA Fulfillable",
    "FBA Inbound",
    "FBA Reserved",
    "FBA Receiving"
  ]);
  for (var sku in data) {
    let sheetline = [];
    sheetline.push(sku);
    sheetline.push(data[sku].Fulfillable);
    sheetline.push(data[sku].Reserved);
    sheetline.push(data[sku].Inbound);
    sheetline.push(data[sku].Receiving);
    sheetTable.push(sheetline);
  }
  return sheetTable;
}
//==========google apis===============================================================

var CLIENT_ID;
var API_KEY;
function handleClientLoad() {
  var config = firebase.database().ref("config");
  config.once("value").then(function(snapshot) {
    API_KEY = snapshot.val().GoogleAPIKey;
    CLIENT_ID = snapshot.val().GoogleClientIdTool;
    gapi.load("client:auth2", initClient);
  });
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  var SCOPE = "https://www.googleapis.com/auth/spreadsheets";
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4"
      ],
      scope: SCOPE
    })
    .then(
      function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      function(error) {}
    );
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    $("#sendButton").html(
      "<button type='button' style='margin-bottom:10px' class='btn btn-primary btn-sm' id='sendBtn'  onclick='createNewSheet()'>Send</button>"
    );
  } else {
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
function createNewSheet() {
  var spreadsheetBody = {
    // TODO: Add desired properties to the request body.
    properties: {
      title: "Timetec FBA Inventory Count " + getCurrentTime()
    }
  };

  var request = gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      console.log(response.result.spreadsheetId);

      creatNewTab(response.result.spreadsheetId, "US", USFBATable);
      creatNewTab(response.result.spreadsheetId, "CA", CAFBATable);
      creatNewTab(response.result.spreadsheetId, "MX", MXFBATable);
      creatNewTab(response.result.spreadsheetId, "Total", totalTable);
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}
function creatNewTab(spreadSheetID, country, sheetValueTable) {
  var params = {
    // The spreadsheet to apply the updates to.
    spreadsheetId: spreadSheetID // TODO: Update placeholder value.
  };

  var batchUpdateSpreadsheetRequestBody = {
    // A list of updates to apply to the spreadsheet.
    // Requests will be applied in the order they are specified.
    // If any request is not valid, no requests will be applied.
    requests: [
      {
        addSheet: {
          properties: {
            title: country,
            gridProperties: {
              rowCount: 100,
              columnCount: 50
            },
            index: 0
          }
        }
      }
    ] // TODO: Update placeholder value.

    // TODO: Add desired properties to the request body.
  };

  var request = gapi.client.sheets.spreadsheets.batchUpdate(
    params,
    batchUpdateSpreadsheetRequestBody
  );
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      newSheetID = response.result.replies[0].addSheet.properties.sheetId;

      console.log("response.result sheetID" + newSheetID);
      appendValue(spreadSheetID, country, sheetValueTable);
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}
function appendValue(spreadSheetID, country, sheetValueTable) {
  //let sheetValueTable = [];
  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: spreadSheetID, // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: country + "!A:Z", // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: "USER_ENTERED", // TODO: Update placeholder value.

    // How the input data should be inserted.
    insertDataOption: "OVERWRITE" // TODO: Update placeholder value.
  };

  var valueRangeBody = {
    // TODO: Add desired properties to the request body.
    majorDimension: "ROWS",
    values: sheetValueTable
  };

  var request = gapi.client.sheets.spreadsheets.values.append(
    params,
    valueRangeBody
  );
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);

      $("#sheetLink").empty();
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}
