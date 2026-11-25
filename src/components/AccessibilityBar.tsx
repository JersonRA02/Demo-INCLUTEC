import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Icon } from "./Icon";
export function AccessibilityBar() {
  const [prefs, setPrefs] = useLocalStorage("inclutec-accessibility", {
    size: 100,
    dark: false,
    contrast: false,
    font: false,
  });
  const [expanded, setExpanded] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-scale",
      `${prefs.size}%`,
    );
    document.documentElement.dataset.dark = String(prefs.dark);
    document.documentElement.dataset.contrast = String(prefs.contrast);
    document.documentElement.dataset.legible = String(prefs.font);
  }, [prefs]);
  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [location.pathname]);
  function listen() {
    if (!("speechSynthesis" in window)) {
      setMessage("Tu navegador no admite lectura en voz alta.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const speech = new SpeechSynthesisUtterance(
      document.querySelector("main")?.innerText || "",
    );
    const voice =
      window.speechSynthesis.getVoices().find((v) => v.lang === "es-PE") ||
      window.speechSynthesis.getVoices().find((v) => v.lang.startsWith("es"));
    speech.lang = voice?.lang || "es-ES";
    if (voice) speech.voice = voice;
    speech.onend = () => setSpeaking(false);
    speech.onerror = () => {
      setSpeaking(false);
      setMessage(
        "No se pudo iniciar la lectura. Intenta con otra voz o navegador.",
      );
    };
    window.speechSynthesis.speak(speech);
    setSpeaking(true);
  }
  return (
    <div
      className={`access-bar ${expanded ? "expanded" : ""}`}
 onKeyDown={(e) => { if(e.key === "Escape") {setExpanded(false);document.getElementById("access-toggle")?.focus();} }}
      role="region"
      aria-label="Herramientas de accesibilidad"
    >
      <button id="access-toggle" className="access-toggle" aria-expanded={expanded} aria-controls="access-panel" onClick={() => setExpanded(!expanded)}><Icon name="accessibility" />Accesibilidad</button>
      <span className="access-title">
        <Icon name="accessibility" size={19} /> Un espacio para todos
      </span>
      <div id="access-panel" className="access-controls">
        <span className="sr-only">Tamaño del texto: {prefs.size}%</span>
        <button
          aria-label="Reducir tamaño de letra"
          disabled={prefs.size <= 90}
          onClick={() =>
            setPrefs({ ...prefs, size: Math.max(90, prefs.size - 10) })
          }
        >
          A−
        </button>
        <button
          aria-label="Aumentar tamaño de letra"
          disabled={prefs.size >= 150}
          onClick={() =>
            setPrefs({ ...prefs, size: Math.min(150, prefs.size + 10) })
          }
        >
          A+
        </button>
        <span className="divider" />
        <button
          aria-label="Alto contraste"
          aria-pressed={prefs.contrast}
          onClick={() => setPrefs({ ...prefs, contrast: !prefs.contrast })}
        >
          <Icon name="contrast" size={18} />
          <span>Contraste</span>
        </button>
        <button
          aria-label="Modo oscuro"
          aria-pressed={prefs.dark}
          onClick={() => setPrefs({ ...prefs, dark: !prefs.dark })}
        >
          <Icon name={prefs.dark ? "sun" : "moon"} size={18} /><span className="mobile-control-label">Modo oscuro</span>
        </button>
        <label className="font-select">
          <span className="sr-only">Tipografía</span>
          <select
            value={prefs.font ? "legible" : "normal"}
            onChange={(e) =>
              setPrefs({ ...prefs, font: e.target.value === "legible" })
            }
          >
            <option value="normal">Tipografía normal</option>
            <option value="legible">Tipografía legible</option>
          </select>
        </label>
        <button className="listen" onClick={listen} aria-pressed={speaking}>
          <Icon name="volume" size={18} />
          {speaking ? "Detener" : "Escuchar"}
        </button>
      </div>
      <span role="status" className="sr-only">
        {message}
      </span>
    </div>
  );
}
