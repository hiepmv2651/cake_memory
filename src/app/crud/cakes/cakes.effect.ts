import { ProductService } from 'src/app/Services/product.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, of } from 'rxjs';
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
  updateCakeSuccess,
} from './cakes.action';

@Injectable()
export class CakesEffect {
  constructor(private actions$: Actions, private cakeService: ProductService) {}

  getCakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCakes),
      mergeMap(() =>
        this.cakeService.getProducts().pipe(
          map((data) => getCakesSuccess({ payload: data })),
          catchError((error) =>
            of(getCakesFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  addCake$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCake),
      mergeMap((action) =>
        this.cakeService.addProduct(action.payload).pipe(
          map((data) => {
            console.log(data);
            return addCakeSuccess({ payload: data });
          }),
          catchError((error) =>
            of(addCakeFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  updateCake$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCake),
      mergeMap((action) =>
        this.cakeService.editProduct(action.payload, action.id).pipe(
          map((data) => updateCakeSuccess({ payload: data })),
          catchError((error) =>
            of(addCakeFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  deleteCake$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCake),
      mergeMap((action) =>
        this.cakeService.deleteProduct(action.id).pipe(
          map(() => deleteCakeSuccess({ id: action.id })),
          catchError((error) =>
            of(deleteCakeFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );
}
