import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CartState } from './cart.reducer';

export const selectCart = createFeatureSelector<CartState>('myCart');
export const isLoadingSelector = createSelector(
  selectCart,
  (state) => state.isLoading
);
export const cartSelector = createSelector(selectCart, (state) => state.cart);
export const errorMessageSelector = createSelector(
  selectCart,
  (state) => state.errorMessage
);
export const successMessageSelector = createSelector(
  selectCart,
  (state) => state.successMessage
);
