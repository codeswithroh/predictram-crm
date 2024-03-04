import { useQuery } from '@tanstack/react-query';

import UserService from 'src/services/User.service';

import BrandAutocomplete, { createOptionsFromArr } from './BrandAutocomplete';

function UserAutocomplete({
  onChange,
  value,
  name,
  label,
  placeholder,
  size,
  noLabel,
  labelKey,
  filter = {},
  pickKey,
  lg,
  md,
  multiple,
}) {
  const { data = [] } = useQuery({
    queryKey: ['user-autocomplete'],
    queryFn: () => UserService.get(filter),
    select: (res) => res?.data || [],
    staleTime: 60000 * 10,
  });

  return (
    <BrandAutocomplete
      size={size ?? 'medium'}
      label={label ?? 'User Select'}
      noLabel={noLabel}
      placeholder={placeholder ?? 'Select user...'}
      onChange={onChange}
      value={value}
      name={name ?? 'user'}
      options={createOptionsFromArr(data, labelKey ?? 'name', pickKey ?? 'id')}
      lg={lg}
      md={md}
      multiple={multiple}
    />
  );
}

export default UserAutocomplete;
