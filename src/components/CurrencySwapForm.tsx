import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Input,
  Flex,
  Field,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import '../index.css';

import ampLUNA from '../assets/tokens/ampLUNA.svg';
import BLUR from '../assets/tokens/BLUR.svg';
import bNEO from '../assets/tokens/bNEO.svg';
import BUSD from '../assets/tokens/BUSD.svg';
import USD from '../assets/tokens/USD.svg';
import ETH from '../assets/tokens/ETH.svg';
import GMX from '../assets/tokens/GMX.svg';
import LUNA from '../assets/tokens/LUNA.svg';
import STRD from '../assets/tokens/STRD.svg';
import EVMOS from '../assets/tokens/EVMOS.svg';
import IBCX from '../assets/tokens/IBCX.svg';
import IRIS from '../assets/tokens/IRIS.svg';
import KUJI from '../assets/tokens/KUJI.svg';
import axlUSDC from '../assets/tokens/axlUSDC.svg';
import ATOM from '../assets/tokens/ATOM.svg';
import OSMO from '../assets/tokens/OSMO.svg';
import LSI from '../assets/tokens/LSI.svg';
import OKB from '../assets/tokens/OKB.svg';
import OKT from '../assets/tokens/OKT.svg';
import SWTH from '../assets/tokens/SWTH.svg';
import USC from '../assets/tokens/USC.svg';
import USDC from '../assets/tokens/USDC.svg';
import WBTC from '../assets/tokens/WBTC.svg';
import YieldUSD from '../assets/tokens/YieldUSD.svg';
import ZIL from '../assets/tokens/ZIL.svg';
import Currency from '../assets/Currency.svg';
import Swap from '../assets/Swap.svg';
import currencyExchange from '../assets/currency-exchange.jpg';
import CustomSelect from './CustomSelect';
import { currencyFormSchema } from '../schemas/currency';

import CustomErrorLabel from './CustomError';
import useCurrenciesQuery from '../hooks/api/useCurrenciesQuery';

type CurrencyItem = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

const currencyList: CurrencyItem[] = [
  { label: 'BLUR', value: 'BLUR', icon: <img src={BLUR} alt="BLUR" /> },
  { label: 'bNEO', value: 'bNEO', icon: <img src={bNEO} alt="bNEO" /> },
  { label: 'BUSD', value: 'BUSD', icon: <img src={BUSD} alt="BUSD" /> },
  { label: 'USD', value: 'USD', icon: <img src={USD} alt="USD" /> },
  { label: 'ETH', value: 'ETH', icon: <img src={ETH} alt="ETH" /> },
  { label: 'GMX', value: 'GMX', icon: <img src={GMX} alt="GMX" /> },
  {
    label: 'STEVMOS',
    value: 'STEVMOS',
    icon: <img src={BLUR} alt="STEVMOS" />,
  },
  { label: 'LUNA', value: 'LUNA', icon: <img src={LUNA} alt="LUNA" /> },
  { label: 'RATOM', value: 'RATOM', icon: <img src={BLUR} alt="RATOM" /> },
  { label: 'STRD', value: 'STRD', icon: <img src={STRD} alt="STRD" /> },
  { label: 'EVMOS', value: 'EVMOS', icon: <img src={EVMOS} alt="EVMOS" /> },
  { label: 'IBCX', value: 'IBCX', icon: <img src={IBCX} alt="IBCX" /> },
  { label: 'IRIS', value: 'IRIS', icon: <img src={IRIS} alt="IRIS" /> },
  {
    label: 'ampLUNA',
    value: 'ampLUNA',
    icon: <img src={ampLUNA} alt="ampLUNA" />,
  },
  { label: 'KUJI', value: 'KUJI', icon: <img src={KUJI} alt="KUJI" /> },
  { label: 'STOSMO', value: 'STOSMO', icon: <img src={BLUR} alt="STOSMO" /> },
  { label: 'USDC', value: 'USDC', icon: <img src={USDC} alt="USDC" /> },
  {
    label: 'axlUSDC',
    value: 'axlUSDC',
    icon: <img src={axlUSDC} alt="axlUSDC" />,
  },
  { label: 'ATOM', value: 'ATOM', icon: <img src={ATOM} alt="ATOM" /> },
  { label: 'STATOM', value: 'STATOM', icon: <img src={BLUR} alt="STATOM" /> },
  { label: 'OSMO', value: 'OSMO', icon: <img src={OSMO} alt="OSMO" /> },
  { label: 'rSWTH', value: 'rSWTH', icon: <img src={BLUR} alt="rSWTH" /> },
  { label: 'STLUNA', value: 'STLUNA', icon: <img src={BLUR} alt="STLUNA" /> },
  { label: 'LSI', value: 'LSI', icon: <img src={LSI} alt="LSI" /> },
  { label: 'OKB', value: 'OKB', icon: <img src={OKB} alt="OKB" /> },
  { label: 'OKT', value: 'OKT', icon: <img src={OKT} alt="OKT" /> },
  { label: 'SWTH', value: 'SWTH', icon: <img src={SWTH} alt="SWTH" /> },
  { label: 'USC', value: 'USC', icon: <img src={USC} alt="USC" /> },
  { label: 'WBTC', value: 'WBTC', icon: <img src={WBTC} alt="WBTC" /> },
  { label: 'wstETH', value: 'wstETH', icon: <img src={BLUR} alt="wstETH" /> },
  {
    label: 'YieldUSD',
    value: 'YieldUSD',
    icon: <img src={YieldUSD} alt="YieldUSD" />,
  },
  { label: 'ZIL', value: 'ZIL', icon: <img src={ZIL} alt="ZIL" /> },
];

export default function CurrencySwapForm() {
  const { data: currenciesData = [] } = useCurrenciesQuery();
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currenciesRecord: Record<string, number> = useMemo(() => {
    return currenciesData.reduce<Record<string, number>>((acc, item) => {
      acc[item.currency.toLowerCase()] = item.price;
      return acc;
    }, {});
  }, [currenciesData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amountToSend: 0,
      currencyFrom: currencyList[0].value,
      currencyTo: currencyList[1].value,
    },
    validationSchema: toFormikValidationSchema(currencyFormSchema),
    onSubmit: async (values) => {
      setIsLoading(true);

      // NOTE: It is assumed that each currency's price is in USD
      const fromPrice = currenciesRecord[values.currencyFrom.toLowerCase()];
      const toPrice = currenciesRecord[values.currencyTo.toLowerCase()];

      // Handle missing prices gracefully
      if (!fromPrice || !toPrice) {
        setResult('Conversion rate not available for selected currencies.');
        setIsLoading(false);
        return;
      }

      // Convert using USD intermediary:
      // amount_in_toCurrency = (amount_in_fromCurrency * fromPrice) / toPrice
      const converted = (values.amountToSend * fromPrice) / toPrice;

      setTimeout(() => {
        setResult(
          `${values.amountToSend} ${values.currencyFrom} = <span style="color:#570d0d; font-weight:bold; font-size: 25px">${converted.toFixed(6)}</span> ${values.currencyTo}`
        );

        setIsLoading(false);
      }, 1000);
    },
  });

  const toggleCurrency = () => {
    const tempCurrencyFrom = formik.values.currencyFrom;
    const tempCurrencyTo = formik.values.currencyTo;

    // Swap the values
    formik.setFieldValue('currencyFrom', tempCurrencyTo);
    formik.setFieldValue('currencyTo', tempCurrencyFrom);
  };

  return (
    <Flex
      height="100vh"
      width="100%"
      style={{
        backgroundImage: `url(${currencyExchange})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Flex
        flexDirection="column"
        maxWidth="700px"
        width="100%"
        margin="auto"
        padding="60px 20px"
        borderRadius="8px"
        boxShadow="lg"
        bg="white"
      >
        <form onSubmit={formik.handleSubmit}>
          <Flex align="center" justify="center">
            <Box pr="20px">
              <h1 className="heading">Currency Exchange</h1>
            </Box>
            <Box width="80px" height="80px">
              <img src={Currency} alt="Currency" />
            </Box>
          </Flex>

          <Field.Root orientation="vertical">
            <Field.Label
              htmlFor="amountToSend"
              fontWeight="bold"
              fontSize="16px"
            >
              Amount
            </Field.Label>

            <Input
              className="input-number"
              id="amountToSend"
              name="amountToSend"
              type="number"
              placeholder="Enter amount"
              value={formik.values.amountToSend}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {/* Error Message */}
            <CustomErrorLabel message={formik.errors.amountToSend} />
          </Field.Root>

          <Flex
            direction="row"
            justify="space-between"
            alignItems="end"
            align="center"
            gap="20px"
          >
            {/* Currency From */}
            <Field.Root orientation="vertical">
              {/* Label */}
              <Field.Label
                htmlFor="currencyFrom"
                fontWeight="bold"
                fontSize="16px"
              >
                From Currency
              </Field.Label>

              <Box width="100%">
                <CustomSelect
                  className="selection"
                  defaultValue={[`${formik.values.currencyFrom}`]}
                  value={[`${formik.values.currencyFrom}`]}
                  items={currencyList}
                  size="md"
                  onChange={(value) =>
                    formik.setFieldValue('currencyFrom', value)
                  }
                />
              </Box>
            </Field.Root>

            {/* Swap Button */}
            <Flex align="center" justify="center" direction="column">
              <IconButton
                aria-label="Search database"
                variant="outline"
                width="40px"
                height="40px"
                onClick={toggleCurrency}
                borderRadius="100%"
              >
                <img src={Swap} alt="Swap" width="25px" height="25px" />
              </IconButton>
            </Flex>

            {/* Currency To */}
            <Field.Root orientation="vertical">
              <Field.Label
                htmlFor="currencyFrom"
                fontWeight="bold"
                fontSize="16px"
              >
                To Currency
              </Field.Label>

              <Box width="100%">
                <CustomSelect
                  className="selection"
                  defaultValue={[`${formik.values.currencyTo}`]}
                  value={[`${formik.values.currencyTo}`]}
                  items={currencyList}
                  size="md"
                  // onChange={(value) => formik.setFieldValue('currencyTo', value)}
                  onChange={(value) =>
                    formik.setFieldValue('currencyTo', value)
                  }
                />
              </Box>
            </Field.Root>
          </Flex>

          {/* Display Result */}
          <Box
            mt="40px"
            padding="15px"
            borderRadius="8px"
            border="1px solid rgb(228, 228, 231)"
            textAlign="center"
          >
            <Box
              fontSize="20px"
              dangerouslySetInnerHTML={{
                __html: result || 'Converted amount will be displayed here.',
              }}
            />
          </Box>

          {/* Custom error label */}
          <CustomErrorLabel message={formik.status} />

          {/* Submit Button */}
          <Field.Root flexDirection="row" justifyContent="end">
            <Button
              borderRadius="9999px"
              fontWeight="bold"
              color="black"
              p="12px 30px"
              bg="#e7b12c"
              type="submit"
              visual="secondary"
              isLoading={formik.isSubmitting}
              loadingText="loading"
            >
              Convert money
              {isLoading && <Spinner size="sm" />}
            </Button>
          </Field.Root>
        </form>
      </Flex>
    </Flex>
  );
}
