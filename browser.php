<?php
	// defaults
	$default_methods = ['post','get'];
	$default_hide = ['.git','_help'];
?>

<?php
	$allowed_methods = isset($allowed_methods) ? $allowed_methods : $default_methods;
	$show_files = isset($show_files) ? $show_files : false;
	$tohide = isset($tohide) ? $tohide : $default_hide;
	$dir = isset($dir) ? $dir : './';
?>

<?php
	$reqmeth = strtolower($_SERVER['REQUEST_METHOD']);

	$s_log = [];
	$s_log[] = "request_method: ".$reqmeth;
	$foundfyls = [];

	if(!is_dir($dir)){
		exit('invalid directory');
	}

	$drf = opendir($dir);

	$tohide[] = '.';
	$tohide[] = '..';

	while(($fyl = readdir($drf)) !== false){
		if(in_array($fyl, $tohide)){
			continue;
		}

		if($show_files){
			$foundfyls[] = $fyl;
		} else if(is_dir($dir.$fyl)){
			$foundfyls[] = $fyl;
		} else {
			continue;
		}
	}

	closedir($drf);

	if($reqmeth == "post"){
		header('Content-Type: application/JSON');
		echo json_encode($foundfyls,JSON_PRETTY_PRINT);
		exit;
	}
?>

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="/lister/css/styles.css">
	<link rel="stylesheet" href="/lister/css/coryG_base.css">
	<link rel="stylesheet" href="/lister/css/w3.css">
	<link rel="stylesheet" href="/lister/css/iconic.css">
	<title>Your projects</title>
	<meta name="viewport" content="initial-scale=1,width-device-width">

	<script src="/lister/js/app.js"></script>
	<script src="/lister/js/SuperScript.js"></script>
	<script src="/lister/js/toappend.js"></script>
	<script src="/lister/js/customalerter.js"></script>
</head>
<body>
	<div class="maincontent">
		<div class="links">
			<div class="spacy-sm flow gap-sm" data-role="headpart">
				<div class="hed">
					<h1>Your Projects</h1>
					<span>showing <b class="themetxt">5</b> of <b>5</b> items</span>
				</div>
				<div class="searchbox">
					<input type="search" id="filter" oninput="filterlinks()" placeholder="search for a project ...">
				</div>
			</div>

			<div class="spacy-sm" data-role="fyllinks">
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
			</div>

			<div data-role="options" class="flow centroid">
				<div class="stuff gap-sm spacy-sm">
					<div class="flowline center gap-tn">
						<input type="checkbox" id="npt_newtab">
						<label for="npt_newtab"> open in new tab</label>
					</div>
					<div>
						<a class="btn primary" href="../"><i class="icon-folder"></i></a>
						<a class="btn primary" href="#"><i class="icon-refresh"></i></a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
		/*
			get filter value
			compare everything in the list
			only show if it has the contents of the input
			show everything if the input is blank
		

		/*
		const serverlog = <?=json_encode($s_log)?>;
		// */

		let _thelist = [];

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

		function getlist() {
			fetch('./',{method: 'POST'})
			.then(r => r.json())
			.then(d => {
				_thelist = d;
			})
			.catch(err => {
				alert('an error happened: ' + err);
			})
		}
	</script>
</body>
</html>
