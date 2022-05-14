import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {environment} from '../../../environments/environment';
import { DiaryLockModel } from '../../models/main/diary-lock.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryLockService {

  private baseUrl: string = `${environment.apiUrl}/diary-lock`;
  constructor(private http:HttpClient) { }

  getOne(id: number): Observable<DiaryLockModel>{
    return this.http.get<DiaryLockModel>(`${this.baseUrl}/${id}`);
  }

  onGetList(since: string, until: string, doctor: number): Observable<DiaryLockModel[]>{
    const idcampus = sessionStorage.getItem('idcampus');
    return this.http.get<DiaryLockModel[]>(`${this.baseUrl}/list/${idcampus}/${since}/${until}/${doctor}`);
  }

  insert(data: DiaryLockModel): Observable<DiaryLockModel>{
    return this.http.post<DiaryLockModel>(`${this.baseUrl}`,data);
  }

  update(data: DiaryLockModel, id: number): Observable<DiaryLockModel>{
    return this.http.put<DiaryLockModel>(`${this.baseUrl}/${id}`,data);
  }

  delete(id: number, iduser: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/${id}/${iduser}`);
  }
}
