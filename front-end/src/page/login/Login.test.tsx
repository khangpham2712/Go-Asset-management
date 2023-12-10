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
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import AssestDetail from "../AssetDetail/AssetDetail";
import ViewAsset from "../ViewAsset/ViewAsset";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe('Login - Decision Table Testing', () => {
  test('Test 1: Login successfully', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      userEvent.type(username, 'quangthanh');
      userEvent.type(password, '123456');
  
      fireEvent.click(submit);  
    });

    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  });

  test('Test 2: Login failed: valid username + empty password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      userEvent.type(username, 'quangthanh');
      // userEvent.type(password, '123456');
  
      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  test('Test 3: Login failed: valid username + invalid password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      userEvent.type(username, 'quangthanh');
      userEvent.type(password, '1234567');
  
      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  test('Test 4: Login failed: empty username + valid password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      // userEvent.type(username, 'quangthanhhh');
      userEvent.type(password, '1234567');

      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  test('Test 5: Login failed: empty username + empty password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  test('Test 6: Login failed: empty username + invalid password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      // userEvent.type(username, 'quangthanhhh');
      userEvent.type(password, '1234567');

      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  test('Test 7: Login failed: invalid username + valid password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");
    // userEvent.type(password, 'password');

    act(() => {
      /* fire events that update state */
      userEvent.type(username, 'test');
      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });


  test('Test 8: Login failed: invalid username + empty password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      userEvent.type(username, 'test');
      // userEvent.type(password, 'password');

      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  test('Test 9: Login failed: invalid username + invalid password', async () => {
    const { findByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const username = await findByTestId("username");
    const password = await findByTestId("password");
    const submit = await findByTestId("loginbtn");

    act(() => {
      userEvent.type(username, 'test');
      userEvent.type(password, 'password');

      fireEvent.click(submit);
    });

    expect(await screen.findByTestId('error')).toBeInTheDocument()
  });

  // it('should have correct label', () => {
  //   const { getByTestId } = render(defaultComponent);
  //   expect(getByTestId('sign-up-form')).toBeTruthy();
  // });
});