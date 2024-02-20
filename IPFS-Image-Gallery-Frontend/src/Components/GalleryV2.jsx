import { useEffect, useState } from 'react';
import './Gallery.css'
import { Alert, Button, Dialog, Snackbar } from '@mui/material';
import GalleryNavbar from './Navbar';
import Dropzone from './Dropzone'
import UploadIcon from '@mui/icons-material/Upload';
import Image from '../assets/Ape.png'
import { Col, Container, Row } from 'react-bootstrap';

const GalleryV2 = (props) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [expand, setExpand] = useState(false);
    const [expandedPhoto, setExpandedPhoto] = useState();
    const [imageList, setImageList] = useState([]);

    const closeDialog = () => {
        setDialogOpen(false);
    }

    const showDialog = () => {
        setDialogOpen(true);
    }

    const showSnackbar = () => {
        setSnackbarOpen(true);
    }

    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }

    const expandPhoto = (e) => {
        setExpand(true);
        setExpandedPhoto(e);
    }

    const collapsePhoto = () => {
        setExpand(false);
    }

    useEffect(() => {
        fetch(`http://localhost:8081/files/get/cid/${props.username}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.message !== 'No images found') {
                    setImageList(data);
                }
            })
            .catch((e) => console.error(e))
    }, [])

    return (
        <>
            <GalleryNavbar logout={props.logout} />
            <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: '1.5%' }}>
                <Button onClick={showDialog} variant='contained'><UploadIcon /> Upload</Button>
                <Dropzone open={dialogOpen} close={closeDialog} username={props.username} snackbar={showSnackbar} />
                <Row className='image-grid' style={{ marginTop: '2%' }}>
                    {imageList.length !== 0 ? (
                        <>
                            {imageList.map((item, index) => (
                                <Col className='image-container' xs={6} sm={4} md={3} lg={2} key={index} >
                                    <img className='image' src={`http://127.0.0.1:8080/ipfs/${item}`} onClick={() => { expandPhoto(item) }} />
                                </Col>
                            ))
                            }
                        </>

                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '15%' }}>
                            <h1 style={{ color: '#959595' }}>No image found</h1>
                        </div>
                    )}
                </Row>
                <Dialog onClose={collapsePhoto} open={expand} style={{ objectFit: 'contain' }}>
                    <img src={`http://127.0.0.1:8080/ipfs/${expandedPhoto}`} width={"100%"} height={"590px"} />
                </Dialog>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={closeSnackbar}>
                    <Alert
                        severity='success'
                        sx={{ width: '100%' }}>
                        Image added successfully
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default GalleryV2;