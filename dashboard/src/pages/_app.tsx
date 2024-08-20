"use client";
import type { AppProps } from "next/app";
import { Container } from "@components/Container";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

// css
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <div>
        <ToastContainer
          closeButton={true}
          // autoClose={false}
          autoClose={2000}
          position="top-center"
          hideProgressBar={false}
          pauseOnHover={true}
          closeOnClick={true}
          draggable={true}
        />
      </div>

      <Component {...pageProps} />
    </Container>
  );
}
