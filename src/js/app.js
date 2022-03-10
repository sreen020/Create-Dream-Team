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
	zipcode.value.length === 6 && houseNum.value && fetchAdres();

	async function fetchAdres() {
		const city = document.getElementById('city');
		const streetName = document.getElementById('street_name');

		const url = `https://postcode.tech/api/v1/postcode/full?postcode=${zipcode.value}&number=${houseNum.value}`;
		const options = {
			headers: {
				Authorization: 'Bearer ' + '02eac706-b8f3-455c-a1f5-3272692676a1',
			},
		};

		const response = await fetch(url, options);
		const data = await response.json();

		console.log(data);

		data.city ? (city.value = data.city) : (city.value = '');
		data.street ? (streetName.value = data.street) : (streetName.value = '');
	}
};
