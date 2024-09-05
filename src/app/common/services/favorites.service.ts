import { Injectable } from '@angular/core';
import {IPhoto} from "../interfaces/photo.interface";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  addToFavorites(photo: any): void {
    const items = this.getItems();
    if (items) {
      const favorites = JSON.parse(items);
      favorites.push(photo);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([photo]));
    }
  }

  getSinglePhoto(id: string): IPhoto | void {
    const items = this.getItems();
    if (items) {
      return JSON.parse(items).find((photo: IPhoto) => photo.id === id);
    }
  }

  removeFromFavorites(id: string): void {
    const items = this.getItems();
    if (items) {
      localStorage.setItem('favorites', JSON.stringify(
        JSON.parse(items).filter((photo : IPhoto) => photo.id !== id)
      ));
    }
  }

  private getItems(): string | null {
    return localStorage.getItem('favorites');
  }
}
