import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import {
  addCake,
  addCakeFailure,
  addCakeSuccess,
  deleteCake,
  deleteCakeFailure,
  deleteCakeSuccess,
  getCakes,
  getCakesFailure,
  getCakesSuccess,
  updateCake,
  updateCakeFailure,
  updateCakeSuccess,
} from './cakes.action';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export const initialState: ProductState = {
  products: [],
  isLoading: false,
  errorMessage: undefined,
  successMessage: undefined,
};

export const cakeReducer = createReducer(
  initialState,
  // on(getCakesSuccess, (state, { payload }) => payload),

  // on(addCakeSuccess, (state, { payload }) => [...state, payload]),

  // on(updateCakeSuccess, (state, { payload }) =>
  //   state.map((cake) => {
  //     if (cake.id === payload.id) {
  //       return { ...cake, ...payload };
  //     }
  //     return cake;
  //   })
  // ),

  // on(deleteCakeSuccess, (state, { id }) =>
  //   state.filter((cake) => cake.id !== id)
  // )
  on(getCakes, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(getCakesSuccess, (state, { payload }) => ({
    ...state,
    isLoading: false,
    products: payload,
  })),

  on(getCakesFailure, (state, action) => ({ ...state, error: action.error })),

  on(addCake, (state, { payload }) => ({
    ...state,
  })),

  on(addCakeSuccess, (state, { payload }) => ({
    ...state,
    errorMessage: undefined,
    successMessage: 'Thêm Thành Công',
    products: [...state.products, payload],
  })),

  on(addCakeFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: undefined,
  })),

  on(updateCake, (state, { payload }) => ({
    ...state,
  })),

  on(updateCakeSuccess, (state, { payload }) => ({
    ...state,
    errorMessage: undefined,
    successMessage: 'Sửa Thành Công',
    products: state.products.map((product) => {
      if (product.id === payload.id) {
        return { ...product, ...payload };
      }
      return product;
    }),
  })),

  on(updateCakeFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: undefined,
  })),

  on(deleteCake, (state, { id }) => ({
    ...state,
  })),
  on(deleteCakeSuccess, (state, { id }) => ({
    ...state,
    errorMessage: undefined,
    successMessage: 'Xóa Thành Công',
    products: state.products.filter((product) => product.id !== id),
  })),
  on(deleteCakeFailure, (state, action) => ({
    ...state,
    errorMessage: action.error,
    successMessage: undefined,
  }))
);
