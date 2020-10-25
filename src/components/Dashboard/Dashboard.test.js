import Dashboard from "./Dashboard";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Dashboard />);
});