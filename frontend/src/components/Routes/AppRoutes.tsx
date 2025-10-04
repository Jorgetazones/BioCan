import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Layouts
import PrivateLayout from '../../layout/PrivateLayout';
import PublicLayout from '../../layout/PublicLayout';

// Páginas públicas
import FAQsPage from '../../pages/public/FAQsPage';
import HomePage from '../../pages/public/HomePage';
import LoginPage from '../../pages/public/LoginPage';
import Page404 from '../../pages/public/Page404';
import ProductPage from '../../pages/public/ProductPage';
import ProductsPage from '../../pages/public/ProductsPage';
import ShoppingCartC from '../Cart/ShoppingCartC';
import SignUp from '../auth/SIgnUp';

// Páginas privadas
import AdminPage from '../../pages/private/AdminPage';
import MyOrdersPage from '../../pages/private/MyOrdersPage';
import ProductEditPage from '../../pages/private/ProductEditPage';
import ProductusUploadPage from '../../pages/private/ProductusUploadPage';
import PrivatePage from '../shared/private/PrivatePage';
import ProfileSection from '../shared/private/ProfileSection';

// Constantes y componentes de protección
import UsersAdminPage from '../../pages/private/UsersAdminPage';
import { USER_TYPE } from '../shared/private/PrivateHeader';
import RequireUserType from '../shared/private/RequireUserType';
import CookiesPolicy from '../shared/public/CookiesPolicy';
import PrivacyPolicy from '../shared/public/PrivacyPolicy';
import TermsAndConditions from '../shared/public/TermsAndConditions';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas accesibles por todos */}
        <Route path='/' element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='product/:id' element={<ProductPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='FAQs' element={<FAQsPage />} />
          <Route path='cart' element={<ShoppingCartC />} />
          <Route path='*' element={<Page404 />} />
          <Route path='cookies' element={<CookiesPolicy />} />
          <Route path='politica-de-privacidad' element={<PrivacyPolicy />} />
          <Route path='terms-and-conditions' element={<TermsAndConditions />} />
        </Route>

        {/* Rutas privadas */}
        <Route path='/private' element={<PrivateLayout />}>
          <Route index element={<PrivatePage />} />

          {/* Rutas comprador */}
          <Route
            path='account/edit'
            element={
              <RequireUserType allowedTypes={[USER_TYPE.COMPRADOR]}>
                <ProfileSection />
              </RequireUserType>
            }
          />
          <Route
            path='orders'
            element={
              <RequireUserType allowedTypes={[USER_TYPE.COMPRADOR]}>
                <MyOrdersPage />
              </RequireUserType>
            }
          />
          {/* Rutas admin */}
          <Route
            path='admin'
            element={
              <RequireUserType allowedTypes={[USER_TYPE.ADMIN]}>
                <AdminPage />
              </RequireUserType>
            }
          />
          <Route
            path='usersAdmin'
            element={
              <RequireUserType allowedTypes={[USER_TYPE.ADMIN]}>
                <UsersAdminPage />
              </RequireUserType>
            }
          />
          <Route
            path='productEdit/:id'
            element={
              <RequireUserType
                allowedTypes={[USER_TYPE.ADMIN, USER_TYPE.AGRICULTOR]}
              >
                <ProductEditPage />
              </RequireUserType>
            }
          />

          {/* Rutas compartidas (agricultor, admin, comprador) */}
          <Route
            path='productUploads'
            element={
              <RequireUserType
                allowedTypes={[
                  USER_TYPE.ADMIN,
                  USER_TYPE.AGRICULTOR,
                  USER_TYPE.COMPRADOR,
                ]}
              >
                <ProductusUploadPage />
              </RequireUserType>
            }
          />

          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
