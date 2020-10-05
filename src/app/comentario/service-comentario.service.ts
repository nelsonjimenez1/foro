import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Foro } from './../foro/Foro';
import { Tema } from './../tema/Tema';
import { Comentario } from './Comentario';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceComentarioService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError("An error has occurred");
  }

  private get<T>(url): Observable<T> {
    console.log("get:", url);
    return this.http.get<T>(url, {withCredentials: true})
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private post<T>(url, data: T): Observable<T> {
    console.log("post:", url);
    return this.http.post<T>(url, data, {withCredentials: true})
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private put<T>(url, data: T): Observable<T> {
    console.log("put:", url);
    return this.http.put<T>(url, data, {withCredentials: true})
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  private delete<T>(url): Observable<T> {
    console.log("delete:", url);
    return this.http.delete<T>(url, {withCredentials: true})
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  findById(id: number) {
    const url = `${environment.foroService}/comentarios/${id}`;
    return this.get<Comentario>(url);
  }

  findByIdRespuestas(id: number) {
    const url = `${environment.foroService}/comentarios/${id}/respuestas`;
    return this.get<Comentario[]>(url);
  }

  createComentario(comentario: Comentario) {
    const url = `${environment.foroService}/comentarios`;
    return this.post<Comentario>(url, comentario);
  }

  deleteById(id: number) {
    const url = `${environment.foroService}/comentarios/${id}`;
    return this.delete(url);
  }

  aprobarComentario(id: number, comentario: Comentario) {
    const url = `${environment.foroService}/moderator/comentarios/${id}`;
    return this.put<Comentario>(url, comentario);
  }

  updateComentario(id: number, comentario: Comentario) {
    const url = `${environment.foroService}/comentarios/${id}`;
    return this.put<Comentario>(url, comentario);
  }
}
