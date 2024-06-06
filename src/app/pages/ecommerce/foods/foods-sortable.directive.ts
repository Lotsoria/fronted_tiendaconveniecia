import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {foodModel} from './foods.model';

export type SortColumn = keyof foodModel | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface foodSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[foodsortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdFoodsSortableHeader {

  @Input() foodsortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() foodsort = new EventEmitter<foodSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.foodsort.emit({column: this.foodsortable, direction: this.direction});
  }
}
