import { Table } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeaderNav from './components/Header';
import { useMutation } from '@apollo/client';
import { FindAllUserAmount } from './api/graphqlAPI';
import styles from '../styles/Payment/payment.module.css';

export default function UserTransactionReport() {

    const router = useRouter();
    const [alertData, setAlertData] = useState(false);
    const [alertDataBG, setAlertDataBG] = useState('');
    const [showAlertData, setshowAlertData] = useState("");
    const [paymentHistory, setpaymentHistory] = useState([]);
    const [Get_Payment_History] = useMutation(FindAllUserAmount);

    async function getPaymentHistory() {
        await Get_Payment_History()
            .then(async res => {
                setpaymentHistory(res.data.findAllUserAmount)
            })
            .catch(err => {
                setAlertData(true)
                setAlertDataBG('danger')
                setshowAlertData(err?.message)
            });
    };

    useEffect(() => {
        getPaymentHistory()
    }, []);

    useEffect(() => {
        setTimeout(function () {
            if (alertData === true) {
                setAlertData(false)
                getPaymentHistory()
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
            <HeaderNav pageName='userTransactionReport' />
            <div className={`${styles.ContainerWidth} px-3`}>
                {paymentHistory.length !== 0 ?
                    <>
                        <h2 className='mt-3'>User Payment History:</h2>
                        <Table striped bordered hover variant="light" className='mt-3 text-center'>
                            <thead>
                                <tr>
                                    <th className='p-3 fs-5'>Id</th>
                                    <th className='p-3 fs-5'>Order Is</th>
                                    <th className={`p-3 fs-5 ${styles.hideColumnAfterLGScrn}`}>Amount</th>
                                    <th className={`p-3 fs-5`}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentHistory.map((paymentHistory, index) => (
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>{index + 1}</td>
                                        <td style={{ fontWeight: 'bold' }}>{paymentHistory.order_id}</td>
                                        <td style={{ fontWeight: 'bold' }} className={`${styles.hideColumnAfterLGScrn}`}>{paymentHistory.amount}</td>
                                        {/* {amounts.reduce((sum, item) => sum + parseFloat(item.amount), 0)} */}
                                        <td className={styles.hideColumnAfterLGScrn}>
                                            <button type="button" className="btn btn-primary" onClick={() => router.push({ pathname: 'InvoiceFormate', query: { amount: paymentHistory.amount } })}>View</button>
                                        </td>
                                        <td className={styles.showColumnAfterLGScrn}>
                                            <button type="button" className="btn btn-primary">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                    :
                    <>
                        <h4 className='text-center mt-4'>------------------------------</h4>
                        <h4 className='text-center mt-4'>No Transaction Found</h4>
                        <h4 className='text-center mt-4'>------------------------------</h4>
                    </>
                }
            </div>
        </div>
    )
}

