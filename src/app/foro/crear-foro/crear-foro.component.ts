import { ServiceForoService } from './../service-foro.service';
import { Foro } from './../Foro';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-crear-foro',
  templateUrl: './crear-foro.component.html',
  styleUrls: ['./crear-foro.component.css']
})
export class CrearForoComponent implements OnInit {
  nombreForo='';
  constructor(private foroRepo: ServiceForoService) { }
  ngOnInit(): void {
  }
  agregarForo(): void {
    this.foroRepo.getForoArray().push(new Foro(this.nombreForo));
    console.log(this.foroRepo.getForoArray());
  }

}
