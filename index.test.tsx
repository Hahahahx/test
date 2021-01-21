import React from "react";
import { shallow, configure, mount } from "enzyme";
import { PictureSelect } from "./src/selector";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

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
        url: "https://www.super-hobby.com/zdjecia/3/8/3/29984_1_tru01050_2.jpg",
    },
];

describe("src/selector", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("selector changes", () => {
        const mock_onChange = jest.fn();
        const component = mount(
            <PictureSelect
                data={pictures}
                id="id"
                img="url"
                onChange={mock_onChange}
            />
        );

        expect(component.find('.box1')).toHaveLength(1);
        // component.find(".item2").simulate("click");
        expect(mock_onChange).toBeCalledWith([]);
    });
});
