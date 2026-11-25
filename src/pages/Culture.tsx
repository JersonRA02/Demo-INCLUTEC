import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cultures } from "../data/content";
import { Icon, type IconName } from "../components/Icon";
import { DemoNotice, IconTile, PageHeading } from "../components/Shared";
import { useLocalStorage } from "../hooks/useLocalStorage";
export function Culture() {
  const [scores] = useLocalStorage<Record<string, number>>(
    "inclutec-scores",
    {},
  );
  return (
    <>
      <PageHeading
        eyebrow="01 / DIVERSIDAD CULTURAL"
        title="Un país de muchas historias."
        description="Explora nuestras raíces. Descubre otras miradas. Encuentra lo que nos une."
      />
      <div className="intro-banner">
        <Icon name="globe" size={32} />
        <div>
          <strong>La diversidad se conoce, se vive y se respeta.</strong>
          <p>
            Seis experiencias breves para acercarte a la riqueza cultural de
            Áncash y el Perú.
          </p>
        </div>
        <span className="badge">
          {Object.keys(scores).length}/6 completadas
        </span>
      </div>
      <div className="culture-grid">
        {cultures.map((c, i) => (
          <Link to={`/cultura/${c.id}`} key={c.id} className="culture-card">
            <div className={`culture-visual ${c.color}`}>
              <span className="culture-pattern" />
              <Icon name={c.icon as IconName} size={62} />
              <span className="culture-index">0{i + 1}</span>
            </div>
            <div className="culture-copy">
              <span className="eyebrow">{c.subtitle}</span>
              <h2>{c.title}</h2>
              <p>{c.body.slice(0, c.body.indexOf(".") + 1)}</p>
              <div className="card-bottom">
                <span>
                  {scores[c.id] !== undefined
                    ? `Completado · ${scores[c.id]}/3 aciertos`
                    : "Lectura + mini quiz"}
                </span>
                <Icon name={scores[c.id] !== undefined ? "checks" : "arrow"} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <DemoNotice />
    </>
  );
}
export function CultureDetail() {
  const { id } = useParams();
  const item = cultures.find((c) => c.id === id);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [scores, setScores] = useLocalStorage<Record<string, number>>(
    "inclutec-scores",
    {},
  );
  if (!item)
    return (
      <>
        <PageHeading
          eyebrow="EXPERIENCIA NO ENCONTRADA"
          title="Sigamos explorando."
          description="Esta experiencia no está disponible."
        />
        <Link to="/cultura" className="button">
          Ver experiencias
        </Link>
      </>
    );
  return (
    <>
      <Link className="back-link" to="/cultura">
        ← Todas las experiencias
      </Link>
      <PageHeading
        eyebrow={item.subtitle}
        title={item.title}
        description="Lee con calma. Reflexiona y pon a prueba lo que descubriste."
      />
      <div className="detail-layout">
        <article className="panel reading">
          <IconTile name={item.icon as IconName} color={item.color} />
          <h2>Una historia para compartir</h2>
          <p>{item.body}</p>
          <div className={`fact-box ${item.color}`}>
            <Icon name="idea" />
            <p>{item.fact}</p>
          </div>
          <h3>Llévalo a tu aula</h3>
          <p>
            ¿Qué experiencia de tu familia o comunidad se relaciona con este
            tema? Compártela en el muro, si te sientes cómodo.
          </p>
          <Link to="/participacion" className="text-link">
            Compartir una idea <Icon name="next" size={17} />
          </Link>
        </article>
        <form
          className="panel quiz"
          onSubmit={(e) => {
            e.preventDefault();
            const score = item.questions.filter(
              (q, i) => answers[i] === q.answer,
            ).length;
            setResult(score);
            setScores({ ...scores, [item.id]: score });
          }}
        >
          <span className="eyebrow">TU PEQUEÑO RETO</span>
          <h2>¿Qué descubriste?</h2>
          <p className="muted">3 preguntas · Sin presión, a tu ritmo.</p>
          {item.questions.map((q, i) => (
            <fieldset key={q.text}>
              <legend>
                {i + 1}. {q.text}
              </legend>
              {q.options.map((option, j) => (
                <label
                  key={option}
                  className={`radio-option ${result !== null && j === q.answer ? "correct" : ""}`}
                >
                  <input
                    type="radio"
                    name={`question-${i}`}
                    checked={answers[i] === j}
                    required
                    disabled={result !== null}
                    onChange={() => setAnswers({ ...answers, [i]: j })}
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          ))}
          {result === null ? (
            <button className="button" type="submit">
              Comprobar respuestas <Icon name="check" />
            </button>
          ) : (
            <div role="status" className="result-box">
              <strong>{result} de 3 respuestas correctas</strong>
              <p>
                {result === 3
                  ? "¡Muy bien! Cada aprendizaje abre una nueva mirada."
                  : "Sigue explorando. Las respuestas correctas están marcadas para ayudarte a aprender."}
              </p>
              <button
                type="button"
                className="button secondary"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                }}
              >
                Volver a intentar
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
