//console.log("lines[0]");
function getInfo (e){
	
  if ($('#dataTextArea').val() !="") {

  
  var sku;
  var FNSKU;
  var shippedQTY;
  var item;
  var unitQTY;
  var id;

  
  var lines = $('#dataTextArea').val().split('\n');
  for (var i = 0; i<lines.length -1; i++){
    var line = lines[i].split('\t');//split tab
    sku = line[0].split(".")[0];

      console.log(sku);
  }

  }
return false;
}