import dayjs from 'dayjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Grid, Card, Divider, Container, TextField, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { MARKET_CALL_TYPES } from 'src/enums/index';
import MarketcallService from 'src/services/Marketcall.service';

import PageHeader from 'src/components/pageHeader';
import EnumAutocomplete from 'src/components/AutoComplete/EnumAutoComplete';

function MarketCalForm() {
  const currentDate = dayjs();

  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState('');
  const [marketcallType, setMarketcallType] = useState('');
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [stopLossPrice, setStopLossPrice] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => MarketcallService.post(data),
    onError: (err) => toast.error(err.message),
    onSuccess: () => router.back(),
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !symbol ||
      !quantity ||
      !type ||
      !marketcallType ||
      !buyPrice ||
      !targetPrice ||
      !startDate ||
      !endDate
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }
    const data = {
      stockData: [{ symbol, quantity, type }],
      type: marketcallType,
      buyPrice,
      targetPrice,
    };

    if (marketcallType === 'SHORT_TERM' || marketcallType === 'INTRADAY') {
      data.startDate = startDate.$d;
      data.endDate = endDate.$d;
    }

    if (stopLossPrice) {
      data.stopLossPrice = stopLossPrice;
    }

    mutate(data);
  };

  const renderForm = (
    <form onSubmit={onSubmit}>
      <Box sx={{ flexGrow: 1, px: 3, pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <EnumAutocomplete
              ENUM={['TCS', 'INFY', 'TATA']}
              name="symbol"
              label="Choose Stock"
              placeholder="Choose Stock"
              noLabel
              value={symbol}
              onChange={(_, v) => setSymbol(v)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Stock quantity"
              value={quantity}
              sx={{ width: 1 }}
              type="number"
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <EnumAutocomplete
              ENUM={['SELL', 'BUY']}
              name="type"
              label="Choose Call Type"
              placeholder="Choose Call Type"
              value={type}
              noLabel
              onChange={(_, v) => setType(v)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <EnumAutocomplete
              ENUM={[
                MARKET_CALL_TYPES.INTRADAY,
                MARKET_CALL_TYPES.SHORT_TERM,
                MARKET_CALL_TYPES.LONG_TERM,
              ]}
              name="marketcallType"
              label="Choose Market Call Type"
              placeholder="Choose Market Call Type"
              value={marketcallType}
              noLabel
              onChange={(_, v) => setMarketcallType(v)}
            />
          </Grid>
          {marketcallType === 'SHORT_TERM' && (
            <Grid item xs={12} lg={6}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Start Date"
                  sx={{ width: 1 }}
                  value={startDate}
                  onChange={(sd) => setStartDate(sd)}
                  format="DD/MM/YYYY"
                  required
                />
              </DemoContainer>
            </Grid>
          )}
          {marketcallType === 'INTRADAY' && (
            <Grid item xs={12} lg={6}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label="Start Date Time"
                  sx={{ width: 1 }}
                  value={startDate}
                  onChange={(st) => setStartDate(st)}
                  format="LLL"
                  required
                />
              </DemoContainer>
            </Grid>
          )}
          {marketcallType === 'SHORT_TERM' && (
            <Grid item xs={12} lg={6}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="End Date"
                  sx={{ width: 1 }}
                  value={endDate}
                  onChange={(sd) => setEndDate(sd)}
                  format="DD/MM/YYYY"
                  required
                />
              </DemoContainer>
            </Grid>
          )}
          {marketcallType === 'INTRADAY' && (
            <Grid item xs={12} lg={6}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label="End Date Time"
                  sx={{ width: 1 }}
                  value={endDate}
                  onChange={(st) => setEndDate(st)}
                  format="LLL"
                  required
                />
              </DemoContainer>
            </Grid>
          )}
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Stop Loss Price"
              value={stopLossPrice}
              sx={{ width: 1 }}
              onChange={(e) => setStopLossPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Buy Price"
              value={buyPrice}
              sx={{ width: 1 }}
              onChange={(e) => setBuyPrice(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Target Price"
              value={targetPrice}
              sx={{ width: 1 }}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <LoadingButton
          fullWidth
          loading={isPending}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          sx={{ my: 3 }}
        >
          Submit
        </LoadingButton>
      </Box>
    </form>
  );

  return (
    <Container sx={{ mt: 3 }}>
      <PageHeader title="Market Call " />
      <Card>
        <Typography sx={{ fontWeight: 'bold', p: 3 }}>Add Market Call Form</Typography>
        <Divider />
        <LocalizationProvider dateAdapter={AdapterDayjs}>{renderForm}</LocalizationProvider>
      </Card>
    </Container>
  );
}

export default MarketCalForm;
