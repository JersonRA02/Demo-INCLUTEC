import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { surveyItems, sampleResponses } from "../data/content";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DemoNotice, PageHeading } from "../components/Shared";
import { Icon } from "../components/Icon";
const labels = [
  "Culturas",
  "Lenguas",
  "Pertenencia",
  "Participación",
  "Ritmos",
  "Recursos",
  "Diálogo",
  "Inclusión",
];
export function Impact() {
  const [responses, setResponses] = useLocalStorage<number[][]>(
    "inclutec-responses",
    sampleResponses,
  );
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [status, setStatus] = useState("");
  const [resetting, setResetting] = useState(false);
  const data = labels.map((name, i) => ({
    name,
    promedio: Number(
      (
        responses.reduce((s, r) => s + r[i], 0) / Math.max(responses.length, 1)
      ).toFixed(2),
    ),
  }));
  const average = (data.reduce((s, d) => s + d.promedio, 0) / 8).toFixed(1);
  return (
    <>
      <PageHeading
        eyebrow="04 / EVALUACIÓN DE IMPACTO"
        title="Crecer también es escucharnos."
        description="Reflexionemos sobre la diversidad y la convivencia en nuestra comunidad."
        action={
          <button
            className="button secondary"
            onClick={() => setResetting(true)}
          >
            <Icon name="reset" size={17} /> Reiniciar datos de demo
          </button>
        }
      />
      <DemoNotice />
      {resetting && (
        <section
          className="panel reset-confirm"
          aria-label="Confirmación para reiniciar"
        >
          <h2>¿Reiniciar los resultados de la encuesta?</h2>
          <p>
            Se eliminarán las respuestas añadidas en este navegador y se
            restaurarán las 6 respuestas de ejemplo. El muro y las notas se
            conservarán.
          </p>
          <button
            className="button"
            onClick={() => {
              setResponses(sampleResponses);
              setAnswers({});
              setResetting(false);
              setStatus("Se restauraron los resultados de ejemplo.");
            }}
          >
            Sí, reiniciar encuesta
          </button>{" "}
          <button
            className="button secondary"
            onClick={() => setResetting(false)}
          >
            Cancelar
          </button>
        </section>
      )}
      <div className="impact-stats">
        <div className="panel">
          <span>Respuestas en la demo</span>
          <strong>{responses.length}</strong>
          <small>Incluye 6 respuestas de ejemplo</small>
        </div>
        <div className="panel">
          <span>Valoración promedio</span>
          <strong>
            {average}
            <small> / 5</small>
          </strong>
          <small>Resumen descriptivo de los 8 ítems</small>
        </div>
        <div className="panel">
          <span>Una mirada compartida</span>
          <strong>
            8 <small>preguntas</small>
          </strong>
          <small>Diversidad, participación y convivencia</small>
        </div>
      </div>
      <div className="chart-grid">
        <section className="panel">
          <h2>Nuestra convivencia, en perspectiva</h2>
          <p className="muted">Promedio por ítem · Escala del 1 al 5</p>
          <div
            className="chart"
            role="img"
            aria-label="Gráfico de barras con promedios; datos completos en la tabla inferior"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ left: -24, right: 8, top: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  stroke="var(--muted)"
                />
                <YAxis domain={[0, 5]} ticks={[0,1,2,3,4,5]} allowDecimals={false} stroke="var(--muted)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    color: "var(--text)",
                    borderColor: "var(--border)",
                    borderRadius: 10,
                  }}
                />
                <Bar
                  dataKey="promedio"
                  name="Promedio"
                  fill="var(--chart-color)"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel">
          <h2>Una mirada integral</h2>
          <p className="muted">Cada dimensión es una oportunidad de aprender</p>
          <div
            className="chart"
            role="img"
            aria-label="Gráfico radar de ocho ítems; datos completos en la tabla inferior"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="55%" margin={{top:28,right:36,bottom:28,left:36}}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: "var(--muted)", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  domain={[0, 5]}
                  tickCount={6}
                  tick={false} axisLine={false}
                />
                <Radar
                  name="Promedio"
                  dataKey="promedio"
                  stroke="var(--chart-color)"
                  fill="var(--chart-color)"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <details className="panel data-table">
        <summary>Ver los resultados en una tabla accesible</summary>
        <table>
          <caption>
            Promedios de la encuesta (1 = totalmente en desacuerdo; 5 =
            totalmente de acuerdo)
          </caption>
          <thead>
            <tr>
              <th scope="col">Ítem</th>
              <th scope="col">Promedio</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.name}>
                <th scope="row">{surveyItems[i]}</th>
                <td>{d.promedio.toFixed(2)} / 5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      <form
        className="panel survey"
        onSubmit={(e) => {
          e.preventDefault();
          setResponses([...responses, surveyItems.map((_, i) => answers[i])]);
          setAnswers({});
          setStatus(
            "¡Gracias! Tu respuesta se guardó y los gráficos se actualizaron.",
          );
        }}
      >
        <span className="eyebrow">TU EXPERIENCIA NOS AYUDA A MEJORAR</span>
        <h2>¿Cómo vivimos la diversidad?</h2>
        <p>
          No hay respuestas correctas o incorrectas. Elige lo que más se acerque
          a tu experiencia.
        </p>
        <div className="likert-key">
          <span>1 · Totalmente en desacuerdo</span><span>2 · En desacuerdo</span><span>3 · Neutral</span><span>4 · De acuerdo</span><span>5 · Totalmente de acuerdo</span>
        </div>
        {surveyItems.map((q, i) => (
          <fieldset className="likert-row" key={q}>
            <legend>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {q}
            </legend>
            <div className="likert-options">
              {[1, 2, 3, 4, 5].map((v) => (
                <label
                  key={v}
                  title={
                    [
                      "Totalmente en desacuerdo",
                      "En desacuerdo",
                      "Neutral",
                      "De acuerdo",
                      "Totalmente de acuerdo",
                    ][v - 1]
                  }
                >
                  <input
                    type="radio"
                    required
                    name={`likert-${i}`}
                    value={v}
                    checked={answers[i] === v}
                    onChange={() => setAnswers({ ...answers, [i]: v })}
                  />
                  <span>{v}</span>
                  <span className="sr-only">
                    {
                      [
                        "Totalmente en desacuerdo",
                        "En desacuerdo",
                        "Neutral",
                        "De acuerdo",
                        "Totalmente de acuerdo",
                      ][v - 1]
                    }
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <div className="survey-footer">
          <p className="fine-print">
            Encuesta ilustrativa, no validada. Los datos no representan
            evidencia de impacto real ni resultados de una investigación.
          </p>
          <button type="submit" className="button">
            Enviar mis respuestas <Icon name="next" size={18} />
          </button>
        </div>
      </form>
      <p role="status" className="form-status">
        {status}
      </p>
    </>
  );
}
