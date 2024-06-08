import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {refundModel} from './refunds.model';

export type SortColumn = keyof refundModel | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface refundSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[refundsortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdRefundsSortableHeader {

  @Input() refundsortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() refundsort = new EventEmitter<refundSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.refundsort.emit({column: this.refundsortable, direction: this.direction});
  }
}
