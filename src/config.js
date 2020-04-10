export default {
    //`http://localhost:8000/api`
    API_ENDPOINT: `https://${process.env.REACT_APP_HEROKU_ENDPOINT}`,
    JWT_TOKEN: process.env.REACT_APP_JWT_TOKEN || 'JWT_TOKEN',
}