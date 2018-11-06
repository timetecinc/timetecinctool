<?php
/** 
 *  PHP Version 5
 *
 *  @category    Amazon
 *  @package     MarketplaceWebService
 *  @copyright   Copyright 2009 Amazon Technologies, Inc.
 *  @link        http://aws.amazon.com
 *  @license     http://aws.amazon.com/apache2.0  Apache License, Version 2.0
 *  @version     2009-01-01
 */
/******************************************************************************* 

 *  Marketplace Web Service PHP5 Library
 *  Generated: Thu May 07 13:07:36 PDT 2009
 * 
 */

/**
 * Report  Sample
 */

include_once ('.config.inc.php'); 

/************************************************************************
* Uncomment to configure the client instance. Configuration settings
* are:
*
* - MWS endpoint URL
* - Proxy host and port.
* - MaxErrorRetry.
***********************************************************************/
// IMPORTANT: Uncomment the approiate line for the country you wish to
// sell in:
// United States:
//$serviceUrl = "https://mws.amazonservices.com";
// United Kingdom
//$serviceUrl = "https://mws.amazonservices.co.uk";
// Germany
//$serviceUrl = "https://mws.amazonservices.de";
// France
//$serviceUrl = "https://mws.amazonservices.fr";
// Italy
//$serviceUrl = "https://mws.amazonservices.it";
// Japan
//$serviceUrl = "https://mws.amazonservices.jp";
// China
//$serviceUrl = "https://mws.amazonservices.com.cn";
// Canada
$serviceUrl = "https://mws.amazonservices.ca";
// India
//$serviceUrl = "https://mws.amazonservices.in";

$config = array (
  'ServiceURL' => $serviceUrl,
  'ProxyHost' => null,
  'ProxyPort' => -1,
  'MaxErrorRetry' => 3,
);

/************************************************************************
 * Instantiate Implementation of MarketplaceWebService
 * 
 * AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY constants 
 * are defined in the .config.inc.php located in the same 
 * directory as this sample
 ***********************************************************************/
 $service = new MarketplaceWebService_Client(
     AWS_ACCESS_KEY_ID, 
     AWS_SECRET_ACCESS_KEY, 
     $config,
     APPLICATION_NAME,
     APPLICATION_VERSION);
 
/************************************************************************
 * Uncomment to try out Mock Service that simulates MarketplaceWebService
 * responses without calling MarketplaceWebService service.
 *
 * Responses are loaded from local XML files. You can tweak XML files to
 * experiment with various outputs during development
 *
 * XML files available under MarketplaceWebService/Mock tree
 *
 ***********************************************************************/
 // $service = new MarketplaceWebService_Mock();

/************************************************************************
 * Setup request parameters and uncomment invoke to try out 
 * sample for Report Action
 ***********************************************************************/
// Constructing the MarketplaceId array which will be passed in as the the MarketplaceIdList 
// parameter to the RequestReportRequest object.
$marketplaceIdArray = array("Id" => array('A2EUQ1WTGCTBG2'));

 // @TODO: set request. Action can be passed as MarketplaceWebService_Model_ReportRequest
 // object or array of parameters
 
 /*$parameters = array (
   'Merchant' => MERCHANT_ID,
   'MarketplaceIdList' => $marketplaceIdArray,
   'ReportType' => '_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_',
   'ReportOptions' => 'ShowSalesChannel=true',
   //'MWSAuthToken' => '<MWS Auth Token>', // Optional
 );*/
 
 //$request = new MarketplaceWebService_Model_RequestReportRequest($parameters);
 function requestAReport(){
   $request = new MarketplaceWebService_Model_RequestReportRequest();
   $request->setMarketplaceIdList($GLOBALS['marketplaceIdArray']);
   $request->setMerchant(MERCHANT_ID);
   $request->setReportType('_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_');
  // $request->setMWSAuthToken('<MWS Auth Token>'); // Optional

  // Using ReportOptions
  // $request->setReportOptions('ShowSalesChannel=true');
   $RequestRID = '';
   
     $GLOBALS['RequestRID'] = invokeRequestReport($service, $request);
 }
  //$RequestRID='159070017765';
/**
  * Get Report List Action Sample
  * returns a list of reports; by default the most recent ten reports,
  * regardless of their acknowledgement status
  *   
  * @param MarketplaceWebService_Interface $service instance of MarketplaceWebService_Interface
  * @param mixed $request MarketplaceWebService_Model_GetReportList or array of parameters
  */
  function invokeRequestReport(MarketplaceWebService_Interface $service, $request) 
  {
      try {
              $response = $service->requestReport($request);

                if ($response->isSetRequestReportResult()) { 
                    $requestReportResult = $response->getRequestReportResult();
                    if ($requestReportResult->isSetReportRequestInfo()) {
                        $reportRequestInfo = $requestReportResult->getReportRequestInfo();
                          if ($reportRequestInfo->isSetReportRequestId()) 
                          {
                             echo("Request Report ID  " .  $reportRequestInfo->getReportRequestId() . "<br>\n");
                             return $reportRequestInfo->getReportRequestId();
                          }
                         
                      }
                } 
     } catch (MarketplaceWebService_Exception $ex) {
         echo("Caught Exception: " . $ex->getMessage() . "\n");
         echo("Response Status Code: " . $ex->getStatusCode() . "\n");
         echo("Error Code: " . $ex->getErrorCode() . "\n");
         echo("Error Type: " . $ex->getErrorType() . "\n");
         echo("Request ID: " . $ex->getRequestId() . "\n");
         echo("XML: " . $ex->getXML() . "\n");
         echo("ResponseHeaderMetadata: " . $ex->getResponseHeaderMetadata() . "\n");
     }
 }
 
 //===========request report list==============
 function getReadyReportRequestList(){
 /* $RRLParameters = array (
     'Merchant' => MERCHANT_ID,
     'ReportRequestIdList' => array($RequestRID),
     //'MWSAuthToken' => '<MWS Auth Token>', // Optional
   );*/
  //$RRLPrequest = new MarketplaceWebService_Model_GetReportRequestListRequest($RRLParameters);
   
  $RRLPrequest = new MarketplaceWebService_Model_GetReportRequestListRequest();
  $RRLPrequest->setMerchant(MERCHANT_ID);
  //$RRLPrequest->setReportRequestIdList(array($RequestRID));

    invokeGetReportRequestList($GLOBALS['service'], $RRLPrequest,$RequestRID);
}


 function invokeGetReportRequestList(MarketplaceWebService_Interface $service, $request,$RRID) 
  {
      try {
              $response = $service->getReportRequestList($request);
                echo ("Get ReportRequestList Response\n");
                echo ("=============================================================================<br/>\n");
             
                if ($response->isSetGetReportRequestListResult()) { 
                    $getReportRequestListResult = $response->getGetReportRequestListResult();
                    if ($getReportRequestListResult->isSetNextToken()) 
                    {
                        echo nl2br("                NextTokenReportRequestList<br/>\n");
                        echo nl2br("                    " . $getReportRequestListResult->getNextToken() . "<br/>\n");
                    }
                    if ($getReportRequestListResult->isSetHasNext()) 
                    {
                        echo nl2br("                HasNext\n");
                        echo nl2br("                    " . $getReportRequestListResult->getHasNext() . "<br/>\n");
                    }
                    $reportRequestInfoList = $getReportRequestListResult->getReportRequestInfoList();
                    foreach ($reportRequestInfoList as $reportRequestInfo) {
                        echo nl2br("                ReportRequestInfo<br/>\n");
                    if ($reportRequestInfo->isSetReportRequestId()) 
                          {
                            echo("Request Report ID  " .  $reportRequestInfo->getReportRequestId() . "<br>\n");
                             $reportRequestInfo->getReportRequestId();
                          }
                          if ($reportRequestInfo->isSetReportType()) 
                          {
                              echo nl2br("                    ReportType<br/>\n");
                              echo nl2br("                        " . $reportRequestInfo->getReportType() . "<br/>\n");
                          }
                          if($reportRequestInfo->isSetReportProcessingStatus()){
                             echo nl2br("                        " . $reportRequestInfo->getReportProcessingStatus() . "<br/>\n");
                          }
                          // add end
                          if($RRID == $reportRequestInfo->getReportRequestId()){
                            return $reportRequestInfo->getReportRequestId();
                          }
                    }
                } 

     } catch (MarketplaceWebService_Exception $ex) {
         echo("Caught Exception: " . $ex->getMessage() . "\n");
         echo("Response Status Code: " . $ex->getStatusCode() . "\n");
         echo("Error Code: " . $ex->getErrorCode() . "\n");
         echo("Error Type: " . $ex->getErrorType() . "\n");
         echo("Request ID: " . $ex->getRequestId() . "\n");
         echo("XML: " . $ex->getXML() . "\n");
         echo("ResponseHeaderMetadata: " . $ex->getResponseHeaderMetadata() . "\n");
     }
 }

//===========================get report List=======================

function getReadyRReportList(){
     

    /* $RRparameters = array (
       'Merchant' => MERCHANT_ID,
       'AvailableToDate' => new DateTime('now', new DateTimeZone('PDT')),
       'AvailableFromDate' => new DateTime('-3 months', new DateTimeZone('PDT')),
       'Acknowledged' => false, 
    //   'MWSAuthToken' => '<MWS Auth Token>', // Optional
     );
     $RRrequest = new MarketplaceWebService_Model_GetReportListRequest($RRparameters);
     */
     $RRrequest = new MarketplaceWebService_Model_GetReportListRequest();
     $RRrequest->setMerchant(MERCHANT_ID);
     $RRrequest->setAvailableToDate(new DateTime('now', new DateTimeZone('PDT')));
     $RRrequest->setAvailableFromDate(new DateTime('-3 months', new DateTimeZone('PDT')));
     $RRrequest->setAcknowledged(false);

  $GLOBALS['reportId'] = invokeGetReportList($GLOBALS['service'], $RRrequest);
}
   function invokeGetReportList(MarketplaceWebService_Interface $service, $request,$RRID) 
  {
      try {
              $response = $service->getReportList($request);
                echo ("Get Report List Response\n");
                echo ("=============================================================================<br/>\n");
              
                if ($response->isSetGetReportListResult()) { 
                   
                    $getReportListResult = $response->getGetReportListResult();
                    if ($getReportListResult->isSetNextToken()) 
                    {
                      
                         $getReportListResult->getNextToken();
                    }
                    if ($getReportListResult->isSetHasNext()) 
                    {
                       
                         $getReportListResult->getHasNext();
                    }
                    $reportInfoList = $getReportListResult->getReportInfoList();
                    foreach ($reportInfoList as $reportInfo) {
                        
                        if ($reportInfo->isSetReportId()) 
                        {
                            echo("                    ReportId<br/>\n");
                            echo("                        " . $reportInfo->getReportId() . "<br/>\n");

                        }
                        if ($reportInfo->isSetReportType()) 
                        {
                            echo("                    ReportType<br/>\n");
                            echo("                        " . $reportInfo->getReportType() . "<br/>\n");
                        }
                        if ($reportInfo->isSetReportRequestId()) 
                        {
                            echo("                    ReportRequestId<br/>\n");
                            echo("                        " . $reportInfo->getReportRequestId() . "<br/>\n");
                        }
                        if ($reportInfo->isSetAvailableDate()) 
                        {
                            echo("                    AvailableDate<br/>\n");
                            echo("                        " . $reportInfo->getAvailableDate()->format(DATE_FORMAT) . "<br/>\n");
                        }
                        if ($reportInfo->isSetAcknowledged()) 
                        {
                            echo("                    Acknowledged<br/>\n");
                            echo("                        " . $reportInfo->getAcknowledged() . "<br/>\n");
                        }
                        if ($reportInfo->isSetAcknowledgedDate()) 
                        {
                            echo("                    AcknowledgedDate<br/>\n");
                            echo("                        " . $reportInfo->getAcknowledgedDate()->format(DATE_FORMAT) . "<br/>\n");
                        }
                        if($RRID == $reportInfo->getReportRequestId()){
                          return $reportInfo->getReportId();
                        }
                    }
                } 
     } catch (MarketplaceWebService_Exception $ex) {
         echo("Caught Exception: " . $ex->getMessage() . "\n");
         echo("Response Status Code: " . $ex->getStatusCode() . "\n");
         echo("Error Code: " . $ex->getErrorCode() . "\n");
         echo("Error Type: " . $ex->getErrorType() . "\n");
         echo("Request ID: " . $ex->getRequestId() . "\n");
         echo("XML: " . $ex->getXML() . "\n");
         echo("ResponseHeaderMetadata: " . $ex->getResponseHeaderMetadata() . "\n");
     }
 }
//================Get Report==========================================================
function getReadyReport(){
   /*$GRparameters = array (
     'Merchant' => MERCHANT_ID,
     'Report' => @fopen('php://memory', 'rw+'),
     'ReportId' => $reportId,
    // 'MWSAuthToken' => '<MWS Auth Token>', // Optional
   );
   $GRRequest = new MarketplaceWebService_Model_GetReportRequest($GRparameters);
*/
  
  $GRRequest = new MarketplaceWebService_Model_GetReportRequest();
  $GRRequest->setMerchant(MERCHANT_ID);
  $GRRequest->setReport(@fopen('php://memory', 'rw+'));
  $GRRequest->setReportId($reportId);
  echo (" Get reportId" . $reportId);
  //$request->setMWSAuthToken('<MWS Auth Token>'); // Optional
   
  invokeGetReport($service, $GRRequest);
}
 function invokeGetReport(MarketplaceWebService_Interface $service, $request) 
  {
      try {
              $response = $service->getReport($request);
              
                echo ("Get Report Response\n");
                echo ("=============================================================================<br/>\n");

                echo("        GetReportResponse<br/>\n");
                if ($response->isSetGetReportResult()) {
                  $getReportResult = $response->getGetReportResult(); 
                  echo ("            GetReport");
                  
                  if ($getReportResult->isSetContentMd5()) {
                    echo ("                ContentMd5");
                    echo ("                " . $getReportResult->getContentMd5() . "<br/>\n");
                  }
                }
                
                echo ("        Report Contents<br/>\n");
                //echo (stream_get_contents($request->getReport()) . "\n");

                $str = stream_get_contents($request->getReport());
                //echo(explode("\n",$str));
                $lines = explode("\n",$str);
                $FBAInv = array();
                for($i=0;$i< count($lines); $i++){
                  $line = explode("\t",$lines[$i]);
                  if(strpos($line[0], "CA")){
                    $sku = $line[0];
                    $FBAInvQTY = (int)$line[10] + (int)$line[15] + (int)$line[16] + (int)$line[17];
                    $FBAInv[$sku] = $FBAInvQTY;
                  }
                }

                foreach($FBAInv as $x => $x_value) {
                    echo "Key=" . $x . ", Value=" . $x_value;
                    echo "<br>";
                }
                                
                echo("            ResponseHeaderMetadata: " . $response->getResponseHeaderMetadata() . "\n");
     } catch (MarketplaceWebService_Exception $ex) {
         echo("Caught Exception: " . $ex->getMessage() . "\n");
         echo("Response Status Code: " . $ex->getStatusCode() . "\n");
         echo("Error Code: " . $ex->getErrorCode() . "\n");
         echo("Error Type: " . $ex->getErrorType() . "\n");
         echo("Request ID: " . $ex->getRequestId() . "\n");
         echo("XML: " . $ex->getXML() . "\n");
         echo("ResponseHeaderMetadata: " . $ex->getResponseHeaderMetadata() . "\n");
     }

}


?>

                                                                                
