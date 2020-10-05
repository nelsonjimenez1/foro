import {Tema} from './../tema/Tema';

export class Comentario {
  public id: number;
  public tema: Tema = null;
  public idRespuestas: Comentario[] = [];
  public idRespuesta: Comentario = null;
  public aprobado: boolean;
  public ranking = 0;

  constructor(public mensaje:string, public fecha: Date) {}
}
