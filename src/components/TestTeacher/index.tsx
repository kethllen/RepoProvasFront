import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function TestTeacher({ name, url, discipline }: any) {

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <>
      <ListItemButton sx={{ pl: 8 }} onClick={handleClick}>
        <ListItemText primary={
          <Typography component="h1" variant="body1" >
            {name}
          </Typography>
        } secondary={
          <Typography component="h1" variant="body2" >
            {discipline}
          </Typography>
        } />
      </ListItemButton>
      <Divider></Divider>
    </>
  )
}