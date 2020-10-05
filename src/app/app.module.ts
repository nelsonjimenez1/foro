import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearForoComponent } from './foro/crear-foro/crear-foro.component';
import { ListForoComponent } from './foro/list-foro/list-foro.component';
import { ViewForoComponent } from './foro/view-foro/view-foro.component';
import { ViewTemaComponent } from './tema/view-tema/view-tema.component';
import { CrearTemaComponent } from './tema/crear-tema/crear-tema.component';
import { CrearComentarioComponent } from './comentario/crear-comentario/crear-comentario.component';
import { LoginComponent } from './login/login.component';
import { RestClientService } from './services/rest-client.service';
import { AprobarTemaComponent } from './tema/aprobar-tema/aprobar-tema.component';
import { AprobarComentarioComponent } from './comentario/aprobar-comentario/aprobar-comentario.component';
import { EditTemaComponent } from './tema/edit-tema/edit-tema.component';
import { EditComentarioComponent } from './comentario/edit-comentario/edit-comentario.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearForoComponent,
    ListForoComponent,
    ViewForoComponent,
    ViewTemaComponent,
    CrearTemaComponent,
    CrearComentarioComponent,
    LoginComponent,
    AprobarTemaComponent,
    AprobarComentarioComponent,
    EditTemaComponent,
    EditComentarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
