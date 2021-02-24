import axios from 'axios';

// CRUD Token - https://crudcrud.com
const tokenAPI = 'ec73b38a55bd4601b01a86b631611123';

const api = axios.create({
    baseURL:`https://crudcrud.com/api/${tokenAPI}`
})

export default api;