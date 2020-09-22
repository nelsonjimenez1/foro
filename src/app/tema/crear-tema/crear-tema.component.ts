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
  foro: Foro = null;

  constructor(
    private temaRepo: ServiceTemaService,
    private foroRepo: ServiceForoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  agregarTema(): void {
    let nTema =  new Tema(this.titulo, this.descripcion, new Date());
    nTema.foro = this.foro;
    this.temaRepo.createTema(nTema).subscribe(
      results => {
        console.log(results);
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
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
