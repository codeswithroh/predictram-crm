import { useState } from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Scrollbar from 'src/components/scrollbar';

import BaseTableRow from './parts/table-row';
import BaseTableHead from './parts/table-head';
// import TableEmptyRows from './table-empty-rows';
// import TableNoData from './error/not-found-view';
import TableNoData from './parts/table-no-data';
import BaseTableToolbar from './parts/table-toolbar';
import { applyFilters, getTableData, applyPagination } from './utils';
// import { emptyRows, applyFilter, getComparator } from './utils';

// ----------------------------------------------------------------------

export default function BaseTable({ tableData, tableDataFormat, filterables, actions = null }) {
  const [page, setPage] = useState(0);

  const [query, setQuery] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilter = (event) => {
    // setPage(0);
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  const filteredData = applyFilters(tableData, query, filterables);

  const paginatedData = applyPagination(filteredData, page, rowsPerPage);

  const displayData = getTableData(tableDataFormat, paginatedData);

  const notFound = !filteredData.length && !!query;

  return (
    <Card>
      <BaseTableToolbar filter={query} onFilter={handleFilter} filterables={filterables} />

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <BaseTableHead
              // headLabel={[
              //   { id: 'firstName', label: 'First Name', align: 'center' },
              //   { id: 'lastName', label: 'Last Name', align: 'center' },
              //   { id: 'phone', label: 'Phone', align: 'center' },
              //   { id: 'email', label: 'Email', align: 'center' },
              //   { id: '' },
              // ]}
              actions={actions}
              headLabel={tableDataFormat}
            />
            <TableBody>
              {displayData.map((row) => (
                <BaseTableRow
                  actions={actions}
                  rowData={row}
                  handleClick={(event) => console.log(row)} // TODO: do something on click of table row
                />
              ))}

              {/* <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              /> */}

              {notFound && <TableNoData query={query} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

/*
{
    "id": "3174bd52-b35b-4a8d-b4df-464ec776c71e",
    "avatarUrl": "/assets/images/avatars/avatar_5.jpg",
    "name": "Edwin Rath",
    "company": "Pfannerstill - Reichert",
    "isVerified": false,
    "status": "active",
    "role": "Full Stack Developer"
} */