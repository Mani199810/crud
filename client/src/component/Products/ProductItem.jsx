import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
import { NavLink } from 'react-router-dom'

function ProductItem(props) {
    const context = useContext(GlobalContext)
    const  [user] = context.useAuth.user
    const addToCart = context.useAuth.addToCart
    
    const { productCode, title, price, desc, brand, category, image, discount,_id, isActive} = props
  return (
    <div className='row text-center'>
    <div className="col-lg-12 col-md-8 col-sm-6 mt-2 mb-2">
       <NavLink to={`/productsDetails/${_id}`}>
        <div className="card m-3 " style={{'width':'210px','height':'330px'}}>
          <img src={ image ? image.url : ''} style={{'width':'100%','height':'170px'}} alt="no image" className="card-img-top" />
            <div className="card-body">
                 <h6 className="text-success text-center text-uppercase"> { title } </h6>

                 <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Price</strong>
                        <span className="float-end text-success"> &#8377; { price } </span>
                    </li>
                 </ul>
            </div>

            <div className="card-footer">
               {
                    user.role === 'superadmin' ? null : (
                        <button onClick={() => addToCart(props)} className="btn btn-outline-success float-end" title="Add to Cart">
                            <i className="bi bi-cart-plus"></i> 
                        </button>
                    )
               }
            </div>
        </div>
        </NavLink>
        
    </div>
   
    </div>
  )
}

export default ProductItem
