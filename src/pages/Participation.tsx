import { useState } from "react";
import { samplePosts } from "../data/content";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { DemoNotice, PageHeading } from "../components/Shared";
import { Icon } from "../components/Icon";
export function Participation() {
  const [posts, setPosts] = useLocalStorage("inclutec-posts", samplePosts);
  const [studentId] = useLocalStorage(
    "inclutec-student-id",
    crypto.randomUUID(),
  );
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const counts = posts.reduce<Record<string, { name: string; count: number }>>(
    (all, p) => {
      all[p.studentId] = {
        name: p.author,
        count: (all[p.studentId]?.count || 0) + 1,
      };
      return all;
    },
    {},
  );
  const values = Object.values(counts);
  const balanced =
    values.length > 1 &&
    Math.max(...values.map((v) => v.count)) -
      Math.min(...values.map((v) => v.count)) <=
      1;
  const mine = posts.filter((p) => p.studentId === studentId).length;
  function react(id: string, type: "likes" | "contributes") {
    setPosts(
      posts.map((p) => {
        if (p.id !== id) return p;
        const active = p.reactions.includes(type);
        return {
          ...p,
          [type]: p[type] + (active ? -1 : 1),
          reactions: active
            ? p.reactions.filter((r) => r !== type)
            : [...p.reactions, type],
        };
      }),
    );
  }
  return (
    <>
      <PageHeading
        eyebrow="02 / PARTICIPACIÓN ESTUDIANTIL"
        title="Tu voz tiene un lugar aquí."
        description="Una idea, una pregunta o una experiencia. Todo aporte puede iniciar algo bonito."
      />
      <DemoNotice />
      <div className="wall-layout">
        <div>
          <form
            className="panel composer"
            onSubmit={(e) => {
              e.preventDefault();
              if (!message.trim()) {
                setStatus("Escribe una idea antes de publicar.");
                return;
              }
              setPosts([
                {
                  id: crypto.randomUUID(),
                  studentId,
                  author: name.trim() || "Estudiante anónimo",
                  text: message.trim(),
                  likes: 0,
                  contributes: 0,
                  reactions: [],
                  date: new Date().toLocaleDateString("es-PE"),
                },
                ...posts,
              ]);
              setMessage("");
              setStatus(
                "Tu idea se publicó en este navegador. ¡Gracias por compartir!",
              );
            }}
          >
            <h2>¿Qué podemos hacer para incluir más?</h2>
            <label htmlFor="author">
              Tu nombre <span className="muted">(opcional)</span>
            </label>
            <input
              id="author"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={45}
              placeholder="Puedes participar de forma anónima"
            />
            <label htmlFor="idea">Tu idea</label>
            <textarea
              id="idea"
              required
              maxLength={600}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Creo que nuestra aula sería más inclusiva si…"
            />
            <div className="composer-footer">
              <span className="muted">
                {message.length}/600 · Comparte con respeto
              </span>
              <button className="button" type="submit">
                Publicar idea <Icon name="next" size={17} />
              </button>
            </div>
            <p className="form-status" role="status">
              {status}
            </p>
          </form>
          <div className="section-heading small-heading">
            <h2>Conversaciones que nos acercan</h2>
            <span className="badge">{posts.length} ideas</span>
          </div>
          {posts.map((p) => (
            <article className="panel post" key={p.id}>
              <div className="post-author">
                <span className="avatar">
                  {p.author === "Estudiante anónimo" ? "A" : p.author[0]}
                </span>
                <div>
                  <h3>{p.author}</h3>
                  <span>{p.date} · Comunidad INCLUTEC</span>
                </div>
              </div>
              <p>{p.text}</p>
              <div className="reactions">
                <button
                  aria-pressed={p.reactions.includes("likes")}
                  onClick={() => react(p.id, "likes")}
                >
                  <Icon name="like" size={17} /> Me gusta{" "}
                  <strong>{p.likes}</strong>
                </button>
                <button
                  aria-pressed={p.reactions.includes("contributes")}
                  onClick={() => react(p.id, "contributes")}
                >
                  <Icon name="idea" size={17} /> Aporta{" "}
                  <strong>{p.contributes}</strong>
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="wall-aside">
          <div className="panel">
            <Icon name="users" size={28} />
            <h2>Espacio para todas las voces</h2>
            <span className={`balance-badge ${balanced ? "balanced" : ""}`}>
              {balanced ? "Participación equilibrada" : "Invitemos a más voces"}
            </span>
            <p className="muted">
              Entre quienes han publicado, la diferencia{" "}
              {balanced
                ? "es de un aporte o menos."
                : "supera un aporte o falta diversidad de participantes."}
            </p>
            <div className="my-count">
              <strong>{mine}</strong>
              <span>{mine === 1 ? "aporte tuyo" : "aportes tuyos"}</span>
            </div>
            <h3>Aportes por participante</h3>
            <ul className="participant-list">
              {Object.entries(counts).map(([id, v]) => (
                <li key={id}>
                  <span>
                    {id === studentId ? "Tú (este navegador)" : v.name}
                  </span>
                  <strong>{v.count}</strong>
                </li>
              ))}
            </ul>
            <p className="fine-print">
              Indicador ilustrativo: cuenta publicaciones, no mide la calidad de
              la participación. Este navegador representa a un estudiante,
              aunque cambies el nombre.
            </p>
          </div>
          <div className="gentle-note">
            <Icon name="heart" />
            <h3>Antes de publicar…</h3>
            <p>
              Escucha con curiosidad, respeta las diferencias y evita compartir
              información personal.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
