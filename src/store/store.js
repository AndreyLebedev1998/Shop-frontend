import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/product";
import { authReduced } from "./slices/authorization";
import { basketReducer } from "./slices/basket";

const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReduced,
    basket: basketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 300 },
      serializableCheck: { warnAfter: 300 },
    }),
});

export default store;
