import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

interface TableActionsProps {
  itemId: string;
  itemName: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  editLabel?: string;
  deleteLabel?: string;
}

export function TableActions({
  itemId,
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
}: TableActionsProps) {
  const handleEdit = () => {
    onEdit(itemId);
  };

  const handleDelete = () => {
    onDelete(itemId);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Open menu" size="icon-sm">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={handleEdit}>{editLabel}</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDelete} className="text-red-600">
            {deleteLabel}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
