import React from "react";
import { Search, RotateCcw, Grid3X3, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import type { CompanyFilters, ViewMode } from "@/lib/types";

interface FilterPanelProps {
  filters: CompanyFilters;
  onFiltersChange: (filters: CompanyFilters) => void;
  onClearFilters: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const industries = [
  "All Industries",
  "Technology",
  "Finance", 
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Energy",
  "Transportation"
];

const countries = [
  "All Locations",
  "India",
  "Hyderabad",
  "Chennai",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
  "Vadodara",
  "Bhopal",
  "Indore",
  "Bengaluru",
  "Mysore",
  "Tamil Nadu",
  "Kerala",
  "Andhra Pradesh",
  "Telangana",
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
  "Madhya Pradesh",
  "Chhattisgarh",
  "Odisha",
  "United States",
  "United Kingdom", 
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia"
];

export function FilterPanel({
  filters,
  onFiltersChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
}: FilterPanelProps) {
  const updateFilter = (key: keyof CompanyFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Label className="block text-sm font-medium text-foreground mb-2">
            Search Companies
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              data-testid="input-search"
            />
          </div>
        </div>
        
        {/* Industry Filter */}
        <div>
          <Label className="block text-sm font-medium text-foreground mb-2">
            Industry
          </Label>
          <Select 
            value={filters.industry} 
            onValueChange={(value) => updateFilter("industry", value)}
          >
            <SelectTrigger data-testid="select-industry">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Location Filter */}
        <div>
          <Label className="block text-sm font-medium text-foreground mb-2">
            Location
          </Label>
          <Select 
            value={filters.country} 
            onValueChange={(value) => updateFilter("country", value)}
          >
            <SelectTrigger data-testid="select-country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Employee Size Range */}
        <div className="lg:col-span-2">
          <Label className="block text-sm font-medium text-foreground mb-2">
            Employee Size Range
          </Label>
          <div className="flex items-center space-x-4">
            <Input
              type="number"
              placeholder="Min"
              className="w-20"
              value={filters.minEmployees}
              onChange={(e) => updateFilter("minEmployees", e.target.value)}
              data-testid="input-min-employees"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              className="w-20"
              value={filters.maxEmployees}
              onChange={(e) => updateFilter("maxEmployees", e.target.value)}
              data-testid="input-max-employees"
            />
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-end">
          <div className="flex bg-muted p-1 rounded-lg">
            <Button
              variant={viewMode === "card" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("card")}
              className="flex items-center space-x-1"
              data-testid="button-card-view"
            >
              <Grid3X3 className="h-4 w-4" />
              <span>Cards</span>
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("table")}
              className="flex items-center space-x-1"
              data-testid="button-table-view"
            >
              <Table className="h-4 w-4" />
              <span>Table</span>
            </Button>
          </div>
        </div>
        
        {/* Clear Filters */}
        <div className="flex items-end">
          <Button
            variant="secondary"
            onClick={onClearFilters}
            className="w-full flex items-center space-x-2"
            data-testid="button-clear-filters"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear Filters</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
