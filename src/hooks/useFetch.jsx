import { useState } from "react"


export const useFetch = (initialData = []) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(initialData);

    return {
        loading,
        setLoading,
        error,
        setError,
        data,
        setData
    }
}
