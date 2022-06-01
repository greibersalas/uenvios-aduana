import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { DocumentType } from '../../models/documenttype.model';

// Services
import { DocumenttypeDataRequestService } from '../private/documenttype-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class DocumenttypeService {

  constructor(
    private dataRequest: DocumenttypeDataRequestService
  ) { }

  public getAll(): Observable<DocumentType[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new DocumentType().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<DocumentType>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new DocumentType().FromDTO(data))
    );
  }

  public insert(data: DocumentType): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: DocumentType): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}
