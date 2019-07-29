const endpoint = 'http://localhost:3000/api/v1'
const signupUrl = `${endpoint}/users`
const loginUrl = `${endpoint}/login`
const ordersUrl = `${endpoint}/orders`
const validateUrl = `${endpoint}/validate`

const jsonify = res => {
    if (res.ok)
        return res.json()
}
const handleServerError = response => console.error(response)

const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.getItem('token'),
        ...moreHeaders
    }
)

const signUp = (user) => fetch(signupUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)
    .then(data => {
        localStorage.setItem('token', data.token)
        return data.user
    })
    .catch(handleServerError)


const logIn = (user) => fetch(loginUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
}).then(jsonify)

const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve({ error: 'no token' })

    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify)
        .then(data => {
            localStorage.setItem('token', data.token)
            return data.user
        })
        .catch(handleServerError)
}

const clearToken = () => localStorage.removeItem('token')

const getData = (value) => {
  return fetch(`${endpoint}/${value}`)
    .then(res=> res.json())
}

export default {
    signUp,
    logIn,
    validateUser,
    clearToken,
    getData
}