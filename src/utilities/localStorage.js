const getStoredCard = () =>{
   const storedCartString = localStorage.getItem('cart');
   if(storedCartString){
    return JSON.parse(storedCartString);
   }
   return [];
}

const saveCartToLS = cart =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}

const addToLS = id =>{
    const cart = getStoredCard();
    cart.push(id);

    // save to local storage
    saveCartToLS(cart);
}
export { addToLS, getStoredCard }