import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../screens/home/Home.jsx";
import ItemDetail from "../screens/item-detail/ItemDetail.jsx";

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path={'/'}/>
            <Route element={<ItemDetail />} path='/item/:id' />

            <Route path={'*'} element={<div>Not found </div>}/>
        </Routes>
    </BrowserRouter>
}

export default Router