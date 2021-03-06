var infoTable = [];
var pcData = [];
var svData = [];
var totalNPNumer = 0;
var totalSVNumber = 0;
var processedNP = 0;
var processedSV = 0;
var pcSheetID = "1Tz5Scf0dLG1XcozUghbCWfezSxxS7UVwdj5d3BaDYqs";
var svSheetID = "1Qj-DbZnBZXYaRKFM7GwV2Ti4EzPDscPZB5IX6-xOqWY";
var aphabetArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T"
];
function getIOsheetValue() {
  document.getElementById("loader").style.visibility = "visible";
  infoTable = [];
  var params = {
    spreadsheetId: "1DF_16W8WoNKrfOzFGq7TRnV6I_0uTsi94tMQ2iPGeWI",
    range: "Main!A2:D",
    valueRenderOption: "UNFORMATTED_VALUE", // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: "FORMATTED_STRING",
    majorDimension: "COLUMNS"
  };
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      var IDInfo = response.result.values[0];
      var QTYInfo = response.result.values[1];
      var customerInfo = response.result.values[2];
      var orderInfo = response.result.values[3];

      var IDLines = response.result.values[0];
      var QTYLines = response.result.values[1];
      var customerLines = response.result.values[2];
      var orderLines = response.result.values[3];
      //check if all data number match
      console.log(IDLines);
      console.log(QTYLines);
      console.log(customerLines);
      console.log(orderLines);
      if (IDLines.length != QTYLines.length) {
        console.log("length not equal");
        document.getElementById("txtHint").innerHTML =
          "ID number and QTY number not match please check";
        return;
      } else if (IDLines.length != customerLines.length) {
        console.log("length not equal");
        document.getElementById("txtHint").innerHTML =
          "ID number and customer number not match please check";
      } else if (IDLines.length != orderLines.length) {
        console.log("length not equal");
        document.getElementById("txtHint").innerHTML =
          "ID number and Order number not match please check";
      } else {
        document.getElementById("txtHint").innerHTML = "All data lines matched";
      }
      //intial the data table
      for (var i = 0; i < IDLines.length; i++) {
        if (IDLines[i].includes("NP")) {
          infoTable[IDLines[i]] = {
            startLine: 0,
            lineNumber: 0,
            inputData: [],
            orderID: [],
            buyer: []
          };
        } else {
          var temp = IDLines[i].replace("S", "");
          infoTable[temp] = {
            startLine: 0,
            lineNumber: 0,
            inputData: [],
            orderID: [],
            buyer: []
          };
        }
      }
      //push data to table
      for (var i = 0; i < IDLines.length; i++) {
        if (IDLines[i].includes("NP")) {
          infoTable[IDLines[i]].inputData.push(QTYLines[i]);
          infoTable[IDLines[i]].orderID.push(orderLines[i]);
          infoTable[IDLines[i]].buyer.push(customerLines[i]);
        } else {
          var temp = IDLines[i].replace("S", "");
          infoTable[temp].inputData.push(QTYLines[i]);
          infoTable[temp].orderID.push(orderLines[i]);
          infoTable[temp].buyer.push(customerLines[i]);
        }

        //
      }
      for (var id in infoTable) {
        if (id.includes("NP")) {
          totalNPNumer++;
        } else {
          totalSVNumber++;
        }
      }

      for (var id in infoTable) {
        //getLineNumber(id,totalNPNumer);
        if (id.includes("NP")) {
          getColNumber(pcSheetID, id);
        } else {
          getColNumber(svSheetID, id);
        }
      }
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
    }
  );
}
/*function getInformation() {
  totalNPNumer = 0;
  totalSVNumber = 0;
  processedNP = 0;
  processedSV = 0;
  pcData = [];
  infoTable = [];
  var IDInfo = document.getElementById("IDTextArea").value;
  var QTYInfo = document.getElementById("QTYTextArea").value;
  var customerInfo = document.getElementById("CustomerTextArea").value;
  var orderInfo = document.getElementById("OrderIDTextArea").value;

  var IDLines = IDInfo.split("\n");
  var QTYLines = QTYInfo.split("\n");
  var customerLines = customerInfo.split("\n");
  var orderLines = orderInfo.split("\n");
  //check if all data number match
  if (IDLines.length != QTYLines.length) {
    console.log("length not equal");
    document.getElementById("txtHint").innerHTML =
      "ID number and QTY number not match please check";
    return;
  } else if (IDLines.length != customerLines.length) {
    console.log("length not equal");
    document.getElementById("txtHint").innerHTML =
      "ID number and customer number not match please check";
  } else if (IDLines.length != orderLines.length) {
    console.log("length not equal");
    document.getElementById("txtHint").innerHTML =
      "ID number and Order number not match please check";
  } else {
    document.getElementById("txtHint").innerHTML = "All data lines matched";
  }
  //intial the data table
  for (var i = 0; i < IDLines.length; i++) {
    if (IDLines[i].includes("NP")) {
      infoTable[IDLines[i]] = {
        startLine: 0,
        lineNumber: 0,
        inputData: [],
        orderID: [],
        buyer: []
      };
    } else {
      var temp = IDLines[i].replace("S", "");
      infoTable[temp] = {
        startLine: 0,
        lineNumber: 0,
        inputData: [],
        orderID: [],
        buyer: []
      };
    }
  }
  //push data to table
  for (var i = 0; i < IDLines.length; i++) {
    if (IDLines[i].includes("NP")) {
      infoTable[IDLines[i]].inputData.push(QTYLines[i]);
      infoTable[IDLines[i]].orderID.push(orderLines[i]);
      infoTable[IDLines[i]].buyer.push(customerLines[i]);
    } else {
      var temp = IDLines[i].replace("S", "");
      infoTable[temp].inputData.push(QTYLines[i]);
      infoTable[temp].orderID.push(orderLines[i]);
      infoTable[temp].buyer.push(customerLines[i]);
    }

    //
  }
  for (var id in infoTable) {
    if (id.includes("NP")) {
      totalNPNumer++;
    } else {
      totalSVNumber++;
    }
  }

  for (var id in infoTable) {
    //getLineNumber(id,totalNPNumer);
    if (id.includes("NP")) {
      getColNumber(pcSheetID, id);
    } else {
      getColNumber(svSheetID, id);
    }
  }
}*/

function handleClientLoad() {
  var config = firebase.database().ref("config");
  config.once("value").then(function(snapshot) {
    API_KEY = snapshot.val().GoogleAPIKey;
    CLIENT_ID = snapshot.val().GoogleClientIdTool;
    gapi.load("client:auth2", initClient);
  });
}

function initClient() {
  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/spreadsheets'
  var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4"
      ]
    })
    .then(function() {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

var isloggedIn = false;
function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    document.getElementById("signinButton").style.display = "none";
    document.getElementById("sendButton").style.visibility = "visible";
    document.getElementById("IOType").style.visibility = "visible";
  } else {
    console.log("google logged out");
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
function getColNumber(sheetID, ID, type) {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: sheetID, // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: ID + "!A3:Z3", // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: "FORMATTED_VALUE", // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: "FORMATTED_STRING" // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      var FBANumber = 0;
      var CustomerNumber = 0;
      var orderIDNumber = 0;
      var range = response.result;
      if (range.values.length > 0) {
        for (i = 0; i < range.values[0].length; i++) {
          if (range.values[0][i] == "FBA") {
            FBANumber = i;
          }
          if (range.values[0][i] == "Customer Name") {
            CustomerNumber = i;
            console.log("customerCol " + CustomerNumber);
          }

          if (range.values[0][i] == "Order No.") {
            orderIDNumber = i;
          }
        }
        console.log("FBA col num " + aphabetArray[FBANumber]);
        console.log("customerCol2 " + CustomerNumber);
        getLineNumber(sheetID, ID, FBANumber, CustomerNumber, orderIDNumber);
      } else {
        console.log("no data from PC 2018");
      }
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
      appendPre("Error: " + reason.result.error.message);
    }
  );
}
function getLineNumber(sheetID, ID, FBAColNum, customerCol, orderCol) {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: sheetID, // TODO: Update placeholder value.

    // The A1 notation of the values to retrieve.
    range: ID + "!A1:A", // TODO: Update placeholder value.

    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    valueRenderOption: "FORMATTED_VALUE", // TODO: Update placeholder value.

    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    dateTimeRenderOption: "FORMATTED_STRING" // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      //getting the current line number
      var number = 0;
      var range = response.result;
      if (range.values.length > 0) {
        for (i = 0; i < range.values.length; i++) {
          if (range.values[i] != null) {
            number++;
          }
        }
        console.log("line number is " + parseInt(number + 1));
        //getting the current date and push to value array.
        var valueArray = [];
        var monthArray = [];
        var dayArray = [];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        //loop though each item from input
        for (var j = 0; j < infoTable[ID].inputData.length; j++) {
          monthArray.push(mm);
          dayArray.push(dd);
        }
        // push the date first
        valueArray.push(monthArray);
        valueArray.push(dayArray);
        //if it is the PO input------------------------------------------------------
        if (document.getElementById("PORadio").checked == true) {
          var tempPOArray = [];
          for (var d = 0; d < infoTable[ID].inputData.length; d++) {
            tempPOArray.push(infoTable[ID].inputData[d]);
          }
          valueArray.push(tempPOArray);
          //skip all colum to FBA column
          valueArray.push([]);
          valueArray.push([]);
          valueArray.push([]);
          valueArray.push([]);
        } else if (document.getElementById("RINRadio").checked == true) {
          //If it is RIN section-------------
          //jump to RIN colum
          valueArray.push([]);
          var tempRINArray = [];
          for (var d = 0; d < infoTable[ID].inputData.length; d++) {
            tempRINArray.push(infoTable[ID].inputData[d]);
          }
          valueArray.push(tempRINArray);
          valueArray.push([]);
          valueArray.push([]);
          valueArray.push([]);
        } else if (document.getElementById("outgoingRadio").checked == true) {
          //If it is outgoing section-------------
          //jump to outgoing section
          for (var j = 0; j < FBAColNum - 3; j++) {
            valueArray.push([]);
          }
          //initial FBA and FBM array
          var tempFBA = [];
          var tempFBM = [];
          //loop though each item id and push FBA or direct ship quantity temp FBA and FBM array.
          for (var d = 0; d < infoTable[ID].inputData.length; d++) {
            if (infoTable[ID].orderID[d].includes("FBA")) {
              tempFBA.push(infoTable[ID].inputData[d]);
              tempFBM.push("");
            } else {
              tempFBM.push(infoTable[ID].inputData[d]);
              tempFBA.push("");
            }
          }
          valueArray.push(tempFBM);
          valueArray.push(tempFBA);
        }

        console.log("customerCol " + customerCol);
        // jump to customer column--------------------------------------------
        for (var k = 0; k < customerCol - FBAColNum - 1; k++) {
          valueArray.push([]);
        }
        valueArray.push(infoTable[ID].buyer);
        valueArray.push(infoTable[ID].orderID);
        if (ID.includes("NP")) {
          pcData.push({
            range: ID + "!A" + parseInt(number + 1) + ":Z",
            majorDimension: "COLUMNS",
            values: valueArray
          });
          console.log("pcData" + JSON.stringify(pcData));
        } else {
          svData.push({
            range: ID + "!A" + parseInt(number + 1) + ":Z",
            majorDimension: "COLUMNS",
            values: valueArray
          });
          console.log("svData" + JSON.stringify(svData));
        }
      } else {
        console.log("no data from PC 2018");
      }
      if (ID.includes("NP")) {
        processedNP++;
        if (processedNP == totalNPNumer) {
          sendToSheet(pcSheetID, pcData);
        }
      } else {
        processedSV++;
        if (processedSV == totalSVNumber) {
          sendToSheet(svSheetID, svData);
        }
      }
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
      appendPre("Error: " + reason.result.error.message);
    }
  );
}

function sendToSheet(sheetID, data) {
  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: sheetID // TODO: Update placeholder value.
  };

  var batchUpdateValuesRequestBody = {
    // How the input data should be interpreted.
    valueInputOption: "USER_ENTERED", // TODO: Update placeholder value.

    // The new values to apply to the spreadsheet.
    data: data // TODO: Update placeholder value.

    // TODO: Add desired properties to the request body.
  };

  var request = gapi.client.sheets.spreadsheets.values.batchUpdate(
    params,
    batchUpdateValuesRequestBody
  );
  request.then(
    function(response) {
      // TODO: Change code below to process the `response` object:
      console.log(response.result);
      appendPre("Data sent");
    },
    function(reason) {
      console.error("error: " + reason.result.error.message);
      appendPre("Error: " + reason.result.error.message);
    }
  );
}

function appendPre(message) {
  document.getElementById("loader").style.visibility = "hidden";
  var pre = document.getElementById("content");
  var textContent = document.createTextNode(message + "\n");
  pre.appendChild(textContent);
}
