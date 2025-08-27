export interface CompanyFilters {
  search: string;
  industry: string;
  country: string;
  minEmployees: string;
  maxEmployees: string;
}

export type ViewMode = "card" | "table";

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
