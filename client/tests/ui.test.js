import React from 'react';
import { render, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Header from '../components/Header';


test('UserProfile renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });

test('UserProfile renders data correctly2', async () => {
    const { getByText } = render(<LoginForm />);
    await waitFor(() => expect(getByText('Password')).toBeInTheDocument());
});

test('UserProfile renders data correctly', async () => {
    const { getByText } = render(<Header />);
    await waitFor(() => expect(getByText('Book a Ride')).toBeInTheDocument());
});