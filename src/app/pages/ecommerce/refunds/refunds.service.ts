import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';

const API_URL = GlobalComponent.API_URL;

@Injectable({
  providedIn: 'root',
})
export class RefundsService {
  constructor(private http: HttpClient) {}

  // Obtener ventas
  getSales(params: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
    return this.http.get<any>(`${API_URL}/refund/find`, { headers, params });
    
  }

  // Realizar devolución
  saveRefund(refundData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    });
    return this.http.post<any>(`${API_URL}/refund/save`, refundData, { headers });
  }
}
