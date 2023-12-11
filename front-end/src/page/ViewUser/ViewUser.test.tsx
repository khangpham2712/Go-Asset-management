// ViewUser.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios'; // Update the import
import { AxiosResponse } from 'axios';
import ViewUser from './ViewUser';

jest.mock('axios');

describe('ViewUser Component', () => {
  const mockUsers = [
    {
      id: 1,
      username: 'user1',
      password: 123,
      login: 1,
      role: 1,
      telephone: 123456789,
      dname: 'Department 1',
    },
    {
      id: 2,
      username: 'user2',
      password: 456,
      login: 0,
      role: 2,
      telephone: 987654321,
      dname: 'Department 2',
    },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });
  });

  test('renders ViewUser component with user data', async () => {
    render(<ViewUser />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
      expect(screen.getByText('user2')).toBeInTheDocument();
    });

    // You can add more assertions here based on your UI
  });

  test('clicking Edit button opens the form', async () => {
    render(<ViewUser />);

    // Wait for the data to be loaded
    await waitFor(() => {
      expect(screen.getByText('user1')).toBeInTheDocument();
    });

    // Click the Edit button for the first user
    fireEvent.click(screen.getByTestId('body__view-user-btn-1'));

    // Wait for the form to be displayed
    await waitFor(() => {
      expect(screen.getByText('Edit User')).toBeInTheDocument();
    });

    // You can add more assertions here based on your UI
  });

  // Add more test cases as needed
});
