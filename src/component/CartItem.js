import React from 'react'
import {CgMathPlus,CgMathMinus} from 'react-icons/cg'
import {AiFillDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import {removeCartItem,increaseQty,decreaseQty} from '../store/ProductSlice'

function CartItem({id,name,image,category,qty,price,total,description}) {
    let dispatch=useDispatch()
    // let CartItem=useSelector((state)=>state.product.cartItem)
    // console.log(CartItem)
  return <>
  <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-300'>
    <div className="p-3 bg-white rounded overflow-hidden">
    <img src={image} alt="cartImage" className="h-28 w-40 object-cover " />
    </div>

<div className="flex flex-col gap-1 w-full">
    <div className='flex justify-between'>
            <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-xl">
              {name}
            </h3>
            <div className='cursor-pointer'onClick={()=>dispatch(removeCartItem(id))}>
                <AiFillDelete/>
            </div>
            </div>
            <p className=" text-slate-500  font-medium ">
              {category}
            </p>
            <p className=" font-bold text-base">
              <span className="text-red-500 ">₹</span>
              <span>{price}</span>
            </p>

<div className='flex justify-between'>
            <div className="flex gap-3 items-center">
              <button
                onClick={()=>dispatch(increaseQty(id))}
                className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-4"
              >
                <CgMathPlus/>
              </button>
              <p className='font-semibold p-5'>{qty}</p>
              <button
                onClick={()=>dispatch(decreaseQty(id))}
                className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-4"
              >
                <CgMathMinus/>
              </button>
            </div>
            

            <div className='flex items-center gap-2 font-bold'>
                <p>Total:</p>
                <p><span className="">₹</span>{total}</p>
            </div>
          </div>
</div>
    
    
  
  </div>
  </>
}

export default CartItem