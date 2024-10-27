import { NodeProps } from "@xyflow/react";
import React, { useCallback } from "react";

const TextNode = (_props: NodeProps) => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="p-2 bg-white text-black rounded-sm">
      <div className="flex gap-x-1 items-center">
        <input
          type="text"
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag bg-gray-300 rounded-sm text-black p-1"
        />
      </div>
    </div>
  );
};

export default TextNode;
