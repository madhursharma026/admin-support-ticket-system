import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from '../styles/Admin/admin.module.css';
import { useEffect } from 'react';
import HeaderNav from './components/Header';

export default function waitingTickets() {
    const router = useRouter();

    function moveToViewTicketPage(ticketID) {
        router.push({
            pathname: 'viewTicket',
            query: { ticketID: ticketID }
        });
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <HeaderNav pageName='viewTicket' />
            <div className={styles.ContainerWidth}>
                <div className="m-3">
                    <div className="text-center mt-3">
                        <h1>Tickets <span></span>
                            <Dropdown className='d-sm-inline' style={{ border: 0, }}>
                                <Dropdown.Toggle variant='transparent' id="dropdown-basic" size="lg">
                                    (Tickets Waiting for Client Reply)
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                <Dropdown.Item onClick={() => router.push('/')} style={{ fontSize: '20px' }}>Opened Tickets</Dropdown.Item>
                                    {/* <Dropdown.Item onClick={() => router.push('/waitingTickets')} style={{ fontSize: '20px' }}>Waiting for Client Reply</Dropdown.Item> */}
                                    <Dropdown.Item onClick={() => router.push('/closedTickets')} style={{ fontSize: '20px' }}>Closed Tickets</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </h1>
                    </div>

                    <Table striped bordered hover variant="light" className='mt-3 text-center'>
                        <thead>
                            <tr>
                                <th className='p-3 fs-5'>Id</th>
                                <th className='p-3 fs-5'>Title</th>
                                <th className='p-3 fs-5'>Category</th>
                                <th className={`p-3 fs-5 ${styles.hideColumnAfterLGScrn}`}>Priority</th>
                                <th className='p-3 fs-5'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>1</td>
                                <td>Title 01</td>
                                <td>Catg. 01</td>
                                <td className={styles.hideColumnAfterLGScrn}>Low</td>
                                <td className={styles.hideColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('01')}>View</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>Closed</button>
                                </td>
                                <td className={styles.showColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('01')}>V</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>C</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>2</td>
                                <td>Title 01</td>
                                <td>Catg. 01</td>
                                <td className={`text-warning ${styles.hideColumnAfterLGScrn}`} style={{ fontWeight: '500' }}>Medium</td>
                                <td className={styles.hideColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('02')}>View</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>Closed</button>
                                </td>
                                <td className={styles.showColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('02')}>V</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>C</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>3</td>
                                <td>Title 01</td>
                                <td>Catg. 01</td>
                                <td className={`text-danger ${styles.hideColumnAfterLGScrn}`} style={{ fontWeight: 'bold' }}>High</td>
                                <td className={styles.hideColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('03')}>View</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>Closed</button>
                                </td>
                                <td className={styles.showColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('03')}>V</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>C</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>4</td>
                                <td>Title 01</td>
                                <td>Catg. 01</td>
                                <td className={`text-warning ${styles.hideColumnAfterLGScrn}`} style={{ fontWeight: '500' }}>Medium</td>
                                <td className={styles.hideColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('04')}>View</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>Closed</button>
                                </td>
                                <td className={styles.showColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('04')}>V</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>C</button>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>5</td>
                                <td>Title 01</td>
                                <td>Catg. 01</td>
                                <td className={`text-danger ${styles.hideColumnAfterLGScrn}`} style={{ fontWeight: 'bold' }}>High</td>
                                <td className={styles.hideColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('05')}>View</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>Closed</button>
                                </td>
                                <td className={styles.showColumnAfterLGScrn}>
                                    <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage('05')}>V</button>
                                    &nbsp;
                                    <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={()=>alert("Closed")}>C</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
