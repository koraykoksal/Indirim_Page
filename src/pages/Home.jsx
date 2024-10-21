import { Autocomplete, InputAdornment, Chip, Box, Button, Card, CardContent, CardMedia, Container, FormControl, Modal, Select, TextField, Typography, InputLabel, MenuItem, Grid, Paper, FormControlLabel, Checkbox, FormLabel, Menu, IconButton } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { colors, fontStyle, homePageStyle, modalStyles } from '../styles/globalStlye'
import landingImg from "../assets/img/landingImg.png"
import bonnaLogo from "../assets/img/logobonna_b.png"
import msa_bonna_logo from "../assets/img/msa_bonna_logo.png"
import { countryInfo, jobType } from '../helper/data'
import { useTranslation } from 'react-i18next';
import GDPR from "../assets/docs/GDPR.pdf"
import useAuthCall from '../hooks/useAuthCall'
import { format } from "date-fns"
import LanguageIcon from '@mui/icons-material/Language';
import { languages } from '../helper/data'
import { GoChevronDown } from "react-icons/go";


export const Home = () => {

  // dil çevirisi için kullanılan fonksiyon
  const { i18n, t } = useTranslation();
  const { postFireDB } = useAuthCall()
  const [search, setSearch] = useState(null)
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('90');
  const currentDate = new Date()
  const [selectedJobType, setSelectedJobType] = useState({
    value: '',
    index: -1
  });

  const ITEM_HEIGHT = 48;
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);


  const [info, setInfo] = useState({
    name: "",
    country: "",
    countryCode: "90",
    company: "",
    email: "",
    jobtype: "",
    tel: "",
    description: "",
    emessage: false,
    policy: false,
    datetime: format(currentDate, 'yyyy-MM-dd HH:mm')
  })

  //onChange işlemi yap
  const handleChange = (e, newValue, fieldName) => {

    // Autocomplete'ten gelen olaylar için
    if (fieldName) {
      setInfo(prevInfo => ({
        ...prevInfo,
        [fieldName]: newValue || newValue?.text || ""
      }));
    }
    // TextField'tan gelen olaylar için
    else if (e?.target) {
      const { name, value } = e.target;
      setInfo(prevInfo => ({
        ...prevInfo,
        [name]: value
      }));

      // job seçeneği ile index kontrolü yap
      // index 4 ise description textfiled göster
      if (name == 'jobtype') {
        const selectedIndex = jobType.findIndex(item => item.name === e.target.value);
        setSelectedJobType({
          value: e.target.value,
          index: selectedIndex
        });

      }
    }


  }


  const handleIsCheck = (e, params) => {
    const { checked } = e.target
    setInfo({ ...info, [params]: checked })
  }


  // Auto complete popup yüksekliği
  const CustomPaper = (props) => (
    <Paper {...props} style={{ maxHeight: '200px', overflowY: 'auto', borderRadius: '8px' }} />
  );


  //ülke telefon kodlarını küçükten büyüğe sıralama yap
  function sortPhoneData(data) {
    const result = data.map(item => item.phone)
    const filter = result.sort((a, b) => {
      return a.localeCompare(b, undefined, { numeric: true })
    })
    return filter
  }


  // ülke isimlerini a-z sırala
  function sortContryNameData(data) {
    const result = data.map(item => item.country)
    const filter = result.sort((a, b) => {
      return a - b
    })
    return filter
  }

  // dil seçimi için çalıştırılan fonksiyon
  const changeLang = (language) => {
    i18n.changeLanguage(language);
  };

  //! sayfa render olduğu zaman kullanıcının tarayıcı dil bilgisi alınır
  useEffect(() => {
    // const computerLanguage = navigator.language.split('-')[0] // "en-US" gibi bir değeri "en" yapar
    // computerLanguage == 'en' || 'tr' || 'es' || 'it' || 'fr' ? changeLang(computerLanguage) : changeLang('en')

    const supportedLanguages = ['en', 'tr'];
    const computerLanguage = navigator.language.split('-')[0];
    if (supportedLanguages.includes(computerLanguage)) {
      changeLang(computerLanguage);
    }
    else {
      changeLang('en');
    }

  }, [])



  const handleSubmit = (e) => {
    e.preventDefault()
    postFireDB("indirim", info)
    setInfo({
      name: "",
      country: "",
      countryCode: "90",
      company: "",
      email: "",
      jobtype: "",
      tel: "",
      emessage: false,
      policy: false
    })
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = (event) => {
    setAnchorElLanguage(null);
  };



  return (

    <>
    <div id='mobileError'></div>
    <div id='homePage'>

      <Grid container spacing={0} sx={{ minHeight: '100vh' }}>
        {/* Resim Kolonu */}
        <Grid item xs={12} md={9}>
          <Box sx={{ width: '100%', height: '100%' }}>

            <CardMedia
              component='img'
              image={landingImg}
              loading='lazy'
              sx={{
                objectFit: 'cover',  // Resmi alanına sığdırır, gerekirse keser
                height: {
                  xs: '100%',  // Ekran küçükse (mobile) yükseklik %40
                  sm: '100%',  // Ekran biraz daha büyükse %50
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
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              p: 3,
              backgroundColor: colors.bonna,
              minHeight: '100%',
            }}
            component={'form'}
            onSubmit={handleSubmit}
          >

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <Grid
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleOpenLanguageMenu}
              >

                <Typography
                  sx={{ cursor: 'pointer' }}
                  variant='caption'
                  fontSize={16}
                >
                  {i18n.resolvedLanguage}
                </Typography>


                <GoChevronDown size={18} />
              </Grid>

              {/* <LanguageIcon onClick={handleOpenLanguageMenu} cursor={'pointer'} /> */}


              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElLanguage}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguageMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    //   width: '10ch',
                  },
                }}
              >
                <Box onClick={handleCloseLanguageMenu} s sx={{ display: 'flex', flexDirection: 'column' }}>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    {
                      languages?.map((item, index) => (
                        <IconButton
                          key={index}
                        >
                          <img onClick={() =>
                            changeLanguage(item.title)
                          }
                            src={item.icon}
                            alt="icon"
                            style={{ width: 24, height: 24 }}
                          />

                        </IconButton>
                      ))
                    }
                  </Box>

                </Box>
              </Menu>

            </Box>

            <CardMedia
              component='img'
              image={msa_bonna_logo}
              loading='lazy'
              sx={{
                margin: 'auto',
                // height: {
                //   xs: '50%',
                //   sm: '50%',
                //   md: '50%',
                //   lg: '50%',
                //   xl: '50%'
                // },
                width: {
                  xs: '50%',
                  sm: '50%',
                  md: '75%',
                  lg: '75%',
                  xl: '75%'
                }
              }}
            />

            <Typography align='center' variant='h6' fontFamily={'Catamaran'} fontWeight={800}>
              {t('text.txt1')}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center' }}>
              <Typography align='center' variant='inherit' fontFamily={'Catamaran'}>
                {t('text.txt2')}
              </Typography>
              <Typography align='center' variant='inherit' fontFamily={'Catamaran'}>
                {t('text.txt3')}
              </Typography>
            </Box>

            <TextField
              required
              fullWidth
              name='name'
              id='name'
              type='text'
              label={t('muiElements.nameSurname')}
              onChange={handleChange}
              value={info.name}
              sx={{
                '& .MuiInputLabel-root': {
                  fontFamily: `${fontStyle.catamaran}`,
                },
                '& .MuiInputBase-input': {
                  fontFamily: `${fontStyle.catamaran}`,
                }
              }}
            />

            <TextField
              required
              fullWidth
              name='email'
              id='email'
              type='email'
              label={t('muiElements.mail')}
              value={info.email}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': {
                  fontFamily: `${fontStyle.catamaran}`,
                },
                '& .MuiInputBase-input': {
                  fontFamily: `${fontStyle.catamaran}`,
                }
              }}
            />

            {/* COUNTRY PHONE CODE */}
            <FormControl fullWidth>
              <TextField
                required
                fullWidth
                name='tel'
                id='tel'
                type='tel'
                label={t('muiElements.phone')}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setInfo({ ...info, ['tel']: e.target.value })
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Select
                        name='countryCode'
                        id='countryCode'
                        value={countryCode}
                        onChange={(e) => {
                          setCountryCode(e.target.value)
                          setInfo({ ...info, ['countryCode']: e.target.value })
                        }}
                        sx={{
                          fontFamily: 'Catamaran',
                          fontSize: '14px',
                          border: 'none',
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                          },
                          minWidth: 70,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          height: '100%',
                          verticalAlign: 'middle'
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 270 // Popup yüksekliğini burada ayarlayabilirsiniz
                            }
                          }
                        }}
                      >
                        {sortPhoneData(countryInfo).map((country, index) => (
                          <MenuItem
                            key={index}
                            value={country}
                            sx={{
                              fontFamily: 'Catamaran',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              height: '100%',
                              verticalAlign: 'middle'
                            }}
                          >
                            +{country}
                          </MenuItem>
                        ))}
                      </Select>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'Catamaran',
                    fontSize: '16px',
                    padding: '10px',
                  },
                  '& .MuiInputLabel-root': {
                    fontFamily: 'Catamaran',
                  },
                  '& .MuiOutlinedInput-root': {
                    height: '56px', // Yüksekliği sabitliyoruz
                  }
                }}
              />
            </FormControl>

            {/* COUNTRY */}
            <FormControl>
              <Autocomplete
                required
                fullWidth
                value={search}
                name='country'
                onChange={(event, newValue) => {
                  setSearch(newValue);
                  handleChange(event, newValue, 'country');
                }}
                id="search-select-demo"
                options={sortContryNameData(countryInfo)}
                PaperComponent={CustomPaper}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label={t('muiElements.country')}
                    sx={{
                      '& .MuiInputBase-root': {
                        borderRadius: '8px',
                        borderColor: 'black',
                        fontFamily: `${fontStyle.catamaran}`
                      },
                      '& .MuiInputLabel-root': {
                        fontFamily: `${fontStyle.catamaran}`,
                      },
                      '& .MuiInputBase-input': {
                        fontFamily: `${fontStyle.catamaran}`,
                      }
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} style={{ fontFamily: `${fontStyle.catamaran}`, fontSize: '14px' }}>
                    {option}
                  </li>
                )}
              />
            </FormControl>

            {/* JOB TYPE */}
            <FormControl required>
              <InputLabel id='jobtype' sx={{ fontFamily: `${fontStyle.catamaran}` }}>{t('muiElements.job')}</InputLabel>
              <Select
                name='jobtype'
                id='jobtype'
                label='jobtype'
                labelId='jobtype'
                onChange={handleChange}
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: `${fontStyle.catamaran}`,
                  }
                }}
              >
                {
                  jobType.map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item.name}
                      sx={{ fontFamily: `${fontStyle.catamaran}`, fontSize: 14 }}
                    >
                      {t('jobs.' + item.name)}

                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>

            {
              selectedJobType.index == '4' &&
              <TextField
                required
                name='description'
                id='description'
                label={t('muiElements.description')}
                type='text'
                value={info.description}
                onChange={handleChange}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontFamily: `${fontStyle.catamaran}`,
                  },
                  '& .MuiInputBase-input': {
                    fontFamily: `${fontStyle.catamaran}`,
                  }
                }}
              />
            }


            <TextField
              fullWidth
              name='company'
              id='company'
              type='text'
              label={t('muiElements.company')}
              onChange={handleChange}
              sx={{
                '& .MuiInputLabel-root': {
                  fontFamily: `${fontStyle.catamaran}`,
                },
                '& .MuiInputBase-input': {
                  fontFamily: `${fontStyle.catamaran}`,
                }
              }}
            />


            <Box sx={{
              display: 'flex',
              flexDirection: 'column'
            }}>

              <Grid
                sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexWrap: 'wrap' }}
              >


                <FormControlLabel

                  control={
                    <Checkbox required name="gilad" onChange={(e) => handleIsCheck(e, 'policy')} />
                  }
                  label={
                    <span style={{ fontFamily: `${fontStyle.catamaran}`, fontSize: 13 }}>
                      <span
                        style={{ textDecoration: 'underline', marginRight: 5, fontWeight: 700, cursor: 'pointer' }}
                        onClick={() => {
                          window.open(`${GDPR}`, '_blank')
                        }}
                      >
                        {t('muiElements.click')}
                      </span>

                      {t('muiElements.GDPR')}
                    </span>
                  }

                />

              </Grid>


              <FormControlLabel
                name='emessage'
                id='emessage'
                control={
                  <Checkbox name="gilad" onChange={(e) => handleIsCheck(e, 'emessage')} />
                }
                label={
                  <span style={{ fontFamily: `${fontStyle.catamaran}`, fontSize: 13 }}> {t('muiElements.subscription')}</span>
                  // <Typography style={{ fontFamily: `${fontStyle.catamaran}`, fontSize: 12 }}>{t('muiElements.subscription')}</Typography>
                }

              />

            </Box>


            <Button
              variant='contained'
              sx={{ backgroundColor: 'black', borderRadius:15,fontFamily: 'Catamaran', letterSpacing: 2, textTransform: 'none', '&:hover': { backgroundColor: 'black' } }}
              type='submit'
            >
              {t('muiElements.btnText')}
            </Button>

            <Typography
              variant='subtitle2'
              align='center'
              style={{ textDecoration: 'underline', cursor: 'pointer', width: '150px', margin: 'auto', fontFamily: 'Catamaran', letterSpacing: 1 }}
              onClick={() => { window.open('https://bonna.com.tr', '_blank') }}
            >
              www.bonna.com.tr
            </Typography>
          </Container>
        </Grid>
      </Grid>

    </div>
    </>
  )
}
