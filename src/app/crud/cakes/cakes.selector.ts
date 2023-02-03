import { ProductState } from './cakes.reducer';
import { Product } from 'src/app/models/product';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCakes = createFeatureSelector<ProductState>('myCakes');

export const cakeSelect = createSelector(
  selectCakes,
  (state: ProductState) => state.products
);

export const isLoadingSelect = createSelector(
  selectCakes,
  (state: ProductState) => state.isLoading
);

export const errorMessageSelect = createSelector(
  selectCakes,
  (state: ProductState) => state.errorMessage
);

export const successMessageSelect = createSelector(
  selectCakes,
  (state: ProductState) => state.successMessage
);
