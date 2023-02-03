import { CategoryState } from './category.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCategory =
  createFeatureSelector<CategoryState>('myCategory');

export const isLoadingSelector = createSelector(
  selectCategory,
  (state) => state.isLoading
);

export const categorySelector = createSelector(
  selectCategory,
  (state) => state.category
);

export const errorMessageSelector = createSelector(
  selectCategory,
  (state) => state.errorMessage
);

export const successMessageSelector = createSelector(
  selectCategory,
  (state) => state.successMessage
);
