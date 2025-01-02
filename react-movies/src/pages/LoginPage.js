import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const LoginPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ userName: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Redirect path after login
  const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

  const validate = () => {
    let valid = true;
    let tempErrors = { userName: "", password: "" };

    if (!userName) {
      valid = false;
      tempErrors.userName = "Username is required.";
    }

    if (!password) {
      valid = false;
      tempErrors.password = "Password is required.";
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    context.authenticate(userName, password);
    if (context.isAuthenticated) {
      setSnackbarMessage("Login successful!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate(from);
      }, 2000);
    } else {
      setErrors({ userName: "", password: "Invalid username or password." });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (context.isAuthenticated === true) {
    return <Navigate to={from} />;
  }

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
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={!!errors.userName}
            helperText={errors.userName}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person style={{ color: "#6a1b9a" }} />
                </InputAdornment>
              ),
            }}
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
            Login
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: "center", color: "#6a1b9a" }}
        >
          Don't have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/signup")}
            sx={{ color: "#4a148c", fontWeight: "bold" }}
          >
            Sign Up Now
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
