import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DictionnaryService {
  backendURL = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getWord() {
    return this.http.get(this.backendURL + '/get-word');
  }

  checkGuessExist(guess: string) {
    return this.http.get(this.backendURL + '/check?guess=' + guess);
  }
}
