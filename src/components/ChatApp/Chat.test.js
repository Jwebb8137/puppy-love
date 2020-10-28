import Chat from "./Chat";
import ChatApp from "./ChatApp";
import ChatList from "./ChatList";
import React from 'react';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<ChatApp />);
});

const match = {
  params : { 
    userid : 1
  }
} 

it("renders without crashing", () => {
  shallow(<Chat match={match}/>);
});

it("renders without crashing", () => {
  shallow(<ChatList />);
});