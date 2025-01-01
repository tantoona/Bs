const phoneNumber = document.getElementById('phoneNumber');
const continueButton = document.querySelector('button.btn-warning');
const createAccountButton = document.getElementById('createAccountButton');
const phoneNumberError = document.getElementById('phoneNumberInvalid');
const alertContainer = document.getElementById('alertContainer'); 


phoneNumber.addEventListener('input', () => {
    const value = phoneNumber.value.trim();

    if (value === "") {
        phoneNumber.classList.remove('is-valid');
        phoneNumber.classList.add('is-invalid');
        phoneNumberError.textContent = "Phone number cannot be empty.";
        return;
    }

    const reg = /^\+?\d{8,15}$/.test(value); 
    if (reg) {
        phoneNumber.classList.remove('is-invalid');
        phoneNumber.classList.add('is-valid');
        phoneNumberError.textContent = "";
    } else {
        phoneNumber.classList.remove('is-valid');
        phoneNumber.classList.add('is-invalid');
        phoneNumberError.textContent = "Please enter a valid mobile number (e.g., +201001649025).";
    }
});


continueButton.addEventListener('click', () => {
    const value = phoneNumber.value.trim();

    if (phoneNumber.classList.contains('is-invalid') || value === "") {
        phoneNumber.classList.add('is-invalid');
        phoneNumberError.textContent = "Please enter a valid mobile number.";
        return;
    }

    let users = [];
    try {
        users = JSON.parse(localStorage.getItem('users')) || [];
    } catch (e) {
        console.error('Error parsing users from localStorage:', e);
    }

    const enteredPhoneNumber = value;
    const matchedUser = users.find(user =>
        user.mobileNumber.replace(/\s+/g, '').endsWith(enteredPhoneNumber.replace(/\s+/g, ''))
    );

    if (matchedUser) {
        const successMessage = document.createElement('div');
        successMessage.classList.add('alert', 'alert-success');
        successMessage.setAttribute('role', 'alert');
        successMessage.textContent = `Welcome back, ${matchedUser.fullName}!`;

        alertContainer.innerHTML = '';
        alertContainer.appendChild(successMessage);

        setTimeout(() => {
            window.location.href = 'index.html'; 
        }, 1500);
    } else {
        phoneNumber.classList.add('is-invalid');
        phoneNumberError.textContent = "Mobile number not found. Please register first.";
    }
});


createAccountButton.addEventListener('click', () => {
    window.location.href = 'register.html'; 
});
