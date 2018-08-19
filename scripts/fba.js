//console.log("lines[0]");
var CLIENT_ID = '671839024565-i91in47kkr2aiu5evtujvgaj1dgs7g86.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCaiqUn1UMOwuHVT01Mw8s-OSQl9QNHgpc';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

function getInfo (){
 $( "#myTableBody" ).empty();
 $( "#mycostTableBody" ).empty();
 $( "#info" ).empty();
 $( "#total" ).empty();
 document.getElementById("mainTable").style.visibility = "visible";
 document.getElementById("costTable").style.visibility = "visible";
 document.getElementById("costTableTitle").style.visibility = "visible";
  var fileInput = document.getElementById('tsv');
 
  var tsvFile = fileInput.files[0];
 
  var fr = new FileReader();
  fr.onload = function(){
     var text = fr.result;
     
    
  //fr.onload = receivedText;
  
  var startSort = false;
  var sku;
  var singleSKU;
  var FNSKU;
  var kitNum;
  var shippedQTY;
  var unitQTY=0;
  var id = "";
  var item;
  var lastSKU = "SKU";
  var nextSKU;
  var lines = text.split('\n');
  var dataTable = [];
  var totalUnitQTY;
  var card = "";
  var reviewCard = "";
  var singlePrice =0;
  var singleWeight = 0;
  var Type = "";
  var totalPrice =0;
  var costTable = []; 
  for (var i = 0; i<lines.length -1; i++){
    //get baic info
    if(i<=7){
      $("#info").append(lines[i]+"<br>");
    }else if (i>=9){
    // deal with sorting
    var line = lines[i].split('\t');//split tab
    //get sku

    sku = line[0].split(".")[0];
    //insert SKU
    var nextSKU = ((lines[i+1].split('\t'))[0].split(".")[0]).split("K")[0];
    //console.log("nextSKU" + nextSKU);
    //check Kit number and single sku
    if(sku.indexOf('K')>-1){
    	singleSKU = sku.split("K")[0];
    	kitNum = sku.split("K")[1];
    }else{
    	singleSKU = sku;
    	kitNum = 1;
    }
        //get shipped qty
    shippedQTY = line[9];
    unitQTY += shippedQTY * kitNum;


    //check if is the same item or not
    if (singleSKU != nextSKU){
     // dataTable[i][3] = singleSKU;
     item = singleSKU;
     id = getID(item,ramData);
     totalUnitQTY = unitQTY;
     unitQTY = 0;
    }else{
      item = "";
      id = "";
      totalUnitQTY ='';
    }
    FNSKU = line[3];
    if(sku.includes("AP")){
      card = "Apple";
    }else{
      card = "";
    }

    if(kitNum>=2){
      reviewCard = "Review";
    }else{
      reviewCard = "";
    }
    Type = getType(singleSKU);
    console.log(Type);
    singlePrice = getPrice(singleSKU);
    singleWeight = getWeight(singleSKU);
    dataTable[i] = {SKU:sku,FNSKU: FNSKU, shipped:shippedQTY,Item:item,QTY:totalUnitQTY,ID:id};
    
    
    if(costTable[Type] != null ){
      costTable[Type] = {singlePrice:singlePrice,singleWeight:singleWeight,typeTotalUnitQTY:costTable[Type].typeTotalUnitQTY+(shippedQTY * kitNum) };
    }else{
      costTable[Type] = {singlePrice:singlePrice,singleWeight:singleWeight,typeTotalUnitQTY: shippedQTY * kitNum};
    }
    
    $("#myTableBody").append('<tr><td>'
      +sku+'</td><td>'
      +FNSKU+'</td><td>'
      +shippedQTY+'</td><td>'
      +item+'</td><td>'
      +totalUnitQTY+'</td><td>'
      +id+'</td><td>'
      +card+'</td><td>'
      +reviewCard+'</td><td>'); 	

 }
}
 console.log(dataTable);
 console.log(costTable);
 var totalCost=0;
 var totalWeight=0;
 for (var x in costTable){
    $("#mycostTableBody").append('<tr><td>'
      +x+'</td><td>'
      +costTable[x].typeTotalUnitQTY+'</td><td>'
      +costTable[x].singlePrice+'</td><td>'
      +costTable[x].singleWeight+'</td><td>'
      +(costTable[x].typeTotalUnitQTY * costTable[x].singlePrice).toFixed(2)+'</td><td>'
      +(costTable[x].typeTotalUnitQTY * costTable[x].singleWeight).toFixed(2)+'</td><td>');  
      totalCost += costTable[x].typeTotalUnitQTY * costTable[x].singlePrice;
      totalWeight += costTable[x].typeTotalUnitQTY * costTable[x].singleWeight;
 }
 $("#total").append("Total Cost: " + totalCost.toFixed(2) + "  Total Weight: "+totalWeight.toFixed(2)); 
 };
 fr.readAsText(tsvFile);

 

/*var data1 = {"FNSKU":"123"};
var params = {"values": []};
 $("#mainTable tr").each(function(index, item){
   var temp = []
   if(index == 0) {
      $(item).find('th').each(function(idx, col){
         temp.push($(col).text());
      })
   }
  $(item).find('td').each(function(idx, col){
     temp.push($(col).text());
    })
  params.values.push(temp);
})
console.log(params);*/


//create("FBA",1);
//sendToSheet();

return false;



}


function getID(item,ramData){

 var ramDataOBJ = JSON.parse(ramData);
 //console.log("ramDataOBJ.ram.length " + ramDataOBJ.ram.length);
 //console.log("ramDataOBJ[0] " + ramDataOBJ.ram[0].Timetec_Part);
 for (var j = 0; j< ramDataOBJ.ram.length; j++){
   if (ramDataOBJ.ram[j].Timetec_Part == item){
        return ramDataOBJ.ram[j].ID;
    }
 }
}

function getType(item){

 var ramDataOBJ = JSON.parse(ramData);
 for (var j = 0; j< ramDataOBJ.ram.length; j++){
   if (ramDataOBJ.ram[j].Timetec_Part == item){
        return ramDataOBJ.ram[j].TYPE;
    }
 }
}
function getPrice(item){
 var ramDataOBJ = JSON.parse(ramData);
 for (var j = 0; j< ramDataOBJ.ram.length; j++){
   if (ramDataOBJ.ram[j].Timetec_Part == item){
        return ramDataOBJ.ram[j].Price;
    }
 }

}
function getWeight(item){
 var ramDataOBJ = JSON.parse(ramData);
 for (var j = 0; j< ramDataOBJ.ram.length; j++){
   if (ramDataOBJ.ram[j].Timetec_Part == item){
        return ramDataOBJ.ram[j].Weight;
    }
 }

}

function create(title, callback) {
  // [START sheets_create]
  gapi.client.sheets.spreadsheets.create({
    properties: {
      title: title
    }
  }).then((response) => {
    // [START_EXCLUDE silent]
    callback(response);
    console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
    // [END_EXCLUDE]
  });
  // [END sheets_create]
}

function sendToSheet(){

console.log("in sendToSheet");
var values = [
  [
    12// Cell values ...
  ],
  // Additional rows ...
];

var body = {
  values: values
};
gapi.client.sheets.spreadsheets.values.update({
   spreadsheetId: "1QhnVeCLL3GUoAJ2JL8n7nEMCwxFZoW9uRAbi4gY_ATc",
   range: A1,
   valueInputOption: valueInputOption,
   resource: body
}).then((response) => {
  var result = response.result;
  console.log(`${result.updatedCells} cells updated.`);
});
}

var ramData ='{"ram":['+
  '{"Timetec_Part": "75TT13NU1R8-4G","ID": "NP10","TYPE": "U DDR3 4G","Price": 20,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT13NU2R8-8G","ID": "NP11","TYPE": "U DDR3 8G","Price": 36,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT16NUL1R8-4G","ID": "NP12","TYPE": "U DDR3 4G","Price": 20,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT16NUL2R8-8G","ID": "NP13","TYPE": "U DDR3 8G","Price": 36,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT18NU1R8-4G","ID": "NP14","TYPE": "U DDR3 4G","Price": 20,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT18NU2R8-8G","ID": "NP15","TYPE": "U DDR3 8G","Price": 36,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT13NU2R8-4G","ID": "NP16","TYPE": "U DDR3 4G","Price": 20,"Weight": 0.0703},'+
  '{"Timetec_Part": "75TT16NUL2R8-4G","ID": "NP17","TYPE": "U DDR3 4G","Price": 20,"Weight": 0.0703},'+
 '{"Timetec_Part": "76TT13NUS1R8-4G","ID": "NP21","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT13NUS2R8-8G","ID": "NP22","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT16NUSL1R8-4G","ID": "NP23","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT16NUSL2R8-8G","ID": "NP24","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT18NUS1R8-4G","ID": "NP25","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT18NUS2R8-8G","ID": "NP26","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT13NUS2R8-4G","ID": "NP27","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT16NUSL2R8-4G","ID": "NP28","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP10NUS2R8-4G","ID": "NP1","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP10NUS2R8-8G","ID": "NP2","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP13NUS1R8-4G","ID": "NP3","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP13NUS2R8-8G","ID": "NP4","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP16NUSL1R8-4G","ID": "NP5","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP16NUSL2R8-8G","ID": "NP6","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP18NUSL2R8-8G","ID": "NP7","TYPE": "S DDR3 8G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP13NUS2R8-4G","ID": "NP8","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP16NUSL2R8-4G","ID": "NP9","TYPE": "S DDR3 4G","Price": 20,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP24NUS2R8-8G","ID": "NP51","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP24NUS1R8-8G","ID": "NP53","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "78AP24NUS2R8-16G","ID": "NP52","TYPE": "S DDR4 16G","Price": 120,"Weight": 0.0391},'+
 '{"Timetec_Part": "75TT21NU1R8-4G","ID": "NP31","TYPE": "U DDR4 4G","Price": 36,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT21NU2R8-8G","ID": "NP32","TYPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT21NU2R8-8G","ID": "NP32.1","TYPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT21NU2R8-16G","ID": "NP33","TYPE": "U DDR4 16G","Price": 128,"Weight": 0.0793},'+
 '{"Timetec_Part": "75TT21NU1R8-8G","ID": "NP34","YPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT24NU2R8-8G","ID": "NP35","TYPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT24NU2R8-16G","ID": "NP36","TYPE": "U DDR4 16G","Price": 128,"Weight": 0.0793},'+
 '{"Timetec_Part": "75TT24NU2R8-16G","ID": "NP36.1","TYPE": "U DDR4 16G","Price": 128,"Weight": 0.0793},'+
 '{"Timetec_Part": "75TT24NU1R8-4G","ID": "NP37","TYPE": "U DDR4 4G","Price": 36,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT24NU1R8-8G","ID": "NP38","TYPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "76TT21NUS1R8-4G","ID": "NP41","TYPE": "S DDR4 4G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT21NUS2R8-8G","ID": "NP42","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT21NUS1R8-8G","ID": "NP43","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT21NUS2R8-16G","ID": "NP44","TYPE": "S DDR4 16G","Price": 120,"Weight": 0.0391},'+
 '{"Timetec_Part": "76TT24NUS1R8-4G","ID": "NP46","TYPE": "S DDR4 4G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT24NUS2R8-8G","ID": "NP47","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT24NUS1R8-8G","ID": "NP48","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "76TT24NUS2R8-16G","ID": "NP49","TYPE": "S DDR4 16G","Price": 120,"Weight": 0.0391},'+
 '{"Timetec_Part": "75TT26NU1R8-8G","ID": "NP61","TYPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT26NU2R8-8G","ID": "NP62","TYPE": "U DDR4 8G","Price": 64,"Weight": 0.0703},'+
 '{"Timetec_Part": "75TT26NU2R8-16G","ID": "NP63","TYPE": "U DDR4 16G","Price": 128,"Weight": 0.0793},'+
 '{"Timetec_Part": "76HN21NUS1R8-8G","ID": "HN01","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "76HN24NUS1R8-8G","ID": "HN02","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "76HN21NUS2R8-16G","ID": "HN03","TYPE": "S DDR4 16G","Price": 120,"Weight": 0.0391},'+
 '{"Timetec_Part": "75HN24NU1R8-8G","ID": "HN04","TYPE": "U DDR4 4G","Price": 36,"Weight": 0.0703},'+
 '{"Timetec_Part": "76HN26NUS1R16-4G","ID": "HN05","TYPE": "S DDR4 4G","Price": 36,"Weight": 0.0313},'+
 '{"Timetec_Part": "76HN26NUS1R8-8G","ID": "HN06","TYPE": "S DDR4 8G","Price": 64,"Weight": 0.0313},'+
 '{"Timetec_Part": "35MCM6008-480G","ID": "SD01","TYPE": "SSD M2 480","Price": 35,"Weight": 0.05625},'+
 '{"Timetec_Part": "30TT2535C-120G","ID": "SD03","TYPE": "SSD 120","Price": 22.5,"Weight": 0.2125},'+
 '{"Timetec_Part": "30TT2535C-240G","ID": "SD04","TYPE": "SSD 240","Price": 42,"Weight": 0.2125},'+
 '{"Timetec_Part": "30TT2535C-480G","ID": "SD05","TYPE": "SSD 480","Price": 81,"Weight": 0.2125}]}';


function handleClientLoad() {
        gapi.load('client:auth2', initClient);
}
function initClient() {
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
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listMajors();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}
function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
}

function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
          range: 'Class Data!A2:E',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            appendPre('Name, Major:');
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              appendPre(row[0] + ', ' + row[4]);
            }
          } else {
            appendPre('No data found.');
          }
        }, function(response) {
          appendPre('Error: ' + response.result.error.message);
        });
}