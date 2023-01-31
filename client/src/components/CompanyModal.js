import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { Button, Input } from '@mui/material';
import ResultTab from './ResultTab';
import axios from 'axios';
import {useState} from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CompanyModal({ handleGetData }) {
  const [open, setOpen] = useState(false);
  const [coName, setCoName] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userData, setUserData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const SearchBtnClick = () => {
    try{
      axios.get(`/api/getUser`).then(res => {
        setUserData(res.data[0].data.recordset);
        setFilteredData(res.data[0].data.recordset);
      }).catch(err =>{
        console.error(err);
      })
    }catch(err) {
      console.error(err);
    }
  }

  const handleChangeFilter = (value) => {
    setCoName(value);
    setFilteredData(userData.filter(data => {
      return data.agency.toLowerCase().includes(value.toLowerCase());
    }))
  }

  return (
    <div>
      <InputFilter
        label="Company Name"
        value={coName}
        readOnly={true}
        variant="outlined"
        onClick={handleOpen}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display="flex" flexDirection="column">
          <ModalTitleWrapper>
            <ModalTitle>Company Search</ModalTitle>
            <Button variant='contained' onClick={SearchBtnClick}>Search</Button>
          </ModalTitleWrapper>
          <Input placeholder='Enter the name of the company you want to find.' value={coName} onChange={(e) => handleChangeFilter(e.target.value)}/>
          <ResultTab userData={filteredData} coName={coName} setCoName={setCoName} handleGetData={handleGetData} handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}


const ModalTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
`

const ModalTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 900;
  color: #3f51b5;
`

const InputFilter = styled(Input)`
  width: 20rem;
`