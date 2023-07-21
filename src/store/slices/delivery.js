import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

/* export const createDelivery = createAsyncThunk(
  "createDelivery",
  async (params) => {
    const { data } = await axios.post("/delivery", params);

    return data;
  }
);

export const getAllDelivery = createAsyncThunk("getAllDelivery", async () => {
  const { data } = await axios.get("/delivery");

  return data;
}); */

export const getOneDelivery = createAsyncThunk(
  "getOneDelivery",
  async (params) => {
    const { data } = await axios.patch(`/deliveryOne`, {
      authId: params.authId,
      id: params.id,
    });

    return data;
  }
);

export const framedDelivery = createAsyncThunk(
  "framedDelivery",
  async (params) => {
    const { data } = await axios.patch(`/delivery/framed`, {
      authId: params.authId,
      id: params.id,
    });

    return data;
  }
);

export const completedDelivery = createAsyncThunk(
  "completedDelivery",
  async (params) => {
    const { data } = await axios.patch(`/delivery/completed`, {
      authId: params.authId,
      id: params.id,
    });

    return data;
  }
);

export const deleteOneDelivery = createAsyncThunk(
  "deleteOneDelivery",
  async (params) => {
    const { data } = await axios.patch(`/delivery/delete`, {
      id: params.id,
      authId: params.authId,
    });

    return data;
  }
);

export const deleteGoodsInBasket = createAsyncThunk(
  "deleteGoodsInBasket",
  async (id) => {
    const { data } = await axios.patch(`/auth/basket/deleteAll/${id}`, id);

    return data;
  }
);

export const addDeliveryInUser = createAsyncThunk(
  "addDeliveryInUser",
  async (params) => {
    const { data } = axios.patch(`/delivery/addDelivery/${params._id}`, params);
    return data;
  }
);

export const getAllDeliveryUsers = createAsyncThunk(
  "getAllDeliveryUsers",
  async () => {
    const { data } = await axios.get("/allUsersDelivery");

    return data;
  }
);

export const getDeliveryUser = createAsyncThunk(
  "getDeliveryUser",
  async (id) => {
    const { data } = await axios.get(`/deliveryUser/${id}`);

    return data;
  }
);

const initialState = {
  oneDelivery: {
    data: null,
    status: "loading",
  },
  emptyBasket: {
    data: null,
    status: "loading",
  },
  deliveryUser: {
    data: null,
    status: "loading",
  },
  allDeliveryUsers: {
    data: null,
    status: "loading",
  },
  deliveryUserId: {
    data: null,
    status: "loading",
  },
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: {
    [getOneDelivery.pending]: (state) => {
      state.oneDelivery.data = null;
      state.oneDelivery.status = "loading";
    },
    [getOneDelivery.fulfilled]: (state, action) => {
      state.oneDelivery.data = action.payload;
      state.oneDelivery.status = "loaded";
    },
    [getOneDelivery.rejected]: (state) => {
      state.oneDelivery.data = null;
      state.oneDelivery.status = "error";
    },
    [deleteGoodsInBasket.pending]: (state) => {
      state.emptyBasket.data = null;
      state.emptyBasket.status = "loading";
    },
    [deleteGoodsInBasket.fulfilled]: (state, action) => {
      state.emptyBasket.data = action.payload;
      state.emptyBasket.status = "loaded";
    },
    [deleteGoodsInBasket.rejected]: (state) => {
      state.emptyBasket.data = null;
      state.emptyBasket.status = "error";
    },
    [addDeliveryInUser.pending]: (state) => {
      state.deliveryUser.data = null;
      state.deliveryUser.status = "loading";
    },
    [addDeliveryInUser.fulfilled]: (state, action) => {
      state.deliveryUser.data = action.payload;
      state.deliveryUser.status = "loaded";
    },
    [addDeliveryInUser.rejected]: (state) => {
      state.deliveryUser.data = null;
      state.deliveryUser.status = "error";
    },
    [getAllDeliveryUsers.pending]: (state) => {
      state.allDeliveryUsers.data = null;
      state.allDeliveryUsers.status = "loading";
    },
    [getAllDeliveryUsers.fulfilled]: (state, action) => {
      state.allDeliveryUsers.data = action.payload;
      state.allDeliveryUsers.status = "loaded";
    },
    [getAllDeliveryUsers.rejected]: (state) => {
      state.allDeliveryUsers.data = null;
      state.allDeliveryUsers.status = "error";
    },
    [getDeliveryUser.pending]: (state) => {
      state.deliveryUserId.data = null;
      state.deliveryUserId.status = "loading";
    },
    [getDeliveryUser.fulfilled]: (state, action) => {
      state.deliveryUserId.data = action.payload;
      state.deliveryUserId.status = "loaded";
    },
    [getDeliveryUser.rejected]: (state) => {
      state.deliveryUserId.data = null;
      state.deliveryUserId.status = "error";
    },
  },
});

export const deliveryReducer = deliverySlice.reducer;
