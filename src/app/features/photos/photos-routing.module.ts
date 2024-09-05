import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotosListComponent } from "./list/photos-list.component";
import { PhotoComponent } from "./photo/photo.component";

const routes: Routes = [
  { path: '', component: PhotosListComponent },
  { path: 'photos/:photoId', component: PhotoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosRoutingModule {}
