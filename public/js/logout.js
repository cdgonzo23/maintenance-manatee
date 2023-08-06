const logoutLink = document.querySelector('#logout');
const hamburgerLogoutLink = document.querySelector('#logout-hamburger');

// function to log user out if already logged in
const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};
if (logoutLink) {
    logoutLink.addEventListener('click', logout);
};

if (hamburgerLogoutLink) {
    hamburgerLogoutLink.addEventListener('click', logout);
}