"use client"
import CreateContact from '@/components/CreateContact'
import IndividualContact from '@/components/IndividualContact';
import Navbar from '@/components/Navbar'
import { config } from '@/config/config';
import { Box, Container, Stack, Typography } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';

export interface IContact {
  id: number;
  name: string;
  avatar_url: string;
  phone: string;
  address: string;
  label: string;
  isBookmarked: boolean;
  index: number;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [contacts, setContacts] = useState<IContact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, [load])

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token') || 'token';
      const res = await axios.get(`${config.API_URL}/phonebook`, {
        headers: {
          "Authorization": token
        }
      })
      if(res?.data?.status){
        console.log(res.data.data);
        setContacts(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const refresh = () => {
    setLoad((val) => !val);
  }
  return (
    <Box>
        <Navbar handleClickOpen={handleClickOpen} />
        <CreateContact handleClose={handleClose} refresh={ refresh } open={open} />
        <Container maxWidth="lg" sx={{ my: "90px"}}>
            <Box display="grid" gridTemplateColumns="1fr 1fr">
              <Typography color="#545252">Name</Typography>
              <Typography color="#545252">Phone Number</Typography>
            </Box>

            <Typography mt={3} color="gray">Contacts({ contacts.length })</Typography>

            <Box sx={{ mt: "10px"}}>
              <Stack spacing={2}>
                { !contacts.length ? <h1>No contacts</h1> : (
                  contacts.map((contact, i) => {
                    return <IndividualContact key={contact.id} { ...contact } index={ i } />
                  })
                  )}
              </Stack>
            </Box>
        </Container>
    </Box>
  )
}
