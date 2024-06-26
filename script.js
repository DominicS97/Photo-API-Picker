// Image manipulation

const IMG = document.getElementById("target");
const COLLECTION = document.getElementById("collection");

// Request new image

function newImage() {
	IMG.src = IMG.src + "?random&t=" + new Date().getTime();
}

// Add image to collection

function repImage() {
	COLLECTION.innerHTML += `<img src="${IMG.src}" />`;
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
			FORM.style.display = "none";
			EMAIL_DISPLAY.style.display = "block";
			const CUR_EMAIL = document.getElementById("current-email");
			CUR_EMAIL.innerHTML = `${s}`;
		} else {
			alert("Email is not valid");
			email.value = "";
			s = "";
		}
	});
}

function newEmail() {
	FORM.style.display = "block";
	EMAIL_DISPLAY.style.display = "none";
}
