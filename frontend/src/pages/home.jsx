
import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {

  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="homePage">

      {/* NAVBAR */}

      <div className="navBar">

        <h2 className="logo">RealMeet</h2>

        <div className="navRight">

          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <p className="navText">History</p>

          <Button
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>

        </div>
      </div>


      {/* MAIN CONTAINER */}

      <div className="meetContainer">

        {/* LEFT */}

        <div className="leftPanel">

          <h1>Start or Join a Meeting</h1>

          <p className="subText">
            Connect with anyone instantly using RealMeet video calling
          </p>

          <div className="joinBox">

            <TextField
              label="Enter Meeting Code"
              variant="outlined"
              size="medium"
              onChange={(e) => setMeetingCode(e.target.value)}
            />

            <Button
              variant="contained"
              startIcon={<VideoCallIcon />}
              onClick={handleJoinVideoCall}
            >
              Join
            </Button>

          </div>

        </div>


        {/* RIGHT */}

        <div className="rightPanel">

          <img src="/logo3.png" alt="video call" />

        </div>

      </div>

    </div>
  );
}

export default withAuth(HomeComponent);