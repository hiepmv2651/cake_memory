import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/models/category';

export const getCategory = createAction('[Category] Get Category');

export const getCategorySuccess = createAction(
  '[Category] Get Category Success',
  props<{ payload: Category[] }>()
);

export const getCategoryFailure = createAction(
  '[Category] Get Category Failure',
  props<{ error: any }>()
);

export const addCategory = createAction(
  '[Category] Add Category',
  props<{ payload: any }>()
);

export const addCategorySuccess = createAction(
  '[Category] Add Category Success',
  props<{ payload: any }>()
);

export const addCategoryFailure = createAction(
  '[Category] Add Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ payload: any; id: number }>()
);

export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ payload: any }>()
);

export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[Category] Delete Category',
  props<{ id: number }>()
);

export const deleteCategorySuccess = createAction(
  '[Category] Delete Category Success',
  props<{ id: number }>()
);

export const deleteCategoryFailure = createAction(
  '[Category] Delete Category Failure',
  props<{ error: any }>()
);
