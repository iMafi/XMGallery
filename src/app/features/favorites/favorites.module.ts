import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesComponent } from "./list/favorites.component";
import { FavoritesRoutingModule } from "./favorites-routing.module";
import {SharedModule} from "../../common/shared.module";

@NgModule({
  declarations: [
    FavoritesComponent,
  ],
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        SharedModule
    ]
})
export class FavoritesModule { }
