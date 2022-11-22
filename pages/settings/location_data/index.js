import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import LocationsTable from "../../../src/components/LocationsTable/LocationsTable";
import Stack from "@mui/material/Stack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@mui/material/TextField";

import {
  CountriesDialog,
  RegionsDialog,
  StatesDialog,
} from "../../../src/components/LocationsDialog/LocationsDialog";

import {
  get_all_countries,
  get_all_states,
  get_all_regions,
  region_update,
  country_update,
  state_update,
} from "../../../src/http_requests/httpreq";

const styleRemove = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LocationData = () => {
  const size = useWindowSize();
  const [SnackbarDel, setSnackbarDel] = useState(false);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);

  const [countriesDialogOpen, setCountriesDialogOpen] = useState(false);
  const [regionsDialogOpen, setRegionsDialogOpen] = useState(false);
  const [statesDialogOpen, setStatesDialogOpen] = useState(false);

  const [EditDataReg, setEditDataReg] = useState();
  const [EditDataCoun, setEditDataCoun] = useState();
  const [EditDataState, setEditDataState] = useState();

  const handleCloseSnackDel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarDel(false);
  };

  const updateLocationDataUI = (data, action) => {
    if (action === "country") {
      setCountriesDialogOpen(false);
      setCountries((prevCountries) => [...prevCountries, data]);
    } else if (action === "region") {
      setRegionsDialogOpen(false);
      setRegions((prevRegions) => [...prevRegions, data]);
    } else if (action === "state") {
      setStatesDialogOpen(false);
      setStates((prevStates) => [...prevStates, data]);
    }
  };

  const fetchCountries = useCallback(async () => {
    const res = await get_all_countries();
    setCountries(res.data.data);
  }, []);

  const fetchRegions = useCallback(async () => {
    const res = await get_all_regions();
    setRegions(res.data.data);
  }, []);

  const fetchStates = useCallback(async () => {
    const res = await get_all_states();
    setStates(res.data.data);
  }, []);

  useEffect(() => {
    fetchCountries().catch(console.error);
    fetchRegions().catch(console.error);
    fetchStates().catch(console.error);
  }, []);

  const [deleteDataReg, setDeleteDataReg] = useState();
  const [deleteDataCoun, setDeleteDataCoun] = useState();
  const [deleteDataState, setDeleteDataState] = useState();

  //////////////////////////////
  const [openEditModalReg, setOpenEditModalReg] = React.useState(false);
  const handleOpenEditModalReg = (data) => {
    setOpenEditModalReg(true);
    setEditDataReg(data.row);
  };
  const handleCloseEditModalReg = () => setOpenEditModalReg(false);

  /////////////////////////////////////////////////////
  const [openEditModalCoun, setOpenEditModalCoun] = React.useState(false);
  const handleOpenEditModalCoun = (data) => {
    setOpenEditModalCoun(true);
    setEditDataCoun(data.row);
  };
  const handleCloseEditModalCoun = () => setOpenEditModalCoun(false);

  ////////////////////////////////////////////
  const [openEditModalState, setOpenEditModalState] = React.useState(false);
  const handleOpenEditModalState = (data) => {
    setOpenEditModalState(true);
    setEditDataState(data.row);
  };
  const handleCloseEditModalState = () => setOpenEditModalState(false);

  //message
  const [msg, setMsg] = useState();

  //Update API CALL//
  const handleUpdateRegion = (e) => {
    region_update(EditDataReg).then((res) => {
      if (res.data.success === 1) {
        handleCloseEditModalReg();
        fetchCountries();
        fetchRegions();
        fetchStates();
        setSnackbarDel(true);
        setMsg(res.data.message);
      }
    });
  };

  const handleUpdateCountry = (e) => {
    country_update(EditDataCoun).then((res) => {
      if (res.data.success === 1) {
        handleCloseEditModalCoun();
        fetchCountries();
        fetchRegions();
        fetchStates();
        setSnackbarDel(true);
        setMsg(res.data.message);
      }
    });
  };

  const handleUpdateState = (e) => {
    state_update(EditDataState).then((res) => {
      if (res.data.success === 1) {
        handleCloseEditModalState();
        fetchCountries();
        fetchRegions();
        fetchStates();
        setSnackbarDel(true);
        setMsg(res.data.message);
      }
    });
  };
  //////////////////////////////////////////////////////////

  //edit change
  const handleChangeReg = (e) => {
    setEditDataReg({ ...EditDataReg, [e.target.name]: e.target.value });
  };

  const handleChangeCoun = (e) => {
    setEditDataCoun({ ...EditDataCoun, [e.target.name]: e.target.value });
  };

  const handleChangeState = (e) => {
    setEditDataState({ ...EditDataState, [e.target.name]: e.target.value });
  };

  //EDIT
  const handleEdit = (data) => (e) => {
    if (data.row.region_id || data.row.country_id) {
      if (data.row.region_id) {
        handleOpenEditModalCoun(data);
      }

      if (data.row.country_id) {
        handleOpenEditModalState(data);
      }
    } else {
      handleOpenEditModalReg(data);
    }
  };

  return (
    <>
      <Snackbar
        open={SnackbarDel}
        autoHideDuration={3000}
        onClose={handleCloseSnackDel}
      >
        <Alert
          onClose={handleCloseSnackDel}
          severity="success"
          sx={{ width: "100%", background: "#599f22" }}
        >
          {msg}
        </Alert>
      </Snackbar>

      <Modal
        open={openEditModalReg}
        onClose={handleCloseEditModalReg}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ fontSize: "20px", color: "#599f22", fontWeight: 700 }}>
            Edit Region
          </div>
          <TextField
            fullWidth
            style={{ margin: "20px auto" }}
            id="outlined-basic"
            label="Region Name"
            variant="outlined"
            name="name"
            value={EditDataReg?.name}
            onChange={handleChangeReg}
          />

          <div style={{ margin: "auto", width: "fit-content" }}>
            <Button
              style={{
                textTransform: "none",
                color: "gray",
                marginRight: "50px",
              }}
              onClick={handleCloseEditModalReg}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateRegion}
              style={{ textTransform: "none", color: "#599f22" }}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openEditModalCoun}
        onClose={handleCloseEditModalCoun}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ fontSize: "20px", color: "#599f22", fontWeight: 700 }}>
            Edit Country
          </div>

          <FormControl
            sx={{ m: 1, minWidth: 80 }}
            fullWidth
            style={{ margin: "20px auto 0px auto" }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Region
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={parseInt(EditDataCoun?.region_id)}
              name="region_id"
              onChange={handleChangeCoun}
              autoWidth
              label="Region"
            >
              {regions?.map((data, index) => (
                <MenuItem key={index} value={data?.id}>
                  {data?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            style={{ margin: "20px auto" }}
            id="outlined-basic"
            label="Country Name"
            variant="outlined"
            name="name"
            value={EditDataCoun?.name}
            onChange={handleChangeCoun}
          />

          <div style={{ margin: "auto", width: "fit-content" }}>
            <Button
              style={{
                textTransform: "none",
                color: "gray",
                marginRight: "50px",
              }}
              onClick={handleCloseEditModalCoun}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCountry}
              style={{ textTransform: "none", color: "#599f22" }}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openEditModalState}
        onClose={handleCloseEditModalState}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRemove}>
          <div style={{ fontSize: "20px", color: "#599f22", fontWeight: 700 }}>
            Edit State
          </div>

          <FormControl
            sx={{ m: 1, minWidth: 80 }}
            fullWidth
            style={{ margin: "20px auto 0px auto" }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={parseInt(EditDataState?.country_id)}
              name="country_id"
              onChange={handleChangeState}
              autoWidth
              label="country"
            >
              {countries?.map((data, index) => (
                <MenuItem key={index} value={data?.id}>
                  {data?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            style={{ margin: "20px auto" }}
            id="outlined-basic"
            label="State Name"
            variant="outlined"
            name="name"
            value={EditDataState?.name}
            onChange={handleChangeState}
          />

          <div style={{ margin: "auto", width: "fit-content" }}>
            <Button
              style={{
                textTransform: "none",
                color: "gray",
                marginRight: "50px",
              }}
              onClick={handleCloseEditModalState}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateState}
              style={{ textTransform: "none", color: "#599f22" }}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>

      <Head>
        <title>Loction Data</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/LogoMini.png" />
      </Head>

      {/* Dialogs */}
      <CountriesDialog
        open={countriesDialogOpen}
        handleClose={() => setCountriesDialogOpen(false)}
        onSubmit={updateLocationDataUI}
        title="Add Country"
        regions={regions}
      />
      <RegionsDialog
        open={regionsDialogOpen}
        handleClose={() => setRegionsDialogOpen(false)}
        title="Add Region"
        onSubmit={updateLocationDataUI}
      />
      <StatesDialog
        open={statesDialogOpen}
        handleClose={() => setStatesDialogOpen(false)}
        title="Add State"
        countries={countries}
        onSubmit={updateLocationDataUI}
      />
      {/* Dialogs End*/}

      <div
        style={{
          display: "flex",
          gap: "60px",
        }}
      >
        <div
          style={{
            flexBasis: "0",
            flex: "1 1 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#599f22",
                fontSize: "25px",
              }}
            >
              Regions
            </div>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              startIcon={<AddBoxIcon />}
              disableElevation
              onClick={() => setRegionsDialogOpen(true)}
            >
              Add Region
            </Button>
          </div>
          <LocationsTable
            rows={regions}
            fetchStates={fetchStates}
            fetchRegions={fetchRegions}
            fetchCountries={fetchCountries}
            handleEdit={handleEdit}
          />
        </div>

        <div
          style={{
            flexBasis: "0",
            flex: "1 1 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#599f22",
                fontSize: "25px",
              }}
            >
              Countries
            </div>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              startIcon={<AddBoxIcon />}
              disableElevation
              onClick={() => setCountriesDialogOpen(true)}
            >
              Add Country
            </Button>
          </div>
          <LocationsTable
            rows={countries}
            fetchStates={fetchStates}
            fetchRegions={fetchRegions}
            fetchCountries={fetchCountries}
            handleEdit={handleEdit}
          />
        </div>

        <div
          style={{
            flexBasis: "0",
            flex: "1 1 0px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#599f22",
                fontSize: "25px",
              }}
            >
              States
            </div>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                fontSize: "16px",
              }}
              startIcon={<AddBoxIcon />}
              disableElevation
              onClick={() => setStatesDialogOpen(true)}
            >
              Add States
            </Button>
          </div>
          <LocationsTable
            rows={states}
            fetchStates={fetchStates}
            fetchRegions={fetchRegions}
            fetchCountries={fetchCountries}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </>
  );
};

export default LocationData;
