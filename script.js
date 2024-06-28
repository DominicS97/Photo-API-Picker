// Image manipulation

const IMG = document.getElementById("target");
const COLLECTION = document.getElementById("collection-img");
let START_IMG = IMG.src + "?random&t=";
IMG.src = START_IMG;

// Image settings

const INPUT_SWITCH = document.getElementById("greyscale");
let greyscale = false;
const INPUT_RANGE = document.getElementById("blur-range");
let blurnum = 0;
const READOUT = document.getElementById("blur-status");
let change_made = false;

function toggleGreyscale() {
	greyscale = INPUT_SWITCH.checked;
	change_made = true;
}

function toggleBlur() {
	blurnum = INPUT_RANGE.value;
	change_made = true;
	if (blurnum === 0) {
		READOUT.innerHTML = `No Blur`;
	} else {
		READOUT.innerHTML = `Blur Level ${blurnum}`;
	}
}

const PHOTO_BOX = document.getElementById("photo-box");
const SETTINGS = document.getElementById("settings");

function enableSettings() {
	SETTINGS.style.display = "grid";
	PHOTO_BOX.style.display = "none";
}

function saveSettings() {
	SETTINGS.style.display = "none";
	PHOTO_BOX.style.display = "grid";
	if (change_made) {
		change_made = false;
		newImage();
	}
}

// Request new image

function newImage() {
	let newImage = START_IMG;
	// Prevents browser from caching the old image
	newImage += new Date().getTime();
	// Check greyscale setting
	if (greyscale) {
		newImage += "&grayscale";
	}
	if (blurnum != 0) {
		newImage += `&blur=${blurnum}`;
	}
	IMG.src = newImage;
}

// Add image to collection

function repImage() {
	// Checking if an email has been set
	if (CUR_EMAIL.innerHTML) {
		// Iterating over the emails array to find current email
		for (let i = 0; i < emails.length; i++) {
			if (emails[i] === CUR_EMAIL.innerHTML) {
				// Set collection back to current email
				SELECT.value = CUR_EMAIL.innerHTML;
				switchCollection(CUR_EMAIL.innerHTML);
				// Adding photo to collection and to the relevant subarray
				COLLECTION.innerHTML += `<img src="${IMG.src}" />`;
				collections[i].push(IMG.src);
			}
		}
	} else {
		alert("Photo cannot be added with no Collection");
	}
}

// Collections

let emails = [];
let collections = [];

function newCollection(email) {
	emails.push(email);
	// Push empty array to collections
	collections.push([]);
	// Clear current collection display
	COLLECTION.innerHTML = ``;
}

// Email validation

const FORM = document.getElementById("form");
const EMAIL_DISPLAY = document.getElementById("email-display");
const CUR_EMAIL = document.getElementById("current-email");

function validateEmail() {
	// Regex copied from portfolio project
	const email = document.getElementById("email");
	let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
	let s = email.value;
	if (regex.test(s)) {
		if (checkUnique(s)) {
			// Remove form and show current email div
			FORM.style.display = "none";
			EMAIL_DISPLAY.style.display = "grid";
			CUR_EMAIL.innerHTML = `${s}`;
			// Add to select menu
			SELECT.innerHTML += `<option value="${s}">${s}</option>`;
			// Create new collection
			newCollection(s);
		} else {
			// Non-unique email detected
			alert("Collection already exists for this Email");
			email.value = "";
			s = "";
		}
	} else {
		// Regex not passed
		alert("Email is not valid");
		email.value = "";
		s = "";
	}
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
	FORM.style.display = "grid";
	EMAIL_DISPLAY.style.display = "none";
	// Reset collection display
	COLLECTION.innerHTML = ``;
	// Clear current email
	CUR_EMAIL.innerHTML = "";
	document.getElementById("email").value = "";
}

// Select menu manipulation

const SELECT = document.getElementById("select");

// Function is passed a variable so that collection can be changed by the user using the
// select menu and also by the repImage function whenever a new image is added
function switchCollection(switch_email) {
	// Don't search for email when menu is returned to default
	if (switch_email === "select") {
	} else {
		// Iterating over the emails array to find selected email
		for (let i = 0; i < emails.length; i++) {
			if (emails[i] === switch_email) {
				// Clearing collection
				COLLECTION.innerHTML = ``;
				// Adding all collection images
				let selected_collection = collections[i];
				for (let j = 0; j < selected_collection.length; j++)
					COLLECTION.innerHTML += `<img src="${selected_collection[j]}" />`;
			}
		}
	}
}
