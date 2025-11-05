import React from "react";
import { useTranslation } from "react-i18next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "../../../components/ui/pagination";

interface TablePaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  nextText?: string;
  previousText?: string;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  nextText = "Next",
  previousText = "Previous",
}) => {
  const { i18n } = useTranslation();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          {/* Custom Previous Button */}
          <PaginationItem>
            <div
              onClick={handlePrevious}
              className={
                `flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ` +
                (currentPage === 1
                  ? "pointer-events-none opacity-50 text-muted-foreground"
                  : "cursor-pointer")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left h-4 w-4"
                style={{
                  transform: i18n.language === "ar" ? "rotate(180deg)" : "",
                }}
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span>{previousText}</span>
            </div>
          </PaginationItem>

          {/* First page and ellipsis */}
          {pageNumbers[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, 1)}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {pageNumbers[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {/* Page numbers */}
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => handlePageClick(e, page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last page and ellipsis */}
          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => handlePageClick(e, totalPages)}
                  className="cursor-pointer"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Custom Next Button */}
          <PaginationItem>
            <div
              onClick={handleNext}
              className={
                `flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ` +
                (currentPage === totalPages
                  ? "pointer-events-none opacity-50 text-muted-foreground"
                  : "cursor-pointer")
              }
            >
              <span>{nextText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right h-4 w-4"
                style={{
                  transform: i18n.language === "ar" ? "rotate(180deg)" : "",
                }}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
