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

  constructor(private foroRepo: ServiceForoService) {}

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
    console.log(this.selectedForo)
  }

  ngOnInit(): void {
    this.loadForos();
  }

}
