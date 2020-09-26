import { Foro } from './../Foro';
import { ServiceForoService } from './../service-foro.service';
import { RestClientService } from './../../services/rest-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-foro',
  templateUrl: './list-foro.component.html',
  styleUrls: ['./list-foro.component.css']
})
export class ListForoComponent implements OnInit {
  foros: Foro[];
  selectedForo: Foro = new Foro('prueba');


  constructor(private foroRepo: ServiceForoService, private restClient: RestClientService, private router: Router) {}

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

  deleteForo(id: number): void {
    if(this.selectedForo.id > -6){

      this.foroRepo.deleteById(id).subscribe(
        results => {
          console.log(results);
          this.loadForos();
        },
        error => console.error(error)
      );
    }else{
      alert("por favor seleccione un foro");
    }

  }
  mirarForo(id: number){
    if(id > -6){
      this.router.navigate(["foro/view", id]);
    }else{
      alert("por favor seleccione un foro");
    }

  }
  logout() {
    this.restClient.logout().subscribe(data => {
        console.log("log out");
        this.router.navigate(["/login"])
      }, error => {
        console.error(error);

      });
  }

  ngOnInit(): void {
    this.loadForos();
    this.selectedForo.id = -6;
  }
}
