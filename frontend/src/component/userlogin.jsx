import { useState } from "react";
import { Row, Col, InputGroup, Form, Button, Container } from "react-bootstrap";
import { userLoginAction } from "../action/admin.action";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const [formData, setformData] = useState({});
    const [output, setOutput] = useState()
    let navigate = useNavigate();
    let handlesubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            let res = await userLoginAction(formData);
                // console.log(res);
            if (res?.code == 200) {
                localStorage.setItem("user",JSON.stringify(res?.data));
                localStorage.setItem("token",(res?.data?.token))
               setOutput("login success")
                navigate("/home")
            } else{
            setOutput(res?.msg || "Login failed"); // ✅ handle failure response
        }
        }catch(error) {
            setOutput("Something went wrong. Please try again later.");
            console.log(error)
        }

    }
    const handleChage = (name, e) => {
        let form = { ...formData }
        form[name] = e.target.value;
        setformData({ ...formData, ...form })
    }
    return (

        <>
            <Container fluid className="vh-100 d-flex justify-content-center align-items-center">

                <Row className="w-100 justify-content-center">
                    <Col lg={6}>
                        <h2>SignIN Here</h2>
                        <span>{output}</span>
                        <Form>
                            <Row className="mb-3">

                                <Form.Group as={Col} md="12">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control value={formData.email ? formData.email : ""} onChange={(e) => handleChage("email", e)} type="email" placeholder="Email" />
                                </Form.Group>

                                <Form.Group as={Col} md="12">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control value={formData.password ? formData.password : ""} onChange={(e) => handleChage("password", e)} type="password" placeholder="password" />
                                </Form.Group>


                            </Row>
                            <Button type="submit" onClick={(e) => handlesubmit(e)}>Submit form</Button>
                        </Form>
                        <span onClick={() => navigate("/")}>Signup</span>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserLogin;