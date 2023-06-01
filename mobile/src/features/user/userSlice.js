import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    infoUser: null,
    tokenUser: null,  
    exp: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.infoUser = action.payload.user;
      state.tokenUser = action.payload.token;
      state.exp = action.payload.exp;
    },
    setOnlyUserInfo:(state,action)=>{
      state.infoUser = action.payload.user;

    },
    refreshUserToken:(state, action)=>{
      state.exp = action.payload.exp;
      state.tokenUser = action.payload.refreshedToken;
    },

   
    clearUser: (state) => {
      state.infoUser = null;
      state.tokenUser = null;
      state.exp = null;
    },
  },
});

export const {
  setUser,
  setOnlyUserInfo,
  clearUser,
  refreshUserToken
  
} = userSlice.actions;
export default userSlice.reducer;
