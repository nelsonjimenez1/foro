import { Injectable } from '@angular/core';
import { Foro } from './Foro';
import { Comentario } from './Comentario';
import { Tema } from './Tema';
@Injectable({
  providedIn: 'root'
})
export class ServiceForoService {

  private foroArray: Foro[] = [];

  constructor() {
    this.incializar();
  }
  getForoArray(): Foro[]{
    return this.foroArray;
  }

  private incializar() :void{
    let comentario1 = new Comentario("mensaje1", -1 ,new Date(), 1);
    let comentario2 = new Comentario("mensaje2", -1 ,new Date(), 2);
    let comentario3 = new Comentario("mensaje3", -1 ,new Date(), 1);
    let comentario4 = new Comentario("mensaje4", 1,new Date(), 2);
    let comentario5 = new Comentario("mensaje5", 1 ,new Date(), 3);
    let comentario6 = new Comentario("mensaje6", -1 ,new Date(), 6);
    let comentario7 = new Comentario("mensaje7", -1 ,new Date(), 7);

    let tema1 = new Tema("tema1", "descripcion1", new Date(), 1);
    let tema2 = new Tema("tema2", "descripcion2", new Date(), 2);
    tema1.commentArray = [comentario1,comentario2];
    tema2.commentArray = [comentario3,comentario4,comentario5];
    let foro1 = new Foro("foro1");
    foro1.temasArray = [tema1, tema2];
    this.foroArray.push(foro1);

  }

}
