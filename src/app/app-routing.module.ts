import { CrearForoComponent } from './foro/crear-foro/crear-foro.component';
import { ListForoComponent } from './foro/list-foro/list-foro.component';
import { ViewForoComponent } from './foro/view-foro/view-foro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'foro/list', component: ListForoComponent},
  {path: 'foro/crear', component: CrearForoComponent},
  {path: 'foro/view/:id', component: ViewForoComponent},
  {path: '', pathMatch: 'full', redirectTo: 'foro/list'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
