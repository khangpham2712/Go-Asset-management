import React from "react";
import { fireEvent, getByRole, render, screen, waitFor, act} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom"
import AddAsset from './AddAsset';
import ViewAsset from '../ViewAsset/ViewAsset';
import AssestDetail from "../AssetDetail/AssetDetail";


describe("AddAsset", () => {
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

    test("4. Pass valid value to all fields", async () => {

      // Open the Add Asset Modal
      render(<ViewAsset />)
      const addbtn = await screen.findByTestId("btn-add-asset")
      fireEvent.click(addbtn);
      // expect(await screen.findByTestId("add-asset-modal")).toBeInTheDocument()

      // Pass value for: Asset name
      const asset_name = screen.getByLabelText("Name")
      fireEvent.change(asset_name, { target: { value: 'Table 689' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Name")).toHaveValue("Table 689");
      });

      // Select value for: Department
      const department = screen.getByLabelText("Department")
      fireEvent.change(department, {target: {value: "1"}})
      
      let options = screen.getAllByTestId("department_opt")
      expect(options[0]).toBeTruthy();
      expect(options[1]).toBeFalsy();
      expect(options[2]).toBeFalsy();

      // Pass value for: Type
      const asset_type = screen.getByLabelText("Type")
      fireEvent.change(asset_type, { target: { value: 'Small Table' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Type")).toHaveValue("Small Table");
      });

      // Pass value for: Status
      const status = screen.getByLabelText("Status")
      fireEvent.change(status, { target: { value: 'Broken' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Status")).toHaveValue("Broken");
      });

      // Pass value for: Description
      const description = screen.getByLabelText("Description")
      fireEvent.change(description, { target: { value: 'Some words that make you sound sMaRt' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Description")).toHaveValue("Some words that make you sound sMaRt");
      });


      // Pass value for: Note
      const note = screen.getByLabelText("StatusNote")
      fireEvent.change(note, { target: { value: 'status note' } })
      await waitFor(() => {
        expect(screen.getByLabelText("StatusNote")).toHaveValue("status note");
      });

    });

    test("5. Click add Asset button", async () => {

      // Open the Add Asset Modal
      render(<ViewAsset />)
      const addbtn = await screen.findByTestId("btn-add-asset")
      fireEvent.click(addbtn);
      // expect(await screen.findByTestId("add-asset-modal")).toBeInTheDocument()

      // Pass value for: Asset name
      const asset_name = screen.getByLabelText("Name")
      fireEvent.change(asset_name, { target: { value: 'Table 689' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Name")).toHaveValue("Table 689");
      });

      // Select value for: Department
      const department = screen.getByLabelText("Department")
      fireEvent.change(department, {target: {value: "1"}})
      
      let options = screen.getAllByTestId("department_opt")
      expect(options[0]).toBeTruthy();
      expect(options[1]).toBeFalsy();
      expect(options[2]).toBeFalsy();

      // Pass value for: Type
      const asset_type = screen.getByLabelText("Type")
      fireEvent.change(asset_type, { target: { value: 'Small Table' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Type")).toHaveValue("Small Table");
      });

      // Pass value for: Status
      const status = screen.getByLabelText("Status")
      fireEvent.change(status, { target: { value: 'Broken' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Status")).toHaveValue("Broken");
      });

      // Pass value for: Description
      const description = screen.getByLabelText("Description")
      fireEvent.change(description, { target: { value: 'Some words that make you sound sMaRt' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Description")).toHaveValue("Some words that make you sound sMaRt");
      });


      // Pass value for: Note
      const note = screen.getByLabelText("StatusNote")
      fireEvent.change(note, { target: { value: 'status note' } })
      await waitFor(() => {
        expect(screen.getByLabelText("StatusNote")).toHaveValue("status note");
      });

      // Click Submit button
      const submitbtn = await screen.findByText('Submit')
      fireEvent.click(submitbtn)

      // expect(screen.getAllByText("'status_note' is required")).toBeInTheDocument()

      // // ensure the modal is closed
      // expect(screen.queryByText("Add new asset")).not.toBeInTheDocument()

      // // and the new asset is added

    });
  });

  describe("AddAsset: Input fields", () => {
    test("6. Missing Asset name fields", async () => {
      // Open the Add Asset Modal
      render(<ViewAsset />)
      const addbtn = await screen.findByTestId("btn-add-asset")
      fireEvent.click(addbtn);
      // expect(await screen.findByTestId("add-asset-modal")).toBeInTheDocument()

      // Pass value for: Asset name: KEEP IT BLANK

      // Select value for: Department
      const department = screen.getByLabelText("Department")
      fireEvent.change(department, {target: {value: "1"}})
      
      let options = screen.getAllByTestId("department_opt")
      expect(options[0]).toBeTruthy();
      expect(options[1]).toBeFalsy();
      expect(options[2]).toBeFalsy();

      // Pass value for: Type
      const asset_type = screen.getByLabelText("Type")
      fireEvent.change(asset_type, { target: { value: 'Small Table' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Type")).toHaveValue("Small Table");
      });

      // Pass value for: Status
      const status = screen.getByLabelText("Status")
      fireEvent.change(status, { target: { value: 'Broken' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Status")).toHaveValue("Broken");
      });

      // Pass value for: Description
      const description = screen.getByLabelText("Description")
      fireEvent.change(description, { target: { value: 'Some words that make you sound sMaRt' } })
      await waitFor(() => {
        expect(screen.getByLabelText("Description")).toHaveValue("Some words that make you sound sMaRt");
      });


      // Pass value for: Note
      const note = screen.getByLabelText("StatusNote")
      fireEvent.change(note, { target: { value: 'status note' } })
      await waitFor(() => {
        expect(screen.getByLabelText("StatusNote")).toHaveValue("status note");
      });

      // Click Submit button
      const submitbtn = await screen.findByText('Submit')
      fireEvent.click(submitbtn)

      expect(await screen.findByText("'name' is required")).toBeInTheDocument();
    });

    test("7. Missing Department field", async () => {
      // Open the Add Asset Modal
      render(<ViewAsset />);
      const addbtn = await screen.findByTestId("btn-add-asset");
      fireEvent.click(addbtn);
    
      // Do not select a value for Department
    
      // Pass value for: Asset name
      const asset_name = screen.getByLabelText("Name");
      fireEvent.change(asset_name, { target: { value: 'Table' } });
      await waitFor(() => {
        expect(screen.getByLabelText("Name")).toHaveValue("Table");
      });
    
      // Pass value for: Type
      const asset_type = screen.getByLabelText("Type");
      fireEvent.change(asset_type, { target: { value: 'Small Table' } });
      await waitFor(() => {
        expect(screen.getByLabelText("Type")).toHaveValue("Small Table");
      });
    
      // Pass value for: Status
      const status = screen.getByLabelText("Status");
      fireEvent.change(status, { target: { value: 'Broken' } });
      await waitFor(() => {
        expect(screen.getByLabelText("Status")).toHaveValue("Broken");
      });
    
      // Pass value for: Description
      const description = screen.getByLabelText("Description");
      fireEvent.change(description, { target: { value: 'Some words that make you sound sMaRt' } });
      await waitFor(() => {
        expect(screen.getByLabelText("Description")).toHaveValue("Some words that make you sound sMaRt");
      });
    
      // Pass value for: Note
      const note = screen.getByLabelText("StatusNote");
      fireEvent.change(note, { target: { value: 'status note' } });
      await waitFor(() => {
        expect(screen.getByLabelText("StatusNote")).toHaveValue("status note");
      });
    
      // Click Submit button
      const submitbtn = await screen.findByText('Submit');
      fireEvent.click(submitbtn);
    
      expect(await screen.findByText("'department_id' is required")).toBeInTheDocument();
    });
  })