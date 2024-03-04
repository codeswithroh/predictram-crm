import { useState } from 'react';
import { isEqual } from 'lodash';

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

export default function BaseTable({
  filterQuery,
  tableData,
  tableDataFormat = null,
  filterables = null,
  actions = null,
}) {
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
    setQuery(event.target.value);
  };

  let filteredData;
  if (filterQuery && !query && !isEqual(filterQuery, { phone: '', email: '' })) {
    if (filterQuery.email) {
      filteredData = applyFilters(tableData, filterQuery.email, filterables);
    } else if (filterQuery.phone) {
      filteredData = applyFilters(tableData, filterQuery.phone, filterables);
    }
  } else {
    filteredData = applyFilters(tableData, query, filterables);
  }

  const paginatedData = applyPagination(filteredData, page, rowsPerPage);

  const displayData = getTableData(tableDataFormat, paginatedData);

  const notFound = !filteredData?.length && !!query;

  return (
    <Card>
      <BaseTableToolbar filter={query} onFilter={handleFilter} filterables={filterables} />
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <BaseTableHead actions={actions} headLabel={tableDataFormat} />
            <TableBody>
              {displayData?.map((row, idx) => (
                <BaseTableRow
                  key={idx}
                  actions={actions}
                  rowData={row}
                  handleClick={(event) => console.log(row)} // TODO: do something on click of table row
                />
              ))}

              {notFound && <TableNoData query={query} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        page={page}
        component="div"
        count={filteredData?.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}
