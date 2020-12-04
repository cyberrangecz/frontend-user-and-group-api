import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResource, SentinelFilter, RequestedPagination, SentinelParamsMerger } from '@sentinel/common';
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
import { UserApi } from './user-api.service';

/**
 * Default implementation of abstracting http communication with user endpoints
 */
@Injectable()
export class UserDefaultApi extends UserApi {
  private readonly config: KypoUserAndGroupApiConfig;
  private readonly usersPathExtension = 'users';

  constructor(private http: HttpClient, private context: KypoUserAndGroupContext) {
    super();
    this.config = this.context.config;
  }

  /**
   * Sends http request to get paginated users
   * @param pagination requested pagination
   * @param filter filter to be applied on users
   */
  getAll(pagination: RequestedPagination, filter: SentinelFilter[] = []): Observable<PaginatedResource<User>> {
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filter),
    ]);
    return this.http
      .get<RestResourceDTO<UserDTO>>(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}`, { params })
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }

  /**
   * Sends http request to get user by id
   * @param id id of requested user
   */
  get(id: number): Observable<User> {
    return this.http
      .get<UserDTO>(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/${id}`)
      .pipe(map((resp) => UserMapper.mapUserDTOToUser(resp)));
  }

  /**
   * Sends http request to delete multiple users
   * @param userIds ids of users to delete
   */
  deleteMultiple(userIds: number[]): Observable<any> {
    return this.http.request('delete', `${this.config.userAndGroupRestBasePath}${this.usersPathExtension}`, {
      body: userIds,
    });
  }

  /**
   * Sends http request to get users that are not members of provided group
   * @param groupId id of a group that has no association with requested users
   * @param pagination requested pagination
   * @param filters filters to be applied on users
   */
  getUsersNotInGroup(
    groupId: number,
    pagination: RequestedPagination,
    filters: SentinelFilter[] = []
  ): Observable<PaginatedResource<User>> {
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filters),
    ]);
    return this.http
      .get<RestResourceDTO<UserDTO>>(
        `${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/not-in-groups/${groupId}`,
        { params }
      )
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }

  /**
   * Sends http request to get users that are members of provided groups
   * @param groupIds ids of a groups that are associated with requested users
   * @param pagination requested pagination
   * @param filters filters to be applied on users
   */
  getUsersInGroups(
    groupIds: number[],
    pagination: RequestedPagination,
    filters: SentinelFilter[] = []
  ): Observable<PaginatedResource<User>> {
    const idParams = new HttpParams().set('ids', groupIds.toString());
    const params = SentinelParamsMerger.merge([
      PaginationHttpParams.createPaginationParams(pagination),
      FilterParams.create(filters),
      idParams,
    ]);
    return this.http
      .get<RestResourceDTO<UserDTO>>(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/groups`, {
        params,
      })
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }

  /**
   * Sends http request to delete user
   * @param userId id of user to delete
   */
  delete(userId: number): Observable<any> {
    return this.http.delete(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/${userId}`);
  }

  /**
   * Sends http request to get roles for given user id
   * @param userId id of user to delete
   */
  getUserRoles(userId: number): Observable<PaginatedResource<UserRole>> {
    return this.http
      .get<RestResourceDTO<RoleDTO>>(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/${userId}`)
      .pipe(map((resp) => RoleMapper.mapPaginatedRolesDTOtoRoles(resp)));
  }

  /**
   * Sends http request to get multiplle users by their ids
   * @param userIds id of users to get
   */
  getUsersByIds(userIds: number): Observable<PaginatedResource<User>> {
    const idParams = new HttpParams().set('ids', userIds.toString());
    return this.http
      .get<RestResourceDTO<UserDTO>>(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/ids`, {
        params: idParams,
      })
      .pipe(map((resp) => UserMapper.mapUserDTOsToUsers(resp)));
  }

  /**
   * Sends http request to get details of user who is logged in
   */
  getUsersInfo(): Observable<User> {
    return this.http
      .get<UserDTO>(`${this.config.userAndGroupRestBasePath}${this.usersPathExtension}/info`)
      .pipe(map((resp) => UserMapper.mapUserDTOToUser(resp)));
  }
}
