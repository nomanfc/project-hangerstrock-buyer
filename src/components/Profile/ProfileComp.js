import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";

import SimpleDialog from "../SimpleDialog/SimpleDialog";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import { useUserContext } from "../../contexts/UserContext";

const ProfileComp = () => {
  const [openChangePasswordForm, setOpenChangePasswordForm] =
    React.useState(false);
  const [formContent, setFormContent] = React.useState(null);

  const { user } = useUserContext();

  return (
    <Stack direction="column" spacing={5}>
      {/* Change Password Dialog */}
      <SimpleDialog
        open={openChangePasswordForm}
        handleClose={() => setOpenChangePasswordForm(false)}
        title="Change Password"
        content={<ChangePasswordForm />}
      />

      {/* Account Information */}
      <div>
        <Stack
          justifyContent="space-between"
          direction="row"
          style={{
            paddingBottom: "15px",
            borderBottom: "1px solid #447e144d",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "green",
            }}
          >
            Account Information
          </div>
          <Button
            variant="contained"
            style={{
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            startIcon={<LockIcon />}
            disableElevation
            onClick={() => setOpenChangePasswordForm(true)}
          >
            Change Password
          </Button>
        </Stack>

        <Stack direction="column" spacing={0.5} mt={2}>
          <p style={{ textTransform: "capitalize" }}>
            {`${user?.first_name} ${user?.last_name}`}
          </p>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </Stack>
      </div>
      {/* Account Information End */}
    </Stack>
  );
};

export default ProfileComp;
