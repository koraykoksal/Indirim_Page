import React from 'react'
import Modal from '@mui/material/Modal';
import { Typography, Grid, TextField, Button } from "@mui/material"
import { Box, Container } from "@mui/material"
import { FaWindowClose } from "react-icons/fa";
import useAuthCall from '../../hooks/useAuthCall';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 525,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

const Delete_Modal = ({ handleClose, open, info }) => {

    const { getFireDB ,removeFirebaseData} = useAuthCall()

    const handleSubmit = (e) => {

        e.preventDefault()

        if (info.type == "landing") {

            if (info.id) {
                removeFirebaseData('landing',info.id)
                getFireDB('landing',"","")
            }
        }

        handleClose()
    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>

                    <FaWindowClose size={25} color='red' cursor={'pointer'} onClick={handleClose} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

                        <Typography align='center' variant='h5'>Kayıt Silinecek Emin Misiniz ?</Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 3 }}>

                            <Button variant='contained' color='success' onClick={handleSubmit}>Evet</Button>

                            <Button variant='outlined' color='error' onClick={handleClose}>Hayır</Button>
                        </Box>
                    </Box>

                </Box>


            </Modal>


        </div>
    )
}

export default Delete_Modal