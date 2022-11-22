import React, { useState } from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {
  add_country,
  add_region,
  add_state,
} from "../../http_requests/httpreq";

export function CountriesDialog({
  title,
  open,
  handleClose,
  regions,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [regionId, setRegionId] = useState(1);

  const handleSubmit = async () => {
    const data = {
      region_id: regionId,
      name,
    };
    await add_country(data).then((res) =>
      onSubmit({ ...data, id: res.data.id }, "country")
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <List>
            <ListItem>
              <FormControl style={{ minWidth: "100%" }}>
                <FormLabel color="success" style={{ marginBottom: "10px" }}>
                  Region
                </FormLabel>
                <Select
                  color="success"
                  size="small"
                  fullWidth
                  autoWidth={false}
                  displayEmpty={true}
                  value={regionId}
                  onChange={(e) => setRegionId(e.target.value)}
                >
                  {regions.map((region, index) => (
                    <MenuItem fullWidth key={index} value={region.id}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                color="success"
                size="small"
                label="Country Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ListItem>
          </List>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add Country
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function RegionsDialog({ title, open, handleClose, regions, onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const data = {
      name,
    };
    await add_region(data).then((res) =>
      onSubmit({ ...data, id: res.data.id }, "region")
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <List>
            <ListItem>
              <TextField
                autoFocus
                color="success"
                size="small"
                label="Region Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ListItem>
          </List>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add Region
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function StatesDialog({
  title,
  open,
  handleClose,
  countries,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState(1);

  const handleSubmit = async () => {
    const data = {
      country_id: countryId,
      name,
    };
    await add_state(data).then((res) =>
      onSubmit({ ...data, id: res.data.id }, "state")
    );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <List>
            <ListItem>
              <FormControl style={{ minWidth: "100%" }}>
                <FormLabel color="success" style={{ marginBottom: "10px" }}>
                  Couontry
                </FormLabel>
                <Select
                  color="success"
                  size="small"
                  fullWidth
                  autoWidth={false}
                  displayEmpty={true}
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  style={{ maxHeight: "300px" }}
                >
                  {countries.map((country, index) => (
                    <MenuItem key={index} fullWidth value={country.id}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <TextField
                autoFocus
                color="success"
                size="small"
                label="Country Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ListItem>
          </List>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add State
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
