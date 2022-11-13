import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './layouts/DefaultLayout';

import { 
  Home, 
  Discover, 
  FindDuo, 
  SignIn, 
  OAuthPopup, 
} from './pages';

export function Router(){
  return(
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="games">
          <Route index element={<Discover />} />
          <Route path=":gameId" element={<FindDuo />} />
        </Route>
        <Route path="login" element={<SignIn />} />
        <Route path="callback" element={<OAuthPopup />} />
        
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}