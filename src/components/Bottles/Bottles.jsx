import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/bottle";
import './Bottles.css';
import { addToLS, getStoredCard } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( ()=>{
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])

    // load cart from local storage
    useEffect( () =>{
       if(bottles.length > 0){
        const storeCart = getStoredCard();
        // console.log(storeCart, bottles);

        const savedCart = [];
        for(const id of storeCart){
            console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
             savedCart.push(bottle)   
            }
        }
        console.log('saved cart', savedCart);
        setCart(savedCart);
       }
    },[bottles])

    const handleAddToCart = bottle =>{
       const newCart = [...cart, bottle]
       setCart(newCart);
       addToLS(bottle.id)
        
    }

    return (
        <div>
            <h3>Bottles Available: {bottles.length}</h3>
            <Cart cart={cart}></Cart>
            <div className="bottle-container">
              {
                  bottles.map(bottle => <Bottle
                     key={bottle.id} 
                     handleAddToCart={handleAddToCart}
                     bottle={bottle}> 
                     </Bottle>)
              }
            </div>
        </div>
    );
};

export default Bottles;