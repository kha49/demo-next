'use client'

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GraphDemo from './GraphDemo';
import Graph from './graph';

// Styled TableCell for better readability
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.text.secondary,
  textAlign: 'center', // Center align text in cells
  padding: theme.spacing(1),
  fontSize: '0.8rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Styled TableRow for header row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
}));

const LeaksTable = () => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, overflowX: 'auto' }}>
      <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 2 }}>
        Leaks Data
      </Typography>
      <Table aria-label="Leaks Table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Ville</StyledTableCell>
            <StyledTableCell>Q1 %</StyledTableCell>
            <StyledTableCell>Q1 CLI</StyledTableCell>
            <StyledTableCell>Q2 %</StyledTableCell>
            <StyledTableCell>Q2 CLI</StyledTableCell>
  
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'A', 'B', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'A', 'B', 'A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'A', 'B'].map((ville) => (
            <TableRow key={ville}>
              <StyledTableCell component="th" scope="row" style={{ fontWeight: 'normal' }}>
                {ville}
              </StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
              <StyledTableCell>-</StyledTableCell>
       
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AssignedTable = () => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, overflowX: 'auto' }}>
      <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 2 }}>
        Assigned Data
      </Typography>
      <Table aria-label="Assigned Table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Leaks</StyledTableCell>
            <StyledTableCell>Assigned</StyledTableCell>
            <StyledTableCell>Unassign 50-199</StyledTableCell>
            <StyledTableCell>Unassign 200-499</StyledTableCell>
            <StyledTableCell>Unassign 500+</StyledTableCell>
            <StyledTableCell>Closed</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {['MID', 'LTE'].map((leak) => (
            <TableRow key={leak}>
              <StyledTableCell component="th" scope="row" style={{ fontWeight: 'normal' }}>
                {leak}
              </StyledTableCell>
              <StyledTableCell>1234</StyledTableCell>
              <StyledTableCell>123</StyledTableCell>
              <StyledTableCell>123</StyledTableCell>
              <StyledTableCell>123</StyledTableCell>
              <StyledTableCell>1234</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


const TableDemo = () => {
  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      {/* Bảng LeaksTable ở bên trái (luôn chiếm toàn bộ chiều rộng trên màn hình nhỏ) */}
      <Grid item xs={12} md={4} sx={{overflowY: 'auto', maxHeight: '55rem'}}> {/* md={4} để chiếm 1/3 chiều rộng màn hình trung bình trở lên */}
        <LeaksTable />
      </Grid>

      {/* Phần chứa ba bảng bên phải */}
      <Grid item xs={12} md={8}> {/* md={8} để chiếm 2/3 chiều rộng màn hình trung bình trở lên */}
        <Grid container spacing={2}>
          <Grid item xs={12}> {/* Mỗi bảng chiếm một nửa chiều rộng trên màn hình trung bình trở lên */}
            <AssignedTable />
          </Grid>
          <Grid item xs={12} sx={{height: '21rem', width :'100%', marginBottom: '1rem'}}>
            <Graph />
          </Grid>
          <Grid item xs={12} sx={{height: '20rem'}}> {/* Chiếm toàn bộ chiều rộng trên mọi kích thước màn hình */}
            <GraphDemo />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TableDemo;