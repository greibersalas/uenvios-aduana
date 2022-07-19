import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeclarationDto } from '../../dtos/declaration-dto';
import { SeriesDto } from '../../dtos/series-dto';

// Models
import { Declaration } from '../../models/declaration.model';
import { Series } from '../../models/series.model';

// Services
import { DeclarationDataRequestService } from '../private/declaration-data-request.service';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {

  constructor(
    private dataRequest: DeclarationDataRequestService
  ) { }

  public getAll(): Observable<Declaration[]>{
    return this.dataRequest.getDataTable().pipe(
      map(data => data.map(dataDto => new Declaration().FromDTO(dataDto)))
    );
  }

  public getOneGeneralData(id:number): Observable<Declaration>{
    return this.dataRequest.getDataOneGeneralData(id).pipe(
      map(data =>  new Declaration().FromDTO(data))
    );
  }

  public getOneSerieData(id:number): Observable<Series>{
    return this.dataRequest.getDataOneSerieData(id).pipe(
      map(data =>  new Series().FromDTO(data))
    );
  }

  public insert(data: Declaration): Observable<Response>{
    return this.dataRequest.insert(data.ToDTO());
  }

  public insertDataGeneral(data: Declaration): Observable<DeclarationDto>{
    return this.dataRequest.insertDataGeneral(data.ToDTO());
  }

  public insertDataSerie(data: Series): Observable<Response>{
    return this.dataRequest.insertDataSerie(data.ToDTO());
  }

  public update(id:number,data: Declaration): Observable<Response>{
    return this.dataRequest.update(id,data.ToDTO());
  }

  public updateDataGeneral(id:number,data: Declaration): Observable<Response>{
    return this.dataRequest.updateDataGeneral(id,data.ToDTO());
  }

  public updateDataSerie(id:number,data: Series): Observable<Response>{
    return this.dataRequest.updateDataSerie(id,data.ToDTO());
  }

  public delete(id: number): Observable<Response>{
    return this.dataRequest.delete(id);
  }

  public deleteDataGeneral(id: number): Observable<Response>{
    return this.dataRequest.deleteDataGenereal(id);
  }
  public deleteDataSerie(id: number): Observable<Response>{
    return this.dataRequest.deleteDataSerie(id);
  }
}