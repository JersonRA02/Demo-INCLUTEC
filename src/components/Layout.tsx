import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon, type IconName } from "./Icon";
import { AccessibilityBar } from "./AccessibilityBar";
export type Role = "Estudiante" | "Docente" | null;
export const modules: {
  title: string;
  short: string;
  description: string;
  path: string;
  icon: IconName;
  color: string;
  tag: string;
}[] = [
  {
    title: "Diversidad cultural",
    short: "Diversidad cultural",
    description:
      "Descubre las lenguas, tradiciones y saberes que nos hacen únicos.",
    path: "/cultura",
    icon: "globe",
    color: "mint",
    tag: "6 experiencias",
  },
  {
    title: "Tu voz cuenta",
    short: "Participación estudiantil",
    description:
      "Comparte tus ideas. Escucha otras voces. Construyamos juntos.",
    path: "/participacion",
    icon: "messages",
    color: "peach",
    tag: "Muro colaborativo",
  },
  {
    title: "Acompañar para incluir",
    short: "Retroalimentación docente",
    description:
      "Herramientas y prácticas para un aula donde todos participen.",
    path: "/docente",
    icon: "clipboard",
    color: "lavender",
    tag: "Espacio docente",
  },
  {
    title: "Así crecemos juntos",
    short: "Evaluación de impacto",
    description:
      "Reflexiona sobre nuestra convivencia y descubre cómo avanzamos.",
    path: "/impacto",
    icon: "chart",
    color: "blue",
    tag: "Encuesta y resultados",
  },
  {
    title: "Lo que viene",
    short: "Trabajo futuro",
    description:
      "Conoce las próximas posibilidades de una educación sin barreras.",
    path: "/futuro",
    icon: "sparkles",
    color: "yellow",
    tag: "Nuestra visión",
  },
];
export function Layout({
  children,
  role,
}: {
  children: ReactNode;
  role: Role;
}) {
  const [open, setOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    document.getElementById("main-content")?.focus();
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const handler = () => setStorageError(true);
    window.addEventListener("storage-unavailable", handler);
    return () => window.removeEventListener("storage-unavailable", handler);
  }, []);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <AccessibilityBar />
      <aside id="sidebar" className={`sidebar ${open ? "is-open" : ""}`}>
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Icon name="book" size={27} />
          </span>
          <span>
            INCLUTEC<small>Aprendemos en diversidad</small>
          </span>
        </Link>
        <div className="workspace-tag">
          <span className="status-dot" /> Tu comunidad de aprendizaje
        </div>
        <p className="nav-label">MI ESPACIO</p>
        <nav aria-label="Navegación principal">
          <NavLink to="/" end>
            <Icon name="compass" />
            Bienvenida
          </NavLink>
          <NavLink to="/aula">
            <Icon name="dashboard" />
            Mi aula
          </NavLink>
          <p className="nav-label module-label">EXPLORA Y PARTICIPA</p>
          {modules.map((m) => (
            <NavLink key={m.path} to={m.path}>
              <Icon name={m.icon} />
              <span>{m.short}</span>
              {m.path === "/docente" && role !== "Docente" && (
                <Icon name="lock" size={14} />
              )}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="ods">
            <span className="ods-number">
              4<Icon name="book" size={23} />
            </span>
            <div>
              <strong>Educación de calidad</strong>
              <p>Una oportunidad para todos.</p>
              <span>Objetivos de Desarrollo Sostenible</span>
            </div>
          </div>
          <div className="sidebar-footer">
            <span className="uni-mark">UNS</span>
            <span>
              Universidad Nacional del Santa<small>Chimbote, Perú</small>
            </span>
          </div>
        </div>
      </aside>
      {open && (
        <button
          className="nav-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        />
      )}
      <div className="app-body">
        <header className="topbar">
      <button
        className="mobile-toggle"
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        aria-expanded={open}
        aria-controls="sidebar"
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "x" : "menu"} />
      </button>

          <div className="breadcrumb">
            Mi espacio <Icon name="chevron" size={14} />
            <strong>
              {location.pathname === "/"
                ? "Bienvenida"
                : location.pathname === "/aula"
                  ? "Mi aula"
                  : modules.find((m) => location.pathname.startsWith(m.path))
                      ?.short || "Explorar"}
            </strong>
          </div>
          <div className="top-actions">
            <span className="demo-pill">
              <span /> DEMO EDUCATIVA
            </span>
            <Link to="/" className="profile" title="Cambiar rol">
              <span className="avatar">{role === "Docente" ? "D" : "E"}</span>
              <span>
                {role || "Visitante"}
                <small>{role ? "Cambiar rol" : "Elegir mi rol"}</small>
              </span>
              <Icon name="chevron" size={15} />
            </Link>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>
          {storageError && (
            <p role="alert" className="notice">
              El navegador no permite guardar datos. Los cambios se conservarán
              solo durante esta sesión.
            </p>
          )}
          {children}
        </main>
        <footer className="page-footer">
          <span>INCLUTEC · Aprender nos une. La diversidad nos enriquece.</span>
          <span>Prototipo de investigación · UNS, Chimbote</span>
        </footer>
      </div>
    </>
  );
}
