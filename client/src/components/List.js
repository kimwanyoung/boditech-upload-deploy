import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SearchIcon from '@mui/icons-material/Search';

export const list = (excelDownload, handleGetData, agencyName, handleLogout, setDataArr) => (
  <Box height="100vh" width="15rem" display="flex" justifyContent="space-between" flexDirection="column" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px">
    <Box display="flex" justifyContent="space-around" flexDirection="column" width="100%" height="10vh" pt="2rem">
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={excelDownload}>
            <ListItemIcon>
              <CloudDownloadIcon />
            </ListItemIcon>
            <ListItemText primary="File download" />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleGetData(setDataArr, agencyName)}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="FCST lookup" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
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