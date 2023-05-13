import Link from 'next/link'
import React from 'react'
import {AiOutlineShoppingCart}from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'
const Navbar = () => {
  const {showCart,setShowCart,totalQuantities}=useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'><Link href='/'>SoundStage</Link></p>

      {!showCart?<button className='cart-icon'type='button'onClick={()=>setShowCart(true)}>
        <AiOutlineShoppingCart/>
        <span className='cart-item-qty'>{totalQuantities}</span>
        </button>:<></>}
        {showCart&&<Cart/>}
    </div>
  )
}

export default Navbar
