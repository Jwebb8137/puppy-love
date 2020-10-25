import ResultsList from "./ResultsList";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<ResultsList />);
});