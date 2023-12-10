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

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe("Asset-detail-test", () => {
  test("should display asset's detail assigned to an employee when clicking view button (manager role)", async () => {
    // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using manager role to asset list page
    let employeeId = 1;
    let employeeName = "Pham Khang";
    localStorage.setItem("role", "0");

    // 2. User click view button of first asset
    render(
      <AssetList employeeId={employeeId}/>
    );

    const viewbtn = await screen.findAllByTestId("view-asset-detail");
    fireEvent.click(viewbtn[0]);

    // 3. System display selected asset's detail
    /* Assert to open modal of asset's detail */
    expect(screen.getByTestId("asset-detail-modal")).toBeInTheDocument();

    /* Assert that all details are rendered in document */
    expect(screen.getByTestId("employeeName").textContent).toBe("Pham Khang");

    await waitFor(() => {
      expect(screen.getByTestId("category").textContent).toBe("funiture");
    });
    await waitFor(() => {
      expect(
        document.querySelector(".ant-modal-title")?.textContent
      ).toBe("table");
    });
    await waitFor(() => {
      expect((screen.getByTestId("status")).textContent).toBe("working");
    });
    await waitFor(() => {
      expect((screen.getByTestId("status_note")).textContent).toBe(
        "All conditions are checked"
      );
    });
    await waitFor(() => {
      expect((screen.getByTestId("description")).textContent).toBe(
        "A desk or bureau is a piece of furniture with a flat table-style work surface used in a school, office, home or the like for academic, professional"
      );
    });
    await waitFor(() => {
      expect((screen.getByTestId("created_at")).textContent).toBe(
        "2023-12-09 19:10:01"
      );
    });
    await waitFor(() => {
      expect((screen.getByTestId("updated_at")).textContent).toBe(
        "2023-12-09 19:10:01"
      );
    });
  });

  it("should remove modal from document when user clicks close button", async () => {
    // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using manager role to asset list page
    let employeeId = 1;
    let employeeName = "Pham Khang";
    localStorage.setItem("role", "0");

    // 2. User clicks view button of first asset
    render(
      <AssetList
        employeeId={employeeId}
      />
    );

    const viewbtn = await screen.findAllByTestId("view-asset-detail");
    fireEvent.click(viewbtn[0]);

    // 3. User clicks close button
    fireEvent.click(screen.getByRole("button", {name: "Close"}))

    // 4. System remove modal from document. Check it's existence in document.
    expect(
      screen.queryByTestId("asset-detail-modal")
    ).not.toBeInTheDocument();

  });

  it("should handle error when fetching with not existed asset id", async () => {
    const assetId = 5;
    const errorGet = { message: "Not found" };
    let setIsModalOpenMock = jest.fn();
    const alertMock = jest.spyOn(window,'alert').mockImplementation();

    render(
      <AssestDetail
        assetId={assetId}
        employeeName=""
        setIsModalOpen={setIsModalOpenMock}
      />
    );

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(errorGet.message))

  });
});