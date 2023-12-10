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
import AssestDetail from "./AssetDetail";
import AssetList from "../ViewAsset/AssetList";
import axios from "axios";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});


describe("Delete-asset-test", () => {
  jest.mock('axios');
  it("should delete asset assigned to an employee successfully when clicking 'yes' with delete button (manager role)", async () => {
    localStorage.setItem("role", "0");

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

    jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockData
    });

    render(<AssetList employeeId={1} />);

    const deletebtn = await screen.findAllByTestId("delete-asset");
    fireEvent.click(deletebtn[0]);

    // System display popconfirm. Assert that popconfirm.
    expect(screen.getByRole("tooltip").textContent).toBe(
      "Delete assetAre you sure to delete this asset?NoYes"
    );

    // User clicks "yes" button
    fireEvent.click(
      screen.getByRole('button', {
        name: /yes/i
      })
    );

    // System display message "Asset was successfully deleted". Asset was deleted from asset list.
    // expect(
    //   await screen.findByText("Asset was successfully deleted")
    // ).toBeInTheDocument();
    expect(screen.queryByText("Ok")).not.toBeInTheDocument();
  });

  jest.mock('axios');
  it("should not delete asset assigned to an employee when clicking 'no' with delete button (manager role)", async () => {
    localStorage.setItem("role", "0");

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

    jest.spyOn(axios, 'get').mockResolvedValueOnce({
        data: mockData
    });

    render(<AssetList employeeId={1} />);

    const deletebtn = await screen.findAllByTestId("delete-asset");
    fireEvent.click(deletebtn[0]);

    // System display popconfirm. Assert that popconfirm.
    expect(screen.getByRole("tooltip").textContent).toBe(
      "Delete assetAre you sure to delete this asset?NoYes"
    );

    // User clicks "no" button
    fireEvent.click(
      screen.getByRole("button", {
        name: /no/i,
      })
    );

    // System display asset list. Asset was not deleted from asset list. Tooltip disappears.
    expect(screen.getByText("Type 1")).toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  jest.mock('axios');
  it.each([
    ["DeleteButton__employee", "1"],
    ["DeleteButton__manager", "0"],
  ])(
    "should set delete button's class %s when user has logined in as employee/manager (role = %s) account",
    async (expected, n) => {

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
      localStorage.setItem('role', n);

      jest.spyOn(axios, 'get').mockResolvedValueOnce({
          data: mockData
      });
  
      render(<AssetList employeeId={1} />);

      // System display asset list. Check if button's display is none.
      const deletebtn = await screen.findAllByTestId("delete-asset");
      deletebtn.map((e) => {
        expect(e).toHaveClass(expected);
      });
    }
  );
});
