import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Select as SelectM } from "@mui/material";
import { useUserContext } from "../../../contexts/UserContext";

import { create_admin } from "../../../http_requests/httpreq";

const CreateAdmin = () => {
  // const { user } = useUserContext();

  const [adminData, setadminData] = useState({ user_type_id: 2 });
  // const [duplicate, setDuplicate] = useState(false);

  const handleChange = (e) => {
    setadminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // const handleDuplication = (e) => {
  //   check_duplication(e.target.value).then((res) => {
  //     if (res.data.data) {
  //       setDuplicate(true);
  //     }
  //   });
  // };

  const handleSubmit = (e) => {
    if (adminData.password && adminData.email && adminData.first_name) {
      adminData.password === adminData.cpassword
        ? create_admin(adminData).then((res) => {
            if (res.data.success === 1) {
              Router.push("/admin");
            }
            if (res.data.success === 0) {
              window.alert(res.data.message);
            }
          })
        : window.alert("Password and Confirm passsword not matched!");
    }
  };

  
  return (
    <div>
      <div>
        <div
          style={{
            width: "60%",
            height: "400px",
            borderRadius: "10px",
            margin: "10px auto",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
          }}
        >
          <div
            style={{
              padding: "20px 35px",
              width: "100%",
              background: "#DEECD3",
              fontSize: "18px",
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            Create New Admin
          </div>

          <div
            style={{
              padding: "30px 35px",
              marginTop: "50px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                //   flexDirection: windowWidth.width < 800 ? "column" : "row",
              }}
            >
              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="First Name"
                  onChange={handleChange}
                  name="first_name"
                  variant="outlined"
                />
              </div>

              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Last Name"
                  onChange={handleChange}
                  name="last_name"
                  variant="outlined"
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-between",
                //   flexDirection: windowWidth.width < 800 ? "column" : "row",
              }}
            >
              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  onChange={handleChange}
                  name="email"
                  variant="outlined"
                />
              </div>

              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Phone Number"
                  onChange={handleChange}
                  name="phone"
                  variant="outlined"
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: "15px",
                justifyContent: "space-between",
                //   flexDirection: windowWidth.width < 800 ? "column" : "row",
              }}
            >
              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  onChange={handleChange}
                  name="password"
                  variant="outlined"
                />
              </div>

              <div
                style={{
                  width: "47%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  type="password"
                  id="outlined-basic"
                  label="Confirm Password"
                  onChange={handleChange}
                  name="cpassword"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "fit-content", margin: "100px auto" }}>
          <Button
            onClick={() => Router.push("/client/allclient")}
            style={{
              textTransform: "none",
              background: "gray",
              color: "#FFFFFF",
              padding: "10px 100px",
              marginRight: "20px",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            style={{
              textTransform: "none",
              background: "#599f22",
              color: "#FFFFFF",
              padding: "10px 100px",
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
