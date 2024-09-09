import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallback, reinitalizeForm = false) {
    const [values, setValues] = useState(initialValues);
    // const [isValid, setIsValid] = useState(true);

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
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }

        // setValidated(true);

    await submitCallback(values);

    setValues(initialValues);
};

return {
    values,
    changeHandler,
    submitHandler,
};
}