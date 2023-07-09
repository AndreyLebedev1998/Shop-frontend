import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getBasketUser = createAsyncThunk("basketUser", async (id) => {
  const { data } = await axios.get(`/auth/basket/${id}`);
  return data;
});

export const buyOneGood = createAsyncThunk("buyOneGood", async (params) => {
  const { data } = await axios.post(`/auth/basket/${params._id}`, {
    id: params.id,
    name: params.name,
    imageUrl: params.imageUrl,
    price: params.price,
    categoryId: params.categoryId,
    qtyInBasket: params.qtyInBasket + 1,
  });
  return data;
});

export const plusQtyBasket = createAsyncThunk(
  "plusQtyBasket",
  async (params) => {
    const { data } = await axios.patch(`/auth/basket/plus/${params._id}`, {
      id: params.id,
      qtyInBasket: params.qtyInBasket++,
    });
    return data;
  }
);

export const minusQtyBasket = createAsyncThunk(
  "minusQtyBasket",
  async (params) => {
    const { data } = await axios.patch(`/auth/basket/minus/${params._id}`, {
      id: params.id,
      qtyInBasket: params.qtyInBasket--,
    });
    return data;
  }
);

export const deleteOneGood = createAsyncThunk(
  "deleteOneGood",
  async (params) => {
    const { data } = await axios.patch(`/auth/basket/delete/${params._id}`, {
      id: params.id,
    });
    return data;
  }
);

const initialState = {
  basket: {
    data: null,
    status: "loading",
    count: 2,
  },
  basketPlus: {
    data: null,
    status: "loading",
  },
  buyGood: {
    data: null,
    status: "loading",
  },
  basketMinus: {
    data: null,
    status: "loading",
  },
  deleteGood: {
    data: null,
    status: "loading",
  },
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    countPlus: (state, action) => {
      state.basket.data.find((el) => {
        if (el.id == action.payload.id) {
          return (state.basket.count = el.qtyInBasket++);
        }
      });
    },
    countMinus: (state, action) => {
      state.basket.data.find((el) => {
        if (el.id == action.payload.id) {
          return (state.basket.count = el.qtyInBasket--);
        }
      });
    },
    deleteGood: (state, action) => {
      state.basket.data = state.basket.data.filter((el) => {
        return el.id !== action.payload.id;
      });
    },
  },
  extraReducers: {
    [getBasketUser.pending]: (state) => {
      state.basket.data = null;
      state.basket.status = "loading";
    },
    [getBasketUser.fulfilled]: (state, action) => {
      state.basket.data = action.payload;
      state.basket.status = "loaded";
    },
    [getBasketUser.rejected]: (state) => {
      state.basket.data = null;
      state.basket.status = "error";
    },
    [buyOneGood.pending]: (state) => {
      state.buyGood.data = null;
      state.buyGood.status = "loading";
    },
    [buyOneGood.fulfilled]: (state, action) => {
      state.buyGood.data = action.payload;
      state.buyGood.status = "loaded";
    },
    [buyOneGood.rejected]: (state) => {
      state.buyGood.data = null;
      state.buyGood.status = "error";
    },
    [plusQtyBasket.pending]: (state) => {
      state.basketPlus.data = null;
      state.basketPlus.status = "loading";
    },
    [plusQtyBasket.fulfilled]: (state, action) => {
      state.basketPlus.data = action.payload;
      state.basketPlus.status = "loaded";
    },
    [plusQtyBasket.rejected]: (state) => {
      state.basketPlus.data = null;
      state.basketPlus.status = "error";
    },
    [minusQtyBasket.pending]: (state) => {
      state.basketMinus.data = null;
      state.basketMinus.status = "loading";
    },
    [minusQtyBasket.fulfilled]: (state, action) => {
      state.basketMinus.data = action.payload;
      state.basketMinus.status = "loaded";
    },
    [minusQtyBasket.rejected]: (state) => {
      state.basketMinus.data = null;
      state.basketMinus.status = "error";
    },
    [deleteOneGood.pending]: (state) => {
      state.deleteGood.data = null;
      state.deleteGood.status = "loading";
    },
    [deleteOneGood.fulfilled]: (state, action) => {
      state.deleteGood.data = action.payload;
      state.deleteGood.status = "loaded";
    },
    [deleteOneGood.rejected]: (state) => {
      state.deleteGood.data = null;
      state.deleteGood.status = "error";
    },
  },
});

export const basketReducer = basketSlice.reducer;

export const { countPlus, countMinus, deleteGood } = basketSlice.actions;
