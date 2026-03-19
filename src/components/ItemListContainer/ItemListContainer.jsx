import './ItemListContainer.css'
import Item from "../Item/Item"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getProducts, getProductByCategoria} from '../../data/firebase'

export default function ItemListContainer( props ){
  const [products, setProducts] = useState([])
  const {categParam}= useParams()
  
  useEffect(() =>{
    if(categParam){
      getProductByCategoria(categParam)
      .then( productsByCateg=> {setProducts(productsByCateg)})
      .catch( (error) =>{
        alert("Error al cargar los datos. Recargue por favor")
        console.log("Error encontrado: "+error);    
      })
    } else{
      getProducts()
      .then( (productList)=> {setProducts(productList)})
      .catch( (error) =>{
        alert("Error al cargar los datos. Recargue por favor")
        console.log("Error encontrado: "+error);    
      })
    } 
  }, [categParam])
  
  return (
  <div className="item-list-container">
    <h2>{props.greeting || "Nuestros productos"}</h2>
    {products.length === 0 ? 
      <p className="loading-text">Cargando catálogo...</p> : 
      <div className='productos'>
        {products.map(product => <Item key={product.id} {...product} />)}
      </div>
    }
  </div>
)
}