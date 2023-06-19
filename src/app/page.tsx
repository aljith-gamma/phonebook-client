"use client"
import CreateContact from '@/components/CreateContact'
import IndividualContact from '@/components/IndividualContact';
import Navbar from '@/components/Navbar'
import { config } from '@/config/config';
import { Box, Container, Pagination, Stack, Typography } from '@mui/material'
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';

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
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchContacts();
  }, [load])

  const fetchContacts = async (count: number = 0) => {
    try {
      const token = localStorage.getItem('token') || 'token';
      const res = await axios.get(`${config.API_URL}/phonebook?skip=${count * 10}`, {
        headers: {
          "Authorization": token
        }
      })
      if(res?.data?.status){
        console.log(res.data.data);
        setContacts(res.data.data);
        const count = Math.floor((res.data.count/10)) + 1
        setTotalPage(count);
        setTotalCount(res.data.count);
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

  const pageChangeHandler = (curPage: number) => {
    console.log(curPage)
    fetchContacts(curPage-1);
    setPage(curPage);
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

            <Typography mt={3} color="gray">Contacts({ totalCount })</Typography>

            <Box sx={{ mt: "10px"}}>
              <Stack spacing={2}>
                { !contacts.length ? <h1>No contacts</h1> : (
                  contacts.map((contact, i) => {
                    return <IndividualContact key={contact.id} { ...contact } index={ i } />
                  })
                  )}
              </Stack>
            </Box>

            <Box mt={5} display="flex" justifyContent="center">
              <Pagination count={ totalPage } page={ page } color="secondary" 
                onChange={(e: ChangeEvent<unknown>, curPage: number) => {
                  pageChangeHandler(curPage);
                }}
              />
            </Box>
        </Container>
    </Box>
  )
}
