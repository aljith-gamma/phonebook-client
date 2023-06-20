import { config } from "@/config/config";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IContact } from "@/app/page";


interface IEditContact extends IContact {
    handleClose: () => void;
    open: boolean;
    refresh: () => void;
}

const EditContact = (props: IEditContact) => {
    const { handleClose, open, name, phone, address, label, id, refresh} = props;

    const [ data, setData ] = useState({
        name: name,
        phone: phone,
        address: address,
        label: label 
    })
    
    const [avatar, setAvatar] = useState<null | File>(null);


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

    const closeHandler = () => {
        setData({
            name: '',
            phone: '',
            address: '',
            label: '' 
        })
        setAvatar(null);
        handleClose();
    }

    const avatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0];
            setAvatar(image);
        }
    }

    const formDataHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            if(avatar) {
                formData.append('avatar', avatar);
            } 
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('address', data.address);
            formData.append('label', data.label);
            
            const token = localStorage.getItem('token') || 'token';
            const res = await axios.post(`${config.API_URL}/phonebook/update/${id}`, formData, {
                headers: {
                    'Authorization': token
                }
            })
            console.log(res);
            if(res?.data?.status){
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                });
                
                refresh();
                setTimeout(() => {
                    handleClose();
                }, 2000);
            }else {
                toast.warning(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (err: any) {
            console.log(err?.response?.data?.message);
            console.log(err);
            if(err?.response?.data?.message === 'Forbidden resource'){
                console.log('Please login again!');
                return;
            }
            if(err?.response?.data?.message){
                toast.error(err.response.data.message[0], {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }

  return (
    <div>
        <Dialog open={open} onClose={closeHandler} >
            <ToastContainer />
            <Box sx={{ width: "600px"}}>
                <DialogTitle fontSize="28px" textAlign="center">Edit contact</DialogTitle>
                <DialogContent >
                    <form onSubmit={ formDataHandler }>
                        <Stack spacing={1}>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={ handleChange }
                                required={true}
                                value={data.name}
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
                                required={true}
                                value={data.phone}
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
                                required={true}
                                value={data.address}
                            />

                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-standard-label">Label</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={data.label}
                                    onChange={handleChangeSelect}
                                    required={true}
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
                                <InputLabel>Avatar</InputLabel>
                                <TextField type="file" onChange={ avatarHandler } />
                            </Box>

                            <Box>
                                <Button type="submit" size="large" variant="contained" sx={{ mt: "20px", width:"100%"}}>
                                    Save Contact
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ closeHandler }>Cancel</Button>
                </DialogActions>
            </Box>
        </Dialog>
    </div>
  );
}

export default EditContact;