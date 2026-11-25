import { PageHeading } from "../components/Shared";
import { Icon } from "../components/Icon";
export function Future() {
  return (
    <>
      <PageHeading
        eyebrow="05 / TRABAJO FUTURO"
        title="Imaginamos una educación sin barreras."
        description="Esta demo es un primer paso. Estas posibilidades requieren investigación y desarrollo posterior."
      />
      <div className="intro-banner">
        <Icon name="sprout" size={32} />
        <div>
          <strong>Una visión en construcción</strong>
          <p>
            Las funciones de esta página no están implementadas en el prototipo.
          </p>
        </div>
      </div>
      <div className="future-grid">
        {[
          [
            "01",
            "Realidad aumentada",
            "Explorar experiencias culturales con recursos visuales interactivos en el entorno.",
          ],
          [
            "02",
            "Subtitulado en tiempo real",
            "Ampliar el acceso a contenidos orales con subtítulos automáticos revisables.",
          ],
          [
            "03",
            "Aprendizaje sin conexión",
            "Consultar recursos offline y sincronizar los avances cuando vuelva la conexión.",
          ],
          [
            "04",
            "Backend y base de datos",
            "Compartir información entre dispositivos y gestionar los datos con controles adecuados.",
          ],
          [
            "05",
            "Autenticación real",
            "Contar con cuentas, permisos y espacios personales seguros para estudiantes y docentes.",
          ],
        ].map(([n, title, text]) => (
          <article key={n} className="panel future-card">
            <span className="future-number">{n}</span>
            <span className="badge">Propuesto · No disponible</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <section className="community-strip">
        <Icon name="graduation" size={40} />
        <div>
          <h2>Un proyecto con propósito educativo</h2>
          <p>
            Prototipo universitario para una propuesta de investigación ·
            Universidad Nacional del Santa, Chimbote.
          </p>
        </div>
      </section>
    </>
  );
}
