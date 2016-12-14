  var config = {
    apiKey: "AIzaSyCaiqUn1UMOwuHVT01Mw8s-OSQl9QNHgpc",
    authDomain: "timetec-data.firebaseapp.com",
    databaseURL: "https://timetec-data.firebaseio.com",
    storageBucket: "timetec-data.appspot.com",
    messagingSenderId: "671839024565"
  };
  firebase.initializeApp(config);


function displayTable(){
$("#myTable").empty();
$("#unTestedTable").hide();

var ref = firebase.database().ref("Memory");
 ref.once("value").then(function(snapshot) {
   var tr="<thead><th>#</th><th>SKU</th><th>Manufactror No.</th><th>Inventory</th><th>Received</th><th>Tested</th><th>Action</th></thead><tbody>";
    $("#myTable").append(tr); 

      snapshot.forEach(function(childSnapShot){

  var obj = childSnapShot;


  var id = obj.key;
  var sku = obj.val()["SKU"];
  var manuNum= obj.val()["Manu"];
  var inven = obj.val()["QTY"]; 

  $("#SKUList").append("<option value='"+sku+"''>");
  var td1="<tr><th scope='row'>"+id+"</th>";
  var td2 = "<td>"+sku+"</td>"+"<td>"+manuNum+"</td>";
  var td3 = "<td>"+inven+ "</tr>";


    $("#myTable").append(td1+td2+td3); 


});

  $("#myTable").append("</tbody>");

});


}

function displayRMATable(){
  $("#myTable").empty();
$("#unTestedTable").hide();
var rowNum=1;
var ref = firebase.database().ref("Memory");
 ref.once("value").then(function(snapshot) {
   var tr="<thead><th>#</th><th>SKU</th><th>Manufactror No.</th><th>Total Received</th><th>Received</th><th>Tested</th><th>Action</th></thead><tbody>";
    $("#myTable").append(tr); 

      snapshot.forEach(function(childSnapShot){

  var obj = childSnapShot;


  var id = obj.key;
  var sku = obj.val()["SKU"];
  var manuNum= obj.val()["Manu"];
  var inven = obj.val()["QTY"]; 
  var rmaInv = obj.val()["RMAInv"];
  
  if(obj.hasChild("RMAInv")){

  $("#SKUList").append("<option value='"+sku+"''>");
    var td1="<tr><th scope='row'>"+id+"</th>";
    var td2 = "<td>"+sku+"</td>"+"<td>"+manuNum+"</td>";
    var td3 = "<td>"+rmaInv+ "</td><td>0</td><td>0</td>";
    var td4 = "<td><a id='"+rowNum+"'href='#' onclick='openModal(this.id)'>Edit</a>&nbsp;&nbsp;<a href='#''>Delete</a></td></tr>";
    rowNum++;

    $("#myTable").append(td1+td2+td3+td4); 

  }
});

  $("#myTable").append("</tbody>");

});


}

function openModal(row){

  console.log("Row index is: " + row);
  var sku = document.getElementById("myTable").rows[row].cells[1].innerHTML;
  $('#SKUInput').val(sku);
  $('#myModal').modal('show');

}
