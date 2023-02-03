import { createReducer, on } from '@ngrx/store';
import { Cart } from 'src/app/models/cart';
import {
  getCartSuccess,
  addCartSuccess,
  updateCartSuccess,
  deleteCartSuccess,
  updateCartFailure,
  getCart,
  getCartFailure,
  addCart,
  addCartFailure,
  updateCart,
  deleteCart,
  deleteCartFailure,
} from './cart.action';

export interface CartState {
  cart: Cart[];
  isLoading: boolean;
  errorMessage?: string;
  successMessage?: string;
}

// export const initialState: Cart[] = [];
export const initialState: CartState = {
  cart: [],
  isLoading: false,
  errorMessage: undefined,
  successMessage: undefined,
};

export const cartReducer = createReducer(
  initialState,
  // on(getCartSuccess, (state, { payload }) => payload),
  // on(addCartSuccess, (state, { payload }) => [...state, payload]),

  // on(updateCartSuccess, (state, { payload }) =>
  //   state.map((cart) => {
  //     if (cart.id === payload.id) {
  //       return { ...cart, ...payload };
  //     }
  //     return cart;
  //   })
  // ),
  // on(deleteCartSuccess, (state, { id }) =>
  //   state.filter((cart) => cart.id !== id)
  // )
  on(getCart, (state) => ({ ...state, isLoading: true })),
  on(getCartSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    cart: payload,
  })),
  on(getCartFailure, (state, action) => ({ ...state, error: action.error })),
  on(addCart, (state, { payload }) => ({
    ...state,
  })),
  on(addCartSuccess, (state, { payload }) => ({
    ...state,
    errorMessage: undefined,
    successMessage: 'Thêm Thành Công',

    cart: [...state.cart, payload],
  })),
  on(addCartFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: 'Thêm Thất Bại',
  })),

  on(updateCart, (state, { payload }) => ({
    ...state,
  })),

  on(updateCartSuccess, (state, { payload }) => ({
    ...state,
    errorMessage: undefined,
    successMessage: 'Sửa Thành Công',
    cart: state.cart.map((cart) => {
      if (cart.id === payload.id) {
        return { ...cart, ...payload };
      }
      return cart;
    }),
  })),

  on(updateCartFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: 'Sửa Thất Bại',
  })),

  on(deleteCart, (state, { id }) => ({
    ...state,
  })),
  on(deleteCartSuccess, (state, { id }) => ({
    ...state,
    errorMessage: undefined,
    successMessage: 'Xóa Thành Công',
    cart: state.cart.filter((cart) => cart.id !== id),
  })),
  on(deleteCartFailure, (state, action) => ({
    ...state,
    errorMessage: action.error,
    successMessage: undefined,
  }))
);
