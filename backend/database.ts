import mongoose from 'mongoose';
import { Company } from '@shared/mongo-schema';
import { sampleCompanies } from './sample-data';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/company-management';

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
    
    // Initialize sample data if the collection is empty
    await initializeSampleData();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function initializeSampleData() {
  try {
    const count = await Company.countDocuments();
    
    if (count === 0) {
      await Company.insertMany(sampleCompanies);
      console.log('Sample data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}
