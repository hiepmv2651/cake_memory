import { Product } from 'src/app/models/product';
import { createAction, props } from '@ngrx/store';

export const getCakes = createAction('[Cakes] Get Cakes');

export const getCakesSuccess = createAction(
  '[Cakes] Get Cakes Success',
  props<{ payload: any }>()
);

export const getCakesFailure = createAction(
  '[Cakes] Get Cakes Failure',
  props<{ error: any }>()
);

export const addCake = createAction(
  '[Cakes] Add Cake',
  props<{ payload: any }>()
);

export const addCakeSuccess = createAction(
  '[Cakes] Add Cake Success',
  props<{ payload: any }>()
);

export const addCakeFailure = createAction(
  '[Cakes] Add Cake Failure',
  props<{ error: any }>()
);

export const updateCake = createAction(
  '[Cakes] Update Cake',
  props<{ payload: any; id: number }>()
);

export const updateCakeSuccess = createAction(
  '[Cakes] Update Cake Success',
  props<{ payload: Product }>()
);

export const updateCakeFailure = createAction(
  '[Cakes] Update Cake Failure',
  props<{ error: any }>()
);

export const deleteCake = createAction(
  '[Cakes] Delete Cake',
  props<{ id: number }>()
);

export const deleteCakeSuccess = createAction(
  '[Cakes] Delete Cake Success',
  props<{ id: number }>()
);

export const deleteCakeFailure = createAction(
  '[Cakes] Delete Cake Failure',
  props<{ error: any }>()
);
