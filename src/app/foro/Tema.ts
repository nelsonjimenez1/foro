import { Comentario } from './Comentario';
export class Tema{

  public commentarios: Comentario[]=[];
  constructor(
    public titulo: string,
    public descripcion : string,
    public fecha : Date,
    public id: number ){
  }

}
