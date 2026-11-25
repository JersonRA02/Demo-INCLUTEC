import { Link } from "react-router-dom";
import type { Role } from "../components/Layout";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DemoNotice, PageHeading } from "../components/Shared";
import { Icon } from "../components/Icon";
const practices = [
  "Ofrezco instrucciones claras en más de un formato.",
  "Doy tiempo suficiente y distintas formas de responder.",
  "Incluyo referentes culturales diversos en los materiales.",
  "Organizo equipos con oportunidades de participación para todos.",
  "Pregunto por necesidades de apoyo sin hacer suposiciones.",
  "Reconozco los avances individuales, sin comparar estudiantes.",
];
export function Teacher({ role }: { role: Role }) {
  const [checks, setChecks] = useLocalStorage<number[]>(
    "inclutec-practices",
    [],
  );
  const [notes, setNotes] = useLocalStorage("inclutec-notes", "");
  if (role !== "Docente")
    return (
      <>
        <PageHeading
          eyebrow="03 / ESPACIO DOCENTE"
          title="Acompañar también es aprender."
          description="Este panel está disponible para el rol Docente de la demo."
        />
        <div className="panel empty-state">
          <Icon name="lock" size={42} />
          <h2>Un espacio para orientar e incluir</h2>
          <p>
            Selecciona el rol Docente en la bienvenida para explorar las
            recomendaciones, prácticas y notas.
          </p>
          <Link to="/" className="button">
            Elegir rol Docente <Icon name="next" />
          </Link>
          <p className="fine-print">
            La selección de rol es simulada. No hay autenticación real.
          </p>
        </div>
      </>
    );
  return (
    <>
      <PageHeading
        eyebrow="03 / RETROALIMENTACIÓN DOCENTE"
        title="Acompañar para abrir caminos."
        description="Pequeñas decisiones pedagógicas que hacen una gran diferencia en el aula."
      />
      <DemoNotice />
      <div className="recommendation-grid">
        {[
          {
            title: "Más formas de aprender",
            text: "Presenta una misma idea con texto, imágenes y una explicación oral. Permite elegir cómo expresar lo aprendido.",
            icon: "book" as const,
          },
          {
            title: "Participación con confianza",
            text: "Ofrece un momento de reflexión individual antes del diálogo. Invita sin presionar y valora las distintas formas de aportar.",
            icon: "messages" as const,
          },
          {
            title: "La cultura como punto de partida",
            text: "Conecta el contenido con los saberes familiares. Reconoce su origen y evita pedir a una persona que represente a toda una cultura.",
            icon: "globe" as const,
          },
        ].map((r) => (
          <article className="panel" key={r.title}>
            <Icon name={r.icon} size={28} />
            <h2>{r.title}</h2>
            <p>{r.text}</p>
            <span className="badge">Recomendación predefinida</span>
          </article>
        ))}
      </div>
      <div className="detail-layout">
        <section className="panel">
          <span className="eyebrow">PARA REFLEXIONAR SOBRE MI PRÁCTICA</span>
          <h2>Un aula más inclusiva, paso a paso</h2>
          <p className="muted">
            {checks.length} de {practices.length} prácticas marcadas
          </p>
          <progress
            value={checks.length}
            max={practices.length}
            aria-label="Prácticas inclusivas marcadas"
          />
          {practices.map((p, i) => (
            <label className="check-option" key={p}>
              <input
                type="checkbox"
                checked={checks.includes(i)}
                onChange={() =>
                  setChecks(
                    checks.includes(i)
                      ? checks.filter((c) => c !== i)
                      : [...checks, i],
                  )
                }
              />
              <span>{p}</span>
            </label>
          ))}
        </section>
        <section className="panel">
          <span className="eyebrow">IDEAS QUE PODEMOS CONSTRUIR JUNTOS</span>
          <h2>Cuaderno de notas</h2>
          <label htmlFor="notes">
            Observaciones y acuerdos del equipo docente
          </label>
          <textarea
            id="notes"
            rows={11}
            value={notes}
            maxLength={8000}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Una práctica que funcionó, una barrera que identificamos, una idea para la próxima clase…"
          />
          <p className="save-status" role="status">
            <Icon name="check" size={16} /> Guardado automático en este
            navegador
          </p>
          <p className="fine-print">
            Simulación de notas colaborativas: puedes usarlas con tu equipo en
            este dispositivo. No se sincronizan entre usuarios.
          </p>
        </section>
      </div>
    </>
  );
}
