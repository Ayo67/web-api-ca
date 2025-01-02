import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Snackbar, Alert, InputAdornment, IconButton, Link,} from "@mui/material";
import { Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [errors, setErrors] = useState({ userName: "", password: "", passwordAgain: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [registered, setRegistered] = useState(false);

  const validate = () => {
    let valid = true;
    let tempErrors = { userName: "", password: "", passwordAgain: "" };

    if (!userName) {
      valid = false;
      tempErrors.userName = "Username is required.";
    }

    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!password) {
      valid = false;
      tempErrors.password = "Password is required.";
    } else if (!passwordRegEx.test(password)) {
      valid = false;
      tempErrors.password = "Password must be at least 8 characters, including letters, numbers, and a special character.";
    }

    if (passwordAgain !== password) {
      valid = false;
      tempErrors.passwordAgain = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return valid;
  };

  const register = () => {
    if (!validate()) return;

    context.register(userName, password);
    setSnackbarMessage("Registration successful! Redirecting to login...");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
    setTimeout(() => {
      setRegistered(true);
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordAgainVisibility = () => {
    setShowPasswordAgain(!showPasswordAgain);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#e8f5e9",
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
          sx={{ marginBottom: 2, textAlign: "center", color: "#2e7d32" }}
        >
          Sign Up
        </Typography>
        <form>
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
                  <Person style={{ color: "#2e7d32" }} />
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
                      <Visibility style={{ color: "#2e7d32" }} />
                    ) : (
                      <VisibilityOff style={{ color: "#2e7d32" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type={showPasswordAgain ? "text" : "password"}
            variant="outlined"
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
            error={!!errors.passwordAgain}
            helperText={errors.passwordAgain}
            sx={{ marginBottom: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordAgainVisibility}>
                    {showPasswordAgain ? (
                      <Visibility style={{ color: "#2e7d32" }} />
                    ) : (
                      <VisibilityOff style={{ color: "#2e7d32" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#2e7d32",
              color: "#fff",
              "&:hover": { backgroundColor: "#1b5e20" },
            }}
            onClick={register}
          >
            Register
          </Button>
        </form>
        <Typography
          variant="body2"
          sx={{ marginTop: 2, textAlign: "center", color: "#2e7d32" }}
        >
          Already have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{ color: "#1b5e20", fontWeight: "bold" }}
          >
            Login Here
          </Link>
        </Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpPage;
