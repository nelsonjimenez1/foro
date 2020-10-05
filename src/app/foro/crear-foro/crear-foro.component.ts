import { ServiceForoService } from './../service-foro.service';
import { Foro } from './../Foro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-foro',
  templateUrl: './crear-foro.component.html',
  styleUrls: ['./crear-foro.component.css']
})
export class CrearForoComponent implements OnInit {
  nombreForo = '';
  check = false;

  constructor(private foroRepo: ServiceForoService) {}

  agregarForo(): void {
    this.foroRepo.createForo(new Foro(this.nombreForo, this.check)).subscribe(
      results => {
        console.log(results);
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
  }
}
