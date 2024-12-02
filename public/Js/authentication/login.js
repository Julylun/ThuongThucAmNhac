export {
    login
}

const login = (username, password) => {
    console.log('[FlowDebug](login.js) - login(): Start login')
    let formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);
    fetch('/api/login', {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error);
            } else {
                console.log('[FlowDebug](login.js) - login(): Login successfully')
                console.log('[FlowDebug](login.js) - login(): Set accessToken to localStorage')
                localStorage.setItem('accessToken', data.data.accessToken);
                console.log('[FlowDebug](login.js) - login(): Redirect to home page')
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}