<?php
	// defaults
	$default_methods = ['post','get'];
	$default_hide = ['.git','_help'];
	$default_dir = 'not here';
?>

<?php
	$allowed_methods = isset($allowed_methods) ? $allowed_methods : $default_methods;
	$show_files = isset($show_files) ? $show_files : false;
	$tohide = isset($tohide) ? $tohide : $default_hide;
	$dirname = isset($folder_name) ? $folder_name : basename('./');
	$dir = isset($dir) ? $dir : $default_dir;
?>

<?php
	$reqmeth = strtolower($_SERVER['REQUEST_METHOD']);

	$s_log = [];
	$s_log[] = "request_method: ".$reqmeth;
	$foundfyls = [];

	if(!is_dir($dir)){
		if($reqmeth == 'get'){
			exit('invalid directory');
		} else {
			// $foundfyls[] = 'invalid directory';
			// http_response_code(200);
			exit('directory doesnt exist');
		}
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
	<title>Items in <?=$dirname?></title>
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
					<h1>Items in <b><?=$dirname?></b></h1>
					<span>showing <b class="themetxt" data-subrole="seen_counter"><?=count($foundfyls)?></b> of <b data-role="all_counter"><?=count($foundfyls)?></b> items</span>
				</div>
				<div class="searchbox">
					<input type="search" id="filter" oninput="filterlinks()" placeholder="search <?=$dirname?> ...">
				</div>
			</div>

			<div class="spacy-sm" data-role="fyllinks">
				<a style="display:none;border:none;" data-role="placeholder" class="w3-center mutedtxt ignored"><i>no files found</i></a>

				<?php
					// SSR the links

					foreach($foundfyls as $f){
						echo "<a class='w3-animate-opacity' href=\"$f\" data-role='fyllink'>$f</a>";
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
						<a class="btn primary" href="#" data-role="refreshbtn"><i class="icon-refresh"></i></a>
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

		let _thelist = <?=json_encode($foundfyls)?>;

		var npt = document.querySelector('#filter');
		var linksguy = document.querySelector('[data-role="fyllinks"]');
		var links = linksguy.querySelectorAll('[data-role="fyllink"]');

		const ui_seen_counter = document.querySelector('[data-subrole="seen_counter"]');
		const ui_all_counter = document.querySelector('[data-subrole="all_counter"]');
		const ui_btn_refresh = document.querySelector('[data-role="refreshbtn"]');
		const ui_npt_newtab = document.querySelector('#npt_newtab');

		function filterlinks() {
			let needle = npt.value;
			let found = 0;
			let place = linksguy.querySelector('[data-role="placeholder"]');

			links.forEach(el => {
				let isfound = el.textContent.toUpperCase().includes(needle.toUpperCase());

				if(npt.value == ''){
					el.style.display = 'block';
					found = links.length;
				} else {
					el.style.display = isfound ? 'block' : 'none';
					found += isfound ? 1 : 0;
				}
			});

			if(place != undefined){
				place.style.display = found == 0 ? "block" : "none";
				if(found == 0){
					place.innerText = `no matches found for \`${needle}\``;
				} else {
					place.innerText = "no links found";
				}
			}

			ui_seen_counter.innerText = found;
		}

		function getlist() {
			fetch('./',{method: 'POST'})
			.then(r => r.json())
			.then(d => {
				_thelist = d;
				console.log(d);
				renderlinks();
			})
			.catch(err => {
				alert_danger('an error happened: ' + err);
			})
		}

		async function refreshlinks() {
			try{
				alert_info('reloading list');

				let request = await fetch('./',{method: 'post'});
				let gotten = await request.json();
				_thelist = gotten;
			} catch(err){
				alert_danger(err);
			}
		}

		function renderlinks() {
			linksguy.innerHTML = `<a style="display:none" data-role="placeholder" class="w3-center mutedtxt ignored"><i>no files found</i></a>`;

			_thelist.forEach(f => {
				linksguy.innerHTML += `<a class='w3-animate-opacity' href=\"${f}\" data-role='fyllink'>${f}</a>`;
			});

			links = linksguy.querySelectorAll('[data-role="fyllink"]');
		}

		ui_btn_refresh.addEventListener('click',() => {
			refreshlinks()
			.then(w => {renderlinks();})
			.catch(err => {alert_danger(err);})
		})

		ui_npt_newtab.addEventListener('change',() => {
			chk = ui_npt_newtab.checked;

			links.forEach(l => {
				if(chk){
					l.setAttribute('target','blank');
				} else {
					l.removeAttribute('target');
				}
			})
		})
	</script>
</body>
</html>
