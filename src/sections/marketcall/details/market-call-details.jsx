import { isAfter } from 'date-fns';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { paisaToRupees } from 'src/utils/convert';

import { ROLES, MARKET_CALL_TYPES } from 'src/enums';
import ResponseService from 'src/services/Response.service';
import MarketdataService from 'src/services/Marketdata.service';
import MarketcallService from 'src/services/Marketcall.service';

import AccessControl from 'src/components/Accesscontrol';
import FetchLoader from 'src/components/loader/fetch-loader';
import TitleValueCart from 'src/components/cards/TitleValueCart';

const confirmObj = (title, description, confirmationText) => ({
  title: <h3 style={{ margin: 0 }}>{title}</h3>,
  description: <h4 style={{ margin: 0 }}>{description}</h4>,
  cancellationButtonProps: { variant: 'contained', color: 'error', autoFocus: false },
  confirmationButtonProps: { variant: 'contained', color: 'success' },
  confirmationText,
});

const isLive = (endDate) => isAfter(new Date(endDate), new Date());

export default function MarketCallDetails() {
  const { id } = useParams();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const { role } = useSelector((state) => state.user.details);

  const { data: marketCall = {}, isLoading: marketCallLoading } = useQuery({
    queryKey: ['market-call', id],
    queryFn: async () => {
      const { data } = await MarketcallService.get({
        _id: id,
        populate: 'createdBy',
        showResponse: role === ROLES.CLIENT,
      });
      console.log(data);
      return data;
    },
    select: (res) => res?.marketCallData[0],
  });

  const { data: marketLivePrice = {}, isLoading: livePriceLoading } = useQuery({
    queryKey: ['live-price', id, marketCall?.stockData],
    queryFn: async () => {
      const stocks = marketCall?.stockData?.map((stockInfo) => stockInfo?.symbol).join(',');
      const { data } = await MarketdataService.livePrice(stocks);
      const stockWithPrice = marketCall?.stockData?.map((stockData) => {
        const priceData = data?.d?.find((d) => d?.n === `NSE:${stockData?.symbol}-EQ`);
        return {
          ...stockData,
          high_price: priceData?.v?.high_price || '-',
          low_price: priceData?.v?.low_price || '-',
          lp: priceData?.v?.lp || '-',
          open_price: priceData?.v?.open_price || '-',
          prev_close_price: priceData?.v?.prev_close_price || '-',
        };
      });
      return stockWithPrice;
    },
    select: (data) => data[0],
    refetchInterval: isLive(marketCall?.endDate) ? 1000 * 15 : 0,
    enabled: !!isLive(marketCall?.endDate) && marketCall?.stockData?.length > 0,
  });

  const { mutate: submitResponse, isPending: responseLoading } = useMutation({
    mutationFn: ({ response }) => ResponseService.post({ marketCallId: id, response }),
    onError: (err) => toast.error(err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(['market-call', id]);
    },
  });

  const handelResponseSubmit = async (response) => {
    await confirm(
      confirmObj(
        `Are you sure you want to ${response} this call ?`,
        'You can not revert back',
        `Yes, ${response}`
      )
    );

    submitResponse({ response });
  };

  // Components

  const renderImage = (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#ebf4f2"
      p={2}
      borderRadius={2}
    >
      <img alt="market-call" height={window.screen.height / 2} src={marketCall?.image} />
    </Box>
  );

  const renderDates = (
    <Box
      sx={{
        bgcolor: `${isLive(marketCall?.endDate) ? 'green' : 'gray'}`,
        color: 'white',
        px: 2,
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="p" component="div">
        {marketCall.type === 'LONG_TERM'
          ? `Publish Date : ${fDate(marketCall?.createdAt)}`
          : `${
              isLive(marketCall?.endDate) ? 'This call will end' : 'This call was ended'
            } on ${fDate(
              marketCall?.endDate,
              marketCall?.type !== 'SHORT_TERM' ? 'd MMMM yyyy HH:mm' : 'd MMMM yyyy'
            )}`}
      </Typography>
    </Box>
  );

  const renderPublishBy = (
    <Typography component="div">
      {`Published By ${marketCall?.createdBy?.firstName} ${marketCall?.createdBy?.lastName}`}
    </Typography>
  );

  const renderStockDetails = (
    <Stack gap={1}>
      <Typography fontWeight="bold">Stock Details In This Call</Typography>
      <Grid container gap={1}>
        <Grid item sx={12} md={3}>
          <TitleValueCart
            title="Symbol"
            value={marketCall?.stockData?.length > 0 && marketCall?.stockData[0]?.symbol}
          />
        </Grid>
        <Grid item sx={12} md={3}>
          <TitleValueCart
            title="Quantity"
            value={marketCall?.stockData?.length > 0 && marketCall?.stockData[0]?.quantity}
          />
        </Grid>
        <Grid item sx={12} md={5}>
          <TitleValueCart
            title="Call"
            value={marketCall?.stockData?.length > 0 && marketCall?.stockData[0]?.type}
          />
        </Grid>
        {isLive(marketCall?.endDate) && (
          <Grid item sx={12} md={5}>
            <TitleValueCart title="Last Price" value={marketLivePrice?.lp || 'Not Found'} />
          </Grid>
        )}
        {isLive(marketCall?.endDate) && (
          <Grid item sx={12} md={5}>
            <TitleValueCart title="High Price" value={marketLivePrice?.high_price || 'Not Found'} />
          </Grid>
        )}
        {isLive(marketCall?.endDate) && (
          <Grid item sx={12} md={5}>
            <TitleValueCart title="Low Price" value={marketLivePrice?.low_price || 'Not Found'} />
          </Grid>
        )}
        {isLive(marketCall?.endDate) && (
          <Grid item sx={12} md={5}>
            <TitleValueCart title="Open Price" value={marketLivePrice?.open_price || 'Not Found'} />
          </Grid>
        )}
        {isLive(marketCall?.endDate) && (
          <Grid item sx={12} md={12}>
            <TitleValueCart
              title="Previous Close Price"
              value={marketLivePrice?.prev_close_price || 'Not Found'}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );

  const renderMarketDetails = (
    <Stack gap={1}>
      <Typography fontWeight="bold">Market Call Details In This Call</Typography>
      <Grid container gap={1}>
        <Grid item sx={12} md={5}>
          <TitleValueCart title="Call Type" value={MARKET_CALL_TYPES[marketCall?.type]} />
        </Grid>
        <Grid item sx={12} md={5}>
          <TitleValueCart title="Buy Price" value={paisaToRupees(marketCall?.buyPrice)} />
        </Grid>
        <Grid item sx={12} md={5}>
          <TitleValueCart title="Target Price" value={paisaToRupees(marketCall?.targetPrice)} />
        </Grid>
        {marketCall?.stopLossPrice && (
          <Grid item sx={12} md={5}>
            <TitleValueCart
              title="Stop Loss Price"
              value={paisaToRupees(marketCall?.stopLossPrice)}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );

  const renderSubmitResponse = (
    <AccessControl accepted_roles={[ROLES.CLIENT]}>
      {marketCall?.responses?.length > 0 ? (
        <Typography
          variant="h5"
          color={marketCall?.responses[0]?.response === 'ACCEPT' ? 'green' : 'red'}
          align="center"
        >
          This call is {marketCall?.responses[0]?.response}ED by you
        </Typography>
      ) : (
        <Stack mt={2} flexGrow={1} gap={2} direction={{ sx: 'column', md: 'row' }}>
          <LoadingButton
            variant="contained"
            color="success"
            sx={{ width: '100%' }}
            loading={responseLoading}
            onClick={() => handelResponseSubmit('ACCEPT')}
          >
            Accept
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color="error"
            sx={{ width: '100%' }}
            loading={responseLoading}
            onClick={() => handelResponseSubmit('REJECT')}
          >
            Reject
          </LoadingButton>
        </Stack>
      )}
    </AccessControl>
  );

  if (marketCallLoading) return <FetchLoader />;
  return (
    <Card sx={{ p: 2, gap: 3, display: 'flex', flexDirection: 'column' }}>
      {marketCall?.image && renderImage}
      <Stack direction={{ md: 'row', sx: 'column' }} justifyContent="space-between" gap={1}>
        {renderDates}
        {renderPublishBy}
      </Stack>

      <Grid container gap={1} justifyContent="space-between">
        <Grid sx={12} md={5}>
          {livePriceLoading ? <FetchLoader /> : renderStockDetails}
        </Grid>
        <Grid sx={12} md={5}>
          {renderMarketDetails}
        </Grid>
      </Grid>

      {isLive(marketCall?.endDate) && renderSubmitResponse}
    </Card>
  );
}
