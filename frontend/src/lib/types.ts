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

// Frontend-specific Company type (what we receive from API)
export interface Company {
  _id: string; // API returns _id as string, not ObjectId
  name: string;
  industry: string;
  country: string;
  city: string;
  employees: number;
  description?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}
