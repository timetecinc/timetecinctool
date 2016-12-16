
countUnconfirmed();
function countUnconfirmed(){
firebase.database().ref("Memory").once("value").then(function(snapshot) {
  var counter=0;   
    snapshot.forEach(function(childSnapShot){

      



  if(childSnapShot.hasChild("RMAReceived")){
    if(childSnapShot.val()["RMAReceived"]!=0){
      counter++;
    }

  }
});
    console.log("counter: " + counter);

document.getElementById("unconfirmedNum").innerHTML =counter;

});

}

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

displayUnTestedTable();
countUnconfirmed();

});


}