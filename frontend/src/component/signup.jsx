import { Row, Col, InputGroup, Form, Button, Container } from "react-bootstrap"
import { useState } from 'react';
import { signupAction } from "../action/admin.action.jsx";
import { useNavigate } from "react-router-dom";
let Signup = () => {
    let [output, setoutput] = useState()
    let [formData, setFormData] = useState({});
     let navigate = useNavigate()
    let handelSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const fd = new FormData();
        for (let key in formData) {
            fd.append(key, formData[key]);
        }

        try {
            const res = await signupAction(fd);
            if (res?.code === 200) {
                setoutput("signup successfull")
            }

        } catch (error) {
            setoutput("signup not  successfull")
            console.log(error)
        }
    }


    let handleChane = (name, e) => {
        let data = { ...formData }
        if (name === "img") {
            data[name] = e.target.files[0]; // ✅ File Object
        } else {
            data[name] = e.target.value;
        }

        setFormData(data)
    }

    return (
        <>
            <Container fluid className="vh-100 d-flex justify-content-center align-items-center">

                <Row className="w-100 justify-content-center">
                    <Col lg={6}>
                    <h2>Signup Here</h2>
                    <span>{output}</span>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" value={formData.name ? formData.name : ""} onChange={(e) => handleChane("name", e)} />
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" value={formData.email ? formData.email : ""} onChange={(e) => handleChane("email", e)} />
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" placeholder="phone Number" value={formData.phone ? formData.phone : ""} onChange={(e) => handleChane("phone", e)} />
                                </Form.Group>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="password" value={formData.password ? formData.password : ""} onChange={(e) => handleChane("password", e)} />
                                </Form.Group>

                                <Form.Group as={Col} md="12">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" onChange={(e) => handleChane("img", e)} />
                                </Form.Group>
                            </Row>
                            <Button type="submit" onClick={(e) => handelSubmit(e)}>Submit form</Button>
                        </Form>
                       <span onClick={()=>navigate("/login")}>Login</span>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Signup;