import { Router } from 'express';
import * as companyController from '../controllers/companyController';

const router = Router();

router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompany);
router.post('/', companyController.createCompany);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

export default router;
