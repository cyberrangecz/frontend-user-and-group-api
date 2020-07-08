import { PaginatedResource } from '@sentinel/common';
import { UserRole } from 'kypo-user-and-group-model';
import { RestResourceDTO } from '../DTO/rest-resource-dto.model';
import { RoleDTO } from '../DTO/role/role-dto';
import { PaginationMapper } from './pagination-mapper';

/**
 * @dynamic
 */
export class RoleMapper {
  /**
   * Maps roles DTOs to internal model
   * @param resource roles dto
   */
  static mapPaginatedRolesDTOtoRoles(resource: RestResourceDTO<RoleDTO>): PaginatedResource<UserRole> {
    const content = this.mapRoleDTOsToRoles(resource.content);
    const pagination = PaginationMapper.mapDTOToPagination(resource.pagination);
    return new PaginatedResource(content, pagination);
  }

  static mapRoleDTOsToRoles(dtos: RoleDTO[]): UserRole[] {
    return dtos.map((dto) => this.mapRoleDTOToRole(dto));
  }

  static mapRoleDTOToRole(dto: RoleDTO): UserRole {
    const role = new UserRole();
    role.id = dto.id;
    role.microserviceId = dto.id_of_microservice;
    role.microserviceName = dto.name_of_microservice;
    role.roleType = dto.role_type;
    role.description = dto.description ? dto.description : '';
    return role;
  }
}
