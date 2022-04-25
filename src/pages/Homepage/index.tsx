import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import * as api from "../../services/api";
import  Disciplines from '../../components/Disciplines';
import Teachers from '../../components/Teachers';
import Navbar from '../../components/Navbar';


export default function Homepage() {

  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [repository, setRepository] = useState<any>({
    discipline: [],
    teacher: []
  })

  const [tabs, setTabs] = useState('DISCIPLINA');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newOption: string,
  ) => {
  setTabs(newOption);
  };



  async function fetchData() {
    try {
      const discipline: any = await api.disciplineData(token)
      const teacher: any = await api.teachersData(token)
      setRepository({
        discipline,
        teacher
      })
    }
    catch {
      console.log(console.error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);



  return (
    <Container component="main" maxWidth="xl">
      <Navbar
        option={tabs}
        handleChange={handleChange}
      />
      <Container component="main" maxWidth="xl" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {tabs=== 'DISCIPLINA'
          ? <Disciplines repository={repository.discipline} />
          : tabs === 'PESSOA INSTRUTORA'
            ? <Teachers repository={repository.teacher} />
            : <></>
        }

      </Container >
    </Container>
  );
}