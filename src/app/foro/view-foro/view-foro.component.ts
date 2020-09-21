import { Component, OnInit } from '@angular/core';
import { Foro } from './../Foro';
import { Tema } from './../../tema/Tema';
import { ServiceForoService } from './../service-foro.service';
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
  selectedTema: Tema =  null;

  constructor(
    private foroRepo: ServiceForoService,
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

  ngOnInit(): void {
    this.foro.id = -6;
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
