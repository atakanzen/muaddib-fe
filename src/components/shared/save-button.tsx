import { CheckCheckIcon, SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SaveButton = () => {
  const handleOnClickSave = () => {
    toast("Your progress has been saved.", {
      className: "text-base",
      icon: <CheckCheckIcon />,
    });
  };
  return (
    <Button onClick={handleOnClickSave} variant="default">
      <SaveIcon />
      Save
    </Button>
  );
};

export default SaveButton;
