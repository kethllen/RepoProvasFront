import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function Navbar({ option, handleChange }: any) {

  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={option}
        exclusive
        onChange={handleChange}
        fullWidth={true}
      >
        <ToggleButton value="DISCIPLINA">DISCIPLINA</ToggleButton>
        <ToggleButton value="PESSOA INSTRUTORA">PESSOA INSTRUTORA</ToggleButton>
        <ToggleButton value="ADICIONAR">ADICIONAR</ToggleButton>
      </ToggleButtonGroup>
 
    </>
  );

}
