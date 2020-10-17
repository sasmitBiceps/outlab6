import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Data } from './Data'
@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private GetLink = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  private PostLink = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';
  constructor(private http: HttpClient) { }

  getData(): Observable<Data>{
    return this.http.get<Data>(this.GetLink)
    .pipe(
      catchError(this.handleError<Data>('getData ', {
        name: '',
        email: '',
        feedback: '',
        comment: ''
      }))
    )
  }

  sendData(data: Data): Observable<Data> {
    console.log(data)
    return this.http.post<Data>(this.PostLink, data).pipe(
      catchError(this.handleError<Data>('Sending data '))
    );
  }

  private handleError<T>(operation='operation', result?: T){
    return(error: any): Observable<T> => {
      console.error(error);
     
      return of(result as T)
    }
  }
}
