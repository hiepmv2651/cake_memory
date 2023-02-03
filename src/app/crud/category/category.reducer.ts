import { updateCakeFailure } from './../cakes/cakes.action';
import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/models/category';
import {
  getCategorySuccess,
  addCategorySuccess,
  deleteCategory,
  deleteCategorySuccess,
  updateCategorySuccess,
  getCategoryFailure,
  getCategory,
  addCategory,
  addCategoryFailure,
  updateCategory,
  deleteCategoryFailure,
} from './category.action';

export interface CategoryState {
  category: Category[];
  isLoading: boolean;
  errorMessage?: string;
  successMessage?: string;
}

// export const initialState: Category[] = [];
export const initialState: CategoryState = {
  category: [],
  isLoading: false,
  errorMessage: undefined,
  successMessage: undefined,
};

export const categoryReducer = createReducer(
  initialState,
  // on(getCategorySuccess, (state, { payload }) => payload),
  // on(getCategoryFailure, (state, { error }) => error),

  // on(addCategorySuccess, (state, { payload }) => [...state, payload]),
  // on(updateCategorySuccess, (state, { payload }) =>
  //   state.map((category) => {
  //     if (category.id === payload.id) {
  //       return { ...category, ...payload };
  //     }
  //     return category;
  //   })
  // ),
  // on(deleteCategorySuccess, (state, { id }) =>
  //   state.filter((category) => category.id !== id)
  // )
  on(getCategory, (state) => {
    return { ...state, isLoading: true };
  }),

  on(getCategorySuccess, (state, { payload }) => {
    return { ...state, isLoading: false, category: payload };
  }),

  on(getCategoryFailure, (state, { error }) => {
    return { ...state, isLoading: false, errorMessage: error };
  }),

  on(addCategory, (state, { payload }) => ({
    ...state,
  })),

  on(addCategorySuccess, (state, { payload }) => ({
    ...state,
    category: [...state.category, payload],
    errorMessage: undefined,
    successMessage: 'Category added successfully',
  })),

  on(addCategoryFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: undefined,
  })),

  on(updateCategory, (state, { payload }) => ({
    ...state,
  })),

  on(updateCategorySuccess, (state, { payload }) => ({
    ...state,
    category: state.category.map((category) => {
      if (category.id === payload.id) {
        return { ...category, ...payload };
      }
      return category;
    }),
    errorMessage: undefined,
    successMessage: 'Category updated successfully',
  })),

  on(updateCakeFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: undefined,
  })),

  on(deleteCategory, (state, { id }) => ({
    ...state,
  })),
  on(deleteCategorySuccess, (state, { id }) => ({
    ...state,
    category: state.category.filter((category) => category.id !== id),
    errorMessage: undefined,
    successMessage: 'Category deleted successfully',
  })),
  on(deleteCategoryFailure, (state, { error }) => ({
    ...state,
    errorMessage: error,
    successMessage: undefined,
  }))
);
