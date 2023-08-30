import React from 'react'
import { useSelector } from 'react-redux'
import { addCartItem } from '../store/ProductSlice'
import CartItem from '../component/CartItem'
import emptyCartImage from "../assest/empty.gif"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js'

function Cart() {
  let products=useSelector((state)=>state.product.cartItem)
  // console.log(products)

  let user=useSelector((state)=>state.user)
  // console.log(user)

  let navigate=useNavigate()
  
  const totalPrice = products.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const totalQty = products.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  let handlePayment=async()=>{
    if(user.email){
      let stripePromise=await loadStripe("pk_test_51N3eh3SHNBZiBdpKyytzJvTcbdB1Sl6pV1mkY61hbN78GC8ZiRnvrCUG8PyaclfbB2V34qwMzi7XgFZVtddk7Y4W000yKPhVH8")
      let res=await fetch("http://localhost:8080/checkout-payment",{
        method:"post",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(products)
      })
    
      let data=await res.json("")
      console.log(data);
      toast.success("Redirect to payment Gateway")
      stripePromise.redirectToCheckout({sessionId:data})
      }else{
        toast.error("Please Login")
        setTimeout(() => {
          navigate('/login')

        }, 1000);
       
      }
    
    }
    
  return (
    <>
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">
          Your Cart Items
        </h2>

        {products[0] ?
        <div className="my-4 flex gap-3">
          {/* display cart items  */}
          <div className="w-full max-w-3xl ">
            {products.map((el) => {
              return (
                <CartItem
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={el.total}
                  price={el.price}
                />
              );
            })}
          </div>

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg border-b">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCartImage} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </>
  );

};
      
  
  



export default Cart