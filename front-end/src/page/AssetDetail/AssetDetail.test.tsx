/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import AssestDetail from "./AssetDetail";
import AssetList from "../ViewAsset/AssetList";
import axios from "axios";
import exp from "constants";


afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

// jest.mock('axios');
describe("Asset-detail-test", () => {
  // test("should display asset's detail assigned to an employee when clicking view button (manager role)", async () => {
  //   // 1. Set data. Using manager role to asset list page
  //   const mockData = [
  //     {
  //       id: 1,
  //       name: 'Asset 1',
  //       type: 'Type 1',
  //       status: 'Status 1',
  //       status_note: "ok",
  //       description: "ok",
  //       user_id: 1,
  //       created_at: '2023-12-09T21:06:29+07:00',
  //       updated_at: '2023-12-09T21:06:29+07:00',
  //     },
  //     // {
  //     //   id: 2,
  //     //   name: 'Asset 2',
  //     //   type: 'Type 2',
  //     //   status: 'Status 2',
  //     //   status_note: "ok",
  //     //   description: "ok",
  //     //   user_id: 2,
  //     //   created_at: '2023-12-09T21:06:29+07:00',
  //     //   updated_at: '2023-12-09T21:06:29+07:00',
  //     // },
  //     // {
  //     //   id: 3,
  //     //   name: 'Asset 3',
  //     //   type: 'Type 3',
  //     //   status: 'Status 3',
  //     //   status_note: "ok",
  //     //   description: "ok",
  //     //   user_id: 2,
  //     //   created_at: '2023-12-09T21:06:29+07:00',
  //     //   updated_at: '2023-12-09T21:06:29+07:00',
  //     // },
  //     // {
  //     //   id: 4,
  //     //   name: 'Asset 3',
  //     //   type: 'Type 3',
  //     //   status: 'Status 3',
  //     //   status_note: "ok",
  //     //   description: "ok",
  //     //   user_id: 2,
  //     //   created_at: '2023-12-09T21:06:29+07:00',
  //     //   updated_at: '2023-12-09T21:06:29+07:00',
  //     // },
  //   ];

  //   localStorage.setItem('role', '0');

  //   jest.spyOn(axios, 'get').mockResolvedValueOnce({
  //     data: mockData
  //   })

  //   // 2. User click view button of first asset with first employee
  //   render(
  //     <AssetList employeeId={1} />
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText('Asset 1')).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByTestId('asset-list')).toBeInTheDocument();
  //   });

  //   expect(screen.getByTestId("view-asset-detail")).toBeTruthy();
  // })
  
  
  test("should display asset's detail when open modal", async () => {
    /* Assert to open modal of asset's detail */
    localStorage.setItem("role", "0");
    let setIsModalOpenMock = jest.fn();
    render (
      <AssestDetail
        assetId={1}
        employeeName={1}
        setIsModalOpen={setIsModalOpenMock}
      />
    )

    expect(screen.getByTestId("asset-detail-modal")).toBeInTheDocument();
    // await waitFor(() => {
    //   expect(screen.getByText("funiture")).toBeInTheDocument();
    // } );
    
    /* Assert that all details are rendered in document */
    expect(screen.getByTestId("employeeName").textContent).toBe("1");

    // await waitFor(() => {
    //   expect(screen.getByTestId("category").textContent).toBe("funiture");
    // });
    // await waitFor(() => {
    //   expect(
    //     document.querySelector(".ant-modal-title")?.textContent
    //   ).toBe("table");
    // });
    // await waitFor(() => {
    //   expect((screen.getByTestId("status")).textContent).toBe("working");
    // });
    // await waitFor(() => {
    //   expect((screen.getByTestId("status_note")).textContent).toBe(
    //     "All conditions are checked"
    //   );
    // });
    // await waitFor(() => {
    //   expect((screen.getByTestId("description")).textContent).toBe(
    //     "A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional"
    //   );
    // });
    // await waitFor(() => {
    //   expect((screen.getByTestId("created_at")).textContent).toBe(
    //     "2023-12-09 19:10:01"
    //   );
    // });
    // await waitFor(() => {
    //   expect((screen.getByTestId("updated_at")).textContent).toBe(
    //     "2023-12-09 19:10:01"
    //   );
    // });
  });

  it("should remove modal from document when user clicks close button", async () => {
    localStorage.setItem("role", "0");
    let setIsModalOpenMock = jest.fn();
    render (
      <AssestDetail
        assetId={1}
        employeeName={1}
        setIsModalOpen={setIsModalOpenMock}
      />
    )
    // User clicks close button
    fireEvent.click(screen.getByRole("button", {name: "Cancel"}))

    // System remove modal from document. Check it's existence in document.
    expect(
      screen.queryByText("table")
    ).not.toBeInTheDocument();

  });
});