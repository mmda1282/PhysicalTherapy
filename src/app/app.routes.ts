import { Routes } from '@angular/router';
import { ExercisesComponent } from './components/exercises/exercises.component';
import { CategoryComponent } from './components/category/category.component';
import { ExerciesesPageComponent } from './pages/exercieses-page/exercieses-page.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "categories" },
    { path: "categories", component: CategoryComponent },
    { path: "exercises/:id", component: ExercisesComponent},
    { path: "login", component: LoginComponent },
    { path: "resetPassword", component: ResetPasswordComponent },
];
