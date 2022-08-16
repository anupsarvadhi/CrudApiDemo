import React, { useEffect, useState } from 'react'
import './table.scss'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const TableData = () => {
  const navigate = useNavigate()
  const [apidata, setApidata] = useState([])
  const [loader, setLoader] = useState(true)

  const GetApi = async () => {
    await fetch('https://gorest.co.in/public/v2/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 48af1cd25351a38499abef9068a6168aa0ac9cc85523a78f11b0da2ef26a7764',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setApidata(data)
        setLoader(false)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  useEffect(() => {
    GetApi()
  }, [])

  const deleteFnc = async (id) => {
    await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer 48af1cd25351a38499abef9068a6168aa0ac9cc85523a78f11b0da2ef26a7764',
      },
    }).then((resp) => {
      if (resp.status === 204) {
        GetApi()
      }
    })
  }

  const EditFnc = (id) => {
    navigate(`/Edit/${id}`)
  }

  return (
    <>
      <div className={loader ? 'loader' : 'd-none'}></div>
      <div className={loader ? 'd-none' : 'container mt-4'}>
        <div className="table col-sm-12">
          <Link to="/adduser">
            <Button variant="primary float-end px-5 py-2 mb-3">Add User</Button>
          </Link>
          <Table className="tabledata">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apidata &&
                apidata.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <tr>
                        <td>{item.name}</td>
                        <td className="email">{item.email}</td>
                        <td>{item.gender}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor:
                                item.status === 'active'
                                  ? '#eefade'
                                  : '#ffeeed',
                              color:
                                item.status === 'active'
                                  ? '#00d933'
                                  : '#f50000',
                            }}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center fs-5">
                            <FaEdit
                              className="mx-2 iconedit"
                              onClick={() => EditFnc(item.id)}
                            />

                            <FaTrashAlt
                              className="icondelete mx-0"
                              onClick={() =>
                                window.confirm(
                                  'Are you sure to delete this userdata ?',
                                )
                                  ? deleteFnc(item.id)
                                  : ''
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default TableData
