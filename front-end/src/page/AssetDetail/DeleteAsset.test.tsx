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

describe("Delete-asset-test", () => {
  it("should delete asset assigned to an employee successfully when clicking 'yes' with delete button (manager role)", async () => {
    // 1. Set userId (employeeId) = 3, employeeName = "Nguyen An". Using manager role to asset list page
    let employeeId = 3;
    let employeeName = "Nguyen An";
    localStorage.setItem("role", "0");

    // 2. User clicks delete button of first asset
    render(
      <AssetList employeeId={employeeId} employeeName={employeeName} />
    );

    const deletebtn = await screen.findAllByTestId("delete-asset");
    fireEvent.click(deletebtn[0]);

    // 2. System display popconfirm. Assert that popconfirm.
    expect(screen.getByRole("tooltip").textContent).toBe(
      "Delete assetAre you sure to delete this asset?NoYes"
    );

    // 3. User clicks "yes" button
    fireEvent.click(
      screen.getByRole("button", {
        name: /yes/i,
      })
    );

    // 4. System display message "Asset was successfully deleted". Asset was deleted from asset list.
    expect(
      await screen.findByText("Asset was successfully deleted")
    ).toBeInTheDocument();
    expect(screen.queryByText("monitor")).not.toBeInTheDocument();
  });

  it("should not delete asset assigned to an employee when clicking 'no' with delete button (manager role)", async () => {
    // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using manager role to asset list page
    let employeeId = 1;
    let employeeName = "Pham Khang";
    localStorage.setItem("role", "0");

    // 2. User clicks delete button of first asset
    render(
      <AssetList employeeId={employeeId} employeeName={employeeName} />
    );

    const deletebtn = await screen.findAllByTestId("delete-asset");
    fireEvent.click(deletebtn[0]);

    // 3. System display popconfirm. Assert that popconfirm.
    expect(screen.getByRole("tooltip").textContent).toBe(
      "Delete assetAre you sure to delete this asset?NoYes"
    );

    // 4. User clicks "no" button
    fireEvent.click(
      screen.getByRole("button", {
        name: /no/i,
      })
    );

    // 5. System display asset list. Asset was not deleted from asset list. Tooltip disappears.
    expect(screen.getByText("Pham Khang")).toBeInTheDocument();
    expect(screen.getAllByText("table")).toBeTruthy();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it.each([
    ["DeleteButton__employee", "1"],
    ["DeleteButton__manager", "0"],
  ])(
    "should set delete button's class %s when user has logined in as employee/manager (role = %s) account",
    async (expected, n) => {
      // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using employee role to asset list page
      let employeeId = 1;
      let employeeName = "Pham Khang";
      localStorage.setItem("role", n);
      localStorage.setItem("id", employeeId.toString());

      render(
        <AssetList
          employeeId={employeeId}
          employeeName={employeeName}
        />
      );

      // 2. System display asset list. Check if button's display is none.
      const deletebtn = await screen.findAllByTestId("delete-asset");
      deletebtn.map((e) => {
        expect(e).toHaveClass(expected);
      });
    }
  );
});
