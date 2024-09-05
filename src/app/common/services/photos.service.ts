import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private readonly http: HttpClient) { }

  getRandomPhotos(): Observable<any> {
    const page = Math.floor(Math.random()*50);
    return this.http.get(`https://picsum.photos/v2/list?limit=20&page=${page}`).pipe(
      delay(this.generateRandomDelay())
    );
  }

  private generateRandomDelay(): number {
    return Math.floor(Math.random() * 100 + 200);
  }
}
