import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
 
const appRoutes: Routes = [
  { path: '', component: LayoutComponent ,data: { title: 'Home' }},
  { path: 'login',component: LoginComponent ,data: { title: 'Login' }},
  { path: 'about',component: RegisterComponent ,data: { title: 'About' }},
  { path: 'register',component: RegisterComponent ,data: { title: 'Register' }}

];
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(appRoutes);
