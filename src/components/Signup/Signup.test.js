import Signup from "./Signup";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Signup />);
});