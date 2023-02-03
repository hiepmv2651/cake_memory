import { cartReducer } from './crud/cart/cart.reducer';
import { CategoryEffect } from './crud/category/category.effect';
import { categoryReducer } from './crud/category/category.reducer';
import { CakesEffect } from './crud/cakes/cakes.effect';
import { cakeReducer } from './crud/cakes/cakes.reducer';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { ProductsComponent } from './pages/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { GMapModule } from 'primeng/gmap';
import { ImageModule } from 'primeng/image';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CakesComponent } from './crud/cakes/cakes.component';
import { CrudCakeComponent } from './crud/cakes/crud-cake/crud-cake.component';
import { CategoryComponent } from './crud/category/category.component';
import { CrudCategoryComponent } from './crud/category/crud-category/crud-category.component';
import { CartComponent } from './crud/cart/cart.component';
import { CrudCartComponent } from './crud/cart/crud-cart/crud-cart.component';
import { UserComponent } from './crud/user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { MycartComponent } from './pages/mycart/mycart.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CartEffect } from './crud/cart/cart.effect';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductsComponent,
    SidebarComponent,
    DashboardComponent,
    CakesComponent,
    CrudCakeComponent,
    CategoryComponent,
    CrudCategoryComponent,
    CartComponent,
    CrudCartComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    MycartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataViewModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    BrowserAnimationsModule,
    SidebarModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    ToolbarModule,
    CardModule,
    PasswordModule,
    GMapModule,
    ImageModule,
    StoreModule.forFeature('myCart', cartReducer),
    EffectsModule.forFeature([CartEffect]),
    StoreModule.forFeature('myCategory', categoryReducer),
    EffectsModule.forFeature([CategoryEffect]),
    StoreModule.forFeature('myCakes', cakeReducer),
    EffectsModule.forFeature([CakesEffect]),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
