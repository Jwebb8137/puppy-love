import EditSelection from "./EditSelection";
import React from 'react';
import { shallow } from 'enzyme';

const props = {
  user_id : 1
} 

it("renders without crashing", () => {
  shallow(<EditSelection user={props}/>);
});