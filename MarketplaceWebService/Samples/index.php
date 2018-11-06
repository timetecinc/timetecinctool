<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>>
<body>

<h1>Welcome to my home page!</h1>

<button>
<!--<?php include 'RequestReportSample.php';?>-->
<button type="button" id ="requestReportBtn" onclick="requestAReport()">Request</button>
<script type="text/javascript">
    $(document).ready(function(){
        $("#requestReportBtn").click(function(){

            $.ajax({
                type: 'POST',
                url: 'RequestReportSample.php',
                success: function(data) {
                    //alert(data);
                    $("p").text(data);

                }
            });
  		 });
	 });
</script>
<button type="button" id ="getrequestListBtn" onclick="getReadyReportRequestList()">RequestList</button>
<script type="text/javascript">
    $(document).ready(function(){
        $("#getrequestListBtn").click(function(){

            $.ajax({
                type: 'POST',
                url: 'RequestReportSample.php',
                success: function(data) {
                    alert(data);
                    $("p").text(data);

                }
            });
  		 });
	 });
</script>
<button type="button" onclick="getReadyRReportList()">RequestList</button>
<p></p>
</body>
</html>