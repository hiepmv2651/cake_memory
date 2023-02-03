import { CartService } from './../../Services/cart.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  addCart,
  addCartFailure,
  addCartSuccess,
  deleteCart,
  deleteCartFailure,
  deleteCartSuccess,
  getCart,
  getCartFailure,
  getCartSuccess,
  updateCart,
  updateCartFailure,
  updateCartSuccess,
} from './cart.action';
import { mergeMap, map, catchError, of } from 'rxjs';

@Injectable()
export class CartEffect {
  constructor(private action$: Actions, private cartService: CartService) {}

  getCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCart),
      mergeMap(() =>
        this.cartService.getCarts().pipe(
          map((cart) => getCartSuccess({ payload: cart })),
          catchError((error) =>
            of(getCartFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  addCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(addCart),
      mergeMap((action) =>
        this.cartService.addCart(action.payload).pipe(
          map((cart) => addCartSuccess({ payload: cart })),
          catchError((error) =>
            of(addCartFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  updateCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateCart),
      mergeMap((action) =>
        this.cartService.editCart(action.payload, action.id).pipe(
          map((cart) => updateCartSuccess({ payload: cart })),
          catchError((error) =>
            of(updateCartFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  deleteCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteCart),
      mergeMap((action) =>
        this.cartService.deleteCart(action.id).pipe(
          map(() => deleteCartSuccess({ id: action.id })),
          catchError((error) =>
            of(deleteCartFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );
}
