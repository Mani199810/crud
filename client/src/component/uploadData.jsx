import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateData(props) {
  const [category,setCategory] = useState({
      id: '',
      name: '',
      marks:'',
      result:''

  })
  const navigate = useNavigate()
  const  base =process.env.baseURL|| 'https://crud-9bdk.onrender.com';



  const readValue = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]:value })
  } 

  const submitHandler = async (e) => {
      e.preventDefault();
      await axios.post(`${base}/api/v1/category/create`, category, {
        headers: {
            'Content-Type': 'application/json',   
        }
    })
    navigate(`/`)
  }

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Create Data</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-body">
                    <form autoComplete="off" onSubmit={submitHandler} >
                        <div className="form-group mt-2">
                            <label htmlFor="title">ID</label>
                            <input type="text" name="id" value={category.id} onChange={readValue} id="id" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="title">Name</label>
                            <input type="text" name="name" value={category.name} onChange={readValue} id="name" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="title">Marks</label>
                            <input type="text" name="marks" value={category.marks} onChange={readValue} id="marks" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="title">Result</label>
                            <input type="text" name="result" value={category.result} onChange={readValue} id="result" className="form-control" required />
                        </div>
                       
                        <div className="form-group mt-2">
                            <input type="submit" value="Create" className="btn btn-outline-success" />
                        </div>
                    </form>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default CreateData
