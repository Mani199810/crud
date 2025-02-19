import React, { useEffect, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function Grid() {
  const [category, setCategory] = useState([]);
  const [data, setdata] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const  base =process.env.REACT_APP_BASE_URL || 'https://crud-9bdk.onrender.com';
  const initCategory = useCallback(async () => {
    const res = await axios.get(`${base}/api/v1/category/`);
    setCategory(res.data.categories);
    console.log('=======');
  }, [base]);

  const submitHandler = (e) => {
    e.preventDefault();
    setCategory(data);
    setdata('');
  };

  const filteredData = category.filter((item) => {
    const itemId = String(item.id).toLowerCase();
    const itemName = String(item.name).toLowerCase();
    const itemMarks = String(item.marks).toLowerCase();
    const itemResult = String(item.result).toLowerCase();

    return (
      itemId.includes(data) ||
      itemName.includes(data) ||
      itemMarks.includes(data) ||
      itemResult.includes(data)
    );
  });

  useEffect(() => {
    initCategory();
  }, [initCategory]);

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 text-center'>
          <h3 className='display-3 text-success'>Data list</h3>
        </div>
      </div>

      <div className='row'>
        <form onSubmit={submitHandler}>
          <input
            type='search'
            placeholder='search ... '
            className='rounded-pill ps-3 ms-4 mb-3 p-1 border border-dark'
            width='500px'
            value={data}
            onChange={(e) => {
              setdata(e.target.value);
            }}
            style={{ outline: 'none' }}

          />
        </form>
        <p colSpan={3}>
          {' '}
          <NavLink to={`/create`} className='btn btn-outline-success float-end'>
            Create
          </NavLink>{' '}
        </p>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='table table-responsive'>
            <table className='table table-bordered table-striped text-center'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>MARKS</th>
                  <th>RESULT</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td> {item.id} </td>
                      <td> {item.name} </td>
                      <td> {item.marks} </td>
                      <td> {item.result} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <ul className='pagination '>
        {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber} className='page-item'>
              <a
                href='#!'
                onClick={() => paginate(pageNumber)}
                className={`page-link ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Grid;
