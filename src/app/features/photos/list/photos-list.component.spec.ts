import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { PhotosListComponent } from './photos-list.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {PhotosService} from "../../../common/services/photos.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of} from "rxjs";
import {IPhoto} from "../../../common/interfaces/photo.interface";

describe('PhotosListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;
  const photosMock: IPhoto[] = [{ id: '1', author: 'author'}, {id: '2', author: 'author'}, {id: '3', author: 'author'}];
  const photosServiceMock = {getRandomPhotos: ()=> of(photosMock)}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosListComponent],
      providers: [
        {provide: PhotosService, useValue: photosServiceMock},
        {provide: MatSnackBar, useValue: {}},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from photos service', fakeAsync(() => {
    tick();
    expect(component.photos).toEqual(photosMock);
  }));
});
