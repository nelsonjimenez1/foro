import { ServiceComentarioService } from './../service-comentario.service';
import { ServiceTemaService } from './../../tema/service-tema.service';
import { Comentario } from './../Comentario';
import { Tema } from './../../tema/Tema';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-comentario',
  templateUrl: './edit-comentario.component.html',
  styleUrls: ['./edit-comentario.component.css']
})
export class EditComentarioComponent implements OnInit {
  fecha: Date =  new Date();
  comentario: Comentario = new Comentario('prueba', new Date());
  tema: Tema = new Tema('prueba', 'prueba', this.fecha.toLocaleString());

  constructor(
    private comentarioRepo: ServiceComentarioService,
    private temaRepo: ServiceTemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  editarComentario(): void {
    this.comentarioRepo.updateComentario(this.comentario.id, this.comentario).subscribe(
      results => {
        console.log(results);
      },
      error => console.error(error)
    );
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
        this.comentario.id = (+params.get('idC'));
        return this.temaRepo.findById(+params.get('id'));
      })
    )
    .subscribe(result => {
      console.log(result);
      this.tema = result;
      this.comentarioRepo.findById(this.comentario.id).subscribe(
        results2 => {
          this.comentario = results2;
        },
        error2 => console.error(error2)
      );
    });
  }
}
