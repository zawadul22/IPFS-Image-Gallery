import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import './Dropzone.css'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';

const Dropzone = (props) => {
    const [image, setImage] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const onDrop = useCallback(files => {
        setImage(files);
    })
    const {
        getRootProps,
        getInputProps } = useDropzone({
            onDrop,
            accept: {
                'image/*': ['.jpeg', '.png']
            }
        });

    useEffect(() => {
        if (image.length === 0) {
            setIsDisabled(true);
        }
        else {
            setIsDisabled(false);
        }
    }, [image])

    const uploadImage = async () => {
        const formData = new FormData();
        if (image) {
            formData.append('file', image[0]);
        }
        try {
            const upload = await fetch(`http://localhost:8081/files/upload/${props.username}`, {
                method: 'POST',
                body: formData
            })
            if (!upload.ok) {
                throw new Error(`Couldn't upload photo`);
            }
            console.log("Image uploaded successfully");
            props.close();
            props.snackbar();
        }
        catch (error) {
            console.error(error);
        }
    }

    const clearSelect = () => {
        setImage([]);
    }

    return (
        <div>
            <Dialog onClose={props.close} open={props.open} fullWidth>
                <DialogTitle textAlign={'center'}>
                    <strong>Drag your image or click here to upload</strong>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            {image.length !== 0 ? (
                                <div>
                                    {image.map((item) => (
                                        <>
                                            {item.name}&nbsp;&nbsp;
                                            <button style={{ border: '0px' }} onClick={clearSelect}>×</button>
                                        </>
                                    ))}

                                </div>
                            ) : (
                                <>
                                    <input {...getInputProps()} />
                                    <ImageIcon style={{ color: '#9c9c9c' }} />
                                </>
                            )}
                        </div>
                    </DialogContentText>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', paddingBottom: '0px' }}>
                        <Button onClick={uploadImage} disabled={isDisabled} variant="contained">Upload</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dropzone;