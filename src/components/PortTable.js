import moment from "moment";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const PortTable = ({ ports, handleEdit, deletePort, setPorts, handleSort, columnVisibility }) => {
    return (
        <TableContainer component={Paper}>
            <Box sx={{ maxHeight: 600, overflow: 'auto' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {columnVisibility.name && (
                            <TableCell onClick={() => handleSort("name")} sx={{ fontWeight: 'bold', height: '10%' }}>Name</TableCell>
                        )}
                        {columnVisibility.country && (
                            <TableCell onClick={() => handleSort("country")} sx={{ fontWeight: 'bold', height: '10%' }}>Country</TableCell>
                        )}
                        {columnVisibility.city && (
                            <TableCell onClick={() => handleSort("city")} sx={{ fontWeight: 'bold', height: '10%' }}>City</TableCell>
                        )}
                        {columnVisibility.lastUpdated && (
                            <TableCell onClick={() => handleSort("lastUpdated")} sx={{ fontWeight: 'bold', height: '10%' }}>Last Updated</TableCell>
                        )}
                        {columnVisibility.address && (
                            <TableCell onClick={() => handleSort("address")} sx={{ fontWeight: 'bold', height: '10%' }}>Address</TableCell>
                        )}
                        <TableCell width={90} sx={{ fontWeight: 'bold', height: '10%' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {ports?.map((port) => (
                        <TableRow key={port.id}>
                            {columnVisibility.name && (
                                <TableCell>{port.name}</TableCell>
                            )}
                            {columnVisibility.country && (
                                <TableCell>{port.country}</TableCell>
                            )}
                            {columnVisibility.city && (
                                <TableCell>{port.city}</TableCell>
                            )}
                            {columnVisibility.lastUpdated && (
                                <TableCell>{moment(port.lastUpdated).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                            )}
                            {columnVisibility.address && (
                                <TableCell>{port.address}</TableCell>
                            )}
                            <TableCell>
                                <IconButton color="primary" onClick={() => handleEdit(port)} sx={{ minWidth: 40 }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => deletePort(port.id, setPorts)} sx={{ ml: 1, minWidth: 40 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                </Box>
        </TableContainer>
    );
};

export default PortTable;
