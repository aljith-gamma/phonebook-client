import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface ICreateContact {
    handleClose: () => void,
    open: boolean
}

const CreateContact = ({ handleClose, open }: ICreateContact) => {
    const [ data, setData ] = useState({
        name: '',
        phone: '',
        address: '',
        label: '' 
    })

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setData({
            ...data,
            label: event.target.value
        })
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement> ) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
  

  return (
    <div>
        <Dialog open={open} onClose={handleClose} >
            <Box sx={{ width: "600px"}}>
                <DialogTitle fontSize="28px" textAlign="center">Create new contact</DialogTitle>
                <DialogContent >
                    <form >
                        <Stack spacing={2}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={ handleChange }
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={ handleChange }
                            />


                            <TextField
                                autoFocus
                                margin="dense"
                                name="phone"
                                label="Phone number"
                                type="number"
                                fullWidth
                                variant="standard"
                                onChange={ handleChange }
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                name="address"
                                label="Address"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={ handleChange }
                            />

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={data.label}
                                    onChange={handleChangeSelect}
                                    label="Label"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="WORK">WORK</MenuItem>
                                    <MenuItem value="SCHOOL">SCHOOL</MenuItem>
                                    <MenuItem value="FRIENDS">FRIENDS</MenuItem>
                                    <MenuItem value="FAMILY">FAMILY</MenuItem>
                                </Select>
                            </FormControl>
                            <Box>
                                <TextField label="Avatar" type="file" />
                            </Box>

                            <Box>
                                <Button size="large" variant="contained" sx={{ mt: "20px", width:"100%"}}>
                                    Create Contact
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Box>
        </Dialog>
    </div>
  );
}

export default CreateContact;