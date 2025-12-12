import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { UserData } from "./context/usercontext";
import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import Playlist from "./pages/Playlists";
import Album from "./pages/Album";
import Verify from "./pages/Verify";
import Player from "./components/Player";
import Layout from "./pages/Layout";
import Soon from "./pages/Soon";
import VerifyNotice from "./pages/VerifyNotice";
import Music from "./pages/Music";
import Premium from "./pages/Premium";
import Search from "./pages/Search";


function App() {

  const { loading, isauth } = UserData();

  return (
    <div className="h-[100dvh] bg-black text-white">

      {loading ? <Loading /> :
        <Routes>

          <Route path="/login" element={isauth ? <Navigate to="/" /> : <Login />} />

          <Route path="/register" element={isauth ? <Navigate to="/"/> : <Register />} />

          {/* <Route path="/verify-notice" element={<VerifyNotice />} />

          <Route path="/verify" element={<Verify />} /> */}

          <Route path="/admin" element={isauth ? <Admin /> : <Navigate to="/login" />} />


          <Route path="/" element={isauth ? <Layout /> : <Navigate to="/login" />} >

            <Route index element={<Home />} />

            <Route path="playlist" element={<Playlist />} />

            <Route path="album/:id" element={<Album />} />
            
            <Route path="music" element={<Music />} />

            <Route path="search" element={<Search />} />
            
            <Route path="podcast" element={<Soon />} />

            <Route path="premium" element={<Premium />} />

            <Route path="installapp" element={<Soon />} />

          </Route>

          <Route path="/*" element={isauth ? <Navigate to="/" /> : <Navigate to="/login" />} />
          

        </Routes>
      }

      {isauth ? <Player /> : null}

    </div>
  )
}

export default App;