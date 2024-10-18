function handleCredentialResponse(response) {
    const responsePayload = decodeJwtResponse(response.credential);
    
    document.querySelector('.g_id_signin').style.display = 'none';
    document.querySelector('.subtitle').textContent = 'Please provide additional information:';
    
    const form = document.createElement('form');
    form.innerHTML = `
        <input type="text" id="name" placeholder="Name" required>
        <input type="text" id="familyName" placeholder="Family Name" required>
        <input type="number" id="age" placeholder="Age" required>
        <button type="submit">Submit</button>
    `;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const familyName = document.getElementById('familyName').value;
        const age = document.getElementById('age').value;
        
        // Here you would typically send this data to your server
        console.log('User data:', { name, familyName, age });
        
        // Redirect to thank you page
        showThankYou();
    });
    
    document.querySelector('.container').appendChild(form);
}

function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function showThankYou() {
    document.querySelector('.container').innerHTML = `
        <h1 class="thank-you">Thank you for testing this website!</h1>
    `;
}