import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../store/ProductSlice'
import { useDispatch } from 'react-redux'

function CardItems({image,price,name,category,loading,id}) {
let dispatch=useDispatch()

  let handleAddtoCart=(e)=>{
dispatch(addCartItem({
  _id:id,
  name:name,
  price:price,
  category:category,
  image:image
}))

  }
  return <>
  
  <div className="w-full min-w-[200px] max-w-[250px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
  {
    image ?(
<>
<Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
{/* <div className="w-full min-w-[220px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col "> */}
  <div className='h-28 flex flex-col justify-center items-center'>
    <img src={image} className='h-full' alt="cardItemsImage" />
  </div>
  <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
              </p>
              </Link>
              <button  className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full" onClick={()=>handleAddtoCart(id)}>Add to Cart</button>
           
  {/* </div> */}
 
  </>
    )
    :
    <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
  }
  </div>
  </>
}

export default CardItems