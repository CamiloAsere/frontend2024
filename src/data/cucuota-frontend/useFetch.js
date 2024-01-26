import { useEffect, useState } from "react"

export const UseFetch = (link) => {
    const [data, setData] = useState('')
    const [pendiente, setPendiente] = useState(true)
    const [error, setError] = useState(null)
    
    
    useEffect(() => {
   
        const getData = async () => {
              
          try {
                let res = await fetch(link);
                
                if(!res.ok){
                    
                    const err ={
                      error:true,
                      status:res.status,
                      statusText:res.statusText ? "Ocurrió 1 error" :res.statusText
                      }
                    throw err;
                }
                let data = await res.json();
                setData(data);
                setPendiente(false);
                setError({error:false});
              } catch (error) {
               
                setPendiente(true);
                setError(error);
              }
           
            }
            getData();
       
    }, [link])

return {data,pendiente,error}

}
