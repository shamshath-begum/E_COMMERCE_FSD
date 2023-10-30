import React, {  useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "../component/HomeCard";
import CardItems from "../component/CardItems";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


import AllProduct from "../component/AllProduct";
// import { useDispatch } from "react-redux";
import { fetchProducts } from "../store/ProductSlice";


function Home() {
const dispatch=useDispatch()
// dispatch(fetchProducts)
  let products = useSelector((state) => state.product.product);
  // console.log(products);

  let cardProducts = products.slice(0, 4);
  // console.log(cardProducts);

  let products_vegetable = products.filter(
    (product) => product.category === "vegetable",
    []
  );
  // console.log(products_vegetable);

  useEffect(() => {
    dispatch(fetchProducts());
    
}, []);
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  let nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  let previousProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  let slideProductRef = useRef();

  return (
    <>
    
      <div className="p-2 md:4">
        <div className="md:flex gap-4 py-2">
          <div className="md:w-1/2">
            <div className="flex gap-3 bg-slate-200 w-36 px-2 items-center rounded-full">
              <p className="text-sm font-medium text-slate-900">
                Bike Delivery
              </p>
              <img
                src="https://th.bing.com/th/id/OIP.0vnwuwpOff6g08TuekOhsQHaEo?w=226&h=180&c=7&r=0&o=5&pid=1.7"
                className="h-9"alt="bikeImage"
              />
            </div>
            <h2 className="text-4xl md:text-7xl font-bold py-3">
             One Of The FastProduct Delivery To {" "}
              <span className="text-red-600 text-">Your Home</span>
            </h2>
            <p className="py-3 text-base ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </div>

          <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
            {cardProducts[0]
              ? cardProducts.map((e) => {
                  return (
                    <HomeCard
                      key={e._id}
                      id={e._id}
                      image={e.image}
                      name={e.name}
                      price={e.price}
                      category={e.category}
                    />
                  );
                })
              : loadingArray.map((el, index) => {
                  return (
                    <HomeCard key={index + "loading"} loading={"Loading..."} />
                  );
                })}
          </div>
        </div>

        <div>
          <div className="flex w-full items-center  ">
            <h2 className="font-bold text-2xl text-slate-800 mb-4">
              Fresh Vegetables
            </h2>
            <div className="ml-auto flex gap-4">
              <button
                onClick={previousProduct}
                className="bg-slate-200 hover:bg-slate-500 text-lg p-1 rounded"
              >
                <GrPrevious />
              </button>
              <button
                onClick={nextProduct}
                className="bg-slate-200 hover:bg-slate-500 text-lg p-1 rounded"
              >
                <GrNext />
              </button>
            </div>

            <div
              className="flex gap-5 overflow-scroll scrolbar-none scroll-smooth transition-all"
              ref={slideProductRef}
            >
              {products_vegetable[0]
                ? products_vegetable.map((products) => {
                    return (
                      <CardItems
                        key={products._id}
                        id={products._id}
                        image={products.image}
                        name={products.name}
                        price={products.price}
                        category={products.category}
                      />
                    );
                  })
                : loadingArrayFeature.map((el, index) => {
                    return (
                      <CardItems
                        loading="Loading..."
                        key={index + "cartloading"}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
        <AllProduct heading={"Your Product"} />
      </div>
      
    </>
  );
}

export default Home;
