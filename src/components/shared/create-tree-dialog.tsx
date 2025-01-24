import { useCreateDecisionTreeMutation } from "@/api/decision-tree";
import { MouseEventHandler, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CreateTreeDialog = () => {
  const [treeName, setTreeName] = useState<string>("");
  const [createTree] = useCreateDecisionTreeMutation();
  const navigate = useNavigate();

  const handleOnClickCreate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    createTree({
      name: treeName,
      tree: { edges: [], nodes: [], viewport: { x: 0, y: 0, zoom: 1.0 } },
    })
      .unwrap()
      .then(({ id }) => navigate(`editor/${id}`));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Decision Tree</DialogTitle>
          <DialogDescription>
            Give a name for us, and we'll take care of the rest!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={treeName}
            onChange={(e) => setTreeName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleOnClickCreate}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTreeDialog;
