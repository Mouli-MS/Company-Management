import { Request, Response } from 'express';
import { storage } from '../mongo-storage';
import { insertCompanySchema } from '@shared/mongo-schema';
import { z } from 'zod';

export async function getCompanies(req: Request, res: Response) {
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
    const serialize = (c: any) => {
      const obj = c && typeof c.toObject === 'function' ? c.toObject() : c;
      return { ...obj, _id: String(obj._id) };
    };

    res.json(companies.map(serialize));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch companies' });
  }
}

export async function getCompany(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const company = await storage.getCompany(id);

    if (!company) return res.status(404).json({ message: 'Company not found' });

    const obj = (typeof company.toObject === 'function') ? company.toObject() : company;
    res.json({ ...obj, _id: String((company as any)._id) });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch company' });
  }
}

export async function createCompany(req: Request, res: Response) {
  try {
    const validatedData = insertCompanySchema.parse(req.body);
    const company = await storage.createCompany(validatedData);
    const obj = (typeof company.toObject === 'function') ? company.toObject() : company;
    res.status(201).json({ ...obj, _id: String((company as any)._id) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid company data', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to create company' });
  }
}

export async function updateCompany(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const validatedData = insertCompanySchema.partial().parse(req.body);
    const company = await storage.updateCompany(id, validatedData);

    if (!company) return res.status(404).json({ message: 'Company not found' });

    const obj = (typeof company.toObject === 'function') ? company.toObject() : company;
    res.json({ ...obj, _id: String((company as any)._id) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid company data', errors: error.errors });
    }
    res.status(500).json({ message: 'Failed to update company' });
  }
}

export async function deleteCompany(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await storage.deleteCompany(id);

    if (!deleted) return res.status(404).json({ message: 'Company not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete company' });
  }
}
