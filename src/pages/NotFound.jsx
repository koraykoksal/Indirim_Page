import { Box, Button, CardMedia, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import notFound_img from '../assets/img/404.png'
import { useNavigate } from 'react-router-dom'


export const NotFound = () => {

  const navigate = useNavigate()

  const style={
    fontSize:"30px",
    fontWeight:"800",
    color:'#fff',
    fontFamily:'initial'
  }

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', alignItems: 'center', backgroundColor: '#000', overflow: 'auto', height: '100vh' }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
        <Typography sx={style}>404</Typography>
        <Typography sx={style}>NOT FOUND</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'wrap', gap: 2 }}>

        <Button
          variant='contained'
          size='small'
          sx={{ fontSize: '22px', mt: '50px', p: '0.5rem', borderRadius: '1rem', borderColor: '1px solid #000000', color: '#ffffff', width: '150px', '&:hover': { cursor: 'pointer', backgroundColor: 'transparent', color: '#000000' } }}
          onClick={() => navigate('/')}
        >
          Home
        </Button>

      </Box>

    </Box>

  )
}