import { ServiceComentarioService } from './../service-comentario.service';
import { ServiceTemaService } from './../../tema/service-tema.service';
import { Comentario } from './../Comentario';
import { Tema } from './../../tema/Tema';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {
  mensaje = '';
  fecha: Date =  new Date();
  tema: Tema = new Tema('prueba', 'prueba', this.fecha.toLocaleString());
  answerId: number;

  constructor(
    private comentarioRepo: ServiceComentarioService,
    private temaRepo: ServiceTemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  agregarComentario(): void {
    let nComentario =  new Comentario(this.mensaje, new Date());
    nComentario.tema = this.tema;
    nComentario.aprobado = !this.tema.foro.moderado;
    nComentario.ranking = 0;

    this.comentarioRepo.createComentario(nComentario).subscribe(
      results => {
        console.log(results);

        this.comentarioRepo.findById(this.answerId).subscribe(
          results2 => {
            console.log(results2);
            results.idRespuesta = results2;

            this.comentarioRepo.updateComentario(results.id, results).subscribe(
              results3 => {
                console.log(results3);
              },
              error3 => console.error(error3)
            );
          },
          error2 => console.error(error2)
        );
      },
      error => console.error(error)
    );
  }

  setAnswerId(answerId: number){
    this.answerId = answerId;
  }

  volver() {
    let moderado = true;
    this.router.navigate(['/tema/view', this.tema.id, moderado]);
  }

  ngOnInit(): void {
    this.tema.id = -6;
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.setAnswerId(+params.get('idR'));
        return this.temaRepo.findById(+params.get('id'));
      })
    )
    .subscribe(result => {
      console.log(result);
      this.tema = result;
    });
  }
}
