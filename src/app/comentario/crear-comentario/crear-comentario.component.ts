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
  tema: Tema = new Tema('prueba', 'prueba', new Date());

  constructor(
    private comentarioRepo: ServiceComentarioService,
    private temaRepo: ServiceTemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  agregarComentario(): void {
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
