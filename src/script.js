import IMask from 'imask';
import axios from 'axios';


// Google recaptcha site key
const recaptchaSiteKey = '6Lc5RkopAAAAAJyU9J-X6gYJ2n_RAtsA32gZS0As';
// DOM Constants
const wrapperId = 'tpg-form-wrapper';
const wrapper = document.querySelector(`[data-title="${wrapperId}"]`);
const wrapperClass = 'tpg-form-wrapper';

const Env = wrapper.getAttribute('testing');


// API Constants
const BASE_URL = Env && Env === 'true' ?  'https://staging-rest.unclekam.com/api/public' : 'https://rest.unclekam.com/api/public';


const leadsEndpoint = `${BASE_URL}/generate-lead`;
const servicesEndpoint = `${BASE_URL}/get-services`;
// Annual incomes list
const annualIncomes = [
	{ id: 1, name: '$12,000-$49,999' },
	{ id: 2, name: '$50,000-$99,999' },
	{ id: 3, name: '$100,000-$249,999' },
	{ id: 4, name: '$250,000-$499,999' },
	{ id: 5, name: '$500,000+' },
];

const formFields = [
	{
		type: 'text',
		name: 'firstname',
		label: 'First Name',
		value: '',
		mask: /^[a-zA-Z ]+$/,
		isValid: true,
	},
	{
		type: 'text',
		name: 'lastname',
		label: 'Last Name',
		value: '',
		mask: /^[a-zA-Z ]+$/,
		isValid: true,
	},
	{
		type: 'email',
		name: 'email',
		label: 'Email Address',
		value: '',
		mask: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/,
		isValid: true,
	},
	{
		type: 'text',
		name: 'phone',
		label: 'Phone Number',
		value: '',
		mask: '(000) 000-0000',
		isValid: true,
	},
	{
		type: 'text',
		name: 'zipcode',
		label: 'Zip Code',
		value: '',
		mask: '00000000',
		isValid: true,
	},
];
const selectedOptions = [];
const selectedAnnualIncome = [];
let isAgreementChecked = false;

// References
const headElement = document.querySelector('head');
const redirect_to = wrapper.getAttribute('data-redirect-url'); 
const pro_id = wrapper.getAttribute('pro-id');

// Clean wrapper
wrapper.innerHTML = '';
// Add wrapper class
wrapper.classList.add(wrapperClass);

if (wrapper) {
	(async () => {
		// Generate form inside wrapper
		const form = createElement(
			'form',
			[{ name: 'class', value: `${wrapperClass}__form` }],
			[
				{
					type: 'submit',
					listener: async (event) => {
						event.preventDefault();
						// Execute google recaptcha
						grecaptcha.execute();
					},
				},
				{
					type: 'input',
					listener: (event) => {
						// Check if all fields are valid
						const isValid = formFields.every((field) => field.isValid);
						// Enable submit button if all fields are valid
						if (isValid && isAgreementChecked) {
							event.currentTarget.querySelector('input[type="submit"]').disabled = false;
						} else {
							event.currentTarget.querySelector('input[type="submit"]').disabled = true;
						}
					},
				},
			],
			wrapper
		);

		// Generate form fields
		formFields.forEach((field) => {
			// Create input wrapper
			const inputWrapper = createElement(
				'div',
				[{ name: 'class', value: `${wrapperClass}__input-wrapper` }],
				[],
				form
			);

			// Create input
			const input = createElement(
				'input',
				[
					{
						name: 'type',
						value: field.type,
					},
					{
						name: 'id',
						value: field.name,
					},
					{
						name: 'placeholder',
						value: field.label,
					},
					{
						name: 'required',
						value: true,
					},
				],
				[
					{
						type: 'input',
						listener: (event) => {
							if (field.type !== 'text') {
								const value = event.target.value;
								field.value = value;
								// Validate input
								if (value !== '' && field.mask && typeof field.mask.test === 'function') {
									field.isValid = field.mask.test(field.value);
								} else {
									field.isValid = true;
								}
								// Add error class if needed
								if (field.value !== '' && !field.isValid) {
									inputWrapper.classList.add(`${wrapperClass}__input-wrapper--error`);
								} else {
									inputWrapper.classList.remove(`${wrapperClass}__input-wrapper--error`);
								}
							}
						},
					},
				],
				inputWrapper
			);
			// Add mask to input if needed
			if (field.type === 'text') {
				const mask = IMask(input, { mask: field.mask });
				mask.on('accept', () => {
					const value = mask.value;
					field.value = value;
					if (value !== '') {
						if (field.name !== 'zipcode') {
							field.isValid = false;
							inputWrapper.classList.add(`${wrapperClass}__input-wrapper--error`);
						} else {
							if (!/(^\d{5,8}$)/.test(value)) {
								field.isValid = false;
								inputWrapper.classList.add(`${wrapperClass}__input-wrapper--error`);
							} else {
								field.isValid = true;
								inputWrapper.classList.remove(`${wrapperClass}__input-wrapper--error`);
							}
						}
					} else {
						field.isValid = true;
						inputWrapper.classList.remove(`${wrapperClass}__input-wrapper--error`);
					}
				});
				mask.on('complete', () => {
					if (field.name !== 'zipcode') {
						field.isValid = true;
						inputWrapper.classList.remove(`${wrapperClass}__input-wrapper--error`);
					}
				});
			}

			// Create label for input
			createElement('label', [{ name: 'for', value: field.name }], [], inputWrapper).innerHTML =
				field.label;
		});

		createElement(
			'hr',
			[{ name: 'class', value: `${wrapperClass}__divider` }],
			[],
			form
		);

		// Create container for checkboxes and radio buttons
		const optionsContainer = createElement(
			'div',
			[{ name: 'class', value: `${wrapperClass}__options-container` }],
			[],
			form
		);

		const checkboxesContainer = createElement(
			'div',
			[{ name: 'class', value: `${wrapperClass}__checkboxes-container` }],
			[],
			optionsContainer
		);

		const radioButtonsContainer = createElement(
			'div',
			[{ name: 'class', value: `${wrapperClass}__radio-buttons-container` }],
			[],
			optionsContainer
		);

		// Create heading for checkboxes
		createElement(
			'h4',
			[{ name: 'class', value: `${wrapperClass}__checkbox-heading` }],
			[],
			checkboxesContainer
		).innerHTML = 'What can we help you with?';

		// Fetch services
		const services = await getServices();

		// Create wrapper for all checkboxes
		const checkboxesWrapper = createElement(
			'div',
			[{ name: 'class', value: `${wrapperClass}__checkbox-list` }],
			[],
			checkboxesContainer
		);

		// Generate services checkboxes
		services.forEach((service) => {
			// Create checkbox wrapper
			const checkboxWrapper = createElement(
				'div',
				[{ name: 'class', value: `${wrapperClass}__checkbox-item` }],
				[],
				checkboxesWrapper
			);

			// Create checkbox
			createElement(
				'input',
				[
					{ name: 'type', value: 'checkbox' },
					{ name: 'value', value: service.id },
					{ name: 'id', value: `option-${service.id}` },
				],
				[
					{
						type: 'change',
						listener: (event) => {
							if (event.target.checked && !selectedOptions.includes(event.target.value)) {
								selectedOptions.push(event.target.value);
							} else {
								selectedOptions.splice(selectedOptions.indexOf(event.target.value), 1);
							}
						},
					},
				],
				checkboxWrapper
			);
			// Create label for checkbox
			createElement(
				'label',
				[{ name: 'for', value: `option-${service.id}` }],
				[],
				checkboxWrapper
			).innerHTML = service.name;
		});

		// Generate heading for annual income radio buttons
		createElement(
			'h4',
			[{ name: 'class', value: `${wrapperClass}__radio-heading` }],
			[],
			radioButtonsContainer
		).innerHTML = 'What is your annual income?';

		// Generate annual income radio buttons' wrapper
		const annualIncomeWrapper = createElement(
			'div',
			[{ name: 'class', value: `${wrapperClass}__radio-list` }],
			[],
			radioButtonsContainer
		);

		// Generate annual income radio buttons
		annualIncomes.forEach((income) => {
			// Create radio button wrapper
			const radioWrapper = createElement(
				'div',
				[{ name: 'class', value: `${wrapperClass}__radio-item` }],
				[],
				annualIncomeWrapper
			);

			// Create radio button
			createElement(
				'input',
				[
					{ name: 'type', value: 'radio' },
					{ name: 'value', value: income.id },
					{ name: 'id', value: `income-${income.id}` },
					{ name: 'name', value: 'annual_income' },
				],
				[
					{
						type: 'change',
						listener: (event) => {
							// Clear selected annual income
							selectedAnnualIncome.length = 0;
							// Add selected annual income
							if (event.target.checked && !selectedAnnualIncome.includes(event.target.value)) {
								selectedAnnualIncome.push(event.target.value);
							} else {
								selectedAnnualIncome.splice(selectedAnnualIncome.indexOf(event.target.value), 1);
							}
						},
					},
				],
				radioWrapper
			);
			
			// Create label for radio button
			createElement(
				'label',
				[{ name: 'for', value: `income-${income.id}` }],
				[],
				radioWrapper
			).innerHTML = income.name;
		});
		// Generate user agreement checkbox
		const userAgreementWrapper = createElement(
			'div',
			[{ name: 'class', value: `${wrapperClass}__agreement-checkbox-wrapper` }],
			[],
			form
		);
		// Create checkbox for user agreement and add label
		createElement(
			'input',
			[
				{ name: 'type', value: 'checkbox' },
				{ name: 'id', value: `${wrapperId}_user-agreement` },
				{ name: 'required', value: true },
			],
			[
				{
					type: 'change',
					listener: (event) => {
						if (event.target.checked) {
							isAgreementChecked = true;
							event.target.setCustomValidity('');
							// Remove disabled attribute from submit button
							event.target.parentElement.parentElement.querySelector(
								'input[type="submit"]'
							).disabled = false;
						} else {
							isAgreementChecked = false;
							event.target.setCustomValidity('Please accept the user agreement');
							// Add disabled attribute to submit button
							event.target.parentElement.parentElement.querySelector(
								'input[type="submit"]'
							).disabled = true;
						}
					},
				},
			],
			userAgreementWrapper
		);
		createElement(
			'label',
			[{ name: 'for', value: `${wrapperId}_user-agreement` },
			{ name: 'class', value: `${wrapperClass}_user-agreement` }
			
			],
			[],
			userAgreementWrapper
		).innerHTML = `
  I agree to the <a href='https://app.unclekam.com/user-agreement' target="_blank">Uncle Kam Terms of Service</a> and 
  <a href="https://app.unclekam.com/privacy-policy" target="_blank">Privacy Policy</a> and agree to receive emails and texts 
  about promotions at the phone number and email provided, and understand this consent is not required to purchase. 
  By checking this box you agree to receive text messages from; Reply STOP to opt out; Reply HELP for help; 
  Message frequency varies; Message and data rates may apply.
`;

		// Generate submit button
		createElement(
			'input',
			[
				{
					name: 'type',
					value: 'submit',
				},
				{
					name: 'value',
					value: ' Get started today',
				},
				{
					name: 'class',
					value: `${wrapperClass}__submit-button`,
				},
				{
					name: 'disabled',
					value: isAgreementChecked,
				},
			],
			[],
			form
		);

		// Generate google recaptcha script and append to head
		createElement(
			'script',
			[
				{
					name: 'src',
					value: `https://www.google.com/recaptcha/api.js?&render=${recaptchaSiteKey}`,
				},
				{
					name: 'async',
					value: '',
				},
				{
					name: 'defer',
					value: '',
				},
			],
			[],
			headElement
		);

		// Generate google recaptcha widget and append to form
		createElement(
			'div',
			[
				{
					name: 'class',
					value: `g-recaptcha ${wrapperClass}__recaptcha`,
				},
				{
					name: 'data-sitekey',
					value: recaptchaSiteKey,
				},
				{
					name: 'data-size',
					value: 'invisible',
				},
				{
					name: 'data-callback',
					value: 'onRecaptchaSubmit',
				},
			],
			[],
			form
		);
	})();
}

// Create element and append to given parent
function createElement(type, attributes, events, parent) {
	const element = document.createElement(type);
	// Add attributes
	attributes.forEach((attribute) => {
		element.setAttribute(attribute.name, attribute.value);
	});
	// Add event listeners
	events.forEach((event) => {
		element.addEventListener(event.type, event.listener);
	});
	// Append to parent
	parent.appendChild(element);

	return element;
}

// Fetch services from API
async function getServices() {
	const response = await axios.get(servicesEndpoint);

	return response.data;
}

// Function that handles form submition after recaptcha is completed
window.formSubmitHandler = (token) => {
	// Create lead object
	const lead = {};
	// Add form fields to lead
	formFields.forEach((field) => {
		lead[field.name] = field.value;
	});
	// Remove special characters from phone number
	lead.phone = lead.phone.split(/[ ()-]/).join('');
	// Add selected options to lead
	lead.options = selectedOptions;
	// Add selected annual income to lead
	lead.income = selectedAnnualIncome;
	// Set timezone
	lead.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	// Add pro number to lead if exists
	// if (TPG_FORM_CONFIG.pro_number) {
	// 	lead.taxpro_number = TPG_FORM_CONFIG.pro_number;
	// }
	// Add recaptcha token to lead object
	lead.recaptcha_token = token;

	// Select the submit button and update its state
	const submitButton = document.querySelector(`.${wrapperClass}__submit-button`);
	submitButton.disabled = true;
	submitButton.value = "Loading...";

	// Send lead to API
	axios
		.post(leadsEndpoint, lead, {
			params:{pro_id: pro_id || null }	
		})
		.then((data) => {
			// Reset recaptcha
			grecaptcha.reset();
			if (!redirect_to) {
				return 	window.location.href = `https://unclekam.com/thankyou?uuid=${data?.data?.data?.lead_uuid}&appointment=${data?.data?.data?.allow_appointments}`;
			}
			// Redirect to given url if needed
			if (redirect_to) {
				window.location.href = redirect_to;
			}
		})
		.catch((error) => {
			console.error(error);
			// Revert button state on error
			submitButton.disabled = false;
			submitButton.value = "Get started today";
		});
};
