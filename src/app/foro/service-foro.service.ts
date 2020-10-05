import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Foro } from './Foro';
import { Tema } from './../tema/Tema';
import { Comentario } from './../comentario/Comentario';
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

  findAllForos() {
    const url = `${environment.foroService}/foros`;
    return this.get<Foro[]>(url);
  }

  findById(id: number) {
    const url = `${environment.foroService}/foros/${id}`;
    return this.get<Foro>(url);
  }

  findAllTemas(id: number) {
    const url = `${environment.foroService}/foros/${id}/temas`;
    return this.get<Tema[]>(url);
  }

  createForo(foro: Foro) {
    const url = `${environment.foroService}/admin/foros`;
    return this.post<Foro>(url, foro);
  }

  deleteById(id: number) {
    const url = `${environment.foroService}/admin/foros/${id}`;
    return this.delete(url);
  }

}
