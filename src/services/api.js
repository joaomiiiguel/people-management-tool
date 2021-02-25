import axios from 'axios';


// CRUD Token - https://crudcrud.com
const tokenAPI = 'c6cdede087cc4cd09c433d251472e03c';

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