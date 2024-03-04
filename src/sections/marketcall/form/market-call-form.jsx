import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Card, Divider, Container, TextField, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import MarketcallService from 'src/services/Marketcall.service';

import PageHeader from 'src/components/pageHeader';
import EnumAutocomplete from 'src/components/AutoComplete/EnumAutoComplete';

function MarketCalForm() {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState('');

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => MarketcallService.post(data),
    onError: (err) => toast.error(err.message),
    onSuccess: () => router.back(),
  });
  const onSubmit = (e) => {
    e.preventDefault();
    mutate({ stockData: [{ symbol, quantity, type }] });
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
