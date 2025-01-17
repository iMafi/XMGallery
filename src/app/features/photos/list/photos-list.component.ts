import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subject, takeUntil } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

import { PhotosService } from "../../../common/services/photos.service";
import { FavoritesService } from "../../../common/services/favorites.service";
import { IPhoto } from "../../../common/interfaces/photo.interface";


@Component({
  selector: 'xm-app-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('scroll') scroll: ElementRef | undefined;
  virtualScrollOffset: number = 200;
  unsubscribe$: Subject<void> = new Subject<void>();
  photos: Array<IPhoto> = [];
  showSpinner: boolean = true;

  constructor(
    private readonly photosService: PhotosService,
    private readonly snackBar: MatSnackBar,
    private readonly favoritesService: FavoritesService
  ) {
  }

  ngOnInit(): void {
    this.generateNewPhotos();
  }

  ngAfterViewInit(): void {
    if (this.scroll) {
      fromEvent(this.scroll.nativeElement, 'scroll')
        .pipe(
          debounceTime(300),
          takeUntil(this.unsubscribe$)
        )
        .subscribe((event: any) => {
          if (event.target.scrollTop + event.target.clientHeight + this.virtualScrollOffset >= event.target.scrollHeight) {
            this.showSpinner = true;
            this.generateNewPhotos();
          }
        })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addToFavorites(photo: IPhoto): void {
    this.favoritesService.addToFavorites(photo);
    this.snackBar.open('Added to Favorites');
  }

  private generateNewPhotos(): void {
    this.photosService.getRandomPhotos()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data: IPhoto[]) => {
        this.photos = this.photos.concat(data);
        this.showSpinner = false;
      })
  }
}
