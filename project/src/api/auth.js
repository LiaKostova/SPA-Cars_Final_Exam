import { clearUserData, setUserData } from '../utils.js';
import {get, post} from './api.js';

export async function login(email, password){
    let res = await post('/users/login', {email, password});
    setUserData(res);
}

export async function register(email, password){
    let res = await post('/users/register', {email, password});
    setUserData(res);
}

export async function logout(){
    get('/users/logout');
    clearUserData();
}