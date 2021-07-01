// Faz a importação do pacote do axios
import axios from 'axios'

// Definiu a constante api para chamada de requisições
const api = axios.create({
    // Define a url base para as requisições à API
    baseURL: 'http://localhost:5000/api'
})

// Exporta a constante para uso em outros arquivos do projeto
export default api;