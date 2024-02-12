import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import './Dropzone.css'
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';

const Dropzone = (props) => {
    const [image, setImage] = useState([]);

    const onDrop = useCallback(files => {
        setImage(files);
    })

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps } = useDropzone({
            onDrop,
            accept: {
                'image/*': ['.jpeg', '.png']
            }
        });

    return (
        <div>
            <Dialog onClose={props.close} open={props.open} fullWidth>
                <DialogTitle textAlign={'center'}>
                    <strong>Drag your image or click here to upload</strong>
                </DialogTitle>
                <DialogContent>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <ImageIcon style={{ color: '#9c9c9c' }}/>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dropzone;