import React from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import HeaderNav from './components/Header';
import { useMutation } from '@apollo/client';
import styles from '../styles/Admin/admin.module.css';
import { CreateTags, GetAllTags } from './api/graphqlAPI';

function ManageTags() {
    const router = useRouter();
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);
    const [alertBg, setAlertBg] = React.useState();
    const [Get_All_Tags] = useMutation(GetAllTags);
    const [showAlert, setShowAlert] = React.useState();
    const [alertData, setAlertData] = React.useState();
    const [Create_Tags] = useMutation(CreateTags);
    const [tagTitle, setTagTitle] = React.useState('');
    const [tagDescription, setTagDescription] = React.useState('');
    const [allTags, setAllTags] = React.useState([]);

    async function getAllTags() {
        await Get_All_Tags()
            .then(res => {
                setAllTags(res.data.getAllTags)
            })
            .catch(err => {
                setShowAlert(true)
                setAlertBg('danger')
                handleClose()
                setAlertData(err?.message)
            });
    };

    React.useEffect(() => {
        getAllTags()
    }, []);

    React.useEffect(() => {
        const timeId = setTimeout(() => {
            setShowAlert(false)
        }, 3000)
    })

    async function formSubmit() {
        let supportTicketLoginUserId = (localStorage.getItem('supportTicketLoginUserId'))
        Create_Tags({
            variables: {
                    createTagsArgs: {
                      tag_name: tagTitle,
                      tag_description: tagDescription
                    },
                adminUserId: Number(supportTicketLoginUserId)
            },
        }).then(async (res) => {
            setShowAlert(true)
            setAlertBg('success')
            setAlertData('Tag Saved Successfully')
            handleClose()
            setTagTitle('')
            setTagDescription('')
            getAllTags()
        }).catch(error => {
            setShowAlert(true)
            setAlertBg('danger')
            handleClose()
            setAlertData(error?.message)
        });
    }

    return (
        <div style={{ minHeight: '100vh' }}>
            <HeaderNav pageName='manageTags' />
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
                            <h1 className='my-3'><u>Tag Details</u></h1>
                            <button type="button" className="btn btn-primary mb-5" onClick={handleShow}><b>Add Tags</b></button>
                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className='text-center'>Id</th>
                                    <th>Title</th>
                                    <th className='text-center'>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTags.map((allTagsDetail, index) => (
                                    <tr>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{allTagsDetail.tag_name}</td>
                                        <td>{allTagsDetail.tag_description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Tag</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" placeholder="Title" className='mb-2' value={tagTitle} onChange={(e) => setTagTitle(e.target.value)} />
                                <Form.Label>Description</Form.Label>
                                <Form.Control required type="text" placeholder="Description" className='mb-2' value={tagDescription} onChange={(e) => setTagDescription(e.target.value)} />
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

export default ManageTags;
