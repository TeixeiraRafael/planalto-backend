import mercadopago from 'mercadopago'
import dotenv from 'dotenv/config';
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

export default process_payment;