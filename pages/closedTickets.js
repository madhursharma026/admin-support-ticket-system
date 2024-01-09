import moment from 'moment';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import { Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import HeaderNav from './components/Header';
import styles from '../styles/Admin/admin.module.css';
import { GetAllClosedTickets, } from './api/graphqlAPI';
import { useLazyQuery, useMutation } from '@apollo/client';

export default function ClosedTickets() {
    const router = useRouter();
    const [allTickets, setAllTickets] = useState([]);
    const [alertData, setAlertData] = useState(false);
    const [alertDataBG, setAlertDataBG] = useState('');
    const [showAlertData, setshowAlertData] = useState("");
    const [Get_All_Closed_Tickets] = useLazyQuery(GetAllClosedTickets);

    function moveToViewTicketPage(ticketID) {
        localStorage.setItem('supportTicketSingleTicketId', ticketID);
        router.push('viewTicket');
    }

    async function getAllClosedTickets() {
        let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        await Get_All_Closed_Tickets({
            variables: {
                adminUserId: Number(supportTicketLoginUserId)
            }
        })
            .then(res => {
                setAllTickets(res.data.getAllClosedTickets)
            })
            .catch(err => {
                setAlertData(true)
                setAlertDataBG('danger')
                setshowAlertData(err?.message)
            });
    };

    useEffect(() => {
        getAllClosedTickets()
    }, []);

    useEffect(() => {
        setTimeout(function () {
            if (alertData === true) {
                setAlertData(false)
            }
        }, 1000);
    },)

    return (
        <div style={{ minHeight: '100vh' }}>
            {alertData ?
                <div className={`alert alert-${alertDataBG} mb-0`} role="alert">
                    {showAlertData}
                </div>
                :
                <></>
            }
            <HeaderNav pageName='viewTicket' />
            <div className={styles.ContainerWidth}>
                <div className="m-3">
                    <div className="text-center mt-3">
                        <h1>Closed Tickets <span></span>
                            <Dropdown className='d-sm-inline' style={{ border: 0, }}>
                                <Dropdown.Toggle variant='transparent' id="dropdown-basic" size="lg">
                                    (Closed Tickets)
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => router.push('/')} style={{ fontSize: '20px' }}>Opened Tickets</Dropdown.Item>
                                    {/* <Dropdown.Item onClick={() => router.push('/waitingTickets')} style={{ fontSize: '20px' }}>Waiting for Client Reply</Dropdown.Item> */}
                                    <Dropdown.Item onClick={() => router.push('/closedTickets')} style={{ fontSize: '20px' }}>Closed Tickets</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </h1>
                    </div>

                    {(allTickets.length !== 0) ?
                        <>
                            <Table striped bordered hover variant="light" className='mt-3 text-center'>
                                <thead>
                                    <tr>
                                        <th className='p-3 fs-5'>Id</th>
                                        <th className='p-3 fs-5'>Title</th>
                                        <th className='p-3 fs-5'>Catg.</th>
                                        <th className={`p-3 fs-5 ${styles.hideColumnAfterLGScrn}`}>Duration</th>
                                        <th className={`p-3 fs-5 ${styles.hideColumnAfterMDScrn}`}>Priority</th>
                                        <th className='p-3 fs-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTickets.map((allTickets, index) => (
                                        <tr>
                                            <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                            <td>{allTickets.title}</td>
                                            <td>{allTickets.category.category_name}</td>
                                            {/* <td className={`${styles.hideColumnAfterLGScrn}`}><b><td className={`${styles.hideColumnAfterLGScrn}`}><b>{moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')}</b></td></b></td> */}
                                            <td className={styles.hideColumnAfterMDScrn}>
                                                {(moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).years() !== 0 ?
                                                    (moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).years() + ' Years'
                                                    :
                                                    <>
                                                        {(moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).months() !== 0 ?
                                                            (moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).months() + ' Months'
                                                            :
                                                            <>
                                                                {(moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).days() !== 0 ?
                                                                    (moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).days() + ' Days'
                                                                    :
                                                                    <>
                                                                        {(moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).hours() !== 0 ?
                                                                            (moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).hours() + ' Hours'
                                                                            :
                                                                            <>
                                                                                {(moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).minutes() !== 0 ?
                                                                                    (moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).minutes() + ' Minutes'
                                                                                    :
                                                                                    <>
                                                                                        {(moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).seconds() !== 0 ?
                                                                                            (moment.duration(moment().diff(moment(new Date(Number(allTickets.duration))).format('YYYY-MM-DD HH:mm:ss')))).seconds() + ' Seconds'
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
                                            <td className={`${styles.hideColumnAfterLGScrn} ${allTickets.priority === 'High' ? 'text-danger' : 'text-black'}`}><b>{allTickets.priority}</b></td>
                                            <td className={styles.hideColumnAfterLGScrn}>
                                                <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage(allTickets.id)}>View</button>
                                            </td>
                                            <td className={styles.showColumnAfterLGScrn}>
                                                <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage(allTickets.id)}>V</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                        :
                        <h1 className='text-center mt-5'>
                            No Data Found
                        </h1>
                    }
                </div>
            </div >
        </div >
    )
}
