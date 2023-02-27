import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat',
    loadComponent: () => import('./picture/picture.component').then(m => m.PictureComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
