import * as React from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Link from '@mui/material/Link';
import * as api from "../../services/api";
import Button from '@mui/material/Button';
import Form from "../AuthFormContainer";
import {Title} from "./style";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useState, useContext } from 'react';
import { Box } from '@mui/system';




type Title = "Cadastro" | "Login";
interface AuthProps {
    title: Title;
}
const stylesForm = {
  width: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

export interface FormData {
         email: string;
         password: string;
         passwordConfirmation?: string;
 }
 const styleGithubButton = {
    width: "464px",
    height: "36px",
    fontSize: "14px",
    marginTop: "30px",
    backgroundColor: "#424445"
 }
const styleBoxEnd = {
     display: "flex",
    flexDirection: "column",
     alignItems: "center",
     justifyContent: "space-between",
    marginTop: "12px"
};
export default function SignIn({title}:AuthProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', passwordConfirmation: '' } as FormData);
  
    const { setToken } = useContext(UserContext);
  
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
         e.preventDefault();
  
        if (title === "Cadastro") {
          if (formData.password !== formData.passwordConfirmation) {
            console.log('Senhas precisam coincidir') ;
            return;
          }
            delete formData.passwordConfirmation;
             const promise = await api.signUp(formData);
             if (promise) {
                 navigate('/');
            }
         } else {
             delete formData.passwordConfirmation;
             const token = await api.signIn(formData);
             if (token) {
                localStorage.setItem('token', token);
                setToken(token);
                navigate('/repository');
              }
           }
       }
  function handleFormInput(event: any) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }



  return (
    <Container component="main" maxWidth="xs">
        <Box component="form" sx={stylesForm} onSubmit={handleSubmit}>
        <Title>{title}</Title>
        <Button sx={styleGithubButton} variant="contained">Entrar com o GITHUB</Button>
          <Grid item sx={{ mt: 4, mb: 4 }}>
            <Divider>ou</Divider>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                label="Email"
                name="email"
                InputLabelProps={{
                  color: "secondary"
                }}
                value={formData.email}
                onChange={handleFormInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                label="Senha"
                name="password"
                type="password"
                InputLabelProps={{
                  color: "secondary"
                }}
                value={formData.password}
                onChange={handleFormInput}
              />
            </Grid>{title === 'Cadastro' &&
             <Grid item xs={12}>
             <TextField
               variant="filled"
               required
               fullWidth
               label="Confirme sua senha"
               name="passwordConfirmation"
               type="password"
               InputLabelProps={{
                 color: "secondary"
               }}
               value={formData.passwordConfirmation}
               onChange={handleFormInput}
             /></Grid>}
          </Grid>
          <Box sx={{width:"464px", display:"flex", alignContent:"center", justifyContent:"space-between"}} >
          {title === 'Login' ?
          <>
            <Grid item xs={12} sm={5}>
              <Link
                component="div"
                variant="body2"
                sx={{ mt: 2, mb: 1 }}
                textAlign="left"
                onClick={() => { navigate('/signUp') }}
              >
                Primeira vez? Clique aqui!
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 0 }}
                disabled={loading}
              >
                <Typography
                  component="h1"
                  variant="button"
                >
                  {loading
                    ? "Carregando"
                    : "Entrar"}
                </Typography>
              </Button>
            </Grid></>:<><Grid item xs={12} sm={5}>
              <Link
                component="div"
                variant="body2"
                sx={{ mt: 2, mb: 1 }}
                textAlign="left"
                onClick={() => { navigate('/') }}
              >
                Já possuo cadastro
              </Link>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 0 }}
                disabled={loading}
              >
                <Typography
                  component="h1"
                  variant="button"
                >
                  {loading
                    ? "Carregando"
                    : "Cadastrar"}
                </Typography>
              </Button>
            </Grid></>}
          </Box>
          </Box>
    </Container >
  );
}


// import {Title} from "./style";
// import Button from '@mui/material/Button';
// import Form from "../AuthFormContainer";
// import Divider from "@mui/material/Divider";
// import InputPassword from "../InputPassword";
// import Input from "../Input";
// import { useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import * as api from "../../services/api";
// import UserContext from "../../contexts/UserContext";
// import { Box } from "@mui/system";
// import Link from '@mui/material/Link';

// //const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

// type Title = "Cadastro" | "Login";
// interface AuthProps {
//     title: Title;
// }

// export interface FormData {
//     email: string;
//     password: string;
//     passwordConfirmation?: string;
// }
// const styleGithubButton = {
//     width: "464px",
//     height: "36px",
//     fontSize: "14px",
//     marginTop: "30px",
//     backgroundColor: "#424445"
// }
// const styleBoxEnd = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginTop: "12px"
// };

// export default function AuthForm({ title }: AuthProps) {

//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({ email: '', password: '', passwordConfirmation: '' } as FormData);

//     const { setToken } = useContext(UserContext);

//     async function handleSubmit(e: React.MouseEvent) {
//         e.preventDefault();

//         if (title === "Cadastro") {
//             const promise = await api.signUp(formData);
//             if (promise) {
//                 navigate('/sign-in');
//             }
//         } else {
//             delete formData.passwordConfirmation;
//             const token = await api.signIn(formData);
//             if (token) {
//                 localStorage.setItem('token', token);
//                 setToken(token);
//                 navigate('/');
//             }
//         }
//     }

//     return (
//         <Form>
//             <Title>{title}</Title>
//             <Button sx={styleGithubButton} variant="contained">Entrar com o GITHUB</Button>
//             <Divider>ou</Divider>
//             <Input
//                 label="Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//             />
//             <InputPassword
//                 label="Senha"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//             />
//             {
//                 title === 'Cadastro' &&
//                 <InputPassword
//                     label="Confirme sua senha"
//                     value={formData.passwordConfirmation}
//                     onChange={(e:any) => setFormData({ ...formData, [e.target.name]: e.target.value })}
//                 />
//             }
//                 <Box sx={styleBoxEnd}>
//                     {title === 'Cadastro' ?
//                         <>
//                             <Link href="#" variant="body2">
//                                 {'Já possuo cadastro'}
//                             </Link>
//                             <p onClick={() => navigate('/sign-in')}>Já possuo cadastro</p>
//                             <button onClick={e => handleSubmit(e)}>cadastrar</button>
//                         </> :
//                         <>
//                             <p onClick={() => navigate('/sign-up')}>Não possuo cadastro</p>
//                             <button onClick={e => handleSubmit(e)}>entrar</button>
//                         </>
//                     }

//                 </Box>
//         </Form>
//     );
// }