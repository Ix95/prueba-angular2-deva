import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonService {
  constructor(private http: HttpClient) {}

  getJson(): Observable<any> {
    return this.http.get(
      'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json'
    );
  }
}
