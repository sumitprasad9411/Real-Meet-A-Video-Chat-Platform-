let IS_PROD = true;
const server = IS_PROD ?
    "https://real-meet-backend.onrender.co" :

    "http://localhost:8000"


export default server;