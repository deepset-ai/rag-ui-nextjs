// src/app/layout.js
import React from 'react';
import { CssBaseline } from '@mui/material';
import './globals.css';

export default function MyLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>RAG Example</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </head>
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
