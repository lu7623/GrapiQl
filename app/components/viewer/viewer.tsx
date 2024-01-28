import { IResponse } from "@/app/utils/request";
import dynamic from "next/dynamic";
import React from "react";

type ViewerProps = {
  response: IResponse;
};

const Codemirror = dynamic(() => import("../editor/Codemirror"), {
  ssr: false,
});

const Viewer = ({ response }: ViewerProps) => {
  const responseJSON = JSON.stringify(response, null, 2);
  return <Codemirror value={responseJSON} />;
};

export default Viewer;
