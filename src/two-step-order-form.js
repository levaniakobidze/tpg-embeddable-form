const wrapperId = 'tpg-form-wrapper';
const wrapper = document.querySelector(`[data-title="${wrapperId}"]`);
const wrapperClass = 'tpg-form-wrapper';

wrapper.innerHTML = '';
wrapper.classList.add(wrapperClass);

let currentStep = 1;

if (wrapper) {
  const accountSection = createAccountSection();
  const paymentSection = createPaymentSection();

  paymentSection.style.display = 'none';

  wrapper.appendChild(accountSection);
  wrapper.appendChild(paymentSection);

  const nextStepButton = accountSection.querySelector(`.${wrapperClass}__next-step-button`);
  nextStepButton.addEventListener('click', () => {
    if (validateAccountDetails(accountSection)) {
      currentStep = 2; 
      accountSection.style.display = 'none'; 
      paymentSection.style.display = 'block'; 
    } else {
      let errorMessage = document.querySelector('.error-message')
      if (errorMessage) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please fill out all required fields.';
      }
    } 
  });
}

function createAccountSection() {
  const accountContainer = document.createElement('div');
  accountContainer.classList.add(`${wrapperClass}__contact-info`);

  const accountTabContainer = document.createElement('div');
  accountTabContainer.classList.add('tab-container');

  const leftTab = document.createElement('div');
  leftTab.classList.add('left-tab');
  leftTab.innerHTML = `
    <p class="tab-title">Create Account</p>
    <p>Contact Information</p>
    <div class="active-line"></div>
  `;

  const rightTab = document.createElement('div');
  rightTab.classList.add('right-tab');
  rightTab.innerHTML = `
    <p class="tab-title">Your Information</p>
    <p>Your Billing Information</p>
    <div class="inactive-line"></div>

  `;

  accountTabContainer.appendChild(leftTab);
  accountTabContainer.appendChild(rightTab);
  accountContainer.appendChild(accountTabContainer);

  // Add input fields
  const inputs = [
    { name: 'full_name', placeholder: 'Full Name (Owner of the Account)', type: 'text' },
    { name: 'email', placeholder: 'Email Address (Login/Password Recovery)', type: 'email' },
    { name: 'phone', placeholder: 'Phone Number', type: 'text' },
  ];

  inputs.forEach((inputField) => {
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add(`${wrapperClass}__input-wrapper`);

    const input = document.createElement('input');
    input.type = inputField.type;
    input.name = inputField.name;
    input.placeholder = inputField.placeholder;
    input.required = true;

    inputWrapper.appendChild(input);
    accountContainer.appendChild(inputWrapper);
  });

  // Add next step button
  const nextStepWrapper = document.createElement('div');
  nextStepWrapper.classList.add(`${wrapperClass}__next-step-wrapper`);

  const errorMessage = document.createElement('p');
  errorMessage.type = 'p';
  errorMessage.classList.add(`error-message`);
  errorMessage.textContent = '';

  nextStepWrapper.appendChild(errorMessage);



  const nextStepButton = document.createElement('button');
  nextStepButton.type = 'button';
  nextStepButton.classList.add(`${wrapperClass}__next-step-button`);
  nextStepButton.textContent = 'Go To Step #2';

  nextStepWrapper.appendChild(nextStepButton);
  accountContainer.appendChild(nextStepWrapper);

  const privacyText = document.createElement('p');
  privacyText.classList.add(`${wrapperClass}__secure-text`);
  privacyText.textContent = '* We Respect Your Privacy & Information *';

  accountContainer.appendChild(privacyText);

  return accountContainer;
}

function createPaymentSection() {
  const paymentContainer = document.createElement('div');
  paymentContainer.classList.add(`${wrapperClass}__payment-section`);

  const paymentTabContainer = document.createElement('div');
  paymentTabContainer.classList.add('tab-container');

  const leftTab = document.createElement('div');
  leftTab.classList.add('left-tab');
  leftTab.innerHTML = `
    <p class="tab-title">Create Account</p>
    <p>Contact Information</p>
    <div class="inactive-line"></div>
  `;

  const rightTab = document.createElement('div');
  rightTab.classList.add('right-tab');
  rightTab.innerHTML = `
    <p class="tab-title">Your Information</p>
    <p>Your Billing Information</p>
    <div class="active-line"></div>
  `;

  paymentTabContainer.appendChild(leftTab);
  paymentTabContainer.appendChild(rightTab);
  paymentContainer.appendChild(paymentTabContainer);

  const paymentForm = document.createElement('form');
  paymentForm.classList.add(`${wrapperClass}__payment-form`);

  const orderSummary = document.createElement('div');
  orderSummary.classList.add(`${wrapperClass}__order-summary`);

  orderSummary.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" /> Uncle Kam Boost
          </td>
          <td>1</td>
          <td>$12,999.00</td>
        </tr>
        <tr>
          <td>
            <input type="checkbox" /> Uncle Kam Boost
          </td>
          <td>1</td>
          <td>$12,999.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Order Total</td>
          <td>$12,999.00</td>
        </tr>
      </tfoot>
    </table>
  `;
  paymentForm.appendChild(orderSummary);

  const specialOfferContainer = document.createElement('div');
  specialOfferContainer.classList.add(`${wrapperClass}__special-offer`);
  specialOfferContainer.innerHTML = `
    <div class="offer-box">
      <h3>
      <input type="checkbox" />
      Comprehensive Tax Analysis</h3>
      <p>
        <strong style="color: red;">ONLY $250 ONE TIME OFFER Maximize Your Tax Savings!</strong></br>
        Let our tax strategists review your past returns and uncover customized strategies
        to help you save more. Get your tax analysis report with custom tax strategies based
        on your unique situation. <br>This is usually $997, but get it for just $250 today.
      </p>
    </div>
  `;
  paymentForm.appendChild(specialOfferContainer);

  // Add card details inputs
  const cardDetails = [
    { name: 'card_number', label: 'Card Number', placeholder: '1234 1234 1234 1234', type: 'text' },
    { name: 'expiration', label: 'Expiration', placeholder: 'MM / YY', type: 'text' },
    { name: 'cvc', label: 'CVC', placeholder: 'CVC', type: 'text' },
  ];

  const paymentCont = document.createElement('div');
  paymentCont.classList.add(`${wrapperClass}__payment-cont`);

  cardDetails.forEach((detail) => {
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add(`${wrapperClass}__input-wrapper`);

    const label = document.createElement('label');
    label.htmlFor = detail.name;
    label.textContent = detail.label;

    const input = document.createElement('input');
    input.type = detail.type;
    input.name = detail.name;
    input.placeholder = detail.placeholder;
    input.required = true;

    inputWrapper.appendChild(label);
    inputWrapper.appendChild(input);
    paymentCont.appendChild(inputWrapper);
  });

  paymentForm.appendChild(paymentCont);

  // Add submit button
  const submitWrapper = document.createElement('div');
  submitWrapper.classList.add(`${wrapperClass}__submit-wrapper`);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.classList.add(`${wrapperClass}__submit-button`);
  submitButton.textContent = 'Complete Order';

  submitWrapper.appendChild(submitButton);
  paymentForm.appendChild(submitWrapper);

  paymentContainer.appendChild(paymentForm);

  return paymentContainer;
}

function validateAccountDetails(section) {
  const inputs = section.querySelectorAll('input[required]');
  for (const input of inputs) {
    if (!input.value.trim()) {
      input.focus();
      return false;
    }
  }
  return true;
}
