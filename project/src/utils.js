export function getUserData(){
    let users = JSON.parse(sessionStorage.getItem("user"));
    console.log(users)
    
    if(users){
        return users;
    }else{
        return undefined;
    }
}

export function setUserData(data){
    return sessionStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData(){
    sessionStorage.removeItem('user');
    // return JSON.parse(sessionStorage.removeItem('user'));
}