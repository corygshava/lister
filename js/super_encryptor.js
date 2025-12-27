
// dont comment or delete, required by encryptor and decryptor
function genCharsList() {
	let chars = "abcdefghijklmnopqrstuvwxyz";
	let chars2 = chars.toUpperCase();
	let nums = "1234567890";
	let symbols = "!@#$%^&*()-+_{}[]"
	let float = "§₻₈₅₂₋∃∄₉₆₃₀≐≍≊≇≄≅≖≙≜≟≢≮≯≣⊚⊗⊖⊙⊜⊝⊡⊞⊢"
	let fintxt = `${chars}${chars2}${nums}` + symbols + float;

	return fintxt;
}

function encryptme(m,offset,salt,chunks) {
	// the shavian simple encryption algo
	// requires mekpieces for salting
	// salt the data for extra protection
	salt = salt == undefined ? "" : salt;
	chunks = chunks == undefined ? 1 : chunks;
	let touse = mekpieces(m,chunks,"").join(salt);

	// console.log(m,touse);
	// return m;

	// encrypt the salted text
	let fintxt = genCharsList();
	let thelist = fintxt.split("");

	let outxt = "",ids = [];
	let roffset = Math.floor(Math.random() * (fintxt.length / 2)) + 1;

	offset = offset == undefined ? roffset : offset;
	offset = offset == 0 ? roffset : offset;

	// split the letters passed
	// offset the current text
	// use the offset to figure out what to replace it with

	touse.split("").forEach(el => {
		let myid = thelist.indexOf(el);
		let newid = myid + offset;
		let validid = (thelist.length + newid) % thelist.length;

		// console.log(myid,newid,validid,thelist.length);

		outxt += myid > 0 ? thelist[validid] : el;
	})

	return outxt;
}

function mekpieces(text,chunks,fill) {
	let outtxt = [];
	// splits text every chunks pieces
	let tlist = text.split("");

	chunks = chunks == undefined ? 3 : chunks;
	fill = fill == undefined ? "" : fill;

	for(let x = 0;x < text.length;x+= chunks){
		outtxt.push(text.slice(x,x+chunks));
	}

	return outtxt;
}

function decryptme(m,offset,salt){
	let thechars = genCharsList();
	let thelist = thechars.split("");
	let outtxt = "";

	let roffset = Math.floor(Math.random() * (thechars.length / 2)) + 1;

	offset = offset == undefined ? roffset : offset;
	offset = offset == 0 ? roffset : offset;

	// reverse the offset
	m.split("").forEach(el => {
		let mid = thelist.indexOf(el);
		let newid = mid - offset;
		let useid = (thechars.length + newid) % thechars.length;

		// console.log(mid,newid,useid,thechars.length);

		outtxt += mid > 0 ? thelist[useid] : el;
	})

	// reverse the salting
	salt = salt == undefined ? "" : salt;
	outtxt = outtxt.split(salt).join("");

	// spit out the result
	return outtxt;
}
