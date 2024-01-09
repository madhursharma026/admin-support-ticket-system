import moment from 'moment';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import styles from '../styles/Admin/admin.module.css';
import { AdminReadSingleTicket, CreateTicketReply, GetAllRepliesBySingleTicket, updateStatusClosed } from './api/graphqlAPI';
import HeaderNav from './components/Header';

export default function viewTicket() {
    const router = useRouter();
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [alertBg, setAlertBg] = useState();
    const [showAlert, setShowAlert] = useState();
    const [alertData, setAlertData] = useState();
    const [ticketDetail, setTicketDetail] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryMessage, setCategoryMessage] = useState('');
    const [Create_Ticket_Reply] = useMutation(CreateTicketReply);
    const [update_Status_Closed] = useMutation(updateStatusClosed);
    const [allTicketsReplies, setAllTicketsReplies] = useState([]);
    const [Get_Find_Single_Ticket] = useMutation(AdminReadSingleTicket);
    const [Get_All_Replies_By_Single_Ticket] = useMutation(GetAllRepliesBySingleTicket);

    async function getSingleTicket() {
        let supportTicketSingleTicketId = (localStorage.getItem('supportTicketSingleTicketId'))
        await Get_Find_Single_Ticket({
            variables: {
                adminReadSingleTicketId: Number(supportTicketSingleTicketId)
            }
        })
            .then(res => {
                setTicketDetail(res.data.adminReadSingleTicket)
                setCategoryName(res.data.adminReadSingleTicket.category.category_name)
            })
            .catch(err => {
                setShowAlert(true)
                setAlertBg('danger')
                setAlertData(err?.message)
            });
    };

    useEffect(() => {
        getSingleTicket()
    }, []);

    useEffect(() => {
        setTimeout(function () {
            if (showAlert === true) {
                setShowAlert(false)
            }
        }, 1000);
    },)

    async function getAllReplies() {
        let supportTicketSingleTicketId = (localStorage.getItem('supportTicketSingleTicketId'))
        await Get_All_Replies_By_Single_Ticket({
            variables: {
                ticketId: Number(supportTicketSingleTicketId)
            }
        })
            .then(res => {
                setAllTicketsReplies(res.data.getAllRepliesBySingleTicket)
            })
            .catch(err => {
                setShowAlert(true)
                setAlertBg('danger')
                setAlertData(err?.message)
            });
    };

    useEffect(() => {
        getAllReplies()
    }, []);



    async function formSubmit() {
        let LoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        let supportTicketSingleTicketId = (localStorage.getItem('supportTicketSingleTicketId'))
        Create_Ticket_Reply({
            variables: {
                createTicketReplyArgs: {
                    message: categoryMessage,
                    ticket_id: Number(supportTicketSingleTicketId),
                    replied_by_id: Number(LoginUserId)
                }
            },

        }).then(async (res) => {
            handleClose()
            setShowAlert(true)
            setAlertBg('success')
            setAlertData('Ticket Submit Successfully')
            setCategoryMessage('')
            getAllReplies()
        }).catch(error => {
            setShowAlert(true)
            setAlertBg('danger')
            setAlertData(error?.message)
        });
    }

    async function makeTicketClosed(ticketId) {
        await update_Status_Closed({
            variables: {
                ticketId: ticketId
            }
        })
            .then(async (res) => {
                setShowAlert(true)
                setAlertBg('success')
                setAlertData('Ticket Closed Successfully!')
                getSingleTicket()
            })
            .catch(error => {
                setShowAlert(true)
                setAlertBg('danger')
                setAlertData(error?.message)
            });
    }

    useEffect(() => {
        setTimeout(function () {
            if (alertData === true) {
                setAlertData(false)
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
            <HeaderNav pageName='viewTicket' />
            <div className={styles.ContainerWidth}>
                <div className="m-3">
                    <div className='text-center mt-3'>
                        <h5>Ticket Id: {ticketDetail.ticket_id} ({ticketDetail.status})</h5>
                        <div className="row mb-4">
                            <div className="col-sm-6"><h5>Category: {categoryName}</h5></div>
                            <div className={`col-sm-6 ${ticketDetail.priority === 'High' ? 'text-danger' : 'text-black'}`} style={{ fontWeight: 'bold' }}><h5><u>{ticketDetail.priority}</u> Priority</h5></div>
                        </div>
                        <h2 style={{ textAlign: 'justify' }}>{ticketDetail.title}</h2>

                        <h6 className='mt-4' style={{ textAlign: 'justify' }}>
                            {ReactHtmlParser((ticketDetail.message))}
                        </h6>
                        <button type="button" className="btn btn-primary mt-4" onClick={() => router.back()}>Back</button>
                        {ticketDetail.status === 'closed' ?
                            <></>
                            :
                            <>
                                &emsp;
                                <button type="button" className="btn btn-warning mt-4" onClick={() => makeTicketClosed(ticketDetail.id)}>Closed</button>
                            </>
                        }
                        &emsp;
                        <button type="button" className="btn btn-primary mt-4" onClick={() => handleShow()}>Reply</button>
                    </div>
                </div>
                {(allTicketsReplies.length === 0) ?
                    <></>
                    :
                    <div className='mt-5 mx-3'>
                        <h1>Replies: </h1>
                        <Table striped bordered hover variant="light" className='mt-3 text-center'>
                            <thead>
                                <tr>
                                    <th className='p-3 fs-5'>Id</th>
                                    <th className='p-3 fs-5'>Title</th>
                                    <th className='p-3 fs-5'>Replied By</th>
                                    <th className={`p-3 fs-5 ${styles.hideColumnAfterMDScrn}`}>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTicketsReplies.map((allTicketsReplies, index) => (
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                        <td>{allTicketsReplies.message}</td>
                                        <td><b>{allTicketsReplies.replied_by.firstName}</b> ({allTicketsReplies.replied_by.userPosition})</td>
                                        <td className={styles.hideColumnAfterMDScrn}>
                                            {(moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).years() !== 0 ?
                                                (moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).years() + ' Years'
                                                :
                                                <>
                                                    {(moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).months() !== 0 ?
                                                        (moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).months() + ' Months'
                                                        :
                                                        <>
                                                            {(moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).days() !== 0 ?
                                                                (moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).days() + ' Days'
                                                                :
                                                                <>
                                                                    {(moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).hours() !== 0 ?
                                                                        (moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).hours() + ' Hours'
                                                                        :
                                                                        <>
                                                                            {(moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).minutes() !== 0 ?
                                                                                (moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).minutes() + ' Minutes'
                                                                                :
                                                                                <>
                                                                                    {(moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).seconds() !== 0 ?
                                                                                        (moment.duration(moment().diff(moment(new Date(Number(allTicketsReplies.ticket.duration))).format('YYYY-MM-DD HH:mm:ss')))).seconds() + ' Seconds'
                                                                                        :
                                                                                        <></>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Reply Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label for="ticketReplyMessage" className="form-label">Messgae</label>
                    <textarea rows={7} className="form-control w-100" id="ticketReplyMessage" required value={categoryMessage} onChange={(e) => setCategoryMessage(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => formSubmit()}>
                        Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

