<?php
    // any files or folders you want hidden
    $tohide = [
        '.git'
    ];
    $dir = './';

    // /*
    // uncomment this corian strip to allow this to be called by any page or modify accordingly
    // just make sure you know what you are doing first
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: content-type,bearer');
    // */
    include $_SERVER['DOCUMENT_ROOT'].'/lister/browser.php';
?>