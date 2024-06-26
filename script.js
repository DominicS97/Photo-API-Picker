// Image manipulation

const IMG = document.getElementById("target");
const COLLECTION = document.getElementById("collection");
const START_IMG = IMG.src + "?random&t=";

// Request new image

function newImage() {
	IMG.src = START_IMG + new Date().getTime();
}

// Add image to collection

function repImage() {
	if (index > -1) {
		COLLECTION.innerHTML += `<img src="${IMG.src}" />`;
		collections[index].push(IMG.src);
	}
}

// Collections

let index = -1;
let collections = [];

function newCollection(email) {
	collections.push([email]);
	index++;
}

// Email validation

const FORM = document.getElementById("form");
const EMAIL_DISPLAY = document.getElementById("email-display");

function validateEmail() {
	const email = document.getElementById("email");
	email.addEventListener("blur", () => {
		let regex =
			/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
		let s = email.value;
		if (regex.test(s)) {
			if (checkUnique(s)) {
				FORM.style.display = "none";
				EMAIL_DISPLAY.style.display = "block";
				const CUR_EMAIL = document.getElementById("current-email");
				CUR_EMAIL.innerHTML = `${s}`;
				newCollection(s);
			} else {
				alert("Email has already been used");
				email.value = "";
				s = "";
			}
		} else {
			alert("Email is not valid");
			email.value = "";
			s = "";
		}
	});
}

function checkUnique(email) {
	for (let i = 0; i < collections.length; i++) {
		let subcollection = collections[i];
		if (subcollection[0] === email) {
			return false;
		}
	}
	return true;
}

function newEmail() {
	FORM.style.display = "block";
	EMAIL_DISPLAY.style.display = "none";
	COLLECTION.innerHTML = `<h1>Collection:</h1>`;
}
