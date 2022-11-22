import React from "react";
import { useRouter } from "next/router";

const DetailsMessage = () => {
  const router = useRouter();

  console.log(router.query);

  return <div>DetailsMessage</div>;
};

export default DetailsMessage;
