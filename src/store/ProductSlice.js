import { toast } from "react-toastify";
import { url } from "../App";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    cartItem: [],
    status: STATUSES.IDLE,
  },
  reducers: {
    setProducts(state, action) {
      // console.log(action.payload)
      state.product = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    addCartItem(state, action) {
      // console.log(action)
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast.error("Already Item is in the Cart");
      } else {
        toast.success("Item Added successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    removeCartItem(state, action) {
      console.log(action);
      alert("Item Removed ");
      let index = state.cartItem.findIndex(
        (product) => product._id === action.payload
      );
      console.log(index);
      state.cartItem.splice(index, 1);
    },
    increaseQty(state, action) {
      let index = state.cartItem.findIndex(
        (product) => product._id === action.payload
      );
      let qty = state.cartItem[index].qty;
      let qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      let price = state.cartItem[index].price;
      let total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty(state, action) {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      console.log(index);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        let qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        let price = state.cartItem[index].price;
        let total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setProducts,
  setStatus,
  addCartItem,
  removeCartItem,
  decreaseQty,
  increaseQty,
} = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await fetch( `${url}/getproducts`);
      const product = await res.json();
    //   console.log(product);
      dispatch(setProducts(product));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
