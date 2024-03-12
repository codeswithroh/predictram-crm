import { isAfter } from 'date-fns';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Stack, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';
import { paisaToRupees } from 'src/utils/convert';

import { MARKET_CALL_TYPES, MARKET_CALL_TYPES_SERVER } from 'src/enums';

// ----------------------------------------------------------------------

const convertStocksToTitle = (stockData) => {
  const symbols = stockData.map((stock) => `${stock?.symbol} ${stock.type} CALL`).join(',');

  return symbols;
};

// const callColor = {
//   INTRADAY: '#3FADFC',
//   SHORT_TERM: '#03A069',
//   LONG_TERM: '#8466F1',
// };

export default function MarketCallCard({ marketCall, buttonText }) {
  const { endDate, stockData, id, createdBy, image, type, targetPrice, stopLossPrice } = marketCall;
  const isLive = isAfter(new Date(endDate), new Date());
  const router = useRouter();

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      fontWeight="bold"
      underline="hover"
      sx={{
        overflow: 'hidden',
        WebkitLineClamp: 1,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {convertStocksToTitle(stockData)}
    </Link>
  );

  const renderImage = (
    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#DCDEEE" p={2}>
      {image ? (
        <Box>
          <img src={image} alt="market-call" height={200} />
        </Box>
      ) : (
        <Box height={200} display="flex" s alignItems="center" textAlign="center">
          <Typography variant="h5">{`${MARKET_CALL_TYPES[type]} call for ${stockData[0]?.symbol}`}</Typography>
        </Box>
      )}
    </Box>
  );

  const renderDate = (
    <Box bgcolor="#212322" color="white" borderRadius={2} mt={1} px={2} mr={1}>
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 2,
          // color: 'text.disabled',
        }}
      >
        {`${isLive ? 'Ends' : 'Ended'} on ${fDate(endDate, 'd MMMM yyyy HH:mm')}`}
      </Typography>
    </Box>
  );

  const renderStatus = (
    <Box bgcolor={isLive ? 'green' : 'gray'} color="white" borderRadius={2} px={2} mt={0.5}>
      <Typography>{isLive ? 'Live' : 'Ended'}</Typography>
    </Box>
  );

  const renderCreatedBy = (
    <Typography variant="caption" component="div">
      {`${createdBy.firstName} ${createdBy.lastName}`}
    </Typography>
  );

  const CallType = (
    <Box bgcolor="#212322" borderRadius={2} color="white" textAlign="center">
      <Typography px={2}>{MARKET_CALL_TYPES[type]}</Typography>
    </Box>
  );

  const PriceInfo = (
    <Box>
      <Typography>Target Price :- {paisaToRupees(targetPrice)}</Typography>
      {type === MARKET_CALL_TYPES_SERVER.INTRADAY && (
        <Typography>Stop Loss Price :- {paisaToRupees(stopLossPrice)}</Typography>
      )}
    </Box>
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
            // pt: 2,
          }}
        >
          {renderImage}

          <Box sx={{ position: 'absolute', top: 0, right: 0, p: 2 }}>{renderDate}</Box>
          <Box sx={{ position: 'absolute', top: 0, left: 0, p: 2 }}>{renderStatus}</Box>
        </Box>

        <Stack
          sx={{
            p: (theme) => theme.spacing(2, 2, 2, 2),
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="start" mb={1}>
            {CallType}
            {renderCreatedBy}
          </Stack>

          {renderTitle}
          {PriceInfo}

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
