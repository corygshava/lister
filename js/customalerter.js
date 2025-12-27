let stylesmade = false;

function mekstyles() {
    let mystyles = `
    `;

    let st = document.createElement('style');
    st.innerHTML = mystyles;
    document.body.appendChild(st);

    let thecon = document.createElement('div');
    thecon.id = 'alertContainer';
    document.body.appendChild(thecon);

    stylesmade = true;
}

function showAlert(alertMessage = 'test message', alertTime = 5, alertType = 'info') {
    if(!stylesmade){
        mekstyles();
    }

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

window.addEventListener('keydown',(e) => {
	if(e.key.toLowerCase() == 'tab'){
		let mystring = mekRandomString(16);
		showAlert(`random string : ${mystring}`,7,'warning');
	}
})