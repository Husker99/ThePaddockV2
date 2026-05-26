import * as THREE from "three";
import "./styles.css";

const canvas = document.querySelector("#game");
const startMenu = document.querySelector("#start-menu");
const menuTitle = document.querySelector("#menu-title");
const menuPreviewCanvas = document.querySelector("#menu-preview");
const previewTitle = document.querySelector("#preview-title");
const showroomVisuals = [...document.querySelectorAll("[data-showroom-visual]")];
const trackMaps = [...document.querySelectorAll("[data-track-map]")];
const trackShowcaseCar = document.querySelector(".track-showcase-car");
const menuSteps = [...document.querySelectorAll("[data-menu-step]")];
const playGameButton = document.querySelector("#play-game");
const openTrackEditorButton = document.querySelector("#open-track-editor");
const trackEditor = document.querySelector("#track-editor");
const editorCanvas = document.querySelector("#track-editor-canvas");
const editorTrackLayer = document.querySelector("#editor-track-layer");
const editorNodeLayer = document.querySelector("#editor-node-layer");
const editorSceneryLayer = document.querySelector("#editor-scenery-layer");
const editorGhostLayer = document.querySelector("#editor-ghost-layer");
const editorToolButtons = [...document.querySelectorAll("[data-editor-tool]")];
const trackWidthSlider = document.querySelector("#track-width-slider");
const trackWidthReadout = document.querySelector("#track-width-readout");
const curveBendSlider = document.querySelector("#curve-bend-slider");
const curveBendReadout = document.querySelector("#curve-bend-readout");
const sceneryTypeSelect = document.querySelector("#scenery-type-select");
const editorUndoButton = document.querySelector("#editor-undo");
const editorExportButton = document.querySelector("#editor-export");
const editorBackButton = document.querySelector("#editor-back");
const trackJsonOutput = document.querySelector("#track-json-output");
const trackNextButton = document.querySelector("#track-next");
const startButton = document.querySelector("#start-race");
const startRaceButtons = [...document.querySelectorAll("[data-start-race], #start-race")];
const carButtons = [...document.querySelectorAll("[data-car]")];
const carCategoryButtons = [...document.querySelectorAll("[data-car-category]")];
const backButtons = [...document.querySelectorAll("[data-menu-back]")];
const trackButtons = [...document.querySelectorAll("[data-track]")];
const speedEl = document.querySelector("#speed");
const gearEl = document.querySelector("#gear");
const surfaceEl = document.querySelector("#surface");
const ersPanelEl = document.querySelector(".ers-panel");
const ersControlHintEl = document.querySelector("#ers-control-hint");
const ersFillEl = document.querySelector("#ers-fill");
const ersReadoutEl = document.querySelector("#ers-readout");
const pauseBadge = document.querySelector("#pause-badge");
const revMeterEl = document.querySelector("#rev-meter");
const revFillEl = document.querySelector("#rev-fill");
const manualGearEl = document.querySelector("#manual-gear");
const MENU_THEME_SRC = "/audio/the-paddock-theme.mp3";

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const previewRenderer = new THREE.WebGLRenderer({ canvas: menuPreviewCanvas, antialias: true, alpha: true });
previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
previewRenderer.shadowMap.enabled = true;
previewRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

const previewScene = new THREE.Scene();
const previewCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 80);
previewCamera.position.set(0, 3.1, 10.6);
previewCamera.lookAt(0, 0.62, 0);
const previewKeyLight = new THREE.SpotLight(0xfff1c8, 12, 28, 0.52, 0.58, 1.2);
previewKeyLight.position.set(-3.8, 7.4, 5.2);
previewKeyLight.castShadow = true;
previewScene.add(previewKeyLight);
const previewFillLight = new THREE.SpotLight(0x73d7ff, 5.6, 24, 0.66, 0.7, 1.5);
previewFillLight.position.set(4.4, 4.8, 4.6);
previewScene.add(previewFillLight);
const previewRimLight = new THREE.SpotLight(0xff4c45, 4.8, 24, 0.5, 0.7, 1.4);
previewRimLight.position.set(0, 5.2, -5.4);
previewScene.add(previewRimLight);
previewScene.add(new THREE.HemisphereLight(0xdbefff, 0x181411, 1.7));
const previewPlatform = new THREE.Mesh(
  new THREE.CylinderGeometry(3.8, 4.3, 0.14, 42),
  new THREE.MeshStandardMaterial({ color: 0x15191b, roughness: 0.6, metalness: 0.18 }),
);
previewPlatform.position.y = -0.08;
previewPlatform.receiveShadow = true;
previewScene.add(previewPlatform);
let previewCar = null;
let previewCarId = "";
let menuPreviewReady = false;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa9d7f0);
scene.fog = new THREE.Fog(0xa9d7f0, 120, 330);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  700,
);

const hemiLight = new THREE.HemisphereLight(0xeef8ff, 0x6f8b4a, 2.4);
scene.add(hemiLight);

const sun = new THREE.DirectionalLight(0xfff1c8, 3.7);
sun.position.set(-60, 95, 42);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -140;
sun.shadow.camera.right = 140;
sun.shadow.camera.top = 140;
sun.shadow.camera.bottom = -140;
sun.shadow.camera.near = 10;
sun.shadow.camera.far = 220;
scene.add(sun);

const keys = new Set();
let gameStarted = false;
let isPaused = false;
let menuStep = "intro";
let selectedCar = "ferraro";
let selectedTrack = "practice";
let cameraMode = "chase";
let editorTool = "straight";
let selectedEditorNode = 0;
let editorGhostPoint = null;
const editorTrack = {
  name: "New Paddock Track",
  closed: true,
  startSegment: 0,
  nodes: [
    { x: 230, y: 470, width: 12, curve: 0 },
    { x: 360, y: 285, width: 12, curve: 0.25 },
    { x: 590, y: 240, width: 15, curve: 0.18 },
    { x: 780, y: 360, width: 13, curve: 0.38 },
    { x: 680, y: 545, width: 11, curve: 0.15 },
    { x: 410, y: 560, width: 14, curve: 0.22 },
  ],
  scenery: [
    { type: "trees", x: 170, y: 230 },
    { type: "building", x: 825, y: 175 },
    { type: "grandstand", x: 620, y: 145 },
  ],
  pitLane: [],
};
const chaseCamera = {
  dragging: false,
  lastX: 0,
  orbitYaw: 0,
  orbitPitch: 0.06,
  zoom: 1,
};
const trackShowcaseColors = ["#d91f26", "#ff7a18", "#1769dc", "#f4f1e8", "#101d4a", "#12a66a"];
if (trackShowcaseCar) {
  trackShowcaseCar.style.setProperty("--showcase-car-color", trackShowcaseColors[Math.floor(Math.random() * trackShowcaseColors.length)]);
}
window.addEventListener("keydown", (event) => {
  keys.add(event.code);
  if (event.code === "Escape" && gameStarted && !event.repeat) {
    openCarSelectionMenu();
    return;
  }
  if (event.code === "KeyP" && gameStarted && !isMenuOpen() && !event.repeat) {
    togglePause();
    return;
  }
  if (gameStarted && !isPaused) startEngineAudio();
  if (event.code === "KeyR" && !isPaused) resetCar();
  if (event.code === "Space" && gameStarted && !event.repeat) toggleCameraMode();
});
window.addEventListener("keyup", (event) => keys.delete(event.code));
canvas.addEventListener("pointerdown", (event) => {
  if (!gameStarted || cameraMode !== "chase") return;
  chaseCamera.dragging = true;
  chaseCamera.lastX = event.clientX;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointermove", (event) => {
  if (!chaseCamera.dragging) return;
  const dx = event.clientX - chaseCamera.lastX;
  chaseCamera.lastX = event.clientX;
  chaseCamera.orbitYaw += dx * 0.006;
});
canvas.addEventListener("pointerup", (event) => {
  chaseCamera.dragging = false;
  if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
});
canvas.addEventListener("wheel", (event) => {
  if (!gameStarted || cameraMode !== "chase") return;
  event.preventDefault();
  chaseCamera.zoom = THREE.MathUtils.clamp(chaseCamera.zoom + event.deltaY * 0.0014, 0.82, 1.5);
}, { passive: false });
canvas.addEventListener("mousedown", (event) => {
  if (!gameStarted || isPaused || isMenuOpen() || getCarProfile().transmission !== "manual") return;
  if (event.button === 0) shiftManualGear(1);
  if (event.button === 2) shiftManualGear(-1);
});
canvas.addEventListener("contextmenu", (event) => {
  if (gameStarted && getCarProfile().transmission === "manual") event.preventDefault();
});
startMenu.addEventListener("pointerdown", startMenuMusic);
playGameButton.addEventListener("click", () => setMenuStep("track"));
openTrackEditorButton.addEventListener("click", openTrackEditor);
editorBackButton.addEventListener("click", closeTrackEditor);
editorUndoButton.addEventListener("click", undoEditorAction);
editorExportButton.addEventListener("click", exportEditorTrack);
trackWidthSlider.addEventListener("input", updateSelectedTrackWidth);
curveBendSlider.addEventListener("input", updateSelectedCurveBend);
for (const button of editorToolButtons) {
  button.addEventListener("click", () => setEditorTool(button.dataset.editorTool));
}
editorCanvas.addEventListener("pointerdown", handleEditorPointerDown);
editorCanvas.addEventListener("pointermove", handleEditorPointerMove);
editorCanvas.addEventListener("pointerleave", () => {
  editorGhostPoint = null;
  sceneryTypeSelect.closest(".editor-select")?.classList.toggle("is-hidden", editorTool !== "scenery");
  renderTrackEditor();
});
trackNextButton.addEventListener("click", () => setMenuStep("car-category"));
startButton.addEventListener("pointerenter", startMenuMusic);
for (const button of startRaceButtons) {
  button.addEventListener("pointerenter", startMenuMusic);
  button.addEventListener("click", startGame);
}
for (const button of carButtons) {
  button.addEventListener("click", () => selectCar(button.dataset.car));
}
for (const button of carCategoryButtons) {
  button.addEventListener("click", () => selectCarCategory(button.dataset.carCategory));
}
for (const button of backButtons) {
  button.addEventListener("click", () => setMenuStep(button.dataset.menuBack));
}
for (const button of trackButtons) {
  button.addEventListener("click", () => selectTrack(button.dataset.track));
}
setMenuStep("intro");

const carPaintSchemes = {
  ferraro: {
    primary: 0xd91f26,
    secondary: 0x151515,
    stripe: 0xffffff,
    accent: 0xffd21f,
    sideStripeXs: [],
  },
  mersedeez: {
    primary: 0x111315,
    secondary: 0xc7ccd0,
    stripe: 0x22d7c5,
    accent: 0x78fff0,
    rearWing: 0x22d7c5,
    sideStripeXs: [-0.32, 0.32],
  },
  alpeen: {
    primary: 0x1769dc,
    secondary: 0x08112f,
    stripe: 0xff5dbd,
    accent: 0xff8ed6,
    sideStripeXs: [-0.36, 0.36],
  },
  willems: {
    primary: 0x1b66d8,
    secondary: 0x101820,
    stripe: 0xf6f2e8,
    accent: 0xe5322d,
    sideStripeXs: [-0.34, 0.34],
  },
  mclarsen: {
    primary: 0xff7a18,
    secondary: 0x111315,
    stripe: 0x2fd6ff,
    accent: 0xf6f2e8,
    rainbowRims: true,
    sideStripeXs: [-0.42, 0.42],
  },
  "racing-bats": {
    primary: 0xf4f1e8,
    secondary: 0x143a96,
    stripe: 0xe53d45,
    accent: 0x70d8ff,
    rearWing: 0x8b1018,
    sideStripeXs: [-0.36, 0.36],
  },
  "raging-bowl": {
    primary: 0x101d4a,
    secondary: 0x172a67,
    stripe: 0xffcf4a,
    accent: 0xe73138,
    rearWing: 0x8b1018,
    sideStripeXs: [-0.32, 0.32],
  },
};

const stockPaintSchemes = {
  "orange-stock": {
    primary: 0xff7a1f,
    secondary: 0xd85616,
    stripe: 0x0b3f88,
    glass: 0x78c8ee,
  },
  "thunder-stock": {
    primary: 0x242833,
    secondary: 0x12151d,
    stripe: 0xffcf4a,
    glass: 0x9fd7ff,
  },
  "jade-stock": {
    primary: 0x12a66a,
    secondary: 0x08704c,
    stripe: 0xf6f2e8,
    glass: 0x85e2da,
  },
  "grape-stock": {
    primary: 0x6421a8,
    secondary: 0x32104f,
    stripe: 0xff8a3d,
    glass: 0xb4d6ff,
  },
};

const lmpPaintSchemes = {
  lmp: {
    primary: 0xf7f5ed,
    secondary: 0xd92532,
    stripe: 0x1b4f9c,
    glass: 0x67c5e8,
  },
  "scarlet-lmp": {
    primary: 0xc71324,
    secondary: 0xf5f0df,
    stripe: 0x17191c,
    glass: 0x78d6ef,
  },
  "ocean-lmp": {
    primary: 0x0d63b8,
    secondary: 0x062a48,
    stripe: 0x9ff4ff,
    glass: 0x8ee8ff,
  },
  "volt-lmp": {
    primary: 0x16191d,
    secondary: 0xe6ff3f,
    stripe: 0xf3f3f0,
    glass: 0xa3f2ff,
  },
};

const jeepPaintSchemes = {
  "dune-jeep": {
    primary: 0xc4a26f,
    secondary: 0x7d6a42,
    stripe: 0xebe0bf,
    accent: 0x8f8055,
    glass: 0x86c7d6,
    camo: true,
  },
  "forest-jeep": {
    primary: 0x2d6f43,
    secondary: 0x17351f,
    stripe: 0xc7b16c,
    accent: 0x8aa36f,
    glass: 0x8acfe0,
    camo: false,
  },
  "rescue-jeep": {
    primary: 0xd93a2f,
    secondary: 0x7c1c1a,
    stripe: 0xf6f2e8,
    accent: 0xffcf4a,
    glass: 0x98d9ea,
    camo: false,
  },
  "storm-jeep": {
    primary: 0x2464a8,
    secondary: 0x14233c,
    stripe: 0xf0f4f7,
    accent: 0x6f92b8,
    glass: 0xa5dcef,
    camo: false,
  },
};

const carProfiles = {
  ferraro: {
    kind: "formula",
    hasErs: true,
    maxForwardSpeed: 67.1,
    engineForce: 27.5,
    brakeForce: 30,
    brakingTurnScale: 0.72,
    baseGrip: 11.2,
    grassGrip: 2.35,
    grassAccelerationScale: 0.34,
    grassTopSpeedScale: 0.5,
    grassOverspeedBleed: 6.2,
    maxSteerLowSpeed: 0.43,
    maxSteerHighSpeed: 0.073,
    wheelbase: 3.25,
    downforce: 0.0017,
    yawResponse: 3.4,
    yawDamping: 4.4,
    slipLimitLowSpeed: 22,
    slipLimitHighSpeed: 34,
    cockpitPosition: { forward: 0.58, height: 1.54 },
    cockpitTarget: { forward: 18, height: 1.68, steerLook: 1.1 },
  },
  mersedeez: null,
  alpeen: null,
  "orange-stock": {
    kind: "stock",
    hasErs: false,
    maxForwardSpeed: 61,
    engineForce: 19.2,
    brakeForce: 25.2,
    brakingTurnScale: 0.9,
    baseGrip: 7.8,
    grassGrip: 4.25,
    grassAccelerationScale: 0.52,
    grassTopSpeedScale: 0.62,
    grassOverspeedBleed: 4.1,
    maxSteerLowSpeed: 0.37,
    maxSteerHighSpeed: 0.06,
    wheelbase: 3.65,
    downforce: 0.00075,
    yawResponse: 2.45,
    yawDamping: 3.25,
    slipLimitLowSpeed: 15,
    slipLimitHighSpeed: 24,
    cockpitPosition: { forward: 1.15, height: 1.44 },
    cockpitTarget: { forward: 19, height: 1.46, steerLook: 0.55 },
  },
  lmp: {
    kind: "lmp",
    hasErs: false,
    maxForwardSpeed: 89.4,
    engineForce: 27.2,
    brakeForce: 34,
    brakingTurnScale: 0.82,
    baseGrip: 9.4,
    grassGrip: 3.25,
    grassAccelerationScale: 0.42,
    grassTopSpeedScale: 0.55,
    grassOverspeedBleed: 5.2,
    maxSteerLowSpeed: 0.355,
    maxSteerHighSpeed: 0.055,
    wheelbase: 3.85,
    downforce: 0.00125,
    yawResponse: 2.7,
    yawDamping: 3.9,
    slipLimitLowSpeed: 19,
    slipLimitHighSpeed: 29,
    cockpitPosition: { forward: 0.85, height: 1.08 },
    cockpitTarget: { forward: 22, height: 1.22, steerLook: 0.65 },
  },
  "dune-jeep": {
    kind: "jeep",
    hasErs: false,
    transmission: "manual",
    maxForwardSpeed: 31.3,
    engineForce: 12.4,
    brakeForce: 13,
    brakingTurnScale: 0.86,
    baseGrip: 3.75,
    grassGrip: 3.65,
    grassAccelerationScale: 0.82,
    grassTopSpeedScale: 0.82,
    grassOverspeedBleed: 2.2,
    maxSteerLowSpeed: 0.305,
    maxSteerHighSpeed: 0.029,
    wheelbase: 3.1,
    downforce: 0.00008,
    yawResponse: 0.98,
    yawDamping: 1.7,
    slipLimitLowSpeed: 6.8,
    slipLimitHighSpeed: 8.1,
    cockpitPosition: { forward: 1.05, height: 1.72 },
    cockpitTarget: { forward: 15, height: 1.78, steerLook: 0.45 },
  },
};
carPaintSchemes.red = carPaintSchemes.ferraro;
carPaintSchemes.blue = carPaintSchemes.mersedeez;
carProfiles.mersedeez = carProfiles.ferraro;
carProfiles.alpeen = carProfiles.ferraro;
carProfiles.red = carProfiles.ferraro;
carProfiles.blue = carProfiles.ferraro;
for (const stockId of ["thunder-stock", "jade-stock", "grape-stock"]) {
  carProfiles[stockId] = carProfiles["orange-stock"];
}
for (const lmpId of ["scarlet-lmp", "ocean-lmp", "volt-lmp"]) {
  carProfiles[lmpId] = carProfiles.lmp;
}
for (const jeepId of ["forest-jeep", "rescue-jeep", "storm-jeep"]) {
  carProfiles[jeepId] = carProfiles["dune-jeep"];
}

const trackDefinitions = {
  practice: {
    points: [
      [455, 672],
      [700, 660],
      [930, 660],
      [1002, 634],
      [1002, 536],
      [1040, 505],
      [1190, 505],
      [1326, 456],
      [1378, 315],
      [1344, 230],
      [1222, 213],
      [1032, 256],
      [820, 342],
      [640, 408],
      [385, 450],
      [210, 505],
      [155, 556],
      [170, 640],
      [365, 672],
    ],
    start: [433, 675],
    next: [535, 670],
    tension: 0.34,
    extras: addPracticeTrackExtension,
  },
  generated: {
    points: [
      [55, 804],
      [420, 804],
      [835, 804],
      [1265, 804],
      [1510, 754],
      [1590, 628],
      [1488, 526],
      [1322, 506],
      [1476, 406],
      [1582, 284],
      [1494, 136],
      [1270, 82],
      [1016, 132],
      [850, 236],
      [674, 172],
      [500, 230],
      [444, 356],
      [548, 464],
      [412, 562],
      [202, 590],
      [72, 688],
    ],
    start: [150, 804],
    next: [420, 804],
    tension: 0.18,
    scale: 0.195,
    halfWidth: 9.4,
    kerbWidth: 1.55,
    detailSamples: 900,
    grassSize: [650, 430],
    cornerOnlyKerbs: true,
    extras: addGeneratedLayoutDetails,
  },  "race-1": {
    points: [
      [342.5, 781.5],
      [760, 781.5],
      [1246.4, 781.5],
      [1351.7, 760.7],
      [1432.3, 711.2],
      [1485.0, 632.7],
      [1510.0, 535.9],
      [1498.7, 456.8],
      [1465.7, 412.0],
      [1411.1, 401.7],
      [1334.9, 425.7],
      [1293.9, 470.9],
      [1274.5, 556.3],
      [1219.7, 650.4],
      [1088.4, 592.6],
      [1061.8, 530.3],
      [1104.5, 425.7],
      [1227.8, 326.5],
      [1402.6, 211.6],
      [1426.2, 102.2],
      [1362.0, 85.0],
      [1212.6, 91.1],
      [1006.5, 149.8],
      [753.0, 260.9],
      [452.2, 424.5],
      [342.6, 472.3],
      [219.5, 494.7],
      [139.0, 542.5],
      [114.7, 664.0],
      [176.4, 756.8],
    ],
    start: [342.5, 781.5],
    next: [760, 781.5],
    tension: 0.28,
    extras: null,
  },
};

let track = createTrack(selectedTrack);
scene.add(track.group);

let car = createSelectedCar(selectedCar);
scene.add(car.root);

const carState = {
  position: new THREE.Vector3(track.start.x, track.groundY, track.start.z),
  velocity: new THREE.Vector3(),
  heading: track.start.heading,
  yawRate: 0,
  steer: 0,
  wheelSpin: 0,
  visualRoll: 0,
  grassBump: 0,
  grassRockRoll: 0,
  grassRockPitch: 0,
  gear: 0,
  rpm: 2400,
  ers: 100,
};
menuPreviewReady = true;

const tuning = {
  maxReverseSpeed: 8,
  brakeForce: 38,
  reverseForce: 16,
  drag: 0.0026,
  coastDrag: 0.006,
  rollingResistance: 0.9,
  coastRollingResistance: 3.1,
  kerbGrip: 7.1,
  steeringSharpness: 5.9,
  handbrakeGrip: 0.42,
  carCollisionRadius: 1.18,
};

const gearRatios = [0, 2.65, 2.02, 1.56, 1.24, 1.0];
const jeepGearTorque = [0, 1, 0.78, 0.64, 0.58, 0.78];

const audioState = {
  context: null,
  engine: null,
  sub: null,
  grumble: null,
  ers: null,
  engineGain: null,
  subGain: null,
  grumbleGain: null,
  ersGain: null,
  filter: null,
  lowShelf: null,
  shiftGain: null,
  brake: null,
  brakeGain: null,
  element: null,
  ersElement: null,
  brakeElement: null,
  lastGear: 0,
  shiftTimer: 0,
};

const menuAudio = {
  element: null,
};
startMenuMusic();

const clock = new THREE.Clock();
let cameraTarget = new THREE.Vector3();
let cameraPosition = new THREE.Vector3();
const scratchForward = new THREE.Vector3();
const scratchRight = new THREE.Vector3();
const dirtGroup = new THREE.Group();
const dirtParticles = [];
scene.add(dirtGroup);
initDirtParticles();

resetCar();
renderer.setAnimationLoop(update);

function update() {
  const dt = Math.min(clock.getDelta(), 1 / 30);
  if (gameStarted && !isPaused && !isMenuOpen()) updateCar(dt);
  if (!gameStarted || isPaused || isMenuOpen()) updateRevMeter();
  if (isMenuOpen()) updateMenuPreview(dt);
  updateCamera(dt);
  renderer.render(scene, camera);
}

function updateCar(dt) {
  const profile = getCarProfile();
  const throttle = pressed("KeyW", "ArrowUp") ? 1 : 0;
  const brake = pressed("KeyS", "ArrowDown") ? 1 : 0;
  const ersPressed = pressed("ShiftLeft", "ShiftRight");
  const steerInput = (pressed("KeyA", "ArrowLeft") ? 1 : 0) - (pressed("KeyD", "ArrowRight") ? 1 : 0);
  const handbrake = pressed("KeyC") ? 1 : 0;
  const surface = track.sample(carState.position.x, carState.position.z);
  const wheelSurface = getWheelSurfaceState();

  scratchForward.set(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  scratchRight.set(scratchForward.z, 0, -scratchForward.x);

  let forwardSpeed = carState.velocity.dot(scratchForward);
  let lateralSpeed = carState.velocity.dot(scratchRight);
  const speedAbs = carState.velocity.length();
  const topSpeedRatio = THREE.MathUtils.clamp(speedAbs / profile.maxForwardSpeed, 0, 1);
  const boostActive = profile.hasErs && throttle && ersPressed && carState.ers > 0;
  const surfaceAccelerationScale =
    surface.kind === "grass" ? profile.grassAccelerationScale : surface.kind === "kerb" ? 0.88 : 1;
  const surfaceTopSpeedScale =
    surface.kind === "grass" ? profile.grassTopSpeedScale : surface.kind === "kerb" ? 0.92 : 1;
  const maxForwardSpeed = profile.maxForwardSpeed * surfaceTopSpeedScale * (boostActive ? 1.18 : 1);
  updateErs(dt, ersPressed, brake, profile);
  const maxSteer = THREE.MathUtils.lerp(
    profile.maxSteerLowSpeed,
    profile.maxSteerHighSpeed,
    THREE.MathUtils.smoothstep(speedAbs, 6, 42),
  ) * (brake && forwardSpeed > 2 ? profile.brakingTurnScale : 1) * (throttle ? 0.82 : 1);

  carState.steer = THREE.MathUtils.damp(
    carState.steer,
    speedAbs < 0.7 ? 0 : steerInput * maxSteer,
    tuning.steeringSharpness,
    dt,
  );

  const surfaceGrip =
    surface.kind === "grass"
      ? profile.grassGrip
      : surface.kind === "kerb"
        ? tuning.kerbGrip
        : profile.baseGrip;
  const downforceGrip = 1 + speedAbs * speedAbs * profile.downforce;
  const coasting = throttle === 0 && brake === 0 ? 1 : 0;
  const coastRotationBoost = 1 + coasting * THREE.MathUtils.lerp(0.08, 0.02, topSpeedRatio);
  const grip = surfaceGrip * downforceGrip * coastRotationBoost * (handbrake ? tuning.handbrakeGrip : 1);

  if (throttle && forwardSpeed > -2) {
    const powerFade = 1 - THREE.MathUtils.clamp(forwardSpeed / maxForwardSpeed, 0, 1);
    const steeringLoad = Math.abs(carState.steer) / Math.max(maxSteer, 0.001);
    const cornerAccelPenalty = 1 - 0.28 * steeringLoad * THREE.MathUtils.smoothstep(speedAbs, 2, 42);
    const gearPowerScale = getManualPowerScale(forwardSpeed, profile);
    forwardSpeed +=
      profile.engineForce *
      surfaceAccelerationScale *
      (boostActive ? 1.18 : 1) *
      cornerAccelPenalty *
      gearPowerScale *
      (0.42 + powerFade * 0.58) *
      dt;

    const throttleOversteer = (profile.kind === "lmp" ? 1 : profile.kind === "jeep" ? 0.35 : 0) *
      steeringLoad *
      throttle *
      THREE.MathUtils.smoothstep(speedAbs, 8, 36) *
      (surface.kind === "grass" ? 1.35 : 1);
    if (throttleOversteer > 0) {
      lateralSpeed += -Math.sign(carState.steer || steerInput || 1) * throttleOversteer * dt * 5.2;
      carState.yawRate += carState.steer * throttleOversteer * dt * 2.1;
    }
  }

  if (brake) {
    if (forwardSpeed > 1.2) {
      const brakeScale = wheelSurface.brakeScale;
      forwardSpeed -= profile.brakeForce * brakeScale * dt;
      const splitBrakePull = wheelSurface.leftBrakeScale - wheelSurface.rightBrakeScale;
      carState.yawRate += splitBrakePull * brake * THREE.MathUtils.smoothstep(speedAbs, 5, 35) * dt * 1.15;
    } else {
      forwardSpeed -= tuning.reverseForce * dt;
    }
  }

  const activeDrag = tuning.drag + coasting * tuning.coastDrag;
  const activeRollingResistance =
    tuning.rollingResistance +
    coasting * tuning.coastRollingResistance;
  forwardSpeed -= forwardSpeed * Math.abs(forwardSpeed) * activeDrag * dt;
  forwardSpeed = moveToward(forwardSpeed, 0, activeRollingResistance * dt);
  if (surface.kind === "grass" && forwardSpeed > maxForwardSpeed) {
    forwardSpeed = moveToward(forwardSpeed, maxForwardSpeed, profile.grassOverspeedBleed * dt);
  } else {
    forwardSpeed = THREE.MathUtils.clamp(
      forwardSpeed,
      -tuning.maxReverseSpeed,
      maxForwardSpeed,
    );
  }

  lateralSpeed = THREE.MathUtils.damp(lateralSpeed, 0, grip, dt);

  const cornerDemand = Math.abs(forwardSpeed * Math.tan(carState.steer) / profile.wheelbase);
  const slipLimit = THREE.MathUtils.lerp(
    profile.slipLimitLowSpeed,
    profile.slipLimitHighSpeed,
    topSpeedRatio,
  ) *
    coastRotationBoost *
    (surface.kind === "grass" ? 0.32 : surface.kind === "kerb" ? 0.66 : 1);
  const tireAuthority = THREE.MathUtils.clamp(slipLimit / Math.max(cornerDemand, 0.001), 0.22, 1);
  const lowSpeedAssist = speedAbs < 0.7 ? 0 : THREE.MathUtils.clamp(1 - Math.abs(forwardSpeed) / 7, 0, 1);
  const assistedSpeed =
    speedAbs < 0.7
      ? 0
      : forwardSpeed + Math.sign(forwardSpeed || throttle || 1) * lowSpeedAssist * 7.5;
  const targetYawRate =
    (assistedSpeed / profile.wheelbase) *
    Math.tan(carState.steer) *
    tireAuthority *
    0.94;

  carState.yawRate = THREE.MathUtils.damp(
    carState.yawRate,
    targetYawRate,
    profile.yawResponse * tireAuthority,
    dt,
  );
  carState.yawRate = THREE.MathUtils.damp(carState.yawRate, 0, profile.yawDamping * (1 - tireAuthority), dt);
  carState.heading += carState.yawRate * dt;

  scratchForward.set(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  scratchRight.set(scratchForward.z, 0, -scratchForward.x);
  carState.velocity
    .copy(scratchForward)
    .multiplyScalar(forwardSpeed)
    .addScaledVector(scratchRight, lateralSpeed);
  carState.position.addScaledVector(carState.velocity, dt);
  const grassBumpIntensity = wheelSurface.grassRatio * THREE.MathUtils.clamp(speedAbs / 24, 0, 1) * 0.8;
  const grassBumpStrength = profile.kind === "formula" ? 0.105 : profile.kind === "lmp" ? 0.075 : profile.kind === "stock" ? 0.052 : 0.09;
  const grassBump = grassBumpIntensity * grassBumpStrength * (
    Math.sin(clock.elapsedTime * 18 + forwardSpeed * 0.55) + Math.sin(clock.elapsedTime * 29) * 0.42
  );
  carState.position.y = (surface.kind === "kerb" ? track.kerbY : track.groundY) + grassBump;

  car.root.position.copy(carState.position);
  car.root.rotation.set(0, carState.heading, 0);

  const rollStrength = profile.kind === "jeep" ? 0.42 : 0.1;
  const rollTarget = -carState.steer * THREE.MathUtils.clamp(speedAbs / (profile.kind === "jeep" ? 24 : 45), 0, 1) * rollStrength;
  const grassRockScale = profile.kind === "formula" ? 1.25 : profile.kind === "lmp" ? 0.9 : profile.kind === "stock" ? 0.65 : 0.85;
  const grassRockRoll = grassBumpIntensity * grassRockScale * 0.035 * Math.sin(clock.elapsedTime * 16 + forwardSpeed * 0.3);
  const grassRockPitch = grassBumpIntensity * grassRockScale * 0.028 * Math.sin(clock.elapsedTime * 21 + forwardSpeed * 0.38);
  carState.grassBump = grassBump;
  carState.grassRockRoll = grassRockRoll;
  carState.grassRockPitch = grassRockPitch;
  carState.visualRoll = THREE.MathUtils.damp(carState.visualRoll, rollTarget, profile.kind === "jeep" ? 3.3 : 7, dt);
  car.body.rotation.z = carState.visualRoll + grassRockRoll;
  car.body.rotation.x = grassRockPitch;

  if (car.wheels.frontLeft) car.wheels.frontLeft.rotation.y = carState.steer;
  if (car.wheels.frontRight) car.wheels.frontRight.rotation.y = carState.steer;
  carState.wheelSpin -= forwardSpeed * dt * 1.35;
  for (const wheel of car.wheelMeshes) {
    wheel.rotation.x = carState.wheelSpin;
  }

  if (profile.transmission !== "manual") carState.gear = getAutoGear(forwardSpeed, profile);
  carState.rpm = getEngineRpm(forwardSpeed, throttle, carState.gear, profile);
  const hardBraking = false;
  updateEngineAudio(dt, forwardSpeed, throttle, boostActive, profile, hardBraking);
  updateRearWing(dt, boostActive);

  speedEl.textContent = `${Math.round(Math.abs(forwardSpeed) * 2.237)} mph`;
  gearEl.textContent = carState.gear === -1 ? "R" : carState.gear === 0 ? "N" : `${carState.gear}`;
  surfaceEl.textContent = surface.kind === "grass" ? "Grass" : surface.kind === "kerb" ? "Kerb" : "Track";
  updateErsHud();
  updateRevMeter(profile);
  updateDirtParticles(dt, surface, speedAbs);
}

function getWheelSurfaceState() {
  const wheelNames = ["frontLeft", "frontRight", "rearLeft", "rearRight"];
  const state = {
    grassCount: 0,
    leftGrassCount: 0,
    rightGrassCount: 0,
    grassRatio: 0,
    leftBrakeScale: 1,
    rightBrakeScale: 1,
    brakeScale: 1,
  };

  for (const wheelName of wheelNames) {
    const wheel = car.wheels[wheelName];
    if (!wheel) continue;

    const wheelPosition = new THREE.Vector3();
    wheel.getWorldPosition(wheelPosition);
    if (track.sample(wheelPosition.x, wheelPosition.z).kind !== "grass") continue;

    state.grassCount += 1;
    if (wheelName.endsWith("Left")) state.leftGrassCount += 1;
    if (wheelName.endsWith("Right")) state.rightGrassCount += 1;
  }

  state.grassRatio = state.grassCount / wheelNames.length;
  state.leftBrakeScale = 1 - 0.3 * (state.leftGrassCount / 2);
  state.rightBrakeScale = 1 - 0.3 * (state.rightGrassCount / 2);
  state.brakeScale = (state.leftBrakeScale + state.rightBrakeScale) * 0.5;
  return state;
}
function updateErs(dt, ersPressed, brake, profile) {
  if (!profile.hasErs) {
    carState.ers = 0;
    return;
  }

  if (ersPressed && carState.ers > 0) {
    carState.ers = Math.max(0, carState.ers - 20 * dt);
    return;
  }

  const rechargeRate = brake ? 4 : 2;
  carState.ers = Math.min(100, carState.ers + rechargeRate * dt);
}

function updateRearWing(dt, boostActive) {
  const targetRearAngle = boostActive ? 0 : car.rearWingStandardAngle;
  const targetFrontAngle = boostActive ? 0 : car.frontWingStandardAngle;
  if (car.rearWing) {
    car.rearWing.rotation.x = THREE.MathUtils.damp(car.rearWing.rotation.x, targetRearAngle, 7.5, dt);
  }
  if (car.frontWing) {
    car.frontWing.rotation.x = THREE.MathUtils.damp(car.frontWing.rotation.x, targetFrontAngle, 7.5, dt);
  }
}

function updateErsHud() {
  const profile = getCarProfile();
  ersPanelEl.hidden = !profile.hasErs;
  ersControlHintEl.hidden = !profile.hasErs;
  if (!profile.hasErs) return;

  const ratio = THREE.MathUtils.clamp(carState.ers / 100, 0, 1);
  ersFillEl.style.transform = `scaleX(${ratio})`;
  ersReadoutEl.textContent = `${Math.round(carState.ers)}%`;
}

function updateRevMeter(profile = getCarProfile()) {
  const manual = gameStarted && !isMenuOpen() && profile.transmission === "manual";
  revMeterEl.hidden = !manual;
  if (!manual) return;

  const ratio = THREE.MathUtils.clamp((carState.rpm - 900) / 5200, 0, 1);
  revFillEl.style.transform = `scaleX(${ratio})`;
  revFillEl.classList.toggle("is-redline", ratio > 0.84);
  manualGearEl.textContent = carState.gear;
}

function initDirtParticles() {
  const material = new THREE.MeshStandardMaterial({ color: 0x8d6840, roughness: 1, flatShading: true });
  const geometry = new THREE.SphereGeometry(0.16, 6, 4);

  for (let i = 0; i < 90; i += 1) {
    const particle = new THREE.Mesh(geometry, material);
    particle.visible = false;
    particle.userData.life = 0;
    particle.userData.velocity = new THREE.Vector3();
    dirtParticles.push(particle);
    dirtGroup.add(particle);
  }
}

function updateDirtParticles(dt, surface, speedAbs) {
  for (const particle of dirtParticles) {
    if (particle.userData.life <= 0) {
      particle.visible = false;
      continue;
    }

    particle.userData.life -= dt;
    particle.userData.velocity.y -= 4.2 * dt;
    particle.position.addScaledVector(particle.userData.velocity, dt);
    particle.scale.setScalar(Math.max(0.05, particle.userData.life * 1.5));
  }

  const dirtIntensity = THREE.MathUtils.smoothstep(speedAbs, 3.5, 18);
  if (dirtIntensity <= 0) return;

  const profile = getCarProfile();
  const wheelNames = ["frontLeft", "frontRight", "rearLeft", "rearRight"];

  for (const wheelName of wheelNames) {
    const wheel = car.wheels[wheelName];
    if (!wheel) continue;

    const wheelPosition = new THREE.Vector3();
    wheel.getWorldPosition(wheelPosition);
    if (track.sample(wheelPosition.x, wheelPosition.z).kind !== "grass") continue;

    const burstCount =
      dirtIntensity > 0.72 && (profile.kind === "stock" || wheelName.startsWith("rear")) ? 2 : 1;
    const particle = dirtParticles.find((item) => item.userData.life <= 0);
    if (!particle) return;

    for (let i = 0; i < burstCount; i += 1) {
      const nextParticle = i === 0 ? particle : dirtParticles.find((item) => item.userData.life <= 0);
      if (!nextParticle) return;

      nextParticle.position.copy(wheelPosition);
      nextParticle.position.y = 0.26;
      nextParticle.userData.life = THREE.MathUtils.randFloat(0.28, 0.62) * dirtIntensity;
      nextParticle.userData.velocity
        .copy(scratchForward)
        .multiplyScalar(THREE.MathUtils.randFloat(-4.8, -2.8) * dirtIntensity)
        .addScaledVector(scratchRight, THREE.MathUtils.randFloatSpread(1.9) * dirtIntensity)
        .add(new THREE.Vector3(0, THREE.MathUtils.randFloat(1.0, 2.8) * dirtIntensity, 0));
      nextParticle.scale.setScalar(0.12 + dirtIntensity * 0.24);
      nextParticle.visible = true;
    }
  }
}

function updateCamera(dt) {
  const profile = getCarProfile();
  scratchForward.set(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  scratchRight.set(scratchForward.z, 0, -scratchForward.x);

  if (cameraMode === "cockpit") {
    const cockpit = profile.cockpitPosition;
    const target = profile.cockpitTarget;
    const cockpitBump = carState.grassBump * 0.45;
    const cockpitRockRoll = carState.grassRockRoll * 2.4;
    const cockpitRockPitch = carState.grassRockPitch * 2.8;
    const desiredPosition = carState.position
      .clone()
      .addScaledVector(scratchForward, cockpit.forward + cockpitRockPitch)
      .addScaledVector(scratchRight, cockpitRockRoll)
      .add(new THREE.Vector3(0, cockpit.height + cockpitBump, 0));
    const desiredTarget = carState.position
      .clone()
      .addScaledVector(scratchForward, target.forward)
      .addScaledVector(scratchRight, carState.steer * target.steerLook + cockpitRockRoll * 2.1)
      .add(new THREE.Vector3(0, target.height - cockpitRockPitch * 1.4 + cockpitBump, 0));

    cameraPosition.copy(desiredPosition);
    cameraTarget.copy(desiredTarget);
    camera.position.copy(desiredPosition);
    camera.lookAt(cameraTarget);
    return;
  }

  const speed = carState.velocity.length();
  const chaseDistance = THREE.MathUtils.lerp(8.8, 9.7, THREE.MathUtils.clamp(speed / 90, 0, 1)) * chaseCamera.zoom;
  const chaseHeight = THREE.MathUtils.lerp(4.4, 4.75, THREE.MathUtils.clamp(speed / 90, 0, 1)) * THREE.MathUtils.lerp(0.85, 1.18, chaseCamera.zoom);
  const orbitAngle = carState.heading + Math.PI + chaseCamera.orbitYaw;
  const orbitDirection = new THREE.Vector3(Math.sin(orbitAngle), 0, Math.cos(orbitAngle));
  const desiredPosition = carState.position
    .clone()
    .addScaledVector(orbitDirection, chaseDistance)
    .add(new THREE.Vector3(0, chaseHeight, 0));
  const desiredTarget = carState.position
    .clone()
    .addScaledVector(scratchForward, 4.8)
    .add(new THREE.Vector3(0, 1.6, 0));

  cameraPosition.lerp(desiredPosition, 1 - Math.exp(-dt * 5.2));
  cameraTarget.lerp(desiredTarget, 1 - Math.exp(-dt * 8.0));
  camera.position.copy(cameraPosition);
  camera.lookAt(cameraTarget);
}

function toggleCameraMode() {
  if (cameraMode === "chase") {
    cameraMode = "cockpit";
    return;
  }

  cameraMode = "chase";
  resetChaseCamera();
}

function resetChaseCamera() {
  chaseCamera.orbitYaw = 0;
  chaseCamera.zoom = 1;
  chaseCamera.dragging = false;
}

function createTrack(trackId = "practice") {
  const definition = trackDefinitions[trackId] ?? trackDefinitions.practice;
  const group = new THREE.Group();
  const halfWidth = definition.halfWidth ?? 7.2;
  const kerbWidth = definition.kerbWidth ?? 1.15;
  const planScale = definition.scale ?? 0.168;
  const controlPoints = definition.points.map(([x, y]) => pointFromPlan(x, y, planScale));
  const curve = new THREE.CatmullRomCurve3(controlPoints, true, "catmullrom", definition.tension);
  const samples = curve.getSpacedPoints(definition.detailSamples ?? 640);

  const [grassWidth, grassDepth] = definition.grassSize ?? [520, 360];
  const grass = new THREE.Mesh(new THREE.PlaneGeometry(grassWidth, grassDepth, 36, 24), createGrassMaterial());
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -0.05;
  grass.receiveShadow = true;
  randomizePlane(grass.geometry, 0.18);
  group.add(grass);
  scatterGrassTufts(group, samples, halfWidth + kerbWidth);

  if (!definition.cornerOnlyKerbs) {
    const kerbGeometry = makeTrackStrip(samples, halfWidth + kerbWidth, 0.025, halfWidth);
    const kerb = new THREE.Mesh(
      kerbGeometry,
      new THREE.MeshStandardMaterial({ color: 0xf6f0d7, roughness: 0.85, flatShading: true }),
    );
    kerb.receiveShadow = true;
    group.add(kerb);
  }

  const roadGeometry = makeTrackStrip(samples, halfWidth, 0.04);
  const road = new THREE.Mesh(roadGeometry, createAsphaltMaterial());
  road.receiveShadow = true;
  group.add(road);

  const extraTrackAreas = [];
  if (definition.extras) definition.extras(group, extraTrackAreas, samples);
  addSceneryBuildings(group);
  addCloudsAndSun(group, trackId === "generated");

  const start = pointFromPlan(...definition.start, planScale);
  const next = pointFromPlan(...definition.next, planScale);
  const heading = Math.atan2(next.x - start.x, next.z - start.z);

  return {
    group,
    start: { x: start.x, z: start.z, heading },
    extraTrackAreas,
    groundY: 0.14,
    kerbY: 0.18,
    sample(x, z) {
      for (const area of extraTrackAreas) {
        if (area.kind === "curve" && isPointInExtraTrackArea(x, z, area)) return { kind: "track", distance: 0 };
      }

      let bestDistance = Infinity;

      for (let i = 0; i < samples.length; i += 1) {
        const dx = x - samples[i].x;
        const dz = z - samples[i].z;
        const distance = dx * dx + dz * dz;
        if (distance < bestDistance) {
          bestDistance = distance;
        }
      }

      const distance = Math.sqrt(bestDistance);
      if (distance <= halfWidth) return { kind: "track", distance };
      if (definition.cornerOnlyKerbs) {
        for (const area of extraTrackAreas) {
          if (area.kind === "kerb" && isPointInExtraTrackArea(x, z, area)) return { kind: "kerb", distance };
        }
        return { kind: "grass", distance };
      }
      if (distance <= halfWidth + kerbWidth) return { kind: "kerb", distance };
      return { kind: "grass", distance };
    },
  };
}

function pointFromPlan(x, y, scale = 0.168) {
  return new THREE.Vector3((x - 800) * scale, 0, (y - 450) * scale);
}

function createAsphaltMaterial() {
  const texture = makeAsphaltTexture(192);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(22, 22);
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    roughness: 0.92,
    metalness: 0.025,
    flatShading: false,
  });
}

function makeAsphaltTexture(size) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const context = textureCanvas.getContext("2d");
  context.fillStyle = "#888b84";
  context.fillRect(0, 0, size, size);

  const image = context.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const aggregate = (Math.random() - 0.5) * 44;
      const directionGrain = Math.sin(x * 0.16 + y * 0.04) * 8;
      const rubber = Math.sin(x * 0.035 + y * 0.012) * 10;
      const fleck = aggregate + directionGrain - Math.max(0, rubber);
      image.data[i] = THREE.MathUtils.clamp(136 + fleck, 72, 190);
      image.data[i + 1] = THREE.MathUtils.clamp(138 + fleck, 74, 192);
      image.data[i + 2] = THREE.MathUtils.clamp(132 + fleck, 70, 184);
      image.data[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  context.globalAlpha = 0.16;
  context.strokeStyle = "#555750";
  for (let i = 0; i < 18; i += 1) {
    const y = Math.random() * size;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(size * 0.3, y + Math.random() * 10 - 5, size * 0.65, y + Math.random() * 12 - 6, size, y + Math.random() * 10 - 5);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createGrassMaterial() {
  const texture = makeNoiseTexture(128, [84, 162, 62], 48, 0.42);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(30, 22);
  return new THREE.MeshStandardMaterial({
    color: 0x64ad48,
    map: texture,
    roughness: 1,
    flatShading: true,
  });
}

function makeNoiseTexture(size, base, spread, stripeStrength = 0) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const context = textureCanvas.getContext("2d");
  const image = context.createImageData(size, size);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const stripe = Math.sin((x + y * 0.4) * 0.24) * stripeStrength * spread;
      const fleck = (Math.random() - 0.5) * spread + stripe;
      image.data[i] = THREE.MathUtils.clamp(base[0] + fleck, 0, 255);
      image.data[i + 1] = THREE.MathUtils.clamp(base[1] + fleck, 0, 255);
      image.data[i + 2] = THREE.MathUtils.clamp(base[2] + fleck, 0, 255);
      image.data[i + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function scatterGrassTufts(group, samples, avoidDistance) {
  const tuftMaterial = new THREE.MeshStandardMaterial({ color: 0x3f8f34, roughness: 1, flatShading: true });
  const tuftGeometry = new THREE.ConeGeometry(0.16, 0.7, 4);

  for (let i = 0; i < 170; i += 1) {
    const x = THREE.MathUtils.randFloatSpread(460);
    const z = THREE.MathUtils.randFloatSpread(310);
    if (distanceToSamples(x, z, samples) < avoidDistance + 4) continue;

    const tuft = new THREE.Mesh(tuftGeometry, tuftMaterial);
    tuft.position.set(x, 0.25, z);
    tuft.rotation.y = Math.random() * Math.PI;
    tuft.scale.setScalar(THREE.MathUtils.randFloat(0.65, 1.35));
    tuft.castShadow = true;
    group.add(tuft);
  }
}

function distanceToSamples(x, z, samples) {
  let bestDistance = Infinity;
  for (const sample of samples) {
    const dx = x - sample.x;
    const dz = z - sample.z;
    const distance = dx * dx + dz * dz;
    if (distance < bestDistance) bestDistance = distance;
  }
  return Math.sqrt(bestDistance);
}

function addPracticeTrackExtension(group, extraTrackAreas) {
  const redCurve = [
    pointFromPlan(1323.8, 394.4),
    pointFromPlan(1332.5, 348.7),
    pointFromPlan(1333.6, 311.5),
    pointFromPlan(1327.1, 282.6),
    pointFromPlan(1313.0, 262.2),
    pointFromPlan(1291.2, 250.1),
    pointFromPlan(1261.9, 246.5),
    pointFromPlan(1224.9, 251.3),
    pointFromPlan(1180.3, 264.4),
  ];
  const redHalfWidth = 4.15;
  const redMaterial = new THREE.MeshStandardMaterial({ color: 0xe84b3a, roughness: 0.85, flatShading: true });
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xf8f2df, roughness: 0.82, flatShading: true });

  const redSurface = new THREE.Mesh(makeOpenTrackStrip(redCurve, redHalfWidth, 0.065), redMaterial);
  redSurface.receiveShadow = true;
  group.add(redSurface);

  const whitePatches = [
    [
      [1304.9, 390.0],
      [1312.0, 355.2],
      [1348.6, 360.7],
      [1340.8, 399.0],
    ],
    [
      [1314.6, 321.5],
      [1309.7, 291.5],
      [1344.3, 278.4],
      [1351.6, 320.8],
    ],
    [
      [1294.6, 272.3],
      [1268.3, 265.2],
      [1270.3, 228.3],
      [1314.2, 240.9],
    ],
    [
      [1235.8, 267.8],
      [1202.1, 276.3],
      [1191.1, 241.0],
      [1229.2, 231.4],
    ],
  ];

  for (const patch of whitePatches) {
    const patchMesh = new THREE.Mesh(makeFlatPlanPolygon(patch, 0.095), whiteMaterial);
    patchMesh.receiveShadow = true;
    group.add(patchMesh);
  }

  extraTrackAreas.push({ kind: "curve", points: redCurve, halfWidth: redHalfWidth });
}

function addGeneratedLayoutDetails(group, extraTrackAreas, samples) {
  const generatedHalfWidth = trackDefinitions.generated.halfWidth;
  const standSpecs = [
    { t: 0.07, side: -1, length: 58, tiers: 4, depth: 15, color: 0xe84c3d },
    { t: 0.16, side: -1, length: 66, tiers: 5, depth: 18, color: 0xf5f1df },
    { t: 0.34, side: 1, length: 44, tiers: 3, depth: 13, color: 0x2266bb },
    { t: 0.51, side: -1, length: 48, tiers: 4, depth: 15, color: 0xe84c3d },
    { t: 0.77, side: 1, length: 52, tiers: 4, depth: 15, color: 0xf2cc36 },
  ];
  for (const spec of standSpecs) addGrandstandAtTrack(group, samples, { ...spec, trackHalfWidth: generatedHalfWidth });

  const kerbSpecs = [
    { t: 0.235, side: 1, count: 11 },
    { t: 0.325, side: -1, count: 9 },
    { t: 0.445, side: 1, count: 12 },
    { t: 0.57, side: -1, count: 11 },
    { t: 0.73, side: 1, count: 10 },
    { t: 0.88, side: -1, count: 10 },
  ];
  for (const spec of kerbSpecs) addCornerKerbBlocks(group, samples, { ...spec, trackHalfWidth: generatedHalfWidth }, extraTrackAreas);

  const bridgePose = getTrackPoseAt(samples, 0.1, -18);
  const bridge = new THREE.Group();
  const supportMaterial = new THREE.MeshStandardMaterial({ color: 0xbfc7cf, roughness: 0.54, metalness: 0.16, flatShading: true });
  const bannerMaterial = new THREE.MeshStandardMaterial({ color: 0x151821, roughness: 0.62, metalness: 0.04, flatShading: true });
  const banner = new THREE.Mesh(new THREE.BoxGeometry(26, 3.8, 1.2), bannerMaterial);
  banner.position.y = 9.6;
  banner.castShadow = true;
  bridge.add(banner);
  for (const x of [-12.5, 12.5]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(1.2, 9, 1.2), supportMaterial);
    post.position.set(x, 4.5, 0);
    post.castShadow = true;
    bridge.add(post);
  }
  bridge.position.copy(bridgePose.position);
  bridge.rotation.y = bridgePose.angle + Math.PI / 2;
  group.add(bridge);
}

function getTrackPoseAt(samples, t, offset = 0) {
  const index = Math.floor(THREE.MathUtils.clamp(t, 0, 0.999) * samples.length);
  const prev = samples[(index - 1 + samples.length) % samples.length];
  const next = samples[(index + 1) % samples.length];
  const tangent = next.clone().sub(prev).normalize();
  const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
  const position = samples[index].clone().addScaledVector(normal, offset);
  return { position, tangent, normal, angle: Math.atan2(tangent.x, tangent.z) };
}

function addGrandstandAtTrack(group, samples, spec) {
  const standDepth = spec.depth ?? spec.tiers * 3.4;
  const safeOffset = spec.side * ((spec.trackHalfWidth ?? 9.4) + standDepth / 2 + 1.6);
  const pose = getTrackPoseAt(samples, spec.t, safeOffset);
  const stand = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xbfc6c9, roughness: 0.58, metalness: 0.18, flatShading: true });
  const seatMaterial = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.65, metalness: 0.04, flatShading: true });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x202532, roughness: 0.5, metalness: 0.22, flatShading: true });
  const crowdColors = [0xf4d35e, 0xe94f37, 0x2d7dd2, 0x3cb371, 0xf7f7f2];

  for (let tier = 0; tier < spec.tiers; tier += 1) {
    const row = new THREE.Mesh(new THREE.BoxGeometry(spec.length, 1.1, 3.2), seatMaterial);
    row.position.set(0, 1.2 + tier * 1.35, -tier * 2.0);
    row.castShadow = true;
    row.receiveShadow = true;
    stand.add(row);
  }

  const deck = new THREE.Mesh(new THREE.BoxGeometry(spec.length + 3, 0.7, standDepth), frameMaterial);
  deck.position.set(0, 0.55, -spec.tiers * 2.7);
  deck.castShadow = true;
  stand.add(deck);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(spec.length + 5, 0.8, 6.2), roofMaterial);
  roof.position.set(0, 3 + spec.tiers * 1.35, -spec.tiers * 2.2);
  roof.rotation.x = -0.12;
  roof.castShadow = true;
  stand.add(roof);

  for (let i = 0; i < Math.floor(spec.length / 2.7); i += 1) {
    const person = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 6, 4),
      new THREE.MeshStandardMaterial({ color: crowdColors[i % crowdColors.length], roughness: 0.9, flatShading: true }),
    );
    const tier = i % spec.tiers;
    person.position.set(-spec.length / 2 + 2 + i * 2.6, 2.15 + tier * 1.35, -tier * 2.0 - 0.35);
    person.castShadow = true;
    stand.add(person);
  }

  stand.position.copy(pose.position);
  stand.rotation.y = pose.angle + Math.PI / 2;
  group.add(stand);
}

function addCornerKerbBlocks(group, samples, spec, extraTrackAreas) {
  const red = new THREE.MeshStandardMaterial({ color: 0xd91f26, roughness: 0.78, flatShading: true, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf6f1df, roughness: 0.76, flatShading: true, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  const startIndex = Math.floor(spec.t * samples.length);
  const step = 2;
  const kerbCenterOffset = spec.side * ((spec.trackHalfWidth ?? 9.4) + 0.72);
  const kerbHalfWidth = 1.2;
  const kerbLength = 4.1;

  for (let i = 0; i < spec.count; i += 1) {
    const index = (startIndex + i * step) % samples.length;
    const localT = index / samples.length;
    const pose = getTrackPoseAt(samples, localT, kerbCenterOffset);
    const block = new THREE.Mesh(makeKerbBlockGeometry(kerbLength, kerbHalfWidth * 2, 0.28), i % 2 === 0 ? red : white);
    block.position.copy(pose.position);
    block.position.y = 0.1;
    block.rotation.y = pose.angle + Math.PI / 2;
    block.castShadow = true;
    block.receiveShadow = true;
    group.add(block);
  }

  const kerbPoints = [];
  for (let i = 0; i < spec.count; i += 1) {
    const index = (startIndex + i * step) % samples.length;
    kerbPoints.push(getTrackPoseAt(samples, index / samples.length, kerbCenterOffset).position);
  }
  extraTrackAreas.push({ kind: "kerb", points: kerbPoints, halfWidth: kerbHalfWidth + 0.65 });
}

function makeKerbBlockGeometry(length, width, height) {
  const bottomHalfWidth = width / 2;
  const topHalfWidth = width * 0.34;
  const halfLength = length / 2;
  const y0 = 0;
  const y1 = height;
  const vertices = [
    -halfLength, y0, -bottomHalfWidth,
    halfLength, y0, -bottomHalfWidth,
    halfLength, y0, bottomHalfWidth,
    -halfLength, y0, bottomHalfWidth,
    -halfLength, y1, -topHalfWidth,
    halfLength, y1, -topHalfWidth,
    halfLength, y1, topHalfWidth,
    -halfLength, y1, topHalfWidth,
  ];
  const indices = [
    0, 1, 2, 0, 2, 3,
    4, 6, 5, 4, 7, 6,
    0, 4, 5, 0, 5, 1,
    1, 5, 6, 1, 6, 2,
    2, 6, 7, 2, 7, 3,
    3, 7, 4, 3, 4, 0,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
function isPointInExtraTrackArea(x, z, area) {
  if (area.kind === "curve" || area.kind === "kerb") {
    let bestDistance = Infinity;
    for (let i = 0; i < area.points.length - 1; i += 1) {
      const distance = distanceToSegment2D(x, z, area.points[i], area.points[i + 1]);
      if (distance < bestDistance) bestDistance = distance;
    }
    return bestDistance <= area.halfWidth;
  }

  return false;
}

function distanceToSegment2D(x, z, start, end) {
  const dx = end.x - start.x;
  const dz = end.z - start.z;
  const lengthSq = dx * dx + dz * dz;
  if (lengthSq === 0) return Math.hypot(x - start.x, z - start.z);
  const t = THREE.MathUtils.clamp(((x - start.x) * dx + (z - start.z) * dz) / lengthSq, 0, 1);
  const closestX = start.x + dx * t;
  const closestZ = start.z + dz * t;
  return Math.hypot(x - closestX, z - closestZ);
}

function makeFlatPlanPolygon(planPoints, y) {
  const points = planPoints.map(([x, planY]) => pointFromPlan(x, planY));
  const vertices = [];
  const indices = [];

  for (const point of points) {
    vertices.push(point.x, y, point.z);
  }

  for (let i = 1; i < points.length - 1; i += 1) {
    indices.push(0, i, i + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addSceneryBuildings(group) {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xd8d1be, roughness: 0.82, flatShading: true });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x4c6d85, roughness: 0.74, flatShading: true });
  const glassMaterial = new THREE.MeshStandardMaterial({ color: 0x71b5d8, roughness: 0.35, metalness: 0.08, flatShading: true });
  const buildings = [
    { x: -205, z: -128, width: 22, depth: 12, height: 12, rotation: 0.2 },
    { x: -166, z: 138, width: 18, depth: 10, height: 8, rotation: -0.28 },
    { x: -116, z: -150, width: 15, depth: 9, height: 7, rotation: 0.08 },
    { x: -28, z: 154, width: 24, depth: 13, height: 11, rotation: 0.18 },
    { x: 64, z: -156, width: 17, depth: 10, height: 8, rotation: -0.22 },
    { x: 132, z: 140, width: 21, depth: 12, height: 10, rotation: 0.31 },
    { x: 188, z: -118, width: 26, depth: 14, height: 13, rotation: -0.15 },
    { x: 216, z: 92, width: 16, depth: 10, height: 7, rotation: 0.24 },
  ];

  for (const spec of buildings) {
    const building = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(spec.width, spec.height, spec.depth), wallMaterial);
    base.position.y = spec.height / 2;
    base.castShadow = true;
    base.receiveShadow = true;
    building.add(base);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(spec.width + 1.2, 0.7, spec.depth + 1.2), roofMaterial);
    roof.position.y = spec.height + 0.35;
    roof.castShadow = true;
    building.add(roof);

    for (let i = -1; i <= 1; i += 1) {
      const window = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.08), glassMaterial);
      window.position.set(i * spec.width * 0.22, spec.height * 0.55, spec.depth / 2 + 0.05);
      building.add(window);
    }

    building.position.set(spec.x, 0, spec.z);
    building.rotation.y = spec.rotation;
    group.add(building);
  }
}

function addCloudsAndSun(group) {
  const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffe07a });
  const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(5, 12, 8), sunMaterial);
  sunMesh.position.set(-70, 80, -95);
  group.add(sunMesh);

  const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f5f0, roughness: 1, flatShading: true });
  const cloudPositions = [
    [-65, 48, -58],
    [8, 54, -72],
    [62, 46, -42],
    [-24, 58, 34],
  ];

  for (const [x, y, z] of cloudPositions) {
    const cloud = new THREE.Group();
    for (let i = 0; i < 4; i += 1) {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(3.2 - i * 0.25, 8, 6), cloudMaterial);
      puff.scale.set(1.5, 0.62, 0.78);
      puff.position.set(i * 3.8, Math.sin(i) * 0.6, Math.cos(i) * 1.2);
      cloud.add(puff);
    }
    cloud.position.set(x, y, z);
    group.add(cloud);
  }
}

function getNearestTrackPose(target, samples) {
  let bestIndex = 0;
  let bestDistance = Infinity;

  for (let i = 0; i < samples.length; i += 1) {
    const dx = target.x - samples[i].x;
    const dz = target.z - samples[i].z;
    const distance = dx * dx + dz * dz;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = i;
    }
  }

  const prev = samples[(bestIndex - 1 + samples.length) % samples.length];
  const next = samples[(bestIndex + 1) % samples.length];
  const tangent = next.clone().sub(prev).normalize();
  const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
  const outward = target.clone().sub(samples[bestIndex]).dot(normal) < 0 ? normal.multiplyScalar(-1) : normal;
  return {
    center: samples[bestIndex].clone(),
    tangent,
    normal: outward,
    angle: Math.atan2(tangent.x, tangent.z),
  };
}

function makeTrackStrip(samples, outerHalfWidth, y, innerHalfWidth = -outerHalfWidth) {
  const vertices = [];
  const indices = [];

  for (let i = 0; i < samples.length; i += 1) {
    const prev = samples[(i - 1 + samples.length) % samples.length];
    const next = samples[(i + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const outer = samples[i].clone().addScaledVector(normal, outerHalfWidth);
    const inner = samples[i].clone().addScaledVector(normal, innerHalfWidth);
    vertices.push(outer.x, y, outer.z, inner.x, y, inner.z);
  }

  for (let i = 0; i < samples.length; i += 1) {
    const a = i * 2;
    const b = ((i + 1) % samples.length) * 2;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeOpenTrackStrip(samples, halfWidth, y) {
  const vertices = [];
  const indices = [];

  for (let i = 0; i < samples.length; i += 1) {
    const prev = samples[Math.max(0, i - 1)];
    const next = samples[Math.min(samples.length - 1, i + 1)];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const left = samples[i].clone().addScaledVector(normal, halfWidth);
    const right = samples[i].clone().addScaledVector(normal, -halfWidth);
    vertices.push(left.x, y, left.z, right.x, y, right.z);
  }

  for (let i = 0; i < samples.length - 1; i += 1) {
    const a = i * 2;
    const b = (i + 1) * 2;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addStartLine(group, point, next, halfWidth) {
  const direction = next.clone().sub(point).normalize();
  const angle = Math.atan2(direction.x, direction.z);
  const white = new THREE.MeshStandardMaterial({ color: 0xf8f6ee, roughness: 0.65 });
  const black = new THREE.MeshStandardMaterial({ color: 0x1d1d1c, roughness: 0.75 });
  const columns = 12;
  const rows = 2;
  const tileWidth = (halfWidth * 2) / columns;
  const tileDepth = 0.72;
  const tileGeometry = new THREE.BoxGeometry(tileWidth, 0.055, tileDepth);
  const across = new THREE.Vector3(direction.z, 0, -direction.x);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const tile = new THREE.Mesh(tileGeometry, (row + col) % 2 === 0 ? white : black);
      const acrossOffset = -halfWidth + tileWidth * 0.5 + col * tileWidth;
      const depthOffset = (row - 0.5) * tileDepth;
      tile.position
        .copy(point)
        .addScaledVector(across, acrossOffset)
        .addScaledVector(direction, depthOffset);
      tile.position.y = 0.13;
      tile.rotation.y = angle + Math.PI / 2;
      group.add(tile);
    }
  }
}

function addTrackMarkers(group, samples, halfWidth) {
  const barrierMaterial = new THREE.MeshStandardMaterial({ color: 0xf05a43, roughness: 0.72, flatShading: true });
  const markerGeometry = new THREE.BoxGeometry(1.8, 0.75, 0.45);

  for (let i = 0; i < samples.length; i += 26) {
    const prev = samples[(i - 1 + samples.length) % samples.length];
    const next = samples[(i + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    for (const side of [-1, 1]) {
      const marker = new THREE.Mesh(markerGeometry, barrierMaterial);
      marker.castShadow = true;
      marker.receiveShadow = true;
      marker.position
        .copy(samples[i])
        .addScaledVector(normal, side * (halfWidth + 3.1))
        .setY(0.4);
      marker.rotation.y = Math.atan2(tangent.x, tangent.z);
      group.add(marker);
    }
  }
}

function addKerbPaint(group, samples, radius) {
  const red = new THREE.MeshStandardMaterial({ color: 0xe84b3a, roughness: 0.78, flatShading: true });
  const white = new THREE.MeshStandardMaterial({ color: 0xf8f2df, roughness: 0.78, flatShading: true });
  const geometry = new THREE.BoxGeometry(1.45, 0.08, 0.5);

  for (let i = 0; i < samples.length; i += 18) {
    const prev = samples[(i - 1 + samples.length) % samples.length];
    const next = samples[(i + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    for (const side of [-1, 1]) {
      const block = new THREE.Mesh(geometry, (i / 18) % 2 === 0 ? red : white);
      block.position.copy(samples[i]).addScaledVector(normal, side * radius);
      block.position.y = 0.15;
      block.rotation.y = Math.atan2(tangent.x, tangent.z);
      block.receiveShadow = true;
      group.add(block);
    }
  }
}

function addScenery(group) {
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8c6239, roughness: 0.9, flatShading: true });
  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x4f9b52, roughness: 0.9, flatShading: true });
  const trunkGeometry = new THREE.CylinderGeometry(0.18, 0.24, 1.1, 5);
  const leafGeometry = new THREE.ConeGeometry(0.95, 2.0, 6);
  const treeSpots = [
    [-63, -34],
    [-55, 34],
    [-30, -48],
    [-8, 42],
    [36, -36],
    [60, 18],
    [73, -10],
  ];

  for (const [x, z] of treeSpots) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.55;
    const leaves = new THREE.Mesh(leafGeometry, leafMaterial);
    leaves.position.y = 2.05;
    trunk.castShadow = true;
    leaves.castShadow = true;
    tree.add(trunk, leaves);
    tree.position.set(x, 0, z);
    group.add(tree);
  }

  const stand = new THREE.Group();
  const standMaterial = new THREE.MeshStandardMaterial({ color: 0x6ab6e8, roughness: 0.65, flatShading: true });
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.65, flatShading: true });

  for (let row = 0; row < 4; row += 1) {
    const seats = new THREE.Mesh(new THREE.BoxGeometry(13, 0.4, 1.1), row % 2 ? seatMaterial : standMaterial);
    seats.position.set(0, 0.35 + row * 0.55, row * -1.1);
    seats.castShadow = true;
    stand.add(seats);
  }

  stand.position.set(-22, 0, -44);
  stand.rotation.y = -0.15;
  group.add(stand);
}

function randomizePlane(geometry, amount) {
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i += 1) {
    position.setZ(i, position.getZ(i) + (Math.random() - 0.5) * amount);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

function createRacePaintMaterial(color, roughness = 0.36, metalness = 0.14) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    flatShading: true,
  });
}
function addRainbowRim(parent, side) {
  const segmentColors = [0xe84135, 0xf8d447, 0x29a650];
  for (let i = 0; i < segmentColors.length; i += 1) {
    const segment = new THREE.Mesh(
      new THREE.RingGeometry(0.14, 0.27, 10, 1, i * (Math.PI * 2 / 3), Math.PI * 2 / 3 - 0.08),
      createRacePaintMaterial(segmentColors[i], 0.26, 0.22),
    );
    segment.position.x = side * 0.255;
    segment.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
    segment.castShadow = true;
    parent.add(segment);
  }

  const center = new THREE.Mesh(
    new THREE.CircleGeometry(0.13, 14),
    createRacePaintMaterial(0x2f78ff, 0.24, 0.22),
  );
  center.position.x = side * 0.262;
  center.rotation.y = side > 0 ? Math.PI / 2 : -Math.PI / 2;
  center.castShadow = true;
  parent.add(center);
}
function createFormulaCar(paint = "red") {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const scheme = carPaintSchemes[paint] ?? carPaintSchemes.red;
  const primary = createRacePaintMaterial(scheme.primary, 0.22, 0.54);
  const secondary = createRacePaintMaterial(scheme.secondary, 0.28, 0.36);
  const stripeMaterial = createRacePaintMaterial(scheme.stripe, 0.24, 0.42);
  const accentMaterial = createRacePaintMaterial(scheme.accent, 0.22, 0.48);
  const black = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.8, flatShading: true });
  const carbon = new THREE.MeshStandardMaterial({ color: 0x242a2c, roughness: 0.65, metalness: 0.08, flatShading: true });
  const cream = new THREE.MeshStandardMaterial({ color: 0xfff1b8, roughness: 0.55, flatShading: true });

  const chassis = createTaperedBox(1.08, 1.48, 0.5, 4.1, primary);
  chassis.position.y = 0.58;
  chassis.castShadow = true;
  body.add(chassis);

  const nose = createFormulaWedgeNose(primary);
  nose.position.set(0, 0.39, 2.72);
  nose.castShadow = true;
  body.add(nose);

  for (const x of [-0.98, 0.98]) {
    const sidePod = createTaperedBox(0.76, 0.48, 0.42, 1.65, secondary);
    sidePod.position.set(x, 0.43, -0.28);
    sidePod.castShadow = true;
    body.add(sidePod);

    const intake = createTaperedBox(0.58, 0.35, 0.16, 0.62, carbon);
    intake.position.set(x, 0.64, 0.38);
    intake.castShadow = true;
    body.add(intake);
  }

  const cockpit = createTaperedBox(0.75, 0.95, 0.48, 0.86, accentMaterial);
  cockpit.position.set(0, 0.86, 0.25);
  cockpit.castShadow = true;
  body.add(cockpit);

  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.34, 10, 8), cream);
  helmet.scale.set(1, 0.78, 1);
  helmet.position.set(0, 1.1, 0.08);
  helmet.castShadow = true;
  body.add(helmet);

  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.12, 0.08), carbon);
  visor.position.set(0, 1.13, 0.38);
  body.add(visor);

  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.035, 6, 16, Math.PI), carbon);
  halo.position.set(0, 1.08, 0.38);
  halo.rotation.x = Math.PI / 2;
  halo.castShadow = true;
  body.add(halo);

  const frontWing = addPivotWing(body, 0, 0.34, 3.16, 2.5, 0.6, primary);
  const frontWingStandardAngle = Math.PI / 9;
  frontWing.rotation.x = frontWingStandardAngle;
  const rearWingMaterial = scheme.rearWing ? createRacePaintMaterial(scheme.rearWing, 0.34, 0.16) : carbon;
  const rearWing = addWing(body, 0, 1.08, -2.35, 3.12, 0.55, rearWingMaterial, 1)[0];
  const rearWingStandardAngle = Math.PI / 4;
  rearWing.rotation.x = rearWingStandardAngle;

  const diffuser = createTaperedBox(1.7, 2.25, 0.22, 0.85, carbon);
  diffuser.position.set(0, 0.24, -2.35);
  diffuser.rotation.x = -0.12;
  diffuser.castShadow = true;
  body.add(diffuser);

  for (const x of [-0.58, 0.58]) {
    const mirrorStem = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.48, 6), carbon);
    mirrorStem.position.set(x, 0.86, 0.62);
    mirrorStem.rotation.z = x > 0 ? -0.75 : 0.75;
    body.add(mirrorStem);

    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.08), carbon);
    mirror.position.set(x * 1.28, 0.98, 0.7);
    mirror.castShadow = true;
    body.add(mirror);
  }

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 4.7), stripeMaterial);
  stripe.position.set(0, 0.85, 0.3);
  body.add(stripe);

  for (const x of scheme.sideStripeXs) {
    const sideStripe = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.035, 2.7), stripeMaterial);
    sideStripe.position.set(x, 0.83, 0.45);
    body.add(sideStripe);
  }

  const wheelMeshes = [];
  const wheels = {};
  const tireGeometry = new THREE.CylinderGeometry(0.43, 0.43, 0.46, 14);
  tireGeometry.rotateZ(Math.PI / 2);
  const rimGeometry = new THREE.CylinderGeometry(0.24, 0.24, 0.49, 10);
  rimGeometry.rotateZ(Math.PI / 2);
  const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xf0d264, roughness: 0.5, metalness: 0.15, flatShading: true });

  for (const [name, x, z] of [
    ["frontLeft", -1.02, 1.78],
    ["frontRight", 1.02, 1.78],
    ["rearLeft", -1.02, -1.7],
    ["rearRight", 1.02, -1.7],
  ]) {
    const pivot = new THREE.Group();
    const tire = new THREE.Mesh(tireGeometry, black);
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    tire.castShadow = true;
    tire.receiveShadow = true;
    rim.castShadow = true;
    pivot.position.set(x, 0.43, z);
    pivot.add(tire, rim);
    if (scheme.rainbowRims) addRainbowRim(pivot, Math.sign(x));
    wheels[name] = pivot;
    wheelMeshes.push(tire);
    body.add(pivot);
  }

  const rodMaterial = carbon;
  for (const z of [1.78, -1.7]) {
    for (const x of [-0.54, 0.54]) {
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.15, 6), rodMaterial);
      rod.position.set(x, 0.45, z);
      rod.rotation.z = Math.PI / 2.7 * Math.sign(x);
      rod.castShadow = true;
      body.add(rod);
    }
  }

  return { root, body, wheels, wheelMeshes, frontWing, frontWingStandardAngle, rearWing, rearWingStandardAngle };
}

function createStockCar(paint = "orange-stock") {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const scheme = stockPaintSchemes[paint] ?? stockPaintSchemes["orange-stock"];
  const orange = createRacePaintMaterial(scheme.primary, 0.26, 0.32);
  const darkerOrange = createRacePaintMaterial(scheme.secondary, 0.32, 0.24);
  const blue = createRacePaintMaterial(scheme.stripe, 0.34, 0.16);
  const glass = new THREE.MeshStandardMaterial({ color: scheme.glass, roughness: 0.25, metalness: 0.08, flatShading: true });
  const black = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.85, flatShading: true });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xd6d2c8, roughness: 0.35, metalness: 0.25, flatShading: true });

  const base = createStockCarBody(orange);
  base.position.y = 0.46;
  base.castShadow = true;
  body.add(base);

  addStockCarSidePanels(body, orange);

  const hood = createSlopedStockHood(orange);
  hood.position.set(0, 0.83, 1.62);
  hood.castShadow = true;
  body.add(hood);

  const cabin = createTaperedBox(1.62, 1.96, 1.05, 1.88, darkerOrange);
  cabin.position.set(0, 1.1, -0.24);
  cabin.castShadow = true;
  body.add(cabin);

  const rearRound = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 2.16, 10), darkerOrange);
  rearRound.rotation.z = Math.PI / 2;
  rearRound.position.set(0, 0.98, -2.64);
  rearRound.scale.set(1, 0.34, 1);
  rearRound.castShadow = true;
  body.add(rearRound);

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.08, 0.62), glass);
  windshield.position.set(0, 1.44, 0.7);
  windshield.rotation.x = -0.65;
  body.add(windshield);

  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.08, 0.54), glass);
  rearWindow.position.set(0, 1.38, -1.25);
  rearWindow.rotation.x = 0.62;
  body.add(rearWindow);

  for (const x of [-1.04, 1.04]) {
    const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.88), glass);
    sideWindow.position.set(x, 1.35, -0.22);
    body.add(sideWindow);
  }

  const hoodStripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.045, 4.55), blue);
  hoodStripe.position.set(0, 1.18, 0.08);
  body.add(hoodStripe);

  for (const x of [-0.62, 0.62]) {
    const sideStripe = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.055, 3.9), blue);
    sideStripe.position.set(x, 1.2, -0.08);
    body.add(sideStripe);
  }

  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.25, 0.08), black);
  grille.position.set(0, 0.52, 2.74);
  grille.rotation.x = -0.18;
  body.add(grille);

  for (const x of [-0.64, 0.64]) {
    const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.14, 0.09), chrome);
    headlight.position.set(x, 0.66, 2.77);
    headlight.rotation.x = -0.18;
    body.add(headlight);
  }

  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.16, 0.26), blue);
  spoiler.position.set(0, 1.18, -2.7);
  spoiler.rotation.x = 0.18;
  spoiler.castShadow = true;
  body.add(spoiler);

  const wheelMeshes = [];
  const wheels = {};
  const tireGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 14);
  tireGeometry.rotateZ(Math.PI / 2);
  const rimGeometry = new THREE.CylinderGeometry(0.27, 0.27, 0.53, 10);
  rimGeometry.rotateZ(Math.PI / 2);

  for (const [name, x, z] of [
    ["frontLeft", -1.18, 1.82],
    ["frontRight", 1.18, 1.82],
    ["rearLeft", -1.18, -1.82],
    ["rearRight", 1.18, -1.82],
  ]) {
    const pivot = new THREE.Group();
    const tire = new THREE.Mesh(tireGeometry, black);
    const rim = new THREE.Mesh(rimGeometry, chrome);
    tire.castShadow = true;
    tire.receiveShadow = true;
    rim.castShadow = true;
    pivot.position.set(x, 0.43, z);
    pivot.add(tire, rim);
    if (scheme.rainbowRims) addRainbowRim(pivot, Math.sign(x));
    wheels[name] = pivot;
    wheelMeshes.push(tire);
    body.add(pivot);
  }

  return { root, body, wheels, wheelMeshes };
}

function createSelectedCar(carId) {
  if (lmpPaintSchemes[carId]) return createLeMansPrototype(carId);
  if (stockPaintSchemes[carId]) return createStockCar(carId);
  if (jeepPaintSchemes[carId]) return createJeep(carId);
  return createFormulaCar(carId);
}

function createJeep(paint = "dune-jeep") {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const scheme = jeepPaintSchemes[paint] ?? jeepPaintSchemes["dune-jeep"];
  const primary = createRacePaintMaterial(scheme.primary, 0.36, 0.2);
  const secondary = createRacePaintMaterial(scheme.secondary, 0.4, 0.16);
  const stripe = createRacePaintMaterial(scheme.stripe, 0.38, 0.16);
  const accent = createRacePaintMaterial(scheme.accent, 0.38, 0.16);
  const glass = new THREE.MeshStandardMaterial({ color: scheme.glass, roughness: 0.25, metalness: 0.08, flatShading: true });
  const darkTrim = new THREE.MeshStandardMaterial({ color: 0x2f312b, roughness: 0.88, flatShading: true });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d2c8, roughness: 0.36, metalness: 0.22, flatShading: true });

  const base = createTaperedBox(1.9, 2.05, 0.62, 3.55, primary);
  base.position.y = 0.78;
  base.castShadow = true;
  body.add(base);

  const cabin = createTaperedBox(1.62, 1.78, 1.24, 2.2, primary);
  cabin.position.set(0, 1.45, -0.34);
  cabin.castShadow = true;
  body.add(cabin);

  const hood = createTaperedBox(1.78, 1.54, 0.36, 1.35, primary);
  hood.position.set(0, 1.1, 1.54);
  hood.rotation.x = -0.08;
  hood.castShadow = true;
  body.add(hood);

  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.38, 0.56, 0.08), darkTrim);
  grille.position.set(0, 0.92, 2.26);
  grille.castShadow = true;
  body.add(grille);
  for (const x of [-0.42, -0.21, 0, 0.21, 0.42]) {
    const slot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.44, 0.09), secondary);
    slot.position.set(x, 0.93, 2.31);
    body.add(slot);
  }
  for (const x of [-0.78, 0.78]) {
    const headlight = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.08, 12), stripe);
    headlight.rotation.x = Math.PI / 2;
    headlight.position.set(x, 0.98, 2.32);
    body.add(headlight);
  }

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.72), glass);
  windshield.position.set(0, 1.84, 0.76);
  windshield.rotation.x = -0.18;
  body.add(windshield);

  for (const x of [-0.88, 0.88]) {
    const rollBar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 7), accent);
    rollBar.position.set(x, 1.82, -0.5);
    rollBar.rotation.x = 0.1;
    rollBar.castShadow = true;
    body.add(rollBar);
  }
  const roofRack = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.08, 1.3), accent);
  roofRack.position.set(0, 2.18, -0.48);
  roofRack.castShadow = true;
  body.add(roofRack);

  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.2, 0.24), accent);
  frontBumper.position.set(0, 0.58, 2.46);
  body.add(frontBumper);
  const rearBumper = frontBumper.clone();
  rearBumper.position.set(0, 0.58, -2.05);
  body.add(rearBumper);

  const spare = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.28, 14), darkTrim);
  spare.rotation.x = Math.PI / 2;
  spare.position.set(0, 1.12, -2.06);
  spare.castShadow = true;
  body.add(spare);
  const spareRim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 10), rimMaterial);
  spareRim.rotation.x = Math.PI / 2;
  spareRim.position.copy(spare.position);
  body.add(spareRim);

  if (scheme.camo) {
    for (const [x, z, sx, sz, mat] of [
      [-0.52, 0.32, 0.54, 0.42, secondary],
      [0.48, -0.52, 0.66, 0.48, accent],
      [0.22, 1.3, 0.5, 0.34, stripe],
      [-0.62, -1.18, 0.58, 0.42, accent],
    ]) {
      const patch = new THREE.Mesh(new THREE.BoxGeometry(sx, 0.045, sz), mat);
      patch.position.set(x, 1.14, z);
      body.add(patch);
    }
  } else {
    const centerStripe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.045, 3.6), stripe);
    centerStripe.position.set(0, 1.15, 0.2);
    body.add(centerStripe);
  }

  const wheelMeshes = [];
  const wheels = {};
  const tireGeometry = new THREE.CylinderGeometry(0.52, 0.52, 0.46, 14);
  tireGeometry.rotateZ(Math.PI / 2);
  const rimGeometry = new THREE.CylinderGeometry(0.24, 0.24, 0.49, 10);
  rimGeometry.rotateZ(Math.PI / 2);
  for (const [name, x, z] of [
    ["frontLeft", -1.08, 1.34],
    ["frontRight", 1.08, 1.34],
    ["rearLeft", -1.08, -1.34],
    ["rearRight", 1.08, -1.34],
  ]) {
    const pivot = new THREE.Group();
    const tire = new THREE.Mesh(tireGeometry, darkTrim);
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    tire.castShadow = true;
    tire.receiveShadow = true;
    rim.castShadow = true;
    pivot.position.set(x, 0.5, z);
    pivot.add(tire, rim);
    if (scheme.rainbowRims) addRainbowRim(pivot, Math.sign(x));
    wheels[name] = pivot;
    wheelMeshes.push(tire);
    body.add(pivot);
  }

  return { root, body, wheels, wheelMeshes };
}

function createLeMansPrototype(paint = "lmp") {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const scheme = lmpPaintSchemes[paint] ?? lmpPaintSchemes.lmp;
  const white = createRacePaintMaterial(scheme.primary, 0.22, 0.36);
  const red = createRacePaintMaterial(scheme.secondary, 0.26, 0.28);
  const blue = createRacePaintMaterial(scheme.stripe, 0.34, 0.16);
  const black = new THREE.MeshStandardMaterial({ color: 0x111314, roughness: 0.82, flatShading: true });
  const carbon = new THREE.MeshStandardMaterial({ color: 0x202629, roughness: 0.72, metalness: 0.08, flatShading: true });
  const glass = new THREE.MeshStandardMaterial({ color: scheme.glass, roughness: 0.22, metalness: 0.08, flatShading: true });

  const floor = createTaperedBox(2.08, 2.2, 0.28, 5.4, carbon);
  floor.position.y = 0.22;
  floor.castShadow = true;
  body.add(floor);

  const mainBody = createTaperedBox(1.78, 1.92, 0.48, 4.95, white);
  mainBody.position.y = 0.52;
  mainBody.castShadow = true;
  body.add(mainBody);

  const nose = createLmpWedgeNose(white);
  nose.position.set(0, 0.34, 2.34);
  nose.castShadow = true;
  body.add(nose);

  const cockpit = createTaperedBox(0.9, 1.24, 0.66, 1.15, glass);
  cockpit.position.set(0, 0.86, 0.28);
  cockpit.scale.set(1, 1, 1.08);
  cockpit.castShadow = true;
  body.add(cockpit);

  const roofFin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.78, 1.95), red);
  roofFin.position.set(0, 1.18, -0.82);
  roofFin.castShadow = true;
  body.add(roofFin);

  const centerStripe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.045, 5.5), red);
  centerStripe.position.set(0, 0.82, 0.35);
  body.add(centerStripe);

  for (const x of [-0.42, 0.42]) {
    const blueStripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.05, 4.6), blue);
    blueStripe.position.set(x, 0.84, 0.15);
    body.add(blueStripe);
  }

  for (const [x, z] of [
    [-0.98, 1.55],
    [0.98, 1.55],
    [-1.0, -1.62],
    [1.0, -1.62],
  ]) {
    const pod = createTaperedBox(0.54, 0.62, 0.42, 1.24, white);
    pod.position.set(x, 0.48, z);
    pod.castShadow = true;
    body.add(pod);
  }

  const rearWing = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.12, 0.44), carbon);
  rearWing.position.set(0, 1.05, -2.95);
  rearWing.rotation.x = 0.16;
  rearWing.castShadow = true;
  body.add(rearWing);

  for (const x of [-1.05, 1.05]) {
    const upright = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.8, 0.12), carbon);
    upright.position.set(x, 0.7, -2.82);
    upright.castShadow = true;
    body.add(upright);
  }

  const wheelMeshes = [];
  const wheels = {};
  const tireGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.48, 16);
  tireGeometry.rotateZ(Math.PI / 2);
  const rimGeometry = new THREE.CylinderGeometry(0.22, 0.22, 0.51, 12);
  rimGeometry.rotateZ(Math.PI / 2);
  const rimMaterial = new THREE.MeshStandardMaterial({ color: 0xd6d2c8, roughness: 0.38, metalness: 0.2, flatShading: true });

  for (const [name, x, z] of [
    ["frontLeft", -1.12, 1.6],
    ["frontRight", 1.12, 1.6],
    ["rearLeft", -1.12, -1.62],
    ["rearRight", 1.12, -1.62],
  ]) {
    const pivot = new THREE.Group();
    const tire = new THREE.Mesh(tireGeometry, black);
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    tire.castShadow = true;
    tire.receiveShadow = true;
    rim.castShadow = true;
    pivot.position.set(x, 0.36, z);
    pivot.add(tire, rim);
    if (scheme.rainbowRims) addRainbowRim(pivot, Math.sign(x));
    wheels[name] = pivot;
    wheelMeshes.push(tire);
    body.add(pivot);
  }

  return { root, body, wheels, wheelMeshes };
}

function createLmpWedgeNose(material) {
  const frontZ = 1.12;
  const rearZ = -1.58;
  const vertices = new Float32Array([
    -0.88, 0.06, frontZ,
    0.88, 0.06, frontZ,
    -1.04, 0.46, rearZ,
    1.04, 0.46, rearZ,
    -0.74, -0.08, rearZ,
    0.74, -0.08, rearZ,
  ]);
  const indices = [
    0, 1, 3, 0, 3, 2,
    0, 4, 5, 0, 5, 1,
    0, 2, 4,
    1, 5, 3,
    2, 3, 5, 2, 5, 4,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function createStockCarBody(material) {
  const frontZ = 2.68;
  const rearZ = -2.68;
  const lowerY = 0;
  const upperY = 0.76;
  const frontLowerWidth = 2.05;
  const frontUpperWidth = 2.26;
  const rearLowerWidth = 2.18;
  const rearUpperWidth = 2.38;
  const vertices = new Float32Array([
    -frontLowerWidth / 2, lowerY, frontZ,
    frontLowerWidth / 2, lowerY, frontZ,
    -frontUpperWidth / 2, upperY * 0.62, frontZ,
    frontUpperWidth / 2, upperY * 0.62, frontZ,
    -rearLowerWidth / 2, lowerY, rearZ,
    rearLowerWidth / 2, lowerY, rearZ,
    -rearUpperWidth / 2, upperY, rearZ,
    rearUpperWidth / 2, upperY, rearZ,
  ]);
  const indices = [
    0, 1, 3, 0, 3, 2,
    4, 6, 7, 4, 7, 5,
    0, 2, 6, 0, 6, 4,
    1, 5, 7, 1, 7, 3,
    2, 3, 7, 2, 7, 6,
    0, 4, 5, 0, 5, 1,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function addStockCarSidePanels(body, material) {
  for (const x of [-1.25, 1.25]) {
    const centerDoor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.64, 1.85), material);
    centerDoor.position.set(x, 0.6, 0);
    centerDoor.castShadow = true;
    body.add(centerDoor);

    for (const z of [1.82, -1.82]) {
      const upperArch = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.98), material);
      upperArch.position.set(x, 0.86, z);
      upperArch.castShadow = true;
      body.add(upperArch);

      const lowerLip = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.38), material);
      lowerLip.position.set(x, 0.48, z + (z > 0 ? -0.52 : 0.52));
      lowerLip.castShadow = true;
      body.add(lowerLip);
    }
  }
}

function createSlopedStockHood(material) {
  const frontZ = 1.12;
  const rearZ = -0.95;
  const vertices = new Float32Array([
    -0.98, 0.08, frontZ,
    0.98, 0.08, frontZ,
    -1.1, 0.52, rearZ,
    1.1, 0.52, rearZ,
    -1.0, -0.08, rearZ,
    1.0, -0.08, rearZ,
  ]);
  const indices = [
    0, 1, 3, 0, 3, 2,
    0, 4, 5, 0, 5, 1,
    0, 2, 4,
    1, 5, 3,
    2, 3, 5, 2, 5, 4,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function createFormulaWedgeNose(material) {
  const frontZ = 1.28;
  const rearZ = -1.25;
  const vertices = new Float32Array([
    -0.18, 0.02, frontZ,
    0.18, 0.02, frontZ,
    -0.28, 0.2, frontZ,
    0.28, 0.2, frontZ,
    -0.52, 0.0, rearZ,
    0.52, 0.0, rearZ,
    -0.84, 0.34, rearZ,
    0.84, 0.34, rearZ,
  ]);
  const indices = [
    0, 1, 3, 0, 3, 2,
    4, 6, 7, 4, 7, 5,
    0, 4, 5, 0, 5, 1,
    2, 3, 7, 2, 7, 6,
    0, 2, 6, 0, 6, 4,
    1, 5, 7, 1, 7, 3,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function createTaperedBox(frontWidth, rearWidth, height, length, material) {
  const frontZ = length / 2;
  const rearZ = -length / 2;
  const y = height / 2;
  const vertices = new Float32Array([
    -frontWidth / 2, 0, frontZ,
    frontWidth / 2, 0, frontZ,
    frontWidth / 2, height, frontZ,
    -frontWidth / 2, height, frontZ,
    -rearWidth / 2, 0, rearZ,
    rearWidth / 2, 0, rearZ,
    rearWidth / 2, height, rearZ,
    -rearWidth / 2, height, rearZ,
  ]);
  const indices = [
    0, 1, 2, 0, 2, 3,
    1, 5, 6, 1, 6, 2,
    5, 4, 7, 5, 7, 6,
    4, 0, 3, 4, 3, 7,
    3, 2, 6, 3, 6, 7,
    4, 5, 1, 4, 1, 0,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.geometry.translate(0, -y, 0);
  return mesh;
}

function addWing(body, x, y, z, width, depth, material, planes = 1) {
  const wingPlanes = [];
  for (let i = 0; i < planes; i += 1) {
    const plane = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), material);
    plane.position.set(x, y + i * 0.18, z - i * 0.08);
    plane.rotation.x = i === 0 ? -0.04 : 0.08;
    plane.castShadow = true;
    body.add(plane);
    wingPlanes.push(plane);
  }
  return wingPlanes;
}

function addPivotWing(body, x, y, frontEdgeZ, width, depth, material) {
  const pivot = new THREE.Group();
  const plane = new THREE.Mesh(new THREE.BoxGeometry(width, 0.1, depth), material);
  pivot.position.set(x, y, frontEdgeZ);
  plane.position.z = -depth / 2;
  plane.castShadow = true;
  pivot.add(plane);
  body.add(pivot);
  return pivot;
}

function getCarProfile() {
  return carProfiles[selectedCar] ?? carProfiles.ferraro;
}

function getGearSpeedBands(profile) {
  if (profile.transmission === "manual") return [0, 7.8, 14.8, 22.5, 28.5, profile.maxForwardSpeed];
  return [0, 11, 24, 39, 54, profile.maxForwardSpeed];
}

function getManualGearBand(gear, profile) {
  const bands = [
    [0, 8.2],
    [6.6, 15.4],
    [12.9, 23.2],
    [19.8, 29.5],
    [24.8, profile.maxForwardSpeed],
  ];
  const band = bands[THREE.MathUtils.clamp(gear, 1, 5) - 1];
  return { start: band[0], end: band[1] };
}

function getAutoGear(forwardSpeed, profile = getCarProfile()) {
  const gearSpeedBands = getGearSpeedBands(profile);
  if (forwardSpeed < -0.6) return -1;
  if (forwardSpeed < 2) return 0;

  for (let gear = 1; gear < gearSpeedBands.length; gear += 1) {
    if (forwardSpeed <= gearSpeedBands[gear]) return gear;
  }

  return gearSpeedBands.length - 1;
}

function getEngineRpm(forwardSpeed, throttle, gear, profile = getCarProfile()) {
  const gearSpeedBands = getGearSpeedBands(profile);
  if (profile.transmission === "manual") {
    if (gear <= 0) return throttle ? 1800 : 950;
    const { start: bandStart, end: bandEnd } = getManualGearBand(gear, profile);
    const gearProgress = THREE.MathUtils.clamp((Math.abs(forwardSpeed) - bandStart) / (bandEnd - bandStart), 0, 1.18);
    const rpm = THREE.MathUtils.lerp(1200, 6100, gearProgress);
    return THREE.MathUtils.clamp(rpm + throttle * 520, 850, 6600);
  }
  if (profile.kind === "stock" || profile.kind === "lmp") {
    if (gear <= 0) return throttle ? 3600 : 1400;
    const bandStart = gearSpeedBands[gear - 1];
    const bandEnd = gearSpeedBands[gear];
    const gearProgress = THREE.MathUtils.clamp((Math.abs(forwardSpeed) - bandStart) / (bandEnd - bandStart), 0, 1);
    const rpm = THREE.MathUtils.lerp(2400, 6800, gearProgress);
    return THREE.MathUtils.clamp(rpm + throttle * 650, 1200, 7200);
  }

  if (gear <= 0) return throttle ? 5200 : 2400;

  const bandStart = gearSpeedBands[gear - 1];
  const bandEnd = gearSpeedBands[gear];
  const gearProgress = THREE.MathUtils.clamp((Math.abs(forwardSpeed) - bandStart) / (bandEnd - bandStart), 0, 1);
  const rpm = THREE.MathUtils.lerp(5000, 11200, gearProgress);
  return THREE.MathUtils.clamp(rpm + throttle * 1100, 2600, 12000);
}

function getManualPowerScale(forwardSpeed, profile = getCarProfile()) {
  if (profile.transmission !== "manual" || carState.gear <= 0) return 1;
  const { start: bandStart, end: bandEnd } = getManualGearBand(carState.gear, profile);
  const speed = Math.abs(forwardSpeed);
  const gearProgress = THREE.MathUtils.clamp((speed - bandStart) / (bandEnd - bandStart), -0.6, 1.35);
  const mismatch = Math.max(0, bandStart - speed) / Math.max(bandStart, 1);
  const highGearFloor = [0, 1, 0.6, 0.5, 0.44, 0.38][carState.gear] ?? 0.38;
  const lugPenalty = THREE.MathUtils.lerp(1, highGearFloor, mismatch);
  const launchAssist = carState.gear === 1 ? 1 : lugPenalty;
  const torque = jeepGearTorque[carState.gear] ?? 0.4;
  const highRevFloor = carState.gear >= 4 ? 0.82 : 0.68;
  const revCurve = gearProgress < 0.16
    ? THREE.MathUtils.lerp(0.78, 0.96, Math.max(0, gearProgress) / 0.16)
    : gearProgress > 0.9
      ? THREE.MathUtils.lerp(0.92, highRevFloor, THREE.MathUtils.clamp((gearProgress - 0.9) / 0.3, 0, 1))
      : 1;
  return torque * launchAssist * revCurve;
}

function shiftManualGear(direction) {
  const profile = getCarProfile();
  if (profile.transmission !== "manual") return;
  carState.gear = THREE.MathUtils.clamp(carState.gear + direction, 1, 5);
  playShiftClunk();
}

function playShiftClunk() {
  if (!audioState.context) return;
  const now = audioState.context.currentTime;
  const clunk = audioState.context.createOscillator();
  const gain = audioState.context.createGain();
  clunk.type = "square";
  clunk.frequency.setValueAtTime(88, now);
  clunk.frequency.exponentialRampToValueAtTime(42, now + 0.08);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
  clunk.connect(gain);
  gain.connect(audioState.context.destination);
  clunk.start(now);
  clunk.stop(now + 0.16);
}

function openTrackEditor() {
  gameStarted = false;
  setPaused(false);
  keys.clear();
  startMenu.classList.add("is-hidden");
  trackEditor.classList.remove("is-hidden");
  updateTrackWidthReadout();
  updateCurveBendReadout();
  sceneryTypeSelect.closest(".editor-select")?.classList.add("is-hidden");
  renderTrackEditor();
}

function closeTrackEditor() {
  trackEditor.classList.add("is-hidden");
  startMenu.classList.remove("is-hidden");
  setMenuStep("intro");
}

function setEditorTool(tool) {
  editorTool = tool;
  for (const button of editorToolButtons) {
    button.classList.toggle("is-selected", button.dataset.editorTool === editorTool);
  }
  editorGhostPoint = null;
  sceneryTypeSelect.closest(".editor-select")?.classList.toggle("is-hidden", editorTool !== "scenery");
  renderTrackEditor();
}

function handleEditorPointerDown(event) {
  const point = getEditorPoint(event);
  if (!point) return;

  if (editorTool === "straight" || editorTool === "curve") {
    const curve = editorTool === "curve" ? Number(curveBendSlider.value) : 0;
    editorTrack.nodes.push({ ...point, width: Number(trackWidthSlider.value), curve });
    selectedEditorNode = editorTrack.nodes.length - 1;
  } else if (editorTool === "select") {
    selectedEditorNode = getNearestEditorNode(point);
    trackWidthSlider.value = editorTrack.nodes[selectedEditorNode]?.width ?? 12;
    curveBendSlider.value = editorTrack.nodes[selectedEditorNode]?.curve ?? 0;
  } else if (editorTool === "start") {
    editorTrack.startSegment = getNearestEditorSegment(point);
  } else if (editorTool === "pit") {
    editorTrack.pitLane.push({ ...point, width: 6, curve: 0 });
  } else if (editorTool === "scenery") {
    editorTrack.scenery.push({ type: sceneryTypeSelect.value, ...point });
  }

  updateTrackWidthReadout();
  updateCurveBendReadout();
  renderTrackEditor();
}

function handleEditorPointerMove(event) {
  editorGhostPoint = getEditorPoint(event);
  if (editorTool !== "straight" && editorTool !== "curve" && editorTool !== "pit") return;
  renderTrackEditor();
}

function getEditorPoint(event) {
  const rect = editorCanvas.getBoundingClientRect();
  return {
    x: THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 1000, 0, 1000),
    y: THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 700, 0, 700),
  };
}

function updateSelectedTrackWidth() {
  if (editorTrack.nodes[selectedEditorNode]) {
    editorTrack.nodes[selectedEditorNode].width = Number(trackWidthSlider.value);
  }
  updateTrackWidthReadout();
  renderTrackEditor();
}

function updateSelectedCurveBend() {
  if (editorTool === "select" && editorTrack.nodes[selectedEditorNode]) {
    editorTrack.nodes[selectedEditorNode].curve = Number(curveBendSlider.value);
  }
  updateCurveBendReadout();
  renderTrackEditor();
}

function updateTrackWidthReadout() {
  trackWidthReadout.textContent = `${Number(trackWidthSlider.value).toFixed(1).replace(".0", "")}m`;
}

function updateCurveBendReadout() {
  const bend = Number(curveBendSlider.value);
  const size = Math.abs(bend) < 0.18 ? "Soft" : Math.abs(bend) < 0.58 ? "Gentle" : "Tight";
  const direction = bend < -0.05 ? "L" : bend > 0.05 ? "R" : "Straight";
  curveBendReadout.textContent = direction === "Straight" ? "Straight" : `${size} ${direction}`;
}

function undoEditorAction() {
  if ((editorTool === "straight" || editorTool === "curve") && editorTrack.nodes.length > 0) {
    editorTrack.nodes.pop();
    selectedEditorNode = Math.max(0, editorTrack.nodes.length - 1);
  } else if (editorTool === "pit" && editorTrack.pitLane.length > 0) {
    editorTrack.pitLane.pop();
  } else if (editorTrack.scenery.length > 0) {
    editorTrack.scenery.pop();
  }
  renderTrackEditor();
}

function exportEditorTrack() {
  const exportData = {
    version: 2,
    name: editorTrack.name,
    closed: editorTrack.closed,
    startSegment: editorTrack.startSegment,
    nodes: editorTrack.nodes.map((node) => ({
      x: Math.round(node.x),
      y: Math.round(node.y),
      width: node.width,
      curve: Number((node.curve ?? 0).toFixed(2)),
    })),
    pitLane: editorTrack.pitLane.map((node) => ({ x: Math.round(node.x), y: Math.round(node.y), width: node.width })),
    scenery: editorTrack.scenery.map((item) => ({ type: item.type, x: Math.round(item.x), y: Math.round(item.y) })),
  };
  trackJsonOutput.value = JSON.stringify(exportData, null, 2);
}

function renderTrackEditor() {
  if (!editorCanvas) return;
  editorTrackLayer.innerHTML = "";
  editorNodeLayer.innerHTML = "";
  editorSceneryLayer.innerHTML = "";
  editorGhostLayer.innerHTML = "";

  renderEditorSegments(editorTrack.nodes, true, "editor-kerb", 8);
  renderEditorSegments(editorTrack.nodes, true, "editor-road", 0);
  renderEditorSegments(editorTrack.pitLane, false, "editor-pit", 0);
  renderEditorStartLine();
  renderEditorScenery();
  renderEditorNodes();
  renderEditorGhost();
  exportEditorTrack();
}

function renderEditorSegments(nodes, closed, className, widthOffset) {
  const segmentCount = closed ? nodes.length : Math.max(0, nodes.length - 1);
  if (nodes.length < 2) return;
  for (let i = 0; i < segmentCount; i += 1) {
    const a = nodes[i];
    const b = nodes[(i + 1) % nodes.length];
    const width = ((a.width ?? 10) + (b.width ?? 10)) * 0.5 + widthOffset;
    const attrs = {
      class: className,
      "stroke-width": width,
      d: getEditorSegmentPath(a, b, b.curve ?? 0),
    };
    editorTrackLayer.appendChild(svgElement("path", attrs));
  }
}

function getEditorSegmentPath(a, b, curve = 0) {
  if (Math.abs(curve) < 0.04) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const controlX = (a.x + b.x) * 0.5 + nx * length * curve * 0.55;
  const controlY = (a.y + b.y) * 0.5 + ny * length * curve * 0.55;
  return `M ${a.x} ${a.y} Q ${controlX} ${controlY} ${b.x} ${b.y}`;
}

function renderEditorStartLine() {
  if (editorTrack.nodes.length < 2) return;
  const a = editorTrack.nodes[editorTrack.startSegment % editorTrack.nodes.length];
  const b = editorTrack.nodes[(editorTrack.startSegment + 1) % editorTrack.nodes.length];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const cx = (a.x + b.x) * 0.5;
  const cy = (a.y + b.y) * 0.5;
  const width = (((a.width ?? 10) + (b.width ?? 10)) * 0.5 + 10) * 0.5;
  editorTrackLayer.appendChild(svgElement("line", {
    x1: cx - nx * width,
    y1: cy - ny * width,
    x2: cx + nx * width,
    y2: cy + ny * width,
    class: "editor-start-line",
  }));
}

function renderEditorNodes() {
  for (const [index, node] of editorTrack.nodes.entries()) {
    editorNodeLayer.appendChild(svgElement("circle", {
      cx: node.x,
      cy: node.y,
      r: index === selectedEditorNode ? 10 : 7,
      class: index === selectedEditorNode ? "editor-node is-selected" : "editor-node",
    }));
    const curveLabel = Math.abs(node.curve ?? 0) > 0.04 ? ` / ${node.curve > 0 ? "R" : "L"}` : "";
    editorNodeLayer.appendChild(svgElement("text", {
      x: node.x + 13,
      y: node.y - 10,
      class: "editor-node-label",
    }, `${node.width}m${curveLabel}`));
  }
}

function renderEditorScenery() {
  for (const item of editorTrack.scenery) {
    const symbol = { trees: "T", lamp: "L", building: "B", grandstand: "G" }[item.type] ?? "S";
    editorSceneryLayer.appendChild(svgElement("circle", {
      cx: item.x,
      cy: item.y,
      r: item.type === "grandstand" ? 18 : item.type === "building" ? 15 : 11,
      class: `editor-scenery editor-scenery-${item.type}`,
    }));
    editorSceneryLayer.appendChild(svgElement("text", {
      x: item.x,
      y: item.y + 5,
      class: "editor-scenery-label",
      "text-anchor": "middle",
    }, symbol));
  }
}

function renderEditorGhost() {
  if (!editorGhostPoint || (editorTool !== "straight" && editorTool !== "curve" && editorTool !== "pit")) return;
  const nodes = editorTool === "pit" ? editorTrack.pitLane : editorTrack.nodes;
  const last = nodes[nodes.length - 1];
  if (!last) return;
  const curve = editorTool === "curve" ? Number(curveBendSlider.value) : 0;
  editorGhostLayer.appendChild(svgElement("path", {
    d: getEditorSegmentPath(last, editorGhostPoint, curve),
    class: "editor-ghost-line",
  }));
}

function getNearestEditorNode(point) {
  let nearest = 0;
  let best = Infinity;
  for (const [index, node] of editorTrack.nodes.entries()) {
    const distance = Math.hypot(node.x - point.x, node.y - point.y);
    if (distance < best) {
      best = distance;
      nearest = index;
    }
  }
  return nearest;
}

function getNearestEditorSegment(point) {
  let nearest = 0;
  let best = Infinity;
  for (let i = 0; i < editorTrack.nodes.length; i += 1) {
    const a = editorTrack.nodes[i];
    const b = editorTrack.nodes[(i + 1) % editorTrack.nodes.length];
    const distance = distanceToSegment2D(point.x, point.y, a, b);
    if (distance < best) {
      best = distance;
      nearest = i;
    }
  }
  return nearest;
}

function svgElement(tag, attrs, textContent = "") {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }
  if (textContent) element.textContent = textContent;
  return element;
}
function selectCar(carId) {
  selectedCar = carId;
  for (const button of carButtons) {
    button.classList.toggle("is-selected", button.dataset.car === selectedCar);
  }

  scene.remove(car.root);
  car = createSelectedCar(selectedCar);
  scene.add(car.root);
  resetCar();
  updateMenuPreviewCar();
}

function selectCarCategory(category) {
  const defaultCars = {
    formula: "ferraro",
    lmp: "lmp",
    stock: "orange-stock",
    jeep: "dune-jeep",
  };
  selectCar(defaultCars[category] ?? "red");
  setMenuStep(category);
}

function selectTrack(trackId) {
  selectedTrack = trackId;
  for (const button of trackButtons) {
    button.classList.toggle("is-selected", button.dataset.track === selectedTrack);
  }

  scene.remove(track.group);
  track = createTrack(selectedTrack);
  scene.add(track.group);
  resetCar();
  updateMenuVisual();
}

function setMenuStep(step) {
  menuStep = step;
  const titles = {
    intro: "The Paddock",
    track: "Choose Track",
    "car-category": "Choose Class",
    formula: "Formula Paint",
    lmp: "Prototype Paint",
    stock: "Stock Paint",
    jeep: "Jeep Paint",
  };

  menuTitle.textContent = titles[menuStep] ?? titles.intro;
  for (const stepEl of menuSteps) {
    stepEl.classList.toggle("is-hidden", stepEl.dataset.menuStep !== menuStep);
  }
  updateMenuVisual();
}

function getSelectedCarLabel() {
  return document.querySelector(`[data-car="${selectedCar}"] strong`)?.textContent ?? "The Paddock";
}

function getSelectedTrackLabel() {
  return document.querySelector(`[data-track="${selectedTrack}"] strong`)?.textContent ?? "Practice Track";
}

function isPaintMenuStep() {
  return ["formula", "lmp", "stock", "jeep"].includes(menuStep);
}

function updateMenuVisual() {
  const visual = menuStep === "intro" ? "intro" : menuStep === "track" ? "track" : menuStep === "car-category" ? "driver" : "car";
  for (const visualEl of showroomVisuals) {
    visualEl.classList.toggle("is-hidden", visualEl.dataset.showroomVisual !== visual);
  }
  for (const map of trackMaps) {
    map.classList.toggle("is-hidden", map.dataset.trackMap !== selectedTrack);
    map.classList.toggle("is-selected", map.dataset.trackMap === selectedTrack);
  }
  menuPreviewCanvas.classList.toggle("is-hidden", visual !== "car");

  const labels = {
    intro: ["Ready to Roll", "Just Drive"],
    track: ["Selected Track", getSelectedTrackLabel()],
    "car-category": ["Pick a Garage", "Driver Ready"],
  };
  const [label, title] = labels[menuStep] ?? ["Selected Machine", getSelectedCarLabel()];
  const labelEl = previewTitle?.previousElementSibling;
  if (labelEl) labelEl.textContent = label;
  if (previewTitle) previewTitle.textContent = title;

  if (isPaintMenuStep()) {
    updateMenuPreviewCar();
  } else if (previewCar) {
    previewScene.remove(previewCar.root);
    previewCar = null;
    previewCarId = "";
  }
}

function updateMenuPreviewCar() {
  if (!menuPreviewReady || !menuPreviewCanvas || !isPaintMenuStep()) return;
  if (previewCarId === selectedCar) {
    if (previewTitle) previewTitle.textContent = getSelectedCarLabel();
    return;
  }
  previewCarId = selectedCar;
  if (previewCar) previewScene.remove(previewCar.root);
  previewCar = createSelectedCar(selectedCar);
  previewCar.root.position.set(0, 0, 0);
  previewCar.root.rotation.set(0, Math.PI * 0.18, 0);
  const scale = getCarProfile().kind === "jeep" ? 0.72 : getCarProfile().kind === "formula" ? 0.66 : 0.68;
  previewCar.root.scale.setScalar(scale);
  previewScene.add(previewCar.root);
  if (previewTitle) previewTitle.textContent = getSelectedCarLabel();
}

function updateMenuPreview(dt) {
  if (!isPaintMenuStep()) return;
  if (!previewCar) updateMenuPreviewCar();
  const width = Math.max(1, menuPreviewCanvas.clientWidth);
  const height = Math.max(1, menuPreviewCanvas.clientHeight);
  if (menuPreviewCanvas.width !== Math.floor(width * previewRenderer.getPixelRatio()) ||
      menuPreviewCanvas.height !== Math.floor(height * previewRenderer.getPixelRatio())) {
    previewRenderer.setSize(width, height, false);
    previewCamera.aspect = width / height;
    previewCamera.updateProjectionMatrix();
  }
  if (previewCar) {
    previewCar.root.rotation.y += dt * 0.42;
    previewCar.body.rotation.z = Math.sin(clock.elapsedTime * 1.6) * 0.012;
  }
  previewRenderer.render(previewScene, previewCamera);
}

function isMenuOpen() {
  return !startMenu.classList.contains("is-hidden");
}

function setPaused(paused) {
  isPaused = paused;
  pauseBadge.hidden = !isPaused || isMenuOpen();
  if (isPaused) keys.clear();
}

function togglePause() {
  setPaused(!isPaused);
}

function openCarSelectionMenu() {
  setPaused(true);
  setMenuStep("car-category");
  startMenu.classList.remove("is-hidden");
  pauseBadge.hidden = true;
  keys.clear();
}

function startGame() {
  gameStarted = true;
  setPaused(false);
  startMenu.classList.add("is-hidden");
  stopMenuMusic();
  startEngineAudio();
  forceAudioProbe();
  resetCar();
}

function startMenuMusic() {
  if (gameStarted) return;

  if (!menuAudio.element) {
    menuAudio.element = new Audio(MENU_THEME_SRC);
    menuAudio.element.loop = true;
    menuAudio.element.preload = "auto";
    menuAudio.element.volume = 0.5;
  }
  menuAudio.element.play().catch(() => {});
}

function stopMenuMusic() {
  if (menuAudio.element) {
    menuAudio.element.pause();
    menuAudio.element.currentTime = 0;
    menuAudio.element = null;
  }

}

function startEngineAudio() {
  if (audioState.element) {
    audioState.element.play().catch(() => {});
    audioState.ersElement?.play().catch(() => {});
    audioState.brakeElement?.play().catch(() => {});
    return;
  }

  if (audioState.context) {
    if (audioState.context.state === "suspended") audioState.context.resume();
    return;
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    audioState.element = createLoopAudio("engine");
    audioState.ersElement = createLoopAudio("ers");
    audioState.brakeElement = createLoopAudio("brake");
    audioState.element.volume = 0.34;
    audioState.element.playbackRate = 0.8;
    audioState.ersElement.volume = 0;
    audioState.ersElement.playbackRate = 1;
    audioState.brakeElement.volume = 0;
    audioState.element.play().catch(() => {});
    audioState.ersElement.play().catch(() => {});
    audioState.brakeElement.play().catch(() => {});
    return;
  }

  const context = new AudioContext();
  const engine = context.createOscillator();
  const sub = context.createOscillator();
  const grumble = context.createOscillator();
  const ers = context.createOscillator();
  const brake = context.createOscillator();
  const filter = context.createBiquadFilter();
  const lowShelf = context.createBiquadFilter();
  const engineGain = context.createGain();
  const subGain = context.createGain();
  const grumbleGain = context.createGain();
  const ersGain = context.createGain();
  const brakeGain = context.createGain();
  const master = context.createGain();
  const shiftGain = context.createGain();
  const compressor = context.createDynamicsCompressor();

  engine.type = "triangle";
  sub.type = "triangle";
  grumble.type = "sine";
  ers.type = "sawtooth";
  brake.type = "sawtooth";
  filter.type = "lowpass";
  filter.Q.value = 1.4;
  lowShelf.type = "lowshelf";
  lowShelf.frequency.value = 220;
  lowShelf.gain.value = 9;
  engineGain.gain.value = 0;
  subGain.gain.value = 0;
  grumbleGain.gain.value = 0;
  ersGain.gain.value = 0;
  brakeGain.gain.value = 0;
  shiftGain.gain.value = 1;
  compressor.threshold.value = -18;
  compressor.knee.value = 18;
  compressor.ratio.value = 5;
  master.gain.value = 0.85;

  engine.connect(filter);
  filter.connect(lowShelf);
  lowShelf.connect(engineGain);
  engineGain.connect(master);
  sub.connect(subGain);
  subGain.connect(master);
  grumble.connect(grumbleGain);
  grumbleGain.connect(master);
  ers.connect(ersGain);
  ersGain.connect(master);
  brake.connect(brakeGain);
  brakeGain.connect(master);
  shiftGain.connect(master);
  master.connect(compressor);
  compressor.connect(context.destination);

  engine.start();
  sub.start();
  grumble.start();
  ers.start();
  brake.start();

  audioState.context = context;
  audioState.engine = engine;
  audioState.sub = sub;
  audioState.grumble = grumble;
  audioState.ers = ers;
  audioState.brake = brake;
  audioState.engineGain = engineGain;
  audioState.subGain = subGain;
  audioState.grumbleGain = grumbleGain;
  audioState.ersGain = ersGain;
  audioState.brakeGain = brakeGain;
  audioState.filter = filter;
  audioState.lowShelf = lowShelf;
  audioState.shiftGain = shiftGain;
}

function updateEngineAudio(dt, forwardSpeed, throttle, boostActive, profile, hardBraking = false) {
  if (audioState.element) {
    const rpmRatio = profile.kind === "stock" || profile.kind === "lmp"
      ? THREE.MathUtils.clamp((carState.rpm - 1200) / 6000, 0, 1)
      : THREE.MathUtils.clamp((carState.rpm - 2200) / 9800, 0, 1);
    audioState.element.playbackRate = profile.kind === "stock" || profile.kind === "lmp"
      ? THREE.MathUtils.lerp(0.58, 1.25, rpmRatio)
      : THREE.MathUtils.lerp(0.72, 1.85, rpmRatio);
    audioState.element.volume = THREE.MathUtils.lerp(0.08, profile.kind === "formula" ? 0.72 : 0.62, throttle ? 1 : 0.2);
    if (audioState.ersElement) {
      const ersTargetVolume = boostActive && profile.hasErs ? 0.082 : 0;
      audioState.ersElement.volume = THREE.MathUtils.damp(audioState.ersElement.volume, ersTargetVolume, boostActive ? 8 : 3.2, dt);
      audioState.ersElement.playbackRate = THREE.MathUtils.lerp(0.72, 1.18, rpmRatio);
    }
    if (audioState.brakeElement) {
      audioState.brakeElement.volume = THREE.MathUtils.damp(audioState.brakeElement.volume, hardBraking ? 0.24 : 0, hardBraking ? 10 : 4, dt);
    }
    return;
  }

  if (!audioState.context) return;

  const now = audioState.context.currentTime;
  const rpmRatio = profile.kind === "jeep"
    ? THREE.MathUtils.clamp((carState.rpm - 900) / 5200, 0, 1)
    : profile.kind === "stock" || profile.kind === "lmp"
      ? THREE.MathUtils.clamp((carState.rpm - 1200) / 6000, 0, 1)
      : THREE.MathUtils.clamp((carState.rpm - 2200) / 9800, 0, 1);
  const jeepShiftCue = profile.kind === "jeep" && rpmRatio > 0.86;
  const throttleLift = throttle ? 1 : 0.48;
  const baseFrequency =
    profile.kind === "jeep"
      ? THREE.MathUtils.lerp(34, 170, rpmRatio)
      : profile.kind === "stock"
      ? THREE.MathUtils.lerp(44, 205, rpmRatio)
      : profile.kind === "lmp"
        ? THREE.MathUtils.lerp(58, 270, rpmRatio)
        : THREE.MathUtils.lerp(68, 360, rpmRatio);
  const v8Pulse = profile.kind === "formula" ? baseFrequency * 0.5 : profile.kind === "jeep" ? baseFrequency * 0.48 : baseFrequency * 0.62;

  audioState.engine.frequency.setTargetAtTime(baseFrequency, now, 0.035);
  audioState.sub.frequency.setTargetAtTime(v8Pulse, now, 0.045);
  audioState.grumble.frequency.setTargetAtTime(Math.max(profile.kind === "formula" ? 34 : 28, v8Pulse * 0.55), now, 0.055);
  audioState.ers.frequency.setTargetAtTime(THREE.MathUtils.lerp(245, 520, rpmRatio), now, 0.08);
  audioState.brake.frequency.setTargetAtTime(
    hardBraking ? THREE.MathUtils.lerp(1400, 2600, rpmRatio) : THREE.MathUtils.lerp(92, 128, rpmRatio),
    now,
    0.025,
  );
  audioState.filter.frequency.setTargetAtTime(
    profile.kind === "jeep"
      ? THREE.MathUtils.lerp(300, 980, rpmRatio)
      : profile.kind === "stock"
      ? THREE.MathUtils.lerp(420, 1450, rpmRatio)
      : profile.kind === "lmp"
        ? THREE.MathUtils.lerp(520, 1900, rpmRatio)
        : THREE.MathUtils.lerp(650, 2600, rpmRatio),
    now,
    0.035,
  );
  audioState.lowShelf.gain.setTargetAtTime(profile.kind === "jeep" ? 15 : profile.kind === "formula" ? THREE.MathUtils.lerp(10, 4, rpmRatio) : 10, now, 0.08);
  audioState.engineGain.gain.setTargetAtTime(
    profile.kind === "formula"
      ? 0.05 + rpmRatio * 0.15 * throttleLift
      : profile.kind === "jeep"
        ? 0.096 + rpmRatio * 0.18 * throttleLift
        : 0.045 + rpmRatio * 0.12 * throttleLift,
    now,
    0.04,
  );
  audioState.subGain.gain.setTargetAtTime(
    profile.kind === "formula"
      ? 0.055 + (1 - rpmRatio) * 0.04 + throttle * 0.085
      : profile.kind === "jeep"
        ? 0.192 + throttle * 0.192
        : 0.08 + throttle * 0.11,
    now,
    0.06,
  );
  audioState.grumbleGain.gain.setTargetAtTime(
    profile.kind === "formula"
      ? 0.018 + throttle * 0.11 + (1 - rpmRatio) * 0.012
      : profile.kind === "jeep"
        ? 0.108 + throttle * 0.24 + (1 - rpmRatio) * 0.06
        : 0.055 + throttle * 0.14 + (1 - rpmRatio) * 0.025,
    now,
    0.08,
  );
  audioState.ersGain.gain.setTargetAtTime(boostActive && profile.hasErs ? 0.025 : 0.0001, now, boostActive ? 0.16 : 0.18);
  audioState.brakeGain.gain.setTargetAtTime(
    hardBraking ? 0.08 : jeepShiftCue ? 0.028 : 0.0001,
    now,
    hardBraking ? 0.05 : 0.12,
  );

  audioState.lastGear = carState.gear;

  if (Math.abs(forwardSpeed) < 0.5 && !throttle) {
    audioState.engine.frequency.setTargetAtTime(82, now, 0.08);
  }
}

function forceAudioProbe() {
  if (audioState.element) {
    audioState.element.play().catch(() => {});
    audioState.ersElement?.play().catch(() => {});
    return;
  }

  if (!audioState.context) return;

  const context = audioState.context;
  const now = context.currentTime;
  const beep = context.createOscillator();
  const gain = context.createGain();
  beep.type = "sine";
  beep.frequency.setValueAtTime(180, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.28, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  beep.connect(gain);
  gain.connect(context.destination);
  beep.start(now);
  beep.stop(now + 0.24);
}

function createLoopAudio(kind) {
  const audio = new Audio(makeWavDataUri(kind));
  audio.loop = true;
  audio.preload = "auto";
  return audio;
}

function makeWavDataUri(kind) {
  const sampleRate = 22050;
  const seconds = kind === "menu" ? 1.52 : kind === "ers" ? 0.55 : kind === "brake" ? 0.42 : 0.7;
  const sampleCount = Math.floor(sampleRate * seconds);
  const data = new Int16Array(sampleCount);

  for (let i = 0; i < sampleCount; i += 1) {
    const t = i / sampleRate;
    const sample =
      kind === "menu"
        ? bassSample(t)
        : kind === "ers"
          ? ersSample(t)
          : kind === "brake"
            ? brakeSample(t)
          : engineSample(t);
    data[i] = Math.max(-1, Math.min(1, sample)) * 32767;
  }

  const byteCount = 44 + data.length * 2;
  const bytes = new Uint8Array(byteCount);
  const view = new DataView(bytes.buffer);
  writeAscii(bytes, 0, "RIFF");
  view.setUint32(4, byteCount - 8, true);
  writeAscii(bytes, 8, "WAVE");
  writeAscii(bytes, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(bytes, 36, "data");
  view.setUint32(40, data.length * 2, true);

  for (let i = 0; i < data.length; i += 1) {
    view.setInt16(44 + i * 2, data[i], true);
  }

  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function bassSample(t) {
  const notes = [55, 55, 73.42, 65.41];
  const beat = Math.floor(t / 0.38) % notes.length;
  const local = (t % 0.38) / 0.38;
  const note = notes[beat];
  const envelope = Math.exp(-local * 3.8);
  return (
    Math.sin(Math.PI * 2 * note * t) * 0.72 +
    Math.sin(Math.PI * 2 * note * 2 * t) * 0.22
  ) * envelope * 0.65;
}

function engineSample(t) {
  const pulse = 92;
  const main = Math.sin(Math.PI * 2 * pulse * t);
  const sub = Math.sin(Math.PI * 2 * pulse * 0.5 * t);
  const harmonic = Math.sin(Math.PI * 2 * pulse * 2 * t) * 0.18;
  const burble = Math.sin(Math.PI * 2 * 36 * t) * Math.sin(Math.PI * 2 * 5.5 * t);
  return main * 0.34 + sub * 0.42 + harmonic + burble * 0.08;
}

function ersSample(t) {
  const sweep = 335 + Math.sin(Math.PI * 2 * 17 * t) * 34;
  const buzz = Math.sign(Math.sin(Math.PI * 2 * sweep * t)) * 0.24;
  const wings = Math.sin(Math.PI * 2 * 650 * t + Math.sin(Math.PI * 2 * 23 * t) * 0.9) * 0.16;
  const tremolo = 0.48 + Math.sin(Math.PI * 2 * 15 * t) * 0.15;
  return (buzz + wings) * tremolo;
}

function brakeSample(t) {
  const squeal = Math.sin(Math.PI * 2 * (1600 + Math.sin(t * 90) * 260) * t) * 0.34;
  const scrape = Math.sign(Math.sin(Math.PI * 2 * 3100 * t)) * 0.08;
  return (squeal + scrape) * (0.75 + Math.sin(Math.PI * 2 * 9 * t) * 0.18);
}

function writeAscii(bytes, offset, text) {
  for (let i = 0; i < text.length; i += 1) {
    bytes[offset + i] = text.charCodeAt(i);
  }
}

function playShiftPop(now, baseFrequency) {
  const context = audioState.context;
  const pop = context.createOscillator();
  const popGain = context.createGain();
  pop.type = "square";
  pop.frequency.setValueAtTime(baseFrequency * 1.35, now);
  pop.frequency.exponentialRampToValueAtTime(Math.max(70, baseFrequency * 0.45), now + 0.09);
  popGain.gain.setValueAtTime(0.001, now);
  popGain.gain.exponentialRampToValueAtTime(0.09, now + 0.012);
  popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
  pop.connect(popGain);
  popGain.connect(audioState.shiftGain);
  pop.start(now);
  pop.stop(now + 0.12);
}

function pressed(...codes) {
  return codes.some((code) => keys.has(code));
}

function moveToward(value, target, amount) {
  if (value < target) return Math.min(value + amount, target);
  if (value > target) return Math.max(value - amount, target);
  return target;
}

function resetCar() {
  carState.position.set(track.start.x, track.groundY, track.start.z);
  carState.velocity.set(0, 0, 0);
  carState.heading = track.start.heading;
  carState.yawRate = 0;
  carState.steer = 0;
  carState.wheelSpin = 0;
  carState.gear = 0;
  if (getCarProfile().transmission === "manual") carState.gear = 1;
  carState.rpm = 2400;
  carState.ers = 100;
  carState.grassBump = 0;
  carState.grassRockRoll = 0;
  carState.grassRockPitch = 0;
  updateErsHud();
  updateRevMeter();
  cameraPosition
    .copy(carState.position)
    .add(new THREE.Vector3(-8 * Math.sin(carState.heading), 5.2, -8 * Math.cos(carState.heading)));
  cameraTarget.copy(carState.position);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});















