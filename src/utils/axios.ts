import axios from 'axios'

const token = import.meta.env.VITE_GITHUB_TOKEN;

const instanceAxios = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        'Authorization' : `Bearer ${token}`
    }
  });

  export default instanceAxios;