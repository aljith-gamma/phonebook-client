import { Box, Button, Input, InputAdornment, Typography } from "@mui/material"
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, useRef, useState } from "react";

interface INavbar {
    handleClickOpen: () => void;
    fetchContacts: (count: number, q?: string) => void
}

const Navbar = ({ handleClickOpen, fetchContacts }: INavbar) => {
    const [query, setQuery] = useState('');
    const timeoutId = useRef<any>(null);

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        let q = e.target.value;
        setQuery(q);
        timeoutId.current && clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            debounce(q);
        }, 1000);
    }

    const debounce = (q: string) => {
        fetchContacts(0, q);
    }
    return (
        <Box  boxShadow="0px 13px 10px -15px #111" position="fixed" top="0" width="100%" zIndex="10"
            bgcolor="white"
        >
            
            <Box p="10px 70px" display="flex" 
                justifyContent="space-between"
            >
                <Box display="flex" alignItems="center" gap={2} > 
                    <Box bgcolor="#1972E7" width="45px" height="45px" borderRadius="50%"
                        display="flex" justifyContent="center" alignItems="center"
                    >
                        <Person2Icon sx={{ color: '#fff', fontSize:"30px" }} />
                    </Box>
                    <Box>
                        <Typography fontSize="18px" color="gray" fontWeight="600">
                            Phonebook
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
                        <Input
                            placeholder="Search"
                            sx={{ fontSize: "20px"}}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            }
                            onChange={ handleQueryChange }
                        />
                    </Box>
                </Box>

                <Box display="flex" gap={6} alignItems="center">
                    <Box sx={{ cursor: 'pointer'}}>
                        <FilterAltOutlinedIcon sx={{ fontSize: "30px"}} />
                    </Box>
                    <Box onClick={ handleClickOpen }>
                        <Button variant="text" sx={{ display:"flex", alignItems:"center", border: '1px solid rgba(0, 0, 0, 0.2)' ,
                            color: 'black'
                        }}>
                            <AddIcon sx={{ fontSize: "32px", mt: "-1px", color: '#ee4d25;' }}/>
                            Create contact
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Navbar;