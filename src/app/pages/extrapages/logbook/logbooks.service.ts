/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { logbookModel } from './logbooks.model';
import { Logbooks } from './data';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './logbooks-sortable.directive';

// Logbooks Services
import { restApiService } from "../../../core/services/rest-api.service";
import { Filter } from 'angular-feather/icons';

interface SearchResult {
  countries: logbookModel[];
  alllogbook: logbookModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  LogbookFilter: string;
  logbookStatus: string;
  logbookPrice: number;
  logbookRate: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(countries: logbookModel[], column: SortColumn, direction: string): logbookModel[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: logbookModel, term: string, pipe: PipeTransform) {
  return country.image.toLowerCase().includes(term.toLowerCase())
    || country.name.toLowerCase().includes(term.toLowerCase())
    || country.category.toLowerCase().includes(term.toLowerCase())
    ;
}

@Injectable({ providedIn: 'root' })
export class AdvancedService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<logbookModel[]>([]);
  private _alllogbook$ = new BehaviorSubject<logbookModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _datas$ = new Subject<void>();
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    LogbookFilter: '',
    logbookStatus: '',
    logbookRate: 0,
    logbookPrice: 0,
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };
  user = [];
  logbooks: any | undefined;
  constructor(private pipe: DecimalPipe, public ApiService: restApiService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._alllogbook$.next(result.alllogbook);
      this._total$.next(result.total);
    });
    this._search$.next();

    // Api Data
    this.ApiService.getData().subscribe(
      data => {
        const users = JSON.parse(data);
        this.logbooks = users.data;
      });
  }

  get countries$() { return this._countries$.asObservable(); }
  get alllogbook$() { return this._alllogbook$.asObservable(); }
  get logbook() { return this.logbooks; }
  get total$() { return this._total$.asObservable(); }
  get datas$() { return this._datas$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get LogbookFilter() { return this._state.LogbookFilter; }
  get logbookPrice() { return this._state.logbookPrice; }
  get logbookRate() { return this._state.logbookRate; }
  get logbookStatus() { return this._state.logbookStatus; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set LogbookFilter(LogbookFilter: string) { this._set({ LogbookFilter }); }
  set logbookPrice(logbookPrice: number) { this._set({ logbookPrice }); }
  set logbookStatus(logbookStatus: string) { this._set({ logbookStatus }); }
  set logbookRate(logbookRate: number) { this._set({ logbookRate }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {

    const datas = (this.logbook) ?? [];
    const { sortColumn, sortDirection, pageSize, page, searchTerm, LogbookFilter, logbookRate, logbookPrice,logbookStatus } = this._state;

    // 1. sort
    let countries = sort(datas, sortColumn, sortDirection);

     // 2. search
    if(searchTerm){
      countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    }

    // 3. filter
    if(LogbookFilter){
      countries = countries.filter(country => matches(country, LogbookFilter, this.pipe));
    }
    

    // 4. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }

    // 5. Rate Filter       
    if (logbookRate) {
      countries = countries.filter(country => country.rating >= logbookRate);
    }
    else {
      countries = countries;
    }

    // 6.Price &  rate Filter
    if (logbookPrice) {
      countries = countries.filter(country => country.price >= Object.values(logbookPrice)[0] && country.price <= Object.values(logbookPrice)[1]);
    }
    else {
      countries = countries;
    }

    // 6 Status Filter
    if (logbookStatus) {
      countries = countries.filter(country => country.status == logbookStatus);
    }
    else {
      countries = countries;
    }

    const total = countries.length;

    const alllogbook = countries;
    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ countries, total, alllogbook });
  }
}
