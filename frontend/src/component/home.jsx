
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

const Home = () => {
    const [dropdown, setdropdown] = useState(false)
    let toggeldropdown = () => {
        setdropdown(!dropdown)
    }
    return (
        <>
            <Row className='mx-1'>
                <Col lg="3" md="3" sm="12" xs="12" className='letfpart'>
                    {/* user */}
                    <Row className='m-2 border py-2 rounded position-relative'>
                        <Col lg={11} md={11} sm={11} xs={11} className='d-flex  gap-3 align-items-center'>
                            <span className='usercircle d-flex align-items-center justify-content-center '>
                            <i className="ri-user-line text-white"></i></span>
                            <h5>{dropdown}</h5>
                        </Col>
                        <Col lg={1} md={1} sm={1} xs={1} className='align-items-center text-white p-2'>
                            <i className="ri-more-2-fill" onClick={toggeldropdown}></i>
                        </Col>
                       
                    </Row>
                </Col>
                <Col lg="9" md="9" sm="12" xs="12" className='rightpart'>

                </Col>
            </Row>

        </>

    )
}
export default Home;