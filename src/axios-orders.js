import axios from 'axios';

 const instance = axios.create({
    baseURL:'https://my-burger-builder-9b59c-default-rtdb.firebaseio.com/'
})

export default instance;