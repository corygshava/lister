// config variables (you can change these)
let useicons = false;			// show icons in front of the text
let isinteractible = false;		// should the user be able to click on the alerts

// runtime variables (DONT REMOVE OR CHANGE!!!)
let stylesmade = false;
let alertlogs = [];

// required constants (DO NOT EDIT!!!)
const icons = {
	"success": "fa fa-check-circle",
	"info": "fa fa-info-circle",
	"warning": "fa fa-exclamation-triangle",
	"danger": "fa fa-times-circle",
	"primary": "fa fa-info",
	"theme": "fa fa-paint-brush",
	"secondary": "fa fa-circle",
	// "light": "fa fa-sun",
	"light": "fa fa-caret-right",
	// "dark": "fa fa-moon",
	"dark": "fa fa-caret-right",
};
const mekicon = (what) => {return `<i class="${what}"></i>`;}

function mekstyles() {
	let zindex = 1056;
	let intertxt = isinteractible ? 'all' : 'none';
    let mystyles = `
    	/* alert holder */

		#alertContainer {
			position: fixed;
			bottom: 0;
			right: 0;
			width: 100%;
    		max-width: fit-content;
			height: auto;
			pointer-events: none;
			padding: 20px 30px 80px 30px;
			z-index: ${zindex};
			font-family: 'calibri', sans-serif !important;
    		--c: #fff;
    		--altc: #000;
		}

		#alertContainer button {
			border:none;
		}

		.alert {
			position: relative;
			padding: 8px 16px;
			margin-bottom: 20px;
			color: var(--c);
			border-radius: var(--roundness,12px) !important;
			width: fit-content;
    		min-width: 300px;
			max-width: 400px;
			pointer-events: ${intertxt};
    		// font-weight: 700;
		}

		.alert.success{background-color: mediumseagreen;box-shadow: 0 0 12px mediumseagreen;}
		.alert.info{background-color: dodgerblue;box-shadow: 0 0 12px dodgerblue;}
		.alert.warning{background-color: rgb(255, 166, 0);box-shadow: 0 0 12px rgb(255, 166, 0);color:var(--altc)}
		.alert.danger,.alert.error{background-color: red;box-shadow: 0 0 12px red;}
		.alert.primary{background-color: #007bff;box-shadow: 0 0 12px #007bff;}
		.alert.theme{background-color: var(--themecolor);box-shadow: 0 0 12px var(--themecolor);}
		.alert.secondary{background-color: #343a40;box-shadow: 0 0 12px #343a40;}
		.alert.light{background-color: #fff;box-shadow: 0 0 12px #fff;color:var(--altc) !important;}
		.alert.dark{background-color: #343a40;box-shadow: 0 0 12px #343a40;}
		.alert b,.alert strong{
			display: inline-block;
			border-radius: calc(var(--roundness) / 2);
			background-color: var(--alttextcolor);
			padding: 2px 12px;
		}
    `;

    let st = document.createElement('style');
    st.innerHTML = mystyles;
    document.body.appendChild(st);

    let thecon = document.createElement('div');
    thecon.id = 'alertContainer';
    document.body.appendChild(thecon);

    stylesmade = true;

    console.log("made styles");
}

function showAlert(alertMessage, alertTime, alertType) {
	alertMessage = alertMessage == undefined ? 'test message' : alertMessage;
	alertTime = alertTime == undefined ? 2 : alertTime;
	alertType = alertType == undefined ? "info" : alertType;

	rawmsg = alertMessage;
	alertMessage = useicons ? (icons[alertType] == undefined ? '' : mekicon(icons[alertType])) + ` ${alertMessage}` : alertMessage;

    if(!stylesmade){
        mekstyles();
    }

    if(alertType != "quiet"){
		// Create alert container if it doesn't exist
		let alertContainer = document.getElementById('alertContainer');

		// Create alert element
		const alertElement = document.createElement('div');
		alertElement.className = `alert ${alertType} alert-dismissible fade show`;
		alertElement.role = 'alert';
		alertElement.innerHTML = `
			${alertMessage}
			<button type="button" class="closebtn w3-right w3-hide" data-bs-dismiss="alert" aria-label="Close">
				<i class="fa fa-close"></i>
			</button>
		`;

		// Append alert to container
		alertContainer.appendChild(alertElement);

		// animate coming in
		let animoptions = {
			duration: 300,
			easing: 'ease-out',
			fill: 'forwards'
		};
		let leaveAnim = [
			{opacity: 1},
			{opacity: 0}
		];
		alertElement.animate([
			{opacity: 0,translate: '0 20px'},
			{opacity: 1,translate: '0 0'}
		],animoptions);

		alertElement.querySelector('button').addEventListener('click',() => {
			alertElement.animate(leaveAnim,animoptions);
			setTimeout(() => alertElement.remove(), animoptions.duration + 50);
		})

		if(alertTime.toString().toLowerCase() != "infinity"){
			setTimeout(() => {
				if(alertElement != null){
					alertElement.animate(leaveAnim,animoptions);
					setTimeout(() => alertElement.remove(), animoptions.duration + 50); // Allow fade-out effect
				}
			}, alertTime * 1000);
		}
		console.log(`i will die in ${alertTime} seconds`);
	}

	let timestamp = (new Date()).getTime();
    alertlogs.push({msg: rawmsg,atype: alertType,atime: timestamp});
}

function alert_success(message,time) {showAlert(message,time,"success");}
function alert_info(message,time) {showAlert(message,time,"info");}
function alert_warning(message,time) {showAlert(message,time,"warning");}
function alert_danger(message,time) {showAlert(message,time,"danger");}
function alert_primary(message,time) {showAlert(message,time,"primary");}
function alert_secondary(message,time) {showAlert(message,time,"secondary");}
function alert_light(message,time) {showAlert(message,time,"light");}
function alert_dark(message,time) {showAlert(message,time,"dark");}
function alert_quiet(message,time) {showAlert(message,time,"quiet");}
function alert_silent(message,time) {showAlert(message,time,"quiet");}

window.addEventListener('keydown',(e) => {
	if(e.key != undefined && e.key.toLowerCase() == 'tab' && e.shiftKey){
		let mystring = mekRandomString(16);
		showAlert(`random string : ${mystring}`,7,'warning');
	}
})