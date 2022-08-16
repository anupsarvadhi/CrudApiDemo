import React, { useState } from 'react'
import './table.scss'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {
  const nevigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    let formdata = {
      name: name,
      email: email,
      gender: gender,
      status: status,
    }
    fetch('https://gorest.co.in/public/v2/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 48af1cd25351a38499abef9068a6168aa0ac9cc85523a78f11b0da2ef26a7764',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      body: JSON.stringify(formdata),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error)
      })

    nevigate('/')
  }

  return (
    <>
      <div className="form">
        <Form>
          <h3 className="text-center pb-3">Add User</h3>
          <Row className="mb-3">
            <Col sm={12}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </Form.Group>
            </Col>
            <Col sm={12}>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Gender
            </Form.Label>
            <div className="d-flex">
              <Col sm={6} className="d-flex">
                <Form.Check
                  type="radio"
                  label="Male"
                  value="male"
                  checked={gender === 'male' || ''}
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  id="formHorizontalRadios1"
                  className="me-2"
                />

                <Form.Check
                  type="radio"
                  label="Female"
                  value="female"
                  checked={gender === 'female' || ''}
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  id="formHorizontalRadios2"
                />
              </Col>
            </div>

            <Col sm={12}>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status || ''}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={''}></option>
                  <option value={'active'}>active</option>
                  <option value={'inactive'}>inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Button
            variant="primary"
            className="d-flex m-auto px-4"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  )
}

export default UserForm
