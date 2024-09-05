import {Component, Input} from '@angular/core';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'xm-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() author: string = '';
  @Input() id: string = '';
  @Input() isDetail: boolean = false;
  apiUrl: string = environment.apiUrl;
}
