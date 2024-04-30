import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography } from '@mui/material';


export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html>
      <body>{children}
        <>

        </>
      </body>
    </html>
  );
};

