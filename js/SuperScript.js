/*
	*	Hi there, Cory here, this is a script full of functions to make your work  easier
	*	Go check out github @corygshava to find out how to use it
	*	Also pple keep modifying it like alot so ensure you have the latest version from this repo
	*	https://github.com/corygshava/mylibraries
*/


// [verified functions (not going anywhere)]------------------------------------------------------
function toggleShow(me) {
	//requires data-shown parameter to be attached to HTML object me
	var item = document.querySelector(me),def = 0;

	if(item.dataset.shown == null){
		def = item.style.display == "none" ? 0 : 1;
	} else {
		def = Number(item.dataset.shown);
	}

	if(def == 0){
		item.style.display = 'block';
		item.dataset.shown = 1;
	} else {
		item.style.display = 'none';
		item.dataset.shown = 0;
	}
}

function toggleShowB(me,ifoff,iffon) {
	//requires data-shown parameter to be attached to HTML object me
	var item = document.querySelector(me);
	var def = Number(item.dataset.shown);

	if(def == 0){
		item.style.display = ifoff;
		item.dataset.shown = 1;
	} else {
		item.style.display = iffon;
		item.dataset.shown = 0;
	}
}

// [functions in probation]-----------------------------------------------------------------------

//common variables

var lbs = localStorage;
var sessionSupported = true;
var sbs = sessionSupported ? sessionStorage : lbs;

//common reusables

function toggleClass(what,class1,class2,rno) {
	var item = Number(rno) == 1 ? what : document.querySelector(what);
	if(item.className == class1){
		item.className = class2;
	} else {
		item.className = class1;
	}
	//item.className.replace(class1,class2);
}

function seTxt(what,element,no,mth) {
	var rn = Number(no);
	var item = mth == 1 ? element : document.querySelector(element);
	if(rn == 1){
		item.innerHTML = what;
	} else if (rn == 2){
		item.innerHTML += what;
	} else {
		item.innerHTML = what + item.innerHTML;
	}
}

function seTnpt(what,element,no,rno) {
	var initial,rn = Number(no);
	var item = Number(rno) == 1 ? element : document.querySelector(element);
	if(rn == 1){
		item.value = what;
	} else if (rn == 2){
		item.value += what;
	} else {
		initial = item.value;
		item.value = what + initial;
	}
}

function setElArray(part1,max,part2,element,start,rno) {
	var item = document.querySelector(element),outp,final = '';

	for(var x = start;x <= max;x++){
		outp = part1 + x + part2;
		final += outp;
	}

	seTxt(final,element,rno);
}

function GetElement(me) {
	var outp = document.querySelector(me);
	return me;
}

function toggleContent(what,part1,part2,mth) {
	let item = mth == 1 ? what : document.querySelector(what);

	if(item.innerHTML == part1){
		item.innerHTML = part2;
	} else {
		item.innerHTML = part1;
	}
}

//localStorage and sessionStorage utilities

function checkIt(what,dft,loc){
	loc = Number(loc);
	if(loc == 1){
		if(lbs.getItem(what) == null){lbs.setItem(what,dft);}
	} else {
		if(sbs.getItem(what) == null){sbs.setItem(what,dft);}
	}
}

function setIt(what,val,loc){
	loc = Number(loc);
	if(loc == 1){
		lbs.setItem(what,val);
	} else {
		sbs.setItem(what,val);
	}
}

function removeIt(what,loc){
	loc = Number(loc);
	if(loc == 1){
		if(lbs.getItem(what) != null){lbs.removeItem(what);}
	} else {
		if(sbs.getItem(what) != null){sbs.removeItem(what);}
	}
}

function getIt(me,loc) {
	// meant to return a value
	var out;
	loc = Number(loc);

	if(loc == 1){
		out = lbs.getItem(me);
	} else {
		out = sbs.getItem(me);
	}

	return out;
}

// -----added on 9/10/2023 ---------- around 2-3 years after these ^

// new ops 


function splitfrom(what,startat){
	// this one removes array elements from a certain index going forwards

	var it = [];
	for(let x=startat;x<what.length;x++){
		it.push(what[x]);
	} 
	return it;
}

// -----added on 6/3/2024 ---------- around 4 months after these ^

function showIt(selector,display){
	let item = document.querySelector(selector);
	display = display == undefined ? "block" : display;
	if(item != undefined){
		item.style.display = display;
	}
}

function getRandom(min,max) {
	let res = 0;
	if(max == undefined && min == undefined){
		res = Math.random();
	} else if (max == undefined){
		res = math.random() * min;
	} else {
		res = lerp(min,max,Math.random());
	}
	return res;
}

function lerp(min,max,factor) {
	// factor must always be in the range 0,1
	return (min + (factor * (max - min)));
}

function getRandomColor(hasopacity) {
	let res = (!hasopacity) ? `rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})` : `rgba(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)},${getRandom()})`;
	return res;
}

// -----added on 26/3/2024 ---------- around 20 days after these ^

function toggleClass2(what,class1,class2) {
	let item = document.querySelector(what);
	if(item != null){
		let m = item.className;
		let con = m.includes(class1);
		m = (con) ? m.replace(class1,class2) : m.replace(class2,class1);

		item.className = m;
	}
}

// -----added on 19/4/2024 ---------- around 23 days after these ^

function randomRange(min,max) {
	return (Math.random() * (max - min)) + min;
}

function fakecurve(min,max,val){
	let half = lerp(min,max,0.5);
	let myval = (val > half) ? (val % half) : (val % half) + half;
}

function realcurve(min,max,val) {
	// body...
	let factor = val;

    // Ensure factor is between 0 and 1
    factor = Math.min(1, Math.max(0, factor));

    // Calculate the value using a Bezier curve distribution
    let t = factor < 0.5 ? 2 * factor : 2 * (1 - factor);
    let value = min + t * t * (3 - 2 * t) * (max - min);

    return value;
}

// -----added on 4/7/2024 ---------- around 76 days after these ^

function toggleClass3(sel,c1,c2) {
	let item = GetElement(sel);

	if(item != null){
		item.classList.replace(c1,c2);
	}
}

// -----added on 7/7/2024 ---------- around 3 days after these ^

function copyToClipboard(selector) {
    // Get the element by selector
    const element = document.querySelector(selector);

    if (element) {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = element.innerText || element.value;
        document.body.appendChild(tempTextarea);

        tempTextarea.select();
        tempTextarea.setSelectionRange(0, 99999); // For mobile devices

        try {
            const successful = document.execCommand('copy');
            console.log(successful ? 'Text copied to clipboard' : 'Unable to copy text');
        } catch (err) {
            console.error('Oops, unable to copy', err);
        }

        document.body.removeChild(tempTextarea);
    } else {
        console.error(`Element not found for selector: ${selector}`);
    }
}

// -----added on 9/7/2024 ---------- around 2 days after these ^

function isvalidid(id,list) {
	// just checks if the id exists in the array
	return id >= 0 && id < list.length;
}

// -----added on 11/7/2024 ---------- around 2 days after these ^

function getrange(min,max,amt) {
	return (amt - min ) / (max - min);
}

// -----added on 12/7/2024 ---------- around 1 day after these ^

function formatTime(n) {
	const timeUnits = [
        { name: 'year', duration: 31536000 },
        { name: 'month', duration: 2592000 },
        { name: 'week', duration: 604800 },
        { name: 'day', duration: 86400 },
        { name: 'hour', duration: 3600 },
        { name: 'minute', duration: 60 },
        { name: 'second', duration: 1 }
    ];

    let remsecs = n;
	let stringparts = [];

	for (var x = 0; x < timeUnits.length; x++) {
		let unit = timeUnits[x];

		if (remsecs >= unit.duration){
			let secs = Math.floor(remsecs / unit.duration);
			remsecs %= unit.duration;
			stringparts.push(`${secs} ${plural(unit.name,secs)}`);
		}
	}

    return stringparts.join(',');
}

function formatTime2(n) {
	const timeUnits = [
        { name: 'year', duration: 31536000 },
        { name: 'month', duration: 2592000 },
        { name: 'week', duration: 604800 },
        { name: 'day', duration: 86400 },
        { name: 'hour', duration: 3600 },
        { name: 'minute', duration: 60 },
        { name: 'second', duration: 1 }
    ];

    let remsecs = n;
    let finObj = [];

	for (var x = 0; x < timeUnits.length; x++) {
		let unit = timeUnits[x];

		if (remsecs >= unit.duration){
			let secs = Math.floor(remsecs / unit.duration);
			remsecs %= unit.duration;
			finObj.push({num: secs,title: plural(unit.name,secs)});
		}
	}

    return finObj;
}

// -----added on 3/02/2025 ---------- around 206 days after these ^

// modified tabswitch
function tabSwitch(no,series,norm,select) {
	var items = document.querySelectorAll(series);
	// no -= 1;

	if(no > items.length){
		no = no % items.length;
	}

	console.log(items,no)

	if(items.length > 0){
		if(items[no] == undefined){
			console.log("item doesnt exist")
			return;
		}
	} else{
		console.log("items dont exist")
		return;
	}

	for (var i = 0; i < items.length; i++) {
		items[i].style.display = norm;
	}

	items[no].style.display = select;
}

// -----added on 28/02/2025 ---------- around 231 days after these ^

var debugmode = false;

// -----added on 18/03/2025 ---------- around 18 days after these ^

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

// -----added on 19/03/2025 ---------- around 1 day after this one ^

function copytext1(txt) {
	// first used in 'faith project'
	if(txt != "" || txt != undefined){
		let b = document.createElement('textarea');
		b.value = txt;
		document.body.appendChild(b);
		
		b.select()
		b.setSelectionRange(0,99000);

		try{
			let suc = document.execCommand('copy');
			console.log(suc ? "text copied" : "copying error occured!");
		} catch {
			alert("there was an error copying your text, please try again");
		}

		document.body.removeChild(b);
	}
}

function daysUntil(date) {
	// first used in 'maggy project'
	let target = new Date(date).setHours(0, 0, 0, 0);
	let today = new Date().setHours(0, 0, 0, 0);
	let diff = (target - today) / (1000 * 60 * 60 * 24);

	if (diff < 0) return "passed";
	if (diff === 0) return "today";
	if (diff === 1) return "tomorrow";
	return `${diff} days remaining`;
}
