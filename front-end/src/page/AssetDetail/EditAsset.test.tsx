import React from "react";
import { fireEvent, render, screen, waitFor, act} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom"
import AssetList from "../ViewAsset/AssetList";


describe("Edit Asset", () => {
    test ("Click Edit button", async () => {
        let departmentId = 1;
        let departmentName = "Ngoc Ngo";
        localStorage.setItem("role", "0");

        render(
            <AssetList departmentId={departmentId} departmentName={departmentName} />
        );

        const viewbtn = await screen.findAllByTestId("view-asset-detail");
        fireEvent.click(viewbtn[0]);

        // expect(screen.getByTestId("asset-detail-modal")).toBeInTheDocument();

    })
})