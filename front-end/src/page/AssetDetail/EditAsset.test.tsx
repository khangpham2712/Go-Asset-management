import React from "react";
import { fireEvent, render, screen, waitFor, act, queryByText} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom"
import AssetList from "../ViewAsset/AssetList";
import AssestDetail from "./AssetDetail";


describe("EditAsset", () => {
    test ("1. Click Edit button: enable editable mode", async () => {
        render(<AssestDetail assetId={1} employeeName={1}/>)

        const editbtn = await screen.findByText("Edit")
        fireEvent.click(editbtn);

        expect(await screen.findByText("Save")).toBeInTheDocument()
    })

    test ("2. Change some basic fields", async () => {
        render(<AssestDetail assetId={1} employeeName={1}/>)

        const editbtn = await screen.findByText("Edit")
        fireEvent.click(editbtn);

        const savebtn = screen.getByText("Save")
        expect(savebtn).toBeInTheDocument()

        const asset_name = await screen.findByTestId("aname")
        fireEvent.change(asset_name, { target: { value: 'New asset name' } })
        await waitFor(() => {
            expect(screen.getByTestId("aname")).toHaveValue("New asset name");
        });

        const asset_category = await screen.findByTestId("atype")
        fireEvent.change(asset_category, { target: { value: 'Desk' } })
        await waitFor(() => {
            expect(screen.getByTestId("atype")).toHaveValue("Desk");
        });

        fireEvent.click(savebtn)
    })

    test ("3. Let asset name empty: Alert can't be empty", async () => {
        render(<AssestDetail assetId={1} employeeName={1}/>)

        const editbtn = await screen.findByText("Edit")
        fireEvent.click(editbtn);

        const savebtn = screen.getByText("Save")
        expect(savebtn).toBeInTheDocument()

        const asset_name = await screen.findByTestId("aname")
        fireEvent.change(asset_name, { target: { value: '' } })
        await waitFor(() => {
            expect(screen.getByTestId("aname")).toHaveValue("");
        });

        const asset_category = await screen.findByTestId("atype")
        fireEvent.change(asset_category, { target: { value: 'Desk' } })
        await waitFor(() => {
            expect(screen.getByTestId("atype")).toHaveValue("Desk");
        });

        fireEvent.click(savebtn)
    })

    test ("4. Let asset status empty: Alert can't be empty", async () => {
        render(<AssestDetail assetId={1} employeeName={1}/>)

        const editbtn = await screen.findByText("Edit")
        fireEvent.click(editbtn);

        const savebtn = screen.getByText("Save")
        expect(savebtn).toBeInTheDocument()

        const asset_name = await screen.findByTestId("aname")
        fireEvent.change(asset_name, { target: { value: 'Some name' } })
        await waitFor(() => {
            expect(screen.getByTestId("aname")).toHaveValue("Some name");
        });

        const asset_status = await screen.findByTestId("astatus")
        fireEvent.change(asset_status, { target: { value: '' } })
        await waitFor(() => {
            expect(screen.getByTestId("astatus")).toHaveValue("");
        });
        
        fireEvent.click(savebtn)
    })

    test ("5. Let asset name exceed 255 characters", async () => {
        render(<AssestDetail assetId={1} employeeName={1}/>)

        const editbtn = await screen.findByText("Edit")
        fireEvent.click(editbtn);

        const savebtn = screen.getByText("Save")
        expect(savebtn).toBeInTheDocument()

        const asset_name = await screen.findByTestId("aname")
        fireEvent.change(asset_name, { target: { value: 'PsMEEx1O3FTQYJtJyOBTMU6MjGWemSBG05AqKMxlHCMhPCuiYwPnfTUubEybEP8PUHD4XPoxSXSSoIsPPoXahoPG9z5qIfM79NSlUoBXy2xMUU2OjvrDOKmdD5Z13H1OlBZndaYXBgKY9nH7WEVZ12ePDwBQfaIXVBSoMPy2pOYHSrnvRATyQ4tv9h08AoPbEJxJELD2N0nYcRn715McLYmUyRYi7oq6ZF9B4hyXKfDV3eu6bo1XRhjAgHjP6c9y' } })
        await waitFor(() => {
            expect(screen.getByTestId("aname")).toHaveValue("PsMEEx1O3FTQYJtJyOBTMU6MjGWemSBG05AqKMxlHCMhPCuiYwPnfTUubEybEP8PUHD4XPoxSXSSoIsPPoXahoPG9z5qIfM79NSlUoBXy2xMUU2OjvrDOKmdD5Z13H1OlBZndaYXBgKY9nH7WEVZ12ePDwBQfaIXVBSoMPy2pOYHSrnvRATyQ4tv9h08AoPbEJxJELD2N0nYcRn715McLYmUyRYi7oq6ZF9B4hyXKfDV3eu6bo1XRhjAgHjP6c9y");
        });

        const asset_category = await screen.findByTestId("atype")
        fireEvent.change(asset_category, { target: { value: 'Desk' } })
        await waitFor(() => {
            expect(screen.getByTestId("atype")).toHaveValue("Desk");
        });
        
        fireEvent.click(savebtn)
    })
})