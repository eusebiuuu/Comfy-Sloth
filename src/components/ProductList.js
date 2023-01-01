import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext();
  if (products.length === 0) {
    return <h5>No products matched your search</h5>
  }
  return (gridView 
    ? <GridView products={products} /> 
    : <ListView products={products} />);
}

export default ProductList;
