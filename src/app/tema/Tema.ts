import { Foro } from './../foro/Foro';
import { Comentario } from './../comentario/Comentario';

export class Tema{
  public commentarios: Comentario[]=[];
  public id: number;
  public foro: Foro = null;
  public aprobado: boolean;
  public ranking = 0;

  constructor(
    public titulo: string,
    public descripcion: string,
    public fecha: string
  ) {}
}
