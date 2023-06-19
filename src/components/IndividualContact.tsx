import { IContact } from "@/app/page";
import { Box, Typography } from "@mui/material";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

interface IGenerateImage {
    avatar: string | null;
    name: string
}

const GenerateImage = ({ avatar, name}: IGenerateImage) => {
    const url = avatar && `http://localhost:3001/web/${avatar.split('/').pop()}`;
    if(url){
        console.log(avatar);
        return (
            <Box width={43} height={43} borderRadius="50%" overflow="hidden"
                boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                display="flex" justifyContent="center" alignItems="center"
            >
                <img src={url} alt={name} style={{
                    width: '100%', height: '100%'
                }} />
            </Box>
        )
    }else {
        const colors = [
            {
                c: 'black',
                b: 'white'
            },
            {
                c: 'black',
                b: 'orange'
            },
            {
                c: 'white',
                b: 'green'
            },
            {
                c: 'black',
                b: 'yellow'
            },
            {
                c: 'black',
                b: 'pink'
            }
        ]
        const index = Math.floor(Math.random() * colors.length);
        return (
            <Box width={43} height={43} borderRadius="50%" overflow="hidden"
                boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                display="flex" justifyContent="center" alignItems="center"
                color={colors[index].c} bgcolor={colors[index].b}
            >
                <Typography
                    fontWeight="700" fontSize="20px"
                >{ name[0].toUpperCase() }</Typography>
            </Box>
        )
    }
}

const IndividualContact = ({ name, avatar_url, phone, isBookmarked } : IContact) => {
    const [ show, setShow ] = useState(false);
    const handleShow = (val: boolean) => {
        setShow(val);
    }
    return (
        <Box display="grid" gridTemplateColumns="1fr 1fr" alignItems="center"
            borderBottom="1px solid rgba(0, 0, 0, 0.2)" py={1} px={4} 
            sx={{ "&:hover": {
                    backgroundColor: '#cbd0d3'
                },
                transition: '.2s ease-in-out',
            }}
            onMouseOver={() => handleShow(true)}
            onMouseOut={() => handleShow(false)}
        >
            <Box display="flex" alignItems="center" gap={5}>
                <GenerateImage avatar={ avatar_url} name={ name } />
                <Typography fontSize="18px">{ name }</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Box>
                    <Typography>{ phone }</Typography>
                </Box>
                { show && <Box display="flex" alignItems="center" gap={5}>
                    <Box>
                        { isBookmarked ? 
                            <BookmarkAddedOutlinedIcon sx={{ 
                                cursor: 'pointer',
                                "&:hover": {
                                    color: '#4287f5'
                                }
                            }} /> : 
                            <BookmarkAddOutlinedIcon sx={{ 
                                cursor: 'pointer',
                                "&:hover": {
                                    color: '#4287f5'
                                }
                            }}/> 
                        }
                    </Box>
                    <Box display="flex" gap={2}>
                        <EditOutlinedIcon sx={{ 
                            cursor: 'pointer',
                            "&:hover": {
                                color: '#2ebd2a'
                            }
                        }}/>
                        <DeleteIcon sx={{ 
                            cursor: 'pointer',
                            "&:hover": {
                                color: 'red'
                            }
                        }}/>
                    </Box>
                </Box> }
            </Box>
        </Box>
    )
}

export default IndividualContact;