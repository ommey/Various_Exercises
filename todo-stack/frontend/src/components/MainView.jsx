import "./MainView.css";

export function MainView({ children }) {
  return (
    <main className="main-view">
      <div className="grid">
        {children}
      </div>
    </main>
  );
}
