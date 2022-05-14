import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MedicalActModel } from '../../models/main/medical-act.model';
import { FileGroupModel } from 'src/app/models/mat/files-group.model';
import { FilesModel } from '../../models/mat/files-medical-act.model';

@Injectable({
  providedIn: 'root'
})
export class MedialAttentionService {

  public idmedicalact: number = 0;
  public idclinichistory: number = 0;
  private baseUrl: string = `${environment.apiUrl}/`;

  constructor(private http:HttpClient) { }

  insert(data: MedicalActModel): Observable<MedicalActModel>{
    return this.http.post<MedicalActModel>(`${this.baseUrl}medical-act`,data);
  }

  update(ma: MedicalActModel, id: number): Observable<MedicalActModel>{
    return this.http.put<MedicalActModel>(`${this.baseUrl}medical-act/${id}`,ma);
  }

  getMedialAct(id: number): Observable<MedicalActModel>{
    return this.http.get<MedicalActModel>(`${this.baseUrl}medical-act/${id}`)
  }

  getMedialActByReservation(id: number): Observable<MedicalActModel>{
    return this.http.get<MedicalActModel>(`${this.baseUrl}medical-act/get-by-reservation/${id}`)
  }

  getMedialActByClinicHistory(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}medical-act/get-by-clinic-history/${id}`)
  }

  uploadFile(idgroup: number, idmedicalact: number, file:File, description: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file',file,file.name);
    formData.append('description',description);
    return this.http.post<any>(`${this.baseUrl}medical-act/upload/${idgroup}/${idmedicalact}`,formData);
  }

  uploadFileFromClinicHistory(idgroup: number, idhistoryclinic: number, file:File, description: string): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file',file,file.name);
    formData.append('description',description);
    return this.http.post<any>(`${this.baseUrl}medical-act/upload/hc/${idgroup}/${idhistoryclinic}`,formData);
  }

  downloadFile(file: string): Observable<Blob>{
    return this.http.get<Blob>(`${this.baseUrl}medical-act/get-file/${file}`);
  }

  deleteFile(id: number): Observable<boolean>{
    return this.http.delete<boolean>(`${this.baseUrl}medical-act/delete-file/${id}`);
  }

  getFileGroup(): Observable<FileGroupModel[]>{
    return this.http.get<FileGroupModel[]>(`${this.baseUrl}medical-act/groups/all`);
  }

  getFilesByClinicHistory(id: number, idgroup: number): Observable<FilesModel[]>{
    return this.http.get<FilesModel[]>(`${this.baseUrl}medical-act/get-files-clinichistory/${id}/${idgroup}`);
  }

  getFilesByMedicalAct(id: number): Observable<FilesModel[]>{
    return this.http.get<FilesModel[]>(`${this.baseUrl}medical-act/get-files-medical-act/${id}`);
  }

  getQuantityFiles(id: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}medical-act/get-files-quantity/${id}`);
  }

}
