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
  test("should display first asset's detail assigned to Pham Khang employee (manager role)", async () => {
    // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using manager role to asset list page
    let departmentId = 1;
    let departmentName = "Pham Khang";
    localStorage.setItem("role", "0");

    // 2. User click view button of first asset
    render(
      <AssetList departmentId={departmentId} departmentName={departmentName} />
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
    let departmentId = 1;
    let departmentName = "Pham Khang";
    localStorage.setItem("role", "0");

    // 2. User clicks view button of first asset
    render(
      <AssetList
        departmentId={departmentId}
        departmentName={departmentName}
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


describe("Delete-asset-test", () => {
  it("should delete first asset assigned to employee Nguyen An successfully when clicking delete button (manager role)", async () => {
    // 1. Set userId (employeeId) = 3, employeeName = "Nguyen An". Using manager role to asset list page
    let departmentId = 3;
    let departmentName = "Nguyen An";
    localStorage.setItem("role", "0");

    // 2. User clicks delete button of first asset
    render(
      <AssetList departmentId={departmentId} departmentName={departmentName} />
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

  it("should not confirm to delete asset assigned to employee Pham Khang when clicking delete button (manager role)", async () => {
    // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using manager role to asset list page
    let departmentId = 1;
    let departmentName = "Pham Khang";
    localStorage.setItem("role", "0");

    // 2. User clicks delete button of first asset
    render(
      <AssetList departmentId={departmentId} departmentName={departmentName} />
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

  // Someone send assetId through API
  // it("should handle error when deleting from an API (with not existed asset id)", async () => {
  //   const assetId = 5;
  //   const errorDelete = { message: "Not found" };

  //   try {
  //     await axios.delete(`http://localhost:8080/api/assets/${assetId}`);
  //   } catch (e: any) {
  //     console.log(e.response.data.error);
  //     expect(e.response.data.error).toEqual(errorDelete.message);
  //   }
  // });

  it.each([
    ["DeleteButton__department", "1"],
    ["DeleteButton__manager", "0"],
  ])(
    "should set delete button's class %s when user has logined in as employee/manager (role = %s) account",
    async (expected, n) => {
      // 1. Set userId (employeeId) = 1, employeeName = "Pham Khang". Using employee role to asset list page
      let departmentId = 1;
      let departmentName = "Pham Khang";
      localStorage.setItem("role", n);
      localStorage.setItem("id", departmentId.toString());

      render(
        <AssetList
          departmentId={departmentId}
          departmentName={departmentName}
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
