import { useMutation } from '@tanstack/react-query';
import { useConfirm } from 'material-ui-confirm';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRouter } from 'src/routes/hooks';

import cleanObject from 'src/utils/cleanObject';
import { convetToMarketCloseTime, fDateTime } from 'src/utils/format-time';

import { MARKET_CALL_TYPES, MARKET_CALL_TYPES_SERVER } from 'src/enums/index';
import MarketcallService from 'src/services/Marketcall.service';

import EnumAutocomplete from 'src/components/AutoComplete/EnumAutoComplete';
import MarketCallAutoComplete from 'src/components/AutoComplete/MarketCallAutoComplete';
import ImageUploader from 'src/components/ImageUploader/image-uploader';
import Iconify from 'src/components/iconify';
import PageHeader from 'src/components/pageHeader';

const confirmObj = (title, description, confirmationText) => ({
  title: <h3 style={{ margin: 0 }}>{title}</h3>,
  description: <h4 style={{ margin: 0 }}>{description}</h4>,
  cancellationButtonProps: { variant: 'contained', color: 'error' },
  confirmationButtonProps: { variant: 'contained', color: 'success' },
  confirmationText,
});

function MarketCalForm() {
  const confirm = useConfirm();
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [marketcallType, setMarketcallType] = useState('');
  // const [startDate, setStartDate] = useState(currentDate);
  // const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [stopLossPrice, setStopLossPrice] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [image, setImage] = useState('');

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => MarketcallService.post(data),
    onError: (err) => toast.error(err.message),
    onSuccess: () => router.back(),
  });

  async function onSubmit(e) {
    e.preventDefault();

    const data = {
      image,
      stockData: [{ symbol, quantity, type }],
      type: marketcallType,
      buyPrice: buyPrice * 100,
      targetPrice: buyPrice * 100,
      startDate: new Date(),
    };

    if (marketcallType === MARKET_CALL_TYPES_SERVER.INTRADAY) {
      data.endDate = convetToMarketCloseTime();
    } else {
      data.endDate = convetToMarketCloseTime(endDate);
    }

    if (stopLossPrice) {
      data.stopLossPrice = stopLossPrice * 100;
    }

    // TODO: Uncomment in prod
    // if (isAfter(data.startDate, convetToMarketCloseTime())) {
    //   toast.error('Market is closed try between 9:15 AM and 3:30 PM');
    // } else {
    await confirm(
      confirmObj(
        `Are you sure you want to create this market call ?`,
        `This call will be live from now and will end on ${fDateTime(data.endDate)}`,
        `Yes, Create`
      )
    );
    mutate(cleanObject(data));
    // }
  }

  const renderForm = (
    <form onSubmit={onSubmit}>
      <Box sx={{ flexGrow: 1, px: 3, pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ImageUploader setImage={setImage} imagePath={image} />
        <Typography fontWeight="bold">Enter Stock Details*</Typography>
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
              label="Stock Quantity"
              value={quantity}
              sx={{ width: 1 }}
              type="text"
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
        </Grid>

        <Typography fontWeight="bold">Enter Call Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <MarketCallAutoComplete
              name="marketcallType"
              placeholder="Choose Market Call Type"
              value={marketcallType}
              noLabel
              onChange={(_, v) => setMarketcallType(v)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Stop Loss Price"
              label="Stop Loss Price"
              value={stopLossPrice}
              required={marketcallType === MARKET_CALL_TYPES.INTRADAY}
              sx={{ width: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="mdi:currency-inr" />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setStopLossPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Buy Price"
              label="Buy Price"
              value={buyPrice}
              sx={{ width: 1 }}
              onChange={(e) => setBuyPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="mdi:currency-inr" />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              placeholder="Enter Target Price"
              label="Target Price"
              value={targetPrice}
              sx={{ width: 1 }}
              onChange={(e) => setTargetPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="mdi:currency-inr" />
                  </InputAdornment>
                ),
              }}
              required
            />
          </Grid>

          {marketcallType !== MARKET_CALL_TYPES_SERVER.INTRADAY && !!marketcallType && (
            <Grid item xs={12} lg={6}>
              <DatePicker
                label="End Date"
                sx={{ width: 1 }}
                value={endDate}
                minDate={new Date()}
                onChange={(sd) => setEndDate(sd)}
                required={marketcallType !== MARKET_CALL_TYPES_SERVER.INTRADAY}
              />
            </Grid>
          )}
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
        {renderForm}
      </Card>
    </Container>
  );
}

export default MarketCalForm;
