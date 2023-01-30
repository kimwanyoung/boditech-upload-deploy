import styled from "styled-components";
import readXlsxFile from 'read-excel-file';
import Spreadsheet from "react-spreadsheet";
import React, {useState, useRef, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {Rows, TitleLabel} from "../components/Rows";
import * as xlsx from 'xlsx';
import axios from "axios";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { PROXY } from "../components/proxy";

const Sheet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dataArr, setDataArr] = useState([]);
  const ref = useRef();
  const [isAdmin, setIsAdmin] = useState(false);
  // const [fileName, setFileName] = useState('');
  const [state, setState] = useState({
    top: false
  });
  const [agencyName, setAgencyName] = useState('');

  useEffect(() => {
    axios.get(`/api/userId?userId=${location.state}`)
    .then(async (res)=> {
      setAgencyName(res.data.data);
      if(res.data.data === '어드민'){
        setIsAdmin(true);
        await axios.get(`/api/allExcel`)
          .then(res => {
            const resData = res.data[0].data.recordset;
            const newResData = resData.map(props => {
              const result = [];
              for(let keys in props){
                result.push({value: props[keys]})
              }
              return result;
            })
            setDataArr(newResData);
          })
          .catch(err => console.log(err))
        return;
      }else{
      await axios.get(`/api/excel?agency=${location.state}`)
      .then( res => {  
        const resData = res.data[0].data.recordset;
        const newResData = resData.map(props => {
          const result = [];
          for(let keys in props){
            result.push({value: props[keys]})
          }
          return result;
        })
        setDataArr(newResData);
      })
      .catch(err => console.log(err))    
    }
    }).catch(err => {
      console.error(err);
    })
  }, [location.state])

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const excelDownload = () => {
    const submitArr = dataArr.map(innerArr => {
      return innerArr.map((props) => {
        if(props.value === null){
          return 0;
        }else{
          return props.value;
        }
      });
    });
    submitArr.unshift(TitleLabel);
    console.log(submitArr);
    const book = xlsx.utils.book_new();
    const dataSheet = xlsx.utils.json_to_sheet(submitArr, {skipHeader:true});
    xlsx.utils.book_append_sheet(book, dataSheet, "data");
    xlsx.writeFile(book, "data.xlsx");
  }
  
  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
            <input type='file' ref={ref} style={{display: "none"}} onChange={fileHandler}/>
            <ListItemButton onClick={handleOnClick}>
              <ListItemIcon>
                <DriveFolderUploadIcon />
              </ListItemIcon>
              <ListItemText primary="파일 업로드" />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleAppendRows}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="행 추가" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClearCell}>
            <ListItemIcon>
              <AutoFixHighIcon />
            </ListItemIcon>
            <ListItemText primary="셀 초기화" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleGetData}>
            <ListItemIcon>
              <PlagiarismIcon />
            </ListItemIcon>
            <ListItemText primary="현재 데이터 조회" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSubmit}>
            <ListItemIcon>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="데이터 전송" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={excelDownload}>
            <ListItemIcon>
              <CloudDownloadIcon />
            </ListItemIcon>
            <ListItemText primary="엑셀로 다운로드" />
          </ListItemButton>
        </ListItem>
        {isAdmin && (
          <ListItem disablePadding>
          <ListItemButton onClick={excelDownload}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="기준 테이블 데이터 병합" />
          </ListItemButton>
        </ListItem>
        )}
      </List>
      <Divider />
      <List>
      <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  const fileHandler = (event) => {
      const fileObj = event.target.files[0];
      // setFileName(event.target.files[0].name);
      if(fileObj.name.split('.')[1] === 'xls' || fileObj.name.split('.')[1] === 'xlsx' ) {
        readXlsxFile(fileObj).then(res => {
          res.forEach(props => {
            const dataObj = props.map(prop => {
              let newDataObj;
              if(prop === null){
                newDataObj = {"value" : '0'};
              } else {
                newDataObj = {"value" : prop};
              }
              
              return newDataObj;
            });
            setDataArr(prev => {
              return [...prev,dataObj];
            })
          })
          setDataArr(prev => {
            let newArr = [...prev];
            newArr.shift();
            return newArr;
          })
        }).catch(err => console.log(err));
      } else {
        alert('엑셀 파일만 업로드 가능합니다');
        event.target.value = '';
        return;
      }
  }

  const handleSubmit = () => {
      const submitArr = dataArr.map(innerArr => {
        return innerArr.map((props) => {
          if(props.value === null){
            return 0;
          }else{
            return props.value;
          }
        });
      });
      const newSubArr = submitArr.filter(props => {
        return (props.reduce((cnt, elem) => cnt + (elem === 0), 0) < 15)
      })

      axios.post(`/api/excel`, {
        data:{
          id:location.state,
          form: newSubArr
        }
      })
      .then(res => alert(res.data[0].data))
      .catch(err => console.log(err));
  }

  const handleOnClick = () => {
    setDataArr([]);
    // setFileName('');
    ref.current.value='';
    ref.current.click();
  }

  const handleLogout = () => {
    axios.get(`/api/logout`)
    .then(res => {
      navigate('/');
    })
    .catch(err => console.log(err))
  }

  const handleAppendRows = () => {
    let appendArr = [...dataArr];
    appendArr.push(Rows(location.state, agencyName));
    return setDataArr(appendArr);
  }

  const handleGetData = () => {
    console.log(location.state);
    setDataArr([]);
    if(location.state === 'admin'){
      axios.get(`/api/allExcel`)
      .then(res => {
        const resData = res.data[0].data.recordset;
        const newResData = resData.map(props => {
          const result = [];
          for(let keys in props){
            result.push({value: props[keys]})
          }
          return result;
        })
        setDataArr(newResData);
      })
      .catch(err => console.log(err))
      return;
    }
    axios.get(`/api/excel?agency=${location.state}`)
    .then(res => {
      const resData = res.data[0].data.recordset;
      const newResData = resData.map(props => {
        const result = [];
        for(let keys in props){
          result.push({value: props[keys]})
        }
        return result;
      })
      setDataArr(newResData);
    })
    .catch(err => console.log(err))
  }

  const handleClearCell = () => {
    ref.current.value = '';
    setDataArr([]);
    // setFileName('');
  }

  return (
    <AppWrapper>
      <div>
        <React.Fragment key={'top'}>
          <BtnWrapper variant='contained' color="success"  onClick={toggleDrawer('top', true)}>
            <KeyboardArrowDownIcon/>
          </BtnWrapper>
          <SwipeableDrawer
            anchor='top'
            open={state['top']}
            onClose={toggleDrawer('top', false)}
            onOpen={toggleDrawer('top', true)}
          >
            {list('top')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
        <TableWrapper>
          <TitleWrapper>
            {/* <FileTitle>파일명 : {fileName ? fileName : '파일을 추가해 주세요.'}</FileTitle> */}
            <FileTitle>현재 대리점 : {agencyName}</FileTitle>
          </TitleWrapper>
          <SpreadsheetWrapper columnLabels={TitleLabel} data={dataArr} onChange={setDataArr}/>
        </TableWrapper>
    </AppWrapper>
  );
}

export default Sheet;

const AppWrapper = styled.div`
  position:relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const TableWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items:flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  max-height: 80vh;
  bottom: 0;
  right:0;
  overflow:scroll;
`

const SpreadsheetWrapper = styled(Spreadsheet)`
  margin: 0 !important;
  max-height:70vh;
`

const BtnWrapper = styled(Button)`
  width: 100vw;
  height: 3rem;
  * {
    font-size: 2rem !important;
  }
`

const FileTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin:1rem 0 1rem 1rem;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`