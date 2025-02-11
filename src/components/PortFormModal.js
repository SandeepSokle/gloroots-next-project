import { Box, Button, TextField, Typography, Modal, Paper } from "@mui/material";

const PortFormModal = ({ newPort, handleInputChange, handleCreateOrUpdate, editingPort, closeModal }) => {
  const isFormValid = newPort.name && newPort.country && newPort.city && newPort.address;

  return (
    <Modal open onClose={closeModal}>
      <Paper sx={{ p: 4, m: 'auto', mt: 8, maxWidth: 600 }}>
        <Typography variant="h6" mb={2}>
          {editingPort ? "Edit Port" : "Add New Port"}
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            name="name"
            value={newPort.name}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={newPort.country}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={newPort.city}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={newPort.address}
            onChange={handleInputChange}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button variant="outlined" color="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateOrUpdate}
            disabled={!isFormValid}
          >
            {editingPort ? "Update" : "Create"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default PortFormModal;
