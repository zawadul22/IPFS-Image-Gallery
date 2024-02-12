import { useEffect, useState } from 'react';
import './Gallery.css'
import { Button, Dialog } from '@mui/material';
import GalleryNavbar from './Navbar';
import Dropzone from './Dropzone'
import UploadIcon from '@mui/icons-material/Upload';
import Image from '../assets/Ape.png'
import { Col, Container, Row } from 'react-bootstrap';

const Gallery = (props) => {
    const [open, setOpen] = useState(false);
    const [expand, setExpand] = useState(false);
    const [expandedPhoto , setExpandedPhoto] = useState();
    const [imageList, setImageList] = useState([]);

    const close = () => {
        setOpen(false);
    }

    const show = () => {
        setOpen(true);
    }

    const expandPhoto = (e) => {
        setExpand(true);
        setExpandedPhoto(e);
    }

    const collapsePhoto = () => {
        setExpand(false);
    }

    useEffect(() => {
        fetch(`http://localhost:8081/files/get/eJs465YLEUexVmYZ1HOt53ukEBu1`)
            .then((res) => res.json())
            .then((data) => {
                setImageList(data);
                console.log(data);
            })
            .catch((e) => console.error)
    }, [])

    return (
        <>
            <GalleryNavbar logout={props.logout} />
            <div style={{ marginLeft: '2%', marginRight: '2%', marginTop: '1.5%' }}>
                <Button onClick={show} variant='contained'><UploadIcon /> Upload</Button>
                <Dropzone open={open} close={close} />
                {/* <Row style={{ marginTop: '2%' }}>
                    {Array.from({ length: 30 })
                        .map((item, index) => (
                            <Col key={index} lg={2} style={{ marginBottom: '1.5%' }}>
                                <img src={Image} onClick={expandPhoto} style={{ width: '100%', borderRadius: '3px', boxShadow: '0px 0px 4px rgb(218, 218, 218)' }} />
                                <div style={{ fontSize: '15pt', fontWeight: '550' }}>Bored Ape</div>
                                <div>11/07/2023</div>
                            </Col>
                        ))}
                </Row> */}
                <Row className='image-grid' style={{marginTop : '2%'}}>
                    {imageList.map((item, index) => (
                        <Col className='image-container' xs={6} sm={4} md={3} lg={2} key={index} >
                            <img className='image' src={`data:image/jpeg;base64,${item}`} onClick={()=>{expandPhoto(item)}} />
                        </Col>
                    ))}
                </Row>

                <Dialog onClose={collapsePhoto} open={expand} fullWidth>
                    <img src={`data:image/jpeg;base64,${expandedPhoto}`} style={{ width: '100%' }} />
                </Dialog>
            </div>
        </>
    )
}

export default Gallery;