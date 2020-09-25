import { RestClientService } from './../services/rest-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = 'user';
  password = 'password';
  message: any;

  constructor(private restClient: RestClientService, private router: Router) {}

  ngOnInit() {}

  doLogin() {
    console.log(this.user + ' - ' + this.password);
    this.restClient.login(this.user, this.password).subscribe(data => {
        console.log('Succes');
        this.router.navigate(["/foro/list"])
      }, error => {
        console.error(error);
      });
  }

  getAdminData() {
    this.restClient.getAdminData().subscribe(
      data => {
        console.log('Success' + data);
        this.message = JSON.stringify(data);
      },
      error => {
        console.error(error);
      }
    );
  }
}
