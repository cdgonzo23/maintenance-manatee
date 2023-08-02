// function to handle a new user sign up
const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const firstName = document.querySelector('#firstname-signup').value.trim();
    const lastName = document.querySelector('#lastname-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (email && firstName && lastName && password) {
        const response = await fetch ('/api/user', {
            method: 'POST',
            body: JSON.stringify({ email, firstName, lastName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);