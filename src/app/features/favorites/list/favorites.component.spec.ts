import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let store:{[index: string]:any} = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    }
  };
  const photoMock = {id: '1', author: 'author'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init with favorites items if they are present', () => {
    store['favorites'] = JSON.stringify([photoMock]);
    component.ngOnInit();
    expect(component.favorites).toEqual([photoMock]);
  });
});
