/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
  import "@testing-library/jest-dom/extend-expect";
  import ViewAsset from "./ViewAsset";
  
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  
  describe('ViewAsset component',  () => {
    it('renders without error', async () => {
      render(<ViewAsset />);
      expect(screen.getByTestId('view-asset')).toBeInTheDocument();
    });
  
    it('displays employee ID when role is 1 (employee)', async () => {
      localStorage.setItem('role', '1');
      localStorage.setItem('id', '1');
      render(<ViewAsset />);
      expect(screen.getByText('Employee ID: 1')).toBeInTheDocument();
    });
  
    it('displays select input when role is 0 (manager)', async () => {
      localStorage.setItem('role', '0');
      render(<ViewAsset />);
      expect(screen.getByTestId('manager-role')).toBeInTheDocument();
    });
  
  
  }); 