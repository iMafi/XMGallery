import { Component, OnInit } from '@angular/core';
import { IPhoto } from "../../../common/interfaces/photo.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'xm-app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: Array<IPhoto> = [];

  constructor(private readonly route: Router) {
  }

  ngOnInit(): void {
    const items = localStorage.getItem('favorites');
    if (items) {
      this.favorites = JSON.parse(items);
    }
  }

  navigateToDetailsPage(id: string): void {
    this.route.navigate(['/photos', id]);
  }
}
