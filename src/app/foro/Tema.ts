import { Comentario } from './Comentario';
export class Tema{

  public commentArray: Comentario[]=[];
  constructor(
    public titulo: string,
    public descripcion : string,
    public fecha : Date,
    public idTema:number ){

  }

}
