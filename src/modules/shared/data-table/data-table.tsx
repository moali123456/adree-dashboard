import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

interface Column<T> {
  key: keyof T;
  label: string;
  className?: string;
  align?: "left" | "right" | "center";
  headerAlign?: "left" | "right" | "center";
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const DataTable = <T extends object>({ columns, data }: DataTableProps<T>) => {
  return (
    <div className="pt-3">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col.key)}
                className={`${col.className || ""} ${
                  col.headerAlign === "right"
                    ? "text-right"
                    : col.headerAlign === "center"
                    ? "text-center"
                    : "text-left"
                } bg-gray-100 text-base font-semibold`}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell
                    key={String(col.key)}
                    className={
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }
                  >
                    {col.render
                      ? col.render(row[col.key], row, i)
                      : String(row[col.key] || "")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;