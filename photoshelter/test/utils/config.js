const userCredentials = {
    username: 'tomsmith',
    password: 'SuperSecretPassword!'
}

const invalidUserCredentials = {
    empty: '',
    invalidString: 'foo',
}

const baseUrl = "https://the-internet.herokuapp.com/"

module.exports = { userCredentials, invalidUserCredentials, baseUrl }