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


  //=========Star decode file===========================================================
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
     id = getID(singleSKU);
     
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
    Type = getType(singleSKU,dataBase);
    //console.log(Type);
    singlePrice = getPrice(singleSKU,dataBase);
    singleWeight = getWeight(singleSKU,dataBase);
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



return false;



}


function getID(item){
  //console.log("dataBase is [0] Key " + dataBase[item].ID);
  if(dataBase[item]!=null){
    return dataBase[item].ID;
  }else{
    return 'Not Found'; 
  }

}

function getType(item,dataBase){
 
 //var ramDataOBJ = JSON.parse(ramData);

  //return dataBase[item].Type;
    if(dataBase[item]!=null){
    return dataBase[item].Type;
  }else{
    return 'Not Found';
  }
}
function getPrice(item,dataBase){
 //var ramDataOBJ = JSON.parse(ramData);
 //return dataBase[item].CostUSD;
 if(dataBase[item]!=null){
    return dataBase[item].CostUSD;
  }else{
    return 'Not Found';
  }
}
function getWeight(item){
// var ramDataOBJ = JSON.parse(ramData);
 //return dataBase[item].WeightLB;
  if(dataBase[item]!=null){
    return dataBase[item].WeightLB;
  }else{
    return 'Not Found'; 
  }
}

