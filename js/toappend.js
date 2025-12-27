// added from Faith project on 27/02/2025 same day as these ^

function copytext1(txt) {
	if(txt != "" || txt != undefined){
		let b = document.createElement('textarea');
		b.value = txt;
		document.body.appendChild(b);
		
		b.select()
		b.setSelectionRange(0,99000);

		try{
			let suc = document.execCommand('copy');
			console.log(suc ? "text copied" : "copying error occured!")
		} catch {
			alert("there was an error copying your text, please try again")
		}

		document.body.removeChild(b);
	}
}

// added from Maggy project on 27/02/2025 same day as these ^

function daysUntil(date) {
	let target = new Date(date).setHours(0, 0, 0, 0);
	let today = new Date().setHours(0, 0, 0, 0);
	let diff = (target - today) / (1000 * 60 * 60 * 24);

	if (diff < 0) return "passed";
	if (diff === 0) return "today";
	if (diff === 1) return "tomorrow";
	return `${diff} days remaining`;
}

// added from Shawn project on 27/02/2025 same day as these ^

function plural(wad,n) {
	if (n === 1) {
		res = wad;
	} else if (wad.endsWith('us')) {
		res = wad.slice(0, -2) + 'i';
	} else if (wad.endsWith('s')) {
		res = wad + 'es';
	} else if (wad.endsWith('y')) {
		res = wad.slice(0,-1) + 'ies';
	} else if (wad.endsWith('_')){
		res = wad.substr(0,wad.length - 1);
	}else {
		res = wad + 's';
	}

	return res;
}

// added from betnare redesign on 27/02/2025 same day as these ^

function mekRandomString(charcount,useNums,useSymbols) {
	// setup defaults
	useNums = useNums == undefined ? true : useNums;
	useSymbols = useSymbols == undefined ? false : useSymbols;

	let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*()^~`";
	letters = useSymbols ? letters : letters.substr(0,26);

	let lettersLo = letters.toLowerCase();
	let nums = "1234578906";

	let options = letters + lettersLo;
	options += useNums ? nums : '';

	let res = '';
	let fin = [];

	for(let id = 0;id < charcount;id++){
		fin.push(options.split('')[Math.floor(Math.random() * options.length)]);
	};

	res = fin.join("");

	return res;
}

// added from diamondeng gig on 27/02/2025 same day as these ^

function startCountdown(targetDate,format,ifexpired,suffix) {
	ifexpired = ifexpired == undefined ? 'PASSED!' : ifexpired;
	suffix = suffix == undefined ? '' : suffix;
	format = format == undefined ? 0 : format;

	const target = new Date(targetDate).setHours(0, 0, 0, 0);

	function updateCountdown() {
		const now = new Date().getTime();
		const timeLeft = target - now;
		let outxt = '';

		if (timeLeft <= 0) {
			return ifexpired;
		}

		const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

		if(format == 0){
			outxt = `${days} ${plural('day',days)}, ` +
				`${String(hours).padStart(2, '0')} hours, ` +
				`${String(minutes).padStart(2, '0')} min ` +
				`${String(seconds).padStart(2, '0')} sec` +
				suffix;
		} else {
			outxt = `${days}:` +
				`${String(hours).padStart(2, '0')}: ` +
				`${String(minutes).padStart(2, '0')}:` +
				`${String(seconds).padStart(2, '0')}` +
				suffix;
		}

		return outxt;
	}

	return updateCountdown();
}

function findIndex(arr, searchString) {
	return arr.findIndex(element => element.includes(searchString));
}

function typetext(duration,word) {
	let letr = 0,wad = "";

	let myinter = setInterval(() => {
		letr += 1;
		wad = `${word.slice(0,letr)}_`;
		subtxt.innerHTML = `${wad}`;

		if(letr >= word.length){
			clearInterval(myinter);
		}
	},(duration * 1000) / (word.length))
}

function openinnewtab(url) {
	window.open(url, '_blank');
}

function clamp01(n,min,max) {
	min = min == undefined ? 0 : min;
	max = max == undefined ? 1 : max;

	let res = 0;

	res = (n > max) ? max : (n < min) ? min : n;

	return res;
}

function openWhatsApp(number) {
	const url = `https://wa.me/${number}`;
	window.open(url, '_blank', 'noopener,noreferrer');
}

function hasDatePassed(dateString) {
	const inputDate = new Date(dateString);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return inputDate < today;
}

function changeAllClasses(theclass,newclass) {
	let all = document.querySelectorAll(`.${theclass}`);

	all.forEach(el => {
		el.dataset.oldclass = theclass;
		el.dataset.changedclass = newclass;
		el.classList.add(newclass);
		el.classList.remove(theclass);
	});
}

function revertAllClasses() {
	let all = document.querySelectorAll('[data-oldclass]');

	all.forEach(el => {
		let newclass = el.dataset.oldclass;
		let theclass = el.dataset.changedclass;

		el.dataset.oldclass = theclass;
		el.dataset.changedclass = newclass;
		el.classList.add(newclass);
		el.classList.remove(theclass);
	})
}

function scrollToElement(sel) {
	const element = document.querySelector(sel);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

function runAfter(what,delay) {
	setTimeout(() => {
		what();
	}, delay);
}

function animateCSSVariable(element, variable, from, to, duration) {
	const startTime = performance.now();

	function update() {
		const elapsedTime = performance.now() - startTime;
		const progress = Math.min(elapsedTime / duration, 1);
		const currentValue = from + (to - from) * progress;

		// Set the CSS variable
		element.style.setProperty(variable, `${currentValue}px`);

		if (progress < 1) {
		requestAnimationFrame(update);
		}
	}

	requestAnimationFrame(update);
}

// end of picked

// new from Nima

function toggleScrollable(selector) {
	let item = document.querySelector(selector);
	let factor = item.dataset.canscroll == undefined || item.dataset.canscroll == "" ? "yes" : item.dataset.canscroll;
	let b = factor.toLowerCase() == "yes";
	let scrollval = b ? "hidden" : "auto";
	let outval = b ? "no" : "yes";

	item.style.overflowY = scrollval;
	item.dataset.canscroll = outval;
}

function sendWhatsAppMessage(phoneNumber, message, newtab,delay) {
	// setup defaults
	newtab = newtab == undefined ? false : newtab;
	delay = delay == undefined ? false : delay;

	// Sanitize the phone number and encode the message for URL
	const sanitizedNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters using regex
	const encodedMessage = encodeURIComponent(message);
	const whatsappUrl = `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;

	setTimeout(el => {
		if(newtab){
			window.open(whatsappUrl, '_blank');
		} else {
			window.location.assign(whatsappUrl);
		}
	},delay);
}

function copycontent(start,destination,copyClasses,copytype,reqno){
	// this copies the contents of one element onto another with some extra features of course
	// copytype is either append,inner,outer (default is outer)

	if(start == undefined || destination == undefined){
		// the code needs a start and a destination so no dice
		let outlog = start == undefined && destination == undefined ? 'the code needs a start and a destination element' : (start == undefined ? 'this code needs a start element to copy from' : 'this code needs a destination element to copy to')
		if(debugmode)console.log(outlog);
		return;
	}

	copyClasses = copyClasses == undefined ? false : copyClasses;
	copytype = copytype == undefined ? "outer" : copytype.toLowerCase();
	reqno = reqno == undefined ? 0 : reqno;



	let startItem = reqno == 0 ? document.querySelector(start) : start;
	let destinationItem = reqno == 0 ? document.querySelector(destination) : destination;
	let toadd = destinationItem.dataset.appendclass;
	let toremove = destinationItem.dataset.removeclass;

	if(debugmode)console.log(copyClasses, copytype, reqno,start, destination, toadd, toremove);

	if(copytype == "append"){
		destinationItem.innerHTML += startItem.innerHTML;
	} else if(copytype == "inner") {
		destinationItem.innerHTML = startItem.innerHTML;
	} else {
		destinationItem.outerHTML = startItem.outerHTML;
	}

	if(copyClasses){
		destinationItem.className = startItem.className;
	}

	setTimeout(e => {
		// these only run if the destination has a data-appendclass or a data-removeclass
		if(toadd != undefined){

			let classes = toadd.split(",");

			classes.forEach(el => {
				if(debugmode)console.log(destinationItem.className,`adding ${el}`);
				destinationItem.classList.add(el);
				if(debugmode)console.log(destinationItem.className);
			})
		}

		if(toremove != undefined){
			if(debugmode)console.log('removing classes');

			let classes = toremove.split(",");

			classes.forEach(el => {
				destinationItem.classList.remove(el);
			})
		}
	},200);
}