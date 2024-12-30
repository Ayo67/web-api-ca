import React, { useState } from "react";
import {TextField,Button,Box,Typography,IconButton,InputAdornment,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/our-apis"; // Import your custom API function

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let tempErrors = { email: "", password: "", confirmPassword: "" };

    if (!email) {
      valid = false;
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      tempErrors.email = "Invalid email format.";
    }

    if (!password) {
      valid = false;
      tempErrors.password = "Password is required.";
    } else if (password.length < 6) {
      valid = false;
      tempErrors.password = "Password must be at least 6 characters.";
    }

    if (confirmPassword !== password) {
      valid = false;
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      
      const response = await registerUser(email, password );

      if (response.success) {
        alert("Signup successful!");
        navigate("/login"); 
      } else {
        // Handle API errors
        alert(response.message || "An error occurred during signup.");
      }
    } catch (error) {
      alert(error.message || "An unexpected error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3e5f5",
        padding: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, textAlign: "center", color: "#6a1b9a" }}
        >
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <Visibility style={{ color: "#6a1b9a" }} />
                    ) : (
                      <VisibilityOff style={{ color: "#6a1b9a" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#6a1b9a",
              color: "#fff",
              "&:hover": { backgroundColor: "#4a148c" },
            }}
          >
            Sign Up
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: "center", color: "#6a1b9a" }}
        >
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            sx={{ color: "#4a148c", fontWeight: "bold" }}
          >
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpPage;
