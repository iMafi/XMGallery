import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoComponent } from './photo.component';
import { ActivatedRoute } from "@angular/router";
import {FavoritesService} from "../../../common/services/favorites.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {IPhoto} from "../../../common/interfaces/photo.interface";

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  const photoMock = {
    id: '1',
    author: 'John Doe'
  };
  const activatedRouteMock = { snapshot: { paramMap: { get: (): string | null => '1'}}};
  const favoritesServiceMock = {
    getSinglePhoto: (): IPhoto | void => {},
    removeFromFavorites: (id: string) => {}
  };
  const snackBarMock = { open: () => {}};

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: FavoritesService, useValue: favoritesServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return single photo', () => {
    spyOn(favoritesServiceMock, 'getSinglePhoto').and.returnValue(photoMock);
    component.ngOnInit();
    expect(favoritesServiceMock.getSinglePhoto).toHaveBeenCalled();
    expect(component.photo).toEqual(photoMock);
  });

  it('should not modify photo if not found in favorites', () => {
    spyOn(favoritesServiceMock, 'getSinglePhoto').and.returnValue();
    component.ngOnInit();
    expect(favoritesServiceMock.getSinglePhoto).toHaveBeenCalled();
    expect(component.photo).toEqual({id: '', author: ''});
  });

  it('should not call favorites Service when id is wrong', () => {
    spyOn(activatedRouteMock.snapshot.paramMap, 'get').and.returnValue('asdf');
    spyOn(favoritesServiceMock, 'getSinglePhoto');
    component.ngOnInit();
    expect(favoritesServiceMock.getSinglePhoto).not.toHaveBeenCalled();
  });

  it('should call remove function and show snackBar message', ()=> {
    spyOn(favoritesServiceMock, 'removeFromFavorites');
    spyOn(snackBarMock, 'open');
    component.photo.id = '1';
    component.removeFromFavorites();
    expect(favoritesServiceMock.removeFromFavorites).toHaveBeenCalledWith('1');
    expect(snackBarMock.open).toHaveBeenCalled();
  });

  it('should not call remove from favorites if no id is present', () => {
    spyOn(favoritesServiceMock, 'removeFromFavorites');
    component.photo.id = '';
    component.removeFromFavorites();
    expect(favoritesServiceMock.removeFromFavorites).not.toHaveBeenCalled();
  });
});
