import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AssetList from '../AssetList';

jest.mock('axios');

describe('AssetList component', () => {
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

    const mockEmployeeId = 1;

    render(<AssetList employeeId={mockEmployeeId} />);
    
    (AssetList as jest.Mock).mockResolvedValue({
        data: mockData
    });


    await waitFor(() => {
      expect(screen.getByTestId('asset-list')).toBeInTheDocument();
    });
    expect(screen.getByText('Asset 1')).toBeInTheDocument();
    expect(screen.getByText('Asset 2')).toBeInTheDocument();
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