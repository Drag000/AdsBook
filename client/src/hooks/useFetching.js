import { useEffect, useState } from "react";

export function useFetching(url, initialValues) {
    const [data, setData] = useState(initialValues);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch(url);
            const result = response.json();

            setData(result);
            setIsFetching(false);
        })();
    }, []);

    return {
        data,
        isFetching,
    };
};


