// function to handle login by an already existing user
const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            document.querySelector('#popup-modal').setAttribute('style', 'display:flex;')
        }
    }
};

const hideModal = (event) => {
    document.querySelector('#popup-modal').setAttribute('style', 'display:none;')
}

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document.querySelector('#okay').addEventListener("click", hideModal);