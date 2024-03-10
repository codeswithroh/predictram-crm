import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import EnumAutocomplete from 'src/components/AutoComplete/EnumAutoComplete';
import BolleanAutoComplete from 'src/components/AutoComplete/BooleanAutoComplete';

function MarketCallResponseFilter({ setFilter, filter }) {
  const [autoExecute, setAutoExecute] = useState('');
  const [response, setResponse] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, autoExecute, response, page: 0 });
  };

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <Stack sx={{ padding: 3, gap: 2 }}>
          <Typography variant="h6" marginBottom="10px">
            Filters
          </Typography>
          <BolleanAutoComplete
            name="autoExecute"
            noLabel
            onChange={(_, v) => setAutoExecute(v)}
            value={autoExecute}
            placeholder="Select Auto execute"
          />
          <EnumAutocomplete
            name="response"
            noLabel
            ENUM={['ACCEPT', 'REJECT']}
            onChange={(_, v) => setResponse(v)}
            placeholder="Select Response"
            value={response}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
            Apply
          </LoadingButton>
        </Stack>
      </Card>
    </form>
  );
}

export default MarketCallResponseFilter;
