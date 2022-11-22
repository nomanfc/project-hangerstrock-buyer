import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  state_remove,
  country_remove,
  region_remove,
} from "../../http_requests/httpreq";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BasicTable({
  rows,
  fetchCountries,
  fetchStates,
  fetchRegions,
  handleEdit
}) {
  const [SnackbarDel, setSnackbarDel] = useState(false);
  const [deleteDataReg, setDeleteDataReg] = useState();
  const [deleteDataCoun, setDeleteDataCoun] = useState();
  const [deleteDataState, setDeleteDataState] = useState();

  const handleCloseSnackDel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarDel(false);
  };



  //////////////////////////////
  const [openDeleteModalReg, setOpenDeleteModalReg] = React.useState(false);
  const handleOpenDeleteModalReg = (data) => {
    setOpenDeleteModalReg(true);
    setDeleteDataReg({
      id: data.row.id,
    });
  };
  const handleCloseDeleteModalReg = () => setOpenDeleteModalReg(false);

  /////////////////////////////////////////////////////
  const [openDeleteModalCoun, setOpenDeleteModalCoun] = React.useState(false);
  const handleOpenDeleteModalCoun = (data) => {
    setOpenDeleteModalCoun(true);
    setDeleteDataCoun({
      id: data.row.id,
      region_id: data.row.region_id,
    });
  };
  const handleCloseDeleteModalCoun = () => setOpenDeleteModalCoun(false);

  ////////////////////////////////////////////
  const [openDeleteModalState, setOpenDeleteModalState] = React.useState(false);
  const handleOpenDeleteModalState = (data) => {
    setOpenDeleteModalState(true);
    setDeleteDataState({
      id: data.row.id,
      country_id: data.row.country_id,
    });
  };
  const handleCloseDeleteModalState = () => setOpenDeleteModalState(false);

  const [msg, setMsg] = useState();

  //Remove API CALL//
  const handleRemoveRegion = (e) => {
    region_remove(deleteDataReg).then((res) => {
      if (res.data.success === 1) {
        setSnackbarDel(true);
        handleCloseDeleteModalReg();
        fetchStates();
        fetchCountries();
        fetchRegions();
        setMsg(res.data.message);
      }
    });
  };

  const handleRemoveCountry = (e) => {
    country_remove(deleteDataCoun).then((res) => {
      if (res.data.success === 1) {
        setSnackbarDel(true);
        handleCloseDeleteModalCoun();
        fetchStates();
        fetchCountries();
        fetchRegions();
        setMsg(res.data.message);
      }
    });
  };

  const handleRemoveState = (e) => {
    state_remove(deleteDataState).then((res) => {
      if (res.data.success === 1) {
        setSnackbarDel(true);
        handleCloseDeleteModalState();
        fetchStates();
        fetchCountries();
        fetchRegions();
        setMsg(res.data.message);
      }
    });
  };
//////////////////////////////////////////////////////////

  //DELETE
  const handleDelete = (data) => (e) => {
    if (data.row.region_id || data.row.country_id) {
      if (data.row.region_id) {
        handleOpenDeleteModalCoun(data);
      }

      if (data.row.country_id) {
        handleOpenDeleteModalState(data);
      }
    } else {
      handleOpenDeleteModalReg(data);
    }
  };



  return (
    <div>
      <Snackbar
        open={SnackbarDel}
        autoHideDuration={3000}
        onClose={handleCloseSnackDel}
      >
        <Alert
          onClose={handleCloseSnackDel}
          severity="success"
          sx={{ width: "100%", background: "#F88379" }}
        >
          {msg}
        </Alert>
      </Snackbar>

      <Modal
        open={openDeleteModalReg}
        onClose={handleCloseDeleteModalReg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#599f22" }}
          >
            Do you want to remove this region?
          </Typography>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Button
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "50px",
                }}
                onClick={handleCloseDeleteModalReg}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveRegion}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDeleteModalCoun}
        onClose={handleCloseDeleteModalCoun}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#599f22" }}
          >
            Do you want to remove this country ?
          </Typography>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Button
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "50px",
                }}
                onClick={handleCloseDeleteModalCoun}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveCountry}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDeleteModalState}
        onClose={handleCloseDeleteModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#599f22" }}
          >
            Do you want to remove this state ?
          </Typography>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ margin: "auto" }}>
              <Button
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "50px",
                }}
                onClick={handleCloseDeleteModalState}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveState}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell style={{textAlign: "center"}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-child(even)": { backgroundColor: "#f4f8f4" },
                }}
              >
                <TableCell component="th">{row.name}</TableCell>
                <TableCell component="th" style={{ width: "100px" }}>
                  <div style={{width: "90px", margin: "auto"}}>
                    <IconButton
                      onClick={handleEdit({ row })}
                      style={{ margin: "auto" }}
                    >
                      <EditIcon style={{ color: "blue" }} />
                    </IconButton>

                    <IconButton
                      onClick={handleDelete({ row })}
                      style={{ margin: "auto" }}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
