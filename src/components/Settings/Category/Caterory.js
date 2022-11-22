import React, { useState, useEffect, useCallback } from "react";
import Table from "./SortingTable.js";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

import TextField from "@mui/material/TextField";

import {
  get_categories,
  remove_admin_by_id,
  hide_category,
  unhide_category,
  create_category,
  edit_category,
  get_categories_by_id,
} from "../../../http_requests/httpreq";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleRemoveDel = {
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

const Category = () => {
  const [alluser, setAlluser] = useState();
  const [deleteData, setDeleteData] = useState();
  const [addData, setAddData] = useState();
  const [editData, setEditData] = useState();

  //delete modal/////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (data) => () => {
    setOpenDeleteModal(true);
    setDeleteData(data.row.original.id);
  };
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  ///////////////////////////////////////////////////

  //add modal/////////////////////////////////////
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };
  const handleCloseAddModal = () => setOpenAddModal(false);
  ///////////////////////////////////////////////////

  //edit modal/////////////////////////////////////
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleOpenEditModal = (data) => (e) => {
    setOpenEditModal(true);
    get_categories_by_id(data.row.original.id).then((res) => {
      setEditData(res.data.data);
    });
  };
  const handleCloseEditModal = () => setOpenEditModal(false);
  ///////////////////////////////////////////////////

  const fetchData = useCallback(async () => {
    const res = await get_categories();
    setAlluser(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleRemoveUser = () => {
    hide_category(deleteData).then((res) => {
      if (res.data.success === 1) {
        setOpenDeleteModal(false);
        fetchData();
      }
    });
  };

  const handleCreate = (e) => {
    if (addData.category_name) {
      create_category(addData).then((res) => {
        if (res.data.success === 1) {
          fetchData();
          setOpenAddModal(false);
        }
      });
    }
  };

  const handleEdit = (e) => {
    if (editData.category_name) {
      edit_category(editData).then((res) => {
        if (res.data.success === 1) {
          fetchData();
          setOpenEditModal(false);
        }
      });
    }
  };

  const handleChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemoveDel}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ color: "#599f22" }}
          >
            Do you want to remove this category ?
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

      {/* add */}
      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
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
            Create New Category
          </Typography>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Category Name"
              onChange={handleChange}
              name="category_name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                variant="outlined"
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "10px",
                }}
                onClick={handleCloseAddModal}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleCreate}
                style={{
                  textTransform: "none",
                  background: "#599f22",
                  color: "#ffffff",
                }}
              >
                Create
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* //edit */}
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
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
            Edit Category
          </Typography>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Category Name"
              onChange={handleEditChange}
              value={editData?.category_name}
              name="category_name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                variant="outlined"
                style={{
                  textTransform: "none",
                  color: "gray",
                  marginRight: "10px",
                }}
                onClick={handleCloseEditModal}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={handleEdit}
                style={{
                  textTransform: "none",
                  background: "#599f22",
                  color: "#ffffff",
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ fontWeight: 600, color: "#599f22", marginBottom: "10px" }}
        >
          Category
        </div>

        <Tooltip title="Add" aria-label="Add">
          <IconButton onClick={handleOpenAddModal}>
            <AddBoxIcon style={{ color: "blue" }} />
          </IconButton>
        </Tooltip>
      </div>

      <Table
        handleEdit={handleOpenEditModal}
        handleModal={handleOpenDeleteModal}
        row={alluser}
      />
    </div>
  );
};

export default Category;
