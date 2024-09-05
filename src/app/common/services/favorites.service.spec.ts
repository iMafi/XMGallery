import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let store:{[index: string]:any} = {};
  const photoMock = {id: '1', author: 'author'};
  const photoMock2 = { id: '2', author: 'author2'};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    store = {};
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set favorites item if none present', () => {
    service.addToFavorites(photoMock);
    expect(store['favorites']).toEqual(JSON.stringify([photoMock]));
  });

  it('should add photo to favorites in store in already present', () => {
    service.addToFavorites(photoMock);
    service.addToFavorites(photoMock2);
    expect(store['favorites']).toEqual(JSON.stringify([photoMock, photoMock2]));
  });

  it('should get photo by Id', () => {
    service.addToFavorites(photoMock);
    service.addToFavorites(photoMock2);
    const res = service.getSinglePhoto('2');
    expect(res).toEqual(photoMock2);
  });

  it('should remove from favorites by Id', () => {
    service.addToFavorites(photoMock);
    service.addToFavorites(photoMock2);
    service.removeFromFavorites('2');
    expect(store['favorites']).toEqual(JSON.stringify([photoMock]));
  });
});
