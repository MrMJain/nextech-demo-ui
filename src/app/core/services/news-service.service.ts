import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { News, NewsResponse } from '../../model/news';
import { pageparam } from '../../model/pageparam';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends News{
  constructor(private http: HttpClient) {
    super()
}
getNews(req: pageparam): Observable<NewsResponse> {
  return this.http.post<NewsResponse>("https://localhost:7062/NextechDemo" + "/GetNewsList", req)
  .pipe(catchError(error => {
    let errorMsg: string;
    if(error.error instanceof ErrorEvent) {
      errorMsg = `Error: ${error.error.message}`;
    } else {
      errorMsg = " ";
    }
    return throwError(() => Error(errorMsg));
  }));
}
}


 
