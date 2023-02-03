import { MycartComponent } from './pages/mycart/mycart.component';
import { Auth2Guard } from './auth/auth2.guard';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './crud/user/user.component';
import { CartComponent } from './crud/cart/cart.component';
import { CategoryComponent } from './crud/category/category.component';
import { CakesComponent } from './crud/cakes/cakes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cake',
    component: CakesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'my-cart', component: MycartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [Auth2Guard] },
  { path: 'register', component: RegisterComponent, canActivate: [Auth2Guard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
