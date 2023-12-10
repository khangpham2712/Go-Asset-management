import React from "react";
import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom"
import AddAsset from './AddAsset';
import ViewAsset from '../ViewAsset/ViewAsset';


describe("AddAsset: ", () => {
    test("1. Add asset Modal can't be opened when the Add asset button isn't clicked", async () => {
      render(<ViewAsset />)

      // Ensure the modal is closed
      expect(screen.queryByTestId("add-asset-modal")).not.toBeInTheDocument()
    });

    test("2. Open Add Asset modal when click the Add asset button", async () => {
      render(<ViewAsset />)

      const addbtn = await screen.findByTestId("btn-add-asset")

      // Click the "Add asset" button to open the modal
      fireEvent.click(addbtn);

      // Ensure the modal is now open
      expect(await screen.findByTestId("add-asset-modal")).toBeInTheDocument()
    });

    test("3. Close the Modal when click Close button", async () => {
      render(<ViewAsset />)

      // Open the Add Asset Modal
      const addbtn = await screen.findByTestId("btn-add-asset")
      fireEvent.click(addbtn);
      expect(await screen.findByTestId("add-asset-modal")).toBeInTheDocument()

      // Click the Cancel button
      const closeBtn = await screen.findAllByText('Cancel')
      fireEvent.click(closeBtn[0]);
      expect(screen.queryByTestId("add-asset-modal")).not.toBeInTheDocument()
    });
  });