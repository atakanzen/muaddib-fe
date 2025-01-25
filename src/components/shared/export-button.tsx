import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import {
  BracesIcon,
  CircleAlertIcon,
  CopyCheckIcon,
  ImageDownIcon,
  ImageIcon,
  UploadIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1920;
const imageHeight = 1080;

function ExportButton() {
  const { getNodes, toObject } = useReactFlow();

  const handleOnClickPNGExport = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0.3
    );

    toPng(document.querySelector(".react-flow__viewport") as HTMLElement, {
      backgroundColor: "#f5f5f5",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}`,
        height: `${imageHeight}`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    })
      .then(downloadImage)
      .then(() =>
        toast("PNG export has been downloaded.", {
          icon: <ImageDownIcon />,
        })
      );
  };

  const handleOnClickJSONExport = () => {
    // Generate the JSON object
    const flowObject = toObject();

    // Convert it to a JSON string
    const jsonString = JSON.stringify(flowObject, null, 2); // Pretty-print with 2-space indentation

    // Copy the JSON string to the clipboard
    navigator.clipboard
      .writeText(jsonString)
      .then(() =>
        toast("JSON copied to clipboard!", {
          description: "You can now paste it somewhere for future use.",
          icon: <CopyCheckIcon />,
        })
      )
      .catch((err) => {
        console.error("Failed to copy JSON to clipboard:", err);
        toast("Something went wrong", {
          icon: <CircleAlertIcon />,
        });
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <UploadIcon /> Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer flex justify-between"
          onClick={handleOnClickPNGExport}
        >
          PNG
          <ImageIcon />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer  flex justify-between"
          onClick={handleOnClickJSONExport}
        >
          JSON <BracesIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ExportButton;
