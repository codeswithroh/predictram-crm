import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Stack, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';
import { createChatData } from 'src/utils/createChartData';

import MarketdataService from 'src/services/Marketdata.service';

import StockChart from 'src/components/chart/StockChart';
import FetchLoader from 'src/components/loader/fetch-loader';

// ----------------------------------------------------------------------

const convertStocksToTitle = (stockData, isLive) => {
  const symbols = stockData.map((stock) => `${stock?.symbol} ${stock.type} call`).join(',');

  return isLive ? `Checkout New Call , Consist of ${symbols} ` : `This Call consist ${symbols}`;
};

export default function MarketCallCard({ marketCall, buttonText }) {
  const { createdAt, stockData, isLive, id, createdBy } = marketCall;

  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['history-price', id, stockData[0]?.symbol],
    queryFn: () =>
      MarketdataService.history(
        stockData[0]?.symbol,
        '1',
        fDate(new Date(isLive ? new Date() : marketCall?.createdAt), 'yyyy-MM-dd'),
        fDate(new Date(isLive ? new Date() : marketCall?.createdAt), 'yyyy-MM-dd')
      ),
    select: (res) => res?.data?.candles || [],
  });

  const chartData = createChatData(data);

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        overflow: 'hidden',
        WebkitLineClamp: 1,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {convertStocksToTitle(stockData, isLive)}
    </Link>
  );

  const renderGraph = isLoading ? (
    <FetchLoader />
  ) : (
    <StockChart data={chartData || []} height={200} tooltip={false} />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
      }}
    >
      {fDate(createdAt)}
    </Typography>
  );

  const renderCreatedBy = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
      }}
    >
      {`${createdBy.firstName} ${createdBy.lastName}`}
    </Typography>
  );

  const renderButton = (
    <Button
      variant="contained"
      color="inherit"
      sx={{ mt: 1 }}
      onClick={() => router.push(`/market-call/details/${id}`)}
    >
      {buttonText}
    </Button>
  );

  return (
    <Grid xs={12} sm={6} md={4}>
      <Card>
        <Box
          sx={{
            position: 'relative',
            pt: 2,
          }}
        >
          {renderGraph}
        </Box>

        <Stack
          sx={{
            p: (theme) => theme.spacing(0, 3, 3, 3),
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            {renderDate}

            {renderCreatedBy}
          </Stack>

          {renderTitle}

          {renderButton}
        </Stack>
      </Card>
    </Grid>
  );
}

MarketCallCard.propTypes = {
  marketCall: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
};
