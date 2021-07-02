import React from "react";
import toolLoader from "./toolLoader";

const ToolContainer = ({ toolKey }: { toolKey: string }) => {
  const App = React.lazy<any>(() =>
    toolLoader.load(toolKey).then((res) => {
      return res;
    })
  );

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <App name="我试222试"></App>
    </React.Suspense>
  );
};

export default ToolContainer;
