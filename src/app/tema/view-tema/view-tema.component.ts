import { Component, OnInit } from '@angular/core';
import { Tema } from './../Tema';
import { Comentario } from './../../comentario/Comentario';
import { ServiceTemaService } from './../service-tema.service';
import { ServiceComentarioService } from './../../comentario/service-comentario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-tema',
  templateUrl: './view-tema.component.html',
  styleUrls: ['./view-tema.component.css']
})
export class ViewTemaComponent implements OnInit {
  comentarios: Comentario[];
  tema: Tema = new Tema('prueba', 'prueba', new Date());
  selectedComentario: Comentario = new Comentario('prueba', new Date());

  constructor(
    private temaRepo: ServiceTemaService,
    private comentarioRepo: ServiceComentarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loadComentarios(): any {
    this.temaRepo.findAllComentarios(this.tema.id).subscribe(
      results => {
        console.log(results);
        this.comentarios = results;
      },
      error => console.error(error)
    );
  }

  selectComentario(comentario: Comentario): void {
    this.selectedComentario = comentario;
    console.log(this.selectedComentario)
  }

  deleteComentario(id: number): void {
    this.comentarioRepo.deleteById(id).subscribe(
      results => {
        console.log(results);
        this.loadComentarios();
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => this.temaRepo.findById(+params.get('id')))
    )
    .subscribe(result => {
      console.log(result);
      this.tema = result;
      this.loadComentarios();
    });
  }
}
