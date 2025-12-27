<?php
    // any files or folders you want hidden
    $tohide = [
        '.git'
    ];
    $dir = './'.substr(str_shuffle('abcdefghijklmnopqrstuvwxyz1234567890_'),0,8);   // returns a mess that doesnt exist
    $folder_name = basename(__DIR__);       // the title of the folder

    // /*
    // uncomment this corian strip to allow this to be called by any page or modify accordingly
    // just make sure you know what you are doing first
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: content-type,bearer');
    // */
    include $_SERVER['DOCUMENT_ROOT'].'/lister/browser.php';
?>