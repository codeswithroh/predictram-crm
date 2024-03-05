import { useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';

import { ROLES } from 'src/enums/index';

import FileUploader from 'src/components/FileUploader/file-uploader';

import FileFormat from '../FileFormat/file-format';
import UserAutocomplete from '../AutoComplete/UserAutoComplete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const AllocateComponent = ({ open, handleClose }) => {
  const [employee, setEmployee] = useState('');
  const [client, setClient] = useState('');
  const [clients, setClients] = useState([]);
  const user = useSelector((state) => state?.user?.details);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Allocation
          </Typography>
          <UserAutocomplete
            size="medium"
            placeholder="Select Employee.."
            noLabel
            name="createdBy"
            labelKey="firstName"
            value={employee}
            filter={{
              role: ROLES.EMPLOYEE,
              organization: user?.organization,
            }}
            enabled={!!user?.organization}
            onChange={(_, v) => {
              setEmployee(v);
            }}
          />
          <UserAutocomplete
            size="medium"
            placeholder="Select Client.."
            noLabel
            name="createdBy"
            labelKey="firstName"
            value={client}
            filter={{
              role: ROLES.CLIENT,
              organization: user?.organization,
            }}
            enabled={!!user?.organization}
            onChange={(_, v) => {
              setClient(v);
            }}
          />
          <FileUploader
            setData={setClients}
            requiredFields={['firstName', 'lastName', 'role', 'phone', 'email', 'password']}
          />
          {!clients.length && <FileFormat gid={0} />}
          <LoadingButton type="submit" loading={false} variant="contained" color="inherit">
            Allocate
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AllocateComponent;
