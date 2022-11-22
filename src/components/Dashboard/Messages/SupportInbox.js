import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
  get_all_message,
  message_remove,
  approve_auction,
} from "../../../http_requests/httpreq";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleRead = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 600,
  width: 500,
  overFlowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SupportInbox = () => {
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();
  const [ReadMessgaeData, setReadMessgaeData] = useState();
  const [approveData, setApproveData] = useState();

  //////////////////////////////////////////////
  const [SnackbarDel, setSnackbarDel] = useState(false);
  const handleCloseSnackDel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarDel(false);
  };
  ///////////////////////////////////////////////

  //delete modal/////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData({
      ...deleteData,
      id: data.row.original.id,
      user_id: data.row.original.user_id,
    });
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  //read message modal/////////////////////////////////////
  const [openReadMessageModal, setOpenReadMessageModal] = React.useState(false);
  const handleOpenReadMessageModal = (data) => () => {
    setOpenReadMessageModal(true);
    setReadMessgaeData(data.row.original);
  };
  const handleCloseReadMessageModal = () => setOpenReadMessageModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_all_message();
    setAlluser(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleRemoveUser = () => {
    message_remove(deleteData).then((res) => {
      console.log(res);
      if (res.data.success === 1) {
        fetchData();
        setSnackbarDel(true);
        setOpenDeleteModal(false);
      }
    });
  };

  const handleApprove = (data) => (e) => {
    approve_auction(data.row.original.auction_id).then((res) => {
      if (res.data.success === 1) {
        fetchData();
      }
    });
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
          Message has been removed!
        </Alert>
      </Snackbar>

      <Modal
        open={openReadMessageModal}
        onClose={handleCloseReadMessageModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRead}>
          <div style={{fontSize:"25px", color: "#599f22", marginBottom: "20px"}}>Message Details</div>
          <div>
            <span style={{ color: "#599f22", fontWeight: "bold" }}>From </span>
            <div style={{ marginTop: "10px", fontSize: "15px" }}>
              {ReadMessgaeData?.email}
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <div style={{ color: "#599f22", fontWeight: "bold" }}>Message</div>
            <div style={{ marginTop: "10px", fontSize: "15px" }}>
              {ReadMessgaeData?.message}
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
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
            Do you want to remove this message ?
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
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRemoveUser}
                style={{ textTransform: "none", color: "red" }}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Table
        handleApp={handleOpenReadMessageModal}
        handleDelete={handleOpenDeleteModal}
        row={alluser}
      />
    </div>
  );
};

export default SupportInbox;
