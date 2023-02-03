import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { CategoryService } from 'src/app/Services/category.service';
import {
  getCategory,
  getCategorySuccess,
  getCategoryFailure,
  addCategory,
  addCategorySuccess,
  deleteCategory,
  deleteCategorySuccess,
  updateCategory,
  updateCategorySuccess,
  addCategoryFailure,
  updateCategoryFailure,
  deleteCategoryFailure,
} from './category.action';

@Injectable()
export class CategoryEffect {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategory),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((category) => getCategorySuccess({ payload: category })),
          catchError((error) =>
            of(getCategoryFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCategory),
      mergeMap((action) =>
        this.categoryService.addCategory(action.payload).pipe(
          map((category) => addCategorySuccess({ payload: category })),
          catchError((error) =>
            of(addCategoryFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      mergeMap((action) =>
        this.categoryService.editCategory(action.payload, action.id).pipe(
          map((category) => updateCategorySuccess({ payload: category })),
          catchError((error) =>
            of(updateCategoryFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCategory),
      mergeMap((action) =>
        this.categoryService.deleteCategory(action.id).pipe(
          map(() => deleteCategorySuccess({ id: action.id })),
          catchError((error) =>
            of(deleteCategoryFailure({ error: error.error.errors }))
          )
        )
      )
    )
  );
}
