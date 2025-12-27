<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="lister/css/styles.css">
    <link rel="stylesheet" href="lister/css/w3.css">
    <title>Your projects</title>
    <meta name="viewport" content="initial-scale=1,width-device-width">
</head>
<body>

<div class="links">
    <h1>Your Projects</h1>
    <div class="search">
        <input type="text" id="filter" oninput="filterlinks()" placeholder="search for a project ...">
    </div>
    <?php
        // Get the current directory
        $dir = './';

        // Check if the directory exists and is readable
        if (is_dir($dir)) {
            // Open the directory
            if ($dh = opendir($dir)) {
                // Loop through all files and directories
                while (($folder = readdir($dh)) !== false) {
                    // Filter out '.' and '..' and only display directories
                    if ($folder != '.' && $folder != '..' && is_dir($dir . $folder)) {
                        // Display the folder as a clickable link
                        echo "<a class=\"\" target=\"blank\" href=\"$folder\">$folder</a>";
                    }
                }
                // Close the directory handle
                closedir($dh);
            }
        } else {
            echo "Directory does not exist.";
        }
    ?>

    <script>
        /*
            get filter value
            compare everything in the list
            only show if it has the contents of the input
            show everything if the input is blank
        */

        var npt = document.querySelector('#filter');
        var linksguy = document.querySelector('.links');
        var links = linksguy.querySelectorAll('a');

        function filterlinks() {
        	let needle = npt.value;

        	links.forEach(el => {
	        	if(npt.value == ''){
        			el.style.display = 'block';
	        	} else {
	        		el.style.display = el.textContent.toUpperCase().includes(needle.toUpperCase()) ? 'block' : 'none';
	        	}
	        }
	        );
        }
    </script>

</div>
</body>
</html>
