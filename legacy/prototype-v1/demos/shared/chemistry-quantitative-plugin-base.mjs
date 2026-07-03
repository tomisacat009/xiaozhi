function formatNumber(value, digits = 2) {
  if (Math.abs(value) < 1e-8) return "0";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function formatScientific(value) {
  return value.toExponential(2).replace("+", "");
}

export function buildMoleRelationModel({
  amount = 1,
  molarMass = 18,
  gasMolarVolume = 22.4,
  avogadroExponent = 23,
} = {}) {
  const avogadroConstant = 6 * 10 ** avogadroExponent;
  const mass = amount * molarMass;
  const gasVolume = amount * gasMolarVolume;
  const particleCount = amount * avogadroConstant;
  const particleCountText = formatScientific(particleCount);

  return {
    derived: {
      amount,
      molarMass,
      gasMolarVolume,
      mass,
      gasVolume,
      particleCount,
      particleCountText,
      relationSummary: `n 是桥梁：m = n×M；N = n×NA；V = n×Vm`,
      equation: `n = ${formatNumber(amount)} mol；m = ${formatNumber(mass)} g；V = ${formatNumber(gasVolume)} L；N = ${particleCountText}`,
      studentSummary: "先把物质的量 n 放在中间，再向质量、微粒数、气体体积三个方向展开，换算就不会散。",
    },
    view: {
      viewport: { xMin: 0, xMax: 12, yMin: 0, yMax: 8 },
      showGrid: false,
      showAxes: false,
    },
    drawModel: {
      points: [
        { x: 6, y: 4, radius: 17, color: "rgba(34, 197, 94, 0.84)", label: `n=${formatNumber(amount)}` },
        { x: 2.2, y: 6.2, radius: 14, color: "rgba(59, 130, 246, 0.84)", label: `m=${formatNumber(mass)}g` },
        { x: 9.8, y: 6.2, radius: 14, color: "rgba(249, 115, 22, 0.84)", label: `N=${particleCountText}` },
        { x: 6, y: 1.8, radius: 14, color: "rgba(168, 85, 247, 0.84)", label: `V=${formatNumber(gasVolume)}L` },
      ],
      segments: [
        { from: { x: 5.2, y: 4.6 }, to: { x: 3, y: 5.8 }, color: "rgba(59,130,246,0.9)", lineWidth: 3, label: "× M" },
        { from: { x: 6.8, y: 4.6 }, to: { x: 9, y: 5.8 }, color: "rgba(249,115,22,0.9)", lineWidth: 3, label: "× NA" },
        { from: { x: 6, y: 3.2 }, to: { x: 6, y: 2.5 }, color: "rgba(168,85,247,0.9)", lineWidth: 3, label: "× Vm" },
      ],
      labels: [
        { x: 1.1, y: 7.2, text: `摩尔质量 M = ${formatNumber(molarMass)} g/mol`, color: "rgba(30,64,175,0.96)" },
        { x: 7.6, y: 7.2, text: `阿伏加德罗常数 = 6×10^${avogadroExponent}`, color: "rgba(194,65,12,0.96)" },
        { x: 3.6, y: 0.7, text: `气体摩尔体积 Vm = ${formatNumber(gasMolarVolume)} L/mol`, color: "rgba(107,33,168,0.96)" },
      ],
    },
  };
}
