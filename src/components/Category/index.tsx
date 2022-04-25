import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


export default function Category({ children, name }: any) {

  const [showCategory, setShowCategory] = useState(false);
  const [color, setColor] = useState({})

  const handleClick = () => {
    setShowCategory(!showCategory);
    setColor(!showCategory
      ? { color: '#0f205f', }
      : {})
  };

  if (children.length === 0) {
    return (<></>)
  }

  return (
    <>
      <ListItemButton sx={{ pl: 6 }} onClick={handleClick}>
        <ListItemText primary={<Typography sx={color} component="h1" variant="body1" >
          {name}
        </Typography>
        } />
        {showCategory ? <ExpandLess color="secondary" /> : <ExpandMore sx={{ color:'#111111'}}/>}
      </ListItemButton>
      <Collapse in={showCategory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
      <Divider></Divider>
    </>
  )
}