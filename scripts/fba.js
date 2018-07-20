//console.log("lines[0]");
function getInfo (e){
	
  if ($('#dataTextArea').val() !="") {

  var lines = $('#dataTextArea').val().replace(/\n/g,"###").replace(/\s/g,"@@");
  var sku;
  var FNSKU;
  var shippedQTY;
  var item;
  var unitQTY;
  var id;

  console.log(lines);
  //Get bullet 4
  
  /*for(var k = 0;k < lines.length-1;k++){    
    tempBrand = lines[k].split("-");
    tempBrand[0] = tempBrand[0].replace(/@@/g," ");
    //console.log("tempBrand[0]" + tempBrand[0]);
    
    if(tempBrand[0].toUpperCase() != tempBrandOld.toUpperCase()){
      tempBrandOld = tempBrand[0];
      compatiBrand +=tempBrand[0]+", ";
      brandNum++;
      
    }


  }
  compatiBrand = compatiBrand.slice(0, -2);
  var charNum=0;

  //get non apple description
  if(document.getElementById("appleCheckbox").checked == false){
    

  }else{// **************if apple description is checked
 
  }
*/
  }
return false;
}