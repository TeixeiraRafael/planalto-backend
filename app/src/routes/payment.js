import express from 'express';
import { process_payment, paymentConfirmation } from '../controllers/PaymentController.js';
import { payment } from "../middlewares/validation.js"

export const paymentRoutes = express.Router();

paymentRoutes.post("/payment", payment.paymentValidator, process_payment)
paymentRoutes.post("/payment/confirmation/:id", paymentConfirmation)

export default paymentRoutes;
