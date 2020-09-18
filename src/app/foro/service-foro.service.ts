import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Foro } from './Foro';
import { Comentario } from './Comentario';
import { Tema } from './Tema';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ServiceForoService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError("An error has occurred");
  }

  private get<T>(url): Observable<T> {
    console.log("get:", url);
    return this.http
      .get<T>(url, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "application/json"
        })
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private post<T>(url, data: T): Observable<T> {
    console.log("post:", url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  findAllForos() {
    const url = `${environment.foroService}/foros`;
    return this.get<Foro[]>(url);
  }

  createForo(foro: Foro) {
    const url = `${environment.foroService}/foros`;
    return this.post(url, {
      nombre: foro.nombre,
    });
  }

  findById(id: number) {
    const url = `${environment.foroService}/foros/${id}`;
    return this.get<Foro>(url);
  }
}
