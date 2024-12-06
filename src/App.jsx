import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CheckPage from './Components/CheckPage';
import PageNotFound from './Components/PageNotFound';

const Home = lazy(() => import('./Pages/Home'));
const CategoriesPage = lazy(() => import('./Pages/CategoriesPage'));
const Cart = lazy(() => import('./Pages/Cart'));
const OrderConfirmationPage = lazy(() => import('./Pages/OrderConfirmationPage'));
const SignIn = lazy(() => import('./Components/SignIn'));
const SignUp = lazy(() => import('./Components/SignUp'));
const UserOrders = lazy(() => import('./Pages/UserOrders'));
const ForgetPassword = lazy(() => import('./Pages/ForgetPassword'));


const HomeWith404 = CheckPage(Home);
const CategoriesPageWith404 = CheckPage(CategoriesPage);
const CartWith404 = CheckPage(Cart);
const OrderConfirmationPageWith404 = CheckPage(OrderConfirmationPage);
const SignInWith404 = CheckPage(SignIn);
const SignUpWith404 = CheckPage(SignUp);
const UserOrdersWith404 = CheckPage(UserOrders);
const ForgetPasswordWith404 = CheckPage(ForgetPassword);

const App = () => {
  return (
    <main className='w-[100vw] relative'>
      <Routes>
        <Route path='/' element={<HomeWith404 />} />
        <Route path='/all-categories' element={<CategoriesPageWith404 />} />
        <Route path='/cart' element={<CartWith404 />} />
        <Route path='/order-confirmation' element={<OrderConfirmationPageWith404 />} />
        <Route path='/sign-in' element={<SignInWith404 />} />
        <Route path='/sign-up' element={<SignUpWith404 />} />
        <Route path='/user-orders' element={<UserOrdersWith404 />} />
        <Route path='/forget-password' element={<ForgetPasswordWith404 />} />

        {/* Catch-all route for unmatched paths */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
