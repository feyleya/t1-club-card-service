import Header from "./components/general/Header";
import Main from "./components/general/Main";
import Footer from "./components/general/Footer";
import { ContextProvider } from "./additional/context";

export default function App() {
  return (
    <div className="content">
      <ContextProvider>
        <Header/>
        <Main/>
      </ContextProvider>
      <Footer/>
    </div>
  );
}
