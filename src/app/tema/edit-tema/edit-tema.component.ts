import { ServiceTemaService } from './../service-tema.service';
import { ServiceForoService } from './../../foro/service-foro.service';
import { Tema } from './../Tema';
import { Foro } from './../../foro/Foro';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-tema',
  templateUrl: './edit-tema.component.html',
  styleUrls: ['./edit-tema.component.css']
})
export class EditTemaComponent implements OnInit {
  tema: Tema = new Tema('prueba', 'prueba', new Date());
  foro: Foro = new Foro('prueba', false);

  constructor(
    private temaRepo: ServiceTemaService,
    private foroRepo: ServiceForoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  editarTema(): void {
    this.temaRepo.updateTema(this.tema.id, this.tema).subscribe(
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
      switchMap(params => {
        this.tema.id = (+params.get('idT'));
        return this.foroRepo.findById(+params.get('id'));
      })
    )
    .subscribe(result => {
      console.log(result);
      this.foro = result;
      this.temaRepo.findById(this.tema.id).subscribe(
        results2 => {
          this.tema = results2;
        },
        error2 => console.error(error2)
      );
    });
  }
}
