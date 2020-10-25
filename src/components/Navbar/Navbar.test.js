import Navbar from "./Navbar";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Navbar />);
});