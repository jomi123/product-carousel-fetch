import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() name: String = 'product';
  @Input() price: Number = 0;
  @Input() description: string = 'description';
  @Input() src!: string;
}
