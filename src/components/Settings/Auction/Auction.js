import React, { useState, useCallback, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PercentIcon from "@mui/icons-material/Percent";

import {
  get_app_settings,
  update_app_settings,
} from "../../../http_requests/httpreq";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
};

const Auction = () => {
  const [user, setUser] = useState({ hanger_stock_fee: 0, bid_interval: 0 });
  const [editData, setEditData] = useState();

  const fetchData = useCallback(async () => {
    const res = await get_app_settings();
    setUser(res.data.data);
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const handleEditChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleEdit = (e) => {
    update_app_settings(user).then((res) => {
      if (res.data.success === 1) {
        fetchData();
        setOpenEditModal(false);
      }
    });
  };

  //edit modal/////////////////////////////////////
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const handleOpenEditModal = (e) => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);
  ///////////////////////////////////////////////////

  return (
    <div>
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
            Update Additional Charges
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
              label="Commision Per Bid"
              onChange={handleEditChange}
              value={user?.bid_commission_percentage}
              name="bid_commission_percentage"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <PercentIcon style={{ color: "#599f22", fontSize: "18px" }} />
                ),
              }}
            />
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Bid Interval"
              onChange={handleEditChange}
              value={user?.bid_interval}
              name="bid_interval"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              fullWidth
              id="outlined-basic"
              label="Monthly Seller Fee"
              onChange={handleEditChange}
              value={user?.monthly_seller_fee}
              name="monthly_seller_fee"
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
          marginTop: "30px",
          width: "400px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 400, color: "black" }}>
          Commision per bid :{" "}
          <span style={{ fontWeight: 700, color: "#599f22" }}>
            {user.bid_commission_percentage
              ? user.bid_commission_percentage
              : 0}
            %
          </span>{" "}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          width: "400px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 400, color: "black" }}>
          Current Bid Interval :{" "}
          <span style={{ fontWeight: 700, color: "#599f22" }}>
            {" "}
            {"$" + " " + user.bid_interval ? user.bid_interval : 0}
          </span>{" "}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
          width: "400px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 400, color: "black" }}>
          Monthly Seller Fee :{" "}
          <span style={{ fontWeight: 700, color: "#599f22" }}>
            {" "}
            {"$" + " " + user.monthly_seller_fee ? user.monthly_seller_fee : 0}
          </span>{" "}
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        {" "}
        <Button
          onClick={handleOpenEditModal}
          style={{
            textTransform: "none",
            background: "#599f22",
            color: "#ffffff",
            padding: "5px 20px",
          }}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default Auction;
