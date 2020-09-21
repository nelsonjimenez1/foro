import {Tema} from './../tema/Tema';

export class Comentario {
  public id: number;
  public idRespuesta: number;
  public tema: Tema = null;

  constructor(public mensaje:string, public fecha: Date) {}
}
