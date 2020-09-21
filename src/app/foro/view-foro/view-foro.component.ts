import { Component, OnInit } from '@angular/core';
import { Foro } from './../Foro';
import { ServiceForoService } from './../service-foro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-foro',
  templateUrl: './view-foro.component.html',
  styleUrls: ['./view-foro.component.css']
})
export class ViewForoComponent implements OnInit {
  foro: Foro = null;

  constructor(
    private foroRepo: ServiceForoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => this.foroRepo.findById(+params.get('id')))
    )
    .subscribe(result => {
      console.log(result);
      this.foro = result;
    });
  }
}
