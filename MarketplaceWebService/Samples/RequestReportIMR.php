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
date_default_timezone_set('America/Los_Angeles');
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
$serviceUrl = "https://mws.amazonservices.com";
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
//$serviceUrl = "https://mws.amazonservices.ca";
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
$marketplaceIdArray = array("Id" => array('ATVPDKIKX0DER'));

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

   $request = new MarketplaceWebService_Model_RequestReportRequest();
   $request->setMarketplaceIdList($GLOBALS['marketplaceIdArray']);
   $request->setMerchant(MERCHANT_ID);
   $request->setReportType('_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_');
  // $request->setMWSAuthToken('<MWS Auth Token>'); // Optional

  // Using ReportOptions
  // $request->setReportOptions('ShowSalesChannel=true');
  $reportListRequest = new MarketplaceWebService_Model_GetReportRequestListRequest();
  $reportListRequest->setMerchant(MERCHANT_ID);
  //===============================
  $getReportRequest = new MarketplaceWebService_Model_GetReportRequest();
  $getReportRequest->setMerchant(MERCHANT_ID);
  $getReportRequest->setReport(@fopen('php://memory', 'rw+'));
  
   $RequestRID = '';
   require __DIR__.'../../../vendor/autoload.php';

   use Kreait\Firebase\Factory;
   use Kreait\Firebase\ServiceAccount;
   
   $serviceAccount = ServiceAccount::fromJsonFile(__DIR__.'../../timetec-data-d508d881d74d.json');
   
   $firebase = (new Factory)
       ->withServiceAccount($serviceAccount)
       ->withDatabaseUri('https://timetec-data.firebaseio.com/')
       ->create();
   
   $database = $firebase->getDatabase(); 
  invokeRequestReport($service, $request,$database, $reportListRequest, $getReportRequest);
  function invokeRequestReport(MarketplaceWebService_Interface $service, $request,$database,$reportListRequest,$getReportRequest) 
  {
      try {
              $response = $service->requestReport($request);

                if ($response->isSetRequestReportResult()) { 
                    $requestReportResult = $response->getRequestReportResult();
                    if ($requestReportResult->isSetReportRequestInfo()) {
                        $reportRequestInfo = $requestReportResult->getReportRequestInfo();
                          if ($reportRequestInfo->isSetReportRequestId()) 
                          {
                             echo($reportRequestInfo->getReportRequestId());
                             //return $reportRequestInfo->getReportRequestId();
                             $requestID = $reportRequestInfo->getReportRequestId();
                             sleep(15);

                             invokeGetReportRequestList($service, $reportListRequest,$requestID,$database,$getReportRequest);
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
 function invokeGetReportRequestList(MarketplaceWebService_Interface $service, $request,$requestID,$database,$getReportRequest) 
  {
      $nowTime = new DateTime('NOW');
      $diff = date_sub($nowTime,new DateInterval('P0Y0DT0H30M'));
      try {
              $response = $service->getReportRequestList($request);
              
               
                if ($response->isSetGetReportRequestListResult()) { 
                    $getReportRequestListResult = $response->getGetReportRequestListResult();
                    if ($getReportRequestListResult->isSetNextToken()) 
                    {
                        
                       $getReportRequestListResult->getNextToken();
                    }
                    if ($getReportRequestListResult->isSetHasNext()) 
                    {
                        
                        $getReportRequestListResult->getHasNext();
                    }
                    $reportRequestInfoList = $getReportRequestListResult->getReportRequestInfoList();

                    foreach ($reportRequestInfoList as $reportRequestInfo) {
                        //echo nl2br("                ReportRequestInfo\n");
                        if ($reportRequestInfo->isSetReportRequestId()) 
                          {
                              //echo nl2br("                    ReportRequestId\n");
                              //echo nl2br("                        " . $reportRequestInfo->getReportRequestId() . "\n");
                              if($reportRequestInfo->getReportRequestId() == $requestID){
                                echo nl2br("ReportRequestId Found" . $requestID . "\n" );
                                if($reportRequestInfo->isSetReportProcessingStatus()){
                                    $reportRequestInfo->getReportProcessingStatus();
                                     echo nl2br("ReportProcessingStatus" . $reportRequestInfo->getReportProcessingStatus() . "\n" );
                                }
                                if($reportRequestInfo->isSetGeneratedReportId()){
                                  echo nl2br("getGeneratedReportID Found!\n");
                                  echo nl2br($reportRequestInfo->getGeneratedReportId());
                                  sleep(3);
                                  $getReportRequest->setReportId($reportRequestInfo->getGeneratedReportId());
                                  invokeGetReport($service, $getReportRequest, $database, "CA");
                                  return;
                                }
                                
                              }

                          }
                          if ($reportRequestInfo->isSetReportType()) 
                          {
                              
                             if( $reportRequestInfo->getReportType() == '_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_'){
                              //echo nl2br('nowTime' . $nowTime);
                             // echo nl2br('endDate' . $reportRequestInfo->getEndDate());
                             
                              
                              //$minutes   = round($diff / 60);
                              echo nl2br('now time sub  M ' . $diff->format('Y-m-d H:i:s') . "\n");
                              if($diff < $reportRequestInfo->getCompletedDate()){
                               if($reportRequestInfo->isSetGeneratedReportId()){
                                  echo nl2br("NowDate " . $nowTime->format('Y-m-d H:i:s'). "\n");
                                  echo nl2br("getCompletedDate " . $reportRequestInfo->getCompletedDate()->format('Y-m-d H:i:s') . "\n");
                                  echo nl2br("getMostRecentGeneratedReportID Found!\n");
                                  echo nl2br($reportRequestInfo->getGeneratedReportId());
                                  $getReportRequest->setReportId($reportRequestInfo->getGeneratedReportId());
                                 

                                  invokeGetReport($service, $getReportRequest, $database, "CA");

                                  return;
                                }
                              }
                             }
                          }
                          // add end
                          
                    }
                    echo nl2br("None");
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

 function invokeGetReport(MarketplaceWebService_Interface $service, $request,$database,$requestCountry) 
 {
     try {
             $response = $service->getReport($request);
             
               if ($response->isSetGetReportResult()) {
                 $getReportResult = $response->getGetReportResult(); 
                // echo ("            GetReport");
                 
                 if ($getReportResult->isSetContentMd5()) {
                  // echo ("                ContentMd5");
                   //echo ("                " . $getReportResult->getContentMd5() . "\n");
                 }
               }
               
               //echo ("        Report Contents\n");
               //echo (stream_get_contents($request->getReport()) . "\n");

               $str = stream_get_contents($request->getReport());
               echo($str);
               
               //echo(explode("\n",$str));
               $lines = explode("\n",$str);
               $currentDate = date("YmdH");
               $FBAInv = array();
               $fulfillable=0;
               $reserved = 0; 
               $inbound = 0;
               $receiving = 0;
               for($i=0;$i< count($lines); $i++){
                 $line = explode("\t",$lines[$i]);
                 $sku = (explode(".",$line[0]))[0];
                 $fulfillable = (int)$line[10];
                 $reserved =(int) $line[12];
                 $inbound = (int)$line[16];
                 $receiving = (int)$line[17];
                 if(isset($FBAInv[$sku])){
                   $FBAInv[$sku]->fulfillable = $FBAInv[$sku]->fulfillable + $fulfillable;
                   $FBAInv[$sku]->reserved = $FBAInv[$sku]->reserved + $reserved;
                   $FBAInv[$sku]->inbound = $FBAInv[$sku]->inbound + $inbound;
                   $FBAInv[$sku]->receiving = $FBAInv[$sku]->receiving + $receiving;
                 }else{
                   $FBAItem = new stdClass();
                   $FBAItem-> fulfillable =  $fulfillable;
                   $FBAItem-> reserved =  $reserved;
                   $FBAItem-> inbound =  $inbound;
                   $FBAItem-> receiving =  $receiving;
                   $FBAInv[$sku] = $FBAItem;
                   /*$FBAItem = array("fulfillable"=>$fulfillable,
                   "reserved" =>  $reserved,
                   "inbound" =>  $inbound,"receiving" =>  $receiving);
                   $FBAInv[$sku] = $FBAItem;*/
                 }
               }
               //echo($FBAInv);
               //die(print($currentDate));
             $database->getReference("Report/".$requestCountry."Report/".(String)$currentDate)->set(["FBAInv"=>$FBAInv]);
               

               //echo("            ResponseHeaderMetadata: " . $response->getResponseHeaderMetadata() . "\n");
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