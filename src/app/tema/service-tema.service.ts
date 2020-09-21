import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Foro } from './../foro/Foro';
import { Tema } from './Tema';
import { Comentario } from './../comentario/Comentario';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceTemaService {
  constructor(private http: HttpClient) { }

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

  findAllComentarios(id: number) {
    const url = `${environment.foroService}/temas/${id}/comentarios`;
    return this.get<Comentario[]>(url);
  }

  createTema(tema: Tema) {
    const url = `${environment.foroService}/temas`;
    return this.post(url, tema);
  }

  findById(id: number) {
    const url = `${environment.foroService}/temas/${id}`;
    return this.get<Tema>(url);
  }
}
