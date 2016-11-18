var sku;
var brand;
var product_type;
var Manufacturer_part_num;
var memory_type;
var capacity;
var standard="DDR3";
var speed;
var error_check = "Non-ECC";
var signal="Unbuffered";
var voltage = "1.5V";
var CL;
var rank;
var rankNum;
var rank2;
var pin;
var PC;
var PCNum;
var DIMM;
var kit=0;
var number;
var warranty;
function getInfo(e){
 error_check = "Non-ECC";
 signal="Unbuffered";
 voltage = "1.5V";
 standard="DDR3";
 kit=1;
 pin = "240 Pin";
 warranty = "life";
 $('.error').html("");
 var DDRGroup = document.getElementsByName('DDRGroup');

 for (var i=0;i<DDRGroup.length;i++) {
  if (DDRGroup[i].checked) {
    standard =  DDRGroup[i].value;
  }
}

var numGroup = document.getElementsByName('numGroup');

for (i=0;i<numGroup.length;i++) {
  if (numGroup[i].checked) {
    number =  numGroup[i].value;
  }
}

if (standard == "DDR2"){
  voltage = "1.8V";
  PC = "PC2";
}else if (standard == "DDR4"){
  voltage = "1.2V";
  PC = "PC4";
}else {
  PC = "PC3";
}

sku = $("#SKU").val();

if(sku[0] != 7 ){

 $('.error').html('<p style="color:red;text-align:left;">ERROR: SKU number start with 7</p>');
}
else if( sku[1] == 0 || sku[1] ==1 || sku[1]==3){

  product_type = "Server"
  if(sku[1]==0){
    warranty = "1year";
  }
  if(sku[1]==3){
    warranty = "3month";
  }
  DIMM="RDIMM";
}else if(sku[1]==5){
  product_type = "Desktop";
  DIMM="UDIMM";
}else if (sku[1]==6){
  product_type = "Laptop Notebook Computer";
  DIMM ="SODIMM"
}else if (sku[1]==8){

  product_type="Apple";
  DIMM = "SODIMM"
    //brand ="Apple";
  }else{

    $('.error').html('<p style="color:red;text-align:left;">ERROR: Cannot find memory type</p>');
  }

  

  <!--////////////////////////////////////////////////////////////////////////////////////////////-->
  if (sku[2]+sku[3] == 'TT'){

    brand = "";
  }else if (sku[2+sku[3]== 'DL']){

    brand = "Dell";
  }else if (sku[2+sku[3]== 'HP']){

    brand = "HP";
  }else if (sku[2+sku[3]== 'NY']){

    brand = "Nanya";
  }else if (sku[2+sku[3]== 'SM']){

    brand = "Samsung";
  }else if (sku[2+sku[3]== 'TG']){

    brand = "Teamgroup";
  }else if (sku[2+sku[3]== 'KG']){

    brand = "Kingston";
  }else if( sku[2]+sku[3] == 'HN'){
    brand = "Hynix";
  }else if (sku[2]+sku[3] == 'AP'){

    brand = "Apple";

  }else{
    brand ="Unknow"

  }
 <!--////////////////////////////////////////////////////////////////////////////////////////////-->
 if (sku[4]+sku[5] == 80){
  speed = 800;
  PCNum = 6400;
  CL ="CL6";
}else if (sku[4]+sku[5] == 10){

  speed = 1066;
  PCNum = 8500;
  CL="CL8";
}else if (sku[4]+sku[5] == 13){

  speed = 1333;
  PCNum = 10600;
  CL= "CL9";
}else if (sku[4]+sku[5] == 16){

  speed = 1600;
  PCNum = 12800;
  CL = "CL11";
}else if (sku[4]+sku[5] == 18){

  speed= 1866;
  PCNum = 14900;
  CL="CL13";
}else if (sku[4]+sku[5] == 21){

  speed= 2133;
  PCNum = 17000;
  CL="CL15";
}else{
  speed = "Unknow speed";
} 
<!--////////////////////////////////////////////////////////////////////////////////////////////-->

for (var i=6; i< sku.length;i++){
  if (sku[i] == 'E'){
    error_check = "ECC"
    if(sku[i+1]== 'U'){
      signal = "Unbuffered"
    }else if (sku[i+1] == 'R'){
      signal = "Registered"
    }
  }
  if (sku[i] == 'L'){
    voltage ="1.35V";
    standard = "DDR3L"
  }


  if(sku[i]=='-'){
    rank2 = sku[i-1];
    if(sku[i-3] == 1){
      rank = "Single Rank"
      rankNum = 1;
    }else if(sku[i-3] == 2){

      rank = "Dual Rank"
      rankNum = 2;
    }else  if(skup[i-3] == 4){
      rank = "Quad Rank";
      rankNum = 4;

    }

    if(sku[i+2] == 'G'){
      capacity=sku[i+1];

    }else{

      capacity = sku[i+1]+sku[i+2];
    }
  }

  if(sku[i]=='K'){
    kit=sku[i+1];
  }

  if(sku[i]=='S'){
    pin = "204 Pin"
  }

  

}



if(kit ==1){
  console.log(brand+" "+capacity+"GB"+" "+speed+"MHz"+" "+ signal +" "+error_check+" "+product_type +" Memory Ram Module Upgrade");
}
else{
  console.log(brand+" "+capacity*kit+"GB Kit ("+kit+"*"+capacity+"GB) "+speed+"MHz"+" "+ signal +" "+error_check+" "+product_type +" Memory Ram Module Upgrade");
}

displayInfo();

return false;

}

function displayInfo(){
  //--------------------Title-------------------------------------------------------------------
  var title;
  if(kit ==1){
    title = "Timetec "+brand+" "+capacity+"GB "+standard+" "+speed+"MHz"+" "+PC+"-"+PCNum+" "+signal +" "+error_check+" "+voltage+" "+CL+" "+rankNum+"Rx"+rank2+" "+rank+" "+pin+" "+DIMM+" "+product_type+" Memory Ram Module Upgrade";
  }
  else{
    title = "Timetec "+brand+" "+capacity*kit+"GB Kit ("+kit+"*"+capacity+"GB) "+standard+" "+speed+"MHz "+PC+"-"+PCNum+" "+signal +" "+error_check+" "+voltage+" "+CL+" "+rankNum+"Rx"+rank2+" "+rank+" "+product_type+" Memory Ram Module Upgrade";
  }


  $('#titleDiv').html("<b>Title:</b><br><br>" + title+"<br><br>");


//--------------------Bullet Point-------------------------------------------------------------------
var bullet1 = "• "+standard+" • "+speed+"MHz • "+ PC+"-"+PCNum+" • "+pin+" • "+signal+" • "+ error_check+" • " + voltage+" • "+ CL +" • "+ rank+ " • "+rankNum+"Rx"+rank2+" based"+" • "+number+"x"+rank2;
var bullet2;
if (voltage == "1.5V"){

  bullet2 = "JEDEC standard 1.5V (1.425V ~1.575V) Power Supply"; 

}else{

  bullet2 = "JEDEC standard 1.35V (1.28V ~ 1.45V) and 1.5V (1.425V ~ 1.575V) Power Supply • This is a dual voltage piece and can operate at 1.35V or 1.5V";
}

var bullet3 = "Module Size: "+ capacity+"GB • "+ "Package: "+ kit +"x" +capacity+"GB "
if(product_type == "Server"){
  bullet3 += " • A must for Servers, Not for Desktop PCs/Laptop";
}else if (product_type == "Desktop"){
  bullet3 += " • For Desktop Computer,  Not for Laptop";
}else if(product_type == "Laptop Notebook Computer"){
  bullet3 += " • For Laptop/Notebook,  Not for Desktop";
}else if (product_type == "Apple"){
  bullet3 += " • For Apple iMac/ Mac mini/ Macbook Pro only";
}

if(warranty =="1year"){
  var bullet4 = "Guaranteed – 1 year warranty from Purchase Date • Free technical support (support@timetecinc.com) • MON - FRI 9AM-6PM PST";
}else if (warranty =="3month"){

  var bullet4 ="Guaranteed – 3 months warranty from Purchase Date • Free technical support (support@timetecinc.com) • MON - FRI 9AM-6PM PST";
}else{
  var bullet4 ="Guaranteed – Lifetime warranty from Purchase Date • Free technical support (support@timetecinc.com) • MON - FRI 9AM-6PM PST";
}

$('#bulletDiv').html("<b>Bullet Points:</b><br><br>" +bullet1+"<br><br>"+bullet2+"<br><br>"+bullet3+"<br><br>"+bullet4+"<br><br>");

//--------------------Description-------------------------------------------------------------------
  
var description = "<b>&ltb&gtTimetec® – Memory of a lifetime&lt/b&gt</b>&ltbr&gt<br> &ltbr&gt <br><b> &ltb&gt Compatible with (But not Limited to): &lt/b&gt </b>&ltbr&gt<br> <p>&ltp&gt*Please click image for more compatible systems model#&lt/p&gt</p><b>&ltb&gtNeed to know if this part is compatible?&lt/b&gt</b>&ltbr&gt<br><p>&ltp&gtContact us with manufacturer and model information of your motherboard&lt/p&gt</p>";
$("#descripDiv").html("<b>Description:</b><br><br>"+description);
}