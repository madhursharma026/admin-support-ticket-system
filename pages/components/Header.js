import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { isAuthenticated } from '../AuthCheck/auth';
import styles from '.././../styles/Header/Header.module.css';

function HeaderNav(props) {
    const router = useRouter();
    const [userLogin, setUserLogin] = useState(false)

    function logoutUser() {
        localStorage.setItem('supportTicketLoginUserId', '')
        localStorage.setItem('supportTicketLoginUserEmailAddress', '')
        localStorage.setItem('supportTicketLoginUserUserPosition', '')
        router.push('/login');
    }
    useEffect(() => {
        if (isAuthenticated()) {
            setUserLogin(true)
        }
    })

    return (
        <Navbar expand="lg" className={`${styles.HeaderStyle} py-4 px-3`}>
            <Link href="/" className='px-1'>
                <img src="https://www.freshworks.com/static-assets/images/common/company/logos/logo-fworks-white.svg" alt="#ImgNotFound" width='160px' height="32px" />
            </Link>
            {(userLogin) ?
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ background: 'white' }} />
                :
                <></>
            }
            <Navbar.Collapse className="justify-content-end">
                <Nav className={styles.navOptionsBeforeLGScrn}>
                    {(userLogin) ?
                        <>
                            <Link href='/' className={`${props.pageName === 'viewTicket' ? styles.activeLink : styles.unActiveLink} text-white mx-2`}>View Tickets</Link>
                            <Link href='viewStaffORUser' className={`${props.pageName === 'viewStaffORUser' ? styles.activeLink : styles.unActiveLink} text-white mx-2`}>View/Edit/Suspend (User/Staff)</Link>
                            {/* <Link href='' className={`${props.pageName === '' ? styles.activeLink : styles.unActiveLink} text-white mx-2`}>Manage Staff Permissions</Link> */}
                            <Link href='manageSupportCategories' className={`${props.pageName === 'manageSupportCategories' ? styles.activeLink : styles.unActiveLink} text-white mx-2`}>Manage Categories</Link>
                            <span onClick={() => logoutUser()} style={{ cursor: 'pointer' }} className={`${props.pageName === 'Logout' ? styles.activeLink : styles.unActiveLink} text-white mx-2`}>Logout</span>
                        </>
                        :
                        <></>
                    }
                </Nav>
                <Nav className={styles.navOptionsAfterLGScrn}>
                    {(userLogin) ?
                        <>
                            <Link href='/' className={`${props.pageName === 'viewTicket' ? styles.activeLink : styles.unActiveLink} text-white mx-2 py-2 mt-3`} style={{ display: 'block' }}>View Tickets</Link>
                            <Link href='viewStaffORUser' className={`${props.pageName === 'viewStaffORUser' ? styles.activeLink : styles.unActiveLink} text-white mx-2 py-2`} style={{ display: 'block' }}>View/Edit/Suspend (User/Staff)</Link>
                            {/* <Link href='' className={`${props.pageName === '' ? styles.activeLink : styles.unActiveLink} text-white mx-2 py-2`} style={{ display: 'block' }}>Manage Staff Permissions</Link> */}
                            <Link href='manageSupportCategories' className={`${props.pageName === 'manageSupportCategories' ? styles.activeLink : styles.unActiveLink} text-white mx-2 py-2`} style={{ display: 'block' }}>Manage Categories</Link>
                            <span onClick={() => logoutUser()} style={{ cursor: 'pointer' }} className={`${props.pageName === 'Logout' ? styles.activeLink : styles.unActiveLink} text-white mx-2`}>Logout</span>
                        </>
                        :
                        <></>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default HeaderNav;
