import { Component, OnInit } from '@angular/core';
import { Foro } from './../../foro/Foro';
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
  fecha: Date =  new Date();
  tema: Tema = new Tema('prueba', 'prueba', this.fecha.toLocaleString());
  selectedComentario: Comentario = new Comentario('prueba', new Date());
  moderado = false;
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
          if (elem.aprobado && elem.idRespuesta == null) {
            this.comentarioRepo.findByIdRespuestas(elem.id).subscribe(
              results2 => {
                console.log(results2);
                let listaComentarios2 = []
                results2.map(elem2 => {
                  if (elem2.aprobado) {
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

  deleteComentario(id: number): void {
    if (this.selectedComentario.id > -6) {
      this.comentarioRepo.deleteById(id).subscribe(
        results => {
          console.log(results);
          this.loadComentarios();
        },
        error => console.error(error)
      );
    }else{
      alert("seleccione un comentario");
    }
  }

  answerComentario(idR: number, id: number): void {
    if (this.selectedComentario.id > -6) {
      this.router.navigate(["comentario/crear", id, idR]);
    }
    else {
      alert("seleccione un comentario");
    }
  }

  editarComentario(id: number) {
    if(this.selectedComentario.id > -6) {
      let idC = this.selectedComentario.id;
      this.router.navigate(['/comentario/edit', id, idC]);
    }
    else {
      alert("por favor seleccione un comentario ");
    }
  }

  moverAprobarComentarios(id: number) {
    if(this.moderado) {
      this.router.navigate(['/comentario/aprobar', id]);
    }
    else {
      alert("el foro no es moderado");
    }
  }

  subir(id: number) {
    this.comentarioRepo.findById(id).subscribe(
      results => {
        results.ranking = results.ranking + 1;
        this.comentarioRepo.updateComentario(id, results).subscribe(
          results2 => {
            console.log(results2);
            this.loadComentarios();
          },
          error2 => console.error(error2)
        );
      },
      error => console.error(error)
    )
  }

  bajar(id: number) {
    this.comentarioRepo.findById(id).subscribe(
      results => {
        results.ranking = results.ranking - 1;
        this.comentarioRepo.updateComentario(id, results).subscribe(
          results2 => {
            console.log(results2);
            this.loadComentarios();
          },
          error2 => console.error(error2)
        );
      },
      error => console.error(error)
    )
  }

  ngOnInit(): void {
    this.tema.foro = new Foro('prueba', false);
    this.tema.foro.id = -6
    this.selectedComentario.id = -6;
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.moderado = (params.get('moderado')=='true');
          return this.temaRepo.findById(+params.get('id'))
        })
      )
      .subscribe(result => {
        console.log(result);
        this.tema = result;
        this.loadComentarios();
      });
  }
}
