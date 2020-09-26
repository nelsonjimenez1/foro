import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-comentario',
  templateUrl: './answer-comentario.component.html',
  styleUrls: ['./answer-comentario.component.css']
})
export class AnswerComentarioComponent implements OnInit {

  mensaje = '';
  tema: Tema = new Tema('prueba', 'prueba', new Date());

  constructor(
    private comentarioRepo: ServiceComentarioService,
    private temaRepo: ServiceTemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  agregarAnswerComentario(): void {
    let nComentario =  new Comentario(this.mensaje, new Date());
    nComentario.tema = this.tema;
    this.comentarioRepo.createComentario(nComentario).subscribe(
      results => {
        console.log(results);
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.tema.id = -6;
    this.route.paramMap
    .pipe(
      switchMap(params => this.temaRepo.findById(+params.get('id')))
    )
    .subscribe(result => {
      console.log(result);
      this.tema = result;
    });
  }
}
