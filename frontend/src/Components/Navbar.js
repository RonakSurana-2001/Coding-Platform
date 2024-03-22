import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/NavbarStyle.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// let baseUrl="https://coding-app-xwu4.onrender.com";
let baseUrl = "http://localhost:3001"
function Navbar(props) {
    let sizePage=window.outerWidth;
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius:'10px'
    };
    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius:'10px'
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [credentials, setCredentials] = useState({ emailId: "" });
    const handleSubmit =async (type) => {
        fetch(`${baseUrl}/auth/adminDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailId: credentials.emailId,type:type })
        });
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    let navigate = useNavigate();
    const [person, setPerson] = useState(null);
    const [showOptions, setShowOptions] = useState(true);
    let logout = () => {
        navigate("/");
        localStorage.clear();
    }
    useEffect(() => {
        let btn = document.querySelector('#navbar-icon');
        let nav = document.querySelector('.navbar-main');

        const func = (e) => {
            nav.classList.toggle('toggle');
        };

        if (btn) {
            btn.addEventListener('click', func);
        }

        return () => {
            // Clean up the event listener when the component is unmounted
            if (btn) {
                btn.removeEventListener('click', func);
            }
        };
    }, []);

    const getUserInfo = async () => {
        const response = await fetch(`${baseUrl}/auth/setUserDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usersId: localStorage.getItem("userId") })
        });
        const json = await response.json();
        setPerson(json);
    }

    useEffect(() => {
        getUserInfo();
    }, [person])


    return (
        <>
            <div id='navbar-icon'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="100px" width="300px" xmlns="http://www.w3.org/2000/svg"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
            </div>
            <div className='navbar-main toggle'>
                <div className='navbar-main-0'>
                    <div className='navbar-items'>
                        <Link to="/" className='n-1'>WeCode</Link>
                    </div>
                </div>
                <div className='navbar-main-1'>
                    <div className='navbar-items y1'>
                        <Link to="/homePage" className='n-1'>Problems</Link>
                    </div>
                    <div className='navbar-items y1'>
                        <Link to="/saved" className='n-1'>Saved</Link>
                    </div>
                    <div className='navbar-items y1'>
                        <Link to="/profile" className='n-1'>Profile</Link>
                    </div>
                </div>
                <div className='navbar-main-2'>
                    <div className='navbar-main-button'>
                        <button className='y1' id="buttonColor" onClick={() => { logout() }}>
                            Sign out
                        </button>
                    </div>
                    {localStorage.getItem("isLogin") && person && person[0]?.isAdmin == "true" && (
                        <div>
                            <div className='navbar-main-button'>
                                <button className='y1' id="buttonColor">
                                    Options
                                </button>
                                {showOptions && (
                                    <div className="dropdown-content">
                                        <div onClick={() => { handleOpen() }}>Make Admin</div>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box {...(sizePage>1000?{sx:style}:{sx:style1})}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Add or Remove Admin
                                                </Typography>
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                    <form>
                                                        <div className='admin-container'>
                                                            <label htmlFor="qsno">Email Id</label>
                                                        </div>
                                                        <div className='admin-container'>
                                                            <input type="text" id="emailId" name="emailId" onChange={onChange} value={credentials.emailId} />
                                                        </div>
                                                        <div className='admin-container-button'>
                                                        <button onClick={() => handleSubmit("true")}>Add Admin</button>
                                                        <button onClick={() => handleSubmit("false")}>Remove Admin</button>
                                                        </div>
                                                    </form>
                                                </Typography>
                                            </Box>
                                        </Modal>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar