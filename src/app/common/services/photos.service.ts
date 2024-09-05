import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  apiUrl: string = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getRandomPhotos(): Observable<any> {
    const page = Math.floor(Math.random()*50);
    return this.http.get(`${this.apiUrl}v2/list?limit=20&page=${page}`).pipe(
      delay(this.generateRandomDelay())
    );
  }

  private generateRandomDelay(): number {
    return Math.floor(Math.random() * 100 + 200);
  }
}
