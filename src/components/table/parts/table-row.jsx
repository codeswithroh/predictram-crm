import { useState } from 'react';
import PropTypes from 'prop-types';

// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function BaseTableRow({ rowData = {}, actions, handleClick }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        {rowData?.map((d, idx) => (
          <TableCell key={idx} align="left">
            {d}
          </TableCell>
        ))}

        {actions && (
          <TableCell align="center">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {actions}
      </Popover>
    </>
  );
}

BaseTableRow.propTypes = {
  // avatarUrl: PropTypes.any,
  // email: PropTypes.any,
  handleClick: PropTypes.func,
  // isVerified: PropTypes.any,
  // firstName: PropTypes.any,
  // lastName: PropTypes.any,
  rowData: PropTypes.any,
  // selected: PropTypes.any,
  // status: PropTypes.string,
};
