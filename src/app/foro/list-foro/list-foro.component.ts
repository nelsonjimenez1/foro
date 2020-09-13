import { Foro } from './../Foro';
import { ServiceForoService } from './../service-foro.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list-foro',
  templateUrl: './list-foro.component.html',
  styleUrls: ['./list-foro.component.css']
})
export class ListForoComponent implements OnInit {

  foros: Foro[];
  selectedForo: Foro = null;
  nombreForo = '';
  constructor(private foroRepo: ServiceForoService) { }

  loadForos(): any {
    this.foros = this.foroRepo.getForoArray();
    console.log('loading');
  }

  selectForo(foro: Foro): void {
    this.selectedForo = foro;
  }

 /* deleteForo(id): void {
    this.mensaje = 'Foroa borrada ' + id;
  }*/

  ngOnInit(): void {
    this.loadForos();
  }

}
