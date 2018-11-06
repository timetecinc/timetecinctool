var requestReportID;
var reportID;
var isSendRequest = false;
function requestAReport(callback) {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
                isSendRequest = true;
                requestReportID = this.responseText;
                callback();
            }
        };
        xmlhttp.open("GET", "RequestReport1.php", true);
        xmlhttp.send();
        
    
}

function getReadyReportRequestList() {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
                if(this.responseText.includes("None") && isSendRequest == false){
                    console.log("reportID " + "None");
                    
                    requestAReport(function(){
                        console.log("resquest Id " + requestReportID);
                        console.log("is Requested" + isSendRequest);
                        /*setTimeout(function(){
                        console.log("Waiting");
                        }, 15000);*/
                        //getReadyReportRequestList();
                    });
                   
                    /*setTimeout(function(){
                        console.log("Waiting");
                    }, 15000);
                    getReadyReportRequestList();*/
                }else if (this.responseText.includes("None") && isSendRequest == true){
                    console.log("still not found");
                    //getReadyReportRequestList();
                }else{
                    reportID = this.responseText.split ( "!" )[1].replace ( /[^\d.]/g, '');
                    console.log("reportID " + reportID);
                    getReadyReport();
                }
            }
        };
        xmlhttp.open("GET", "GetReportRequestListSample.php?requestID=" + requestReportID, true);
        xmlhttp.send();
    
}

function getReadyReportList() {

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
                reportID = this.responseText.replace ( /[^\d.]/g, '');

            }
        };
        console.log("requestReportID " + requestReportID);
        xmlhttp.open("GET", "GetReportListSample.php?requestID=" + requestReportID, true);
        xmlhttp.send();
    
}
function getReadyReport() {
        console.log("ReportID " + reportID);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("txtHint").innerHTML = this.responseText;
                //reportID = this.responseText;
                console.log(this.responseText);
                var result = this.responseText;

            }
        };
        xmlhttp.open("GET", "GetReportSample.php?reportId=" + reportID, true);
        xmlhttp.send();
    
}

function getUsefulData(result){
    var lines = result.split('\n');
    var sku;
    var line;
    var invQTY;
    var fbaInv;
    for(var i=0; i< lines.length; i++){
        line = lines[i].split("\t");
        if(line[0].includes("CA")){
            sku = line[0];
            invQTY = line[10] + line[15] + line[16] + line[17];
            fbaInv[i] = {SKU:sku, invQTY: invQTY};
        }
    }

}
