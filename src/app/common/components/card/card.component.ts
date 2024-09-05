import {Component, Input} from '@angular/core';

@Component({
  selector: 'xm-app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() author = '';
  @Input() id = '';
  @Input() isDetail = false;
}
