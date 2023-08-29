import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AllProduct from "../component/AllProduct";
import { addCartItem } from "../store/ProductSlice";


function Menu() {
let dispatch=useDispatch()

  const { filterby } = useParams();
  console.log(filterby);

  let products = useSelector((state) => state.product.product);
  console.log(products);

  let selectedProduct = products.filter((e) => e._id === filterby);
  console.log(selectedProduct[0]);
  console.log(selectedProduct.image);

  let handleAddCartProduct=(e)=>{
    dispatch(addCartItem(selectedProduct))
  }    


  const navigate = useNavigate();
  // const dispatch = useDispatch()
  

  // const productDisplay = productData.filter((el) => el._id === filterby)[0];

  // const handleAddCartProduct = (e) => {
  //   dispatch(addCartItem(productDisplay))
  // };

  const handleBuy = ()=>{
    dispatch(addCartItem(selectedProduct))
      navigate("/cart")
  }
  return (
    <>
      <div className="p-2 md:p-4">
        <div className="w-full max-w-4xl m-auto md:flex bg-white">
          <div className="max-w-sm  overflow-hidden w-full p-5">
            {/* <img
              src={selectedProduct[0].image}
              className="hover:scale-105 transition-all h-full"
            /> */}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-slate-600  capitalize text-2xl md:text-4xl">
              {/* {selectedProduct[0].name} */}
            </h3>
            <p className=" text-slate-500  font-medium text-2xl ">
              {/* {selectedProduct[0].category} */}
            </p>
            <p className=" font-bold md:text-2xl">
              <span className="text-red-500 ">₹</span>
              {/* <span>{selectedProduct[0].price}</span> */}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleBuy}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
                
              >
                Buy
              </button>
              <button
                onClick={handleAddCartProduct}
                className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              >
                Add Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium">Description : </p>
              {/* <p>{selectedProduct[0].description}</p> */}
            </div>
          </div>
        </div>

        <AllProduct heading={"Related Product"} />
      </div>
    </>
  );
}

export default Menu;
