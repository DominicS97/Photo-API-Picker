// Alert box
const ALERT = document.getElementById("alert-box");
const ALERT_TXT = document.getElementById("alert-txt");
let alertDanger = "#f44336";
let alertSuccess = "#4caf50";
let alertInfo = "#2196f3";
let alertWarning = "#ef6c00";
function createAlert(colour, text) {
	ALERT.style.display = "block";
	ALERT.style.backgroundColor = colour;
	if (colour === alertDanger || colour === alertWarning) {
		ALERT_TXT.innerHTML = `! ${text} !`;
	} else {
		ALERT_TXT.innerHTML = text;
	}
	setTimeout(function () {
		ALERT.style.display = "none";
	}, 1500);
}

// Image manipulation

const IMG = document.getElementById("target");
const COLLECTION = document.getElementById("collection-img");
let START_IMG = IMG.src;

// Image settings

const INPUT_SWITCH = document.getElementById("greyscale");
let greyscale = false;
const INPUT_RANGE = document.getElementById("blur-range");
let blurnum = 0;
const READOUT = document.getElementById("blur-status");
let change_made = false;

// Saves greyscale setting
function toggleGreyscale() {
	greyscale = INPUT_SWITCH.checked;
	change_made = true;
}

// Saves blur setting
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

// Opens settings menu
function enableSettings() {
	SETTINGS.style.display = "grid";
	PHOTO_BOX.style.display = "none";
}

// Most recent unedited picture
let recentImage = IMG.src;

// Closes settings menu
// New image if settings changed
function saveSettings() {
	SETTINGS.style.display = "none";
	PHOTO_BOX.style.display = "grid";

	let newImage = recentImage;
	// Check settings
	if (greyscale) {
		newImage += "?grayscale";
		if (blurnum != 0) {
			newImage += `&blur=${blurnum}`;
		}
	} else {
		if (blurnum != 0) {
			newImage += `?blur=${blurnum}`;
		}
	}
	IMG.src = newImage;
}

// Request new image

function newImage() {
	// Prevents browser from caching the old image
	let newImage =
		"https://picsum.photos/seed/" + new Date().getTime() + "/400/300";
	recentImage = newImage;
	// Check settings
	if (greyscale) {
		newImage += "?grayscale";
		if (blurnum != 0) {
			newImage += `&blur=${blurnum}`;
		}
	} else if (blurnum != 0) {
		newImage += `?blur=${blurnum}`;
	}
	IMG.src = newImage;
}

// Add image to collection

function repImage() {
	// Checking if an email has been set
	if (CUR_EMAIL.innerHTML && CUR_EMAIL.innerHTML != "Placeholder") {
		// Iterating over the emails array to find current email
		for (let i = 0; i < emails.length; i++) {
			if (emails[i] === CUR_EMAIL.innerHTML) {
				// preventing duplicate images
				let selected_collection = collections[i];
				let duplicate = false;
				for (let j = 0; j < selected_collection.length; j++) {
					if (IMG.src === selected_collection[j]) {
						createAlert(
							alertDanger,
							"Image already exists in collection"
						);
						duplicate = true;
					}
				}
				if (!duplicate) {
					// Set collection back to current email
					SELECT.value = CUR_EMAIL.innerHTML;
					switchCollection(CUR_EMAIL.innerHTML);
					// Adding photo to collection and to the relevant subarray
					COLLECTION.innerHTML =
						`<img id="img-${selected_collection.length}" src="${IMG.src}" />` +
						`<button class="red small-btn" id="btn-${selected_collection.length}" onclick="deleteImage(${selected_collection.length});">X</button>` +
						COLLECTION.innerHTML;
					collections[i].push(IMG.src);
					createAlert(alertSuccess, "Image added to collection");
					// Enable buttons
					COLL_BTN.style.display = "grid";
					COLL_DEL.style.display = "block";
					ALL_DEL.style.display = "block";
					storeValues();
				}
			}
		}
	} else {
		createAlert(alertDanger, "Photo cannot be added with no Collection");
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
	storeValues();
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
			SELECT.innerHTML += `<option id="${s}" value="${s}">${s}</option>`;
			// Display delete buttons
			for (let i = 0; i < SMALL_BTNS.length; i++) {
				SMALL_BTNS[i].style.display = "block";
			}
			// Create new collection
			createAlert(alertSuccess, "Email is valid. Collection created");
			newCollection(s);
		} else {
			// Non-unique email detected
			createAlert(
				alertDanger,
				"Collection already exists for this Email"
			);
			email.value = "";
			s = "";
		}
	} else {
		// Regex not passed
		createAlert(alertDanger, "Email is not valid");
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
	// Remove buttons
	COLL_BTN.style.display = "none";
	COLL_DEL.style.display = "none";
	ALL_DEL.style.display = "none";
	// Hide delete buttons
	for (let i = 0; i < SMALL_BTNS.length; i++) {
		SMALL_BTNS[i].style.display = "none";
	}
	storeValues();
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
				for (let j = 0; j < selected_collection.length; j++) {
					if (selected_collection[j] === "removed") {
					} else {
						COLLECTION.innerHTML =
							`<img id="img-${j}" src="${selected_collection[j]}" />` +
							`<button class="red small-btn" id="btn-${j}" onclick="deleteImage(${j});">X</button>` +
							COLLECTION.innerHTML;
					}
				}
				// Enable buttons
				COLL_BTN.style.display = "grid";
				COLL_DEL.style.display = "block";
				ALL_DEL.style.display = "block";
				COLL_ADD.style.display = "block";
				COLL_ADD.innerHTML = `Edit ${emails[i]}`;
				COLL_DEL.innerHTML = `Delete ${emails[i]}`;
				createAlert(alertSuccess, `Now viewing ${emails[i]}`);
				if (emails[i] === CUR_EMAIL.innerHTML) {
					COLL_ADD.style.display = "none";
					// Display delete buttons
					for (let j = 0; j < SMALL_BTNS.length; j++) {
						SMALL_BTNS[j].style.display = "block";
					}
				} else {
					// Remove delete buttons
					for (let j = 0; j < SMALL_BTNS.length; j++) {
						SMALL_BTNS[j].style.display = "none";
					}
				}
			}
		}
	}
}

// Collection buttons

const COLL_BTN = document.getElementById("collection-btn");
const COLL_ADD = document.getElementById("collection-add");
const COLL_DEL = document.getElementById("collection-del");
const ALL_DEL = document.getElementById("all-del");

const SMALL_BTNS = document.getElementsByClassName("small-btn");

function swapEmail() {
	// Remove form and show current email div
	FORM.style.display = "none";
	EMAIL_DISPLAY.style.display = "grid";
	CUR_EMAIL.innerHTML = SELECT.value;
	COLL_ADD.style.display = "none";
	// Display delete buttons
	for (let i = 0; i < SMALL_BTNS.length; i++) {
		SMALL_BTNS[i].style.display = "block";
	}
}

function deleteSelected() {
	// Iterating over the emails array to find selected email
	for (let i = emails.length - 1; i >= 0; i--) {
		if (emails[i] === SELECT.value) {
			// Reset collection display
			COLLECTION.innerHTML = ``;
			// Remove buttons
			COLL_BTN.style.display = "none";
			COLL_DEL.style.display = "none";
			ALL_DEL.style.display = "none";
			createAlert(alertWarning, `${emails[i]} deleted`);
			// Remove from select menu
			let select_element = document.getElementById(`${emails[i]}`);
			select_element.parentNode.removeChild(select_element);
			// If current collection deleted
			if (emails[i] === CUR_EMAIL.innerHTML) {
				// Remove current email div and show form
				FORM.style.display = "grid";
				EMAIL_DISPLAY.style.display = "none";
				// Clear current email
				CUR_EMAIL.innerHTML = "";
				document.getElementById("email").value = "";
			}
			// Remove from emails array
			emails.splice(i, 1);
			// Remove collection from collections array
			collections.splice(i, 1);
			storeValues();
		}
	}
}

function deleteAll() {
	// Remove from emails array
	emails = [];
	// Remove collection from collections array
	collections = [];
	// Reset collection display
	COLLECTION.innerHTML = ``;
	// Remove buttons
	COLL_BTN.style.display = "none";
	COLL_DEL.style.display = "none";
	ALL_DEL.style.display = "none";
	// Remove current email div and show form
	FORM.style.display = "grid";
	EMAIL_DISPLAY.style.display = "none";
	// Clear current email
	CUR_EMAIL.innerHTML = "";
	document.getElementById("email").value = "";
	// Clear select menu
	SELECT.innerHTML = `<option value="select">Select</option>`;
	storeValues();
	createAlert(alertWarning, `All collections deleted`);
}

function deleteImage(index) {
	// Remove image from collection array
	// Iterating over the emails array to find current email
	for (let i = 0; i < emails.length; i++) {
		if (emails[i] === CUR_EMAIL.innerHTML) {
			let selected_collection = collections[i];
			selected_collection[index] = "removed";
		}
	}
	createAlert(alertWarning, "Image deleted");
	// Remove image from DOM
	let select_element = document.getElementById(`btn-${index}`);
	select_element.parentNode.removeChild(select_element);
	select_element = document.getElementById(`img-${index}`);
	select_element.parentNode.removeChild(select_element);
	storeValues();
}

// Local storage of collections

// Fetch from local storage
if (localStorage.getItem("emails") != null) {
	emails = JSON.parse(localStorage.getItem("emails"));
	collections = JSON.parse(localStorage.getItem("collections"));
	for (i = 0; i < emails.length; i++) {
		// Add to select menu
		SELECT.innerHTML += `<option id="${emails[i]}" value="${emails[i]}">${emails[i]}</option>`;
	}
}

function storeValues() {
	localStorage.setItem("emails", JSON.stringify(emails));
	localStorage.setItem("collections", JSON.stringify(collections));
}
