import React from 'react'
import { colors, fontStyle, thanksPageStyle } from '../styles/globalStlye'
import { Box, Button, CardMedia, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { NotFound } from './NotFound';
import thanksImg from '../assets/img/TesukkurImg.png'
import bonnaLogo from "../assets/img/logobonna_b.png"


const Thanks = () => {

    const { i18n, t } = useTranslation();
    const navigate = useNavigate()
    const state = useLocation()


    return (


        state.state ?
            (

                <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
                    {/* Resim Kolonu */}
                    <Grid item xs={12} md={9}>
                        <Box sx={{ width: '100%', height: '100%' }}>
                            {/* <CardMedia
                                component='img'
                                image={thanksImg}
                                loading='lazy'
                                sx={{
                                    objectFit: 'cover',
                                    height: '100%',
                                    width: '100%'
                                }}
                            /> */}

                            <CardMedia
                                component='img'
                                image={thanksImg}
                                loading='lazy'
                                sx={{
                                    objectFit: 'cover',  // Resmi alanına sığdırır, gerekirse keser
                                    height: {
                                        xs: '40vh',  // Ekran küçükse (mobile) yükseklik %40
                                        sm: '50vh',  // Ekran biraz daha büyükse %50
                                        md: '100%',  // Orta büyüklükteki ekranlarda %100
                                        lg: '100%',  // Büyük ekranlarda %100
                                    },
                                    width: '100%', // Resmin her zaman yatayda %100 genişliğe sahip olmasını sağlar
                                    maxWidth: '100%', // Taşmayı önler
                                    maxHeight: '100%', // Taşmayı önler
                                    display: 'block', // Resmin düzgün yerleşmesini sağlar
                                }}
                            />

                        </Box>
                    </Grid>

                    {/* Form Kolonu */}
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 5,
                                p: 3,
                                backgroundColor: colors.bonna,
                                minHeight: '100%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            <Typography
                                align='center'
                                fontFamily={fontStyle.catamaran}
                                fontWeight={700}
                                fontSize={22}
                                letterSpacing={3}
                            >
                                {t('text.thanks')}
                            </Typography>

                            <Typography
                                align='center'
                                fontFamily={fontStyle.catamaran}
                                fontSize={20}
                            >
                                {t('text.thanksMessage')}
                            </Typography>

                            <CardMedia
                                component='img'
                                image={bonnaLogo}
                                loading='lazy'
                                sx={{
                                    width: {
                                        xs: '30%',
                                        sm: '30%',
                                        md: '60%',
                                        lg: '60%',
                                        xl: '60%'
                                    }
                                }}
                            />

                            <Button
                                type='click'
                                sx={{
                                    letterSpacing: 3,
                                    fontFamily: fontStyle.catamaran,
                                    width: 80,
                                    textDecoration: 'underline'
                                }}

                                variant='filled'
                                onClick={() => navigate('/')}
                            >
                                {t('text.back')}
                            </Button>

                        </Box>
                    </Grid>
                </Grid>


            )
            :
            (
                <NotFound />
            )


    )
}

export default Thanks