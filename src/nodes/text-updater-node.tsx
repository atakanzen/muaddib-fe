import React, { useCallback } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";

const TextUpdaterNode = (_props: NodeProps) => {
  const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="p-2 bg-white text-black rounded-sm">
      <Handle type="target" position={Position.Top} />
      <div className="flex gap-x-1 items-center">
        <label htmlFor="text">Text:</label>
        <input
          type="text"
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag bg-gray-300 rounded-sm text-black p-1"
        />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="left-2"
      />
    </div>
  );
};

export default TextUpdaterNode;
