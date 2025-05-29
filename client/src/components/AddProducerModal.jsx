import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Typography,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  FormLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { createProducer } from "../../src/Redux/producerSlice";
import { toast } from "react-toastify";

export const AddProducerModal = ({ producerOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.dob) errors.dob = "Date of birth is required";
    if (!formData.bio.trim()) errors.bio = "Biography is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await dispatch(createProducer(formData)).unwrap();
      toast.success(response.message || "Producer added successfully!");
      handleClose();
    } catch (error) {
      setFormErrors({ submit: error || "Failed to add producer" });
      toast.error(error || "Failed to add producer");
    }
  };

  return (
    <Dialog open={producerOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Add Producer</Typography>
        <Button onClick={handleClose} sx={{ minWidth: 0, padding: 0 }}>
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent>
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              fullWidth
            />

            <FormControl component="fieldset" error={!!formErrors.gender}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {formErrors.gender && (
                <Typography variant="body2" color="error">
                  {formErrors.gender}
                </Typography>
              )}
            </FormControl>

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              error={!!formErrors.dob}
              helperText={formErrors.dob}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="Biography"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              error={!!formErrors.bio}
              helperText={formErrors.bio}
              multiline
              rows={4}
              fullWidth
            />

            {formErrors.submit && (
              <Typography variant="body2" color="error">
                {formErrors.submit}
              </Typography>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};
