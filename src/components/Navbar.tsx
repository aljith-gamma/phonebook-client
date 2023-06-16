import { Box, Button, Container, Input, InputAdornment, TextField, Typography } from "@mui/material"
import Person2Icon from '@mui/icons-material/Person2';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import AddIcon from '@mui/icons-material/Add';

interface INavbar {
    handleClickOpen: () => void
}

const Navbar = ({ handleClickOpen }: INavbar) => {
    return (
        <Box  boxShadow="0px 13px 10px -15px #111">
            
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