import React from "react";
import ReactDOM from "react-dom";
import { Input, PictureSelect } from "../src";

const App = () => {
    const pictures = [
        {
            id: "1",
            name: "foo",
            url:
                "https://www.super-hobby.com/zdjecia/7/9/3/29984_2_tru01050_15.jpg",
        },
        {
            id: "2",
            name: "foo",
            url:
                "https://www.super-hobby.com/zdjecia/2/8/3/29984_1_tru01050_12.jpg",
        },
        {
            id: "3",
            name: "foo",
            url:
                "https://www.super-hobby.com/zdjecia/3/8/3/29984_1_tru01050_2.jpg",
        },
    ];
    return (
        <>
            <h1>第一题</h1>
            <PictureSelect
                data={pictures}
                id="id"
                img="url"
                value={["1"]}
                onChange={(newVal) => console.log(newVal)}
            />
            <h1>第二题</h1>
            <Input
                type="text"
                lazy={2000}
                onDebounce={(e) => console.log('debounce',e.target.value)}
                onChange={(e) => console.log('change',e.target.value)}
            />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
