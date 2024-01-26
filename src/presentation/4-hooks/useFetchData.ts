import { useEffect, useState } from "react"

export const UseFetch = (link:string) => {
    const [data, setData] = useState(null)
    const [pendiente, setPendiente] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(link);
                if (!res.ok) {
                    throw new Error(`Ocurrió un error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                setData(data);
                setPendiente(false);
            } catch (error) {
                setPendiente(false);
                setError(error);
            }
        }
        getData();
    }, [link])

    return {data, pendiente, error}
}
