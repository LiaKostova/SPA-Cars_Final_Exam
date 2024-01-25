import * as api from './api.js';

export async function getAllCars(){
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function createCar(data){
    return api.post('/data/cars', data)
}

export async function getTheCar(carId){
    return api.get('/data/cars/' +carId);
}

export async function deleteTheCar(carId){
    return api.del('/data/cars/'+carId)
}

export async function editTheCarInfo(carId,data){
    return api.put('/data/cars/' + carId, data)
}

export async function getAllSearchedCar(query){
    return api.get(`/data/cars?where=model%20LIKE%20%22${query}%22`);
}