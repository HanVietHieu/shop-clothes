// import React from "react";
// import Navbar from "./components/Navbar/Navbar";
// import Hero from "./components/Hero/Hero";
// import Products from "./components/Products/Products";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import TopProducts from "./components/TopProducts/TopProducts";
// import Banner from "./components/Banner/Banner";
// import Subscribe from "./components/Subscribe/Subscribe";
// import Testimonials from "./components/Testimonials/Testimonials";
// import Footer from "./components/Footer/Footer";
// import Popup from "./components/Popup/Popup";

// const App = () => {
//   const [orderPopup, setOrderPopup] = React.useState(false);

//   const handleOrderPopup = () => {
//     setOrderPopup(!orderPopup);
//   };
//   React.useEffect(() => {
//     AOS.init({
//       offset: 100,
//       duration: 800,
//       easing: "ease-in-sine",
//       delay: 100,
//     });
//     AOS.refresh();
//   }, []);

//   return (
//     <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
//       <Navbar handleOrderPopup={handleOrderPopup} />
//       <Hero handleOrderPopup={handleOrderPopup} />
//       <Products />
//       <TopProducts handleOrderPopup={handleOrderPopup} />
//       <Banner />
//       <Subscribe />
//       <Products />
//       <Testimonials />
//       <Footer />
//       <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
//     </div>
//   );
// };

// export default App;
import React from "react";
import RouterList from "./layout/ConfigRouter";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "jotai";
export default function App() {
  const router = createBrowserRouter([...RouterList]);
  return (
    <ContainerMain>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ContainerMain>
  );
}

const ContainerMain = styled.div`
  position: relative;

  .main-layout {
    width: 256px;
    position: fixed;
    top: 0;
    overflow: hidden;
    background-image: linear-gradient(
      270deg,
      rgba(51, 148, 225, 0.18),
      transparent
    );
    background-color: #584475;
  }

  @media (max-width: 992px) {
    .main-layout {
      width: 200px;
    }
    .ant-menu-light {
      width: 200px !important;
    }
  }

  @media only screen and (max-width: 767px) {
    .main-layout {
      width: 65px;
      position: fixed;
      top: 0;
      overflow: hidden;
      background-image: linear-gradient(
        270deg,
        rgba(51, 148, 225, 0.18),
        transparent
      );
      background-color: #584475;
    }

    .ant-menu-light {
      width: auto !important;
    }
  }
`;
