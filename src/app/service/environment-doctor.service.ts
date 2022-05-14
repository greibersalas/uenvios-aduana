import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnvironmentDoctorModel } from '../models/environment-doctor.model';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentDoctorService {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  get(id: number): Observable<EnvironmentDoctorModel>{
    return this.http.get<EnvironmentDoctorModel>(`${this.baseUrl}/environment-doctor/${id}`);
  }

  getAll(): Observable<EnvironmentDoctorModel[]>{
    return this.http.get<EnvironmentDoctorModel[]>(`${this.baseUrl}/environment-doctor`);
  }

  getByCampus(): Observable<EnvironmentDoctorModel[]>{
    const idcampus = sessionStorage.getItem('idcampus');
    return this.http.get<EnvironmentDoctorModel[]>(`${this.baseUrl}/environment-doctor/campus/${idcampus}`);
  }

  insert(environmentDoctor: EnvironmentDoctorModel): Observable<EnvironmentDoctorModel>{
    return this.http.post<EnvironmentDoctorModel>(`${this.baseUrl}/environment-doctor`, environmentDoctor);
  }

  update(environmentDoctor: EnvironmentDoctorModel, id: number): Observable<EnvironmentDoctorModel>{
    return this.http.put<EnvironmentDoctorModel>(`${this.baseUrl}/environment-doctor/${id}`, environmentDoctor);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/environment-doctor/${id}`);
  }

  getProgrammingDay(date: string, campus: number, doctor: number, patient: number, state: number): Observable<any>{
    doctor = doctor === null ? 0 : doctor;
    patient = patient === null ? 0 : patient;
    state = state === null ? 0 : state;
    return this.http.get<any>(`${this.baseUrl}/environment-doctor/programmin-day/${date}/${campus}/${doctor}/${patient}/${state}`);
  }
}
