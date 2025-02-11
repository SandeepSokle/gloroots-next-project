import { Box, Button } from "@mui/material";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box display="flex" justifyContent="space-between" mt={4} width="100%">
      <Button variant="outlined" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        Previous
      </Button>
      <Box display="flex" gap={2}>
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "contained" : "outlined"}
            color={pageNumber === page ? "primary" : "default"}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
      </Box>
      <Button variant="outlined" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
