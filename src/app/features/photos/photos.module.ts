import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosListComponent } from './list/photos-list.component';
import { PhotosRoutingModule } from "./photos-routing.module";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "../../common/shared.module";
import { PhotoComponent } from './photo/photo.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PhotosListComponent,
    PhotoComponent
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MatCardModule,
    SharedModule,
    MatButtonModule
  ]
})
export class PhotosModule { }
