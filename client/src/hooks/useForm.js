import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, reinitalizeForm = false) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if (reinitalizeForm) {
            setValues(initialValues)
        }
    }, [initialValues, reinitalizeForm]);

    const changeHandler = (e) => {
        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        await submitCallback(values);

        setValues(initialValues);
    };

    return {
        values,
        changeHandler,
        submitHandler,
    };
}