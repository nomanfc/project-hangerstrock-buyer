import React, { useState, useEffect, useCallback } from "react";
import Router from "next/router";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Select as SelectM } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useUserContext } from "../../../contexts/UserContext";

import {
  create_admin,
  get_all_blog_types,
  create_blog,
} from "../../../http_requests/httpreq";

const CreateBlog = () => {
  const { user } = useUserContext();
  const [types, setTypes] = useState();
  const [adminData, setadminData] = useState();
  const [file1, setFile1] = useState();

  const handleChange = (e) => {
    setadminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleFile1Change = (e) => {
    setFile1({ [e.target.name]: e.target.files[0] });
    pic1.src = URL.createObjectURL(e.target.files[0]);
  };

  useEffect(() => {
    get_all_blog_types().then((res) => {
      setTypes(res.data.data);
    });

    setadminData({
      ...adminData,
      created_by: user.first_name + " " + user.last_name,
    });
  }, []);

  // const handleDuplication = (e) => {
  //   check_duplication(e.target.value).then((res) => {
  //     if (res.data.data) {
  //       setDuplicate(true);
  //     }
  //   });
  // };

  const handleSubmit = (e) => {
    const formData1 = new FormData();
    formData1.append("file", file1?.upload1);
    formData1.append("blog_type_id", adminData.blog_type_id);
    formData1.append("title", adminData.title);
    formData1.append("description", adminData.description);
    formData1.append("created_by", adminData.created_by);

    create_blog(formData1).then((response) => {
      if (response.data.success === 1) {
        Router.push("/blogs");
      }
    });
  };

  return (
    <div>
      <div>
        <div
          style={{
            width: "60%",
            height: "fit-content",
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
            Create New Blog
          </div>

          <div
            style={{
              padding: "30px 35px",
              marginTop: "20px",
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
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    Blog Type
                  </InputLabel>
                  <SelectM
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Blog Type"
                    name="blog_type_id"
                    onChange={handleChange}
                    size="small"
                  >
                    {types?.map((data, index) => (
                      <MenuItem key={index} value={data?.id}>{data?.type_name}</MenuItem>
                    ))}
                  </SelectM>
                </FormControl>
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
                  label="Title"
                  onChange={handleChange}
                  name="title"
                  variant="outlined"
                />
              </div>
            </div>

            <div style={{ marginTop: "30px", color: "gray" }}>Image Upload</div>
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
                <div
                  style={{
                    height: "200px",
                    position: "relative",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  }}
                >
                  <Button
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleFile1Change}
                      name="upload1"
                    />
                    <PhotoCamera />
                  </Button>
                </div>
              </div>

              <div
                style={{
                  width: "47%",
                }}
              >
                <img
                  id="pic1"
                  style={{ height: "200px", objectFit: "fill", margin:"auto" }}
                ></img>
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
                  marginTop: "30px",
                  width: "100%",
                }}
              >
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-basic"
                  label="Description"
                  onChange={handleChange}
                  name="description"
                  multiline
                  maxRows={4}
                  minRows={4}
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "fit-content", margin: "100px auto" }}>
          <Button
            onClick={() => Router.push("/blogs")}
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

export default CreateBlog;
