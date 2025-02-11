import { Box, Button } from "@mui/material";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  const handlePrevious = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handleDirectPageChange = (pageNumber) => {
    handlePageChange(pageNumber);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={2}>
      <Button variant="outlined" onClick={handlePrevious} disabled={page === 1}>
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={pageNumber == page ? "contained" : "outlined"}
          color={pageNumber == page ? "primary" : "inherit"}
          onClick={() => handleDirectPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button variant="outlined" onClick={handleNext} disabled={page === totalPages}>
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
