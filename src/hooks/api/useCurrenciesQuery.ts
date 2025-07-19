import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import {CurrencySchema} from "../../schemas/currency";

const currenciesQueryKey = 'currencies';

const baseUrl = 'https://interview.switcheo.com';

const apiAxiosInstance = axios.create({ baseURL: baseUrl });

function useCurrenciesQuery() {

    // Fetching the dictionary data without token and locale
    const fetchDictionary = async (): Promise<CurrencySchema> => {
        // Perform the request using the configured axios instance without any custom headers
        const response = await apiAxiosInstance.get(`/prices.json`);
        return response.data;
    };

    return useQuery({
        queryKey: [currenciesQueryKey],
        queryFn: fetchDictionary,
    });
}

export {
    useCurrenciesQuery,
};