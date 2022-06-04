import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { ImporterRisk } from '../../models/importer-risk.model';

// Services
import { ImporterRiskDataRequestService } from '../private/importer-risk-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class ImporterRiskService {

  constructor(
    private dataRequest: ImporterRiskDataRequestService
  ) { }

  public getAll(): Observable<ImporterRisk[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new ImporterRisk().FromDTO(dataDto)))
    );
  }

  public getOne(id:number): Observable<ImporterRisk>{
    return this.dataRequest.getDataOne(id).pipe(
      map(data =>  new ImporterRisk().FromDTO(data))
    );
  }

  public insert(data: ImporterRisk): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public update(id:number,data: ImporterRisk): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }
}