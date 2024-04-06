import Home from "./components/home";
import {Routes , Route, BrowserRouter} from 'react-router-dom'
import Navbar from "./components/navbar";
import { Provider } from "react-redux";
import { store } from "./store";
import CreateAlbumForm from "./components/createAlbumForm";
import UpdateAlbumForm from "./components/updateAlbumForm";
function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter basename="/Album-Api" >
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/createAlbum" element={<CreateAlbumForm />} />
            <Route path="/updateAlbum" element={<UpdateAlbumForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
