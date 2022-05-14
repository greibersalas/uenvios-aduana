import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { DoctorModel } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl: string = `${environment.apiUrl}`;
  public dataDoctor: DoctorModel;

  constructor(private http:HttpClient) { }

  get(id:number): Observable<DoctorModel>{
    return this.http.get<DoctorModel>(`${this.baseUrl}/doctor/${id}`);
  }

  getAll(): Observable<DoctorModel[]>{
    return this.http.get<DoctorModel[]>(`${this.baseUrl}/doctor`);
  }

  insert(doctor: DoctorModel): Observable<DoctorModel>{
    return this.http.post<DoctorModel>(`${this.baseUrl}/doctor`,doctor);
  }

  update(doctor: DoctorModel, id: number): Observable<DoctorModel>{
    return this.http.put<DoctorModel>(`${this.baseUrl}/doctor/${id}`,doctor);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/doctor/${id}`)
  }

  /**
   * Lista de doctores por linea de negocio
   * @param id
   * @param day
   * @returns
   */
  getByBl(id: any, day: number): Observable<DoctorModel[]>{
    return this.http.post<DoctorModel[]>(`${this.baseUrl}/doctor/get-in-bl/${day}`,id);
  }
}
