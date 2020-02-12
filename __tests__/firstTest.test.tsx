import { sum, Foo } from '@components/testingTest';
import { shallow, mount, render } from 'enzyme';
import React from 'react';

test('adds 1 + 2 to equal 3', () => {
    // tslint:disable-next-line: no-magic-numbers
    expect(sum(1, 2)).toBe(3);
});

it('renders given component', () => {
    const items = ['one', 'two', 'three'];
    const wrapper = shallow(<Foo />);

    // Expect the wrapper object to be defined
    expect(wrapper.first().text()).toEqual('Something rendered');
});
