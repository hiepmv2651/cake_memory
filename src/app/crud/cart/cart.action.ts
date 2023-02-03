import { createAction, props } from '@ngrx/store';

export const getCart = createAction('[Cart] Get Cart');

export const getCartSuccess = createAction(
  '[Cart] Get Cart Success',
  props<{ payload: any }>()
);

export const getCartFailure = createAction(
  '[Cart] Get Cart Failure',
  props<{ error: any }>()
);

export const addCart = createAction(
  '[Cart] Add Cart',
  props<{ payload: any }>()
);

export const addCartSuccess = createAction(
  '[Cart] Add Cart Success',
  props<{ payload: any }>()
);

export const addCartFailure = createAction(
  '[Cart] Add Cart Failure',
  props<{ error: any }>()
);

export const updateCart = createAction(
  '[Cart] Update Cart',
  props<{ payload: any; id: number }>()
);

export const updateCartSuccess = createAction(
  '[Cart] Update Cart Success',
  props<{ payload: any }>()
);

export const updateCartFailure = createAction(
  '[Cart] Update Cart Failure',
  props<{ error: any }>()
);

export const deleteCart = createAction(
  '[Cart] Delete Cart',
  props<{ id: number }>()
);

export const deleteCartSuccess = createAction(
  '[Cart] Delete Cart Success',
  props<{ id: number }>()
);

export const deleteCartFailure = createAction(
  '[Cart] Delete Cart Failure',
  props<{ error: any }>()
);
