import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertCompanySchema } from "@shared/schema";
import type { Company, InsertCompany } from "@shared/schema";

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InsertCompany) => void;
  company?: Company;
  isLoading: boolean;
}

const industries = [
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
  "United States",
  "United Kingdom", 
  "Canada",
  "Germany",
  "France",
  "Japan",
  "Australia"
];

export function CompanyForm({ isOpen, onClose, onSubmit, company, isLoading }: CompanyFormProps) {
  const form = useForm<InsertCompany>({
    resolver: zodResolver(insertCompanySchema),
    defaultValues: {
      name: company?.name || "",
      industry: company?.industry || "",
      country: company?.country || "",
      city: company?.city || "",
      employees: company?.employees || 1,
      description: company?.description || "",
      logoUrl: company?.logoUrl || "",
    },
  });

  const handleSubmit = (data: InsertCompany) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            {company ? "Edit Company" : "Add New Company"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Company Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter company name" 
                      {...field} 
                      data-testid="input-company-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Industry */}
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-industry-form">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-country-form">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter city" 
                        {...field} 
                        data-testid="input-city"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Employee Size */}
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="e.g., 500"
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      data-testid="input-employees"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      rows={4}
                      placeholder="Brief description of the company..."
                      className="resize-none"
                      {...field}
                      value={field.value || ""}
                      data-testid="textarea-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Logo Upload */}
            <div>
              <Label className="block text-sm font-medium text-foreground mb-2">
                Company Logo
              </Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-ring transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drop your logo here or click to browse
                  </p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    id="logo-upload"
                    data-testid="input-logo-upload"
                  />
                  <Button 
                    type="button" 
                    variant="ghost"
                    className="text-primary hover:text-primary/80"
                    onClick={() => document.getElementById('logo-upload')?.click()}
                    data-testid="button-browse-files"
                  >
                    Browse Files
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
              <Button 
                type="button" 
                variant="outline"
                onClick={onClose}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex items-center space-x-2"
                data-testid="button-save"
              >
                <Save className="h-4 w-4" />
                <span>{isLoading ? "Saving..." : "Save Company"}</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
