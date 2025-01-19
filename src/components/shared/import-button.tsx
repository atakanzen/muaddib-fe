import { setEdges, setNodes, setViewport } from "@/state/editor/store";
import { useAppDispatch } from "@/state/hooks";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DownloadIcon } from "lucide-react";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const ImportButton = () => {
  const [jsonString, setJsonString] = useState<string>("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOnChangeTextarea: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.target.value !== "") {
      e.target.rows = 20;
    } else {
      e.target.rows = 5;
    }

    setJsonString(e.target.value);
  };

  const handleOnClickImport: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const flow = JSON.parse(jsonString);

    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      dispatch(setNodes(flow.nodes || []));
      dispatch(setEdges(flow.edges || []));
      dispatch(setViewport({ x, y, zoom }));
      setOpen(false);
      setJsonString("");
    }
  };

  const handleOnClickClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setOpen(false);
    setJsonString("");
  };

  const handleOnOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    setJsonString("");
  };

  return (
    <Dialog onOpenChange={handleOnOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button variant="default">
          <DownloadIcon />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Import Tree with JSON</DialogTitle>
          <DialogDescription>
            Paste your decision tree's JSON representation to load it into the
            editor.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label htmlFor="json">JSON</Label>
          <Textarea
            className="font-mono scrollbar"
            id="json"
            placeholder="Paste your JSON here."
            rows={5}
            onChange={handleOnChangeTextarea}
            value={jsonString}
          />
          <Button type="submit" onClick={handleOnClickImport} variant="default">
            Import
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={handleOnClickClose}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportButton;
