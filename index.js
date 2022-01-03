/*
Asiakas tilaa järjestelmän, jolla voi kerätä käyttäjien sähköpostiosoitteita webbilomakkeen avulla. 
Vaatimuksena on, että tiedot lähetetään JSON muodossa konfiguroitavaan API URL osoitteeseen 
ja tiedot saavat sisältää ainoastaan toimivia sähköpostiosoitteita. 
*/
const form = document.getElementById('form');
const formEvent = form.addEventListener('submit', (event) => {
	event.preventDefault();

	//console.log(form);
	//const mail = new FormData(form);

	const formDataJSON = JSON.stringify(Object.fromEntries(new FormData(form)));

	sendMail(formDataJSON);
});

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
