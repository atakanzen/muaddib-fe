import { Handle, HandleProps, useHandleConnections } from "@xyflow/react";

type ConnectionLimitHandleProps = {
  connectionCount: number;
} & HandleProps;

export const ConnectionLimitHandle = (props: ConnectionLimitHandleProps) => {
  const connections = useHandleConnections({
    type: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={connections.length < props.connectionCount}
    />
  );
};