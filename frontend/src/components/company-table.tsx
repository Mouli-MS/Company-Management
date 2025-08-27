import React from "react";
import { ArrowUpDown, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Company } from "@shared/mongo-schema";

interface CompanyTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

const industryColors: Record<string, string> = {
  Technology: "bg-primary/10 text-primary",
  Healthcare: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  Finance: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Manufacturing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Retail: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Education: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  Energy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Transportation: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const industryIcons: Record<string, string> = {
  Technology: "💻",
  Healthcare: "🏥",
  Finance: "📈",
  Manufacturing: "🏭",
  Retail: "🏪",
  Education: "🎓",
  Energy: "⚡",
  Transportation: "🚛",
};

export function CompanyTable({ companies, onEdit, onDelete }: CompanyTableProps) {
  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-6 py-3">
                <div className="flex items-center space-x-2">
                  <span>Company</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="px-6 py-3">
                <div className="flex items-center space-x-2">
                  <span>Industry</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="px-6 py-3">
                <div className="flex items-center space-x-2">
                  <span>Location</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="px-6 py-3">
                <div className="flex items-center space-x-2">
                  <span>Employees</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right px-6 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => {
              const industryColor = industryColors[company.industry] || "bg-gray-100 text-gray-800";
              const industryIcon = industryIcons[company.industry] || "🏢";
              
              return (
                <TableRow 
                  key={company._id} 
                  className="hover:bg-muted/50 transition-colors"
                  data-testid={`row-company-${company._id}`}
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center mr-3 text-sm">
                        {industryIcon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground" data-testid={`text-table-name-${company._id}`}>
                          {company.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {company.name.toLowerCase().replace(/\s+/g, '')}@company.com
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge className={industryColor} data-testid={`badge-table-industry-${company._id}`}>
                      {company.industry}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-muted-foreground" data-testid={`text-table-location-${company._id}`}>
                    {company.city}, {company.country}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-foreground" data-testid={`text-table-employees-${company._id}`}>
                    {company.employees.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        data-testid={`button-table-view-${company._id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onEdit(company)}
                        data-testid={`button-table-edit-${company._id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(company._id)}
                        data-testid={`button-table-delete-${company._id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
