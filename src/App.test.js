import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App components', () => {
    render(<App />);

    screen.debug();
  });

  test('renders table headers', () => {
    render(<App />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    let headers = screen.getAllByRole("columnheader");
    headers.map(item => {
      expect(item).toBeInTheDocument();
      expect(item).toBeVisible();
    })

  });

  test('renders table', () => {
    render(<App />);
    // screen.getByRole("table");
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  test('renders pagination', () => {
    render(<App />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  test('renders TextField', () => {
    render(<App />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument;
  });

  // test('renders TextField', () => {
  //   render(<App />);
  //   screen.getByRole("");
  // });

  test('checks for value in text input 0', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '0' },
    });
    await waitFor(() =>{
      expect(screen.queryAllByRole("datatablerow").length).toBe(0);
      screen.debug();
    })
  });

  test('checks for value in text input 1', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '1' },
    });
    await waitFor(() =>{
      expect(screen.queryAllByRole("datatablerow").length).toBe(1);
      screen.debug();
    })
  });

  test('checks for value in text input "" ', async () => {
    render(<App />);

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '' },
    });
    await waitFor(() =>{
      expect(screen.queryAllByRole("datatablerow").length).toBe(5);
      screen.debug();
    })
  });

});
