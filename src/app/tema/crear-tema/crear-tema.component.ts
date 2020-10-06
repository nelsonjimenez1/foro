import { ServiceTemaService } from './../service-tema.service';
import { ServiceForoService } from './../../foro/service-foro.service';
import { Tema } from './../Tema';
import { Foro } from './../../foro/Foro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-tema',
  templateUrl: './crear-tema.component.html',
  styleUrls: ['./crear-tema.component.css']
})
export class CrearTemaComponent implements OnInit {
  titulo = '';
  descripcion = '';
  foro: Foro = new Foro('prueba', false);
  fecha: Date =  new Date();

  constructor(
    private temaRepo: ServiceTemaService,
    private foroRepo: ServiceForoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  agregarTema(): void {
    let nTema =  new Tema(this.titulo, this.descripcion, this.fecha.toLocaleString());
    nTema.foro = this.foro;
    nTema.aprobado = !this.foro.moderado;
    nTema.ranking = 0;
    this.temaRepo.createTema(nTema).subscribe(
      results => {
        console.log(results);
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.foro.id = -6;
    this.route.paramMap
    .pipe(
      switchMap(params => this.foroRepo.findById(+params.get('id')))
    )
    .subscribe(result => {
      console.log(result);
      this.foro = result;
    });
  }
}
