import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import { Dropdown } from 'react-bootstrap';
import HeaderNav from './components/Header';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from '../styles/Admin/admin.module.css';
import ProtectedRoute from './AuthCheck/ProtectedRoute';
import { getAllOpenedTickets, updateStatusClosed } from './api/graphqlAPI';

const Home = () => {
  const router = useRouter();
  const [allTickets, setAllTickets] = useState([]);
  const [alertData, setAlertData] = useState(false);
  const [alertDataBG, setAlertDataBG] = useState('');
  const [showAlertData, setshowAlertData] = useState("");
  const [Get_All_Tickets] = useMutation(getAllOpenedTickets);
  const [update_Status_Closed] = useMutation(updateStatusClosed);

  function moveToViewTicketPage(ticketID) {
    localStorage.setItem('supportTicketSingleTicketId', ticketID);
    router.push('viewTicket');
  }

  async function getAllTickets() {
    let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
    await Get_All_Tickets({
      variables: {
        adminUserId: Number(supportTicketLoginUserId)
      }
    })
      .then(res => {
        setAllTickets(res.data.getAllOpenedTickets)
      })
      .catch(err => {
        setAlertData(true)
        setAlertDataBG('danger')
        setshowAlertData(err?.message)
      });
  };

  useEffect(() => {
    getAllTickets()
  }, []);

  async function makeTicketClosed(ticketId) {
    await update_Status_Closed({
      variables: {
        ticketId: ticketId
      }
    })
      .then(async (res) => {
        setAlertData(true)
        setAlertDataBG('success')
        setshowAlertData('Ticket Closed Successfully!')
        getAllTickets()
      })
      .catch(error => {
        setAlertData(true)
        setAlertDataBG('danger')
        setshowAlertData(error?.message)
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
            <h1>Tickets <span></span>
              <Dropdown className='d-sm-inline' style={{ border: 0, }}>
                <Dropdown.Toggle variant='transparent' id="dropdown-basic" size="lg">
                  (Opened Tickets)
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
                    <th className='p-3 fs-5'>Status</th>
                    <th className={`p-3 fs-5 ${styles.hideColumnAfterLGScrn}`}>Priority</th>
                    <th className='p-3 fs-5'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allTickets.map((allTickets, index) => (
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                      <td>{allTickets.title}</td>
                      <td>{allTickets.category.category_name}</td>
                      <td>{allTickets.status === 'open' ? <b>{allTickets.status}</b> : `${allTickets.status}`}</td>
                      <td className={`${styles.hideColumnAfterLGScrn} ${allTickets.priority === 'High' ? 'text-danger' : 'text-black'}`}><b>{allTickets.priority}</b></td>
                      <td className={styles.hideColumnAfterLGScrn}>
                        <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage(allTickets.id)}>View</button>
                        &nbsp;
                        <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={() => makeTicketClosed(allTickets.id)}>Closed</button>
                      </td>
                      <td className={styles.showColumnAfterLGScrn}>
                        <button type="button" className="btn btn-primary" onClick={(e) => moveToViewTicketPage(allTickets.id)}>V</button>
                        &nbsp;
                        <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={() => makeTicketClosed(allTickets.id)}>C</button>
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
      </div>
    </div >
  );
};

export default ProtectedRoute(Home);

