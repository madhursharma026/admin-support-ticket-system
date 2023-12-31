import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import HeaderNav from './components/Header';
import { useMutation } from '@apollo/client';
import styles from '../styles/Admin/admin.module.css';
import { AllCategory, CreateCategory, UpdateCategory } from './api/graphqlAPI';

function ManageSupportCategories() {
    const router = useRouter();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);
    const [alertBg, setAlertBg] = React.useState();
    const [All_Category] = useMutation(AllCategory);
    const [showAlert, setShowAlert] = React.useState();
    const [alertData, setAlertData] = React.useState();
    const [Create_Category] = useMutation(CreateCategory);
    const [Update_Category] = useMutation(UpdateCategory);
    const [categoryName, setCategoryName] = React.useState('');
    const [allCategories, setAllCategories] = React.useState([]);

    async function getAllCategories() {
        await All_Category()
            .then(res => {
                setAllCategories(res.data.findAllCategory)
                console.log(res.data.findAllCategory);
            })
            .catch(err => {
                setShowAlert(true)
                setAlertBg('danger')
                handleClose()
                setAlertData(err?.message)
            });
    };

    React.useEffect(() => {
        getAllCategories()
    }, []);

    React.useEffect(() => {
        const timeId = setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    })

    async function formSubmit() {
        let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        Create_Category({
            variables: {
                createCategoryArgs: {
                    category_name: categoryName
                },
                adminUserId: Number(supportTicketLoginUserId)
            },
        }).then(async (res) => {
            setShowAlert(true)
            setAlertBg('success')
            setAlertData('Category Saved Successfully')
            handleClose()
            setCategoryName('')
            getAllCategories()
        }).catch(error => {
            setShowAlert(true)
            setAlertBg('danger')
            handleClose()
            setAlertData(error?.message)
        });
    }

    async function deleteCategory(categoryId) {
        let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        await Update_Category({
            variables: {
                categoryId: Number(categoryId),
                adminUserId: Number(supportTicketLoginUserId)
            }
        })
            .then(res => {
                setShowAlert(true)
                setAlertBg('success')
                setAlertData('Category Delete Successfully')
                handleClose()
                getAllCategories()
            })
            .catch(err => {
                setShowAlert(true)
                setAlertBg('danger')
                handleClose()
                setAlertData(err?.message)
            });
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <HeaderNav pageName='manageSupportCategories' />
            <div className='px-3 mt-3'>
                {showAlert ?
                    <Alert variant={alertBg}>
                        {alertData}
                    </Alert>
                    :
                    <></>
                }
                <div className={styles.ContainerWidth}>
                    <div className="m-3">
                        <div className="text-center">
                            <h1 className='my-3'><u>Category Detail</u></h1>
                            <button type="button" className="btn btn-primary mb-5" onClick={handleShow}><b>Add Category</b></button>
                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className='text-center'>Id</th>
                                    <th>Title</th>
                                    <th className='text-center'>Category Status</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCategories.map((allClasessData, index) => (
                                    <tr>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{allClasessData.category_name}</td>
                                        <td className='text-center'>{allClasessData.category_status === true ? "Active" : 'Deleted'}</td>
                                        <td className={`${styles.hideColumnAfterLGScrn} text-center`}>
                                            <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={() => deleteCategory(allClasessData.id)}>Closed</button>
                                        </td>
                                        <td className={`${styles.showColumnAfterLGScrn} text-center`}>
                                            <button type="button" className="btn btn-warning mt-sm-0 mt-2" onClick={() => deleteCategory(allClasessData.id)}>C</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Question</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Label>Category Title</Form.Label>
                                <Form.Control required type="text" placeholder="Category Title" className='mb-2' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                <Button variant="primary" className='w-100 mt-3' onClick={() => formSubmit()}>
                                    Submit
                                </Button>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageSupportCategories;
