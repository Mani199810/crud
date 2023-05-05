import React, { useState, useEffect, useCallback, useContext } from 'react'
import { toast } from 'react-toastify'
import ProductApi from '../../API/ProductApi'
import ProductItem from '../Products/ProductItem'
import CategoryApi from '../../API/CategoryApi'
import { GlobalContext } from '../../GlobalContext'
import './Home.css'





function Home(props) {
          const context = useContext(GlobalContext)

          const [products,setProducts] = useState([])
          const[category,setCategory]  = useState([])
          const [cate,setCate] = useState([])
          const [data,setdata]=useState('')

          const  [categoryData,setCategoryData] = context.useAuth.categoryData

        

        

          const [selectedBrands, setSelectedBrands] = useState([]);
          const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

          const handlePriceFilter = (event) => {
            event.preventDefault();

            const filteredProd = products.filter((product) => {
              return product.price >= priceRange.min && product.price <= priceRange.max;
            });

          };

          const handlePriceChange = (event) => {
            setPriceRange({
              ...priceRange,
              [event.target.name]: Number(event.target.value),
            });
          };





            
          
            const filteredProducts = products.filter((item) =>{

                      if(item.category.includes(cate) && item.price >= priceRange.min && item.price <= priceRange.max){
                          return  item.category.includes(cate)

                      }
                  
                      
                  });



          const initProduct = useCallback(async () => {
              const res = await ProductApi.getAll()
                setProducts(res.data.products)
          },[])


          const getCategory = useCallback(async () => {
            const res = await CategoryApi.getAll()
            setCategory(res.data.categories)
        },[])


          const filteredCategory = category.filter((item) =>
          item.title.toLowerCase().includes(categoryData)
          );

          const submitHandler=(e)=>{
                                        e.preventDefault()
                                        
                                        setCategoryData(data)
                                        setdata('')
          
                                  }

            
          useEffect(() => {
            initProduct()
          },[initProduct])   

        useEffect(() => {
          getCategory()
        },[getCategory])


  
  return (
    

      
        <div className='row d-flex flex-wrap col-lg-12 col-md-10 col-sm-2 '>

              <div id='priceRange' >

               <div className='m-3 d-flex me-2 flex-wrap' >

                    <form onSubmit={submitHandler} >
                            <input type="search"  placeholder='search ... only for category' className="rounded-pill ps-2 ms-4 mb-3 p-1 border border-dark" width='200px' value={data} onChange={(e)=>{setdata(e.target.value)}} />
                               
                    </form>

                    <form onSubmit={handlePriceFilter}  className='d-flex ms-3 mt-1 flex-wrap'>
                        <label>
                        Min Price:
                        <input
                            type="range"
                            name="min"
                            min="0"
                            max="100"
                            value={priceRange.min}
                            onChange={handlePriceChange}
                        />
                         {priceRange.min}
                        </label>
                        <label>
                        Max Price:
                        <input
                            type="range"
                            name="max"
                            min="0"
                            max="1000"
                            value={priceRange.max}
                            onChange={handlePriceChange}
                        />
                        {priceRange.max}
                        </label>
                    </form>

               </div>
                   
                  <ul style={{'display':'flex','overflowY': 'scroll','padding':'0px' ,"listStyle":'none',} } >
                                            
            {filteredCategory.map((item, index) => (
                                                              
                                                              <li
                                                                key={index}
                                                                style={{'width':'20%'}}
                                                                className='d-flex ms-4 justify-content-between align-items-center shadow p-3 mb-4 bg-body-tertiary rounded'
                                                                onClick={() => {
                                                                  setCate(item.title)
                                                                   
                                                                }}
                                                                >
                                                                {item.title} <span className="position-relative fw-bold"></span>
                                                                </li>
                                                ))
              }
              </ul>
            
              </div>
        
              <div id='products' className='d-flex flex-wrap ' >
                  
                {cate === '' ? (   products && products.map((item,index) => {
                                        return (
                                      <div>  <ProductItem key={index} {...item} /></div>  
                                          )  })
                               ):(  
                                    filteredProducts && filteredProducts.map((item,index) => {
                                        return (
                                          <ProductItem key={index} {...item} />

                                          )  })
                                  )
                }

              </div>

         </div>


  )
}

export default Home
