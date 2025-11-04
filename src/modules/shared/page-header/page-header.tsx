import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/ui/button";

interface PageHeaderProps {
  title: string;
  count: string;
  countLabel: string;
  description?: string;
  onAdd?: () => void;
  addButtonLabel?: string;
}

const PageHeader = ({
  title,
  count,
  countLabel,
  description,
  onAdd,
  addButtonLabel = "Add",
}: PageHeaderProps) => {
  return (
    <div className="mb-4 flex flex-wrap flex-col justify-between gap-8 md:flex-row md:items-center">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-[#1F263E] dark:text-white font-black text-2xl">
            {title}
          </h1>
          <span className="bg-[#eedfff] px-5 py-1.5 whitespace-nowrap rounded-full text-[#8143ca] text-sm dark:text-[#4AB0C8] dark:bg-[#202f3b]">
            {count} {countLabel}
          </span>
        </div>
        {description && (
          <p className="mt-1 font-normal text-[#8b8b8b] dark:text-gray-300">
            {description}
          </p>
        )}
      </div>

      <div className="flex w-full gap-2 md:w-max">
        {onAdd && (
          <Button
            className="flex items-center px-4! py-3 h-auto gap-1.5 bg-[#8143ca] hover:bg-[#521f8f] capitalize text-sm font-normal cursor-pointer"
            size="sm"
            onClick={onAdd}
          >
            <PlusIcon className="size-5" /> {addButtonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
