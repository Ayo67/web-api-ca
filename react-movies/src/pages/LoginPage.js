import React, { useState } from "react";
import {TextField,Button,Box,Typography,IconButton,InputAdornment,Link,Snackbar,Alert,} from "@mui/material";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let tempErrors = { email: "", password: "" };

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
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
    
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;    
      localStorage.setItem("user", JSON.stringify(user));
      

      setSnackbarMessage("Login successful!");
      setOpenSnackbar(true);

      setTimeout(() => {
        onLogin(); 
        navigate("/");
        window.location.reload();
      }, 2000); 

    } catch (error) {
      setErrors({ email: "", password: "Invalid email or password." });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
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
          Login
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email style={{ color: "#6a1b9a" }} />
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
