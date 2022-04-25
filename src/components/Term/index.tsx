import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


export default function Term({ children, name }: any) {


  const [showTerms, setShowTerms] = useState(false);
  const [color, setColor] = useState({})

  const handleClick = () => {
    setShowTerms(!showTerms);
    setColor(!showTerms
      ? { color: '#0f205f', }
      : {})
  };

  if (children.length === 0) {
    return (<></>)
  }

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={<Typography sx={color} component="h1" variant="body1" >
          {name}º Período
        </Typography>
        } />
      </ListItemButton>
      <Collapse in={showTerms} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.length !== 0
            ? children
            : <Typography component="h1" variant="body1" >Não há informações sobre este período :(</Typography>}
        </List>
      </Collapse>
      <Divider></Divider>
    </>
  )
}