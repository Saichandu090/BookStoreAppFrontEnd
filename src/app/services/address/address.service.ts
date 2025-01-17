import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAddress } from '../../model/interfaces/cart';
import { Observable, Subject } from 'rxjs';
import { IJsonResponse } from '../../model/interfaces/jsonresponse';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseURL: string = 'http://localhost:8080/address/'

  private http: HttpClient = inject(HttpClient);

  onAddressChange:Subject<boolean>=new Subject<boolean>();

  getHeaders():HttpHeaders{
    let token = localStorage.getItem(Constant.LOGIN_TOKEN);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }

  addAddress(obj: IAddress): Observable<IJsonResponse> {
    const headers=this.getHeaders();
    return this.http.post<IJsonResponse>(this.baseURL + 'addAddress', obj, { headers });
  }

  getAllAddress(): Observable<IJsonResponse> {
    const headers=this.getHeaders();
    return this.http.get<IJsonResponse>(this.baseURL + 'allAddress', { headers });
  }

  getAddressById(id:number): Observable<IJsonResponse> {
    const headers=this.getHeaders();
    return this.http.get<IJsonResponse>(`${this.baseURL}getAddressById/${id}`, { headers });
  }

  deleteAddress(id: number): Observable<IJsonResponse> {
    const headers=this.getHeaders();
    return this.http.delete<IJsonResponse>(`${this.baseURL}deleteAddress/${id}`, { headers });
  }


  editAddress(id: number, obj: IAddress): Observable<IJsonResponse> {
    const headers=this.getHeaders();
    return this.http.put<IJsonResponse>(`${this.baseURL}editAddress/${id}`, obj, { headers });
  }
}
