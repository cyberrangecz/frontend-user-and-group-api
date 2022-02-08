import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentinelFilter, PaginatedResource, SentinelParamsMerger, OffsetPaginationEvent } from '@sentinel/common';
import { Microservice } from '@muni-kypo-crp/user-and-group-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MicroserviceCreateDTO } from '../../DTO/microservice/microservice-create-dto.model';
import { MicroserviceDTO } from '../../DTO/microservice/microservice-dto';
import { RestResourceDTO } from '../../DTO/rest-resource-dto.model';
import { MicroserviceMapper } from '../../mappers/microservice.mapper';
import { KypoUserAndGroupApiConfig } from '../../other/kypo-user-and-group-api-config';
import { KypoUserAndGroupContext } from '../../other/kypo-user-and-group.context.service';
import { FilterParams } from '../../utils/filter-params';
import { PaginationHttpParams } from '../../utils/pagination-http-params';
import { MicroserviceApi } from './microservice-api.service';

/**
 * Implementation of http communication with microservice endpoints.
 */
@Injectable()
export class MicroserviceDefaultApi extends MicroserviceApi {
  private readonly config: KypoUserAndGroupApiConfig;

  constructor(private http: HttpClient, private context: KypoUserAndGroupContext) {
    super();
    this.config = this.context.config;
  }

  /**
   * Creates new microservice
   * @param microservice microservice to be created
   */
  create(microservice: Microservice): Observable<any> {
    return this.http.post<MicroserviceCreateDTO>(
      `${this.config.userAndGroupRestBasePath}microservices`,
      JSON.stringify(MicroserviceMapper.mapMicroserviceToMicroserviceCreateDTO(microservice)),
      { headers: this.createDefaultHeaders() }
    );
  }

  private createDefaultHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  /**
   * Sends http request to get paginated microservices
   * @param pagination requested pagination
   * @param filter filter to be applied on microservices
   */
  getAll(pagination: OffsetPaginationEvent, filter?: SentinelFilter[]): Observable<PaginatedResource<Microservice>> {
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filter),
    ]);
    return this.http
      .get<RestResourceDTO<MicroserviceDTO>>(`${this.config.userAndGroupRestBasePath}microservices`, { params })
      .pipe(map((resp) => MicroserviceMapper.mapMicroserviceDTOsToMicroservices(resp)));
  }
}
