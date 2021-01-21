import React, { useMemo, useState } from "react";
import { SelectBox } from "./selectBox";
import css from "./style.module.css";

interface PictureSelectProps<T, K> {
    data: Array<T>;
    id: K;
    img: K;
    value?: Array<any>;
    onChange?: (value: Array<any>) => void;
}
export function PictureSelect<T, K extends keyof T>({
    data,
    id,
    img,
    value,
    onChange,
}: PictureSelectProps<T, K>) {
    const [selectList, setList] = useState<Array<T[K]>>(value || []);
    const [init, setInit] = useState(true);

    const selectAll = useMemo(() => {
        if (init) {
            setInit(false);
        } else {
            onChange && onChange(selectList);
        }
        return selectList.length === data.length;
    }, [selectList]);

    return (
        <div>
            <div>
                <SelectBox
                    value={selectAll}
                    onChange={(val) => {
                        if (val) {
                            const list = data.map((v) => v[id]);
                            setList(list);
                        } else {
                            setList([]);
                        }
                    }}
                >
                    <p style={{ paddingLeft: 25 }}>
                        已选中{selectList.length}个文件
                    </p>
                </SelectBox>
            </div>
            <div style={{ display: "inline-block" }}>
                {data.map((value, index) => {
                    const val = data[index][id];
                    return (
                        <SelectBox
                            key={index}
                            className={`${css.inlineBox} item box${index}`}
                            value={selectList.includes(val)}
                            onChange={(val: any) => {
                                if (val) {
                                    setList([...selectList, value[id]]);
                                } else {
                                    const keyIndex = selectList.indexOf(
                                        value[id]
                                    );
                                    selectList.splice(keyIndex, 1);
                                    setList([...selectList]);
                                }
                            }}
                        >
                            <img src={value[img] as any} width="300" />
                        </SelectBox>
                    );
                })}
            </div>
        </div>
    );
}
