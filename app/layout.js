// app/layout.js
import '../styles/globals.css'

import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata = {
  title: 'FitForecasted',
  description: 'Your Perfect Fit, Forecasted',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}

