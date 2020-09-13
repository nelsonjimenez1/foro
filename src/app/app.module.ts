import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearForoComponent } from './foro/crear-foro/crear-foro.component';
import { ListForoComponent } from './foro/list-foro/list-foro.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearForoComponent,
    ListForoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
