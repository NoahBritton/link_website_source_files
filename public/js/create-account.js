const protocol = window.location.protocol
const host = window.location.host

console.log('there')

const createAccountForm = document.querySelector('#createAccountForm')



const emailInput = document.querySelector('#email')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const message = document.querySelector("#message")

createAccountForm.addEventListener('submit', async (e) => {
    console.log('test')
    e.preventDefault()

    const email = emailInput.value;
    const name = usernameInput.value;
    const password = passwordInput.value;
    let data = { email, password, name }

    //const url = 'http://localhost:3002/users'
    const url = 'https://nbritton-api-app.herokuapp.com/users'

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    data = await response.json()

    if (response.status === 400) {
        const message = document.querySelector("#message")
        message.textContent = data.message
    } 
    else if (response.status === 201) {
        localStorage.setItem("token", data.token)
        alert(data.token)

        const newUrl = `${protocol}//${host}/main`
        window.location.replace(newUrl)
    }
})

console.log(createAccountForm)