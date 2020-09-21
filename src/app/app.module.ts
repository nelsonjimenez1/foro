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

@NgModule({
  declarations: [
    AppComponent,
    CrearForoComponent,
    ListForoComponent,
    ViewForoComponent,
    ViewTemaComponent,
    CrearTemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
