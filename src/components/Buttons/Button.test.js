import Button from "./Button";
import ButtonAlt from "./ButtonAlt";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Button />);
});

it("renders without crashing", () => {
  shallow(<ButtonAlt />);
});