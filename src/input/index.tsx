import React, { FC, InputHTMLAttributes } from "react";
import { debounce } from "../utils";

interface DebouncedProps {
    lazy?: number;
    onDebounce?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<
    InputHTMLAttributes<HTMLInputElement> & DebouncedProps
> = ({ lazy, onDebounce, onChange, ...props }) => {
    const _onDebounce = debounce(onDebounce, lazy);
    const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        e.persist();
        onDebounce && _onDebounce(e);
    };

    return <input {...props} onChange={_onChange} />;
};
