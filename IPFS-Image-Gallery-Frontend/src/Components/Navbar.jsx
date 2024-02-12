import { Nav, Navbar } from "react-bootstrap";
import { auth } from '../Config/Firebase'
import { signOut } from "firebase/auth";

const GalleryNavbar = (props) => {

    const logout = () => {
        signOut(auth)
            .then(() => {
                props.logout();
            })
            .catch(e => console.error(e))
    }
    
    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
            <Navbar.Brand>IPFS Image Gallery</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text onClick={logout} style={{ cursor: 'pointer' }}>
                    Sign Out
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default GalleryNavbar;