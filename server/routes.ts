import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCompanySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all companies with optional filters
  app.get("/api/companies", async (req, res) => {
    try {
      const { search, industry, country, minEmployees, maxEmployees } = req.query;
      
      const filters = {
        search: search as string,
        industry: industry as string,
        country: country as string,
        minEmployees: minEmployees ? parseInt(minEmployees as string) : undefined,
        maxEmployees: maxEmployees ? parseInt(maxEmployees as string) : undefined,
      };

      const companies = await storage.getCompanies(filters);
      res.json(companies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch companies" });
    }
  });

  // Get single company by ID
  app.get("/api/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const company = await storage.getCompany(id);
      
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch company" });
    }
  });

  // Create new company
  app.post("/api/companies", async (req, res) => {
    try {
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid company data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create company" });
    }
  });

  // Update company
  app.put("/api/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertCompanySchema.partial().parse(req.body);
      
      const company = await storage.updateCompany(id, validatedData);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.json(company);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid company data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update company" });
    }
  });

  // Delete company
  app.delete("/api/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteCompany(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Company not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete company" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
