import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import bg from "../assets/sideImage.png";

const defaultTheme = createTheme();

export default function Authentication() {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false)

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {

      if (formState === 0) {
        await handleLogin(username, password)
      }

      if (formState === 1) {
        let result = await handleRegister(name, username, password);

        setUsername("");
        setPassword("");
        setName("");

        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
      }

    } catch (err) {
      console.log(err);
      let message = err.response?.data?.message || "Something went wrong";
      setError(message);
    }
  };

  return (

    <div className="authBackground">

      <ThemeProvider theme={defaultTheme}>

        <Grid container component="main" sx={{ minHeight: "100vh" }}>

          <CssBaseline />

          {/* LEFT IMAGE */}

          <Grid
            item
            size={{ xs: 0, sm: 4, md: 7 }}
            sx={{
              display: { xs: "none", sm: "block" },
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />


          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2
            }}
          >

            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: 320, sm: 380, md: 420 },
                padding: { xs: 3, sm: 4 },
                borderRadius: "20px",

                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",

                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",

                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >

              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>


              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  mb: 2
                }}
              >

                <Button
                  variant={formState === 0 ? "contained" : "outlined"}
                  onClick={() => setFormState(0)}
                >
                  Sign In
                </Button>

                <Button
                  variant={formState === 1 ? "contained" : "outlined"}
                  onClick={() => setFormState(1)}
                >
                  Sign Up
                </Button>

              </Box>



              <Box component="form" noValidate sx={{ width: "100%" }}>

                {formState === 1 && (

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p style={{ color: "red" }}>{error}</p>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    borderRadius: "12px"
                  }}
                  onClick={handleAuth}
                >
                  {formState === 0 ? "Login" : "Register"}
                </Button>

              </Box>

            </Box>

          </Grid>

        </Grid>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          message={message}
        />

      </ThemeProvider>

    </div>
  );
}