import Carousel from "./Carousel";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Carousel />);
});