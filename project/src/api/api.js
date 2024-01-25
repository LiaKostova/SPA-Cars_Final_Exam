import { clearUserData, getUserData } from "../utils.js";


let host = 'http://localhost:3030';

async function request( method, url, data){

    const options = {
        method,
        headers: {},
    }

    let user = getUserData();

    if(user){
        options.headers["X-Authorization"] = user.accessToken;
    }
    if(data){
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try{
        let finalUrl = host+url;
        let response = await fetch(finalUrl, options);

        if(response.ok !== true){
            if(response.status == 403){
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204){
           return response;
        }else{
            return response.json();
        }

    }catch(err){
        alert(err.message);
        throw err;
    }
}


export const get = request.bind(null, "GET");
export const put = request.bind(null, "PUT")
export const post = request.bind(null, "POST")
export const del= request.bind(null, "DELETE")