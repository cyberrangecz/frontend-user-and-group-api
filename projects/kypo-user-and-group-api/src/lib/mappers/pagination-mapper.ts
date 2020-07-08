import { SentinelPagination } from '@sentinel/common';
import { PaginationDTO } from '../DTO/pagination-dto.model';

/**
 * @dynamic
 */
export class PaginationMapper {
  static mapDTOToPagination(paginationDTO: PaginationDTO): SentinelPagination {
    return new SentinelPagination(
      paginationDTO.number,
      paginationDTO.number_of_elements,
      paginationDTO.size,
      paginationDTO.total_elements,
      paginationDTO.total_pages
    );
  }
}
