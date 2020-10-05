import { Component, OnInit } from '@angular/core';
import { Foro } from './../Foro';
import { Tema } from './../../tema/Tema';
import { ServiceForoService } from './../service-foro.service';
import { ServiceTemaService } from './../../tema/service-tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-foro',
  templateUrl: './view-foro.component.html',
  styleUrls: ['./view-foro.component.css']
})
export class ViewForoComponent implements OnInit {
  temas: Tema[];
  foro: Foro = new Foro('prueba', false);
  selectedTema: Tema = new Tema('prueba', 'prueba', new Date());

  constructor(
    private foroRepo: ServiceForoService,
    private temaRepo: ServiceTemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  loadTemas(): any {
    this.foroRepo.findAllTemas(this.foro.id).subscribe(
      results => {
        let listaTemas = [];
        console.log(results);
          results.map(elem => {
            if (elem.aprobado) {
              listaTemas.push(elem);
            }
          });
        this.temas = listaTemas;
      },
      error => console.error(error)
    );
  }

  selectTema(tema: Tema): void {
    this.selectedTema = tema;
    console.log(this.selectedTema)
  }

  deleteTema(id: number): void {

    if (this.selectedTema.id > -6) {
      this.temaRepo.deleteById(id).subscribe(
        results => {
          console.log(results);
          this.loadTemas();
        },
        error => console.error(error)
      );
    } else {
      alert("seleccione un tema");
    }
  }

  mirarTema(id: number) {
    if(id > -6) {
      let moderado = null
      if (this.foro.moderado) {
        moderado = true;
      }
      else {
        moderado = false;
      }
      this.router.navigate(['/tema/view', id, moderado]);
    }
    else {
      alert("por favor seleccione un tema ");
    }
  }

  editarTema(id: number) {
    if(id > -6) {
      let idT = this.selectedTema.id;
      this.router.navigate(['/tema/edit', id, idT]);
    }
    else {
      alert("por favor seleccione un tema ");
    }
  }

  moverAprobarTemas(id: number) {
    if(this.foro.moderado) {
      this.router.navigate(['/tema/aprobar', id]);
    }
    else {
      alert("el foro no es moderado");
    }
  }

  subir(id: number) {
    this.temaRepo.findById(id).subscribe(
      results => {
        results.ranking = results.ranking + 1;
        this.temaRepo.updateTema(id, results).subscribe(
          results2 => {
            console.log(results2);
            this.loadTemas();
          },
          error2 => console.error(error2)
        );
      },
      error => console.error(error)
    );
  }

  bajar(id: number) {
    this.temaRepo.findById(id).subscribe(
      results => {
        results.ranking = results.ranking - 1;
        this.temaRepo.updateTema(id, results).subscribe(
          results2 => {
            console.log(results2);
            this.loadTemas();
          },
          error2 => console.error(error2)
        );
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.foro.id = -6;
    this.selectedTema.id = -6;
    this.route.paramMap
      .pipe(
        switchMap(params => this.foroRepo.findById(+params.get('id')))
      )
      .subscribe(result => {
        console.log(result);
        this.foro = result;
        this.loadTemas();
      });
  }
}
