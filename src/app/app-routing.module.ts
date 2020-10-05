import { ListForoComponent } from './foro/list-foro/list-foro.component';
import { CrearForoComponent } from './foro/crear-foro/crear-foro.component';
import { ViewForoComponent } from './foro/view-foro/view-foro.component';
import { ViewTemaComponent } from './tema/view-tema/view-tema.component';
import { CrearTemaComponent } from './tema/crear-tema/crear-tema.component';
import { CrearComentarioComponent } from './comentario/crear-comentario/crear-comentario.component';
import { LoginComponent } from './login/login.component';
import { AprobarTemaComponent } from './tema/aprobar-tema/aprobar-tema.component';
import { AprobarComentarioComponent } from './comentario/aprobar-comentario/aprobar-comentario.component';
import { EditTemaComponent } from './tema/edit-tema/edit-tema.component';
import { EditComentarioComponent } from './comentario/edit-comentario/edit-comentario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'foro/list', component: ListForoComponent},
  {path: 'foro/crear', component: CrearForoComponent},
  {path: 'foro/view/:id', component: ViewForoComponent},
  {path: 'tema/view/:id/:moderado', component: ViewTemaComponent},
  {path: 'tema/crear/:id', component: CrearTemaComponent},
  {path: 'comentario/crear/:id/:idR', component: CrearComentarioComponent},
  {path: 'tema/aprobar/:id', component: AprobarTemaComponent},
  {path: 'comentario/aprobar/:id', component: AprobarComentarioComponent},
  {path: 'tema/edit/:id/:idT', component: EditTemaComponent},
  {path: 'comentario/edit/:id/:idC', component: EditComentarioComponent},
  {path: '', pathMatch: 'full', redirectTo: 'login'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
