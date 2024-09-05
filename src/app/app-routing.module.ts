import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'favorites', loadChildren: () => import('./features/favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: '', loadChildren: () => import('./features/photos/photos.module').then(m => m.PhotosModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
