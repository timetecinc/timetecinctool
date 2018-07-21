//console.log("lines[0]");
function getInfo (e){
	
 if ($('#dataTextArea').val() !="") {

  
  var sku;
  var singleSKU;
  var FNSKU;
  var kitNum;
  var shippedQTY;
  var unitQTY;
  var id;

  
  var lines = $('#dataTextArea').val().split('\n');

  for (var i = 1; i<lines.length -1; i++){
    var line = lines[i].split('\t');//split tab
    //get sku
    sku = line[0].split(".")[0];
    //check Kit number and single sku
    if(sku.indexOf('K')>-1){
    	singleSKU = sku.split("K")[0];
    	kitNum = sku.split("K")[1];
    }else{
    	singleSKU = sku;
    	kitNum = 1;
    }
    //get fnsku
    FNSKU = line[3];

  	//get shipped qty
  	shippedQTY = line[9];
  	
    console.log(sku);
    console.log(kitNum);
    console.log(FNSKU); 
    console.log(shippedQTY);   	
 }

}
return false;
}