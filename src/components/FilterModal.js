import { Box, Button, TextField, Typography, Modal, Paper, MenuItem } from "@mui/material";

const FilterModal = ({ filters, handleFilterChange, applyFilters, resetFilters, closeModal, uniqueValues }) => {
  return (
    <Modal open onClose={closeModal}>
      <Paper sx={{ p: 4, m: 'auto', mt: 8, maxWidth: 600 }}>
        <Typography variant="h6" mb={2}>
          Filter
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            select
            label="Country"
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select Country</MenuItem>
            {uniqueValues.countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">Select City</MenuItem>
            {uniqueValues.cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Last Updated From"
            type="date"
            name="lastUpdatedFrom"
            value={filters.lastUpdatedFrom}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Last Updated To"
            type="date"
            name="lastUpdatedTo"
            value={filters.lastUpdatedTo}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button variant="outlined" color="secondary" onClick={resetFilters}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default FilterModal;
