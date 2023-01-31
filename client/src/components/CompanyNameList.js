import styled from "styled-components";

const CompanyNameList = function({coName, userData, setCoName, handleClose, handleGetData}) {
  const handleClick = (value) => {
    handleClose();
    setCoName(value)
    handleGetData(value);
  }
  
  return (
    <ListWrapper>
      {userData.map((props,idx) => (
        <ListBox key={`user name list - ${idx}`} onClick={() => handleClick(props.agency)}>
          <IdTitle>{idx + 1}</IdTitle>
          <ContentTitle>{props.agency}</ContentTitle>
        </ListBox>
      ))}
    </ListWrapper>
  )
}

export default CompanyNameList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 28rem;
  overflow: scroll;
`

const ListBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;

  :hover{
    background-color:#e6e6e6;
  }
`
const IdTitle = styled.h2`
  width: 20%;
  font-size: 1rem;
`

const ContentTitle = styled.h2`
  font-size: 1rem;
  width: 80%;
`