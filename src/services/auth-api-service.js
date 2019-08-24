import config from '../config'
import TokenService from './token-service'
import IdleService from './idle-service'

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/


const AuthApiService = {
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postLogin({ user_name, password }) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {
                /*
                  whenever a logint is performed:
                  1. save the token in local storage
                  2. queue auto logout when the user goes idle
                  3. queue a call to the refresh endpoint based on the JWT's exp value
                */
                TokenService.saveAuthToken(res.authToken)
                IdleService.regiserIdleTimerResets()
                TokenService.queueCallbackBeforeExpiry(() => {
                    AuthApiService.postRefreshToken()
                })
                return res
            })
    },
    postRefreshToken() {
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                // 'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            // body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {
                /*
                  similar logic to whenever a user logs in, the only differences are:
                  - we don't need to queue the idle timers again as the user is already logged in.
                  - we'll catch the error here as this refresh is happening behind the scenes
                */
                TokenService.saveAuthToken(res.authToken)
                // this.props.history.push('/trades')
                TokenService.queueCallbackBeforeExpiry(() => {
                    AuthApiService.postRefreshToken()
                })
                return res
            })
            .catch(err => {
                console.log('refresh token request error')
                console.error(err)
            })
    },
    validatePassword(password) {
        if (password.length < 8) {
            return 'Password be longer than 8 characters'
        }
        if (password.length > 72) {
            return 'Password be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return 'Password must contain one upper case, lower case, number and special character'
        }
        return null
    }
}

export default AuthApiService