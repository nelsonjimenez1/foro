import {Tema} from './Tema';
export class Foro{
  public temas : Tema[]=[];
  public id: Number
  constructor(public nombre: string) {}
}
