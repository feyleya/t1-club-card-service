import Header from "./components/general/Header";
import Main from "./components/general/Main";
import Footer from "./components/general/Footer";
import { useEffect, useContext } from "react";
import { AppContext } from "./additional/context";
import { checkAuth } from "./additional/requests";

export default function App() {
  const { updateState } = useContext(AppContext);
  useEffect(() => {
      const checkAuthorization = async () => {
          const authStatus  = await checkAuth();
          updateState({ tempStatus: authStatus });
          if(authStatus == 92){
            updateState({ curPage: "Карта" });
          } else if(authStatus > 92){
            updateState({ curPage: "Пользователи" });
          }
      };
      checkAuthorization();
  }, []);


  return (
    <div className="content">
        <Header/>
        <Main/>
        <Footer/>
    </div>
  );
}
