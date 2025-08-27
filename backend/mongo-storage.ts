import { type User, type InsertUser, type Company, type InsertCompany, User as UserModel, Company as CompanyModel } from "@shared/mongo-schema";

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

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    try {
      return await UserModel.findById(id).exec();
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      return await UserModel.findOne({ username }).exec();
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = new UserModel(insertUser);
    return await user.save();
  }

  async getCompanies(filters?: {
    search?: string;
    industry?: string;
    country?: string;
    minEmployees?: number;
    maxEmployees?: number;
  }): Promise<Company[]> {
    try {
      let query = CompanyModel.find();

      if (filters) {
        if (filters.search) {
          const searchRegex = new RegExp(filters.search, 'i');
          query = query.or([
            { name: searchRegex },
            { description: searchRegex }
          ]);
        }

        if (filters.industry && filters.industry !== "All Industries") {
          query = query.where('industry', filters.industry);
        }

        if (filters.country && filters.country !== "All Locations") {
          query = query.where('country', filters.country);
        }

        if (filters.minEmployees !== undefined) {
          query = query.where('employees').gte(filters.minEmployees);
        }

        if (filters.maxEmployees !== undefined) {
          query = query.where('employees').lte(filters.maxEmployees);
        }
      }

      return await query.exec();
    } catch (error) {
      console.error('Error getting companies:', error);
      return [];
    }
  }

  async getCompany(id: string): Promise<Company | undefined> {
    try {
      return await CompanyModel.findById(id).exec();
    } catch (error) {
      console.error('Error getting company by ID:', error);
      return undefined;
    }
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const company = new CompanyModel(insertCompany);
    return await company.save();
  }

  async updateCompany(id: string, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    try {
      return await CompanyModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    } catch (error) {
      console.error('Error updating company:', error);
      return undefined;
    }
  }

  async deleteCompany(id: string): Promise<boolean> {
    try {
      const result = await CompanyModel.findByIdAndDelete(id).exec();
      return result !== null;
    } catch (error) {
      console.error('Error deleting company:', error);
      return false;
    }
  }
}

export const storage = new MongoStorage();
