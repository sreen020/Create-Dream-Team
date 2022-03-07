console.log('test');

const zipcode = document.getElementById('zipcode');
const houseNum = document.getElementById('house_number');

zipcode.addEventListener('input', () => {
	const zipcodeError = document.getElementById('zipcode_error');
	if (zipcode.value.length !== 6) {
		zipcodeError.innerText = 'Postcode voldoet niet aan juiste formaat';
	} else {
		zipcodeError.innerText = '';
		validateAdres();
	}
});
houseNum.addEventListener('input', () => validateAdres());

const validateAdres = () => {
	const city = document.getElementById('city');
	const streetName = document.getElementById('street_name');

	if (zipcode.value.length === 6 && houseNum.value) {
		axios
			.get(
				`https://postcode.tech/api/v1/postcode/full?postcode=${zipcode.value}&number=${houseNum.value}`,
				{
					headers: {
						Authorization: 'Bearer ' + '02eac706-b8f3-455c-a1f5-3272692676a1',
					},
				}
			)
			.then((response) => {
				console.log(response);
				city.value = response.data.city;
				streetName.value = response.data.street;
			});
	} else {
		console.log('Iets is onjuist');
	}
};
