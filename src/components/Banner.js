import React from "react";
import { Banner, StaticBanner } from "material-ui-banner";

function InsertBanner() {
  return (
    <Banner
      icon={<div />}
      label="Hello, guest! Be sure to login or sign-up"
      open
    />
  );
}

export default InsertBanner;
