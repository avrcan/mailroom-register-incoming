import {useCallback, useMemo, useState} from "react";

export function useInput(valueOnStart) {
    const [value, setValue] = useState(valueOnStart);

    const handleChange = useCallback((event) => {
        setValue(event.target.value)
    }, [])

    const inputProps = useMemo(() => {
        return {
            value,
            onChange: handleChange
        }
    }, [value])

    return [
        value,
        inputProps
    ]
}
