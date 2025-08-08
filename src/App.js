import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserReg from "./components/UserReg";
import Adminhome from "./pages/Adminhome";
import Userhome from "./pages/Userhome";
import Companyhome from "./pages/Companyhome";
import Passreset from "./components/Passreset";
import { useSelector } from "react-redux";
import bg from "./assets/images/bg.png";

function App() {
  const { dark } = useSelector((state) => state.theme);

  const appStyle = {
    background: dark
      ? `linear-gradient(135deg, #000000, #1c1c1c, #2e2e2e, #1c1c1c, #000000)`
      : `url(${bg})`,
    color: dark ? "white" : "black",

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",

    margin: 0,
  };

  return (
    <div style={appStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Homepage />} />
          <Route path="/forgot" element={<Homepage />} />
          <Route path="/forgotpost/:token" element={<Passreset />} />
          <Route path="/userregistration" element={<Homepage />} />
          <Route path="/companyreg" element={<Homepage />} />

          <Route path="/userhome" element={<Userhome />} />
          <Route path="/userintro" element={<Userhome />} />
          <Route path="/profile" element={<Userhome />} />
          <Route path="/userProfile/" element={<Userhome />} />
          <Route path="/userProfile/:otheruserid" element={<Userhome />} />
          <Route
            path="/companyprofile/:othercompanyid"
            element={<Userhome />}
          />
          <Route path="/resumetemplates" element={<Userhome />} />
          <Route path="/Showresumepreview/:no" element={<Userhome />} />
          <Route path="/viewallusers/:query" element={<Userhome />} />

          <Route path="/alljobs" element={<Userhome />}></Route>
          <Route path="/usercommunity" element={<Userhome />}></Route>
          <Route path="/messaging" element={<Userhome />}></Route>

          <Route path="/companyhome" element={<Companyhome />} />
          <Route path="/uploadjobs" element={<Companyhome />} />
          <Route path="/viewapplications" element={<Companyhome />} />
          <Route path="/community" element={<Companyhome />} />
          <Route path="/companymessages" element={<Companyhome />} />

          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/adminviewallcompanies" element={<Adminhome />} />
          <Route path="/adminviewallusers" element={<Adminhome />} />
          <Route path="/viewcompanyrequests" element={<Adminhome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
