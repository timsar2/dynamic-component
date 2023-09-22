import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentComponent } from '../components/parent/parent.component';

const routes: Routes = [
  {
    path: 'parent',
    pathMatch: 'full',
    loadComponent: () => import('../components/parent/parent.component').then(m => m.ParentComponent),
    title: 'Parent'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ParentComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
