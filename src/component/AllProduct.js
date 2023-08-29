import React from 'react'
import FilterProduct from './FilterProduct'
import CardItems from './CardItems'
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';

function AllProduct({heading}) {
    let products = useSelector((state) => state.product.product);
  // console.log(products);

  let categoryList=[...new Set(products.map(products=>products.category))];     
// console.log(categoryList)

// display filter data
const[filterby,setFilterBy]=useState("")
const[filterdata,setFilterData]=useState([])

useEffect(()=>{
  setFilterData(products)
},[products])

let handleFilterProduct=(category)=>{
  setFilterBy(category)
    let filter=products.filter(product=>product.category.toLowerCase()===category.toLowerCase())
    setFilterData(()=>{
      return[
        ...filter
      ]
    })
  }

  const loadingArrayFeature = new Array(10).fill(null);
  return <>
  <div className="my-5">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
                {heading}
              </h2>
              <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                {
                  categoryList[0] ? (categoryList.map((category)=>{
                    return <FilterProduct category={category} key={category} isActive={category.toLowerCase()===filterby.toLowerCase()} onClick={()=>handleFilterProduct(category)}/>
                  })):(loadingArrayFeature.map((el, index) => {
                    return (
                      <CardItems
                        loading="Loading..."
                        key={index + "cartloading"}
                      />
                    );
                  }) )
}

              </div>

          </div>
          <div className="flex flex-wrap justify-center gap-3 my-4">
            {
              filterdata[0] ? (filterdata.map((data)=>{
                return(
                  <CardItems
                  key={data._id}
                  id={data._id}
                  image={data.image}
                  name={data.name}
                  category={data.category}
                  price={data.price}
                  />
                )
              })) :(loadingArrayFeature.map((el, index) => {
                return (
                  <CardItems
                    loading="Loading..."
                    key={index + "cartloading"}
                  />
                );
              }))
            }
          </div>
  </>
}

export default AllProduct