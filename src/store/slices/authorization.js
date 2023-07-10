import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const authorization = createAsyncThunk("auth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const getAuthMe = createAsyncThunk("getAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  window.localStorage.setItem("auth", JSON.stringify(data._id));
  return data;
});

export const register = createAsyncThunk("register", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data;
});

export const updateUser = createAsyncThunk("updateUser", async (params) => {
  const { data } = axios.patch(`/auth/update/me/${params._id}`, {
    fullName: params.fullName,
    lastName: params.lastName,
    gender: params.gender,
    adress: params.adress,
    telephone: params.telephone,
  });

  return data;
});

const initialState = {
  auth: {
    data: null,
    status: "loading",
  },
  fullName: {
    text: "",
  },
  lastName: {
    text: "",
  },
  adress: {
    text: "",
  },
  telephone: {
    text: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginOut: (state) => {
      state.auth.data = null;
      window.localStorage.removeItem("token");
    },
    changeFullName: (state, action) => {
      state.fullName.text = action.payload;
    },
    changeLastName: (state, action) => {
      state.lastName.text = action.payload;
    },
    changeAdress: (state, action) => {
      state.adress.text = action.payload;
    },
    changeTelephone: (state, action) => {
      state.telephone.text = action.payload;
    },
  },
  extraReducers: {
    [authorization.pending]: (state) => {
      state.auth.data = null;
      state.auth.status = "loading";
    },
    [authorization.fulfilled]: (state, action) => {
      state.auth.data = action.payload;
      state.auth.status = "loaded";
    },
    [authorization.rejected]: (state) => {
      state.auth.data = null;
      state.auth.status = "error";
    },
    [getAuthMe.pending]: (state) => {
      state.auth.data = null;
      state.auth.status = "loading";
    },
    [getAuthMe.fulfilled]: (state, action) => {
      state.auth.data = action.payload;
      state.fullName.text = action.payload.fullName;
      state.lastName.text = action.payload.lastName;
      state.adress.text = action.payload.adress;
      state.telephone.text = action.payload.telephone;
      state.auth.status = "loaded";
    },
    [getAuthMe.rejected]: (state) => {
      state.auth.data = null;
      state.auth.status = "error";
    },
    [register.pending]: (state) => {
      state.auth.data = null;
      state.auth.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.auth.data = action.payload;
      state.auth.status = "loaded";
    },
    [register.rejected]: (state) => {
      state.auth.data = null;
      state.auth.status = "error";
    },
  },
});

export const {
  loginOut,
  changeFullName,
  changeLastName,
  changeAdress,
  changeTelephone,
} = authSlice.actions;

export const authReduced = authSlice.reducer;
