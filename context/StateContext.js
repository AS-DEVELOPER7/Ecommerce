import { ifError } from 'assert'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import toast from 'react-hot-toast'
const Context=createContext()
const StateContext = ({children}) => {
  const [showCart,setShowCart]=useState(false)
  const[cartItems,setCartItems]=useState([])
  const[totalPrice,setTotalPrice]=useState(0)
  const[totalQuantities,setTotalQuantities]=useState(0)
  const[qty,setQty]=useState(1)

//   increasing the quantity
const incQty=()=>{
    setQty((prvQty)=>prvQty+1)
}
// decrement the quantity
const decQty=()=>{
    setQty((prvQty)=>{
        if(prvQty -1<1)return 1
     return   prvQty-1})
}
// on adding product to cart
const onAdd=(product,quantity)=>{
    //check if the product we added to the cart is already present in the cart
    const checkProductInCart=cartItems.find((item)=>item._id===product._id)
    // update the total price value of the cart items
    setTotalPrice((prevTotalPrice)=>prevTotalPrice+product.price*quantity)
    // update the total quantity of the cart items
    setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+quantity)
    if(checkProductInCart){
        // if the product is already present in the cart than jst update the product quantity value
        const updatedCartItems=cartItems.map((cartProduct)=>{
            if(cartProduct._id===product._id)return{
                ...cartProduct,
                quantity:cartProduct.quantity+quantity
            }
        })
        setCartItems(updatedCartItems)
    }else{
        // if the product is not present in cart items
    // add the quantity value to products
        product.quantity=quantity;
        // then add it to cart items
        setCartItems([...cartItems,{...product}])
    }
    // send the message on the screen 
    toast.success(`${qty} ${product.name} added to the cart.`)
    setQty(1)
}
// removing product from cart
const onRemove=(id)=>{
    let foundProduct=cartItems.find((item)=>item._id===id)
    const newCartItems=cartItems.filter((item)=>item._id!==id)
    setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price*foundProduct.quantity)
    setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities-foundProduct.quantity)
    setCartItems(newCartItems)
}
// changing quantity of cart items
const toggleCartItemQuantity=(id,value)=>{
    const foundProduct=cartItems.find((item)=>item._id===id)
   
    const newCartItems=cartItems.filter((item)=>item._id!==id)
    if(value==='inc'){
          
        setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity +1}])
        setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities+1)
    }else if(value==='dec'){
      if(foundProduct.quantity>1) { setCartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity -1}])
        setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
        setTotalQuantities((prevTotalQuantities)=>prevTotalQuantities-1)}
    }
}
    return (
    <Context.Provider value={{showCart,setShowCart,cartItems,totalPrice,totalQuantities,qty,incQty,decQty,onAdd,toggleCartItemQuantity,onRemove,setTotalPrice,setTotalQuantities}}>{children}</Context.Provider>
  )
}

export default StateContext

 export const useStateContext=()=>useContext(Context)