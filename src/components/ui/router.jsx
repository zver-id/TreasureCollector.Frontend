import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../screens/home/Home.jsx";

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path={'/'}/>

            <Route path={'*'} element={<div>Not found </div>}/>
        </Routes>
    </BrowserRouter>
}

export default Router