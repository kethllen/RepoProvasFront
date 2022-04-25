import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


export default function Teacher({ children, name }: any) {
  const [showTeacher, setShowTeacher] = useState(false);
  const [color, setColor] = useState({})

  const handleClick = () => {
    setShowTeacher(!showTeacher);
    setColor(!showTeacher
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
          {name}
        </Typography>
        } />
        {showTeacher ? <ExpandLess color="secondary" /> : <ExpandMore sx={{ color: '#111111',}} />}
      </ListItemButton>
      <Collapse in={showTeacher} timeout="auto" unmountOnExit>
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