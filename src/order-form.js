import IMask from 'imask';

const wrapperId = 'tpg-form-wrapper';
const wrapper = document.querySelector(`[data-title="${wrapperId}"]`);
const wrapperClass = 'tpg-form-wrapper';

wrapper.innerHTML = '';
wrapper.classList.add(wrapperClass);

if (wrapper) {
  const form = createElement(
    'form',
    [{ name: 'class', value: `${wrapperClass}__form` }],
    [
      {
        type: 'submit',
        listener: async (event) => {
          event.preventDefault();
          formSubmitHandler();
        },
      },
    ],
    wrapper
  );

  const userDetails = [
    { name: 'fullname', placeholder: 'Full Name', type: 'text' },
    { name: 'email', placeholder: 'Email Address', type: 'email' },
    { name: 'phone', placeholder: 'Phone Number', type: 'text', mask: '(000) 000-0000' },
  ];

  userDetails.forEach((field) => {
    const inputWrapper = createElement(
      'div',
      [{ name: 'class', value: `${wrapperClass}__input-wrapper` }],
      [],
      form
    );
    createElement(
      'input',
      [
        { name: 'type', value: field.type },
        { name: 'placeholder', value: field.placeholder },
        { name: 'name', value: field.name },
        { name: 'required', value: true },
      ],
      [],
      inputWrapper
    );

    if (field.mask) {
      IMask(inputWrapper.querySelector('input'), { mask: field.mask });
    }
  });

  const paymentSection = createElement(
    'div',
    [{ name: 'class', value: `${wrapperClass}__payment-section` }],
    [],
    form
  );
  paymentSection.innerHTML = `
  <div class='conttt'> 
  <h3 class="${wrapperClass}__section-title">Payment</h3>
  <div class='hr-line'></div>
  </div>
  `;

  const orderSummary = createElement(
    'div',
    [{ name: 'class', value: `${wrapperClass}__order-summary` }],
    [],
    paymentSection
  );

  const order = createElement(
    'div',
    [{ name: 'class', value: `${wrapperClass}__order-summary` }],
    [],
    paymentSection
  );

  order.innerHTML = `
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
          <td>Uncle Kam Boost</td>
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
          
          <label>
        <input type="radio" name="paymentOption" checked />
        Uncle Kam Boost
      </label>
          
          
          </td>
          <td>1</td>
          <td>$12,999.00</td>
        </tr>
      </tbody>
      <tfoot>
      </tfoot>
    </table>
  `;

  const paymentContainer = createElement(
    'div',
    [
      { name: 'class', value: `${wrapperClass}__payment-container` },
      { name: 'style', value: 'display: flex; gap: 20px; align-items: center;' },
    ],
    [],
    form
  );

  const paymentDetails = [
    { name: 'card_number', label: 'Card Number', placeholder: '1234 1234 1234 1234', type: 'text', mask: '0000 0000 0000 0000' },
    { name: 'expiration', label: 'Expiration', placeholder: 'MM / YY', type: 'text', mask: '00/00' },
    { name: 'cvc', label: 'CVC', placeholder: 'CVC', type: 'text', mask: '000' },
  ];

  paymentDetails.forEach((field) => {
    const fieldWrapper = createElement(
      'div',
      [{ name: 'class', value: `${wrapperClass}__input-wrapper` }],
      [],
      paymentContainer
    );

    createElement(
      'label',
      [{ name: 'for', value: field.name }],
      [],
      fieldWrapper
    ).textContent = field.label;

    const inputElement = createElement(
      'input',
      [
        { name: 'type', value: field.type },
        { name: 'placeholder', value: field.placeholder },
        { name: 'name', value: field.name },
        { name: 'required', value: true },
      ],
      [],
      fieldWrapper
    );

    IMask(inputElement, { mask: field.mask });
  });

  const submitWrapper = createElement(
    'div',
    [{ name: 'class', value: `${wrapperClass}__submit-wrapper` }],
    [],
    form
  );

  const submitButton = createElement(
    'button',
    [
      { name: 'type', value: 'submit' },
      { name: 'class', value: `${wrapperClass}__submit-button` },
    ],
    [],
    submitWrapper
  );

  submitButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="white" style="margin-right: 8px;">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10-2c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm0 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM7.04 11h9.91c.82 0 1.54-.5 1.85-1.25L21.79 4H6.21l-.95-2H1v2h3l3.6 7.59-1.35 2.45C5.08 14.9 5 15.15 5 15.5c0 .83.67 1.5 1.5 1.5h12v-2H7.42c-.12 0-.25-.08-.32-.19L8.1 13h8.88c1.38 0 2.63-.86 3.12-2.15L22 4H6.21l.83 1.59h14.6c.17 0 .31-.1.38-.24.07-.13.05-.28-.05-.4L19.1 4H7.7l-.66 1.25C7.04 5.32 7 5.65 7 6v5zm10-1H8V6h9v4z"/>
    </svg>
    Complete Order
  `;

  createElement(
    'p',
    [{ name: 'class', value: `${wrapperClass}__secure-text` }],
    [],
    submitWrapper
  ).textContent = '* 100% Secure & Safe Payments *';
}

function createElement(type, attributes, events, parent) {
  const element = document.createElement(type);
  attributes.forEach((attr) => element.setAttribute(attr.name, attr.value));
  if (events) events.forEach((event) => element.addEventListener(event.type, event.listener));
  parent.appendChild(element);
  return element;
}

async function formSubmitHandler() {
  const formData = {};
  document.querySelectorAll(`.${wrapperClass}__form input`).forEach((input) => {
    formData[input.name] = input.value;
  });

  formData.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('Form submitted:', formData);
}
