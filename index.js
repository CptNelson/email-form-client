const form = document.getElementById('form');
const formEvent = form.addEventListener('submit', (event) => {
	event.preventDefault();
	console.log(form[2].value);
	if (!validateEmail(form[2].value)) return;

	const formDataJSON = JSON.stringify(Object.fromEntries(new FormData(form)));

	sendMail(formDataJSON);
});

const validateEmail = (emailAddress) => {
	//RFC 2822 standard email validation
	const emailFormat =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	if (emailAddress.match(emailFormat)) {
		return true;
	} else {
		alert('You have entered an invalid email address!');
		return false;
	}
};

const sendMail = async (formData) => {
	console.log(formData);

	const rawResponse = await fetch('https://httpbin.org/post', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: formData,
	});
	const content = await rawResponse.json();

	console.log(content);
	/*
	fetch('http://localhost:3666/send', {
		method: 'post',
		body: mail,
	}).then((response) => {
		return response.json();
	});
	*/
};
