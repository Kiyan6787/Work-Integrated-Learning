"use client";

import NextNProgress from "nextjs-progressbar";

const NextNProgressClient = () => {
  return (
    <NextNProgress
      color="#00b79c"
      startPosition={0.3}
      stopDelayMs={200}
      height={4}
      showOnShallow={true}
    />
  );
};

export default NextNProgressClient;
