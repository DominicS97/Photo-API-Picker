// Image manipulation

const IMG = document.getElementById("target");
let source = IMG.src;

const COLLECTION = document.getElementById("collection");
const DEST = document.getElementById("destination");
DEST.src = source;

// Email validation

function changeEmail(email) {
	const FORM = document.getElementById("form");
	FORM.style.display = "none";
	const EMAIL_DISPLAY = document.getElementById("email-display");
	EMAIL_DISPLAY.style.display = "block";
}

function validateEmail() {
	const email = document.getElementById("email");
	email.addEventListener("blur", () => {
		let regex =
			/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
		let s = email.value;
		if (regex.test(s)) {
			const FORM = document.getElementById("form");
			FORM.style.display = "none";
			const EMAIL_DISPLAY = document.getElementById("email-display");
			EMAIL_DISPLAY.style.display = "block";
			const CUR_EMAIL = document.getElementById("current-email");
			CUR_EMAIL.innerHTML = `${s}`;
		} else {
			alert("Email is not valid");
		}
	});
}
