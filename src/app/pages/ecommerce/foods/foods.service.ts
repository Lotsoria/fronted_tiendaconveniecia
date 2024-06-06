/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { foodModel } from './foods.model';
import { Foods } from './data';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './foods-sortable.directive';

// Foods Services
import { restApiService } from "../../../core/services/rest-api.service";
import { Filter } from 'angular-feather/icons';

interface SearchResult {
  countries: foodModel[];
  allfood: foodModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  FoodFilter: string;
  foodStatus: string;
  foodPrice: number;
  foodRate: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(countries: foodModel[], column: SortColumn, direction: string): foodModel[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: foodModel, term: string, pipe: PipeTransform) {
  return country.image.toLowerCase().includes(term.toLowerCase())
    || country.name.toLowerCase().includes(term.toLowerCase())
    || country.category.toLowerCase().includes(term.toLowerCase())
    ;
}

@Injectable({ providedIn: 'root' })
export class AdvancedService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<foodModel[]>([]);
  private _allfood$ = new BehaviorSubject<foodModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _datas$ = new Subject<void>();
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    FoodFilter: '',
    foodStatus: '',
    foodRate: 0,
    foodPrice: 0,
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 9,
    totalRecords: 0
  };
  user = [];
  foods: any | undefined;
  constructor(private pipe: DecimalPipe, public ApiService: restApiService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._allfood$.next(result.allfood);
      this._total$.next(result.total);
    });
    this._search$.next();

    // Api Data
    this.ApiService.getData().subscribe(
      data => {
        const users = JSON.parse(data);
        this.foods = users.data;
      });
  }

  get countries$() { return this._countries$.asObservable(); }
  get allfood$() { return this._allfood$.asObservable(); }
  get food() { return this.foods; }
  get total$() { return this._total$.asObservable(); }
  get datas$() { return this._datas$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get FoodFilter() { return this._state.FoodFilter; }
  get foodPrice() { return this._state.foodPrice; }
  get foodRate() { return this._state.foodRate; }
  get foodStatus() { return this._state.foodStatus; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set FoodFilter(FoodFilter: string) { this._set({ FoodFilter }); }
  set foodPrice(foodPrice: number) { this._set({ foodPrice }); }
  set foodStatus(foodStatus: string) { this._set({ foodStatus }); }
  set foodRate(foodRate: number) { this._set({ foodRate }); }
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

    const datas = (this.food) ?? [];
    const { sortColumn, sortDirection, pageSize, page, searchTerm, FoodFilter, foodRate, foodPrice,foodStatus } = this._state;

    // 1. sort
    let countries = sort(datas, sortColumn, sortDirection);

     // 2. search
    if(searchTerm){
      countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    }

    // 3. filter
    if(FoodFilter){
      countries = countries.filter(country => matches(country, FoodFilter, this.pipe));
    }
    

    // 4. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }

    // 5. Rate Filter       
    if (foodRate) {
      countries = countries.filter(country => country.rating >= foodRate);
    }
    else {
      countries = countries;
    }

    // 6.Price &  rate Filter
    if (foodPrice) {
      countries = countries.filter(country => country.price >= Object.values(foodPrice)[0] && country.price <= Object.values(foodPrice)[1]);
    }
    else {
      countries = countries;
    }

    // 6 Status Filter
    if (foodStatus) {
      countries = countries.filter(country => country.status == foodStatus);
    }
    else {
      countries = countries;
    }

    const total = countries.length;

    const allfood = countries;
    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ countries, total, allfood });
  }
}
