import ProfileCard from "./ProfileCard";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<ProfileCard />);
});