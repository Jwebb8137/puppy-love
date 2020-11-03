import Confirm from "./Confirm";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Confirm />);
});