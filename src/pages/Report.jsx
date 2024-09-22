import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import useAuthCall from '../hooks/useAuthCall';
import ReportTable from '../components/ReportTable';
import { SlRefresh } from "react-icons/sl";
import { HiOutlineSearch } from "react-icons/hi";
import Delete_Modal from '../components/modal/Delete_Modal';

const Report = () => {

  const { getFireDB } = useAuthCall()
  const { landingData } = useSelector((state) => state.landing)

  const [info, setInfo] = useState({
    dateFrom: "",
    dateTo: ""
  })

  const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) }


  useEffect(() => {
    getFireDB("indirim")
  }, [])


  //date bilgisini al
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  //filtreyi temizle
  const handleRefresh = () => {
    setInfo({
      dateFrom: "",
      dateTo: ""
    })
    getFireDB('indirim', "", "")
  }


  return (
    <div>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>

      <Typography align='center' variant='body2' py={5} fontWeight={700} letterSpacing={5}>Report</Typography>


        <Box display={'flex'} justifyContent={'space-between'} gap={2} alignItems={'center'} p={2}>

          <SlRefresh size={22} color='green' cursor={'pointer'} onClick={handleRefresh} />


          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, alignItems: 'center', p: 2 }}>
            <Typography>From</Typography>
            <TextField
              required
              size='small'
              id='dateFrom'
              name='dateFrom'
              type='date'
              value={info.dateFrom}
              onChange={handleChange}
            />

            <Typography>To</Typography>
            <TextField
              required
              size='small'
              id='dateTo'
              name='dateTo'
              type='date'
              value={info.dateTo}
              onChange={handleChange}
            />
            <HiOutlineSearch size={25} color='black' cursor={'pointer'} style={{ marginLeft: 15 }}
              onClick={() => getFireDB('landing', info.dateFrom, info.dateTo)} />
          </Box>

        </Box>

        <ReportTable landingData={landingData} handleOpen={handleOpen} setInfo={setInfo}/>
      <Delete_Modal open={open} handleClose={handleClose} info={info}/>
      </Box>

    </div>
  )
}

export default Report