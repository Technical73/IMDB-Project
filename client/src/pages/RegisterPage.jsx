import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email_id: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email_id.trim()) {
      errors.email_id = "Email is required";
    } else if (
      !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(formData.email_id)
    ) {
      errors.email_id = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      toast.success(result.payload.message || "Registered successfully!");
      setFormData({
        username: "",
        email_id: "",
        password: "",
      });
      navigate("/login");
    } else {
      toast.error(result.payload || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            required
            name="username"
            value={formData.username}
            onChange={handleChangeRegister}
            error={Boolean(formErrors.username)}
            helperText={formErrors.username}
          />
          <TextField
            label="Email Id"
            fullWidth
            margin="normal"
            required
            name="email_id"
            value={formData.email_id}
            onChange={handleChangeRegister}
            error={Boolean(formErrors.email_id)}
            helperText={formErrors.email_id}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChangeRegister}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
