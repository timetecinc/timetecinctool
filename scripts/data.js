//console.log("lines[0]");
var CLIENT_ID = '260203569992-jq6n9t4muslfmlu4rrl7c0olrd7f21u8.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCid7j8eC8O2_AdrC1S0j1xT31r35lNLAg';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

    // Handler for .ready() called.
function displayTable(){
$("#myTable").empty();
$("#unTestedTable").hide();

var ref = firebase.database().ref("RAM");
 ref.once("value").then(function(snapshot) {
   var tr="<thead><th>ID</th><th>SKU</th><th>ASIN</th><th>Inventory</th><th>Price</th><th>Weigth</th></thead><tbody>";
    $("#myTable").append(tr); 

      snapshot.forEach(function(childSnapShot){

  var obj = childSnapShot;


  var id = obj.val()["ID"];
  var sku = obj.key;
  var ASIN= obj.val()["ASIN"];
  var inven = 1; 
  var price = obj.val()["PriceCND"]; 
  var weight = obj.val()["WeightLB"]; 

  $("#SKUList").append("<option value='"+sku+"''>");
  var td1="<tr><th scope='row'>"+id+"</th>";
  var td2 = "<td>"+sku+"</td>"+"<td>"+ASIN+"</td>";
  var td3 = "<td>"+inven+"</td>" +"<td>"+price+"</td>"+"<td>"+weight+"</td></tr>";


    $("#myTable").append(td1+td2+td3); 


});

  $("#myTable").append("</tbody>");

});


}

function displayRMATable(){
  $("#myTable").empty();
  document.getElementById("myTable").setAttribute("title", "RMATable");
$("#unTestedTable").hide();
var rowNum=1;
var ref = firebase.database().ref("Memory");
 ref.once("value").then(function(snapshot) {
   var tr="<thead><th>#</th><th>SKU</th><th>Manufactror No.</th><th>RMA Inventory</th><th>New Received</th><th>Tested</th><th>Action</th></thead><tbody>";
    $("#myTable").append(tr); 

      snapshot.forEach(function(childSnapShot){

  var obj = childSnapShot;


  var id = obj.key;
  var sku = obj.val()["SKU"];
  var manuNum= obj.val()["Manu"];
  var inven = obj.val()["QTY"]; 
  var rmaInv = obj.val()["RMAInv"];
  var recveivedNum = obj.val()["RMAReceived"];
   if(!recveivedNum){

    recveivedNum = 0;
  }

  var tested = obj.val()["tested"];

  if(!tested){

    tested = 0;
  }
  
  if(obj.hasChild("RMAInv")){

  $("#SKUList").append("<option value='"+sku+"''>");
    var td1="<tr><th scope='row'>"+id+"</th>";
    var td2 = "<td>"+sku+"</td>"+"<td>"+manuNum+"</td>";
    var td3 = "<td>"+rmaInv+ "</td><td>"+recveivedNum+"</td><td>"+tested+"</td>";
    var td4 = "<td><a id='"+rowNum+"'href='#' onclick='openModal(this.id)'>Edit</a>&nbsp;&nbsp;<a href='#''>Delete</a></td></tr>";
    rowNum++;

    $("#myTable").append(td1+td2+td3+td4); 

  }
});

  $("#myTable").append("</tbody>");

});

$('#functionDiv').html("<button type='button' class='btn btn-success' style='float: right;'' data-toggle='modal' data-target='.bd-example-modal-lg'>Add Memory</button>");
}

function openModal(row){

  console.log("Row index is: " + row);
  var id = document.getElementById("myTable").rows[row].cells[0].innerHTML;
  console.log("ID is: " + id);
  var sku = document.getElementById("myTable").rows[row].cells[1].innerHTML;
  var received = document.getElementById("myTable").rows[row].cells[4].innerHTML;
  var testedNum = document.getElementById("myTable").rows[row].cells[5].innerHTML;



  $('#IDInput').val(id);
  $('#SKUInput').val(sku);
  $('#receivedInput').val(received);
  $('#testedInput').val(testedNum);
  
  $('#myModal').modal('show');

}

function displayUnTestedTable(){
   $("#myTable").empty();
$("#unTestedTable").hide();
 document.getElementById("myTable").setAttribute("title", "unconfirmedTable");
var rowNum=1;
var ref = firebase.database().ref("Memory");
 ref.once("value").then(function(snapshot) {
   var tr="<thead><th>#</th><th>SKU</th><th>Manufactror No.</th><th>RMA Inventory</th><th>New Received</th><th>Tested</th><th>Action</th></thead><tbody>";
    $("#myTable").append(tr); 

    snapshot.forEach(function(childSnapShot){

  var obj = childSnapShot;


  var id = obj.key;
  var sku = obj.val()["SKU"];
  var manuNum= obj.val()["Manu"];
  var inven = obj.val()["QTY"]; 
  var rmaInv = obj.val()["RMAInv"];
  var tested = obj.val()["tested"];

  if(!tested){

    tested = 0;
  }
  
  if(obj.hasChild("RMAReceived")){
    if(obj.val()["RMAReceived"] !=0 ){
  $("#SKUList").append("<option value='"+sku+"''>");
    var td1="<tr><th scope='row'>"+id+"</th>";
    var td2 = "<td>"+sku+"</td>"+"<td>"+manuNum+"</td>";
    var td3 = "<td>"+rmaInv+ "</td><td>"+obj.val()["RMAReceived"]+"</td><td>"+tested+"</td>";
    var td4 = "<td><a id='"+rowNum+"'href='#' onclick='openModal(this.id)'>Edit</a>&nbsp;&nbsp;<a href='#''>Delete</a></td></tr>";
    rowNum++;

    $("#myTable").append(td1+td2+td3+td4); 

  }
}
});

  $("#myTable").append("</tbody>");

});

$('#functionDiv').html("<button type='button' class='btn btn-success' style='float: right;' onclick='confirm()'>Confirm</button>");

}


function saveData(){

  var SKUInput = $("#SKUInput").val();
  var recveivedNum;
  var testedNum;
  var memID = $('#IDInput').val();
  recveivedNum = $("#receivedInput").val();
  testedNum = $("#testedInput").val();

  

   firebase.database().ref("Memory/"+memID).update({
    RMAReceived: recveivedNum,
    tested:testedNum
  });
   var title = document.getElementById("myTable").getAttribute("title");
    if(title=="unconfirmedTable"){
      displayUnTestedTable();
    }else{
      displayRMATable();

    }
   //displayUnTestedTable();

   $('#myModal').modal('hide');
   


countUnconfirmed();
}

function confirm(){


  var ref = firebase.database().ref("Memory");
 ref.once("value").then(function(snapshot) {
   
 snapshot.forEach(function(childSnapShot){

  var obj = childSnapShot;


  var id = obj.key;
  var sku = obj.val()["SKU"];
  var manuNum= obj.val()["Manu"];
  var inven = obj.val()["QTY"]; 
  var rmaInv = obj.val()["RMAInv"];
  var tested = obj.val()["tested"];
  var recveivedNum = obj.val()["RMAReceived"];

  if(!tested){

    tested = 0;
  }
  
  if(obj.hasChild("RMAReceived")){
    if(obj.val()["RMAReceived"] !=0 ){

        if(tested!=0){

          rmaInv =  +rmaInv+ +tested;

          firebase.database().ref("Memory/"+id).update({
            RMAReceived: 0,
            tested:0,
            RMAInv: rmaInv

          });

        }


    }
  }

 });


});


}
var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");

function handleClientLoad() {
        gapi.load('client:auth2', initClient);
}
function initClient() {
 
  console.log("authorizeButton" + authorizeButton);
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
}

function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          //authorizeButton.style.display = 'none';
          //signoutButton.style.display = 'block';
          console.log("isSignedIn");
          listMajors();
        } else {
          //authorizeButton.style.display = 'block';
          //signoutButton.style.display = 'none';
          console.log("isNotSigned")
        }
      }
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
}
function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
}

function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1Tz5Scf0dLG1XcozUghbCWfezSxxS7UVwdj5d3BaDYqs',
          range: 'Master!E2:F',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            appendPre('Name, Major:');
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              appendPre(row[0] + ', ' + row[1]);
            }
          } else {
            appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
}