const fullName = document.getElementById('fullName');
const mobileNumber = document.getElementById('mobileNumber');
const countryCodeSelect = document.getElementById('countryCodeSelect');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('repeatPassword');
const verifyMobileButton = document.querySelector('button.btn-warning');
const signInLink = document.querySelector('a[href="#"]'); // Assuming it's the sign in link in your form

fullName.addEventListener('input', () => {
    const fullNameError = document.getElementById('fullNameInvalid');
    const reg = /^\s*([A-Za-z]+)\s+([A-Za-z]+)\s+([A-Za-z]+(?:\s+[A-Za-z]+)*)\s*$/.test(fullName.value);
    if (reg) {
        fullName.classList.remove('is-invalid');
        fullName.classList.add('is-valid');
        fullNameError.textContent = "";
    } else {
        fullName.classList.remove('is-valid');
        fullName.classList.add('is-invalid');
        fullNameError.textContent = "Full name must contain at least 3 words.";
    }
});

mobileNumber.addEventListener('input', () => {
    const mobileNumberError = document.getElementById('mobileNumberInvalid');
    const reg = /^\d+$/.test(mobileNumber.value);  
    if (reg) {
        mobileNumber.classList.remove('is-invalid');
        mobileNumber.classList.add('is-valid');
        mobileNumberError.textContent = "";
    } else {
        mobileNumber.classList.remove('is-valid');
        mobileNumber.classList.add('is-invalid');
        mobileNumberError.textContent = "Please enter a valid mobile number.";
    }
});

password.addEventListener('blur', () => {
    const passwordError = document.getElementById('passwordInvalid');
    const isValid = password.value.length > 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password.value) && /\d/.test(password.value);
    if (isValid) {
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        passwordError.textContent = "";
    } else {
        password.classList.remove('is-valid');
        password.classList.add('is-invalid');
        passwordError.textContent = "Password must be more than 8 characters and contain a special character and a number.";
    }
});

repeatPassword.addEventListener('blur', () => {
    const repeatPasswordError = document.getElementById('repeatPasswordInvalid');
    const isMatch = repeatPassword.value === password.value;
    if (isMatch) {
        repeatPassword.classList.remove('is-invalid');
        repeatPassword.classList.add('is-valid');
        repeatPasswordError.textContent = "";
    } else {
        repeatPassword.classList.remove('is-valid');
        repeatPassword.classList.add('is-invalid');
        repeatPasswordError.textContent = "Passwords do not match.";
    }
});

verifyMobileButton.addEventListener('click', () => {
    if (document.querySelectorAll('.is-invalid').length > 0) return;

    const userObj = {
        fullName: fullName.value.trim(),
        mobileNumber: countryCodeSelect.value + mobileNumber.value.trim(), 
        password: password.value.trim()
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userObj);
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = 'login.html';
});

signInLink.addEventListener('click', (event) => {
    event.preventDefault(); 

    if (document.querySelectorAll('.is-invalid').length > 0) return;
    
    const userObj = {
        fullName: fullName.value.trim(),
        mobileNumber: countryCodeSelect.value + mobileNumber.value.trim(), 
        password: password.value.trim()
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userObj);
    localStorage.setItem('users', JSON.stringify(users));

    window.location.href = 'login.html';
});
