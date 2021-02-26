import axios from 'axios';


// CRUD Token - https://crudcrud.com
const tokenAPI = 'fc812553f964452fb3c311d4ce56cded';

/*
const express = require('express')
const cors = require('cors')
const app = express()

app.use=(cors());
*/
const api = axios.create({
    baseURL:`https://crudcrud.com/api/${tokenAPI}`, 
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    proxy: {
        protocol: 'https',
        host: 'localhost',
        port: 3000,
      },
    
})

export default api;