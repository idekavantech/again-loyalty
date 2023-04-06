/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import Button from "@material-ui/core/Button";
const noAccess = "/images/no-access.svg";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

function NoAccess() {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column w-100"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={2} color="text.primary" className="col-md-6 pt-4">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <div className=" d-flex flex-column justify-content-between align-items-center flex-1">
          <Image width={200} height={100} src={noAccess} alt="" />
          <div className="mt-4 text-center w-100">
            <div>متاسفانه به این صفحه دسترسی ندارید!</div>
          </div>
        </div>
        <div className="sticky-bottom">
          <Link href="/">
            <Button color="secondary" variant="contained" className="w-100">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default NoAccess;
