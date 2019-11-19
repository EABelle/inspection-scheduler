const environment = process.env.NODE_ENV || 'development';
const config = {
    development: {
        baseURL: 'http://localhost:3800/',
    },
    test: {
        baseURL: '',
    },
    staging: {
        baseURL: '',
    },
    production: {
        baseURL: '',
    }
}
export default config[environment]