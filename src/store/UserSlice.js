import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
  role:"",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      // console.log(action.payload.user);
      //   state.user = action.payload.data;
      state._id = action.payload.user._id;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.role = action.payload.user.role;

    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux ,logoutRedux} = userSlice.actions;

export default userSlice.reducer;