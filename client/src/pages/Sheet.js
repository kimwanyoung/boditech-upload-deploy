import styled from "styled-components";
import readXlsxFile from 'read-excel-file';
import Spreadsheet from "react-spreadsheet";
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { TitleLabel } from "../components/Rows";
import * as xlsx from 'xlsx';
import axios from "axios";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Button } from "@mui/material";
import CompanyModal from "../components/CompanyModal";
import { list } from "../components/List";
import { handleSubmit, handleGetData, defaultCellChecker, mapper, handleOnClick } from "../utils/SheetUtils";


const Sheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataArr, setDataArr] = useState([]);
  const ref = useRef();
  const [isAdmin, setIsAdmin] = useState(false);
  const [agencyName, setAgencyName] = useState('');

  useEffect(() => {
    axios.get(`/api/userId?userId=${location.state}`)
      .then(async (res) => {
        setAgencyName(res.data.data);
        if (res.data.data === 'admin') {
          setIsAdmin(true);
        }
        handleGetData(setDataArr, agencyName);
      }).catch(err => {
        console.error(err);
      })

    return () => {
      setIsAdmin(false);
    }
  }, [])

  const excelDownload = () => {
    const submitArr = dataArr.map(innerArr => {
      return innerArr.map((props) => {
        if (props.value === null || props.value === undefined) {
          return null;
        } else {
          return props.value;
        }
      });
    });
    submitArr.unshift(TitleLabel);
    const book = xlsx.utils.book_new();
    const dataSheet = xlsx.utils.json_to_sheet(submitArr, { skipHeader: true });
    xlsx.utils.book_append_sheet(book, dataSheet, "data");
    xlsx.writeFile(book, `fcst-${agencyName}-data.xlsx`);
  }

  const fileHandler = (event) => {
    const fileObj = event.target.files[0];
    if (fileObj.name.split('.')[1] === 'xls' || fileObj.name.split('.')[1] === 'xlsx') {
      readXlsxFile(fileObj).then(res => {
        res.forEach(props => {
          const dataObj = props.map(prop => {
            let newDataObj;
            if (prop === null) {
              newDataObj = { "value": '0', "readOnly": true };
            } else {
              newDataObj = { "value": prop, "readOnly": true };
            }
            return newDataObj;
          });
          setDataArr(prev => {
            return [...prev, dataObj];
          })
        })
        setDataArr(prev => {
          let newArr = [...prev];
          newArr.shift();
          return newArr;
        })
        defaultCellChecker(dataArr, setDataArr);
      }).catch(err => console.error(err));
    } else {
      alert('엑셀 파일만 업로드 가능합니다');
      event.target.value = '';
      return;
    }
  }

  const handleLogout = () => {
    axios.get(`/api/logout`)
      .then(res => {
        navigate('/');
      })
      .catch(err => console.error(err))
  }

  return (
    <AppWrapper>
      {!isAdmin ? (
        <Box position="absolute" top="0" left="18%" width="30vw" height="30vh">
          <List>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Click Download the file in the upper left and modify the Excel file." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Click Choose File and upload modified file" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Click Submit" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Click the FCST lookup in the upper left to see if it has been applied." />
            </ListItem>
          </List>
        </Box>) : (
        <Box position="absolute" top="0" left="17%" width="30vw" height="30vh">
          <List>
            <ListItem>
              <ListItemIcon>
                <FiberManualRecordIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="This is the administrator page." />
            </ListItem>
          </List>
        </Box>
      )}
      <BtnContainer>
        {(!isAdmin &&
          <BtnWrapper variant="contained" onClick={handleOnClick}>
            <input type='file' ref={ref} style={{ display: "none" }} onChange={fileHandler} />
            Choose File
          </BtnWrapper>
        )}

        {!isAdmin && (
          <BtnWrapper variant="contained" onClick={() => handleSubmit(dataArr, location.state)}>
            Submit
          </BtnWrapper>
        )}
      </BtnContainer>
      <ListWrapper>
        {list(excelDownload, handleGetData, agencyName, handleLogout, setDataArr)}
      </ListWrapper>
      <TableWrapper>
        <TitleLayout>
          <TitleWrapper>
            <FileTitle>{agencyName}</FileTitle>
          </TitleWrapper>
          {isAdmin && (
            <>
              <FileTitle>Filter</FileTitle>
              <CompanyModal handleGetData={handleGetData} />
            </>
          )}
        </TitleLayout>
        <SpreadsheetWrapper columnLabels={TitleLabel} data={dataArr} onChange={setDataArr} />
      </TableWrapper>
    </AppWrapper>
  );
}

export default Sheet;

const AppWrapper = styled.div`
  position:relative;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
`
const BtnWrapper = styled(Button)`
  width: 10rem;
  margin-right: 1rem !important;
`

const TableWrapper = styled.div`
  display: flex;
  align-items:flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-height: 80vh;
  overflow:scroll;
  
  *{
    color: darkslategray !important;
  }
`

const SpreadsheetWrapper = styled(Spreadsheet)`
  margin: 0 !important;
  max-height:50vh;
`

const FileTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin:1rem 0.5rem 1rem 1rem;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

const ListWrapper = styled.div`
  width: 15rem;
  height: 100vh;
`

const BtnContainer = styled.div`
  position: absolute;
  top:0;
  right:0;
  display: flex;
  justify-content:flex-end;
  width: 100%;
  margin-top: 1rem;
`

const TitleLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 30rem;
`