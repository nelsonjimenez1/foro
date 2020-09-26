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
  foro: Foro = new Foro('prueba');
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
        console.log(results);
        this.temas = results;
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
  mirarTema(id: number){
    if(id > -6){
      this.router.navigate(['/tema/view', id]);
    }else{
      alert("por favor seleccione un tema ");
    }
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
