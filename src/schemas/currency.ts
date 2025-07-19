import { z } from 'zod';

const currencyFormSchema = z.object({
    amountToSend: z.number({
        required_error: 'Amount number is required'
    }).min(1, 'Amount must be greater than 0'),
    currencyFrom: z.string(),
    currencyTo: z.string(),
});

const currencySchema = z.object({
    currency: z.string(),
    date: z.date(),
    price: z.number(),
})

type CurrencySchema = z.infer<typeof currencySchema>

export {
    currencyFormSchema,
    currencySchema,
    type CurrencySchema,
};
