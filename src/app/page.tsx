"use client"
import CreateContact from '@/components/CreateContact'
import Navbar from '@/components/Navbar'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
        <Navbar handleClickOpen={handleClickOpen} />
        <CreateContact handleClose={handleClose} open={open} />
        <Container maxWidth="lg" sx={{ mt: "20px"}}>
            <Box display="grid" gridTemplateColumns="1fr 1fr">
              <Typography color="#545252">Name</Typography>
              <Typography color="#545252">Phone Number</Typography>
            </Box>
        </Container>
    </Box>
  )
}
