const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()
const stripe = new Stripe("sk_test_51Htl08CkDESmvwU8ckuiRpg7TIyH7KrN5ONw8xH6EntDUEWnlXV5wetvLznll9N60CTCYwjNbTDKuetdGswiTrJO00dg07BEwK")



app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async (req, res) => {

    try { 
        
        const { id, amount } = req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Trovypark",
            payment_method: id,
            confirm: true
        });

        console.log(payment)

        res.send({alert: 'pago confirmado'})
        } catch (error) {
            console.log(error)
            res.json({message:error.raw.message})
        }
});

app.listen(3001, () => {
    console.log('Puerto listo', 3001)
});

