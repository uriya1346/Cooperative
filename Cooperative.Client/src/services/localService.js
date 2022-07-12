export const SHOP_TOKEN = "tok";

export const saveTokenLocal = (_token) => {
  localStorage.setItem(SHOP_TOKEN, _token);
}

export const checkTokenLocal = () => {
  if(localStorage[SHOP_TOKEN]){
    return localStorage[SHOP_TOKEN];
  }
  else{
    return false;
  }
}

export const deleteToken = () => {
  localStorage.removeItem(SHOP_TOKEN)
}