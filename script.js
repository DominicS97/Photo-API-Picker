// Image manipulation

const IMG = document.getElementById("target");
const COLLECTION = document.getElementById("collection");
const START_IMG = IMG.src + "?random&t=";

// Request new image

function newImage() {
	// Prevents browser from caching the old image
	IMG.src = START_IMG + new Date().getTime();
}

// Add image to collection

function repImage() {
	// Checking if an email has been set
	if (CUR_EMAIL.innerHTML) {
		// Iterating over the emails array to find current email
		for (let i = 0; i < emails.length; i++) {
			if (emails[i] === CUR_EMAIL.innerHTML) {
				// Adding photo to collection and to the relevant subarray
				COLLECTION.innerHTML += `<img src="${IMG.src}" />`;
				collections[i].push(IMG.src);
			}
		}
	} else {
		alert("No email has been set");
	}
}

// Collections

let emails = [];
let collections = [];

function newCollection(email) {
	emails.push(email);
	// Push empty array to collections
	collections.push([]);
}

// Email validation

const FORM = document.getElementById("form");
const EMAIL_DISPLAY = document.getElementById("email-display");
const CUR_EMAIL = document.getElementById("current-email");

function validateEmail() {
	// Regex copied from portfolio project
	const email = document.getElementById("email");
	email.addEventListener("blur", () => {
		let regex =
			/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
		let s = email.value;
		if (regex.test(s)) {
			if (checkUnique(s)) {
				// Remove form and show current email div
				FORM.style.display = "none";
				EMAIL_DISPLAY.style.display = "block";
				CUR_EMAIL.innerHTML = `${s}`;
				// Create new collection
				newCollection(s);
			} else {
				// Non-unique email detected
				alert("Email has already been used");
				email.value = "";
				s = "";
			}
		} else {
			// Regex not passed
			alert("Email is not valid");
			email.value = "";
			s = "";
		}
	});
}

// Check unique email function separated for readability

function checkUnique(email) {
	// Iterating over the emails array to check unique
	for (let i = 0; i < emails.length; i++) {
		if (emails[i] === email) {
			return false;
		}
	}
	return true;
}

// Add new email

function newEmail() {
	// Remove current email div and show form
	FORM.style.display = "block";
	EMAIL_DISPLAY.style.display = "none";
	// Reset collection display
	COLLECTION.innerHTML = `<h1>Collection:</h1>`;
	// Clear current email
	CUR_EMAIL.innerHTML = "";
}
