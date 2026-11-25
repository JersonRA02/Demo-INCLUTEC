import { Link, useNavigate } from "react-router-dom";
import { modules, type Role } from "../components/Layout";
import { Icon } from "../components/Icon";
import { DemoNotice, IconTile, PageHeading } from "../components/Shared";
import { useLocalStorage } from "../hooks/useLocalStorage";
export function Home({
  role,
  onRole,
  dashboard = false,
}: {
  role: Role;
  onRole: (role: Role) => void;
  dashboard?: boolean;
}) {
  const navigate = useNavigate();
  const [scores] = useLocalStorage<Record<string, number>>(
    "inclutec-scores",
    {},
  );
  const complete = Object.keys(scores).length;
  return (
    <>
      <PageHeading
        eyebrow="CADA VOZ IMPORTA. CADA HISTORIA SUMA."
        title={
          dashboard
            ? `¡Qué bueno tenerte aquí${role === "Docente" ? ", docente" : ""}!`
            : "Un lugar para aprender siendo tú."
        }
        description="Un espacio para descubrir, compartir y construir una escuela más inclusiva."
        action={
          <span className="term-tag">
            <span className="status-dot" /> Comunidad INCLUTEC
          </span>
        }
      />
      <section className="hero">
        <div className="hero-copy">
          <span className="hero-kicker">
            <span /> DIFERENTES HISTORIAS, UN MISMO FUTURO
          </span>
          <h2>
            La diversidad
            <br />
            nos hace <em>crecer.</em>
          </h2>
          <p>
            Conoce otras culturas, comparte tu voz y descubre todo lo que
            podemos aprender unos de otros.
          </p>
          <Link className="button cream" to="/cultura">
            Empezar a explorar <Icon name="next" size={18} />
          </Link>
          <div className="hero-foot">
            <span className="mini-avatars">
              <i>V</i>
              <i>M</i>
              <i>A</i>
            </span>
            <span>
              Un aula donde <strong>todos pertenecemos.</strong>
            </span>
          </div>
        </div>
        <div
          className="hero-art"
          role="img"
          aria-label="Ilustración de tres estudiantes diversos compartiendo un libro entre formas geométricas y plantas"
        >
          <div className="art-orbit" />
          <div className="art-sun" />
          <span className="art-star star-one">✳</span>
          <span className="art-star star-two">✧</span>
          <div className="art-label label-one">
            <Icon name="heart" size={18} /> Aquí, tu voz cuenta
          </div>
          <div className="person person-left">
            <div className="hair" />
            <div className="face">
              <i />
              <i />
              <b />
            </div>
            <div className="body" />
          </div>
          <div className="person person-right">
            <div className="hair" />
            <div className="face">
              <i />
              <i />
              <b />
            </div>
            <div className="body" />
          </div>
          <div className="person person-center">
            <div className="hair" />
            <div className="face">
              <i />
              <i />
              <b />
            </div>
            <div className="body" />
          </div>
          <div className="art-book">
            <span />
            <span />
          </div>
          <div className="art-leaf leaf-one" />
          <div className="art-leaf leaf-two" />
          <div className="art-label label-two">
            <Icon name="sparkles" size={18} /> Aprendemos juntos
          </div>
          <div className="art-ground" />
        </div>
      </section>
      {!dashboard ? (
        <section className="role-panel" aria-labelledby="role-title">
          <div>
            <span className="eyebrow">TU EXPERIENCIA EMPIEZA AQUÍ</span>
            <h2 id="role-title">¿Cómo quieres participar?</h2>
            <p>
              Elige un rol para explorar. Puedes cambiarlo en cualquier momento.
            </p>
          </div>
          <div className="role-buttons">
            {(["Estudiante", "Docente"] as const).map((r) => (
              <button
                className={`role-button ${role === r ? "selected" : ""}`}
                key={r}
                onClick={() => {
                  onRole(r);
                  navigate("/aula");
                }}
              >
                <IconTile
                  name={r === "Estudiante" ? "graduation" : "clipboard"}
                  color={r === "Estudiante" ? "mint" : "peach"}
                />
                <span>
                  <strong>Soy {r.toLowerCase()}</strong>
                  <small>
                    {r === "Estudiante"
                      ? "Quiero descubrir y compartir"
                      : "Quiero acompañar y orientar"}
                  </small>
                </span>
                <Icon name="next" size={18} />
              </button>
            ))}
          </div>
        </section>
      ) : (
        <div className="stats-row">
          <div>
            <IconTile name="book" />
            <span>
              <strong>{complete} de 6</strong>
              <small>Experiencias completadas</small>
            </span>
          </div>
          <div>
            <IconTile name="users" color="peach" />
            <span>
              <strong>Cada voz suma</strong>
              <small>Participa a tu propio ritmo</small>
            </span>
          </div>
          <div>
            <IconTile name="heart" color="lavender" />
            <span>
              <strong>Un aula para todos</strong>
              <small>Distintas formas de aprender</small>
            </span>
          </div>
        </div>
      )}
      <section className="module-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">DESCUBRE TU CAMINO</p>
            <h2>Pequeñas acciones, grandes aprendizajes</h2>
          </div>
          <span className="muted">5 espacios para conectar</span>
        </div>
        <div className="module-grid">
          {modules.map((m, i) => (
            <Link
              key={m.path}
              to={m.path}
              className={`module-card module-${i}`}
            >
              <div className="card-top">
                <IconTile name={m.icon} color={m.color} />
                <span className="module-number">0{i + 1}</span>
              </div>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <div className="card-bottom">
                <span>{m.tag}</span>
                <span className="round-arrow">
                  <Icon
                    name={
                      m.path === "/docente" && role !== "Docente"
                        ? "lock"
                        : "arrow"
                    }
                    size={19}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="community-strip">
        <span className="community-symbol">✳</span>
        <div>
          <h2>No aprendemos igual. Aprendemos juntos.</h2>
          <p>
            Tu cultura, tus ideas y tu forma de aprender hacen más grande
            nuestra comunidad.
          </p>
        </div>
        <span className="outlined-badge">ODS 4 · Educación inclusiva</span>
      </section>
      <DemoNotice />
    </>
  );
}
