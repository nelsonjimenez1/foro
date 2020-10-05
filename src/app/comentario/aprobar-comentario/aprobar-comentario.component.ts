import { Component, OnInit } from '@angular/core';
import { Foro } from './../../foro/Foro';
import { Tema } from './../../tema/Tema';
import { Comentario } from './../Comentario';
import { ServiceTemaService } from './../../tema/service-tema.service';
import { ServiceComentarioService } from './../service-comentario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-aprobar-comentario',
  templateUrl: './aprobar-comentario.component.html',
  styleUrls: ['./aprobar-comentario.component.css']
})
export class AprobarComentarioComponent implements OnInit {
  comentarios: Comentario[];
  tema: Tema = new Tema('prueba', 'prueba', new Date());
  selectedComentario: Comentario = new Comentario('prueba', new Date());
  selectedComentario2: Comentario = new Comentario('prueba', new Date());
  bool = false;

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
        let listaComentarios = [];
        results.map(elem => {
          if (elem.idRespuesta == null) {
            this.comentarioRepo.findByIdRespuestas(elem.id).subscribe(
              results2 => {
                console.log(results2);
                let listaComentarios2 = []
                results2.map(elem2 => {
                  if (!elem2.aprobado) {
                    listaComentarios2.push(elem2);
                  }
                });
                elem.idRespuestas = listaComentarios2;
                listaComentarios.push(elem);
              },
              error2 => console.error(error2)
            );
          }
        });
        this.comentarios = listaComentarios;
        console.log(this.comentarios);
      },
      error => console.error(error)
    );
  }

  selectComentario(comentario: Comentario): void {
    if (this.bool) {
      this.selectedComentario = this.selectedComentario2;
      console.log(this.selectedComentario);
      this.bool = false;
    }
    else {
      this.selectedComentario = comentario;
      console.log(this.selectedComentario);
    }
  }

  selectComentario2(comentarioR: Comentario): void {
    this.selectedComentario2 = comentarioR;
    console.log(this.selectedComentario2);
    this.bool = true;
  }

  rechazarComentario(id: number): void {
    if(id > -6) {
      let nComentario = this.selectedComentario;
      nComentario.aprobado = false;
      this.comentarioRepo.aprobarComentario(id, nComentario).subscribe(
        results => {
          console.log(results);
          this.loadComentarios();
        },
        error => console.error(error)
      );
    }
    else {
      alert("por favor seleccione un comentario ");
    }
  }

  aprobarComentario(id: number) {
    if(id > -6) {
      let nComentario = this.selectedComentario;
      nComentario.aprobado = true;
      this.comentarioRepo.aprobarComentario(id, nComentario).subscribe(
        results => {
          console.log(results);
          this.loadComentarios();
        },
        error => console.error(error)
      );
    }
    else {
      alert("por favor seleccione un comentario ");
    }
  }

  volver() {
    let moderado = true;
    this.router.navigate(['/tema/view', this.tema.id, moderado]);
  }

  ngOnInit(): void {
    this.tema.foro = new Foro('prueba', false);
    this.tema.foro.id = -6
    this.selectedComentario.id = -6;
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
