import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { BracketModel } from '../../models/mat/bracket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BracketsService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<BracketModel[]>{
    return this.http.get<BracketModel[]>(`${this.baseUrl}/brackets`);
  }
}
