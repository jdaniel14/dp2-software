/*
* Export demo
* Bryntum AB ©2012
*/

This demo utilizes the Export plugin for generating a PDF/PNG file out of our components. 
Unfortunately because this process is rather complicated, there is no way of running it 
completely on the client side (in the browser). 

For this demo to work there are some requirements :

- Webserver for running the php files (like Apache)
- PHP5 installed. Please turn the 'magic_quotes_gpc' setting in the php.ini off 
  (if for some reasons it's needed, please consult the info at the end of this file).
- PhantomJs (http://phantomjs.org) in version 1.6+ installed on your system, and added 
  to your environment PATH (so that it's runnable from the console/terminal).
  Provide server user with rights to run it. Instead of inserting it into PATH you can 
  also update the $phantomPath variable in "server.php" with appropriate value.  
- ImageMagick (http://www.imagemagick.org) installed on your system, and runnable 
  from the console/terminal. Also check the rights to run it and in the same way
  as phantom, either insert in PATH or provide correct value for $imgkPath in server.php.
  For Windows based systems please consult steps 1-3 of this instruction on installing ImageMagick with PHP support : 
  http://elxsy.com/2009/07/installing-imagemagick-on-windows-and-using-with-php-imagick/ (on most systems steps 1-3 give a fully operational installation of ImageMagick). In some environments following the rest of the steps may be needed.
- Provide your server user with the rights for CRUD operations on files in the example folder. 
- Server script as well as temporary files should reside in the example folder because 
  relative links to css files are used.

After our environment is ready, we will focus on the `server.php` file. Here at the beginning 
of the script you'll find some important variables that need explaining:

    //name of the created file
    $out         = '-exportedPanel'.microtime().'.';
    $out         = str_replace(' ', '', $out);
    $out         = $range.$out.$fileFormat; 
    //path were temporary pdf files will be created
    $outputPath  = dirname(__FILE__);
    //command to run ImageMagick in console/terminal
    $imgkPath    = '';
    //command to run phantomjs in console/terminal
    $phantomPath = 'phantomjs';

The first `out` variable defines the name of the exported file. Because many users of your 
application may want to print at the same time - a timestamp is added. `outputPath` is the path 
to our example, where all files should be located. Changing this may lead to unexpected behavior 
of the demo. `imgkPath` is the path to the ImageMagick folder, which can remain blank if its folder is in the PATH variable. 
. Please note: on Windows based systems you may require an absolute path is for some of these variables. 


The last interesting part of the code is the command for the ImageMagick when exporting to pdf:

    $cmd = $imgkPath.'convert '.$pdfs.' "'.$outputPath.'/'.$out.'"';

Depending on the installed version, adding '-density' parameter might be required to prevent program 
from dropping the quality of the exported image. The value of the parameter may be different across 
OS, but '-density 30' was tested to work in most cases. 

and when exporting to png :

$cmd = $imgkPath.'montage -mode concatenate -tile 1x '.$pdfs.' "'.$outputPath.'/'.$out.'"';

The current setting is tested and works well on most systems. For more details about the 'montage' command please consult
the link http://www.imagemagick.org/Usage/montage/. For details regarding commands of ImageMagick see http://www.imagemagick.org/script/command-line-options.php.

At this moment we should have our example up and running.


Notice about PHP settings :

If for some reasons 'magic_quotes_gpc' flag in php.ini can't be set to false one additional 
change in the server.php is needed.

Change this line :
    $html = json_decode($_POST['html'], true);
to
    $html = json_decode(stripslashes($_POST['html']), true);
