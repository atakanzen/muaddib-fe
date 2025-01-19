import { useUpdateDecisionTreeWithIDMutation } from "@/api/decision-tree";
import { selectEditorState } from "@/state/editor/store";
import { useAppSelector } from "@/state/hooks";
import {
  CheckCheckIcon,
  CircleAlertIcon,
  LoaderCircleIcon,
  SaveIcon,
} from "lucide-react";
import { useCallback } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SaveButton = () => {
  const [updateDecisionTree, { isLoading }] =
    useUpdateDecisionTreeWithIDMutation();
  const editorState = useAppSelector(selectEditorState);
  const { treeID } = useParams();

  const handleOnClickSave = useCallback(async () => {
    await updateDecisionTree({
      patch: {
        tree: {
          edges: editorState.edges,
          nodes: editorState.nodes,
          viewport: editorState.viewport,
        },
      },
      treeID: treeID ?? "",
    })
      .unwrap()
      .then(() =>
        toast("Your progress has been saved.", {
          icon: <CheckCheckIcon />,
        })
      )
      .catch(() =>
        toast("Something went wrong.", {
          icon: <CircleAlertIcon />,
        })
      );
  }, [editorState]);

  return (
    <Button onClick={handleOnClickSave} variant="default">
      {!isLoading ? (
        <SaveIcon />
      ) : (
        <LoaderCircleIcon className="animate-spin" />
      )}
      Save
    </Button>
  );
};

export default SaveButton;
