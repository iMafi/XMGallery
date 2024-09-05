import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClient} from "@angular/common/http";

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient, useValue: {}
      }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
