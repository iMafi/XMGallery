import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { IPhoto } from "../../../common/interfaces/photo.interface";
import { FavoritesService } from "../../../common/services/favorites.service";


@Component({
  selector: 'xm-app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  photo: IPhoto = {
    id: '',
    author: ''
  }

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly favoritesService: FavoritesService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('photoId');
    if (id && !isNaN(parseInt(id))) {
      const photo = this.favoritesService.getSinglePhoto(id);
      if (photo) {
        this.photo = photo;
      }
    }
  }

  removeFromFavorites(): void {
    if (this.photo.id) {
      this.favoritesService.removeFromFavorites(this.photo.id);
      this.snackBar.open('Removed from Favorites');
    }
  }
}
