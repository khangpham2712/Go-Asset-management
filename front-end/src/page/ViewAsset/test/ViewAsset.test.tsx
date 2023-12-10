// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import ViewAsset from '../ViewAsset';

// // describe("ViewAsset Component", () => {
// //     it("should render asset list when api respons", async () => {
// //         render(<ViewAsset />);
// //         await waitFor(() => {
// //             screen.getByText('table');
// //         })
// //     })
// // })
// describe('ViewAsset component',  () => {
//   it('renders without error', async () => {
//     render(<ViewAsset />);
//     expect(screen.getByTestId('view-asset')).toBeInTheDocument();
//   });

//   it('displays employee ID when role is 1', async () => {
//     localStorage.setItem('role', '1');
//     localStorage.setItem('MYAPP_EMPLOYEEID', '1');
//     render(<ViewAsset />);
//     expect(screen.getByText('Employee ID: 1')).toBeInTheDocument();
//   });

//   it('displays select input when role is 0', async () => {
//     localStorage.setItem('role', '0');
//     render(<ViewAsset />);
//     expect(screen.getByTestId('manager-role')).toBeInTheDocument();
//   });

//   test('opens AddAsset modal when add asset button is clicked', async() => {
//     render(<ViewAsset />);
//     fireEvent.click(screen.getByTestId('add-asset-btn'));
//     expect(screen.getByTestId('add-asset-modal')).toBeInTheDocument();
//   });

//   // Add more tests as needed
// }); 