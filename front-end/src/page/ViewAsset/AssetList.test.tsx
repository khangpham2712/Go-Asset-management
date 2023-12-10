/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
  import "@testing-library/jest-dom/extend-expect";
  
import axios from 'axios';
import AssetList from './AssetList';
import ViewAsset from './ViewAsset';

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });


jest.mock('axios');

describe('AssetList component', () => {
    it('All assets are displayed when role is 0 (manager)', async () => {
        const mockData = [
          {
            id: 1,
            name: 'Asset 1',
            type: 'Type 1',
            status: 'Status 1',
            status_note: "ok",
            description: "ok",
            user_id: 1,
            created_at: '2023-12-09T21:06:29+07:00',
            updated_at: '2023-12-09T21:06:29+07:00',
          },
          {
            id: 2,
            name: 'Asset 2',
            type: 'Type 2',
            status: 'Status 2',
            status_note: "ok",
            description: "ok",
            user_id: 2,
            created_at: '2023-12-09T21:06:29+07:00',
            updated_at: '2023-12-09T21:06:29+07:00',
          },
          {
            id: 3,
            name: 'Asset 3',
            type: 'Type 3',
            status: 'Status 3',
            status_note: "ok",
            description: "ok",
            user_id: 2,
            created_at: '2023-12-09T21:06:29+07:00',
            updated_at: '2023-12-09T21:06:29+07:00',
          },
        ];
        localStorage.setItem('role', '0');

        jest.spyOn(axios, 'get').mockResolvedValueOnce({
            data: mockData
        });
    
        render(<AssetList employeeId={0} />);
    
        await waitFor(() => {
          expect(screen.getByTestId('asset-list')).toBeInTheDocument();
          expect(screen.getByText('Asset 1')).toBeInTheDocument();
          expect(screen.getByText('Asset 2')).toBeInTheDocument();
          expect(screen.getByText('Asset 3')).toBeInTheDocument();
        });
      });

  it('renders asset list correctly', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Asset 1',
        type: 'Type 1',
        status: 'Status 1',
        status_note: "ok",
        description: "ok",
        user_id: 1,
        created_at: '2023-12-09T21:06:29+07:00',
        updated_at: '2023-12-09T21:06:29+07:00',
      },
      {
        id: 2,
        name: 'Asset 2',
        type: 'Type 2',
        status: 'Status 2',
        status_note: "ok",
        description: "ok",
        user_id: 1,
        created_at: '2023-12-09T21:06:29+07:00',
        updated_at: '2023-12-09T21:06:29+07:00',
      },
    ];

    jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockData
    });
    const mockEmployeeId = 1;

    render(<AssetList employeeId={mockEmployeeId} />);

    await waitFor(() => {
      expect(screen.getByTestId('asset-list')).toBeInTheDocument();
      expect(screen.getByText('Asset 1')).toBeInTheDocument();
      expect(screen.getByText('Asset 2')).toBeInTheDocument();
    });
  });
  
//     it('opens asset detail modal when "View" button is clicked', async () => {
//     const mockData = [
//       {
//         id: 1,
//         name: 'Asset 1',
//         type: 'Type 1',
//         status: 'Status 1',
//         user_id: 1,
//         created_at: '2023-01-01',
//         updated_at: '2023-01-02',
//       },
//     ];

//     const mockEmployeeId = 1;
//     (AssetList as jest.Mock).mockResolvedValue({
//         data: mockData
//     });

//     render(<AssetList employeeId={mockEmployeeId} />);

//     const viewButton = screen.getByText('View');
//     fireEvent.click(viewButton);
//     await waitFor(() => {
//       expect(screen.getByTestId('asset-detail')).toBeInTheDocument();
//     });

    
//   });

//   it('deletes asset when "Delete" button is clicked', async () => {
//     const mockData = [
//       {
//         id: 1,
//         name: 'Asset 1',
//         type: 'Type 1',
//         status: 'Status 1',
//         user_id: 1,
//         created_at: '2023-01-01',
//         updated_at: '2023-01-02',
//       },
//     ];

//     const mockEmployeeId = 1;

//     axios.get.mockResolvedValueOnce({ data: mockData });
//     axios.delete.mockResolvedValueOnce();

//     render(<AssetList employeeId={mockEmployeeId} />);

//     await waitFor(() => {
//       const deleteButton = screen.getByText('Delete');
//       fireEvent.click(deleteButton);
//       expect(axios.delete).toHaveBeenCalledWith(
//         'http://localhost:8080/api/assets/1'
//       );
//       expect(screen.queryByText('Asset 1')).not.toBeInTheDocument();
//     });
//   });
});