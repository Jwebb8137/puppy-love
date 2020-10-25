import Footer from "./Footer";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Footer />);
});