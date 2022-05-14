import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentsModel } from '../models/documents.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl: string = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  getAll(): Observable<DocumentsModel[]>{
    return this.http.get<DocumentsModel[]>(`${this.baseUrl}/documents`);
  }

  insert(documents: DocumentsModel): Observable<DocumentsModel>{
    return this.http.post<DocumentsModel>(`${this.baseUrl}/documents`,documents);
  }

  update(documents: DocumentsModel, id: number): Observable<DocumentsModel>{
    return this.http.put<DocumentsModel>(`${this.baseUrl}/documents/${id}`,documents);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}/documents/${id}`)
  }
}
