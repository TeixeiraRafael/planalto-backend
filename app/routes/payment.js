import express from 'express';
import {process_payment} from '../controllers/PaymentController.js';
import {payment} from "../middlewares/validation.js"

export const paymentRoutes = express.Router();

paymentRoutes.post("/payment", payment.paymentValidator, process_payment)

export default paymentRoutes;
