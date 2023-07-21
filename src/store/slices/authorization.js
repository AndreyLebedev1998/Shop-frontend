import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const authorization = createAsyncThunk("auth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  if (data) {
    window.localStorage.setItem("auth", JSON.stringify(data._id));
  }
  if (data.admin) {
    window.localStorage.setItem("admin", data.admin);
  }
  return data;
});

export const getAuthMe = createAsyncThunk("getAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  window.localStorage.setItem("auth", JSON.stringify(data._id));
  if (data.admin) {
    window.localStorage.setItem("admin", data.admin);
  }
  return data;
});

export const register = createAsyncThunk("register", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  if (data) {
    window.localStorage.setItem("auth", JSON.stringify(data._id));
  }

  return data;
});

export const updateUser = createAsyncThunk("updateUser", async (params) => {
  const { data } = await axios.patch(`/auth/update/me/${params._id}`, {
    fullName: params.fullName,
    lastName: params.lastName,
    gender: params.gender,
    telephone: params.telephone,
  });

  return data;
});

export const deleteAccount = createAsyncThunk("deleteAccount", async (id) => {
  const { data } = await axios.delete(`/auth/delete/${id}`);

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
  telephone: {
    text: "",
  },
  updateUser: {
    data: null,
    status: "loading",
  },
  deleteUser: {
    data: null,
    status: "loading",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginOut: (state) => {
      state.auth.data = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("admin");
    },
    changeFullName: (state, action) => {
      state.fullName.text = action.payload;
    },
    changeLastName: (state, action) => {
      state.lastName.text = action.payload;
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
    [updateUser.pending]: (state) => {
      state.updateUser.data = null;
      state.updateUser.status = "loading";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.updateUser.data = action.payload;
      state.updateUser.status = "loaded";
    },
    [updateUser.rejected]: (state) => {
      state.updateUser.data = null;
      state.updateUser.status = "error";
    },
    [deleteAccount.pending]: (state) => {
      state.deleteUser.data = null;
      state.deleteUser.status = "loading";
    },
    [deleteAccount.fulfilled]: (state, action) => {
      state.deleteUser.data = action.payload;
      state.deleteUser.status = "loaded";
    },
    [deleteAccount.rejected]: (state) => {
      state.deleteUser.data = null;
      state.deleteUser.status = "error";
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
