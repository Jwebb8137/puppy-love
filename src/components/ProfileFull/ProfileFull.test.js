import ProfileFull from "./ProfileFull";
import React from 'react';
import { shallow } from 'enzyme';

const match = {
  params : { 
    userid : 1
  }
} 

it("renders without crashing", () => {
  shallow(<ProfileFull match={match}/>);
});