import React, { CSSProperties, FC, useMemo, useState } from "react";
import css from "../style.module.css";

export const SelectBox: FC<{
    style?: CSSProperties;
    className?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
}> = ({ children, style, value, className, onChange }) => {

    const [select, setSelect] = useState(!!value);

    const judge = useMemo(() => {
        return value !== undefined ? value : select;
    }, [select, value]);

    return (
        <div
            style={style}
            className={`${className} ${css.container}`}
            onClick={() => {
                onChange && onChange(!judge);
                setSelect(!judge);
            }}
        >
            <div className={css.box}>
                <svg width="20" height="20">
                    <path
                        onAnimationEnd={() => {}}
                        fill="transparent"
                        stroke="#000000"
                        strokeWidth="5"
                        d="M0 15 ,10 25,Q15 15,30 5 "
                        className={`${css.path} ${
                            judge ? css.selected : css.unselect
                        }`}
                    ></path>
                </svg>
            </div>
            {children}
        </div>
    );
};
