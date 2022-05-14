import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EnvironmentDoctorModel } from '../models/environment-doctor.model';
import { ProgramationModel } from '../models/programation.model';
import { FormFilter } from '../pages/programation/form.filter';
import { hours } from '../pages/programation/interface.hours'

@Injectable({
  providedIn: 'root'
})
export class ProgramationService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<ProgramationModel[]>{
    return this.http.get<ProgramationModel[]>(`${this.baseUrl}/reservation`);
  }
  getOne(id:number):Observable<ProgramationModel>{
    return this.http.get<ProgramationModel>(`${this.baseUrl}/reservation/${id}`);
  }

  getEnvironmentAvailible(day:number,month:number,year:number): Observable<EnvironmentDoctorModel[]>{
    return this.http.get<EnvironmentDoctorModel[]>(`${this.baseUrl}/reservation/environments/available/${day}/${month}/${year}`);
  }

  gethoursAvailible(doctor_id:number, environment_id:number, day:number,month:number,year:number): Observable<hours[]>{
    return this.http.get<hours[]>(`${this.baseUrl}/reservation/hours/available/${doctor_id}/${environment_id}/${day}/${month}/${year}`);
  }

  insert(programation: ProgramationModel): Observable<ProgramationModel>{
    return this.http.post<ProgramationModel>(`${this.baseUrl}/reservation`,programation);
  }

  filterReservation(formfilter: FormFilter): Observable<ProgramationModel[]>{
    return this.http.post<ProgramationModel[]>(`${this.baseUrl}/reservation/filter/`,formfilter);
  }

  update(programation: any, id: number): Observable<ProgramationModel>{
    return this.http.put<ProgramationModel>(`${this.baseUrl}/reservation/${id}`,programation);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/reservation/${id}`)
  }

  validateDoctor(iddoctor: number, date: string, appointment: string): Observable<number>{
    const idcampus = sessionStorage.getItem('idcampus');
    return this.http.get<number>(`${this.baseUrl}/reservation/validate-doctor/${iddoctor}/${date}/${appointment}/${idcampus}`);
  }

  cancel(id: number): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/reservation/cancel/${id}`);
  }

  getResumeByCharDay(id:number):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/reservation/enviroments/resumen/day/${id}`);
  }

}
