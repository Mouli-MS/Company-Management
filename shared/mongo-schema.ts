import mongoose, { Document, Schema } from 'mongoose';
import { z } from "zod";

// User Schema
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

// Company Schema
export interface ICompany extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  industry: string;
  country: string;
  city: string;
  employees: number;
  description?: string;
  logoUrl?: string;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  employees: { type: Number, required: true },
  description: { type: String },
  logoUrl: { type: String },
}, {
  timestamps: true
});

// Create models
export const User = mongoose.model<IUser>('User', userSchema);
export const Company = mongoose.model<ICompany>('Company', companySchema);

// Zod schemas for validation
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  employees: z.number().min(1, "Number of employees must be at least 1"),
  description: z.string().optional(),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type User = IUser;
export type Company = ICompany;
