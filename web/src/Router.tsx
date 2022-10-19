import { Route, Routes } from "react-router-dom";

import { DefaultLayout } from "./layouts/DefaultLayout";

import { Home, Discover, FindDuo } from "./pages";

export function Router(){
  return(
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="games">
          <Route index element={<Discover />} />
          <Route path=":gameId" element={<FindDuo />} />
        </Route>
      </Route>
    </Routes>
  )
}