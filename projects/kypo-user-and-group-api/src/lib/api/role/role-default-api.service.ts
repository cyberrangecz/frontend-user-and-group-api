import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SentinelParamsMerger } from '@sentinel/common';
import { PaginatedResource, OffsetPaginationEvent } from '@sentinel/common/pagination';
import { SentinelFilter } from '@sentinel/common/filter';
import { User, UserRole } from '@muni-kypo-crp/user-and-group-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestResourceDTO } from '../../DTO/rest-resource-dto.model';
import { RoleDTO } from '../../DTO/role/role-dto';
import { UserDTO } from '../../DTO/user/user-dto.model';
import { RoleMapper } from '../../mappers/role-mapper';
import { UserMapper } from '../../mappers/user.mapper';
import { KypoUserAndGroupApiConfig } from '../../other/kypo-user-and-group-api-config';
import { KypoUserAndGroupContext } from '../../other/kypo-user-and-group.context.service';
import { FilterParams } from '../../utils/filter-params';
import { PaginationHttpParams } from '../../utils/pagination-http-params';
import { RoleApi } from './role-api.service';

/**
 * Default implementation of service abstracting http communication with roles endpoint
 */
@Injectable()
export class RoleDefaultApi extends RoleApi {
  private readonly config: KypoUserAndGroupApiConfig;
  private readonly rolesPathExtension = 'roles';

  constructor(
    private http: HttpClient,
    private context: KypoUserAndGroupContext,
  ) {
    super();
    this.config = this.context.config;
  }

  /**
   * Sends http request to get paginated roles
   * @param pagination requested pagination
   * @param filters filters to be applied on roles
   */
  getAll(pagination: OffsetPaginationEvent, filters: SentinelFilter[] = []): Observable<PaginatedResource<UserRole>> {
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filters),
    ]);
    return this.http
      .get<RestResourceDTO<RoleDTO>>(`${this.config.userAndGroupRestBasePath}${this.rolesPathExtension}`, { params })
      .pipe(map((resp) => RoleMapper.mapPaginatedRolesDTOtoRoles(resp)));
  }

  /**
   * Sends http request to get role by id
   * @param id id of requested role
   */
  get(id: number): Observable<UserRole> {
    return this.http
      .get<RoleDTO>(`${this.config.userAndGroupRestBasePath}${this.rolesPathExtension}/${id}`)
      .pipe(map((resp) => RoleMapper.mapRoleDTOToRole(resp)));
  }

  /**
   * Sends http request to get all users wit given role id
   * @param id id of requested role
   * @param pagination requested pagination
   * @param filters filters to be applied on roles
   */
  getUsersForRole(
    id: number,
    pagination: OffsetPaginationEvent,
    filters?: SentinelFilter[],
  ): Observable<PaginatedResource<User>> {
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filters),
    ]);
    return this.http
      .get<RestResourceDTO<UserDTO>>(`${this.config.userAndGroupRestBasePath}${this.rolesPathExtension}/${id}/users`, {
        params,
      })
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }

  /**
   * Sends http request to get all users wit given role type
   * @param type type of requested role
   * @param pagination requested pagination
   * @param filters filters to be applied on roles
   */
  getUsersForRoleType(
    type: string,
    pagination: OffsetPaginationEvent,
    filters?: SentinelFilter[],
  ): Observable<PaginatedResource<User>> {
    const typeParam = new HttpParams().set('roleType', type);
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filters),
      typeParam,
    ]);
    return this.http
      .get<RestResourceDTO<UserDTO>>(`${this.config.userAndGroupRestBasePath}${this.rolesPathExtension}/users`, {
        params,
      })
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }

  /**
   * Sends http request to get all users wit given role type and not with given id
   * @param type type of requested role
   * @param ids ids of users to be excluded from result
   * @param pagination requested pagination
   * @param filters filters to be applied on roles
   */
  getUsersNotWithIds(
    type: string,
    ids: number[],
    pagination: OffsetPaginationEvent,
    filters?: SentinelFilter[],
  ): Observable<PaginatedResource<User>> {
    const idParams = new HttpParams().set('ids', ids.toString());
    const typeParam = new HttpParams().set('roleType', type);
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filters),
      idParams,
      typeParam,
    ]);
    return this.http
      .get<
        RestResourceDTO<UserDTO>
      >(`${this.config.userAndGroupRestBasePath}${this.rolesPathExtension}/users-not-with-ids`, { params })
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }
}
