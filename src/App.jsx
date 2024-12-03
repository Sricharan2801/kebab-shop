import{ lazy } from 'react'
const Home = lazy(() => import('./Pages/Home'))
const CategoriesPage = lazy(() => import('./Pages/CategoriesPage'))
const Cart = lazy(() => import('./Pages/Cart'))

const HomeWith404 = CheckPage(Home);
const CategoriesPageWith404 = CheckPage(CategoriesPage);
const CartWith404 = CheckPage(Cart);

import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import CheckPage from "./Components/CheckPage"

const App = () => {

  return (
    <main className='w-[100vw] relative'>
      <Routes>
        <Route path='/' element={<HomeWith404 />} />
        <Route path='/all-categories' element={<CategoriesPageWith404 />} />
        <Route path='/cart' element={<CartWith404 />} />
      </Routes>
      <Toaster />
    </main>
  )
}

export default App;
