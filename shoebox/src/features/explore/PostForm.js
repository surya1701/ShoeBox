import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap"
import "./Post.css"
import { Navigate } from 'react-router-dom'
import axios from 'axios'

function PostForm() {
    const [redirect, setRedirect] = useState(false);
    const [shoeid, setShoeId] = useState("");
    function validateForm() {
        return shoeid.length > 0;
    }
    const [image, setImage] = useState("");
    const onFileChange = (e) => {
        setImage(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('shoe_ID', e.target.shoe_ID.value)
        formData.append('caption', e.target.caption.value)
        formData.append('brand', e.target.brand.value)
        formData.append('image', image)
        axios.post("http://localhost:3001/posts/postForm", formData, {
        }).then(res => {
            setRedirect(true);
        })
    }

    return (
        <>
        {(redirect) ? <Navigate to="/"/>
        :
        <div className="Login">
            <Header />
            <Form onSubmit={onSubmit}>
                <Form.Group size="lg" className="m-3" controlId="formHorizontalEmail">
                    <Form.Label className="m-3">
                        Shoe Id
                    </Form.Label>
                    <Form.Control type="text" placeholder="Shoe Id" value={shoeid} name={"shoe_ID"}
                        onChange={(e) => setShoeId(e.target.value)} />
                </Form.Group>

                <Form.Group size="lg" className="m-3" controlId="formHorizontalPassword">
                    <Form.Label>
                        Caption
                    </Form.Label>
                    <Form.Control as="textarea" rows={5} type="text" placeholder="comment" name={"caption"} />
                </Form.Group>
                <fieldset>
                    <Form.Group className="m-3">
                        <Form.Label as="legend">
                            Brand
                        </Form.Label>
                        <Form.Check
                            type="radio"
                            label="Adidas"
                            value="Adidas"
                            name="brand"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio"
                            label="Nike"
                            value="Nike"
                            name="brand"
                            id="formHorizontalRadios2"
                        />
                        <Form.Check
                            type="radio"
                            label="Puma"
                            value="Puma"
                            name="brand"
                            id="formHorizontalRadios3"
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="m-3">
                        <Form.Label column sm={2}>Image Upload</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={onFileChange} name="image" />
                    </Form.Group>
                </fieldset>
                <Button block className="m-3" size="lg" type="submit" disabled={!validateForm()}>
                    POST
                </Button>
            </Form>
            <hr />
            <Footer />
        </div>
        }</>
    )
}

export default PostForm