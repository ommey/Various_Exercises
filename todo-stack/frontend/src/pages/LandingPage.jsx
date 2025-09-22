import "./LandingPage.css";
import { Header } from "../components/Header.jsx";
import { MainView } from "../components/MainView.jsx";
import { Footer } from "../components/Footer.jsx";
import { ViewCard } from "../components/ViewCard.jsx";

export function LandingPage() {
  return (
    <div className="app">
      <Header />
      <MainView>
        <ViewCard /><ViewCard /><ViewCard /><ViewCard /><ViewCard />
      </MainView>
      <Footer />
    </div>
  );
}
