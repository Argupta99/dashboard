import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";


const fetchData = async (page) => {
    const data = await fetch("https://dummyjson.com/products?limit=10&skip=0");
    const json = await data.json();
    return json.products;
}

//for rendering 
function  PageContent () {
  const [page, setPage] = useState(1);

  //when page loads it has to fetch the data 

  const {data: products, isLoading, isError, isPreviousData,} = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
 
  });

  if (isLoading) {
    return <div>Loading</div>
  }
    if (isError) {
        return <div>Oops! Error</div>
    }
  }







