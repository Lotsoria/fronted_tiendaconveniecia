import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {logbookModel} from './logbooks.model';

export type SortColumn = keyof logbookModel | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface logbookSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[logbooksortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdlogbooksSortableHeader {

  @Input() logbooksortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() logbooksort = new EventEmitter<logbookSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.logbooksort.emit({column: this.logbooksortable, direction: this.direction});
  }
}
