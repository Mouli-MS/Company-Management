import { type User, type InsertUser, type Company, type InsertCompany } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Company CRUD operations
  getCompanies(filters?: {
    search?: string;
    industry?: string;
    country?: string;
    minEmployees?: number;
    maxEmployees?: number;
  }): Promise<Company[]>;
  getCompany(id: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, company: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private companies: Map<string, Company>;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    
    // Initialize with some sample companies for demo
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleCompanies: InsertCompany[] = [
      {
        name: "TechCorp Inc",
        industry: "Technology",
        country: "United States",
        city: "San Francisco",
        employees: 1250,
        description: "Leading software development company specializing in cloud solutions and enterprise applications.",
        logoUrl: null,
      },
      {
        name: "MedHealth Solutions",
        industry: "Healthcare",
        country: "United States", 
        city: "Boston",
        employees: 850,
        description: "Innovative healthcare technology company providing digital solutions for hospitals and clinics worldwide.",
        logoUrl: null,
      },
      {
        name: "FinanceFlow",
        industry: "Finance",
        country: "United States",
        city: "New York",
        employees: 2100,
        description: "Premier financial services company offering innovative investment and wealth management solutions.",
        logoUrl: null,
      },
      {
        name: "ManufacturePro",
        industry: "Manufacturing",
        country: "United States",
        city: "Detroit",
        employees: 3400,
        description: "Advanced manufacturing solutions provider specializing in automotive and aerospace components.",
        logoUrl: null,
      },
    ];

    sampleCompanies.forEach(company => {
      const id = randomUUID();
      const newCompany: Company = { 
        ...company, 
        id,
        description: company.description || null,
        logoUrl: company.logoUrl || null 
      };
      this.companies.set(id, newCompany);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCompanies(filters?: {
    search?: string;
    industry?: string;
    country?: string;
    minEmployees?: number;
    maxEmployees?: number;
  }): Promise<Company[]> {
    let companies = Array.from(this.companies.values());

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        companies = companies.filter(company => 
          company.name.toLowerCase().includes(searchLower) ||
          company.description?.toLowerCase().includes(searchLower)
        );
      }

      if (filters.industry && filters.industry !== "All Industries") {
        companies = companies.filter(company => company.industry === filters.industry);
      }

      if (filters.country && filters.country !== "All Locations") {
        companies = companies.filter(company => company.country === filters.country);
      }

      if (filters.minEmployees !== undefined) {
        companies = companies.filter(company => company.employees >= filters.minEmployees!);
      }

      if (filters.maxEmployees !== undefined) {
        companies = companies.filter(company => company.employees <= filters.maxEmployees!);
      }
    }

    return companies;
  }

  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = { 
      ...insertCompany, 
      id,
      description: insertCompany.description || null,
      logoUrl: insertCompany.logoUrl || null 
    };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: string, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const existingCompany = this.companies.get(id);
    if (!existingCompany) return undefined;

    const updatedCompany: Company = { ...existingCompany, ...updateData };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(id: string): Promise<boolean> {
    return this.companies.delete(id);
  }
}

export const storage = new MemStorage();
