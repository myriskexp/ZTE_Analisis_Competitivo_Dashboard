import { useState } from "react";

const COLORS = {
  bg: "#0a0e17",
  surface: "#111827",
  surfaceAlt: "#1a2235",
  border: "#1e2d44",
  borderLight: "#2a3a54",
  accent: "#00d4aa",
  accentDim: "#00d4aa33",
  accentWarm: "#f59e0b",
  danger: "#ef4444",
  text: "#e2e8f0",
  textDim: "#8899b0",
  textMuted: "#4a5e78",
  white: "#ffffff",
  zte: "#0077cc",
  samsung: "#1428a0",
  apple: "#a2aaad",
  xiaomi: "#ff6900",
  motorola: "#5c2d91",
  tecno: "#00a0e3",
  oppo: "#1a8f3c",
};

const globalData = [
  { brand: "Apple", share2025: 20, share2024: 18, yoy: "+10%", color: COLORS.apple },
  { brand: "Samsung", share2025: 19, share2024: 18, yoy: "+5%", color: COLORS.samsung },
  { brand: "Xiaomi", share2025: 13, share2024: 13, yoy: "+1%", color: COLORS.xiaomi },
  { brand: "Vivo", share2025: 8, share2024: 8, yoy: "0%", color: "#3b82f6" },
  { brand: "OPPO", share2025: 8, share2024: 9, yoy: "-4%", color: COLORS.oppo },
  { brand: "Transsion", share2025: 9, share2024: 8, yoy: "+15%", color: "#8b5cf6" },
  { brand: "Honor", share2025: 5, share2024: 4, yoy: "+20%", color: "#ec4899" },
  { brand: "ZTE/nubia", share2025: 2, share2024: 1.5, yoy: "+60%*", color: COLORS.zte },
];

const colombiaData = [
  { brand: "Samsung", share: 22, trend: "down", segment: "Todo rango", price: "$100-$1,200+", color: COLORS.samsung },
  { brand: "Motorola", share: 16, trend: "up", segment: "Mid-range", price: "$150-$400", color: COLORS.motorola },
  { brand: "Xiaomi", share: 14, trend: "stable", segment: "Value", price: "$100-$500", color: COLORS.xiaomi },
  { brand: "Apple", share: 12, trend: "up", segment: "Premium", price: "$600-$1,500+", color: COLORS.apple },
  { brand: "TECNO", share: 10, trend: "up", segment: "Entry", price: "$80-$150", color: COLORS.tecno },
  { brand: "OPPO", share: 5, trend: "up", segment: "Mid", price: "$150-$350", color: COLORS.oppo },
  { brand: "Huawei", share: 5, trend: "down", segment: "Mid-Premium", price: "$200-$800", color: "#c62828" },
  { brand: "ZTE", share: 0.5, trend: "new", segment: "â€”", price: "â€”", color: COLORS.zte },
];

const competitors = [
  { brand: "Samsung", model: "Ecosistema integrado", pricing: "$100-$1,800", segment: "Todo rango", advantage: "Portafolio mÃ¡s amplio, Galaxy ecosystem, DistribuciÃ³n #1 en LATAM", weakness: "Pierde share entry-level, fatiga de marca gama baja" },
  { brand: "Apple", model: "Walled garden + Servicios", pricing: "$600-$1,500+", segment: "Premium", advantage: "Lealtad extrema, ecosistema cerrado, valor reventa", weakness: "Solo premium, depende de financiamiento" },
  { brand: "Xiaomi", model: "Cost leadership + IoT", pricing: "$100-$700", segment: "Value / Mid", advantage: "Mejor spec/precio, ecosistema IoT, comunidad activa", weakness: "PercepciÃ³n barata, servicio postventa dÃ©bil LATAM" },
  { brand: "Motorola", model: "Mid-range + Stock Android", pricing: "$150-$500", segment: "Mid-range", advantage: "Android limpio, relaciÃ³n carriers COL, marca reconocida", weakness: "Sin flagship, ban 5G importaciÃ³n, innovaciÃ³n limitada" },
  { brand: "TECNO", model: "Ultra-budget disruptor", pricing: "$80-$200", segment: "Entry-level", advantage: "Precio imbatible, canal offline fuerte", weakness: "Calidad percibida baja, sin ecosistema" },
  { brand: "ZTE/nubia", model: "Nicho: Gaming + Foto + 5G Entry", pricing: "$90-$830", segment: "Nicho / Entry", advantage: "RedMagic gaming #1, UDC camera, 5.6% patentes 5G", weakness: "Zero brand awareness COL, sin distribuciÃ³n" },
];

const moatData = [
  { brand: "Apple", ecosystem: 5, scale: 4, channel: 4, ip: 5, network: 5 },
  { brand: "Samsung", ecosystem: 3, scale: 5, channel: 5, ip: 4, network: 3 },
  { brand: "Xiaomi", ecosystem: 2, scale: 4, channel: 3, ip: 2, network: 3 },
  { brand: "Motorola", ecosystem: 1, scale: 3, channel: 4, ip: 1, network: 1 },
  { brand: "TECNO", ecosystem: 0, scale: 4, channel: 4, ip: 1, network: 0 },
  { brand: "ZTE", ecosystem: 1, scale: 4, channel: 1, ip: 4, network: 1 },
];

const spaces = [
  { id: 1, title: "Gaming Phone Accesible", range: "$300-$500", product: "RedMagic Neo 3", competition: "CERO competidores", icon: "ðŸŽ®", color: "#ef4444", desc: "15M+ gamers mÃ³viles en COL. NingÃºn gaming phone disponible. RedMagic con triggers fÃ­sicos, cooling activo, 6000mAh." },
  { id: 2, title: "5G Ultra-Accesible", range: "Sub-$150", product: "Blade A75 5G", competition: "Ventana temporal", icon: "ðŸ“¡", color: "#00d4aa", desc: "Operadores necesitan 5G barato para planes. Samsung no tiene 5G <$200. TECNO solo ofrece 4G. Blade A75 5G a $139." },
  { id: 3, title: "Foldable Accesible", range: "Sub-$600", product: "nubia Flip 2", competition: "Samsung Z Flip >$800", icon: "ðŸ“±", color: "#8b5cf6", desc: "No existe foldable <$600 en Colombia. Motorola Razr baneado (5G). nubia Flip 2 a $499-$599 abre segmento nuevo." },
  { id: 4, title: "Smartphone para Creadores", range: "$400-$600", product: "nubia Z70 Ultra", competition: "Gap en mercado", icon: "ðŸ“¸", color: "#f59e0b", desc: "15M+ usuarios Instagram/TikTok. Sin smartphone para creadores en $400-$600. UDC camera sin notch, Neovision AI." },
];

const phases = [
  { phase: 1, title: "Establecimiento", months: "Meses 1-6", target: "0.5-1% cuota", actions: ["MercadoLibre como canal exclusivo", "3 SKUs: RedMagic Neo 3, Blade A75, nubia Focus 2", "Patrocinio torneos Free Fire / PUBG Mobile", "Alianza servicio postventa (red reparaciÃ³n existente)"], color: COLORS.accent },
  { phase: 2, title: "ExpansiÃ³n de Canal", months: "Meses 7-12", target: "2-3% cuota", actions: ["Negociar con Tigo (leverage infra 5G)", "15-20 corners en Alkosto/Ktronix", "Agregar nubia Flip 2 y Z70 Ultra (5 SKUs)", "Demos gaming en retail"], color: COLORS.accentWarm },
  { phase: 3, title: "Escalamiento", months: "Meses 13-18", target: "4-5% cuota", actions: ["Segundo operador (Claro o WOM)", "CampaÃ±a masiva $500-800K digital + OOH", "3 centros servicio propios (BOG, MDE, BAQ)", "Top 6 del mercado colombiano"], color: "#8b5cf6" },
];

const TrendIcon = ({ trend }) => {
  if (trend === "up") return <span style={{ color: COLORS.accent }}>â–²</span>;
  if (trend === "down") return <span style={{ color: COLORS.danger }}>â–¼</span>;
  if (trend === "new") return <span style={{ color: COLORS.accentWarm }}>â˜…</span>;
  return <span style={{ color: COLORS.textMuted }}>â€”</span>;
};

const MoatBar = ({ value, max = 5 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: max }).map((_, i) => (
      <div key={i} style={{ width: 14, height: 6, borderRadius: 2, background: i < value ? COLORS.accent : COLORS.border, transition: "all 0.3s" }} />
    ))}
  </div>
);

const Tab = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: "10px 20px", border: "none", cursor: "pointer", fontSize: 13,
    fontFamily: "'DM Sans', sans-serif", fontWeight: active ? 700 : 400,
    letterSpacing: "0.04em", textTransform: "uppercase",
    background: active ? COLORS.accent + "18" : "transparent",
    color: active ? COLORS.accent : COLORS.textDim,
    borderBottom: active ? `2px solid ${COLORS.accent}` : "2px solid transparent",
    transition: "all 0.25s",
  }}>{label}</button>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.white, margin: 0, fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: COLORS.textDim, margin: "6px 0 0", fontFamily: "'DM Sans', sans-serif" }}>{sub}</p>}
  </div>
);

const GlobalView = () => (
  <div>
    <SectionTitle sub="EnvÃ­os globales 2025: 1.25B unidades (+2% YoY). Mercado: USD $537.6B">Cuota de Mercado Global 2025</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {globalData.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 16px", background: d.brand === "ZTE/nubia" ? COLORS.zte + "15" : i % 2 === 0 ? COLORS.surface : "transparent", borderRadius: 8, border: d.brand === "ZTE/nubia" ? `1px solid ${COLORS.zte}44` : "1px solid transparent" }}>
          <div style={{ width: 100, fontSize: 13, fontWeight: 600, color: d.brand === "ZTE/nubia" ? COLORS.zte : COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>{d.brand}</div>
          <div style={{ flex: 1, position: "relative", height: 28, background: COLORS.border + "60", borderRadius: 4 }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${d.share2025 * 4.5}%`, background: `linear-gradient(90deg, ${d.color}cc, ${d.color}66)`, borderRadius: 4, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)", transitionDelay: `${i * 80}ms` }} />
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, fontWeight: 700, color: COLORS.white, fontFamily: "'DM Mono', monospace" }}>{d.share2025}%</span>
          </div>
          <div style={{ width: 55, textAlign: "right", fontSize: 12, fontWeight: 600, color: d.yoy.startsWith("+") ? COLORS.accent : d.yoy.startsWith("-") ? COLORS.danger : COLORS.textDim, fontFamily: "'DM Mono', monospace" }}>{d.yoy}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, padding: 16, background: COLORS.surfaceAlt, borderRadius: 8, borderLeft: `3px solid ${COLORS.accentWarm}` }}>
      <p style={{ margin: 0, fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
        <strong style={{ color: COLORS.accentWarm }}>Hito histÃ³rico Q4 2024:</strong> Los fabricantes chinos combinados (Xiaomi, OPPO, Vivo, Honor, Huawei, Lenovo, realme, Transsion, TCL, ZTE) alcanzaron el 56% de los envÃ­os globales â€” el mÃ¡ximo histÃ³rico jamÃ¡s registrado en un trimestre.
      </p>
    </div>
  </div>
);

const ColombiaView = () => (
  <div>
    <SectionTitle sub="3er mercado LATAM. EnvÃ­os Q1 2024: +27% YoY. Android 79% | iOS 21%">Mercado Colombia 2024-2025</SectionTitle>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px", fontFamily: "'DM Sans', sans-serif" }}>
        <thead>
          <tr>{["Marca", "Share", "Tend.", "Segmento", "Rango Precio"].map((h, i) => (
            <th key={i} style={{ padding: "10px 12px", textAlign: i === 0 ? "left" : "center", fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {colombiaData.map((d, i) => (
            <tr key={i} style={{ background: d.brand === "ZTE" ? COLORS.zte + "12" : i % 2 === 0 ? COLORS.surface : "transparent", borderRadius: 6 }}>
              <td style={{ padding: "10px 12px", fontWeight: 600, fontSize: 13, color: d.brand === "ZTE" ? COLORS.zte : COLORS.text, borderRadius: "6px 0 0 6px" }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: d.color, marginRight: 8 }} />{d.brand}
              </td>
              <td style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700, fontSize: 14, color: COLORS.white, fontFamily: "'DM Mono', monospace" }}>{d.share}%</td>
              <td style={{ padding: "10px 12px", textAlign: "center", fontSize: 16 }}><TrendIcon trend={d.trend} /></td>
              <td style={{ padding: "10px 12px", textAlign: "center", fontSize: 12, color: COLORS.textDim }}>{d.segment}</td>
              <td style={{ padding: "10px 12px", textAlign: "center", fontSize: 12, color: COLORS.textDim, fontFamily: "'DM Mono', monospace", borderRadius: "0 6px 6px 0" }}>{d.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ marginTop: 20, padding: 16, background: COLORS.surfaceAlt, borderRadius: 8, borderLeft: `3px solid ${COLORS.accent}` }}>
      <p style={{ margin: 0, fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
        <strong style={{ color: COLORS.accent }}>Insight clave:</strong> Samsung perdiÃ³ ~50% de cuota YoY pero mantiene liderazgo. La concentraciÃ³n se reduce: TECNO pasÃ³ de 0% a 10% en un trimestre, demostrando que nuevos entrantes pueden capturar share rÃ¡pidamente en Colombia.
      </p>
    </div>
  </div>
);

const CompetitorView = () => (
  <div>
    <SectionTitle sub="Modelo de negocio, pricing, ventaja diferencial y debilidades">Tabla Comparativa de Competidores</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {competitors.map((c, i) => (
        <div key={i} style={{ padding: 16, background: c.brand === "ZTE/nubia" ? COLORS.zte + "10" : COLORS.surface, borderRadius: 10, border: `1px solid ${c.brand === "ZTE/nubia" ? COLORS.zte + "44" : COLORS.border}`, fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: c.brand === "ZTE/nubia" ? COLORS.zte : COLORS.white }}>{c.brand}</span>
            <span style={{ fontSize: 11, padding: "3px 10px", background: COLORS.accentDim, color: COLORS.accent, borderRadius: 20, fontWeight: 600 }}>{c.segment}</span>
          </div>
          <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 8 }}>
            <strong style={{ color: COLORS.textDim }}>Modelo:</strong> {c.model} &nbsp;Â·&nbsp; <strong>Pricing:</strong> {c.pricing}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            <div style={{ padding: 10, background: COLORS.accent + "0a", borderRadius: 6, border: `1px solid ${COLORS.accent}22` }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>âœ¦ Ventaja</div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{c.advantage}</div>
            </div>
            <div style={{ padding: 10, background: COLORS.danger + "0a", borderRadius: 6, border: `1px solid ${COLORS.danger}22` }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.danger, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>âš  Debilidad</div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{c.weakness}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MoatView = () => (
  <div>
    <SectionTitle sub="EvaluaciÃ³n de ventajas estructurales sostenibles (5 dimensiones)">AnÃ¡lisis de MOAT Competitivo</SectionTitle>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 6px", fontFamily: "'DM Sans', sans-serif" }}>
        <thead>
          <tr>{["Marca", "Ecosistema", "Escala/Costo", "Canal", "Propiedad Intelectual", "Efectos de Red"].map((h, i) => (
            <th key={i} style={{ padding: "8px 10px", textAlign: i === 0 ? "left" : "center", fontSize: 10, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {moatData.map((d, i) => (
            <tr key={i} style={{ background: d.brand === "ZTE" ? COLORS.zte + "12" : COLORS.surface }}>
              <td style={{ padding: "12px 10px", fontWeight: 600, fontSize: 13, color: d.brand === "ZTE" ? COLORS.zte : COLORS.text, borderRadius: "8px 0 0 8px" }}>{d.brand}</td>
              {[d.ecosystem, d.scale, d.channel, d.ip, d.network].map((v, j) => (
                <td key={j} style={{ padding: "12px 10px", textAlign: "center", borderRadius: j === 4 ? "0 8px 8px 0" : undefined }}>
                  <MoatBar value={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
      <div style={{ padding: 16, background: COLORS.accent + "10", borderRadius: 10, border: `1px solid ${COLORS.accent}30`, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>âœ¦ Moat oculto de ZTE</div>
        <p style={{ margin: 0, fontSize: 12, color: COLORS.text, lineHeight: 1.6 }}>5.6% de patentes 5G globales (top 5 mundial) = ventaja en costos de licenciamiento. #2 mundial en estaciones base 5G = leverage con operadores colombianos para bundling de dispositivos.</p>
      </div>
      <div style={{ padding: 16, background: COLORS.danger + "10", borderRadius: 10, border: `1px solid ${COLORS.danger}30`, fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.danger, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>âš  Debilidad crÃ­tica</div>
        <p style={{ margin: 0, fontSize: 12, color: COLORS.text, lineHeight: 1.6 }}>Ausencia total de canal de distribuciÃ³n en Colombia: sin operadores, sin retail, sin servicio postventa. Esta es la prioridad #1 antes de que cualquier ventaja de producto se traduzca en ventas.</p>
      </div>
    </div>
  </div>
);

const SpacesView = () => (
  <div>
    <SectionTitle sub="Nichos con demanda insatisfecha donde ZTE puede ganar sin competir frontalmente">Espacios EstratÃ©gicos Desatendidos</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {spaces.map((s) => (
        <div key={s.id} style={{ padding: 18, background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.border}`, position: "relative", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ position: "absolute", top: 12, right: 14, fontSize: 32, opacity: 0.15 }}>{s.icon}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.white }}>{s.title}</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 10, padding: "3px 8px", background: s.color + "22", color: s.color, borderRadius: 4, fontWeight: 600 }}>{s.range}</span>
            <span style={{ fontSize: 10, padding: "3px 8px", background: COLORS.accent + "22", color: COLORS.accent, borderRadius: 4, fontWeight: 600 }}>{s.product}</span>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>{s.desc}</p>
          <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>Competencia actual: {s.competition}</div>
        </div>
      ))}
    </div>
  </div>
);

const StrategyView = () => (
  <div>
    <SectionTitle sub="Plan de 18 meses Â«Wedge & ExpandÂ» â€” entrada por nichos, expansiÃ³n escalonada">Estrategia de Entrada Recomendada</SectionTitle>
    <div style={{ display: "flex", flexDirection: "column", gap: 0, fontFamily: "'DM Sans', sans-serif" }}>
      {phases.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 0 }}>
          <div style={{ width: 48, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: COLORS.bg }}>{p.phase}</div>
            {i < 2 && <div style={{ width: 2, flex: 1, background: `linear-gradient(${p.color}, ${phases[i + 1].color})`, marginTop: 4 }} />}
          </div>
          <div style={{ flex: 1, padding: 16, background: COLORS.surface, borderRadius: 10, border: `1px solid ${COLORS.border}`, marginLeft: 12, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.white }}>{p.title}</span>
                <span style={{ fontSize: 12, color: COLORS.textDim, marginLeft: 10 }}>{p.months}</span>
              </div>
              <span style={{ fontSize: 11, padding: "3px 10px", background: p.color + "22", color: p.color, borderRadius: 20, fontWeight: 700 }}>{p.target}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.actions.map((a, j) => (
                <span key={j} style={{ fontSize: 11, padding: "5px 10px", background: COLORS.surfaceAlt, color: COLORS.text, borderRadius: 6, border: `1px solid ${COLORS.border}`, lineHeight: 1.4 }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 20, padding: 18, background: `linear-gradient(135deg, ${COLORS.zte}15, ${COLORS.accent}10)`, borderRadius: 12, border: `1px solid ${COLORS.zte}33`, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.zte, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Palanca de negociaciÃ³n Ãºnica</div>
      <p style={{ margin: 0, fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
        ZTE ya vende infraestructura 5G a operadores colombianos. Puede ofrecer el Blade A75 5G (el dispositivo 5G mÃ¡s barato del mundo) como complemento: <em style={{ color: COLORS.accent }}>"Ustedes usan nuestra red. Les damos el telÃ©fono de entrada a sus planes 5G."</em> NingÃºn otro fabricante de smartphones puede hacer este pitch.
      </p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
      {[
        { label: "InversiÃ³n estimada", value: "USD 2-4M", sub: "18 meses total" },
        { label: "ROI esperado", value: "4-5%", sub: "cuota mercado M18" },
        { label: "Break-even", value: "~M14", sub: "al alcanzar 15K u/mes" },
      ].map((m, i) => (
        <div key={i} style={{ padding: 16, background: COLORS.surface, borderRadius: 10, border: `1px solid ${COLORS.border}`, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ fontSize: 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{m.label}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.accent, fontFamily: "'DM Mono', monospace" }}>{m.value}</div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>{m.sub}</div>
        </div>
      ))}
    </div>
  </div>
);

const tabs = [
  { key: "global", label: "Global" },
  { key: "colombia", label: "Colombia" },
  { key: "competitors", label: "Competidores" },
  { key: "moat", label: "Moat" },
  { key: "spaces", label: "Oportunidades" },
  { key: "strategy", label: "Estrategia" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      
      <header style={{ padding: "28px 32px 20px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", color: COLORS.accent, textTransform: "uppercase", marginBottom: 6 }}>AnÃ¡lisis Competitivo</div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: COLORS.white, letterSpacing: "-0.02em" }}>
              Mercado Smartphones <span style={{ color: COLORS.accent }}>Colombia & Global</span>
            </h1>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: COLORS.textDim }}>Estrategia de entrada y crecimiento para ZTE Corporation Â· Febrero 2026</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 900, fontFamily: "'DM Mono', monospace", color: COLORS.zte }}>ZTE</div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.1em" }}>CONFIDENCIAL</div>
          </div>
        </div>
      </header>

      <nav style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, paddingLeft: 16, overflowX: "auto" }}>
        {tabs.map(t => <Tab key={t.key} label={t.label} active={activeTab === t.key} onClick={() => setActiveTab(t.key)} />)}
      </nav>

      <main style={{ padding: "24px 32px 48px", maxWidth: 960, margin: "0 auto" }}>
        {activeTab === "global" && <GlobalView />}
        {activeTab === "colombia" && <ColombiaView />}
        {activeTab === "competitors" && <CompetitorView />}
        {activeTab === "moat" && <MoatView />}
        {activeTab === "spaces" && <SpacesView />}
        {activeTab === "strategy" && <StrategyView />}
      </main>
    </div>
  );
}

