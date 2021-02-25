import axios from 'axios';

// CRUD Token - https://crudcrud.com
const tokenAPI = 'c6cdede087cc4cd09c433d251472e03c';

const api = axios.create({
    baseURL:`https://crudcrud.com/api/${tokenAPI}`
})

export default api;