/*
 * Copyright (C) 2012 Bryntum AB
 */

<?php
    function curPageURL() {
        $pageURL = 'http';
        if (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
            $pageURL .= "://";
        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        }
        return $pageURL;
    }

    $currentURL  = curPageURL();
    $break       = explode('/', $currentURL);
    $currentURL  = str_replace($break[count($break) - 1], '', $currentURL); 

    $pages       = array();
    $pdfs        = array();
    $files       = array();
    $cmd         = '';
    $phantomOut  = array();
    $imgkOut     = array();
    //name of the created single PDF file
    $out         = '-exportedPanel'.microtime().'.';
    $out         = str_replace(' ', '', $out);
    //path were temporary pdf files will be created
    $outputPath  = dirname(__FILE__);
    //command to run ImageMagick in console/terminal
    $imgkPath    = '';
    //command to run phantomjs in console/terminal
    $phantomPath = 'phantomjs';
    $msg         = "Error in request data.";

    if(isset($_POST['html'])){
        $html        = json_decode($_POST['html'], true);
        $format      = stripslashes($_POST['format']);
        $orientation = stripslashes($_POST['orientation']);
        $range       = stripslashes($_POST['range']);
        $fileFormat  = stripslashes($_POST['fileFormat']);
        $out         = $range.$out.$fileFormat;        
        $l           = 0;        

        for($i=0, $l = sizeof($html); $i<$l; $i++) {
            $myFile = $outputPath."/printHtml".microtime().".html";
            $fh     = fopen($myFile, 'w');

            //check if file is writable
            if(is_writable($myFile)){
                fwrite($fh, $html[$i]['html']);
                fclose($fh);
                $myFile = str_replace($outputPath.'/', '', $myFile);
                array_push($files, $myFile);
            } else {
                $msg = "Can\'t create or read file.";
                break;
            }
        }

        //check if phantomjs is installed and reachable
        exec($phantomPath.' -v', $phantomOut);
        if (empty($phantomOut)){
            $msg = "PhantomJS not installed or not reachable.";
        } else {
            $phantomOut = array();

            //run PhantomJs with parameters : temporary html filenames sent, format of the page and page orientation
            $command = $phantomPath.' '.$outputPath.'/render.js "'.implode('|', $files).'" "'.$currentURL.'" "'.$format.'" "'.$orientation.'"';

            exec($command, $phantomOut);

            //phantomjs returns names of temp pdf files separated with '|'.  Replace '|' with ' '.
            $pages = explode('|', $phantomOut[0]);
            $pdfs  = implode(' ', $pages);

            exec($imgkPath.'convert -version', $imgkOut);
            if (empty($imgkOut)){
                $msg = "ImageMagick not installed or not reachable.";
            } else {
                $imgkOut = array();

                //run imagemagick merging separate png's into one pdf or png depending on the file format
                if ($fileFormat == 'pdf'){
                    $cmd = $imgkPath.'convert '.$pdfs.' "'.$outputPath.'/'.$out.'"';
                } else {
                    $cmd = $imgkPath.'montage -mode concatenate -tile 1x '.$pdfs.' "'.$outputPath.'/'.$out.'"';
                }
                exec($cmd, $imgkOut);

                if (file_exists($out) && filesize($out) > 0){
                    //return url of the created file
                    echo '{"success": true, "path": "'.$outputPath.'/'.$out.'", "url": "'.$currentURL.$out.'"}';
                    $msg = null;
                } else{
                    $msg = "There was some problem creating the file";
                }
            }

            //delete temp png files
            $m = 0;
            for ($i=0, $m=sizeof($pages); $i<$m ; $i++) { 
                unlink($pages[$i]);
            }
        }

        //delete temp html files
        $s = 0;
        for ($i=0, $s=sizeof($files); $i<$s ; $i++) { 
            unlink($files[$i]);
        }
    }
    if ($msg == null){
        return 0;
    } else {
        echo '{"success": false, "msg": "'.$msg.'"}'; 
    }
?>