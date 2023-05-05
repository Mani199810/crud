import React, { useState, useContext, useEffect } from 'react'
import Loading from '../../Util/Loading'
import { toast } from 'react-toastify'
import { GlobalContext } from '../../../GlobalContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Productdetails(props) {
    const [product,setProduct] = useState({
        productCode: '',
        title: '',
        price: 0,
        brand: '',
        category: '',
        quantity: 1,
        unit: '',
        desc: '',
        stock: 0
    })
    const [image, setImage] = useState(false)
    const [category,setCategory] = useState([])

    const [loading,setLoading] = useState(false)
    const context = useContext(GlobalContext)
    const token = context.token
    const  [user] = context.useAuth.user
    const addToCart = context.useAuth.addToCart

    // to read single product info
    const params = useParams()

    const getSingleProduct = async() => {
      const res = await axios.get(`/api/v1/product/single/${params.id}`)
          setProduct(res.data.product)
          setImage(res.data.product.image)
    }

    const navigate = useNavigate()

  

   

 

    // read category
    const getCategory = async () => {
        const res = await axios.get(`/api/v1/category/all`)
            setCategory(res.data.categories)
    }

    useEffect(() => {
        getCategory()
        getSingleProduct()
    },[])

   

  return (
    <div className='container'>
       <div className="row">
        <div className="col-md-12 text-center">
            <h5 className="text-success display-5"> Product Description</h5>
        </div>
       </div>

       <div className="row">
            <div className="col-md-4 col-lg-4 col-sm-12">
                <div className="card border-0">
                    <div className="position-relative">
                      
                        {
                            image ? (
                                <img src={image ? image.url : ''} alt="no image" className="img-fluid rounded card-img-top" />
                                
                            ): (
                            loading ? <Loading/> : null       
                             
                            )
                        }
                       <h4 className='text-success text-center m-3'>Price : {product.price}</h4>
                    </div>
                   
                </div>
            </div>
            <div className="col-md-8 col-lg-8 col-sm-12">
                <div className="card">
                    <div className="card-body">
                           
                            <div className="form-group mt-2">
                               <h6 htmlFor="category">Title</h6>
                               <p>{product.title}</p>
                           </div>
                            
                           <div className="form-group mt-2">
                               <h6 htmlFor="category">Brand</h6>
                               <p>{product.brand}</p>
                           </div>
                            <div className="form-group mt-2">
                                <h6 htmlFor="category">Category</h6>
                               <p>{product.category}</p>
                            </div>
                            <div className="form-group mt-2">
                               <h6 htmlFor="category">Quantity</h6>
                               <p>{product.quantity}</p>
                           </div>
                           <div className="form-group mt-2">
                               <h6 htmlFor="category">Unit</h6>
                               <p>{product.unit}</p>
                           </div>
                           <div className="form-group mt-2">
                               <h6 htmlFor="category">Description</h6>
                               <p>{product.desc}</p>
                           </div>
                           <div className="form-group mt-2">
                               <h6 htmlFor="category">Stock</h6>
                               <p>{product.stock}</p>
                           </div>
                            <div className="form-group mt-2 d-grid">
                            {
                                    user.role === 'superadmin' ? null : (
                                        <button onClick={() => addToCart(props)} className="btn btn-outline-success float-end" title="Add to Cart">
                                        Add to Cart
                                        </button>
                                    )
                            }                            </div>
                       
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Productdetails
