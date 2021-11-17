import mercadopago from 'mercadopago'
import dotenv from 'dotenv/config';

import { Reservation } from '../models/index.js';

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN)

export const process_payment = (req, res) => {
    var payment_data = {
        transaction_amount: 100,
        description: 'Título do produto',
        payment_method_id: 'pix',
        payer: {
            email: req.body.payerEmail,
            first_name: req.body.payerFirstName,
            last_name: req.body.payerLastName,
            identification: {
                type: req.body.docType,
                number: req.body.docNumber
            },
            address:  {
                zip_code: '06233200',
                street_name: 'Av. das Nações Unidas',
                street_number: '3003',
                neighborhood: 'Bonfim',
                city: 'Osasco',
                federal_unit: 'SP'
            }
        }
    }
    var pag = mercadopago.payment.create(payment_data).then(function (data) {
        const qr_code_base64 = data["response"]["point_of_interaction"]["transaction_data"]["qr_code_base64"]
        // res.render("pagamentos/qr_code", {qr_code_base64: qr_code_base64})
        
        res.status(200).send({qr_code_base64})
    }).catch(function (error) {
        console.log("erro de pagamento: "+ error);
    });
}

export const paymentConfirmation = (req, res) => {
    console.log(req)
    const id = req.body.data.id
    mercadopago.payment.findById(id)
    .then((data) => {
        if (data["body"]["status"] == "approved"  || data["body"]["status_detail"] == "approved" || data["body"]["status"] == "accredited" || data["body"]["status_detail"] == "accredited") {
            Reservation.findOne({
                where: {
                    id: req.params.id,
                    transaction_id: data.body.data.id,
                    deleted_at: null,
                }
            }).then((reservation) => {
                reservation.approved = true
                reservation.save()
                .then((updatedReservation) => {
                    res.status(200).send();
                })
            }).catch((err) => {
                res.status(500).send({
                    success: false,
                    message: "Internal Server Error."
                })
            })
        }
    })
    .catch( (error) => {
        console.log("erro ao receber pagamento: " + error)
    })
}

export default process_payment;