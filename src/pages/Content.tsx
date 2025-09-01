import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//creating a blueprint  for fetching data 
type Product = {
    id: number;
    title:string;
    description: string;
    price: number;
    thumbnail: string;
}

//blueprint for the response 
type ApiResponse =  {
  products: Product[];
  total: number;
  skip: number;
  limit:number;
}



const fetchData = async (page: number) : Promise<Product[]> => {
    const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page-1)*10}`);
    const json: ApiResponse = await data.json();
    return json.products;
}

//for rendering 
function  PageContent () {
  const [page, setPage] = useState(1);

  //when page loads it has to fetch the data 

  const {data: products, isLoading, isError, error,} = useQuery<Product[], Error>({
    queryKey: ["products", page],
    queryFn: () => fetchData(page),
    
 
  });

  if (isLoading) {
    return <div>Loading</div>
  }
    if (isError) {
        return <div>Oops! Error</div>
    }
  

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products?.map((product) => (
          <li>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </li>

        ))}
      
      </ul>

      {/* pagination buttons */}
      <button>

      </button>
    </div>
  )
}

  export default PageContent;







