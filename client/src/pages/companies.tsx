import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { FilterPanel } from "@/components/filter-panel";
import { CompanyCard } from "@/components/company-card";
import { CompanyTable } from "@/components/company-table";
import { CompanyForm } from "@/components/company-form";
import { apiRequest } from "@/lib/queryClient";
import type { Company, InsertCompany } from "@shared/schema";
import type { CompanyFilters, ViewMode, PaginationState } from "@/lib/types";

const ITEMS_PER_PAGE = 12;

export default function CompaniesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [filters, setFilters] = useState<CompanyFilters>({
    search: "",
    industry: "All Industries",
    country: "All Locations",
    minEmployees: "",
    maxEmployees: "",
  });
  
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>();
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  // Debounced filters for API calls
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    }, 300);

    return () => clearTimeout(timer);
  }, [filters]);

  // Build query parameters
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    
    if (debouncedFilters.search) params.append("search", debouncedFilters.search);
    if (debouncedFilters.industry !== "All Industries") params.append("industry", debouncedFilters.industry);
    if (debouncedFilters.country !== "All Locations") params.append("country", debouncedFilters.country);
    if (debouncedFilters.minEmployees) params.append("minEmployees", debouncedFilters.minEmployees);
    if (debouncedFilters.maxEmployees) params.append("maxEmployees", debouncedFilters.maxEmployees);
    
    return params.toString();
  }, [debouncedFilters]);

  // Fetch companies
  const { data: allCompanies = [], isLoading, error } = useQuery<Company[]>({
    queryKey: ["/api/companies", queryParams],
    queryFn: async () => {
      const url = queryParams ? `/api/companies?${queryParams}` : "/api/companies";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      return response.json();
    },
  });

  // Calculate pagination values directly without state updates
  const totalPages = Math.ceil(allCompanies.length / ITEMS_PER_PAGE);
  const totalItems = allCompanies.length;

  // Client-side pagination
  const paginatedCompanies = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allCompanies.slice(startIndex, endIndex);
  }, [allCompanies, pagination.currentPage]);

  // Create company mutation
  const createMutation = useMutation({
    mutationFn: async (data: InsertCompany) => {
      const response = await apiRequest("POST", "/api/companies", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
      setIsFormOpen(false);
      setEditingCompany(undefined);
      toast({
        title: "Success",
        description: "Company created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create company. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update company mutation
  const updateMutation = useMutation({
    mutationFn: async (data: InsertCompany) => {
      if (!editingCompany) throw new Error("No company to update");
      const response = await apiRequest("PUT", `/api/companies/${editingCompany.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
      setIsFormOpen(false);
      setEditingCompany(undefined);
      toast({
        title: "Success",
        description: "Company updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update company. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete company mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/companies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
      toast({
        title: "Success",
        description: "Company deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete company. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (data: InsertCompany) => {
    if (editingCompany) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      industry: "All Industries",
      country: "All Locations",
      minEmployees: "",
      maxEmployees: "",
    });
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Companies</h2>
            <p className="text-muted-foreground">Failed to load company data. Please try again later.</p>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Companies</h1>
              <p className="text-muted-foreground">Manage your company database</p>
            </div>
            <Button 
              onClick={() => {
                setEditingCompany(undefined);
                setIsFormOpen(true);
              }}
              className="mt-4 sm:mt-0 flex items-center space-x-2"
              data-testid="button-add-company"
            >
              <Plus className="h-4 w-4" />
              <span>Add Company</span>
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Loading State */}
        {isLoading && (
          <Card className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-foreground font-medium">Loading companies...</span>
            </div>
          </Card>
        )}

        {/* Company List */}
        {!isLoading && paginatedCompanies.length === 0 && (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">No Companies Found</h2>
            <p className="text-muted-foreground mb-4">
              {Object.values(filters).some(filter => filter && filter !== "All Industries" && filter !== "All Locations") 
                ? "No companies match your current filters. Try adjusting your search criteria."
                : "Get started by adding your first company to the database."
              }
            </p>
            <Button 
              onClick={() => {
                setEditingCompany(undefined);
                setIsFormOpen(true);
              }}
              data-testid="button-add-first-company"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Company
            </Button>
          </Card>
        )}

        {/* Card View */}
        {!isLoading && viewMode === "card" && paginatedCompanies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Table View */}
        {!isLoading && viewMode === "table" && paginatedCompanies.length > 0 && (
          <div className="mb-8">
            <CompanyTable
              companies={paginatedCompanies}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(pagination.currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(pagination.currentPage * ITEMS_PER_PAGE, totalItems)}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={pagination.currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      data-testid={`button-page-${pageNumber}`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === totalPages}
                data-testid="button-next-page"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Company Form Modal */}
        <CompanyForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCompany(undefined);
          }}
          onSubmit={handleFormSubmit}
          company={editingCompany}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </main>
    </div>
  );
}
