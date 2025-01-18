import { CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SaveButton = () => {
  const handleOnClickSave = () => {
    toast("Your progress has been saved.", {
      className: "text-base",
      icon: <CheckCheck />,
    });
  };
  return (
    <Button className="" onClick={handleOnClickSave} variant="default">
      Save
    </Button>
  );
};

export default SaveButton;
