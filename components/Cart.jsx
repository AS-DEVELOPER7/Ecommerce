import Link from 'next/link'
import React, { useRef } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import { urlfor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef=useRef()
  const {totalPrice,totalQuantities,cartItems,setShowCart,onRemove,toggleCartItemQuantity}=useStateContext()

const handleCheckout=async()=>{
const stripe=await getStripe();
const response = await fetch('/api/stripe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(cartItems),
}).then(function(response) {
  return response.json();
})
.then(function(session) {
  return stripe.redirectToCheckout({ sessionId: session.id });
});

if(response.statusCode === 500) return;



toast.loading('Redirecting...');

}
  return (
    <div className='cart-wrapper'ref={cartRef}>
      <div className="cart-container">
        <button type='button'className='cart-heading'onClick={()=>setShowCart(false)}><AiOutlineLeft />
        <span className='heading'>Your Cart </span>
        <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {cartItems.length< 1 &&(
          <div className='empty-cart flex flex-col justify-center items-center'>
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button type='button' onClick={()=>setShowCart(false)}className='btn font-semibold'>Continue Shopping</button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length>=1&&cartItems.map((item)=>(
            <div className="product"key={item._id}>
              <img src={urlfor(item?.image[0])} alt="" className='cart-product-image'/>
              <div className="item-desc">
                <div className="flex top ">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus'onClick={()=>toggleCartItemQuantity(item._id,"dec")}><AiOutlineMinus/></span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus'onClick={()=>toggleCartItemQuantity(item._id,"inc")}><AiOutlinePlus/></span>

                    </p>
                  </div>
                  <button type='buttton'className='remove-item'onClick={()=>onRemove(item._id)}>
                    <AiOutlineDelete/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length>=1&&(
          <div className="cart-bottom">
            <div className="total">
              <h3 className='font-bold'>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type='button' className='btn font-semibold'onClick={handleCheckout}>Pay With Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart