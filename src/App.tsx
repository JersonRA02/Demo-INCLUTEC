import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout, type Role } from "./components/Layout";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Home } from "./pages/Home";
import { Culture, CultureDetail } from "./pages/Culture";
import { Participation } from "./pages/Participation";
import { Teacher } from "./pages/Teacher";
import { Impact } from "./pages/Impact";
import { Future } from "./pages/Future";
export default function App() {
  const [role, setRole] = useLocalStorage<Role>("inclutec-role", null);
  return (
    <BrowserRouter>
      <Layout role={role}>
        <Routes>
          <Route path="/" element={<Home role={role} onRole={setRole} />} />
          <Route
            path="/aula"
            element={<Home role={role} onRole={setRole} dashboard />}
          />
          <Route path="/cultura" element={<Culture />} />
          <Route path="/cultura/:id" element={<CultureDetail />} />
          <Route path="/participacion" element={<Participation />} />
          <Route path="/docente" element={<Teacher role={role} />} />
          <Route path="/impacto" element={<Impact />} />
          <Route path="/futuro" element={<Future />} />
          <Route
            path="*"
            element={
              <div className="panel empty-state">
                <h1>No encontramos esta página</h1>
                <p>Vuelve a tu espacio y sigue explorando.</p>
                <Link className="button" to="/">
                  Ir al inicio
                </Link>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
