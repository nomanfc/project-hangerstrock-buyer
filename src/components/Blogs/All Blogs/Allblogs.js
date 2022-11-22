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
  get_all_blogs,
  blog_unpub,
  blog_pub,
  blog_remove,
  get_buyers_blog,
  get_sellers_blog,
  get_shipping_blog,
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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Allblogs = () => {
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();
  const [age, setAge] = React.useState(0);

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
    });
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    if (!age) {
      const res = await get_all_blogs();
      setAlluser(res.data.data);
    }

    if (age) {
      if (age === 1) {
        const res = await get_buyers_blog();
        setAlluser(res.data.data);
      }

      if (age === 2) {
        const res = await get_sellers_blog();
        setAlluser(res.data.data);
      }

      if (age === 3) {
        const res = await get_shipping_blog();
        setAlluser(res.data.data);
      }
    }
  }, [age]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleRemoveUser = (e) => {
    blog_remove(deleteData).then((res) => {
      fetchData();
      if (res.data.success === 1) {
        setOpenDeleteModal(false);
        setSnackbarDel(true);
      }
    });
  };

  const handlePublish = (data) => (e) => {
    blog_pub(data.row.original.id).then((res) => {
      fetchData();
    });
  };

  const handleUnPublish = (data) => (e) => {
    blog_unpub(data.row.original.id).then((res) => {
      fetchData();
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
          Blog has been removed!
        </Alert>
      </Snackbar>

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
            Do you want to remove this blog ?
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
        handleAppPub={handlePublish}
        handleAppUnPub={handleUnPublish}
        handleDelete={handleOpenDeleteModal}
        handleChange={handleChange}
        age={age}
        row={alluser}
      />
    </div>
  );
};

export default Allblogs;
