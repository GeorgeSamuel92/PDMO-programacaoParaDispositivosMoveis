import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.171:3000'
});

export default api;

// iniciar o banco de dados na atividade 03 da aula PWBE2
// usar o comando `nodemon start app-db.js`