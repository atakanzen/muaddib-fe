import {
  useDeleteDecisionTreeWithIDMutation,
  useListDecisionTreesQuery,
} from "@/api/decision-tree";
import CreateTreeDialog from "@/components/shared/create-tree-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Home = () => {
  const { data, error } = useListDecisionTreesQuery();
  const [deleteTree] = useDeleteDecisionTreeWithIDMutation();
  const navigate = useNavigate();

  const handleClickEdit = (treeID: string) => {
    navigate(`editor/${treeID}`);
  };

  const handleClickDelete = (treeID: string) => {
    deleteTree({ treeID })
      .unwrap()
      .then(() => toast("Tree successfully deleted."));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-screen-lg mx-auto gap-4">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-serif font-bold">Muad'dib</h1>
        <p className="text-xl">Made with ❤️ in Poznan.</p>
      </div>
      <div className="flex w-full items-center justify-between border-b pb-2">
        <h2 className="text-4xl font-bold">Decision Trees</h2>
        <CreateTreeDialog />
      </div>
      <Table>
        <TableCaption>A list of your Decision Trees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={5}>ID</TableHead>
            <TableHead colSpan={3}>Name</TableHead>
            <TableHead colSpan={3}>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((decisionTree) => (
            <TableRow key={decisionTree.id}>
              <TableCell colSpan={5} className="font-medium">
                {decisionTree.id}
              </TableCell>
              <TableCell colSpan={3}>{decisionTree.name}</TableCell>
              <TableCell colSpan={3}>{decisionTree.createdAt}</TableCell>
              <TableCell colSpan={2}>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => handleClickEdit(decisionTree.id)}
                    size="icon"
                    variant="secondary"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleClickDelete(decisionTree.id)}
                    size="icon"
                    variant="destructive"
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>Total</TableCell>
            <TableCell className="text-right">{data?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {error && <p>Something went wrong</p>}
    </div>
  );
};

export default Home;
