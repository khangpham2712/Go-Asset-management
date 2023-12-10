/* eslint-disable jest/no-conditional-expect */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import {
    fireEvent,
    render,
    screen,
    getByRole,
    waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import AssestDetail from "../AssetDetail/AssetDetail";
import ViewAsset from "../ViewAsset/ViewAsset";
import Register from "./Register";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe('Register - Userflow Testing', () => {
    test('Test 1: User register successfully', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        expect(role[0]).toBeTruthy();
        expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        userEvent.type(username, 'dangquangthanh');
        userEvent.type(password, '1234567');
        userEvent.type(rpassword, '1234567');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);
        // await userEvent.selectOptions(role, 'Manager');
        // await userEvent.selectOptions(department, 'Finance');

        // fireEvent.click(register);

        expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    });

    test('Test 2: Failed: Username is exist', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        expect(role[0]).toBeTruthy();
        expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        userEvent.type(username, 'quangthanh');
        userEvent.type(password, '1234567');
        userEvent.type(rpassword, '1234567');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);
        // await userEvent.selectOptions(role, 'Manager');
        // await userEvent.selectOptions(department, 'Finance');

        // fireEvent.click(register);

        expect(await screen.findByTestId('error')).toBeInTheDocument()
    });

    test('Test 3: Failed: Username field isnt filled', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        expect(role[0]).toBeTruthy();
        expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        // userEvent.type(username, 'quangthanh');
        userEvent.type(password, '1234567');
        userEvent.type(rpassword, '1234567');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);

        expect(await screen.findByTestId('error')).toBeInTheDocument()
    });

    test('Test 4: Failed: Password field isnt filled', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        expect(role[0]).toBeTruthy();
        expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        userEvent.type(username, 'quangthanh');
        // userEvent.type(password, '1234567');
        userEvent.type(rpassword, '1234567');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);

        expect(await screen.findByTestId('error')).toBeInTheDocument()
    });

    test('Test 5: Failed: Repeat-password field isnt filled', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        expect(role[0]).toBeTruthy();
        expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        userEvent.type(username, 'quangthanh');
        userEvent.type(password, '1234567');
        // userEvent.type(rpassword, '1234567');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);

        expect(await screen.findByTestId('error')).toBeInTheDocument()
    });

    test('Test 6: Failed: Role field field isnt selected', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        // expect(role[0]).toBeTruthy();
        // expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        userEvent.type(username, 'quangthanh');
        userEvent.type(password, '1234567');
        userEvent.type(rpassword, '1234567');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);

        expect(await screen.findByTestId('error')).toBeInTheDocument()
    });

    test('Test 7: Failed: Password and repeat-password are not the same', async () => {
        const { findByTestId } = render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const username = await findByTestId("username");
        const password = await findByTestId("password");
        const rpassword = await findByTestId("repeat-password");
        const phone= await findByTestId("phone-number");
        const register = await findByTestId("registerbtn");

        // select department
        let role = screen.getAllByTestId("role")
        // expect(role[0]).toBeTruthy();
        // expect(role[1]).toBeFalsy();

        // select department
        let options = screen.getAllByTestId("department")
        expect(options[0]).toBeTruthy();
        expect(options[1]).toBeFalsy();

        userEvent.type(username, 'quangthanh');
        userEvent.type(password, '1234567');
        userEvent.type(rpassword, '12345678');
        userEvent.type(phone, '0337268100');

        userEvent.click(register);

        expect(await screen.findByTestId('error')).toBeInTheDocument()
    });
});