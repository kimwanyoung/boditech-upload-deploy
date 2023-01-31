import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CompanyNameList from './CompanyNameList';


export default function ResultTab({coName, userData, setCoName, handleGetData, handleClose}) {

  return (
    <Box sx={{ width: '100%' }} marginTop="2rem">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={0}>
          <Tab label="Search Result"/>
        </Tabs>
      </Box>
      <CompanyNameList coName={coName} userData={userData} setCoName={setCoName} handleGetData={handleGetData} handleClose={handleClose}/>
    </Box>
  );
}