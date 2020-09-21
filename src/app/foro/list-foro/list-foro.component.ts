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
    this.foroRepo.findAllForos().subscribe(
      results => {
        console.log(results);
        this.foros = results;
      },
      error => console.error(error)
    );
  }

  selectForo(foro: Foro): void {
    this.selectedForo = foro;
  }

  ngOnInit(): void {
    this.loadForos();
  }

}
