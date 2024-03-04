import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Card, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { ROLES } from 'src/enums/index';

import Dropdown from 'src/components/dropdown';
import AccessControl from 'src/components/Accesscontrol';
import UserAutocomplete from 'src/components/AutoComplete/UserAutoComplete';
import OrganizationAutocomplete from 'src/components/AutoComplete/OrganizationAutoComplete';

export default function MarketCallFilter({ setFilter, filter }) {
  const [organization, setOrganization] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const user = useSelector((state) => state?.user?.details);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setFilter({ ...filter, organization, createdBy, page: 0 });
  };
  return (
    <Grid2 sx={{ mb: 2 }} container justifyContent="space-between" alignItems="center" gap={3}>
      {/* <Grid2 > */}
      <Card sx={{ borderRadius: 1 }}>
        <Dropdown
          onChange={(e) => setFilter({ ...filter, marketState: e.target.value, page: 0 })}
          value={filter?.marketState}
          options={[
            { value: 'live', label: 'Live' },
            { value: 'ended', label: 'Ended' },
          ]}
          label="Choose market type"
          nolabel
        />
      </Card>
      {/* </Grid2> */}

      <Grid2
        md={6}
        xs={12}
        container
        gap={0.5}
        alignItems="center"
        component="form"
        onSubmit={onFormSubmit}
      >
        <Grid2 md={5} xs={12}>
          <AccessControl accepted_roles={[ROLES.SUPER_ADMIN]}>
            <Card sx={{ borderRadius: 1 }}>
              <OrganizationAutocomplete
                size="small"
                label="Select organization"
                noLabel
                value={organization}
                name="organization"
                onChange={(_, v) => setOrganization(v)}
              />
            </Card>
          </AccessControl>
        </Grid2>
        <Grid2 md={5} xs={12}>
          <AccessControl accepted_roles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
            <Card sx={{ borderRadius: 1 }}>
              <UserAutocomplete
                size="small"
                placeholder="Select Employee.."
                noLabel
                name="createdBy"
                labelKey="firstName"
                value={createdBy}
                filter={{
                  role: ROLES.EMPLOYEE,
                  organization: user?.organization || organization,
                }}
                enabled={!!user?.organization || !!organization}
                onChange={(_, v) => setCreatedBy(v)}
              />
            </Card>
          </AccessControl>
        </Grid2>
        <Grid2 md={1} xs={12}>
          <AccessControl accepted_roles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
            <Button variant="contained" color="inherit" type="submit">
              Search
            </Button>
          </AccessControl>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
