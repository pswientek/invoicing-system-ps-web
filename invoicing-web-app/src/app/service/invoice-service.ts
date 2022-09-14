import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Invoice } from '../model/invoice';

const PATH = 'invoices';

@Injectable({providedIn: 'root'})
export class InvoiceService {

  contentType = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl(PATH));
  }

  addInvoice(invoice: Invoice): Observable<any> {
    return this.http.post<any>(this.apiUrl(PATH), this.toInvoiceRequest(invoice), this.contentType);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl(PATH, id));
  }

  editInvoice(invoice: Invoice): Observable<any> {
    return this.http.put<any>(this.apiUrl(PATH, invoice.id), this.toInvoiceRequest(invoice), this.contentType);
  }

  private apiUrl(service: string, id: number = null): string {
    const idInUrl = (id !== null ? '/' + id : '');

    return environment.apiUrl + '/' + service + idInUrl;
  }

  private toInvoiceRequest(invoice: Invoice) {
    return{
      number: invoice.number,
      date: invoice.date,
      buyer: invoice.buyer,
      seller: invoice.seller,
      entries: invoice.entries
     };
  }

}
