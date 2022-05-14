import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { AttentionCardModel } from '../models/attention-card.model';

@Injectable({
  providedIn: 'root'
})
export class AttentionCardService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getByClinicHistory(id:number): Observable<AttentionCardModel>{
    return this.http.get<AttentionCardModel>(`${this.baseUrl}/attentioncard/history/${id}`);
  }

  getAll(): Observable<AttentionCardModel[]>{
    return this.http.get<AttentionCardModel[]>(`${this.baseUrl}/attentioncard`);
  }

  insert(attentioncard: AttentionCardModel): Observable<AttentionCardModel>{
    return this.http.post<AttentionCardModel>(`${this.baseUrl}/attentioncard`,attentioncard);
  }

  update(attentioncard: AttentionCardModel, id: number): Observable<AttentionCardModel>{
    return this.http.put<AttentionCardModel>(`${this.baseUrl}/attentioncard/${id}`,attentioncard);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/attentioncard/${id}`)
  }

  getPdf(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/attentioncard/pdf/${id}`);
  }

}
