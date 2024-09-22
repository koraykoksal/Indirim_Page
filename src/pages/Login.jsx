import React from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import lock from "../assets/img/lock.png"
import { colors, loginPageStyle } from '../styles/globalStlye'
import useAuthCall from '../hooks/useAuthCall'
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from 'react-router'


const Login = () => {

    const { login } = useAuthCall()
    const navigate=useNavigate()

    const [info, setInfo] = useState({
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        login(info)
        setInfo({
            email: "",
            password: ""
        })
    }



    return (
        <div style={loginPageStyle}>


            <Box sx={{ p: 3, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Container
                    maxWidth='sm'
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}
                    component={'form'}
                    onSubmit={handleSubmit}
                >
                    <img
                        src={lock}
                        width={40}
                        style={{ margin: 'auto' }}
                    />

                    <Typography
                        sx={{
                            letterSpacing: 5,
                            color: colors.beyaz,
                            fontWeight: 700
                        }}
                        align='center'
                    >
                        LOGIN
                    </Typography>

                    <TextField
                        required
                        name='email'
                        id='email'
                        type='email'
                        variant='filled'
                        label='Email'
                        onChange={handleChange}
                        value={info.email}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                                backgroundColor: colors.beyaz,
                                color: '#000000',
                                '&:hover': {

                                    backgroundColor: colors.beyaz
                                },
                                '& .MuiInputBase-input': {
                                    borderRadius: '8px',
                                    backgroundColor: colors.beyaz,
                                    // '&:hover': {
                                    //     borderRadius: '8px',
                                    //     backgroundColor: colors.beyaz
                                    // }
                                }
                            },
                        }}
                    />
                    <TextField
                        required
                        name='password'
                        id='password'
                        type='password'
                        variant='filled'
                        label='Password'
                        onChange={handleChange}
                        value={info.password}
                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                                backgroundColor: colors.beyaz,
                                color: '#000000',
                                '&:hover': {

                                    backgroundColor: colors.beyaz
                                },
                                '& .MuiInputBase-input': {
                                    borderRadius: '8px',
                                    backgroundColor: colors.beyaz,
                                    // '&:hover': {
                                    //     borderRadius: '8px',
                                    //     backgroundColor: colors.beyaz
                                    // }
                                }
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 ,justifyContent:'center'}}>
                        <Button variant='contained' type='submit' sx={{ letterSpacing: 3 }}> OK </Button>

                        <IoReturnUpBack size={35} cursor={'pointer'} color='green' onClick={()=>navigate('/')}/>
                    </Box>

                </Container>

            </Box>




        </div>
    )
}

export default Login