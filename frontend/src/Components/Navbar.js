import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/NavbarStyle.css'
function Navbar(props) {
    let navigate = useNavigate();
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
                        <Link to="/videos" className='n-1'>Saved</Link>
                    </div>
                </div>
                <div className='navbar-main-2'>
                    <div className='navbar-main-button'>
                        <button className='y1' onClick={() => { logout() }}>
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar