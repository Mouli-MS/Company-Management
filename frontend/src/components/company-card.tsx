import React from "react";
import { MapPin, Users, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Company } from "@/lib/types";

interface CompanyCardProps {
  company: Company;
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

export function CompanyCard({ company, onEdit, onDelete }: CompanyCardProps) {
  const industryColor = industryColors[company.industry] || "bg-gray-100 text-gray-800";
  const industryIcon = industryIcons[company.industry] || "🏢";

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-lg">
              {industryIcon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground" data-testid={`text-company-name-${company._id}`}>
                {company.name}
              </h3>
              <p className="text-sm text-muted-foreground" data-testid={`text-company-industry-${company._id}`}>
                {company.industry}
              </p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onEdit(company)}
              data-testid={`button-edit-${company._id}`}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(company._id)}
              data-testid={`button-delete-${company._id}`}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground" data-testid={`text-company-location-${company._id}`}>
              {company.city}, {company.country}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-muted-foreground" data-testid={`text-company-employees-${company._id}`}>
              {company.employees.toLocaleString()} employees
            </span>
          </div>
        </div>
        
        {company.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`text-company-description-${company._id}`}>
            {company.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <Badge className={industryColor} data-testid={`badge-industry-${company._id}`}>
            {company.industry}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            data-testid={`button-view-details-${company._id}`}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
