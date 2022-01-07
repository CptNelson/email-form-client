const API_URL = 'https://myrrys.fi/emailform/api/v1/emails';
const form = document.getElementById('form');
const inputs = [...form.querySelectorAll('input')];
const submitButton = document.getElementById('submit-button');
const responseText = document.getElementById('response');
const emailAddress = document.getElementById('email');

const checkForEmptyInputs = () => {
	const isIncomplete = inputs.some((input) => !input.value);
	submitButton.disabled = isIncomplete;
};

form.addEventListener('input', checkForEmptyInputs);

form.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!validateEmailBeforeSending(emailAddress.value)) return;

	const formDataJSON = JSON.stringify(Object.fromEntries(new FormData(form)));

	sendFormData(formDataJSON);
});

const validateEmailBeforeSending = (emailAddress) => {
	//RFC 2822 standard email validation
	const emailFormat =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	if (emailAddress.match(emailFormat)) return true;
	else {
		responseText.style.color = 'red';
		responseText.textContent = 'Invalid email address!';
		return false;
	}
};

const sendFormData = async (formData) => {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: formData,
	});
	informSubmitResultsToUser(response);
};

const informSubmitResultsToUser = async (response) => {
	if (response.ok) {
		responseText.style.color = 'green';
		responseText.textContent = 'Email submitted!';
	} else {
		const content = await response.json();
		console.log(content);
		responseText.style.color = 'red';
		responseText.textContent = `An error occured: ${content.message.message}`;
	}
};
