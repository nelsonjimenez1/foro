import { Component, OnInit } from '@angular/core';
import { Foro } from './../../foro/Foro';
import { Tema } from './../Tema';
import { ServiceForoService } from './../../foro/service-foro.service';
import { ServiceTemaService } from './../service-tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-aprobar-tema',
  templateUrl: './aprobar-tema.component.html',
  styleUrls: ['./aprobar-tema.component.css']
})
export class AprobarTemaComponent implements OnInit {
  temas: Tema[];
  fecha: Date =  new Date();
  foro: Foro = new Foro('prueba', false);
  selectedTema: Tema = new Tema('prueba', 'prueba', this.fecha.toLocaleString());

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
            if (!elem.aprobado) {
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

  rechazarTema(id: number): void {
    if(id > -6) {
      let nTema = this.selectedTema;
      nTema.aprobado = false;
      this.temaRepo.aprobarTema(id, nTema).subscribe(
        results => {
          console.log(results);
          this.loadTemas();
        },
        error => console.error(error)
      );
    }
    else {
      alert("por favor seleccione un tema ");
    }
  }

  aprobarTema(id: number) {
    if(id > -6) {
      let nTema = this.selectedTema;
      nTema.aprobado = true;
      this.temaRepo.aprobarTema(id, nTema).subscribe(
        results => {
          console.log(results);
          this.loadTemas();
        },
        error => console.error(error)
      );
    }
    else {
      alert("por favor seleccione un tema ");
    }
  }

  volver() {
    this.router.navigate(['/foro/view', this.foro.id]);
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
