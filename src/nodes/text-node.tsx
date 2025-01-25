import { Node, NodeProps } from "@xyflow/react";
import { ChangeEvent, useCallback } from "react";
import { changeInputForTextNode } from "../state/editor/store";
import { useAppDispatch } from "../state/hooks";

type TextNodeData = {
  text: string;
};

export type TTextNode = Node<TextNodeData, "textNode">;

const TextNode = ({ id, data: { text } }: NodeProps<TTextNode>) => {
  const dispatch = useAppDispatch();

  const handleOnChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      dispatch(changeInputForTextNode({ id: id, input: e.target.value }));
    },
    [dispatch, id]
  );

  return (
    <input
      type="text"
      id="text"
      name="text"
      value={text}
      onChange={handleOnChangeText}
      className="bg-gray-100 text-center border rounded border-gray-400 p-1 text-xss active:cursor-move"
    />
  );
};

export default TextNode;
