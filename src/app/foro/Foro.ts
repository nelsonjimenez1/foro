import {Tema} from './../tema/Tema';

export class Foro{
  public temas : Tema[]=[];
  public id: number

  constructor(public nombre: string, public moderado: boolean) {}
}
