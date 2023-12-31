import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from '../styles/Admin/admin.module.css';
import { UpdateUser, UserSignup, findAllUser } from './api/graphqlAPI';
import HeaderNav from './components/Header';

export default function ViewStaffORUser() {
    const router = useRouter();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [alertBg, setAlertBg] = useState();
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState();
    const [alertData, setAlertData] = useState();
    const [find_All_User] = useMutation(findAllUser);
    const [User_Signup] = useMutation(UserSignup);
    const [Update_User] = useMutation(UpdateUser);
    const [alUserDetails, setAllUserDetails] = useState([]);
    const [lastNameValue, setLastNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [firstNameValue, setFirstNameValue] = useState('');
    const [emailAddressValue, setEmailAddressValue] = useState('');

    async function submitForm(e) {
        e.preventDefault()
        await User_Signup({
            variables: {
                createUserArgs: {
                    emailAddress: emailAddressValue,
                    password: passwordValue,
                    firstName: firstNameValue,
                    lastName: lastNameValue
                }
            }
        })
            .then(async (res) => {
                handleClose()
                setShowAlert(true)
                setAlertBg('success')
                setFirstNameValue('')
                setLastNameValue('')
                setEmailAddressValue('')
                setPasswordValue('')
                findAllUserDetails()
                setAlertData('User Created Successfully!')
            })
            .catch(error => {
                handleClose()
                setShowAlert(true)
                setAlertBg('danger')
                setAlertData(error?.message)
            });
    }

    async function findAllUserDetails() {
        let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        await find_All_User({
            variables: {
                userId: Number(supportTicketLoginUserId)
            }
        })
            .then(res => {
                setAllUserDetails(res.data.findAllUser)
            })
            .catch(err => {
                // setShowAlert(true)
                // setAlertBg('danger')
                setAlertData(err?.message)
            });
    };

    useEffect(() => {
        findAllUserDetails()
    }, []);

    async function suspendUser(userId) {
        let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        await Update_User({
            variables: {
                userId: Number(userId),
                adminUserId: Number(supportTicketLoginUserId)
            }
        })
            .then(res => {
                findAllUserDetails()
            })
            .catch(err => {
                setShowAlert(true)
                setAlertBg('danger')
                setAlertData(err?.message)
            });
    };

    useEffect(() => {
        setTimeout(function () {
            if (showAlert === true) {
                setShowAlert(false)
            }
        }, 1000);
    },)

    return (
        <div style={{ minHeight: '100vh' }}>
            {showAlert ?
                <div className={`alert alert-${alertBg} mb-0`} role="alert">
                    {alertData}
                </div>
                :
                <></>
            }
            <HeaderNav pageName='viewStaffORUser' />
            <div className={styles.ContainerWidth}>
                <div className="m-3">
                    <div className="text-center">
                        <h1 className='my-3'><u>User/Staff Details</u></h1>
                        <button type="button" className="btn btn-primary mb-3" onClick={handleShow}><b>Add User</b></button>
                    </div>

                    {(alUserDetails.length === 0) ?
                        <h1 className='text-center mt-5'>{alertData}</h1>
                        :
                        <div className='mx-3'>
                            <Table striped bordered hover variant="light" className='mt-3 text-center'>
                                <thead>
                                    <tr>
                                        <th className='p-3 fs-5'>Id</th>
                                        <th className='p-3 fs-5'>Email</th>
                                        <th className={`${styles.hideColumnAfterLGScrn} p-3 fs-5`}>Position</th>
                                        <th className={`${styles.hideColumnAfterLGScrn} p-3 fs-5`}>Joined Date</th>
                                        <th className='p-3 fs-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alUserDetails.map((alUserDetails, index) => (
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                            <td>{alUserDetails.emailAddress}</td>
                                            <td className={styles.hideColumnAfterLGScrn} style={{ fontWeight: 'bold' }}>{alUserDetails.userPosition}</td>
                                            <td className={styles.hideColumnAfterLGScrn}>
                                                {moment(alUserDetails.createdAt, 'YYYY-MM-DD HH:mm:ss 2023-12-20 22:07:22.772366').tz('Asia/Kolkata').format('MMMM DD, YYYY [at] h:mm:ss A')}
                                                {/* {alUserDetails.createdAt} */}
                                            </td>
                                            <td>
                                                {alUserDetails.userPosition !== 'admin' ?
                                                    <>
                                                        {alUserDetails.userPosition === 'suspended' ?
                                                            <></>
                                                            :
                                                            <button type="button" className="btn btn-primary" onClick={() => suspendUser(alUserDetails.id)}>Suspend</button>
                                                        }
                                                    </>
                                                    :
                                                    <></>

                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    }
                    <Modal show={show} onHide={handleClose} backdrop="static" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Signup Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={(e) => submitForm(e)}>
                                <div className="row">
                                    <div className="col-sm-6 mb-3">
                                        <label for="exampleInputFirstName1" className="form-label">Firstname</label>
                                        <input type="text" className="form-control" id="exampleInputFirstName1" required value={firstNameValue} onChange={(e) => setFirstNameValue(e.target.value)} />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label for="exampleInputLastName1" className="form-label">Lastname</label>
                                        <input type="text" className="form-control" id="exampleInputLastName1" required value={lastNameValue} onChange={(e) => setLastNameValue(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" required aria-describedby="emailHelp" value={emailAddressValue} onChange={(e) => setEmailAddressValue(e.target.value)} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" required value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)} />
                                </div>
                                <button type="submit" className="btn w-100" style={{ background: '#4825B3', color: 'white' }}>Submit</button>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
