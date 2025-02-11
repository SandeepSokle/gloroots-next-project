"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { fetchData, createPort, updatePort, deletePort, fetchUniqueValues } from "../services/portService";
import PortTable from "../components/PortTable";
import Pagination from "../components/Pagination";
import FilterModal from "../components/FilterModal";
import PortFormModal from "../components/PortFormModal";
import { Box, Button, TextField, Container, Paper, Popover, CircularProgress, Snackbar, Alert, Skeleton } from "@mui/material";

export default function Home() {
  const [ports, setPorts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLocal, setSearchLocal] = useState("");
  const [sort, setSort] = useState({ field: "name", order: "asc" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [newPort, setNewPort] = useState({ name: "", country: "", city: "", address: "" });
  const [editingPort, setEditingPort] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    country: true,
    city: true,
    address: true,
    lastUpdated: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [filters, setFilters] = useState({ country: "", city: "", lastUpdatedFrom: "", lastUpdatedTo: "" });
  const [uniqueValues, setUniqueValues] = useState({ countries: [], cities: [] });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  const fetchPorts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchData({ _sort: sort.field, _order: sort.order, q: search, _page: page, _limit: limit, ...filters });
      if (response && response.data) {
        setPorts(response.data);
        if (response.totalPages) {
          setTotalPages(response.totalPages);
        }
      }
    } catch (error) {
      console.error("Error fetching ports:", error);
    }
    setLoading(false);
  }, [search, sort, page, limit, filters]);

  useEffect(() => {
    fetchPorts();
  }, [fetchPorts]);

  useEffect(() => {
    const fetchUniqueValuesData = async () => {
      try {
        const data = await fetchUniqueValues();
        setUniqueValues(data);
      } catch (error) {
        console.error("Error fetching unique values:", error);
      }
    };

    fetchUniqueValuesData();
  }, []);

  const handleSearch = (e) => {
    setSearchLocal(e.target.value);
    if(e.target.value == "") {
      setSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
      setPage(1); // Reset to the first page when searching
    }
  };



  const handleSort = (field) => {
    setSort((prevSort) => ({
      field,
      order: prevSort.field === field && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPort((prevPort) => ({ ...prevPort, [name]: value }));
  };

  const handleCreateOrUpdate = async () => {
    setLoading(true);
    try {
      if (editingPort) {
        await updatePort(editingPort.id, newPort);
        setEditingPort(null);
        setToast({ open: true, message: "Port updated successfully", severity: "success" });
      } else {
        await createPort(newPort);
        setToast({ open: true, message: "Port created successfully", severity: "success" });
      }
      setNewPort({ name: "", country: "", city: "", address: "" });
      setFormModalVisible(false);
      fetchPorts(); // Refresh the ports list
    } catch (error) {
      setToast({ open: true, message: "Error occurred", severity: "error" });
    }
    setLoading(false);
  };

  const handleEdit = (port) => {
    setNewPort(port);
    setEditingPort(port);
    setFormModalVisible(true);
  };

  const handleColumnVisibilityChange = (column) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [column]: !prevVisibility[column],
    }));
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const toggleFilterModal = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const toggleFormModal = () => {
    setFormModalVisible(!formModalVisible);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
    setPage(1); // Reset to the first page when applying filters
  };

  const resetFilters = () => {
    setFilters({ country: "", city: "", lastUpdatedFrom: "", lastUpdatedTo: "" });
    setFilterModalVisible(false);
    setPage(1); // Reset to the first page when resetting filters
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Container maxWidth={false} disableGutters>
      <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: '#f5f5f5' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} sx={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ fontSize: 24, fontWeight: 'bold', color: '#1976d2', fontFamily: 'Arial, sans-serif' }}>
            Gloroots
            </Box>
          <Box display="flex" gap={2}>
            <TextField
              label="Search"
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              value={searchLocal}
              // disabled={loading}
            />
            <Button variant="outlined" color="secondary" onClick={toggleFilterModal} disabled={loading}>
              Filter
            </Button>
            <Button variant="outlined" color="secondary" onClick={handlePopoverOpen} disabled={loading}>
              Column Visibility
            </Button>
            <Button variant="contained" color="primary" onClick={toggleFormModal} disabled={loading}>
              Add New
            </Button>
          </Box>
        </Box>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Paper sx={{ p: 2 }}>
            {Object.keys(columnVisibility).map((column) => (
              <Box key={column} p={1} display="flex" alignItems="center">
                <input
                  disabled={column == "name"}
                  type="checkbox"
                  checked={columnVisibility[column]}
                  onChange={() => handleColumnVisibilityChange(column)}
                />
                <span style={{ marginLeft: '8px' }}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </span>
              </Box>
            ))}
          </Paper>
        </Popover>
        {loading ? (
          <Box>
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Box>
        ) : (
          <>
              <PortTable
                ports={Array.isArray(ports) ? ports : []}
                handleEdit={handleEdit}
                deletePort={async (id) => {
                  setLoading(true);
                  try {
                    await deletePort(id);
                    setToast({ open: true, message: "Port deleted successfully", severity: "success" });
                    fetchPorts(); // Refresh the ports list
                  } catch (error) {
                    setToast({ open: true, message: "Error occurred", severity: "error" });
                  }
                  setLoading(false);
                }}
                handleSort={handleSort}
                columnVisibility={columnVisibility}
              />
            
            <Pagination page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
          </>
        )}
      </Paper>
      {filterModalVisible && (
        <FilterModal
          filters={filters}
          handleFilterChange={handleFilterChange}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          closeModal={toggleFilterModal}
          uniqueValues={uniqueValues}
        />
      )}
      {formModalVisible && (
        <PortFormModal
          newPort={newPort}
          handleInputChange={handleInputChange}
          handleCreateOrUpdate={handleCreateOrUpdate}
          editingPort={editingPort}
          closeModal={toggleFormModal}
        />
      )}
      <Snackbar open={toast.open} autoHideDuration={6000} onClose={() => setToast({ ...toast, open: false })}>
        <Alert onClose={() => setToast({ ...toast, open: false })} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
