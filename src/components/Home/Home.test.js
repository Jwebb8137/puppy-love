import Home from "./Home";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Home />);
});