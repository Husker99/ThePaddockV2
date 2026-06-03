import * as THREE from "../node_modules/three/build/three.module.js";
import "./styles.css";
import kataraSpeedwayTrack from "./tracks/katara-speedway.json";
import kyoshiCircuitTrack from "./tracks/kyoshi-circuit.json";
import makoCityTrack from "./tracks/mako-city.json";
import yueRingTrack from "./tracks/yue-ring.json";
import kataraStockCyborgTraining from "./ai-training/katara-speedway-stock-cyborg-training.json";

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
const timeTrialGameButton = document.querySelector("#time-trial-game");
const quickRaceGameButton = document.querySelector("#quick-race-game");
const openTrackEditorButton = document.querySelector("#open-track-editor");
const trackEditor = document.querySelector("#track-editor");
const editorCanvas = document.querySelector("#track-editor-canvas");
const editorStartButtons = [...document.querySelectorAll("[data-editor-start]")];
const menuNextButtons = [...document.querySelectorAll("[data-menu-next]")];
const editorTrackLayer = document.querySelector("#editor-track-layer");
const editorNodeLayer = document.querySelector("#editor-node-layer");
const editorSceneryLayer = document.querySelector("#editor-scenery-layer");
const editorSceneryTopLayer = document.querySelector("#editor-scenery-top-layer");
const editorGhostLayer = document.querySelector("#editor-ghost-layer");
const editorToolButtons = [...document.querySelectorAll("[data-editor-tool]")];
const trackWidthSlider = document.querySelector("#track-width-slider");
const trackWidthControl = trackWidthSlider?.closest(".editor-slider");
const trackWidthReadout = document.querySelector("#track-width-readout");
const curveBendSlider = document.querySelector("#curve-bend-slider");
const curveBendControl = curveBendSlider?.closest(".editor-slider");
const curveBendReadout = document.querySelector("#curve-bend-readout");
const sceneryTypeSelect = document.querySelector("#scenery-type-select");
const trackNameInput = document.querySelector("#track-name-input");
const trackTimeOfDaySelect = document.querySelector("#track-time-of-day-select");
const trackEnvironmentSelect = document.querySelector("#track-environment-select");
const trackEssentialsPanel = document.querySelector("#track-essentials-panel");
const roadOptionsPanel = document.querySelector("#road-options");
const roadFeatureInputs = [...document.querySelectorAll("[data-road-feature]")];
const editorStatus = document.querySelector("#editor-status");
const editorUndoButton = document.querySelector("#editor-undo");
const editorExportButton = document.querySelector("#editor-export");
const editorBackButton = document.querySelector("#editor-back");
const editorTestDriveButton = document.querySelector("#editor-test-drive");
const backToEditorButton = document.querySelector("#back-to-editor");
const editorZoomSlider = document.querySelector("#editor-zoom-slider");
const editorZoomReadout = document.querySelector("#editor-zoom-readout");
const editorZoomOutButton = document.querySelector("#editor-zoom-out");
const editorZoomInButton = document.querySelector("#editor-zoom-in");
const trackJsonOutput = document.querySelector("#track-json-output");
const trackNextButton = document.querySelector("#track-next");
const startButton = document.querySelector("#start-race");
const startRaceButtons = [...document.querySelectorAll("[data-start-race], #start-race")];
const quickRaceStartButton = document.querySelector("#quick-race-start");
const timeTrialStandardButton = document.querySelector("#time-trial-standard");
const timeTrialRecordLineButton = document.querySelector("#time-trial-record-line");
const timeTrialSetupStartButton = document.querySelector("#time-trial-setup-start");
const aiOpponentsBackButton = document.querySelector("#ai-opponents-back");
const aiOpponentSlider = document.querySelector("#ai-opponent-slider");
const aiOpponentReadout = document.querySelector("#ai-opponent-readout");
const gridPositionSlider = document.querySelector("#grid-position-slider");
const gridPositionReadout = document.querySelector("#grid-position-readout");
const carButtons = [...document.querySelectorAll("[data-car]")];
const carCategoryButtons = [...document.querySelectorAll("[data-car-category]")];
const backButtons = [...document.querySelectorAll("[data-menu-back]")];
const trackButtons = [...document.querySelectorAll("[data-track]")];
const speedEl = document.querySelector("#speed");
const gearEl = document.querySelector("#gear");
const surfaceEl = document.querySelector("#surface");
const ersPanelEl = document.querySelector(".ers-panel");
const ersControlHintEl = document.querySelector("#ers-control-hint");
const ersLabelEl = document.querySelector("#ers-label");
const ersFillEl = document.querySelector("#ers-fill");
const ersReadoutEl = document.querySelector("#ers-readout");
const pauseBadge = document.querySelector("#pause-badge");
const revMeterEl = document.querySelector("#rev-meter");
const revFillEl = document.querySelector("#rev-fill");
const manualGearEl = document.querySelector("#manual-gear");
const timeTrialTimerEl = document.querySelector("#time-trial-timer");
const timeTrialTimerValueEl = document.querySelector("#time-trial-timer-value");
const timeTrialSegmentEls = [...document.querySelectorAll("#time-trial-segments span")];
const timeTrialMessageEl = document.querySelector("#time-trial-message");
const raceCountdownEl = document.querySelector("#race-countdown");
const timeTrialResultsEl = document.querySelector("#time-trial-results");
const timeTrialLapsEl = document.querySelector("#time-trial-laps");
const drivingLineRecorderEl = document.querySelector("#driving-line-recorder");
const drivingLineStatusEl = document.querySelector("#driving-line-status");
const drivingLineExportButton = document.querySelector("#driving-line-export");
const aiDebugPanelEl = document.querySelector("#ai-debug-panel");
const aiDebugStatusEl = document.querySelector("#ai-debug-status");
const aiDebugDetailEl = document.querySelector("#ai-debug-detail");
const audioBasePath = `${import.meta.env.BASE_URL}audio/`;
const MENU_THEME_SRC = `${audioBasePath}the-paddock-theme.mp3`;
const EDITOR_MUSIC_SRCS = [`${audioBasePath}track-editor-1.mp3`, `${audioBasePath}track-editor-2.mp3`];

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
const skyDomeMaterial = new THREE.ShaderMaterial({
  side: THREE.BackSide,
  depthWrite: false,
  fog: false,
  uniforms: {
    eastColor: { value: new THREE.Color(0x173d79) },
    westColor: { value: new THREE.Color(0xff8fa0) },
    horizonColor: { value: new THREE.Color(0xffbf7c) },
    zenithColor: { value: new THREE.Color(0x0f2c58) },
  },
  vertexShader: `
    varying vec3 vWorldDirection;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldDirection = normalize(position);
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    varying vec3 vWorldDirection;
    uniform vec3 eastColor;
    uniform vec3 westColor;
    uniform vec3 horizonColor;
    uniform vec3 zenithColor;
    void main() {
      float westMix = 1.0 - smoothstep(-0.85, 0.85, vWorldDirection.x);
      float horizon = pow(1.0 - clamp(abs(vWorldDirection.y), 0.0, 1.0), 2.25);
      float zenith = smoothstep(0.12, 0.9, vWorldDirection.y);
      vec3 horizontalGradient = mix(eastColor, westColor, westMix);
      vec3 color = mix(horizontalGradient, horizonColor, horizon * 0.45);
      color = mix(color, zenithColor, zenith * 0.25);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
});
const skyDome = new THREE.Mesh(new THREE.SphereGeometry(650, 48, 24), skyDomeMaterial);
skyDome.visible = false;
scene.add(skyDome);
const moonGroup = new THREE.Group();
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xf3f0d6, fog: false, depthWrite: false, depthTest: false });
const moonCutoutMaterial = new THREE.MeshBasicMaterial({ color: 0x101b2d, fog: false, depthWrite: false, depthTest: false });
const moonFace = new THREE.Mesh(new THREE.CircleGeometry(10, 42), moonMaterial);
const moonCutout = new THREE.Mesh(new THREE.CircleGeometry(9.4, 42), moonCutoutMaterial);
moonCutout.position.set(4.1, 0.8, 0.08);
moonGroup.add(moonFace, moonCutout);
moonGroup.visible = false;
scene.add(moonGroup);

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

const TIME_OF_DAY_SETTINGS = {
  day: {
    background: 0xa9d7f0,
    fog: 0xa9d7f0,
    fogNear: 120,
    fogFar: 330,
    hemiSky: 0xeef8ff,
    hemiGround: 0x6f8b4a,
    hemiIntensity: 2.4,
    sunColor: 0xfff1c8,
    sunIntensity: 3.7,
    sunPosition: [-60, 95, 42],
  },
  sunset: {
    background: 0xff8fa0,
    fog: 0xdc7c55,
    fogNear: 95,
    fogFar: 300,
    hemiSky: 0xffc18a,
    hemiGround: 0x4c3b42,
    hemiIntensity: 1.65,
    sunColor: 0xff9a4d,
    sunIntensity: 3.15,
    sunPosition: [-105, 32, 18],
  },
  night: {
    background: 0x101b2d,
    fog: 0x101b2d,
    fogNear: 78,
    fogFar: 275,
    hemiSky: 0x4b638c,
    hemiGround: 0x05070a,
    hemiIntensity: 0.82,
    sunColor: 0xb9d0ff,
    sunIntensity: 0.72,
    sunPosition: [-30, 65, -58],
  },
};
let activeTimeOfDay = "day";

function shouldDefaultHeadlightsOn() {
  return activeTimeOfDay === "sunset" || activeTimeOfDay === "night";
}

function applyTimeOfDay(timeOfDay = "day") {
  const setting = TIME_OF_DAY_SETTINGS[timeOfDay] ?? TIME_OF_DAY_SETTINGS.day;
  activeTimeOfDay = TIME_OF_DAY_SETTINGS[timeOfDay] ? timeOfDay : "day";
  scene.background = new THREE.Color(setting.background);
  scene.fog = new THREE.Fog(setting.fog, setting.fogNear, setting.fogFar);
  skyDome.visible = activeTimeOfDay === "sunset";
  moonGroup.visible = activeTimeOfDay === "night";
  if (lampGroundGlowMaterial) lampGroundGlowMaterial.opacity = activeTimeOfDay === "day" ? 0.16 : 0.72;
  hemiLight.color.setHex(setting.hemiSky);
  hemiLight.groundColor.setHex(setting.hemiGround);
  hemiLight.intensity = setting.hemiIntensity;
  sun.color.setHex(setting.sunColor);
  sun.intensity = setting.sunIntensity;
  sun.position.set(...setting.sunPosition);
}

function sceneryLightIntensity(baseIntensity, role = "ambient") {
  const sunsetMultiplier = role === "lamp" ? 5.2 : 1.75;
  const nightMultiplier = role === "lamp" ? 6.4 : 2.25;
  if (activeTimeOfDay === "sunset") return baseIntensity * sunsetMultiplier;
  if (activeTimeOfDay === "night") return baseIntensity * nightMultiplier;
  return baseIntensity;
}

function sceneryLightDistance(baseDistance, role = "ambient") {
  const sunsetMultiplier = role === "lamp" ? 2.7 : 1.18;
  const nightMultiplier = role === "lamp" ? 3 : 1.3;
  if (activeTimeOfDay === "sunset") return baseDistance * sunsetMultiplier;
  if (activeTimeOfDay === "night") return baseDistance * nightMultiplier;
  return baseDistance;
}

function addSoftLightBand(parent, count, spacing, y, z, color, intensity, distance) {
  for (let i = 0; i < count; i += 1) {
    const light = new THREE.PointLight(color, intensity / count, distance, 1.35);
    light.position.set((i - (count - 1) * 0.5) * spacing, y, z);
    parent.add(light);
  }
}

function registerSceneryLight(light, maxDistance = 125) {
  light.userData.maxDistanceSq = maxDistance * maxDistance;
  sceneryLights.push(light);
  return light;
}

function registerSceneryCullable(object, maxDistance = 520) {
  object.userData.visibleDistanceSq = maxDistance * maxDistance;
  object.userData.hiddenDistanceSq = (maxDistance * 1.16) ** 2;
  sceneryCullables.push(object);
  return object;
}

let lampGroundGlowMaterial = null;

function getLampGroundGlowMaterial() {
  if (lampGroundGlowMaterial) return lampGroundGlowMaterial;
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 256;
  textureCanvas.height = 256;
  const context = textureCanvas.getContext("2d");
  const gradient = context.createRadialGradient(128, 118, 6, 128, 132, 125);
  gradient.addColorStop(0, "rgba(255, 222, 132, 0.56)");
  gradient.addColorStop(0.28, "rgba(255, 196, 92, 0.34)");
  gradient.addColorStop(0.66, "rgba(255, 151, 66, 0.13)");
  gradient.addColorStop(1, "rgba(255, 151, 66, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  lampGroundGlowMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: activeTimeOfDay === "day" ? 0.16 : 0.72,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  return lampGroundGlowMaterial;
}

function addBuildingWindows(building, spec, glassMaterial, litWindowMaterial) {
  const rows = Math.max(1, Math.floor(spec.height / 4.2));
  const columns = Math.max(2, Math.floor(spec.width / 2.55));
  const startY = Math.min(2.2, spec.height * 0.32);
  const rowSpacing = Math.max(1.35, (spec.height - startY - 1.1) / Math.max(1, rows - 1));
  const columnSpacing = spec.width / (columns + 1);
  const baseWindowGeometry = new THREE.BoxGeometry(0.46, 0.36, 0.04);
  const frontLitGeometries = [];
  const frontGlassGeometries = [];
  const sideLitGeometries = [];
  const sideGlassGeometries = [];
  const transform = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const scale = new THREE.Vector3(1, 1, 1);
  const frontRotation = new THREE.Quaternion();
  const rightRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI * 0.5, 0));
  const leftRotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI * 0.5, 0));

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      if ((row * columns + column) % 3 !== 0) continue;
      const localX = spec.x - spec.width * 0.5 + columnSpacing * (column + 1);
      const localY = startY + row * rowSpacing;
      const target = (row + column) % 5 === 0 ? frontLitGeometries : frontGlassGeometries;
      position.set(localX, localY, spec.z + spec.depth / 2 + 0.035);
      transform.compose(position, frontRotation, scale);
      target.push(baseWindowGeometry.clone().applyMatrix4(transform));
    }
  }

  const sideRows = Math.max(1, Math.floor(spec.height / 5.4));
  const sideColumns = Math.max(1, Math.floor(spec.depth / 3.4));
  const sideRowSpacing = Math.max(1.5, (spec.height - startY - 1.1) / Math.max(1, sideRows - 1));
  const sideColumnSpacing = spec.depth / (sideColumns + 1);
  for (let row = 0; row < sideRows; row += 1) {
    for (let column = 0; column < sideColumns; column += 1) {
      if ((row * sideColumns + column) % 3 !== 0) continue;
      const localY = startY + row * sideRowSpacing;
      const localZ = spec.z - spec.depth * 0.5 + sideColumnSpacing * (column + 1);
      for (const side of [-1, 1]) {
        const target = (row + column + (side > 0 ? 1 : 3)) % 5 === 0 ? sideLitGeometries : sideGlassGeometries;
        position.set(spec.x + side * (spec.width * 0.5 + 0.035), localY, localZ);
        transform.compose(position, side > 0 ? rightRotation : leftRotation, scale);
        target.push(baseWindowGeometry.clone().applyMatrix4(transform));
      }
    }
  }

  const windowMeshes = [
    [frontGlassGeometries, glassMaterial],
    [frontLitGeometries, litWindowMaterial],
    [sideGlassGeometries, glassMaterial],
    [sideLitGeometries, litWindowMaterial],
  ];
  for (const [geometries, material] of windowMeshes) {
    const mergedGeometry = mergeBufferGeometries(geometries);
    if (!mergedGeometry) continue;
    const mesh = new THREE.Mesh(mergedGeometry, material);
    building.add(mesh);
  }

  baseWindowGeometry.dispose();
}

function updateSkyObjects() {
  skyDome.position.copy(camera.position);
  moonGroup.position.copy(camera.position).add(new THREE.Vector3(-145, 118, -210));
  moonGroup.lookAt(camera.position);
}

function randomBuildingVariant(type) {
  if (type === "building-small") return SMALL_BUILDING_VARIANTS[Math.floor(Math.random() * SMALL_BUILDING_VARIANTS.length)].id;
  if (type === "building-skyscraper" || type === "building-super-tall") return SKYSCRAPER_VARIANTS[Math.floor(Math.random() * SKYSCRAPER_VARIANTS.length)].id;
  return undefined;
}

function buildingVariantColor(type, variantId) {
  if (type === "building-small") return (SMALL_BUILDING_VARIANTS.find((variant) => variant.id === variantId) ?? SMALL_BUILDING_VARIANTS[0]).color;
  if (type === "building-skyscraper" || type === "building-super-tall") return (SKYSCRAPER_VARIANTS.find((variant) => variant.id === variantId) ?? SKYSCRAPER_VARIANTS[0]).color;
  return null;
}

const keys = new Set();
let gameStarted = false;
let isPaused = false;
let menuStep = "intro";
let selectedGameMode = "drive";
let selectedAiOpponentCount = 3;
let selectedGridPosition = 1;
let quickRacePaintStep = "formula";
let selectedTimeTrialMode = "standard";
let selectedCar = "ferraro";
let selectedTrack = "katara-speedway";
let cameraMode = "chase";
let editorTool = "select";
let selectedEditorNode = 0;
let selectedEditorSegment = 0;
let selectedEditorScenery = -1;
let draggedEditorNode = null;
let draggedEditorCurveSegment = null;
let editorGhostPoint = null;
let isEditorTestDrive = false;
let pendingEditorUndoSnapshot = null;
const editorUndoStack = [];
const timeTrialState = {
  running: false,
  currentTime: 0,
  laps: [],
  latestLapId: 0,
  lastLineSide: null,
  lastSegmentSides: [null, null],
  currentSegmentIndex: 0,
  currentSegmentStartTime: 0,
  currentSegments: [0, 0, 0],
  segmentStatuses: [null, null, null],
  heldSegmentStatuses: [null, null, null],
  segmentStatusHoldTime: 0,
  bestLapSegments: null,
  fastestSegments: null,
  invalidated: false,
  wallPenaltyCooldown: 0,
  wallPenaltyMessageTime: 0,
  trackLimitsPenaltyCooldown: 0,
  trackLimitsPenaltyMessageTime: 0,
};
const drivingLineRecorder = {
  active: false,
  currentLapSamples: [],
  laps: [],
  sampleTimer: 0,
  lapStartTime: 0,
  currentLapClean: true,
  lastExportName: "",
};
const raceCountdownState = {
  active: false,
  elapsed: 0,
  hideTime: 0,
  lastCue: "",
};
const EDITOR_GRANDSTAND_FRONT_EDGE = 8.8;
const EDITOR_GRANDSTAND_WALL_GAP = 1.1;
const EDITOR_WALL_OUTER_EDGE = 0.85;
const EDITOR_WORLD_WIDTH = 18000;
const EDITOR_WORLD_HEIGHT = 12600;
const EDITOR_DEFAULT_ZOOM = 1;
const EDITOR_VISUAL_SCALE = 15;
const EDITOR_TRACK_VISUAL_SCALE = 20;
const TRACK_NAME_OPTIONS = [
  "Silverstone Park",
  "Monza Autodromo",
  "Suzuka International",
  "Spa Valley Circuit",
  "Interlagos Raceway",
  "Laguna Ridge",
  "Daytona Road Course",
  "Brands Hatch GP",
  "Imola Grand Prix",
  "Mount Panorama Circuit",
];
const SMALL_BUILDING_VARIANTS = [
  { id: "grey", color: 0xb8bec4 },
  { id: "pink", color: 0xf0a9bd },
  { id: "pale-yellow", color: 0xf2df8f },
];
const SKYSCRAPER_VARIANTS = [
  { id: "dark-grey", color: 0x2f343a },
  { id: "dark-blue-grey", color: 0x273a4a },
];
let editorZoom = EDITOR_DEFAULT_ZOOM;
const editorViewCenter = {
  x: EDITOR_WORLD_WIDTH * 0.5,
  y: EDITOR_WORLD_HEIGHT * 0.5,
};
const editorTrack = {
  name: randomEditorTrackName(),
  timeOfDay: "day",
  environment: "grass",
  closed: true,
  startNode: 0,
  startDirection: 1,
  startSegment: 0,
  nodes: [
    { x: 2400, y: 6300, width: 15, curve: 0 },
    { x: 9000, y: 2700, width: 15, curve: 0 },
    { x: 15600, y: 6300, width: 15, curve: 0 },
    { x: 9000, y: 9900, width: 15, curve: 0 },
  ],
  roadFeatures: [],
  scenery: [],
  kerbs: [],
  pitLane: [],
};
const KATARA_TRACK_ID = "katara-speedway";
const KYOSHI_TRACK_ID = "kyoshi-circuit";
const MAKO_TRACK_ID = "mako-city";
const YUE_TRACK_ID = "yue-ring";
const sceneryLights = [];
const sceneryCullables = [];
const chaseCamera = {
  dragging: false,
  lastX: 0,
  orbitYaw: 0,
  orbitPitch: 0.06,
  zoom: 1,
};
const trackShowcaseColors = ["#d91f26", "#ff7a18", "#1769dc", "#f4f1e8", "#101d4a", "#12a66a"];
const quickRaceAiCarPools = {
  formula: ["ferraro", "mersedeez", "alpeen", "willems", "mclarsen", "racing-bats", "raging-bowl"],
  lmp: ["lmp", "scarlet-lmp", "ocean-lmp", "volt-lmp"],
  stock: ["orange-stock", "thunder-stock", "jade-stock", "grape-stock"],
  jeep: ["dune-jeep", "forest-jeep", "rescue-jeep", "storm-jeep"],
  corvette: ["vette-yellow", "vette-white", "vette-red", "vette-striped"],
};
if (trackShowcaseCar) {
  trackShowcaseCar.style.setProperty("--showcase-car-color", trackShowcaseColors[Math.floor(Math.random() * trackShowcaseColors.length)]);
}
window.addEventListener("keydown", (event) => {
  if (!trackEditor.classList.contains("is-hidden") && (event.code === "Delete" || event.code === "Backspace")) {
    if (isEditorTypingTarget(event.target)) return;
    deleteSelectedEditorItem();
    event.preventDefault();
    return;
  }
  if (!trackEditor.classList.contains("is-hidden") && (event.code === "KeyQ" || event.code === "KeyE")) {
    if (editorTool === "select-scenery") rotateSelectedEditorDirectionalScenery(event.code === "KeyE" ? 1 : -1);
    event.preventDefault();
    return;
  }
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
  if (event.code === "KeyR" && !isPaused) resetCar({ keepTimeTrialLaps: true });
  if (event.code === "KeyH" && gameStarted && !event.repeat) toggleHeadlights();
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
playGameButton.addEventListener("click", () => startGameModeSelection("drive"));
timeTrialGameButton.addEventListener("click", () => startGameModeSelection("time-trial"));
quickRaceGameButton?.addEventListener("click", () => startGameModeSelection("quick-race"));
openTrackEditorButton.addEventListener("click", () => setMenuStep("editor-choice"));
editorBackButton.addEventListener("click", closeTrackEditor);
editorTestDriveButton.addEventListener("click", startEditorTestDrive);
backToEditorButton.addEventListener("click", returnToTrackEditor);
editorUndoButton.addEventListener("click", undoEditorAction);
editorExportButton.addEventListener("click", exportEditorTrack);
trackWidthSlider.addEventListener("input", updateSelectedTrackWidth);
curveBendSlider.addEventListener("input", updateSelectedCurveBend);
trackWidthSlider.addEventListener("pointerdown", beginEditorUndoAction);
curveBendSlider.addEventListener("pointerdown", beginEditorUndoAction);
trackWidthSlider.addEventListener("focus", beginEditorUndoAction);
curveBendSlider.addEventListener("focus", beginEditorUndoAction);
trackWidthSlider.addEventListener("change", commitEditorUndoAction);
curveBendSlider.addEventListener("change", commitEditorUndoAction);
trackNameInput?.addEventListener("input", () => {
  editorTrack.name = trackNameInput.value.trim() || "Untitled Speedway";
  updateEditorJsonOutput();
});
trackTimeOfDaySelect?.addEventListener("change", () => {
  editorTrack.timeOfDay = trackTimeOfDaySelect.value || "day";
  updateEditorJsonOutput();
});
trackEnvironmentSelect?.addEventListener("change", () => {
  editorTrack.environment = trackEnvironmentSelect.value || "grass";
  updateEditorJsonOutput();
});
editorZoomSlider?.addEventListener("input", () => updateEditorZoom(Number(editorZoomSlider.value)));
editorZoomOutButton?.addEventListener("click", () => updateEditorZoom(editorZoom - 0.2));
editorZoomInButton?.addEventListener("click", () => updateEditorZoom(editorZoom + 0.2));
for (const input of roadFeatureInputs) {
  input.addEventListener("change", updateSelectedRoadFeatures);
}
for (const button of editorToolButtons) {
  button.addEventListener("click", () => setEditorTool(button.dataset.editorTool));
}
for (const button of editorStartButtons) {
  button.addEventListener("click", () => startTrackEditorFrom(button.dataset.editorStart));
}
for (const button of menuNextButtons) {
  button.addEventListener("click", () => setMenuStep(button.dataset.menuNext));
}
editorCanvas.addEventListener("contextmenu", clearEditorToolSelection);
editorCanvas.addEventListener("pointerdown", handleEditorPointerDown);
editorCanvas.addEventListener("pointermove", handleEditorPointerMove);
editorCanvas.addEventListener("pointerup", handleEditorPointerUp);
editorCanvas.addEventListener("pointercancel", handleEditorPointerUp);
editorCanvas.addEventListener("pointerleave", () => {
  editorGhostPoint = null;
  sceneryTypeSelect.closest(".editor-select")?.classList.toggle("is-hidden", editorTool !== "scenery");
  updateEditorStatus();
  renderTrackEditor();
});
trackNextButton.addEventListener("click", () => setMenuStep("car-category"));
startButton.addEventListener("pointerenter", startMenuMusic);
for (const button of startRaceButtons) {
  button.addEventListener("pointerenter", startMenuMusic);
  button.addEventListener("click", handleStartRaceClick);
}
quickRaceStartButton?.addEventListener("pointerenter", startMenuMusic);
quickRaceStartButton?.addEventListener("click", startGame);
timeTrialStandardButton?.addEventListener("click", () => selectTimeTrialMode("standard"));
timeTrialRecordLineButton?.addEventListener("click", () => selectTimeTrialMode("record-line"));
timeTrialSetupStartButton?.addEventListener("pointerenter", startMenuMusic);
timeTrialSetupStartButton?.addEventListener("click", startGame);
drivingLineExportButton?.addEventListener("click", exportDrivingLineRecording);
aiOpponentsBackButton?.addEventListener("click", () => setMenuStep(quickRacePaintStep));
aiOpponentSlider?.addEventListener("input", updateAiOpponentSelection);
gridPositionSlider?.addEventListener("input", updateGridPositionSelection);
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
    rearWing: 0xf6f8fb,
    rearWingStripe: 0x1b66d8,
    rim: 0x8edcff,
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

const corvettePaintSchemes = {
  "vette-yellow": {
    primary: 0xffd21f,
    secondary: 0x141414,
    stripe: 0x141414,
    glass: 0x79c8ee,
    rim: 0xd8d8d2,
    stripes: false,
  },
  "vette-white": {
    primary: 0xf6f4ec,
    secondary: 0x181a1c,
    stripe: 0xc91d2b,
    glass: 0x8bd7ff,
    rim: 0x202326,
    stripes: false,
  },
  "vette-red": {
    primary: 0xd91f26,
    secondary: 0x151515,
    stripe: 0xf6f2e8,
    glass: 0x80ceef,
    rim: 0x202326,
    stripes: false,
  },
  "vette-striped": {
    primary: 0x090a0b,
    secondary: 0xf6f2e8,
    stripe: 0xf6f2e8,
    glass: 0x7fc8e8,
    rim: 0xd8d8d2,
    stripes: true,
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
    cockpitPosition: { forward: 0.46, height: 1.54 },
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
  "vette-yellow": {
    kind: "corvette",
    hasErs: true,
    boostLabel: "Nitrous",
    maxForwardSpeed: 67,
    engineForce: 23.4,
    brakeForce: 30.5,
    brakingTurnScale: 0.78,
    baseGrip: 7.75,
    grassGrip: 2.75,
    grassAccelerationScale: 0.42,
    grassTopSpeedScale: 0.55,
    grassOverspeedBleed: 4.6,
    maxSteerLowSpeed: 0.325,
    maxSteerHighSpeed: 0.048,
    wheelbase: 3.55,
    downforce: 0.00082,
    yawResponse: 2.15,
    yawDamping: 3.3,
    slipLimitLowSpeed: 15.5,
    slipLimitHighSpeed: 23,
    boostDrainRate: 20,
    boostRechargeRate: 6,
    boostPowerScale: 1.53,
    cockpitPosition: { forward: 0.88, height: 1.2 },
    cockpitTarget: { forward: 20, height: 1.34, steerLook: 0.58 },
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
for (const corvetteId of ["vette-white", "vette-red", "vette-striped"]) {
  carProfiles[corvetteId] = carProfiles["vette-yellow"];
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
  },
  [KATARA_TRACK_ID]: createTrackDefinitionFromEditorData(kataraSpeedwayTrack, KATARA_TRACK_ID),
  [KYOSHI_TRACK_ID]: createTrackDefinitionFromEditorData(kyoshiCircuitTrack, KYOSHI_TRACK_ID),
  [MAKO_TRACK_ID]: createTrackDefinitionFromEditorData(makoCityTrack, MAKO_TRACK_ID),
  [YUE_TRACK_ID]: createTrackDefinitionFromEditorData(yueRingTrack, YUE_TRACK_ID),
  "race-1": {
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
  kerbJoltCooldown: 0,
  kerbKickRoll: 0,
  kerbKickPitch: 0,
  kerbKickRollTarget: 0,
  kerbKickPitchTarget: 0,
  collisionSmokeCooldown: 0,
  gear: 0,
  rpm: 2400,
  ers: 100,
  boostActive: false,
  nitrousFlameScale: 0,
  headlightsOn: false,
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
const editorAudio = {
  element: null,
  playlist: [],
  index: 0,
};
startMenuMusic();

const clock = new THREE.Clock();
let cameraTarget = new THREE.Vector3();
let cameraPosition = new THREE.Vector3();
const scratchForward = new THREE.Vector3();
const scratchRight = new THREE.Vector3();
const scratchLightPosition = new THREE.Vector3();
const dirtGroup = new THREE.Group();
const dirtParticles = [];
const smokeParticles = [];
const sparkParticles = [];
const aiOpponents = [];
const AI_CODEX_MODEL_NAME = "CODEX Model";
const AI_CYBORG_MODEL_NAME = "Cyborg Model";
const AI_DRIVER_MODEL_NAME = AI_CODEX_MODEL_NAME;
const AI_SAFE_LINE_TUNING = true;
const AI_HALF_WIDTH = 1.75;
const AI_ROAD_MARGIN = 0.55;
const AI_HALF_LENGTH = 2.15;
const AI_REASONABLE_AVERAGE_MPH = 45;
const AI_STABLE_CORRECTION_LOAD = 8;
const AI_MIN_PACE = 0.86;
const AI_MAX_PACE = 1.2;
const CYBORG_STOCK_TRACK_ID = "katara-speedway";
const CYBORG_STOCK_CLASS = "stock";
const CYBORG_LINE_SAMPLE_DISTANCE = 1.25;
const kataraStockCyborgLine = createCyborgRacingLine(kataraStockCyborgTraining);
let aiRacingLineDebug = null;
scene.add(dirtGroup);
initDirtParticles();
initCollisionSmokeParticles();
initSparkParticles();

resetCar();
renderer.setAnimationLoop(update);

function update() {
  const dt = Math.min(clock.getDelta(), 1 / 30);
  const raceStartBlocked = updateRaceCountdown(dt);
  if (gameStarted && !isPaused && !isMenuOpen() && !raceStartBlocked) updateCar(dt);
  if (gameStarted && !isPaused && !isMenuOpen() && !raceStartBlocked) updateAiOpponents(dt);
  if (!gameStarted || isPaused || isMenuOpen()) updateRevMeter();
  if (selectedGameMode === "time-trial") updateTimeTrialHud();
  if (selectedGameMode !== "quick-race" || isPaused || isMenuOpen()) updateAiDebugPanel(window.paddockAiDebugSummary ?? null);
  if (isMenuOpen()) updateMenuPreview(dt);
  updateCamera(dt);
  updateSkyObjects();
  updateSceneryVisibility();
  updateSceneryLights();
  renderer.render(scene, camera);
}

function updateSceneryLights() {
  if (!sceneryLights.length) return;
  const reference = gameStarted ? carState.position : camera.position;
  for (const light of sceneryLights) {
    light.getWorldPosition(scratchLightPosition);
    light.visible = scratchLightPosition.distanceToSquared(reference) < light.userData.maxDistanceSq;
  }
}

function updateSceneryVisibility() {
  if (!sceneryCullables.length) return;
  const reference = gameStarted ? carState.position : camera.position;
  for (const object of sceneryCullables) {
    object.getWorldPosition(scratchLightPosition);
    const distanceSq = scratchLightPosition.distanceToSquared(reference);
    object.visible = object.visible
      ? distanceSq < object.userData.hiddenDistanceSq
      : distanceSq < object.userData.visibleDistanceSq;
  }
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
  const coasting = throttle === 0 && brake === 0 ? 1 : 0;
  const lmpCoastTurnBoost = profile.kind === "lmp" && coasting
    ? THREE.MathUtils.lerp(1.38, 1.18, topSpeedRatio)
    : 1;
  const canStartBoost = profile.kind === "corvette" ? carState.ers >= 20 : carState.ers > 0;
  const boostActive = profile.hasErs && throttle && ersPressed && carState.ers > 0 && (carState.boostActive || canStartBoost);
  carState.boostActive = boostActive;
  const boostPowerScale = profile.boostPowerScale ?? 1.18;
  const offTrackEnvironment = surface.kind === "grass" ? (track.environment ?? "grass") : "track";
  const offTrackSlowdownScale = offTrackEnvironment === "dirt" ? 2 : 1;
  const paintedKerbPowerScale = 1 - wheelSurface.paintedKerbRatio * 0.32;
  const surfaceAccelerationScale =
    (surface.kind === "grass" ? profile.grassAccelerationScale / offTrackSlowdownScale : surface.kind === "sausage" ? 0.78 : surface.kind === "kerb" ? 0.88 : 1) * paintedKerbPowerScale;
  const surfaceTopSpeedScale =
    surface.kind === "grass" ? profile.grassTopSpeedScale / offTrackSlowdownScale : surface.kind === "sausage" ? 0.84 : surface.kind === "kerb" ? 0.92 : 1;
  const maxForwardSpeed = profile.maxForwardSpeed * surfaceTopSpeedScale * (boostActive ? boostPowerScale : 1);
  updateErs(dt, boostActive, brake, profile);
  const maxSteer = THREE.MathUtils.lerp(
    profile.maxSteerLowSpeed,
    profile.maxSteerHighSpeed,
    THREE.MathUtils.smoothstep(speedAbs, 6, 42),
  ) *
    (brake && forwardSpeed > 2 ? profile.brakingTurnScale : 1) *
    (throttle ? 0.82 : 1) *
    lmpCoastTurnBoost *
    (1 - wheelSurface.paintedKerbRatio * 0.28);

  carState.steer = THREE.MathUtils.damp(
    carState.steer,
    speedAbs < 0.7 ? 0 : steerInput * maxSteer,
    tuning.steeringSharpness,
    dt,
  );

  const surfaceGrip =
    surface.kind === "grass"
      ? profile.grassGrip
      : surface.kind === "sausage"
        ? tuning.kerbGrip * 0.72
      : surface.kind === "kerb"
        ? tuning.kerbGrip
        : profile.baseGrip;
  const downforceGrip = 1 + speedAbs * speedAbs * profile.downforce;
  const coastRotationBoost = 1 + coasting * THREE.MathUtils.lerp(0.08, 0.02, topSpeedRatio);
  const grip = surfaceGrip * downforceGrip * coastRotationBoost * (handbrake ? tuning.handbrakeGrip : 1);

  if (throttle) {
    const powerFade = 1 - THREE.MathUtils.clamp(forwardSpeed / maxForwardSpeed, 0, 1);
    const steeringLoad = Math.abs(carState.steer) / Math.max(maxSteer, 0.001);
    const cornerAccelPenalty = 1 - 0.28 * steeringLoad * THREE.MathUtils.smoothstep(speedAbs, 2, 42);
    const gearPowerScale = getManualPowerScale(forwardSpeed, profile);
    forwardSpeed +=
      profile.engineForce *
      surfaceAccelerationScale *
      (boostActive ? boostPowerScale : 1) *
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
    forwardSpeed = moveToward(forwardSpeed, maxForwardSpeed, profile.grassOverspeedBleed * offTrackSlowdownScale * dt);
  } else {
    forwardSpeed = THREE.MathUtils.clamp(
      forwardSpeed,
      -tuning.maxReverseSpeed,
      maxForwardSpeed,
    );
  }

  lateralSpeed = THREE.MathUtils.damp(lateralSpeed, 0, grip, dt);
  if (surface.kind === "kerb" || surface.kind === "sausage" || wheelSurface.paintedKerbRatio > 0) {
    const flatKerbDrag = 0.95 * Math.max(0, wheelSurface.kerbRatio - wheelSurface.sausageRatio);
    const sausageDrag = profile.grassOverspeedBleed * 2 * THREE.MathUtils.clamp(wheelSurface.sausageRatio * 1.35, 0, 1);
    const paintedKerbDrag = profile.grassOverspeedBleed * 0.62 * wheelSurface.paintedKerbRatio;
    forwardSpeed = moveToward(forwardSpeed, 0, (flatKerbDrag + sausageDrag + paintedKerbDrag) * dt);
  }
  if (wheelSurface.sausageRatio > 0 && speedAbs > 4) {
    const sideBias = wheelSurface.rightSausageCount - wheelSurface.leftSausageCount;
    const speedKick = THREE.MathUtils.clamp(speedAbs / 32, 0.2, 1.35);
    lateralSpeed += -sideBias * speedKick * 2.8 * dt;
    carState.yawRate += -sideBias * speedKick * 0.62 * dt;
  }

  const cornerDemand = Math.abs(forwardSpeed * Math.tan(carState.steer) / profile.wheelbase);
  const slipLimit = THREE.MathUtils.lerp(
    profile.slipLimitLowSpeed,
    profile.slipLimitHighSpeed,
    topSpeedRatio,
  ) *
    coastRotationBoost *
    (surface.kind === "grass" ? 0.32 : surface.kind === "sausage" ? 0.48 : surface.kind === "kerb" ? 0.66 : 1) *
    (1 - wheelSurface.paintedKerbRatio * 0.22);
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
    0.94 *
    lmpCoastTurnBoost;

  carState.yawRate = THREE.MathUtils.damp(
    carState.yawRate,
    targetYawRate,
    profile.yawResponse * tireAuthority * lmpCoastTurnBoost,
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
  if (resolveObstacleCollisions(speedAbs, dt)) {
    forwardSpeed = carState.velocity.dot(scratchForward);
    lateralSpeed = carState.velocity.dot(scratchRight);
  }
  updateTimeTrial(dt, wheelSurface);
  recordDrivingLineSample(dt, {
    throttle,
    brake,
    steerInput,
    handbrake,
    boostActive,
    surface,
    wheelSurface,
  });
  const offTrackBumpScale = offTrackEnvironment === "tarmac" ? 0.5 : 1;
  const grassBumpIntensity = wheelSurface.grassRatio * THREE.MathUtils.clamp(speedAbs / 24, 0, 1) * 0.8 * offTrackBumpScale;
  const kerbBumpIntensity = wheelSurface.kerbRatio * THREE.MathUtils.clamp(speedAbs / 20, 0, 1) * 0.82;
  const sausageBumpIntensity = wheelSurface.sausageRatio * THREE.MathUtils.clamp(speedAbs / 18, 0, 1) * 0.85;
  const grassBumpStrength = profile.kind === "formula" ? 0.105 : profile.kind === "lmp" ? 0.075 : profile.kind === "stock" ? 0.052 : 0.09;
  const grassBump = grassBumpIntensity * grassBumpStrength * (
    Math.sin(clock.elapsedTime * 18 + forwardSpeed * 0.55) + Math.sin(clock.elapsedTime * 29) * 0.42
  );
  const kerbBump = kerbBumpIntensity * 0.095 * (
    Math.sin(clock.elapsedTime * 34 + forwardSpeed * 0.7) + Math.sin(clock.elapsedTime * 51) * 0.35
  );
  const sausageBump = sausageBumpIntensity * 0.055 * (
    Math.sin(clock.elapsedTime * 21 + forwardSpeed * 0.38) + Math.sin(clock.elapsedTime * 31) * 0.35
  );
  const surfaceY = surface.kind === "kerb" ? track.kerbY : track.groundY;
  const rideLift = Math.max(wheelSurface.averageWheelLift * 0.95, wheelSurface.maxWheelLift * 0.42);
  carState.position.y = surfaceY + rideLift + grassBump + kerbBump + sausageBump;
  carState.kerbJoltCooldown = Math.max(0, carState.kerbJoltCooldown - dt);
  if (wheelSurface.sausageRatio > 0.12 && speedAbs > 5 && carState.kerbJoltCooldown <= 0) {
    const kickAngle = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(1, 5)) * THREE.MathUtils.clamp(wheelSurface.sausageRatio * 2.2, 0.25, 1);
    const sideBias = wheelSurface.rightSausageCount - wheelSurface.leftSausageCount;
    const frontBias = wheelSurface.frontSausageCount - wheelSurface.rearSausageCount;
    carState.kerbKickRollTarget = kickAngle * (sideBias ? Math.sign(sideBias) : (Math.random() < 0.5 ? -1 : 1));
    carState.kerbKickPitchTarget = kickAngle * 0.7 * (frontBias ? -Math.sign(frontBias) : (Math.random() < 0.5 ? -1 : 1));
    carState.kerbJoltCooldown = 0.95;
  } else if (surface.kind === "kerb" && speedAbs > 5 && carState.kerbJoltCooldown <= 0 && Math.random() < 0.5) {
    const kickAngle = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(0.6, 2.2));
    carState.kerbKickRollTarget = kickAngle * (Math.random() < 0.5 ? -1 : 1);
    carState.kerbKickPitchTarget = kickAngle * 0.45 * (Math.random() < 0.5 ? -1 : 1);
    carState.kerbJoltCooldown = 0.65;
  }

  car.root.position.copy(carState.position);
  car.root.rotation.set(0, carState.heading, 0);

  const rollStrength = profile.kind === "jeep" ? 0.42 : 0.1;
  const rollTarget = -carState.steer * THREE.MathUtils.clamp(speedAbs / (profile.kind === "jeep" ? 24 : 45), 0, 1) * rollStrength;
  const grassRockScale = profile.kind === "formula" ? 1.25 : profile.kind === "lmp" ? 0.9 : profile.kind === "stock" ? 0.65 : 0.85;
  const rockIntensity = grassBumpIntensity + kerbBumpIntensity * 0.92 + sausageBumpIntensity * 0.75;
  const grassRockRoll = rockIntensity * grassRockScale * 0.035 * Math.sin(clock.elapsedTime * 16 + forwardSpeed * 0.3);
  const grassRockPitch = rockIntensity * grassRockScale * 0.028 * Math.sin(clock.elapsedTime * 21 + forwardSpeed * 0.38);
  const kerbWheelRoll = (wheelSurface.rightKerbCount - wheelSurface.leftKerbCount) * 0.035 + (wheelSurface.rightSausageCount - wheelSurface.leftSausageCount) * 0.025;
  const kerbWheelPitch = (wheelSurface.rearKerbCount - wheelSurface.frontKerbCount) * 0.026 + (wheelSurface.rearSausageCount - wheelSurface.frontSausageCount) * 0.018;
  carState.grassBump = grassBump;
  carState.grassRockRoll = grassRockRoll;
  carState.grassRockPitch = grassRockPitch;
  carState.visualRoll = THREE.MathUtils.damp(carState.visualRoll, rollTarget, profile.kind === "jeep" ? 3.3 : 7, dt);
  carState.kerbKickRollTarget = THREE.MathUtils.damp(carState.kerbKickRollTarget, 0, 1.15, dt);
  carState.kerbKickPitchTarget = THREE.MathUtils.damp(carState.kerbKickPitchTarget, 0, 1.15, dt);
  carState.kerbKickRoll = THREE.MathUtils.damp(carState.kerbKickRoll, carState.kerbKickRollTarget, 2.9, dt);
  carState.kerbKickPitch = THREE.MathUtils.damp(carState.kerbKickPitch, carState.kerbKickPitchTarget, 2.9, dt);
  car.body.rotation.z = carState.visualRoll + grassRockRoll + kerbWheelRoll + carState.kerbKickRoll;
  car.body.rotation.x = grassRockPitch + kerbWheelPitch + carState.kerbKickPitch;

  if (car.wheels.frontLeft) car.wheels.frontLeft.rotation.y = carState.steer;
  if (car.wheels.frontRight) car.wheels.frontRight.rotation.y = carState.steer;
  carState.wheelSpin -= forwardSpeed * dt * 1.35;
  for (const wheel of car.wheelMeshes) {
    wheel.rotation.x = carState.wheelSpin;
  }
  updateWheelRideHeights(wheelSurface, dt);

  if (profile.transmission !== "manual") carState.gear = getAutoGear(forwardSpeed, profile, throttle, brake);
  carState.rpm = getEngineRpm(forwardSpeed, throttle, carState.gear, profile);
  const hardBraking = false;
  updateEngineAudio(dt, forwardSpeed, throttle, boostActive, profile, hardBraking);
  updateRearWing(dt, boostActive);
  updateCarLights(brake, boostActive, dt);

  speedEl.textContent = `${Math.round(Math.abs(forwardSpeed) * 2.237)} mph`;
  gearEl.textContent = carState.gear === -1 ? "R" : carState.gear === 0 ? "N" : `${carState.gear}`;
  surfaceEl.textContent = surface.kind === "grass" ? "Grass" : surface.kind === "painted-kerb" ? "Painted Kerb" : surface.kind === "sausage" ? "Sausage" : surface.kind === "kerb" ? "Kerb" : "Track";
  updateErsHud();
  updateRevMeter(profile);
  spawnFormulaSparks(dt, profile, boostActive, forwardSpeed, speedAbs);
  updateDirtParticles(dt, surface, speedAbs);
}

function resolveObstacleCollisions(speedAbs, dt) {
  if (!track.obstacles?.length) return false;
  carState.collisionSmokeCooldown = Math.max(0, carState.collisionSmokeCooldown - dt);
  const carRadius = tuning.carCollisionRadius * 1.25;
  let collided = false;

  for (const obstacle of track.obstacles) {
    if (obstacle.kind === "wall") {
      collided = resolveWallCollision(obstacle, carRadius, speedAbs) || collided;
      continue;
    }
    if (obstacle.kind !== "tree" && obstacle.kind !== "building") continue;
    const normal = getOrientedBoxCollisionNormal(carState.position, obstacle, carRadius);
    if (!normal) continue;

    const contact = carState.position.clone().addScaledVector(normal, carRadius);
    carState.position.addScaledVector(normal, obstacle.penetration + 0.12);
    const impactSpeed = Math.max(speedAbs, carState.velocity.length());
    const incoming = carState.velocity.dot(normal);
    if (incoming < 0) carState.velocity.addScaledVector(normal, -incoming * 1.35);
    carState.velocity.multiplyScalar(obstacle.kind === "tree" ? 0.25 : 0.38);
    carState.heading += THREE.MathUtils.clamp(normal.x * scratchForward.z - normal.z * scratchForward.x, -1, 1) * 0.18;
    collided = true;

    if (impactSpeed > 4 && carState.collisionSmokeCooldown <= 0) {
      spawnCollisionSmoke(contact, normal, impactSpeed);
      carState.collisionSmokeCooldown = 0.45;
    }
  }

  return collided;
}

function resolveWallCollision(wall, carRadius, speedAbs) {
  const closest = closestPointOnSegmentVector(carState.position, wall.a, wall.b);
  const away = carState.position.clone().sub(closest);
  let distance = away.length();
  const collisionDistance = carRadius + (wall.halfWidth ?? 0.45);
  if (distance > collisionDistance) return false;

  if (distance < 0.001) {
    const wallDirection = wall.b.clone().sub(wall.a).normalize();
    away.set(wallDirection.z, 0, -wallDirection.x);
    distance = 1;
  }

  const normal = away.multiplyScalar(1 / distance);
  const penetration = collisionDistance - distance;
  carState.position.addScaledVector(normal, penetration + 0.045);

  const velocity = carState.velocity.clone();
  const incomingSpeed = -velocity.dot(normal);
  const wallDirection = wall.b.clone().sub(wall.a).normalize();
  const tangentSpeed = velocity.dot(wallDirection);
  const hitRatio = THREE.MathUtils.clamp(incomingSpeed / Math.max(speedAbs, 0.001), 0, 1);
  const scrapeSeverity = Math.pow(hitRatio, 1.65);
  const scrapeScale = THREE.MathUtils.lerp(0.96, 0.08, scrapeSeverity);
  const bounce = incomingSpeed > 0 ? Math.min(incomingSpeed * 0.045, 0.45) : 0;

  carState.velocity
    .copy(wallDirection)
    .multiplyScalar(tangentSpeed * scrapeScale)
    .addScaledVector(normal, bounce);
  carState.yawRate *= THREE.MathUtils.lerp(0.95, 0.22, scrapeSeverity);
  if (hitRatio > 0.45) carState.heading += THREE.MathUtils.clamp(normal.x * scratchForward.z - normal.z * scratchForward.x, -1, 1) * 0.065;

  if (incomingSpeed > 3.5 && carState.collisionSmokeCooldown <= 0) {
    spawnCollisionSmoke(closest, normal, incomingSpeed);
    carState.collisionSmokeCooldown = 0.28;
  }
  registerTimeTrialWallContact();
  return true;
}

function closestPointOnSegmentVector(point, a, b) {
  const ab = b.clone().sub(a);
  const t = THREE.MathUtils.clamp(point.clone().sub(a).dot(ab) / Math.max(ab.lengthSq(), 0.0001), 0, 1);
  return a.clone().addScaledVector(ab, t);
}

function getOrientedBoxCollisionNormal(position, obstacle, radius) {
  const dx = position.x - obstacle.x;
  const dz = position.z - obstacle.z;
  const cos = Math.cos(-obstacle.rotation);
  const sin = Math.sin(-obstacle.rotation);
  const localX = dx * cos - dz * sin;
  const localZ = dx * sin + dz * cos;
  const halfWidth = obstacle.width * 0.5 + radius;
  const halfDepth = obstacle.depth * 0.5 + radius;
  if (Math.abs(localX) > halfWidth || Math.abs(localZ) > halfDepth) return null;

  const penetrationX = halfWidth - Math.abs(localX);
  const penetrationZ = halfDepth - Math.abs(localZ);
  const localNormalX = penetrationX < penetrationZ ? Math.sign(localX || 1) : 0;
  const localNormalZ = penetrationX < penetrationZ ? 0 : Math.sign(localZ || 1);
  const worldCos = Math.cos(obstacle.rotation);
  const worldSin = Math.sin(obstacle.rotation);
  obstacle.penetration = Math.min(penetrationX, penetrationZ);
  return new THREE.Vector3(
    localNormalX * worldCos + localNormalZ * worldSin,
    0,
    -localNormalX * worldSin + localNormalZ * worldCos,
  ).normalize();
}

function getWheelSurfaceState() {
  const wheelNames = ["frontLeft", "frontRight", "rearLeft", "rearRight"];
  const state = {
    grassCount: 0,
    leftGrassCount: 0,
    rightGrassCount: 0,
    frontGrassCount: 0,
    rearGrassCount: 0,
    kerbCount: 0,
    leftKerbCount: 0,
    rightKerbCount: 0,
    frontKerbCount: 0,
    rearKerbCount: 0,
    sausageCount: 0,
    leftSausageCount: 0,
    rightSausageCount: 0,
    frontSausageCount: 0,
    rearSausageCount: 0,
    grassRatio: 0,
    kerbRatio: 0,
    sausageRatio: 0,
    sausageStrength: 0,
    paintedKerbCount: 0,
    paintedKerbRatio: 0,
    wheelLifts: {},
    averageWheelLift: 0,
    maxWheelLift: 0,
    leftBrakeScale: 1,
    rightBrakeScale: 1,
    brakeScale: 1,
  };

  for (const wheelName of wheelNames) {
    const wheel = car.wheels[wheelName];
    if (!wheel) continue;

    const wheelPosition = new THREE.Vector3();
    wheel.getWorldPosition(wheelPosition);
    const wheelSample = track.sample(wheelPosition.x, wheelPosition.z);
    const wheelSurface = wheelSample.kind;
    const contactAmount = wheelSample.amount ?? 1;
    const wheelLift = wheelSurface === "sausage" ? 0.11 * contactAmount : wheelSurface === "kerb" ? 0.06 : 0;
    state.wheelLifts[wheelName] = wheelLift;
    state.averageWheelLift += wheelLift;
    state.maxWheelLift = Math.max(state.maxWheelLift, wheelLift);
    if (wheelSurface === "kerb" || wheelSurface === "sausage") {
      const kerbAmount = wheelSurface === "sausage" ? contactAmount : 1;
      state.kerbCount += kerbAmount;
      if (wheelName.endsWith("Left")) state.leftKerbCount += kerbAmount;
      if (wheelName.endsWith("Right")) state.rightKerbCount += kerbAmount;
      if (wheelName.startsWith("front")) state.frontKerbCount += kerbAmount;
      if (wheelName.startsWith("rear")) state.rearKerbCount += kerbAmount;
    }
    if (wheelSurface === "sausage") {
      state.sausageStrength += contactAmount;
      state.sausageCount += contactAmount;
      if (wheelName.endsWith("Left")) state.leftSausageCount += contactAmount;
      if (wheelName.endsWith("Right")) state.rightSausageCount += contactAmount;
      if (wheelName.startsWith("front")) state.frontSausageCount += contactAmount;
      if (wheelName.startsWith("rear")) state.rearSausageCount += contactAmount;
    }
    if (wheelSurface === "painted-kerb") {
      state.paintedKerbCount += 1;
    }
    if (wheelSurface !== "grass") continue;

    state.grassCount += 1;
    if (wheelName.endsWith("Left")) state.leftGrassCount += 1;
    if (wheelName.endsWith("Right")) state.rightGrassCount += 1;
    if (wheelName.startsWith("front")) state.frontGrassCount += 1;
    if (wheelName.startsWith("rear")) state.rearGrassCount += 1;
  }

  state.grassRatio = state.grassCount / wheelNames.length;
  state.kerbRatio = state.kerbCount / wheelNames.length;
  state.sausageRatio = state.sausageStrength / wheelNames.length;
  state.paintedKerbRatio = state.paintedKerbCount / wheelNames.length;
  state.averageWheelLift /= wheelNames.length;
  state.leftBrakeScale = 1 - 0.3 * (state.leftGrassCount / 2);
  state.rightBrakeScale = 1 - 0.3 * (state.rightGrassCount / 2);
  state.brakeScale = (state.leftBrakeScale + state.rightBrakeScale) * 0.5;
  return state;
}

function updateWheelRideHeights(wheelSurface, dt) {
  if (!car?.wheels) return;
  for (const [wheelName, wheel] of Object.entries(car.wheels)) {
    if (!wheel) continue;
    if (wheel.userData.baseY === undefined) wheel.userData.baseY = wheel.position.y;
    const lift = wheelSurface.wheelLifts?.[wheelName] ?? 0;
    const targetY = wheel.userData.baseY + Math.max(0, lift - wheelSurface.averageWheelLift * 0.35);
    wheel.position.y = THREE.MathUtils.damp(wheel.position.y, targetY, lift > 0 ? 5.2 : 4.4, dt);
  }
}

function rememberWheelBaseHeights(carModel) {
  for (const wheel of Object.values(carModel.wheels ?? {})) {
    if (wheel) wheel.userData.baseY = wheel.position.y;
  }
  return carModel;
}
function updateErs(dt, boostActive, brake, profile) {
  if (!profile.hasErs) {
    carState.ers = 0;
    return;
  }

  if (boostActive && carState.ers > 0) {
    carState.ers = Math.max(0, carState.ers - (profile.boostDrainRate ?? 20) * dt);
    return;
  }

  const rechargeRate = profile.boostRechargeRate ?? (brake ? 4 : 2);
  carState.ers = Math.min(100, carState.ers + rechargeRate * dt);
}

function updateTimeTrial(dt, wheelSurface) {
  if (selectedGameMode !== "time-trial" || !track.startLine) return;
  if (timeTrialState.running) timeTrialState.currentTime += dt;
  timeTrialState.wallPenaltyCooldown = Math.max(0, timeTrialState.wallPenaltyCooldown - dt);
  timeTrialState.wallPenaltyMessageTime = Math.max(0, timeTrialState.wallPenaltyMessageTime - dt);
  timeTrialState.trackLimitsPenaltyCooldown = Math.max(0, timeTrialState.trackLimitsPenaltyCooldown - dt);
  timeTrialState.trackLimitsPenaltyMessageTime = Math.max(0, timeTrialState.trackLimitsPenaltyMessageTime - dt);
  timeTrialState.segmentStatusHoldTime = Math.max(0, timeTrialState.segmentStatusHoldTime - dt);
  if (timeTrialState.running && wheelSurface?.grassCount === 4) {
    timeTrialState.invalidated = true;
    drivingLineRecorder.currentLapClean = false;
  } else if (
    timeTrialState.running &&
    timeTrialState.trackLimitsPenaltyCooldown <= 0 &&
    (wheelSurface?.frontGrassCount === 2 || wheelSurface?.rearGrassCount === 2)
  ) {
    timeTrialState.currentTime += 2;
    timeTrialState.trackLimitsPenaltyCooldown = 5;
    timeTrialState.trackLimitsPenaltyMessageTime = 5;
    drivingLineRecorder.currentLapClean = false;
  }

  updateTimeTrialSegments();

  const currentSide = getStartLineSide(carState.position);
  const forwardSpeedThroughLine = carState.velocity.dot(track.startLine.tangent);
  const acrossDistance = Math.abs(carState.position.clone().sub(track.startLine.start).dot(track.startLine.across));
  const crossedCorrectly =
    timeTrialState.lastLineSide !== null &&
    timeTrialState.lastLineSide <= 0 &&
    currentSide > 0 &&
    forwardSpeedThroughLine > 1 &&
    acrossDistance <= track.startLine.halfWidth + 1.4;

  if (crossedCorrectly) {
    if (timeTrialState.running && !timeTrialState.invalidated) {
      completeTimeTrialSegment(2);
      recordTimeTrialLap();
      holdCompletedTimeTrialSegments();
    }
    timeTrialState.running = true;
    timeTrialState.currentTime = 0;
    resetTimeTrialSegments();
    timeTrialState.invalidated = false;
    startDrivingLineRecordingLap();
    carState.ers = 100;
    updateErsHud();
  }

  timeTrialState.lastLineSide = currentSide;
}

function updateTimeTrialSegments() {
  if (!track.segmentLines?.length) return;
  for (const [index, line] of track.segmentLines.entries()) {
    const currentSide = getTimeTrialLineSide(line, carState.position);
    if (timeTrialState.running && timeTrialState.currentSegmentIndex === index) {
      const forwardSpeedThroughLine = carState.velocity.dot(line.tangent);
      const acrossDistance = Math.abs(carState.position.clone().sub(line.start).dot(line.across));
      const crossedCorrectly =
        timeTrialState.lastSegmentSides[index] !== null &&
        timeTrialState.lastSegmentSides[index] <= 0 &&
        currentSide > 0 &&
        forwardSpeedThroughLine > 1 &&
        acrossDistance <= line.halfWidth + 1.4;
      if (crossedCorrectly) completeTimeTrialSegment(index);
    }
    timeTrialState.lastSegmentSides[index] = currentSide;
  }
}

function completeTimeTrialSegment(index) {
  if (index < 0 || index > 2 || timeTrialState.currentSegments[index] > 0) return;
  const segmentTime = Math.max(0, timeTrialState.currentTime - timeTrialState.currentSegmentStartTime);
  timeTrialState.currentSegments[index] = segmentTime;
  timeTrialState.segmentStatuses[index] = getTimeTrialSegmentStatus(index, segmentTime);
  timeTrialState.currentSegmentStartTime = timeTrialState.currentTime;
  timeTrialState.currentSegmentIndex = Math.min(3, index + 1);
  updateTimeTrialHud();
}

function getTimeTrialSegmentStatus(index, segmentTime) {
  const fastest = timeTrialState.fastestSegments?.[index];
  if (fastest && segmentTime < fastest) return "purple";
  const reference = timeTrialState.bestLapSegments?.[index];
  if (!reference || segmentTime <= 0) return null;
  return segmentTime <= reference * 1.03 ? "green" : "yellow";
}

function resetTimeTrialSegments() {
  timeTrialState.currentSegmentIndex = 0;
  timeTrialState.currentSegmentStartTime = 0;
  timeTrialState.currentSegments = [0, 0, 0];
  timeTrialState.segmentStatuses = [null, null, null];
  timeTrialState.lastSegmentSides = (track.segmentLines ?? []).map((line) => getTimeTrialLineSide(line, carState.position));
}

function holdCompletedTimeTrialSegments() {
  timeTrialState.heldSegmentStatuses = [...timeTrialState.segmentStatuses];
  timeTrialState.segmentStatusHoldTime = 2;
}

function registerTimeTrialWallContact() {
  if (selectedGameMode !== "time-trial" || !timeTrialState.running) return;
  if (timeTrialState.wallPenaltyCooldown > 0) return;
  timeTrialState.currentTime += 1;
  timeTrialState.wallPenaltyCooldown = 5;
  timeTrialState.wallPenaltyMessageTime = 5;
  drivingLineRecorder.currentLapClean = false;
  updateTimeTrialHud();
}

function getStartLineSide(position) {
  return getTimeTrialLineSide(track.startLine, position);
}

function getTimeTrialLineSide(line, position) {
  return position.clone().sub(line.start).dot(line.tangent);
}

function resetTimeTrialState({ clearLaps = true } = {}) {
  timeTrialState.running = false;
  timeTrialState.currentTime = 0;
  timeTrialState.invalidated = false;
  timeTrialState.wallPenaltyCooldown = 0;
  timeTrialState.wallPenaltyMessageTime = 0;
  timeTrialState.trackLimitsPenaltyCooldown = 0;
  timeTrialState.trackLimitsPenaltyMessageTime = 0;
  if (clearLaps) {
    timeTrialState.laps = [];
    timeTrialState.latestLapId = 0;
    timeTrialState.bestLapSegments = null;
    timeTrialState.fastestSegments = null;
  }
  timeTrialState.heldSegmentStatuses = [null, null, null];
  timeTrialState.segmentStatusHoldTime = 0;
  resetTimeTrialSegments();
  timeTrialState.lastLineSide = track.startLine ? getStartLineSide(carState.position) : null;
  if (clearLaps) resetDrivingLineRecorderForRun();
  else startDrivingLineRecordingLap();
  updateTimeTrialHud();
}

function recordTimeTrialLap() {
  const lapTime = timeTrialState.currentTime;
  if (lapTime <= 0) return;
  recordDrivingLineLap(lapTime);
  timeTrialState.latestLapId += 1;
  timeTrialState.laps.push({ id: timeTrialState.latestLapId, time: lapTime, segments: [...timeTrialState.currentSegments] });
  timeTrialState.laps.sort((a, b) => a.time - b.time);
  timeTrialState.bestLapSegments = timeTrialState.laps[0]?.segments ? [...timeTrialState.laps[0].segments] : null;
  for (let i = 0; i < 3; i += 1) {
    const segment = timeTrialState.currentSegments[i];
    if (segment <= 0) continue;
    if (!timeTrialState.fastestSegments) timeTrialState.fastestSegments = [Infinity, Infinity, Infinity];
    timeTrialState.fastestSegments[i] = Math.min(timeTrialState.fastestSegments[i] || segment, segment);
  }
  updateTimeTrialHud();
}

function isDrivingLineRecordingAvailable() {
  return selectedGameMode === "time-trial" && selectedTimeTrialMode === "record-line" && getCarProfile().kind === "stock";
}

function resetDrivingLineRecorderForRun() {
  drivingLineRecorder.active = isDrivingLineRecordingAvailable();
  drivingLineRecorder.currentLapSamples = [];
  drivingLineRecorder.laps = [];
  drivingLineRecorder.sampleTimer = 0;
  drivingLineRecorder.lapStartTime = 0;
  drivingLineRecorder.currentLapClean = true;
  drivingLineRecorder.lastExportName = "";
  updateDrivingLineRecorderHud();
}

function startDrivingLineRecordingLap() {
  if (!drivingLineRecorder.active) return;
  drivingLineRecorder.currentLapSamples = [];
  drivingLineRecorder.sampleTimer = 0;
  drivingLineRecorder.lapStartTime = timeTrialState.currentTime;
  drivingLineRecorder.currentLapClean = true;
  updateDrivingLineRecorderHud();
}

function recordDrivingLineSample(dt, input) {
  if (!drivingLineRecorder.active || !timeTrialState.running || !track.samples?.length) return;
  drivingLineRecorder.sampleTimer += dt;
  if (drivingLineRecorder.sampleTimer < 0.05 && drivingLineRecorder.currentLapSamples.length > 0) return;
  drivingLineRecorder.sampleTimer = 0;

  const sampleIndex = getNearestSampleIndex(track.samples, carState.position);
  const trackPoint = track.samples[sampleIndex];
  const heading = getSampleHeading(track.samples, sampleIndex);
  const normal = new THREE.Vector3(Math.cos(heading), 0, -Math.sin(heading));
  const trackOffset = carState.position.clone().sub(trackPoint).dot(normal);
  const speed = carState.velocity.length();
  drivingLineRecorder.currentLapSamples.push({
    t: roundDrivingLineNumber(timeTrialState.currentTime),
    x: roundDrivingLineNumber(carState.position.x),
    z: roundDrivingLineNumber(carState.position.z),
    heading: roundDrivingLineNumber(carState.heading),
    speed: roundDrivingLineNumber(speed),
    speedMph: roundDrivingLineNumber(speed * 2.237),
    sampleIndex,
    progress: roundDrivingLineNumber(sampleIndex / Math.max(1, track.samples.length - 1), 5),
    trackOffset: roundDrivingLineNumber(trackOffset),
    throttle: input.throttle,
    brake: input.brake,
    steer: input.steerInput,
    handbrake: input.handbrake,
    boost: input.boostActive ? 1 : 0,
    surface: input.surface?.kind ?? "track",
    grassWheels: input.wheelSurface?.grassCount ?? 0,
    kerbWheels: input.wheelSurface?.kerbCount ?? 0,
    sausageStrength: roundDrivingLineNumber(input.wheelSurface?.sausageStrength ?? 0),
  });
}

function recordDrivingLineLap(lapTime) {
  if (!drivingLineRecorder.active) return;
  const samples = drivingLineRecorder.currentLapSamples;
  if (!drivingLineRecorder.currentLapClean || samples.length < 20) {
    drivingLineRecorder.currentLapSamples = [];
    updateDrivingLineRecorderHud();
    return;
  }

  drivingLineRecorder.laps.push({
    lapNumber: drivingLineRecorder.laps.length + 1,
    lapTime: roundDrivingLineNumber(lapTime),
    formattedLapTime: formatLapTime(lapTime),
    sampleCount: samples.length,
    samples: samples.map((sample) => ({ ...sample })),
  });
  drivingLineRecorder.currentLapSamples = [];
  updateDrivingLineRecorderHud();
}

function exportDrivingLineRecording() {
  if (!drivingLineRecorder.laps.length) {
    if (drivingLineStatusEl) drivingLineStatusEl.textContent = "No clean recorded laps yet. Complete a clean lap, then export.";
    return;
  }
  const payload = {
    type: "the-paddock-driving-line-training",
    model: "Cyborg Model",
    version: 1,
    createdAt: new Date().toISOString(),
    track: {
      id: selectedTrack,
      name: getSelectedTrackLabel(),
      environment: track.environment ?? "grass",
      timeOfDay: track.timeOfDay ?? "day",
    },
    car: {
      id: selectedCar,
      name: getSelectedCarLabel(),
      class: getCarProfile().kind,
    },
    recording: {
      mode: "time-trial-record-line",
      cleanLapsOnly: true,
      sampleRateHz: 20,
      lapCount: drivingLineRecorder.laps.length,
    },
    laps: drivingLineRecorder.laps,
  };
  const fileName = `${safeFileName(getSelectedTrackLabel())}-${safeFileName(getSelectedCarLabel())}-cyborg-training.json`;
  downloadJsonFile(fileName, payload);
  drivingLineRecorder.lastExportName = fileName;
  updateDrivingLineRecorderHud();
}

function downloadJsonFile(fileName, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function safeFileName(value) {
  return String(value || "driving-line")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "driving-line";
}

function roundDrivingLineNumber(value, digits = 3) {
  const scale = 10 ** digits;
  return Math.round((Number(value) || 0) * scale) / scale;
}

function updateDrivingLineRecorderHud() {
  if (!drivingLineRecorderEl || !drivingLineStatusEl) return;
  const visible = selectedGameMode === "time-trial" && gameStarted && !isMenuOpen() && drivingLineRecorder.active;
  drivingLineRecorderEl.hidden = !visible;
  if (!visible) return;

  const lapCount = drivingLineRecorder.laps.length;
  const currentSamples = drivingLineRecorder.currentLapSamples.length;
  const exportNote = drivingLineRecorder.lastExportName ? ` Exported ${drivingLineRecorder.lastExportName}.` : "";
  if (drivingLineExportButton) drivingLineExportButton.disabled = lapCount <= 0;
  if (!timeTrialState.running) {
    drivingLineStatusEl.textContent = `Cross the start line to begin recording. Clean laps saved: ${lapCount}.${exportNote}`;
  } else if (!drivingLineRecorder.currentLapClean) {
    drivingLineStatusEl.textContent = `Current lap will be skipped. Clean laps saved: ${lapCount}.${exportNote}`;
  } else {
    drivingLineStatusEl.textContent = `Recording clean lap ${lapCount + 1}. Samples: ${currentSamples}.${exportNote}`;
  }
}

function updateTimeTrialHud() {
  const isTimeTrial = selectedGameMode === "time-trial" && gameStarted && !isMenuOpen();
  if (timeTrialTimerEl) timeTrialTimerEl.hidden = !isTimeTrial;
  if (timeTrialMessageEl) timeTrialMessageEl.hidden = !isTimeTrial || (!timeTrialState.invalidated && timeTrialState.wallPenaltyMessageTime <= 0 && timeTrialState.trackLimitsPenaltyMessageTime <= 0);
  if (timeTrialResultsEl) timeTrialResultsEl.hidden = !isTimeTrial;
  updateDrivingLineRecorderHud();
  if (!isTimeTrial) return;

  if (timeTrialTimerValueEl) timeTrialTimerValueEl.textContent = timeTrialState.running ? formatLapTime(timeTrialState.currentTime) : "0:00.0";
  else timeTrialTimerEl.textContent = timeTrialState.running ? formatLapTime(timeTrialState.currentTime) : "0:00.0";
  const activeSegmentStatuses = timeTrialState.segmentStatuses.some(Boolean) || timeTrialState.segmentStatusHoldTime <= 0
    ? timeTrialState.segmentStatuses
    : timeTrialState.heldSegmentStatuses;
  for (const [index, segmentEl] of timeTrialSegmentEls.entries()) {
    const status = activeSegmentStatuses[index];
    segmentEl.classList.toggle("is-purple", status === "purple");
    segmentEl.classList.toggle("is-green", status === "green");
    segmentEl.classList.toggle("is-yellow", status === "yellow");
  }
  if (timeTrialMessageEl && !timeTrialMessageEl.hidden) {
    timeTrialMessageEl.textContent = timeTrialState.invalidated
      ? "Invalidated Lap - Off Track"
      : timeTrialState.trackLimitsPenaltyMessageTime > 0
        ? "2 Second Penalty - Track Limits"
        : "1 Second Penalty - Wall Contact";
    timeTrialMessageEl.classList.toggle("is-invalidated", timeTrialState.invalidated);
  }
  if (!timeTrialLapsEl) return;

  timeTrialLapsEl.replaceChildren();
  for (const [index, lap] of timeTrialState.laps.entries()) {
    const row = document.createElement("li");
    row.className = lap.id === timeTrialState.latestLapId ? "is-latest" : "";
    row.innerHTML = `<span>${index + 1}</span><strong>${formatLapTime(lap.time)}</strong>`;
    timeTrialLapsEl.appendChild(row);
  }
  updateDrivingLineRecorderHud();
}

function formatLapTime(seconds) {
  const totalTenths = Math.max(0, Math.round(seconds * 10));
  const minutes = Math.floor(totalTenths / 600);
  const wholeSeconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${minutes}:${String(wholeSeconds).padStart(2, "0")}.${tenths}`;
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

function toggleHeadlights() {
  carState.headlightsOn = !carState.headlightsOn;
  updateCarLights(false, false);
}

function updateCarLights(brake = false, boostActive = false, dt = 1 / 60) {
  if (!car?.lights) return;
  const nitrousFlameActive = getCarProfile().kind === "corvette" && boostActive;
  carState.nitrousFlameScale = THREE.MathUtils.damp(carState.nitrousFlameScale, nitrousFlameActive ? 1 : 0, nitrousFlameActive ? 3.1 : 5.4, dt);
  const headlightsOn = carState.headlightsOn;
  for (const light of car.lights.headlights ?? []) {
    light.visible = headlightsOn;
  }
  for (const mesh of car.lights.headlightMeshes ?? []) {
    mesh.material.emissiveIntensity = headlightsOn
      ? (mesh.userData.headlightOnIntensity ?? 2.4)
      : (mesh.userData.headlightOffIntensity ?? 0.12);
  }
  for (const mesh of car.lights.brakeLights ?? []) {
    mesh.material.emissiveIntensity = brake ? 1.35 : 0.22;
    mesh.scale.y = brake ? 1.18 : 1;
  }
  for (const flame of car.lights.nitrousFlames ?? []) {
    flame.visible = carState.nitrousFlameScale > 0.02;
    if (flame.visible) {
      const flicker = 0.85 + Math.random() * 0.35;
      const scale = carState.nitrousFlameScale;
      flame.scale.set(0.55 * flicker * scale, 0.55 * flicker * scale, 1.05 * flicker * scale);
    } else {
      flame.scale.set(0, 0, 0);
    }
  }
}

function updateErsHud() {
  const profile = getCarProfile();
  ersPanelEl.hidden = !profile.hasErs;
  ersControlHintEl.hidden = !profile.hasErs;
  if (!profile.hasErs) return;

  const label = profile.boostLabel ?? "ERS";
  if (ersLabelEl) ersLabelEl.textContent = label;
  if (ersControlHintEl) ersControlHintEl.textContent = `Shift: ${label}`;
  const ratio = THREE.MathUtils.clamp(carState.ers / 100, 0, 1);
  ersFillEl.style.transform = `scaleX(${ratio})`;
  ersFillEl.classList.toggle("is-low", profile.kind === "corvette" && carState.ers < 20);
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
  const material = new THREE.MeshStandardMaterial({ color: 0x8d6840, roughness: 1, transparent: true, opacity: 0.86, flatShading: true });
  const geometry = new THREE.SphereGeometry(0.16, 6, 4);

  for (let i = 0; i < 90; i += 1) {
    const particle = new THREE.Mesh(geometry, material.clone());
    particle.visible = false;
    particle.userData.life = 0;
    particle.userData.velocity = new THREE.Vector3();
    dirtParticles.push(particle);
    dirtGroup.add(particle);
  }
}

function initCollisionSmokeParticles() {
  const material = new THREE.MeshStandardMaterial({ color: 0xaeb1ad, roughness: 1, transparent: true, opacity: 0.74, flatShading: true });
  const geometry = new THREE.SphereGeometry(0.28, 7, 5);

  for (let i = 0; i < 42; i += 1) {
    const particle = new THREE.Mesh(geometry, material);
    particle.visible = false;
    particle.userData.life = 0;
    particle.userData.maxLife = 1;
    particle.userData.velocity = new THREE.Vector3();
    smokeParticles.push(particle);
    dirtGroup.add(particle);
  }
}

function initSparkParticles() {
  const material = new THREE.MeshStandardMaterial({
    color: 0xfff05a,
    emissive: 0xffdf2a,
    emissiveIntensity: 3.2,
    roughness: 0.22,
    flatShading: true,
  });
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffe45c,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const geometry = new THREE.SphereGeometry(0.16, 7, 5);
  const glowGeometry = new THREE.SphereGeometry(0.38, 8, 6);

  for (let i = 0; i < 36; i += 1) {
    const particle = new THREE.Mesh(geometry, material);
    const glow = new THREE.Mesh(glowGeometry, glowMaterial.clone());
    particle.visible = false;
    glow.scale.setScalar(1);
    particle.userData.life = 0;
    particle.userData.maxLife = 1;
    particle.userData.velocity = new THREE.Vector3();
    particle.userData.glow = glow;
    particle.add(glow);
    sparkParticles.push(particle);
    dirtGroup.add(particle);
  }
}

function updateDirtParticles(dt, surface, speedAbs) {
  updateCollisionSmokeParticles(dt);
  updateSparkParticles(dt);

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

    const environment = track.environment ?? "grass";
    if (environment === "tarmac" && Math.random() < 0.5) continue;
    const burstMultiplier = environment === "dirt" ? 2 : environment === "tarmac" ? 0.5 : 1;
    const baseBurstCount = dirtIntensity > 0.72 && (profile.kind === "stock" || wheelName.startsWith("rear")) ? 2 : 1;
    const burstCount = Math.max(1, Math.round(baseBurstCount * burstMultiplier));
    const particle = dirtParticles.find((item) => item.userData.life <= 0);
    if (!particle) return;

    for (let i = 0; i < burstCount; i += 1) {
      const nextParticle = i === 0 ? particle : dirtParticles.find((item) => item.userData.life <= 0);
      if (!nextParticle) return;

      nextParticle.position.copy(wheelPosition);
      nextParticle.position.y = 0.26;
      nextParticle.material.color.setHex(environment === "tarmac" ? 0x9fa4a2 : environment === "dirt" ? 0x6f4b2d : 0x8d6840);
      nextParticle.material.opacity = environment === "tarmac" ? 0.38 : environment === "dirt" ? 0.92 : 0.86;
      nextParticle.userData.life = THREE.MathUtils.randFloat(0.28, 0.62) * dirtIntensity * (environment === "tarmac" ? 0.72 : 1);
      nextParticle.userData.velocity
        .copy(scratchForward)
        .multiplyScalar(THREE.MathUtils.randFloat(-4.8, -2.8) * dirtIntensity * (environment === "tarmac" ? 0.72 : 1))
        .addScaledVector(scratchRight, THREE.MathUtils.randFloatSpread(1.9) * dirtIntensity * (environment === "tarmac" ? 0.65 : 1))
        .add(new THREE.Vector3(0, THREE.MathUtils.randFloat(1.0, 2.8) * dirtIntensity * (environment === "tarmac" ? 0.6 : 1), 0));
      nextParticle.scale.setScalar((0.12 + dirtIntensity * 0.24) * (environment === "tarmac" ? 0.75 : 1));
      nextParticle.visible = true;
    }
  }
}

function updateSparkParticles(dt) {
  for (const particle of sparkParticles) {
    if (particle.userData.life <= 0) {
      particle.visible = false;
      continue;
    }

    particle.userData.life -= dt;
    particle.userData.velocity.y -= 18 * dt;
    particle.position.addScaledVector(particle.userData.velocity, dt);
    const ratio = THREE.MathUtils.clamp(particle.userData.life / particle.userData.maxLife, 0, 1);
    particle.scale.setScalar(THREE.MathUtils.lerp(0.13, 0.58, ratio));
    particle.userData.glow.material.opacity = 0.42 * ratio;
    particle.userData.glow.scale.setScalar(THREE.MathUtils.lerp(1.45, 0.9, ratio));
  }
}

function spawnFormulaSparks(dt, profile, boostActive, forwardSpeed, speedAbs) {
  if (profile.kind !== "formula" || boostActive || forwardSpeed <= 0) return;
  if (speedAbs < profile.maxForwardSpeed * 0.98) return;
  if (Math.random() > dt * 14.4) return;

  const rearPosition = carState.position
    .clone()
    .addScaledVector(scratchForward, -2.05)
    .add(new THREE.Vector3(0, 0.32, 0));
  const burstCount = 1;

  for (let i = 0; i < burstCount; i += 1) {
    const particle = sparkParticles.find((item) => item.userData.life <= 0);
    if (!particle) return;

    particle.visible = true;
    particle.position.copy(rearPosition);
    particle.position.addScaledVector(scratchRight, THREE.MathUtils.randFloatSpread(0.46));
    const orangeSpark = Math.random() < 0.34;
    particle.material.color.setHex(orangeSpark ? 0xff9f2e : 0xfff05a);
    particle.material.emissive.setHex(orangeSpark ? 0xff7a1f : 0xffdf2a);
    particle.userData.glow.material.color.setHex(orangeSpark ? 0xff9a2a : 0xffe45c);
    particle.userData.maxLife = THREE.MathUtils.randFloat(0.18, 0.34);
    particle.userData.life = particle.userData.maxLife;
    particle.userData.glow.material.opacity = 0.42;
    particle.userData.glow.scale.setScalar(0.9);
    particle.userData.velocity
      .copy(scratchForward)
      .multiplyScalar(THREE.MathUtils.randFloat(-4.8, -8.2))
      .addScaledVector(scratchRight, THREE.MathUtils.randFloatSpread(1.25))
      .add(new THREE.Vector3(0, THREE.MathUtils.randFloat(14, 19), 0));
    particle.scale.setScalar(0.5);
  }
}

function updateCollisionSmokeParticles(dt) {
  for (const particle of smokeParticles) {
    if (particle.userData.life <= 0) {
      particle.visible = false;
      continue;
    }

    particle.userData.life -= dt;
    particle.userData.velocity.y += 0.28 * dt;
    particle.position.addScaledVector(particle.userData.velocity, dt);
    const ratio = THREE.MathUtils.clamp(particle.userData.life / particle.userData.maxLife, 0, 1);
    particle.scale.setScalar(0.35 + (1 - ratio) * 1.65);
  }
}

function spawnCollisionSmoke(position, normal, speedAbs) {
  const burstCount = Math.round(THREE.MathUtils.clamp(speedAbs / 4, 5, 12));
  for (let i = 0; i < burstCount; i += 1) {
    const particle = smokeParticles.find((item) => item.userData.life <= 0);
    if (!particle) return;
    particle.visible = true;
    particle.position.copy(position);
    particle.position.y = 0.55 + Math.random() * 0.65;
    particle.userData.maxLife = THREE.MathUtils.randFloat(0.55, 0.95);
    particle.userData.life = particle.userData.maxLife;
    particle.userData.velocity
      .copy(normal)
      .multiplyScalar(THREE.MathUtils.randFloat(1.6, 3.7))
      .addScaledVector(scratchRight, THREE.MathUtils.randFloatSpread(2.2))
      .add(new THREE.Vector3(0, THREE.MathUtils.randFloat(0.9, 2.4), 0));
    particle.scale.setScalar(0.3 + Math.random() * 0.25);
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
    const cockpitPullback = THREE.MathUtils.clamp(carState.velocity.length() / 90, 0, 1) * 0.18;
    const cockpitRockRoll = carState.grassRockRoll * 2.4;
    const cockpitRockPitch = carState.grassRockPitch * 2.8;
    const desiredPosition = carState.position
      .clone()
      .addScaledVector(scratchForward, cockpit.forward - cockpitPullback + cockpitRockPitch)
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

function createTrack(trackId = KATARA_TRACK_ID) {
  const definition = trackDefinitions[trackId] ?? trackDefinitions[KATARA_TRACK_ID];
  applyTimeOfDay(definition.timeOfDay ?? "day");
  sceneryLights.length = 0;
  sceneryCullables.length = 0;
  const group = new THREE.Group();
  const halfWidth = definition.halfWidth ?? 7.2;
  const kerbWidth = definition.kerbWidth ?? 1.15;
  const planScale = definition.scale ?? 0.168;
  const controlPoints = definition.points.map(([x, y]) => pointFromPlan(x, y, planScale));
  const curve = new THREE.CatmullRomCurve3(controlPoints, true, "catmullrom", definition.tension);
  const samples = curve.getSpacedPoints(definition.detailSamples ?? 640);
  const widthProfile = getTrackWidthProfile(definition, samples.length, halfWidth);
  const maxHalfWidth = Math.max(halfWidth, ...widthProfile);

  const [environmentWidth, environmentDepth] = definition.grassSize ?? [520, 360];
  const environment = definition.environment ?? "grass";
  const baseLayer = new THREE.Mesh(
    new THREE.PlaneGeometry(environmentWidth, environmentDepth, 36, 24),
    createEnvironmentMaterial(environment),
  );
  baseLayer.rotation.x = -Math.PI / 2;
  baseLayer.position.y = -0.05;
  baseLayer.receiveShadow = true;
  randomizePlane(baseLayer.geometry, environment === "tarmac" ? 0.07 : environment === "dirt" ? 0.24 : 0.18);
  group.add(baseLayer);
  if (environment === "grass") scatterGrassTufts(group, samples, maxHalfWidth + kerbWidth, { count: 170, spreadX: 460, spreadZ: 310 });
  if (environment === "dirt") scatterGrassTufts(group, samples, maxHalfWidth + kerbWidth, { count: 72, spreadX: 470, spreadZ: 320, color: 0x6f8d42, minScale: 0.35, maxScale: 0.9 });

  if (!definition.cornerOnlyKerbs) {
    const kerbGeometry = makeTrackStrip(samples, halfWidth + kerbWidth, 0.025, halfWidth);
    const kerb = new THREE.Mesh(
      kerbGeometry,
      new THREE.MeshStandardMaterial({ color: 0xf6f0d7, roughness: 0.85, flatShading: true }),
    );
    kerb.receiveShadow = true;
    group.add(kerb);
  }

  const roadGeometry = makeVariableCrownedTrackStrip(samples, widthProfile, 0.08, 0.26);
  const road = new THREE.Mesh(roadGeometry, createAsphaltMaterial());
  road.receiveShadow = true;
  group.add(road);
  addStartFinishLine(group, definition, samples, widthProfile, planScale);

  const edgeLineMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f3e6,
    roughness: 0.72,
    metalness: 0.01,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  addTrackEdgeLines(group, samples, maxHalfWidth, edgeLineMaterial, widthProfile);

  const extraTrackAreas = [];
  const obstacles = [];
  if (definition.extras) definition.extras(group, extraTrackAreas, samples, obstacles);
  addCloudsAndSun(group, trackId === "generated");

  const start = pointFromPlan(...definition.start, planScale);
  const next = pointFromPlan(...definition.next, planScale);
  const heading = Math.atan2(next.x - start.x, next.z - start.z);
  const timeTrialSpawn = definition.timeTrialStart ? pointFromPlan(...definition.timeTrialStart, planScale) : start;
  const timeTrialSpawnNext = definition.timeTrialNext ? pointFromPlan(...definition.timeTrialNext, planScale) : next;
  const timeTrialHeading = Math.atan2(timeTrialSpawnNext.x - timeTrialSpawn.x, timeTrialSpawnNext.z - timeTrialSpawn.z);
  const startLine = getStartFinishLineState(definition, samples, widthProfile, planScale);
  const segmentLines = getTimeTrialSegmentLines(samples, widthProfile, startLine);
  const startSampleIndex = startLine ? getNearestSampleIndex(samples, startLine.start) : getNearestSampleIndex(samples, start);
  const sampleSpacing = getAverageSampleSpacing(samples);

  return {
    group,
    environment,
    samples,
    widthProfile,
    sampleSpacing,
    startSampleIndex,
    start: { x: start.x, z: start.z, heading },
    timeTrialStart: { x: timeTrialSpawn.x, z: timeTrialSpawn.z, heading: timeTrialHeading },
    startLine,
    segmentLines,
    extraTrackAreas,
    obstacles,
    groundY: 0.14,
    kerbY: 0.28,
    sausageY: 0.34,
    sample(x, z) {
      for (const area of extraTrackAreas) {
        if (area.kind === "curve" && isPointInExtraTrackArea(x, z, area)) return { kind: "track", distance: 0 };
      }
      for (const kind of ["sausage", "kerb", "painted-kerb"]) {
        for (const area of extraTrackAreas) {
          if (area.kind !== kind) continue;
          const contact = getExtraTrackAreaContact(x, z, area);
          if (contact > 0) return { kind: area.kind, distance: 0, amount: contact };
        }
      }

      let bestDistance = Infinity;
      let bestIndex = 0;

      for (let i = 0; i < samples.length; i += 1) {
        const dx = x - samples[i].x;
        const dz = z - samples[i].z;
        const distance = dx * dx + dz * dz;
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      }

      const distance = Math.sqrt(bestDistance);
      if (distance <= widthProfile[bestIndex]) return { kind: "track", distance };
      if (definition.cornerOnlyKerbs) {
        for (const kind of ["sausage", "kerb", "painted-kerb"]) {
          for (const area of extraTrackAreas) {
            if (area.kind !== kind) continue;
            const contact = getExtraTrackAreaContact(x, z, area);
            if (contact > 0) return { kind: area.kind, distance, amount: contact };
          }
        }
        return { kind: "grass", distance };
      }
      if (distance <= widthProfile[bestIndex] + kerbWidth) return { kind: "kerb", distance };
      return { kind: "grass", distance };
    },
  };
}

function pointFromPlan(x, y, scale = 0.168) {
  return new THREE.Vector3((x - 800) * scale, 0, (y - 450) * scale);
}

function getAverageSampleSpacing(samples) {
  if (!samples.length) return 1;
  let total = 0;
  for (let i = 0; i < samples.length; i += 1) {
    total += samples[i].distanceTo(samples[(i + 1) % samples.length]);
  }
  return Math.max(0.25, total / samples.length);
}

function getTrackWidthProfile(definition, sampleCount, fallbackHalfWidth) {
  if (!definition.widthSamples?.length) return Array(sampleCount).fill(fallbackHalfWidth);
  return Array.from({ length: sampleCount }, (_, index) => {
    const t = index / Math.max(1, sampleCount - 1);
    const exactIndex = t * (definition.widthSamples.length - 1);
    const lowerIndex = Math.floor(exactIndex);
    const upperIndex = Math.min(definition.widthSamples.length - 1, lowerIndex + 1);
    const blend = exactIndex - lowerIndex;
    const lowerWidth = definition.widthSamples[lowerIndex] ?? fallbackHalfWidth;
    const upperWidth = definition.widthSamples[upperIndex] ?? lowerWidth;
    return THREE.MathUtils.lerp(lowerWidth, upperWidth, blend);
  });
}

function addStartFinishLine(group, definition, samples, widthProfile, planScale) {
  const lineState = getStartFinishLineState(definition, samples, widthProfile, planScale);
  if (!lineState) return;
  const { start, tangent, across, halfWidth } = lineState;
  const lineThickness = 2;
  const lineY = 0.315;
  const leftFront = start.clone().addScaledVector(across, -halfWidth).addScaledVector(tangent, lineThickness * 0.5);
  const rightFront = start.clone().addScaledVector(across, halfWidth).addScaledVector(tangent, lineThickness * 0.5);
  const rightBack = start.clone().addScaledVector(across, halfWidth).addScaledVector(tangent, -lineThickness * 0.5);
  const leftBack = start.clone().addScaledVector(across, -halfWidth).addScaledVector(tangent, -lineThickness * 0.5);
  for (const point of [leftFront, rightFront, rightBack, leftBack]) point.y = lineY;

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute([
    leftFront.x, leftFront.y, leftFront.z,
    rightFront.x, rightFront.y, rightFront.z,
    rightBack.x, rightBack.y, rightBack.z,
    leftBack.x, leftBack.y, leftBack.z,
  ], 3));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();

  const line = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.68,
      metalness: 0.01,
      side: THREE.DoubleSide,
    }),
  );
  line.receiveShadow = true;
  group.add(line);
}

function getStartFinishLineState(definition, samples, widthProfile, planScale) {
  if (!definition.start || !definition.next) return null;
  const start = pointFromPlan(...definition.start, planScale);
  const next = pointFromPlan(...definition.next, planScale);
  const tangent = next.clone().sub(start);
  tangent.y = 0;
  if (tangent.lengthSq() < 0.0001) return null;
  tangent.normalize();
  const across = new THREE.Vector3(tangent.z, 0, -tangent.x);

  let nearestIndex = 0;
  let nearestDistance = Infinity;
  for (let i = 0; i < samples.length; i += 1) {
    const distance = start.distanceToSquared(samples[i]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = i;
    }
  }

  const halfWidth = widthProfile[nearestIndex] ?? definition.halfWidth ?? 7.2;
  return { start, tangent, across, halfWidth };
}

function getTimeTrialSegmentLines(samples, widthProfile, startLine) {
  if (!samples.length) return [];
  const startIndex = startLine ? getNearestSampleIndex(samples, startLine.start) : 0;
  return [1 / 3, 2 / 3].map((ratio) => {
    const index = (startIndex + Math.round(ratio * samples.length)) % samples.length;
    const prev = samples[(index - 1 + samples.length) % samples.length];
    const next = samples[(index + 1) % samples.length];
    const tangent = next.clone().sub(prev);
    tangent.y = 0;
    if (tangent.lengthSq() < 0.0001) tangent.set(0, 0, 1);
    tangent.normalize();
    return {
      start: samples[index].clone(),
      tangent,
      across: new THREE.Vector3(tangent.z, 0, -tangent.x),
      halfWidth: widthProfile[index] ?? widthProfile[0] ?? 7.2,
    };
  });
}

function getNearestSampleIndex(samples, point) {
  let nearestIndex = 0;
  let nearestDistance = Infinity;
  for (let i = 0; i < samples.length; i += 1) {
    const distance = point.distanceToSquared(samples[i]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = i;
    }
  }
  return nearestIndex;
}

function createAsphaltMaterial() {
  const texture = makeAsphaltTexture(192);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(30, 30);
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    roughness: 0.88,
    metalness: 0.025,
    flatShading: false,
  });
}

function makeAsphaltTexture(size) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const context = textureCanvas.getContext("2d");
  context.fillStyle = "#8f928b";
  context.fillRect(0, 0, size, size);

  const image = context.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const aggregate = (Math.random() - 0.5) * 64;
      const pebble = Math.sin(x * 1.7 + Math.random() * 1.2) * Math.sin(y * 1.35) * 8;
      const directionGrain = Math.sin(x * 0.22 + y * 0.055) * 12;
      const rubber = Math.max(0, Math.sin(x * 0.035 + y * 0.012)) * 18;
      const fleck = aggregate + pebble + directionGrain - rubber;
      image.data[i] = THREE.MathUtils.clamp(142 + fleck, 66, 202);
      image.data[i + 1] = THREE.MathUtils.clamp(144 + fleck, 68, 204);
      image.data[i + 2] = THREE.MathUtils.clamp(138 + fleck, 62, 196);
      image.data[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  context.globalAlpha = 0.24;
  context.strokeStyle = "#555750";
  for (let i = 0; i < 32; i += 1) {
    const y = Math.random() * size;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(size * 0.3, y + Math.random() * 12 - 6, size * 0.65, y + Math.random() * 16 - 8, size, y + Math.random() * 12 - 6);
    context.stroke();
  }

  context.globalAlpha = 0.18;
  context.strokeStyle = "#2f302d";
  context.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    const x = size * (0.35 + i * 0.06 + Math.random() * 0.04);
    context.beginPath();
    context.moveTo(x, 0);
    context.bezierCurveTo(x + Math.random() * 18 - 9, size * 0.33, x + Math.random() * 22 - 11, size * 0.66, x + Math.random() * 18 - 9, size);
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

function createEnvironmentMaterial(environment = "grass") {
  if (environment === "tarmac") return createTarmacEnvironmentMaterial();
  if (environment === "dirt") return createDirtEnvironmentMaterial();
  return createGrassMaterial();
}

function createTarmacEnvironmentMaterial() {
  const texture = makeTarmacEnvironmentTexture(192);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(24, 18);
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    roughness: 0.94,
    metalness: 0.01,
    flatShading: false,
  });
}

function createDirtEnvironmentMaterial() {
  const texture = makeDirtEnvironmentTexture(160);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(26, 19);
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    roughness: 1,
    flatShading: true,
  });
}

function makeTarmacEnvironmentTexture(size) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const context = textureCanvas.getContext("2d");
  context.fillStyle = "#52534f";
  context.fillRect(0, 0, size, size);
  const image = context.getImageData(0, 0, size, size);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const grain = (Math.random() - 0.5) * 28;
      const rubber = Math.max(0, Math.sin(x * 0.055 + y * 0.018)) * 10;
      const patch = Math.sin(x * 0.11) * Math.sin(y * 0.075) * 5;
      const value = THREE.MathUtils.clamp(80 + grain + patch - rubber, 54, 108);
      image.data[i] = value;
      image.data[i + 1] = THREE.MathUtils.clamp(value + 2, 40, 128);
      image.data[i + 2] = THREE.MathUtils.clamp(value - 1, 34, 120);
      image.data[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  context.globalAlpha = 0.13;
  context.strokeStyle = "#30322f";
  context.lineWidth = 1.4;
  for (let i = 0; i < 10; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x + Math.random() * 42 - 21, y + size * 0.18, x + Math.random() * 56 - 28, y + size * 0.36, x + Math.random() * 66 - 33, y + size * 0.55);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeDirtEnvironmentTexture(size) {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = size;
  textureCanvas.height = size;
  const context = textureCanvas.getContext("2d");
  context.fillStyle = "#725038";
  context.fillRect(0, 0, size, size);
  const image = context.getImageData(0, 0, size, size);

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const dust = (Math.random() - 0.5) * 46;
      const pebble = Math.sin(x * 1.4 + Math.random()) * Math.sin(y * 0.9) * 10;
      const rut = Math.sin((x * 0.06 + y * 0.018)) * 16;
      image.data[i] = THREE.MathUtils.clamp(112 + dust + pebble + rut, 58, 148);
      image.data[i + 1] = THREE.MathUtils.clamp(78 + dust * 0.7 + pebble, 42, 112);
      image.data[i + 2] = THREE.MathUtils.clamp(46 + dust * 0.45, 24, 78);
      image.data[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  context.globalAlpha = 0.2;
  context.strokeStyle = "#5f3d24";
  context.lineWidth = 2;
  for (let i = 0; i < 16; i += 1) {
    const y = Math.random() * size;
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(size * 0.3, y + Math.random() * 18 - 9, size * 0.65, y + Math.random() * 22 - 11, size, y + Math.random() * 18 - 9);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
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
  context.globalAlpha = 0.18;
  context.strokeStyle = "#2f302d";
  context.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    const x = size * (0.35 + i * 0.06 + Math.random() * 0.04);
    context.beginPath();
    context.moveTo(x, 0);
    context.bezierCurveTo(x + Math.random() * 18 - 9, size * 0.33, x + Math.random() * 22 - 11, size * 0.66, x + Math.random() * 18 - 9, size);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function scatterGrassTufts(group, samples, avoidDistance, options = {}) {
  const tuftMaterial = new THREE.MeshStandardMaterial({ color: options.color ?? 0x3f8f34, roughness: 1, flatShading: true });
  const tuftGeometry = new THREE.ConeGeometry(0.16, 0.7, 4);
  const count = options.count ?? 170;
  const spreadX = options.spreadX ?? 460;
  const spreadZ = options.spreadZ ?? 310;
  const minScale = options.minScale ?? 0.65;
  const maxScale = options.maxScale ?? 1.35;

  for (let i = 0; i < count; i += 1) {
    const x = THREE.MathUtils.randFloatSpread(spreadX);
    const z = THREE.MathUtils.randFloatSpread(spreadZ);
    if (distanceToSamples(x, z, samples) < avoidDistance + 4) continue;

    const tuft = new THREE.Mesh(tuftGeometry, tuftMaterial);
    tuft.position.set(x, 0.25, z);
    tuft.rotation.y = Math.random() * Math.PI;
    tuft.scale.setScalar(THREE.MathUtils.randFloat(minScale, maxScale));
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
    stand.add(person);
  }

  stand.position.copy(pose.position);
  stand.rotation.y = pose.angle + Math.PI / 2;
  group.add(stand);
}

function addKerbSurfaceObject(group, samples, spec, extraTrackAreas) {
  const material = new THREE.MeshStandardMaterial({ color: 0xffc83d, roughness: 0.72, metalness: 0.02, flatShading: true });
  const segmentCount = Math.max(1, spec.segmentCount ?? editorTrack.nodes.length);
  const segmentStart = THREE.MathUtils.clamp((spec.segment ?? 0) / segmentCount, 0, 0.999);
  const segmentSpan = 1 / segmentCount;
  const startT = segmentStart + segmentSpan * THREE.MathUtils.clamp(spec.start ?? 0.16, 0, 0.96);
  const endT = segmentStart + segmentSpan * THREE.MathUtils.clamp(spec.end ?? 0.58, 0.04, 1);
  const startIndex = Math.floor(startT * samples.length);
  const endIndex = Math.max(startIndex + 2, Math.floor(endT * samples.length));
  const width = spec.width ?? 1.35;
  const height = spec.height ?? 0.28;
  const side = spec.side ?? 1;
  const centerOffset = side * ((spec.trackHalfWidth ?? 7.2) + width * 0.5);
  const kerbPoints = [];

  for (let i = startIndex; i <= endIndex; i += 2) {
    kerbPoints.push(getTrackPoseAt(samples, (i % samples.length) / samples.length, centerOffset).position);
  }

  for (let i = 0; i < kerbPoints.length - 1; i += 1) {
    const current = kerbPoints[i];
    const next = kerbPoints[i + 1];
    const length = Math.max(0.8, current.distanceTo(next));
    const angle = Math.atan2(next.x - current.x, next.z - current.z);
    const block = new THREE.Mesh(makeKerbBlockGeometry(length, width, height), material);
    block.position.copy(current).lerp(next, 0.5);
    block.position.y = 0.12;
    block.rotation.y = angle;
    block.castShadow = true;
    block.receiveShadow = true;
    group.add(block);
  }

  extraTrackAreas.push({ kind: "kerb", points: kerbPoints, halfWidth: width * 0.72, height, surface: "kerb" });
}
function addCornerKerbBlocks(group, samples, spec, extraTrackAreas) {
  const red = new THREE.MeshStandardMaterial({ color: 0x8f1414, roughness: 0.78, flatShading: true, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  const startIndex = Math.floor(spec.t * samples.length);
  const step = 2;
  const kerbCenterOffset = spec.side * ((spec.trackHalfWidth ?? 9.4) + 0.72);
  const kerbHalfWidth = 1.2;
  const kerbLength = 4.1;

  for (let i = 0; i < spec.count; i += 1) {
    const index = (startIndex + i * step) % samples.length;
    const localT = index / samples.length;
    const pose = getTrackPoseAt(samples, localT, kerbCenterOffset);
    const block = new THREE.Mesh(makeKerbBlockGeometry(kerbLength, kerbHalfWidth * 2, 0.28), red);
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
  return getExtraTrackAreaContact(x, z, area) > 0;
}

function getExtraTrackAreaContact(x, z, area) {
  if (area.kind !== "curve" && area.kind !== "kerb" && area.kind !== "sausage" && area.kind !== "painted-kerb") return 0;
  let bestDistance = Infinity;
  for (let i = 0; i < area.points.length - 1; i += 1) {
    const distance = distanceToSegment2D(x, z, area.points[i], area.points[i + 1]);
    if (distance < bestDistance) bestDistance = distance;
  }
  if (bestDistance > area.halfWidth) return 0;
  if (area.kind !== "sausage") return 1;
  return THREE.MathUtils.smoothstep(1 - bestDistance / Math.max(0.001, area.halfWidth), 0, 1);
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

function makeTrackBand(samples, outerHalfWidth, innerHalfWidth, outerY, innerY) {
  const vertices = [];
  const indices = [];

  for (let i = 0; i < samples.length; i += 1) {
    const prev = samples[(i - 1 + samples.length) % samples.length];
    const next = samples[(i + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const outer = samples[i].clone().addScaledVector(normal, outerHalfWidth);
    const inner = samples[i].clone().addScaledVector(normal, innerHalfWidth);
    vertices.push(outer.x, outerY, outer.z, inner.x, innerY, inner.z);
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

function addTrackEdgeLines(group, samples, halfWidth, material, widthProfile = null) {
  const edgeLineWidth = 0.98;
  const edgeInset = 0.03;
  const outerY = 0.092;
  const innerY = 0.12;
  const edgeSets = [
    getEdgeLinePoints(samples, halfWidth - edgeInset, halfWidth - edgeInset - edgeLineWidth, widthProfile, 1),
    getEdgeLinePoints(samples, -halfWidth + edgeInset + edgeLineWidth, -halfWidth + edgeInset, widthProfile, -1),
  ];
  const leftGeometry = makeSegmentedEdgeLine(edgeSets[0], edgeSets, 0, outerY, innerY);
  const rightGeometry = makeSegmentedEdgeLine(edgeSets[1], edgeSets, 1, innerY, outerY);

  for (const geometry of [leftGeometry, rightGeometry]) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    group.add(mesh);
  }
}

function getEdgeLinePoints(samples, outerHalfWidth, innerHalfWidth, widthProfile = null, side = 1) {
  return samples.map((sample, index) => {
    const prev = samples[(index - 1 + samples.length) % samples.length];
    const next = samples[(index + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const localHalfWidth = widthProfile?.[index] ?? Math.abs(outerHalfWidth);
    const outerOffset = side * (localHalfWidth - 0.03);
    const innerOffset = side * (localHalfWidth - 0.03 - 0.98);
    return {
      outer: sample.clone().addScaledVector(normal, widthProfile ? outerOffset : outerHalfWidth),
      inner: sample.clone().addScaledVector(normal, widthProfile ? innerOffset : innerHalfWidth),
      center: sample.clone().addScaledVector(normal, widthProfile ? (outerOffset + innerOffset) * 0.5 : (outerHalfWidth + innerHalfWidth) * 0.5),
    };
  });
}

function makeSegmentedEdgeLine(points, edgeSets, sideIndex, outerY, innerY) {
  const vertices = [];
  const indices = [];
  const clearPoints = points.map((point, index) => isEdgeLinePointClear(point.center, edgeSets, sideIndex, index));

  for (let i = 0; i < points.length; i += 1) {
    const nextIndex = (i + 1) % points.length;
    if (!clearPoints[i] || !clearPoints[nextIndex]) continue;
    if (points[i].center.distanceTo(points[nextIndex].center) > 3.6) continue;

    const base = vertices.length / 3;
    vertices.push(
      points[i].outer.x, outerY, points[i].outer.z,
      points[nextIndex].outer.x, outerY, points[nextIndex].outer.z,
      points[i].inner.x, innerY, points[i].inner.z,
      points[nextIndex].inner.x, innerY, points[nextIndex].inner.z,
    );
    indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function isEdgeLinePointClear(point, edgeSets, sideIndex, index) {
  const neighborWindow = 18;
  const mergeDistance = 1.75;
  for (const [setIndex, edgePoints] of edgeSets.entries()) {
    for (let i = 0; i < edgePoints.length; i += 1) {
      const circularDistance = Math.min(
        Math.abs(i - index),
        edgePoints.length - Math.abs(i - index),
      );
      if (setIndex === sideIndex && circularDistance <= neighborWindow) continue;
      if (setIndex !== sideIndex && circularDistance <= 3) continue;
      if (point.distanceTo(edgePoints[i].center) < mergeDistance) return false;
    }
  }
  return true;
}

function makeCrownedTrackStrip(samples, halfWidth, edgeY, crownY) {
  const vertices = [];
  const indices = [];
  const bands = [
    { offset: halfWidth, y: edgeY },
    { offset: halfWidth * 0.52, y: edgeY + (crownY - edgeY) * 0.55 },
    { offset: 0, y: crownY },
    { offset: -halfWidth * 0.52, y: edgeY + (crownY - edgeY) * 0.55 },
    { offset: -halfWidth, y: edgeY },
  ];

  for (let i = 0; i < samples.length; i += 1) {
    const prev = samples[(i - 1 + samples.length) % samples.length];
    const next = samples[(i + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);

    for (const band of bands) {
      const point = samples[i].clone().addScaledVector(normal, band.offset);
      vertices.push(point.x, band.y, point.z);
    }
  }

  for (let i = 0; i < samples.length; i += 1) {
    const row = i * bands.length;
    const nextRow = ((i + 1) % samples.length) * bands.length;
    for (let band = 0; band < bands.length - 1; band += 1) {
      const a = row + band;
      const b = nextRow + band;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function makeVariableCrownedTrackStrip(samples, widthProfile, edgeY, crownY) {
  const vertices = [];
  const indices = [];
  const widthBands = [1, 0.52, 0, -0.52, -1];

  for (let i = 0; i < samples.length; i += 1) {
    const prev = samples[(i - 1 + samples.length) % samples.length];
    const next = samples[(i + 1) % samples.length];
    const tangent = next.clone().sub(prev).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const halfWidth = widthProfile[i] ?? widthProfile[0] ?? 7.2;

    for (const band of widthBands) {
      const edgeRatio = Math.abs(band);
      const y = edgeRatio === 0 ? crownY : edgeY + (crownY - edgeY) * (1 - edgeRatio) * 0.55;
      const point = samples[i].clone().addScaledVector(normal, halfWidth * band);
      vertices.push(point.x, y, point.z);
    }
  }

  for (let i = 0; i < samples.length; i += 1) {
    const row = i * widthBands.length;
    const nextRow = ((i + 1) % samples.length) * widthBands.length;
    for (let band = 0; band < widthBands.length - 1; band += 1) {
      const a = row + band;
      const b = nextRow + band;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
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
  if (scheme.rearWingStripe) {
    const rearWingStripe = new THREE.Mesh(
      new THREE.BoxGeometry(2.72, 0.086, 0.1),
      createRacePaintMaterial(scheme.rearWingStripe, 0.26, 0.36),
    );
    rearWingStripe.position.y = 0.005;
    rearWingStripe.castShadow = true;
    rearWing.add(rearWingStripe);
  }
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
  const rimMaterial = new THREE.MeshStandardMaterial({ color: scheme.rim ?? 0xf0d264, roughness: 0.5, metalness: 0.15, flatShading: true });

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
  if (corvettePaintSchemes[carId]) return addUniversalHeadlights(createCorvette(carId), "corvette");
  if (lmpPaintSchemes[carId]) return addUniversalHeadlights(createLeMansPrototype(carId), "lmp");
  if (stockPaintSchemes[carId]) return addUniversalHeadlights(createStockCar(carId), "stock");
  if (jeepPaintSchemes[carId]) return addUniversalHeadlights(createJeep(carId), "jeep");
  return addUniversalHeadlights(createFormulaCar(carId), "formula");
}

function addUniversalHeadlights(car, kind = "formula") {
  const headlightIntensity = 6.8;
  const headlightDistance = 440;
  const headlightAngle = kind === "jeep" ? 0.36 : 0.31;
  car.lights ??= {};
  car.lights.headlights ??= [];
  car.lights.headlightMeshes ??= [];
  car.lights.brakeLights ??= [];
  car.lights.nitrousFlames ??= [];

  const layouts = {
    formula: { xs: [-0.34, 0.34], y: 0.43, z: 2.92, targetY: 0.18, targetZ: 24, width: 0.24, height: 0.08 },
    lmp: { xs: [-0.58, 0.58], y: 0.46, z: 2.18, targetY: 0.18, targetZ: 24, width: 0.34, height: 0.1 },
    stock: { xs: [-0.64, 0.64], y: 0.68, z: 2.82, targetY: 0.2, targetZ: 25, width: 0.38, height: 0.14 },
    jeep: { xs: [-0.78, 0.78], y: 0.98, z: 2.36, targetY: 0.28, targetZ: 25, width: 0.3, height: 0.3 },
    corvette: { xs: [-0.58, 0.58], y: 0.61, z: 2.58, targetY: 0.24, targetZ: 24, width: 0.44, height: 0.12 },
  };
  const layout = layouts[kind] ?? layouts.formula;
  const lampMaterial = new THREE.MeshStandardMaterial({
    color: 0xf6f2dc,
    emissive: 0xffd782,
    emissiveIntensity: 2.4,
    roughness: 0.24,
    metalness: 0.08,
    flatShading: true,
  });
  for (const mesh of car.lights.headlightMeshes) {
    mesh.userData.headlightOnIntensity = 2;
    mesh.userData.headlightOffIntensity = 0.08;
  }
  if (!car.lights.headlightMeshes.length) {
    for (const x of layout.xs) {
      const headlight = new THREE.Mesh(new THREE.BoxGeometry(layout.width, layout.height, 0.08), lampMaterial.clone());
      headlight.position.set(x, layout.y, layout.z);
      headlight.rotation.x = -0.14;
      headlight.rotation.z = -x * 0.12;
      headlight.userData.headlightOnIntensity = 2;
      headlight.userData.headlightOffIntensity = 0.08;
      car.body.add(headlight);
      car.lights.headlightMeshes.push(headlight);
    }
  }

  while (car.lights.headlights.length > 1) {
    const extra = car.lights.headlights.pop();
    extra.parent?.remove(extra.target);
    extra.parent?.remove(extra);
  }
  let realBeam = car.lights.headlights[0];
  if (!realBeam) {
    realBeam = new THREE.SpotLight(0xbfe8ff, headlightIntensity, headlightDistance, headlightAngle, 0.62, 1.12);
    car.body.add(realBeam, realBeam.target);
    car.lights.headlights.push(realBeam);
  }
  realBeam.position.set(0, layout.y + 0.08, layout.z + 0.08);
  realBeam.target.position.set(0, layout.targetY, layout.targetZ);
  realBeam.intensity = headlightIntensity;
  realBeam.distance = headlightDistance;
  realBeam.angle = headlightAngle;
  realBeam.penumbra = 0.62;
  realBeam.decay = 1.12;
  realBeam.castShadow = false;

  return rememberWheelBaseHeights(car);
}

function createCorvette(paint = "vette-yellow") {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);

  const scheme = corvettePaintSchemes[paint] ?? corvettePaintSchemes["vette-yellow"];
  const primary = createRacePaintMaterial(scheme.primary, 0.16, 0.62);
  const secondary = createRacePaintMaterial(scheme.secondary, 0.2, 0.5);
  const stripe = createRacePaintMaterial(scheme.stripe, 0.18, 0.52);
  const glass = new THREE.MeshStandardMaterial({ color: scheme.glass, roughness: 0.12, metalness: 0.18, flatShading: true });
  const black = new THREE.MeshStandardMaterial({ color: 0x0e0f10, roughness: 0.58, metalness: 0.08, flatShading: true });
  const lamp = new THREE.MeshStandardMaterial({ color: 0xf6f2dc, emissive: 0xffd782, emissiveIntensity: 0.18, roughness: 0.22, metalness: 0.1, flatShading: true });
  const tailLamp = new THREE.MeshStandardMaterial({ color: 0xc51622, emissive: 0xb00012, emissiveIntensity: 0.22, roughness: 0.28, flatShading: true });
  const flameMaterial = new THREE.MeshStandardMaterial({ color: 0x7bdcff, emissive: 0x1d8cff, emissiveIntensity: 1.8, transparent: true, opacity: 0.9, roughness: 0.35, flatShading: true });
  const rimMaterial = new THREE.MeshStandardMaterial({ color: scheme.rim, roughness: 0.22, metalness: 0.55, flatShading: true });
  const headlightMeshes = [];
  const headlightBeams = [];
  const brakeLights = [];
  const nitrousFlames = [];

  const chassis = createStockCarBody(primary);
  chassis.scale.set(0.88, 0.72, 0.96);
  chassis.position.y = 0.48;
  chassis.castShadow = true;
  body.add(chassis);

  const hood = createSlopedStockHood(primary);
  hood.scale.set(0.86, 0.72, 0.92);
  hood.position.set(0, 0.82, 1.48);
  hood.rotation.x = -0.08;
  hood.castShadow = true;
  body.add(hood);

  const rearDeck = createTaperedBox(1.7, 2.05, 0.28, 1.72, primary);
  rearDeck.position.set(0, 0.82, -1.58);
  rearDeck.rotation.x = 0.08;
  rearDeck.castShadow = true;
  body.add(rearDeck);

  const cabin = createTaperedBox(1.22, 1.7, 0.72, 1.62, primary);
  cabin.position.set(0, 1.08, -0.26);
  cabin.scale.y = 0.9;
  cabin.castShadow = true;
  body.add(cabin);

  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.08, 0.74), glass);
  windshield.position.set(0, 1.29, 0.42);
  windshield.rotation.x = -0.72;
  body.add(windshield);

  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.08, 0.84), glass);
  rearGlass.position.set(0, 1.24, -1.08);
  rearGlass.rotation.x = 0.62;
  body.add(rearGlass);

  for (const x of [-0.88, 0.88]) {
    const sideWindow = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.72), glass);
    sideWindow.position.set(x, 1.2, -0.3);
    body.add(sideWindow);

    const sideBlade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.32, 1.12), secondary);
    sideBlade.position.set(x * 1.08, 0.78, -0.28);
    sideBlade.rotation.z = x > 0 ? -0.16 : 0.16;
    body.add(sideBlade);

    const sideVent = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.24, 0.72), black);
    sideVent.position.set(x * 1.13, 0.74, 0.76);
    sideVent.rotation.z = x > 0 ? -0.08 : 0.08;
    body.add(sideVent);
  }

  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.22, 0.08), black);
  grille.position.set(0, 0.48, 2.56);
  grille.rotation.x = -0.15;
  body.add(grille);

  for (const x of [-0.58, 0.58]) {
    const headlight = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.12, 0.09), lamp.clone());
    headlight.position.set(x, 0.61, 2.58);
    headlight.rotation.x = -0.16;
    headlight.rotation.z = -x * 0.18;
    body.add(headlight);
    headlightMeshes.push(headlight);

    const beam = new THREE.SpotLight(0xbfe8ff, 1.9, 42, 0.34, 0.5, 1.35);
    beam.position.set(x, 0.68, 2.65);
    beam.target.position.set(x * 0.72, 0.28, 15);
    body.add(beam, beam.target);
    headlightBeams.push(beam);
  }

  for (const x of [-0.58, -0.26, 0.26, 0.58]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.08), tailLamp.clone());
    tail.position.set(x, 0.68, -2.54);
    body.add(tail);
    brakeLights.push(tail);
  }

  for (const x of [-0.34, 0.34]) {
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.22, 10), black);
    exhaust.rotation.x = Math.PI / 2;
    exhaust.position.set(x, 0.36, -2.68);
    body.add(exhaust);

    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.62, 9), flameMaterial.clone());
    flame.rotation.x = -Math.PI / 2;
    flame.position.set(x, 0.36, -2.98);
    flame.scale.set(0, 0, 0);
    flame.visible = false;
    body.add(flame);
    nitrousFlames.push(flame);
  }

  const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.08, 0.28), black);
  splitter.position.set(0, 0.28, 2.58);
  splitter.castShadow = true;
  body.add(splitter);

  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.08, 0.1, 0.2), secondary);
  spoiler.position.set(0, 0.98, -2.58);
  spoiler.rotation.x = 0.14;
  spoiler.castShadow = true;
  body.add(spoiler);

  const hoodVent = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.045, 0.46), black);
  hoodVent.position.set(0, 0.94, 1.42);
  hoodVent.rotation.x = -0.1;
  body.add(hoodVent);

  for (const x of [-0.64, 0.64]) {
    const hoodCrease = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 1.65), secondary);
    hoodCrease.position.set(x, 0.98, 1.25);
    hoodCrease.rotation.x = -0.1;
    hoodCrease.rotation.z = x > 0 ? -0.12 : 0.12;
    body.add(hoodCrease);
  }

  const stripeXs = scheme.stripes ? [-0.18, 0.18] : [0];
  for (const x of stripeXs) {
    const stripeWidth = scheme.stripes ? 0.14 : 0.12;
    const centerStripe = new THREE.Mesh(new THREE.BoxGeometry(stripeWidth, 0.055, 4.72), stripe);
    centerStripe.position.set(x, 1.03, 0.08);
    body.add(centerStripe);
  }

  const wheelMeshes = [];
  const wheels = {};
  const tireGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 16);
  tireGeometry.rotateZ(Math.PI / 2);
  const rimGeometry = new THREE.CylinderGeometry(0.29, 0.29, 0.53, 12);
  rimGeometry.rotateZ(Math.PI / 2);

  for (const [name, x, z] of [
    ["frontLeft", -1.02, 1.74],
    ["frontRight", 1.02, 1.74],
    ["rearLeft", -1.06, -1.76],
    ["rearRight", 1.06, -1.76],
  ]) {
    const pivot = new THREE.Group();
    const tire = new THREE.Mesh(tireGeometry, black);
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    tire.castShadow = true;
    tire.receiveShadow = true;
    rim.castShadow = true;
    pivot.position.set(x, 0.4, z);
    pivot.add(tire, rim);
    wheels[name] = pivot;
    wheelMeshes.push(tire);
    body.add(pivot);
  }

  for (const x of [-1.04, 1.04]) {
    const sideSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 3.85), primary);
    sideSkirt.position.set(x, 0.58, -0.1);
    sideSkirt.castShadow = true;
    body.add(sideSkirt);

    for (const z of [1.74, -1.76]) {
      const upperArch = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.24, 0.92), primary);
      upperArch.position.set(x, 0.82, z);
      upperArch.castShadow = true;
      body.add(upperArch);

      const archLip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.42), secondary);
      archLip.position.set(x, 0.62, z + (z > 0 ? -0.48 : 0.48));
      archLip.castShadow = true;
      body.add(archLip);
    }
  }

  return {
    root,
    body,
    wheels,
    wheelMeshes,
    lights: { headlights: headlightBeams, headlightMeshes, brakeLights, nitrousFlames },
  };
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

function getCarProfileById(carId) {
  return carProfiles[carId] ?? carProfiles.ferraro;
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

function getAutoGear(forwardSpeed, profile = getCarProfile(), throttle = 0, brake = 0) {
  const gearSpeedBands = getGearSpeedBands(profile);
  if (throttle) return forwardSpeed < gearSpeedBands[1] ? 1 : getAutoGear(forwardSpeed, profile, 0, brake);
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
  stopMenuMusic();
  startMenu.classList.add("is-hidden");
  trackEditor.classList.remove("is-hidden");
  if (trackNameInput) trackNameInput.value = editorTrack.name;
  if (trackTimeOfDaySelect) trackTimeOfDaySelect.value = editorTrack.timeOfDay ?? "day";
  if (trackEnvironmentSelect) trackEnvironmentSelect.value = editorTrack.environment ?? "grass";
  startEditorMusic();
  updateEditorZoom(editorZoom);
  updateTrackWidthReadout();
  updateCurveBendReadout();
  sceneryTypeSelect.closest(".editor-select")?.classList.add("is-hidden");
  updateEditorControlVisibility();
  renderTrackEditor();
}

function startTrackEditorFrom(sourceId) {
  const defaultEditorTracks = {
    [KATARA_TRACK_ID]: kataraSpeedwayTrack,
    [KYOSHI_TRACK_ID]: kyoshiCircuitTrack,
    [MAKO_TRACK_ID]: makoCityTrack,
    [YUE_TRACK_ID]: yueRingTrack,
  };
  if (sourceId === "scratch") {
    resetEditorTrack();
  } else if (defaultEditorTracks[sourceId]) {
    loadEditorTrackData(defaultEditorTracks[sourceId]);
  } else {
    resetEditorTrack();
  }
  openTrackEditor();
}

function resetEditorTrack() {
  Object.assign(editorTrack, {
    name: randomEditorTrackName(),
    timeOfDay: "day",
    environment: "grass",
    closed: true,
    startNode: 0,
    startDirection: 1,
    startSegment: 0,
    nodes: [
      { x: 2400, y: 6300, width: 15, curve: 0 },
      { x: 9000, y: 2700, width: 15, curve: 0 },
      { x: 15600, y: 6300, width: 15, curve: 0 },
      { x: 9000, y: 9900, width: 15, curve: 0 },
    ],
    roadFeatures: [],
    scenery: [],
    kerbs: [],
    pitLane: [],
  });
  editorUndoStack.length = 0;
  pendingEditorUndoSnapshot = null;
  selectedEditorNode = 0;
  selectedEditorSegment = 0;
  selectedEditorScenery = -1;
  setEditorTool("select");
}

function loadEditorTrackData(trackData) {
  Object.assign(editorTrack, {
    name: trackData.name || randomEditorTrackName(),
    timeOfDay: trackData.timeOfDay ?? "day",
    environment: trackData.environment ?? "grass",
    closed: trackData.closed ?? true,
    startNode: trackData.startNode ?? 0,
    startDirection: trackData.startDirection ?? 1,
    startSegment: trackData.startSegment ?? trackData.startNode ?? 0,
    nodes: (trackData.nodes ?? []).map((node) => ({
      x: node.x,
      y: node.y,
      width: node.width ?? 15,
      curve: node.curve ?? 0,
    })),
    roadFeatures: (trackData.roadFeatures ?? []).map((features) => ({ ...features })),
    scenery: (trackData.scenery ?? []).map((item) => ({ ...item })),
    kerbs: (trackData.kerbs ?? []).map((kerb) => ({ ...kerb })),
    pitLane: (trackData.pitLane ?? []).map((node) => ({ ...node })),
  });
  editorUndoStack.length = 0;
  pendingEditorUndoSnapshot = null;
  selectedEditorNode = 0;
  selectedEditorSegment = 0;
  selectedEditorScenery = -1;
  setEditorTool("select");
}

function randomEditorTrackName() {
  return TRACK_NAME_OPTIONS[Math.floor(Math.random() * TRACK_NAME_OPTIONS.length)];
}

function cloneEditorTrackState() {
  return JSON.parse(JSON.stringify(editorTrack));
}

function restoreEditorTrackState(snapshot) {
  if (!snapshot) return;
  Object.assign(editorTrack, cloneEditorSnapshot(snapshot));
  if (trackNameInput) trackNameInput.value = editorTrack.name;
  if (trackTimeOfDaySelect) trackTimeOfDaySelect.value = editorTrack.timeOfDay ?? "day";
  if (trackEnvironmentSelect) trackEnvironmentSelect.value = editorTrack.environment ?? "grass";
  syncEditorControlsFromSelection();
}

function cloneEditorSnapshot(snapshot) {
  return JSON.parse(JSON.stringify(snapshot));
}

function pushEditorUndoState() {
  editorUndoStack.push(cloneEditorTrackState());
  if (editorUndoStack.length > 80) editorUndoStack.shift();
}

function beginEditorUndoAction() {
  if (!pendingEditorUndoSnapshot) pendingEditorUndoSnapshot = cloneEditorTrackState();
}

function commitEditorUndoAction() {
  if (!pendingEditorUndoSnapshot) return;
  editorUndoStack.push(pendingEditorUndoSnapshot);
  if (editorUndoStack.length > 80) editorUndoStack.shift();
  pendingEditorUndoSnapshot = null;
}

function closeTrackEditor() {
  stopEditorMusic();
  trackEditor.classList.add("is-hidden");
  startMenu.classList.remove("is-hidden");
  setMenuStep("intro");
  startMenuMusic();
}

function clearEditorToolSelection(event) {
  event.preventDefault();
  const point = getEditorPoint(event);
  if (editorTool === "start" && point && isNearEditorStartLine(point)) {
    editorTrack.startDirection *= -1;
    renderTrackEditor();
    return;
  }
  draggedEditorNode = null;
  draggedEditorCurveSegment = null;
  editorGhostPoint = null;
  selectedEditorScenery = -1;
  if (editorTool === "select" || editorTool === "select-road") {
    selectedEditorNode = -1;
    selectedEditorSegment = -1;
  }
  updateEditorControlVisibility();
  renderTrackEditor();
}
function setEditorTool(tool) {
  editorTool = tool;
  for (const button of editorToolButtons) {
    button.classList.toggle("is-selected", button.dataset.editorTool === editorTool);
  }
  editorGhostPoint = null;
  draggedEditorCurveSegment = null;
  if (editorTool !== "select") selectedEditorNode = -1;
  if (editorTool !== "select-road") selectedEditorSegment = -1;
  if (editorTool !== "select-scenery") selectedEditorScenery = -1;
  syncRoadFeatureInputs();
  updateEditorControlVisibility();
  updateEditorStatus();
  renderTrackEditor();
}

function handleEditorPointerDown(event) {
  if (event.button !== 0) return;
  const point = getEditorPoint(event);
  if (!point) return;

  if (editorTool === "add-node") {
    pushEditorUndoState();
    const insertAfter = getEditorAddNodeSegment(point);
    const previous = editorTrack.nodes[insertAfter];
    const next = editorTrack.nodes[(insertAfter + 1) % editorTrack.nodes.length];
    const width = previous && next ? (previous.width + next.width) * 0.5 : Number(trackWidthSlider.value);
    const originalCurve = next?.curve ?? 0;
    const originalFeatures = { ...getEditorRoadFeatures(insertAfter) };
    editorTrack.nodes.splice(insertAfter + 1, 0, { ...point, width, curve: originalCurve * 0.45 });
    if (next) next.curve = originalCurve * 0.45;
    editorTrack.roadFeatures.splice(insertAfter, 1, { ...originalFeatures }, { ...originalFeatures });
    selectedEditorNode = insertAfter + 1;
    selectedEditorSegment = insertAfter;
    selectedEditorScenery = -1;
  } else if (editorTool === "select") {
    const clickedNode = getEditorNodeAtPoint(point);
    selectedEditorNode = clickedNode;
    selectedEditorScenery = -1;
    draggedEditorNode = clickedNode;
    draggedEditorCurveSegment = null;
    if (clickedNode >= 0) {
      beginEditorUndoAction();
      editorCanvas.setPointerCapture(event.pointerId);
      trackWidthSlider.value = editorTrack.nodes[selectedEditorNode]?.width ?? 15;
      curveBendSlider.value = -(editorTrack.nodes[selectedEditorNode]?.curve ?? 0);
    }
    updateEditorControlVisibility();
  } else if (editorTool === "select-road") {
    selectedEditorSegment = getNearestEditorSegment(point);
    selectedEditorNode = -1;
    selectedEditorScenery = -1;
    draggedEditorNode = null;
    draggedEditorCurveSegment = null;
    syncRoadFeatureInputs();
    const features = getEditorRoadFeatures(selectedEditorSegment);
    const segment = getEditorSegment(selectedEditorSegment);
    if (trackWidthSlider && segment) trackWidthSlider.value = features.width ?? getEditorSegmentWidth(segment);
    if (curveBendSlider && segment) curveBendSlider.value = -(segment.b.curve ?? 0);
    updateEditorControlVisibility();
  } else if (editorTool === "select-scenery") {
    const directScenery = event.target?.closest?.("[data-editor-scenery-index]");
    const directIndex = directScenery ? Number(directScenery.getAttribute("data-editor-scenery-index")) : -1;
    const nearestScenery = directIndex >= 0 ? { index: directIndex } : getNearestEditorScenery(point);
    selectedEditorScenery = nearestScenery.index;
    draggedEditorNode = null;
    if (selectedEditorScenery >= 0) {
      beginEditorUndoAction();
      renderTrackEditor();
      editorCanvas.setPointerCapture(event.pointerId);
    }
  } else if (editorTool === "start") {
    pushEditorUndoState();
    editorTrack.startNode = getNearestEditorNode(point);
    editorTrack.startSegment = editorTrack.startNode;
  } else if (editorTool === "pit") {
    pushEditorUndoState();
    editorTrack.pitLane.push({ ...point, width: 6, curve: 0 });
  } else if (editorTool === "scenery") {
    pushEditorUndoState();
    const type = sceneryTypeSelect.value;
    const variant = randomBuildingVariant(type);
    editorTrack.scenery.push({ type, ...(variant ? { variant } : {}), rotation: 0, ...point });
    selectedEditorScenery = editorTrack.scenery.length - 1;
  }

  updateTrackWidthReadout();
  updateCurveBendReadout();
  updateEditorControlVisibility();
  renderTrackEditor();
}

function handleEditorPointerMove(event) {
  const point = getEditorPoint(event);
  editorGhostPoint = point;
  if (editorTool === "select" && draggedEditorCurveSegment !== null) {
    updateEditorCurveFromPoint(draggedEditorCurveSegment, point);
    renderTrackEditor();
    return;
  }
  if (editorTool === "select" && draggedEditorNode !== null && editorTrack.nodes[draggedEditorNode]) {
    editorTrack.nodes[draggedEditorNode].x = point.x;
    editorTrack.nodes[draggedEditorNode].y = point.y;
    renderTrackEditor();
    return;
  }
  if (editorTool === "select-scenery" && selectedEditorScenery >= 0 && editorTrack.scenery[selectedEditorScenery] && editorCanvas.hasPointerCapture(event.pointerId)) {
    editorTrack.scenery[selectedEditorScenery].x = point.x;
    editorTrack.scenery[selectedEditorScenery].y = point.y;
    syncEditorSceneryElement(selectedEditorScenery);
    return;
  }
  if (editorTool !== "add-node" && editorTool !== "pit" && editorTool !== "start") return;
  renderTrackEditor();
}

function handleEditorPointerUp(event) {
  draggedEditorNode = null;
  draggedEditorCurveSegment = null;
  commitEditorUndoAction();
  if (editorCanvas.hasPointerCapture(event.pointerId)) editorCanvas.releasePointerCapture(event.pointerId);
}

function getEditorPoint(event) {
  const rect = editorCanvas.getBoundingClientRect();
  const viewBox = editorCanvas.viewBox.baseVal;
  const scale = Math.min(rect.width / viewBox.width, rect.height / viewBox.height);
  const renderedWidth = viewBox.width * scale;
  const renderedHeight = viewBox.height * scale;
  const offsetX = (rect.width - renderedWidth) * 0.5;
  const offsetY = (rect.height - renderedHeight) * 0.5;
  return {
    x: THREE.MathUtils.clamp(viewBox.x + ((event.clientX - rect.left - offsetX) / renderedWidth) * viewBox.width, 0, EDITOR_WORLD_WIDTH),
    y: THREE.MathUtils.clamp(viewBox.y + ((event.clientY - rect.top - offsetY) / renderedHeight) * viewBox.height, 0, EDITOR_WORLD_HEIGHT),
  };
}

function updateEditorZoom(nextZoom = editorZoom) {
  if (!editorCanvas) return;
  editorZoom = THREE.MathUtils.clamp(nextZoom, 0.3, 3);
  const visibleWidth = EDITOR_WORLD_WIDTH / editorZoom;
  const visibleHeight = EDITOR_WORLD_HEIGHT / editorZoom;
  const x = editorViewCenter.x - visibleWidth * 0.5;
  const y = editorViewCenter.y - visibleHeight * 0.5;
  editorCanvas.setAttribute("viewBox", `${x} ${y} ${visibleWidth} ${visibleHeight}`);
  if (editorZoomSlider) editorZoomSlider.value = editorZoom.toFixed(2);
  if (editorZoomReadout) editorZoomReadout.textContent = `${Math.round(editorZoom * 100)}%`;
}

function updateSelectedTrackWidth() {
  if (editorTool === "select-road" && selectedEditorSegment >= 0) {
    getEditorRoadFeatures(selectedEditorSegment).width = Number(trackWidthSlider.value);
  } else if (editorTool === "select" && editorTrack.nodes[selectedEditorNode]) {
    editorTrack.nodes[selectedEditorNode].width = Number(trackWidthSlider.value);
  }
  updateTrackWidthReadout();
  renderTrackEditor();
}

function updateSelectedCurveBend() {
  const bend = -Number(curveBendSlider.value);
  if (editorTool === "select-road" && selectedEditorSegment >= 0) {
    const segment = getEditorSegment(selectedEditorSegment);
    if (segment?.b) segment.b.curve = bend;
  } else if (editorTool === "select" && editorTrack.nodes[selectedEditorNode]) {
    editorTrack.nodes[selectedEditorNode].curve = bend;
  }
  updateCurveBendReadout();
  renderTrackEditor();
}

function isEditorTypingTarget(target) {
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName);
}

function deleteSelectedEditorItem() {
  if (selectedEditorScenery >= 0 && editorTrack.scenery[selectedEditorScenery]) {
    pushEditorUndoState();
    editorTrack.scenery.splice(selectedEditorScenery, 1);
    selectedEditorScenery = -1;
  } else if (editorTool === "select" && editorTrack.nodes.length > 3 && editorTrack.nodes[selectedEditorNode]) {
    pushEditorUndoState();
    editorTrack.nodes.splice(selectedEditorNode, 1);
    selectedEditorNode = Math.max(0, Math.min(selectedEditorNode, editorTrack.nodes.length - 1));
    editorTrack.startNode = Math.max(0, Math.min(editorTrack.startNode ?? 0, editorTrack.nodes.length - 1));
    editorTrack.startSegment = editorTrack.startNode;
    editorTrack.roadFeatures.splice(selectedEditorNode, 1);
    selectedEditorSegment = Math.max(0, Math.min(selectedEditorSegment, editorTrack.nodes.length - 1));
  } else {
    return;
  }
  draggedEditorNode = null;
  draggedEditorCurveSegment = null;
  updateTrackWidthReadout();
  updateCurveBendReadout();
  syncRoadFeatureInputs();
  renderTrackEditor();
}

function updateTrackWidthReadout() {
  trackWidthReadout.textContent = `${Number(trackWidthSlider.value).toFixed(1).replace(".0", "")}m`;
}

function updateCurveBendReadout() {
  const bend = -Number(curveBendSlider.value);
  const size = Math.abs(bend) < 0.18 ? "Soft" : Math.abs(bend) < 0.58 ? "Gentle" : Math.abs(bend) < 1.1 ? "Tight" : "Chicane";
  const direction = bend < -0.05 ? "L" : bend > 0.05 ? "R" : "Straight";
  curveBendReadout.textContent = direction === "Straight" ? "Straight" : `${size} ${direction}`;
}

function updateEditorControlVisibility() {
  const hasNodeSelection = editorTool === "select" && selectedEditorNode >= 0;
  const hasRoadSelection = editorTool === "select-road" && selectedEditorSegment >= 0;
  const showGeometryControls = hasNodeSelection || hasRoadSelection;
  trackWidthControl?.classList.toggle("is-hidden", !showGeometryControls);
  curveBendControl?.classList.toggle("is-hidden", !showGeometryControls);
  sceneryTypeSelect.closest(".editor-select")?.classList.toggle("is-hidden", editorTool !== "scenery");
  roadOptionsPanel?.classList.toggle("is-hidden", !hasRoadSelection);
  trackEssentialsPanel?.classList.toggle("is-hidden", editorTool !== "essentials");
}

function syncEditorControlsFromSelection() {
  if (editorTool === "select-road" && selectedEditorSegment >= 0) {
    const features = getEditorRoadFeatures(selectedEditorSegment);
    const segment = getEditorSegment(selectedEditorSegment);
    if (trackWidthSlider && segment) trackWidthSlider.value = features.width ?? getEditorSegmentWidth(segment);
    if (curveBendSlider && segment) curveBendSlider.value = -(segment.b.curve ?? 0);
  } else if (editorTool === "select" && editorTrack.nodes[selectedEditorNode]) {
    trackWidthSlider.value = editorTrack.nodes[selectedEditorNode].width ?? 15;
    curveBendSlider.value = -(editorTrack.nodes[selectedEditorNode].curve ?? 0);
  }
  updateTrackWidthReadout();
  updateCurveBendReadout();
}

function getEditorRoadFeatures(segmentIndex = selectedEditorSegment) {
  const safeIndex = ((segmentIndex % editorTrack.nodes.length) + editorTrack.nodes.length) % editorTrack.nodes.length;
  if (!editorTrack.roadFeatures[safeIndex]) {
    editorTrack.roadFeatures[safeIndex] = {
      kerbRight: false,
      kerbLeft: false,
      paintedKerbRight: false,
      paintedKerbLeft: false,
      wallRight: false,
      wallLeft: false,
      grandstandRight: false,
      grandstandLeft: false,
    };
  }
  return editorTrack.roadFeatures[safeIndex];
}

function syncRoadFeatureInputs() {
  if (selectedEditorSegment < 0) {
    for (const input of roadFeatureInputs) input.checked = false;
    return;
  }
  const features = getEditorRoadFeatures(selectedEditorSegment);
  for (const input of roadFeatureInputs) {
    input.checked = Boolean(features[input.dataset.roadFeature]);
  }
}

function updateSelectedRoadFeatures() {
  if (selectedEditorSegment < 0) return;
  pushEditorUndoState();
  const features = getEditorRoadFeatures(selectedEditorSegment);
  for (const input of roadFeatureInputs) {
    features[input.dataset.roadFeature] = input.checked;
  }
  renderTrackEditor();
}

function undoEditorAction() {
  const previous = editorUndoStack.pop();
  if (!previous) return;
  restoreEditorTrackState(previous);
  selectedEditorNode = Math.max(-1, Math.min(selectedEditorNode, editorTrack.nodes.length - 1));
  selectedEditorSegment = Math.max(-1, Math.min(selectedEditorSegment, editorTrack.nodes.length - 1));
  selectedEditorScenery = Math.max(-1, Math.min(selectedEditorScenery, editorTrack.scenery.length - 1));
  updateTrackWidthReadout();
  updateCurveBendReadout();
  syncRoadFeatureInputs();
  renderTrackEditor();
}

function getEditorTrackExportData() {
  return {
    version: 2,
    name: editorTrack.name,
    timeOfDay: editorTrack.timeOfDay ?? "day",
    environment: editorTrack.environment ?? "grass",
    closed: editorTrack.closed,
    startNode: editorTrack.startNode,
    startDirection: editorTrack.startDirection,
    startSegment: editorTrack.startSegment,
    nodes: editorTrack.nodes.map((node) => ({
      x: Math.round(node.x),
      y: Math.round(node.y),
      width: node.width,
      curve: Number((node.curve ?? 0).toFixed(2)),
    })),
    kerbs: editorTrack.kerbs.map(normalizeEditorKerbForExport),
    roadFeatures: editorTrack.nodes.map((_, index) => ({ ...getEditorRoadFeatures(index) })),
    pitLane: editorTrack.pitLane.map((node) => ({ x: Math.round(node.x), y: Math.round(node.y), width: node.width })),
    scenery: editorTrack.scenery.map((item) => ({
      type: item.type,
      ...(item.variant ? { variant: item.variant } : {}),
      x: Math.round(item.x),
      y: Math.round(item.y),
      rotation: Number((item.rotation ?? 0).toFixed(2)),
    })),
  };
}

function updateEditorJsonOutput() {
  trackJsonOutput.value = JSON.stringify(getEditorTrackExportData(), null, 2);
}

function exportEditorTrack() {
  const exportData = {
    ...getEditorTrackExportData(),
  };
  trackJsonOutput.value = JSON.stringify(exportData, null, 2);
  const safeName = (exportData.name || "paddock-track").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "paddock-track";
  const blob = new Blob([trackJsonOutput.value], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeName}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  editorStatus.textContent = `Exported ${link.download} to your downloads folder`;
}

function renderTrackEditor() {
  if (!editorCanvas) return;
  editorTrackLayer.innerHTML = "";
  editorNodeLayer.innerHTML = "";
  editorSceneryLayer.innerHTML = "";
  if (editorSceneryTopLayer) editorSceneryTopLayer.innerHTML = "";
  editorGhostLayer.innerHTML = "";

  renderEditorSegments(editorTrack.nodes, true, "editor-road-edge", 7.5);
  renderEditorSegments(editorTrack.nodes, true, "editor-road", 0);
  renderEditorRoadFeatures();
  renderEditorKerbs();
  renderEditorSegments(editorTrack.pitLane, false, "editor-pit", 0);
  renderEditorStartLine();
  renderEditorScenery();
  renderEditorNodes();
  renderEditorGhost();
  updateEditorJsonOutput();
  updateEditorStatus();
}

function renderEditorSegments(nodes, closed, className, widthOffset) {
  const segmentCount = closed ? nodes.length : Math.max(0, nodes.length - 1);
  if (nodes.length < 2) return;
  if (closed && className === "editor-road-edge") {
    const averageWidth = nodes.reduce((sum, node) => sum + (node.width ?? 15), 0) / nodes.length;
    editorTrackLayer.appendChild(svgElement("path", {
      class: className,
      "stroke-width": (averageWidth + widthOffset) * EDITOR_TRACK_VISUAL_SCALE,
      d: getEditorTrackPath(nodes),
    }));
    return;
  }
  for (let i = 0; i < segmentCount; i += 1) {
    const a = nodes[i];
    const b = nodes[(i + 1) % nodes.length];
    const width = getEditorSegmentWidth({ a, b }, i) + widthOffset;
    const attrs = {
      class: className,
      "stroke-width": width * EDITOR_TRACK_VISUAL_SCALE,
      d: getEditorSegmentPath(a, b, b.curve ?? 0),
    };
    editorTrackLayer.appendChild(svgElement("path", attrs));
  }
}

function renderEditorRoadFeatures() {
  for (let segmentIndex = 0; segmentIndex < editorTrack.nodes.length; segmentIndex += 1) {
    const segment = getEditorSegment(segmentIndex);
    if (!segment) continue;
    const features = getEditorRoadFeatures(segmentIndex);
    const selectedClass = editorTool === "select-road" && segmentIndex === selectedEditorSegment ? " is-selected" : "";
    const path = getEditorSegmentPath(segment.a, segment.b, segment.b.curve ?? 0);
    if (selectedClass) {
      editorTrackLayer.appendChild(svgElement("path", {
        class: `editor-road-selection${selectedClass}`,
        "stroke-width": (getEditorSegmentWidth(segment, segmentIndex) + 3.8) * EDITOR_TRACK_VISUAL_SCALE,
        d: path,
      }));
    }
    if (features.kerbRight) renderEditorFeatureKerb(segmentIndex, 1);
    if (features.kerbLeft) renderEditorFeatureKerb(segmentIndex, -1);
    if (features.paintedKerbRight) renderEditorFeaturePaintedKerb(segmentIndex, 1);
    if (features.paintedKerbLeft) renderEditorFeaturePaintedKerb(segmentIndex, -1);
    if (features.wallRight) renderEditorFeatureWall(segmentIndex, 1);
    if (features.wallLeft) renderEditorFeatureWall(segmentIndex, -1);
    if (features.grandstandRight) renderEditorFeatureGrandstand(segmentIndex, 1);
    if (features.grandstandLeft) renderEditorFeatureGrandstand(segmentIndex, -1);
  }
}

function renderEditorFeatureKerb(segmentIndex, side) {
  const segment = getEditorSegment(segmentIndex);
  if (!segment) return;
  const { a, b } = segment;
  const width = getEditorSegmentWidth(segment, segmentIndex);
  const samples = sampleEditorSegment(a, b, b.curve ?? 0, 26);
  const points = samples.map((point, index) => {
    const previous = samples[Math.max(0, index - 1)];
    const next = samples[Math.min(samples.length - 1, index + 1)];
    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const offset = side * (width * 0.5 * EDITOR_TRACK_VISUAL_SCALE + 52);
    return `${point.x + nx * offset},${point.y + ny * offset}`;
  });
  editorTrackLayer.appendChild(svgElement("polyline", {
    points: points.join(" "),
    class: "editor-kerb-yellow",
  }));
}

function renderEditorFeaturePaintedKerb(segmentIndex, side) {
  const segment = getEditorSegment(segmentIndex);
  if (!segment) return;
  const { a, b } = segment;
  const width = getEditorSegmentWidth(segment, segmentIndex);
  const samples = sampleEditorSegment(a, b, b.curve ?? 0, 26);
  const points = samples.map((point, index) => {
    const previous = samples[Math.max(0, index - 1)];
    const next = samples[Math.min(samples.length - 1, index + 1)];
    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const offset = side * (width * 0.5 * EDITOR_TRACK_VISUAL_SCALE + 70);
    return `${point.x + nx * offset},${point.y + ny * offset}`;
  });
  editorTrackLayer.appendChild(svgElement("polyline", {
    points: points.join(" "),
    class: "editor-painted-kerb",
  }));
}

function renderEditorFeatureWall(segmentIndex, side) {
  const segment = getEditorSegment(segmentIndex);
  if (!segment) return;
  const { a, b } = segment;
  const width = getEditorSegmentWidth(segment, segmentIndex);
  const samples = sampleEditorSegment(a, b, b.curve ?? 0, 26);
  const points = samples.map((point, index) => {
    const previous = samples[Math.max(0, index - 1)];
    const next = samples[Math.min(samples.length - 1, index + 1)];
    const dx = next.x - previous.x;
    const dy = next.y - previous.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const offset = side * (width * 0.5 * EDITOR_TRACK_VISUAL_SCALE + 190);
    return `${point.x + nx * offset},${point.y + ny * offset}`;
  });
  editorTrackLayer.appendChild(svgElement("polyline", {
    points: points.join(" "),
    class: "editor-wall-line",
  }));
}

function renderEditorFeatureGrandstand(segmentIndex, side) {
  const placement = getEditorFeaturePlacement(segmentIndex, side, 300);
  if (!placement) return;
  editorTrackLayer.appendChild(svgElement("rect", {
    x: placement.x - 720,
    y: placement.y - 165,
    width: 1440,
    height: 330,
    rx: 30,
    class: "editor-scenery editor-scenery-grandstand",
    transform: `rotate(${placement.angleDeg} ${placement.x} ${placement.y})`,
  }));
}

function getEditorFeaturePlacement(segmentIndex, side, extraOffset = 0) {
  const segment = getEditorSegment(segmentIndex);
  if (!segment) return null;
  const { a, b } = segment;
  const samples = sampleEditorSegment(a, b, b.curve ?? 0, 18);
  const mid = samples[Math.floor(samples.length * 0.5)];
  const prev = samples[Math.max(0, Math.floor(samples.length * 0.5) - 1)];
  const next = samples[Math.min(samples.length - 1, Math.floor(samples.length * 0.5) + 1)];
  const dx = next.x - prev.x;
  const dy = next.y - prev.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const width = getEditorSegmentWidth(segment, segmentIndex);
  const offset = side * (width * 0.5 * EDITOR_TRACK_VISUAL_SCALE + extraOffset);
  return {
    x: mid.x + nx * offset,
    y: mid.y + ny * offset,
    angleDeg: Math.atan2(dy, dx) * 180 / Math.PI,
  };
}

function getEditorTrackPath(nodes) {
  let path = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 0; i < nodes.length; i += 1) {
    const a = nodes[i];
    const b = nodes[(i + 1) % nodes.length];
    const curve = b.curve ?? 0;
    if (Math.abs(curve) < 0.04) {
      path += ` L ${b.x} ${b.y}`;
      continue;
    }
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;
    const nx = -dy / length;
    const ny = dx / length;
    const controlX = (a.x + b.x) * 0.5 + nx * length * curve * 0.55;
    const controlY = (a.y + b.y) * 0.5 + ny * length * curve * 0.55;
    path += ` Q ${controlX} ${controlY} ${b.x} ${b.y}`;
  }
  return path;
}

function getEditorSegmentWidth(segment, segmentIndex = -1) {
  const featureWidth = segmentIndex >= 0 ? getEditorRoadFeatures(segmentIndex).width : null;
  return featureWidth ?? ((segment.a.width ?? 15) + (segment.b.width ?? 15)) * 0.5;
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

function getEditorCurveHandlePose(segmentIndex) {
  const segment = getEditorSegment(segmentIndex);
  if (!segment) return null;
  const { a, b } = segment;
  const curve = b.curve ?? 0;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  return {
    x: (a.x + b.x) * 0.5 + nx * length * curve * 0.55,
    y: (a.y + b.y) * 0.5 + ny * length * curve * 0.55,
    midX: (a.x + b.x) * 0.5,
    midY: (a.y + b.y) * 0.5,
    nx,
    ny,
    length,
  };
}

function updateEditorCurveFromPoint(segmentIndex, point) {
  const pose = getEditorCurveHandlePose(segmentIndex);
  const node = editorTrack.nodes[(segmentIndex + 1) % editorTrack.nodes.length];
  if (!pose || !node) return;
  const bend = ((point.x - pose.midX) * pose.nx + (point.y - pose.midY) * pose.ny) / (pose.length * 0.55);
  node.curve = THREE.MathUtils.clamp(bend, Number(curveBendSlider.min), Number(curveBendSlider.max));
  curveBendSlider.value = -node.curve;
  updateCurveBendReadout();
}

function renderEditorStartLine() {
  if (editorTrack.nodes.length < 2) return;
  const pose = getEditorStartPose(editorTrack.startNode ?? 0, editorTrack.startDirection ?? 1);
  if (!pose) return;
  renderEditorStartLineAtPose(pose, "editor-start-line");
}

function getEditorStartPose(nodeIndex, direction = 1) {
  if (editorTrack.nodes.length < 2) return null;
  const safeIndex = ((nodeIndex % editorTrack.nodes.length) + editorTrack.nodes.length) % editorTrack.nodes.length;
  const node = editorTrack.nodes[safeIndex];
  const otherIndex = direction >= 0
    ? (safeIndex + 1) % editorTrack.nodes.length
    : (safeIndex - 1 + editorTrack.nodes.length) % editorTrack.nodes.length;
  const other = editorTrack.nodes[otherIndex];
  const dx = (other.x - node.x) * Math.sign(direction || 1);
  const dy = (other.y - node.y) * Math.sign(direction || 1);
  const length = Math.hypot(dx, dy) || 1;
  return {
    x: node.x,
    y: node.y,
    tx: dx / length,
    ty: dy / length,
    width: node.width ?? 15,
  };
}

function renderEditorStartLineAtPose(pose, className) {
  const nx = -pose.ty;
  const ny = pose.tx;
  const halfWidth = (pose.width + 12) * 0.5 * EDITOR_VISUAL_SCALE;
  const columns = 10;
  const tileWidth = (halfWidth * 2) / columns;
  const tileDepth = (className === "editor-ghost-start-line" ? 7 : 10) * EDITOR_VISUAL_SCALE;

  for (let col = 0; col < columns; col += 1) {
    const offset = -halfWidth + tileWidth * (col + 0.5);
    const tileCx = pose.x + nx * offset;
    const tileCy = pose.y + ny * offset;
    editorTrackLayer.appendChild(svgElement("rect", {
      x: tileCx - tileWidth / 2,
      y: tileCy - tileDepth / 2,
      width: tileWidth,
      height: tileDepth,
      class: `${className} ${col % 2 === 0 ? "is-light" : "is-dark"}`,
      transform: `rotate(${Math.atan2(pose.ty, pose.tx) * 180 / Math.PI} ${tileCx} ${tileCy})`,
    }));
  }

  if (className === "editor-start-line") {
    editorTrackLayer.appendChild(svgElement("path", {
      d: `M ${pose.x} ${pose.y} l ${pose.tx * 110} ${pose.ty * 110} l ${-pose.ty * 25} ${pose.tx * 25} m ${pose.ty * 25} ${-pose.tx * 25} l ${pose.ty * 25} ${-pose.tx * 25}`,
      class: "editor-start-direction",
    }));
  }
}

function isNearEditorStartLine(point) {
  const pose = getEditorStartPose(editorTrack.startNode ?? 0, editorTrack.startDirection ?? 1);
  if (!pose) return false;
  return Math.hypot(point.x - pose.x, point.y - pose.y) < 170;
}

function renderEditorNodes() {
  for (const [index, node] of editorTrack.nodes.entries()) {
    const classes = ["editor-node"];
    if (index === selectedEditorNode) classes.push("is-selected");
    if (editorTool === "start") classes.push("is-start-option");
    if (index === (editorTrack.startNode ?? 0)) classes.push("is-start-node");
    editorNodeLayer.appendChild(svgElement("circle", {
      cx: node.x,
      cy: node.y,
      r: (index === selectedEditorNode || editorTool === "start" ? 10 : 7) * EDITOR_VISUAL_SCALE,
      class: classes.join(" "),
    }));
    editorNodeLayer.appendChild(svgElement("text", {
      x: node.x + 65,
      y: node.y - 50,
      class: "editor-node-label",
    }, `${node.width}m`));
  }
}

function renderEditorCurveHandles() {
  if (editorTool !== "select") return;
  for (let segmentIndex = 0; segmentIndex < editorTrack.nodes.length; segmentIndex += 1) {
    const pose = getEditorCurveHandlePose(segmentIndex);
    if (!pose) continue;
    const selected = selectedEditorNode === (segmentIndex + 1) % editorTrack.nodes.length;
    editorNodeLayer.appendChild(svgElement("line", {
      x1: pose.midX,
      y1: pose.midY,
      x2: pose.x,
      y2: pose.y,
      class: `editor-curve-stem${selected ? " is-selected" : ""}`,
    }));
    const handleSize = (selected ? 18 : 14) * EDITOR_VISUAL_SCALE;
    editorNodeLayer.appendChild(svgElement("rect", {
      x: pose.x - handleSize * 0.5,
      y: pose.y - handleSize * 0.5,
      width: handleSize,
      height: handleSize,
      rx: 10,
      class: `editor-curve-handle${selected ? " is-selected" : ""}`,
    }));
  }
}

function createEditorKerb(segment, side) {
  return {
    segment,
    side,
    start: 0.16,
    end: 0.58,
    width: 1.35,
    height: 0.28,
    surface: "kerb",
  };
}

function normalizeEditorKerbForExport(kerb) {
  return {
    segment: kerb.segment,
    side: kerb.side,
    start: Number((kerb.start ?? 0.16).toFixed(2)),
    end: Number((kerb.end ?? 0.58).toFixed(2)),
    width: Number((kerb.width ?? 1.35).toFixed(2)),
    height: Number((kerb.height ?? 0.28).toFixed(2)),
    surface: kerb.surface ?? "kerb",
  };
}
function renderEditorKerbs() {
  for (const kerb of editorTrack.kerbs) {
    const segment = getEditorSegment(kerb.segment);
    if (!segment) continue;
    const { a, b } = segment;
    const curve = b.curve ?? 0;
    const width = ((a.width ?? 15) + (b.width ?? 15)) * 0.5;
    const samples = sampleEditorSegment(a, b, curve, 16);
    const start = Math.floor(samples.length * THREE.MathUtils.clamp(kerb.start ?? 0.16, 0.02, 0.9));
    const end = Math.max(start + 2, Math.floor(samples.length * THREE.MathUtils.clamp(kerb.end ?? 0.58, 0.08, 0.98)));

    for (let i = start; i < end; i += 1) {
      const current = samples[i];
      const next = samples[Math.min(samples.length - 1, i + 1)];
      const dx = next.x - current.x;
      const dy = next.y - current.y;
      const length = Math.hypot(dx, dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      const side = kerb.side ?? 1;
      const kerbVisualWidth = (kerb.width ?? 1.35) * 3.2 * EDITOR_VISUAL_SCALE;
      const cx = current.x + nx * side * (width * 0.5 + kerbVisualWidth * 0.55);
      const cy = current.y + ny * side * (width * 0.5 + kerbVisualWidth * 0.55);
      editorTrackLayer.appendChild(svgElement("rect", {
        x: cx - 30,
        y: cy - kerbVisualWidth * 0.5,
        width: 60,
        height: kerbVisualWidth,
        rx: 5,
        class: "editor-kerb-red",
        transform: `rotate(${Math.atan2(dy, dx) * 180 / Math.PI} ${cx} ${cy})`,
      }));
    }
  }
}

function sampleEditorSegment(a, b, curve = 0, count = 16) {
  const points = [];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length;
  const ny = dx / length;
  const control = {
    x: (a.x + b.x) * 0.5 + nx * length * curve * 0.55,
    y: (a.y + b.y) * 0.5 + ny * length * curve * 0.55,
  };

  for (let i = 0; i <= count; i += 1) {
    const t = i / count;
    if (Math.abs(curve) < 0.04) {
      points.push({ x: THREE.MathUtils.lerp(a.x, b.x, t), y: THREE.MathUtils.lerp(a.y, b.y, t) });
    } else {
      const mt = 1 - t;
      points.push({
        x: mt * mt * a.x + 2 * mt * t * control.x + t * t * b.x,
        y: mt * mt * a.y + 2 * mt * t * control.y + t * t * b.y,
      });
    }
  }
  return points;
}

function getEditorSegment(index) {
  if (editorTrack.nodes.length < 2) return null;
  const safeIndex = ((index % editorTrack.nodes.length) + editorTrack.nodes.length) % editorTrack.nodes.length;
  return {
    a: editorTrack.nodes[safeIndex],
    b: editorTrack.nodes[(safeIndex + 1) % editorTrack.nodes.length],
  };
}

function getEditorSegmentSide(point, segmentIndex) {
  const segment = getEditorSegment(segmentIndex);
  if (!segment) return 1;
  const { a, b } = segment;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const side = Math.sign(dx * (point.y - a.y) - dy * (point.x - a.x));
  return side === 0 ? 1 : side;
}

function updateEditorStatus() {
  if (!editorStatus) return;
  const toolLabel = {
    essentials: "Track Essentials",
    "add-node": "Add Node",
    select: "Select Node",
    "select-road": "Select Road",
    "select-scenery": "Select Scenery",
    start: "Start Line",
    pit: "Pit Lane",
    scenery: "Add Scenery",
  }[editorTool] ?? "No Tool";
  const featureCount = editorTrack.roadFeatures.filter((features) => features && ["kerbRight", "kerbLeft", "paintedKerbRight", "paintedKerbLeft", "wallRight", "wallLeft", "grandstandRight", "grandstandLeft"].some((key) => features[key])).length;
  editorStatus.textContent = `${toolLabel} | ${editorTrack.nodes.length} road nodes | ${featureCount} styled roads | ${editorTrack.scenery.length} scenery`;
}
function renderEditorScenery() {
  const fragment = document.createDocumentFragment();
  for (const [index, item] of editorTrack.scenery.entries()) {
    const selectedClass = index === selectedEditorScenery ? " is-selected" : "";
    if (item.type === "lamp") {
      const group = svgElement("g", {
        class: `editor-scenery-group${selectedClass}`,
        transform: getEditorSceneryTransform(item),
        "data-editor-scenery-index": index,
      });
      group.appendChild(svgElement("circle", {
        cx: 0,
        cy: 0,
        r: 120,
        class: "editor-scenery editor-scenery-lamp",
      }));
      group.appendChild(svgElement("path", {
        d: "M 0 -405 L 105 -225 L 30 -240 L 30 -75 L -30 -75 L -30 -240 L -105 -225 Z",
        class: "editor-light-arrow",
      }));
      fragment.appendChild(group);
      continue;
    }

    if (item.type.startsWith("building")) {
      const isSkyscraper = item.type === "building-skyscraper" || item.type === "building-super-tall";
      const size = (isSkyscraper ? 44 : item.type === "building-tall" ? 34 : item.type === "building-group" ? 30 : 24) * EDITOR_VISUAL_SCALE;
      const group = svgElement("g", {
        class: `editor-scenery-group${selectedClass}`,
        transform: getEditorSceneryTransform(item),
        "data-editor-scenery-index": index,
      });
      group.appendChild(svgElement("rect", {
        x: -size * 0.5,
        y: -size * 0.5,
        width: size,
        height: size,
        rx: 12,
        class: `editor-scenery editor-scenery-${item.type}`,
        ...(buildingVariantColor(item.type, item.variant) ? { fill: `#${buildingVariantColor(item.type, item.variant).toString(16).padStart(6, "0")}` } : {}),
      }));
      group.appendChild(svgElement("path", {
        d: `M 0 ${-size * 0.72} L ${size * 0.2} ${-size * 0.46} L ${size * 0.07} ${-size * 0.5} L ${size * 0.07} ${-size * 0.22} L ${-size * 0.07} ${-size * 0.22} L ${-size * 0.07} ${-size * 0.5} L ${-size * 0.2} ${-size * 0.46} Z`,
        fill: "#fff1a8",
        stroke: "rgba(0, 0, 0, 0.5)",
        "stroke-width": Math.max(10, size * 0.035),
      }));
      fragment.appendChild(group);
      continue;
    }

    if (item.type === "flower-bed") {
      const group = svgElement("g", {
        class: `editor-scenery-group${selectedClass}`,
        transform: getEditorSceneryTransform(item),
        "data-editor-scenery-index": index,
      });
      group.appendChild(svgElement("ellipse", {
        cx: 0,
        cy: 0,
        rx: 24 * EDITOR_VISUAL_SCALE,
        ry: 13 * EDITOR_VISUAL_SCALE,
        class: "editor-scenery editor-scenery-flower-bed",
      }));
      group.appendChild(svgElement("text", {
        x: 0,
        y: 25,
        class: "editor-scenery-label",
        "text-anchor": "middle",
      }, "F"));
      fragment.appendChild(group);
      continue;
    }

    const visualScale = item.type === "cherry-trees" ? 2 : item.type === "douglas-pines" ? 3 : item.type === "maple-tree" ? 6 : item.type === "boulder-cluster" ? 1.65 : 1;
    const symbol = { trees: "T", "cherry-trees": "C", "douglas-pines": "D", "maple-tree": "M", "boulder-cluster": "B" }[item.type] ?? "S";
    const group = svgElement("g", {
      class: `editor-scenery-group${selectedClass}`,
      transform: getEditorSceneryTransform(item),
      "data-editor-scenery-index": index,
    });
    group.appendChild(svgElement("circle", {
      cx: 0,
      cy: 0,
      r: 11 * EDITOR_VISUAL_SCALE * visualScale,
      class: `editor-scenery editor-scenery-${item.type}`,
    }));
    group.appendChild(svgElement("path", {
      d: `M 0 ${-18 * EDITOR_VISUAL_SCALE * visualScale} L ${4 * EDITOR_VISUAL_SCALE * visualScale} ${-10 * EDITOR_VISUAL_SCALE * visualScale} L ${-4 * EDITOR_VISUAL_SCALE * visualScale} ${-10 * EDITOR_VISUAL_SCALE * visualScale} Z`,
      fill: "#fff1a8",
      stroke: "rgba(0, 0, 0, 0.5)",
      "stroke-width": 7,
    }));
    group.appendChild(svgElement("text", {
      x: 0,
      y: 25,
      class: "editor-scenery-label",
      "text-anchor": "middle",
    }, symbol));
    fragment.appendChild(group);
  }
  (editorSceneryTopLayer ?? editorSceneryLayer).appendChild(fragment);
}

function getEditorSceneryTransform(item) {
  return `translate(${item.x} ${item.y}) rotate(${editorRotationDegrees(item.rotation)})`;
}

function syncEditorSceneryElement(index) {
  const item = editorTrack.scenery[index];
  const element = (editorSceneryTopLayer ?? editorSceneryLayer).querySelector(`[data-editor-scenery-index="${index}"]`);
  if (!item || !element) {
    renderTrackEditor();
    return;
  }
  element.setAttribute("transform", getEditorSceneryTransform(item));
}

function editorRotationDegrees(rotation = 0) {
  return rotation * 180 / Math.PI;
}

function rotateSelectedEditorDirectionalScenery(direction) {
  const selected = editorTrack.scenery[selectedEditorScenery];
  if (!isEditorRotatableScenery(selected)) return;
  pushEditorUndoState();
  selected.rotation = (selected.rotation ?? 0) + direction * THREE.MathUtils.degToRad(2);
  syncEditorSceneryElement(selectedEditorScenery);
}

function isEditorRotatableScenery(item) {
  return Boolean(item);
}

function getNearestEditorScenery(point) {
  let index = -1;
  let distance = Infinity;
  for (const [candidateIndex, item] of editorTrack.scenery.entries()) {
    const radius = getEditorSceneryHitRadius(item);
    const itemDistance = Math.hypot(item.x - point.x, item.y - point.y);
    if (itemDistance < distance && itemDistance <= radius) {
      index = candidateIndex;
      distance = itemDistance;
    }
  }
  return { index, distance };
}

function getEditorSceneryHitRadius(item) {
  if (!item) return 0;
  if (item.type === "building-tall") return 34 * EDITOR_VISUAL_SCALE;
  if (item.type === "building-super-tall" || item.type === "building-skyscraper") return 44 * EDITOR_VISUAL_SCALE;
  if (item.type === "building-group") return 31 * EDITOR_VISUAL_SCALE;
  if (item.type === "building-small") return 28 * EDITOR_VISUAL_SCALE;
  if (item.type === "flower-bed") return 30 * EDITOR_VISUAL_SCALE;
  if (item.type === "lamp") return 22 * EDITOR_VISUAL_SCALE;
  if (item.type === "douglas-pines") return 90 * EDITOR_VISUAL_SCALE;
  if (item.type === "maple-tree") return 165 * EDITOR_VISUAL_SCALE;
  if (item.type === "boulder-cluster") return 40 * EDITOR_VISUAL_SCALE;
  if (item.type === "cherry-trees") return 56 * EDITOR_VISUAL_SCALE;
  return 24 * EDITOR_VISUAL_SCALE;
}

function getNearestEditorCurveHandle(point) {
  let nearest = -1;
  let best = Infinity;
  const hitRadius = 12 * EDITOR_VISUAL_SCALE;
  for (let segmentIndex = 0; segmentIndex < editorTrack.nodes.length; segmentIndex += 1) {
    const pose = getEditorCurveHandlePose(segmentIndex);
    if (!pose) continue;
    const distance = Math.hypot(point.x - pose.x, point.y - pose.y);
    if (distance < best && distance <= hitRadius) {
      best = distance;
      nearest = segmentIndex;
    }
  }
  return nearest;
}

function renderEditorGhost() {
  if (!editorGhostPoint) return;
  if (editorTool === "start") {
    const segmentIndex = getNearestEditorSegment(editorGhostPoint);
    const segment = getEditorSegment(segmentIndex);
    if (!segment) return;
    const nodeIndex = getNearestEditorNode(editorGhostPoint);
    const pose = getEditorStartPose(nodeIndex, editorTrack.startDirection ?? 1);
    if (pose) renderEditorStartLineAtPose(pose, "editor-ghost-start-line");
    return;
  }

  if (editorTool === "add-node") {
    const insertAfter = getEditorAddNodeSegment(editorGhostPoint);
    const segment = getEditorSegment(insertAfter);
    if (!segment) return;
    editorGhostLayer.appendChild(svgElement("path", {
      d: getEditorSegmentPath(segment.a, editorGhostPoint, 0),
      class: "editor-ghost-line",
    }));
    editorGhostLayer.appendChild(svgElement("path", {
      d: getEditorSegmentPath(editorGhostPoint, segment.b, segment.b.curve ?? 0),
      class: "editor-ghost-line",
    }));
    editorGhostLayer.appendChild(svgElement("circle", {
      cx: editorGhostPoint.x,
      cy: editorGhostPoint.y,
      r: 45,
      class: "editor-node is-selected",
    }));
    return;
  }
  if (editorTool !== "pit") return;
  const nodes = editorTrack.pitLane;
  const last = nodes[nodes.length - 1];
  if (!last) return;
  editorGhostLayer.appendChild(svgElement("path", {
    d: getEditorSegmentPath(last, editorGhostPoint, 0),
    class: "editor-ghost-line",
  }));
}

function getEditorAddNodeSegment(point) {
  return getNearestEditorSegment(point);
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

function getEditorNodeAtPoint(point) {
  let nearest = -1;
  let best = Infinity;
  const hitRadius = 15 * EDITOR_VISUAL_SCALE;
  for (const [index, node] of editorTrack.nodes.entries()) {
    const distance = Math.hypot(node.x - point.x, node.y - point.y);
    if (distance < best && distance <= hitRadius) {
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
    const samples = sampleEditorSegment(a, b, b.curve ?? 0, 18);
    let distance = Infinity;
    for (let sampleIndex = 0; sampleIndex < samples.length - 1; sampleIndex += 1) {
      distance = Math.min(distance, distanceToEditorSegment2D(point.x, point.y, samples[sampleIndex], samples[sampleIndex + 1]));
    }
    if (distance < best) {
      best = distance;
      nearest = i;
    }
  }
  return nearest;
}

function distanceToEditorSegment2D(x, y, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return Math.hypot(x - start.x, y - start.y);
  const t = THREE.MathUtils.clamp(((x - start.x) * dx + (y - start.y) * dy) / lengthSq, 0, 1);
  const closestX = start.x + dx * t;
  const closestY = start.y + dy * t;
  return Math.hypot(x - closestX, y - closestY);
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
    corvette: "vette-yellow",
  };
  selectCar(defaultCars[category] ?? "red");
  setMenuStep(category);
}

function startGameModeSelection(mode) {
  selectedGameMode = mode;
  selectedTimeTrialMode = "standard";
  updateTimeTrialModeSelection();
  clearAiOpponents();
  if (selectedGameMode !== "quick-race") selectedAiOpponentCount = 0;
  else updateAiOpponentSelection();
  updateTimeTrialHud();
  setMenuStep("track");
}

function selectTrack(trackId) {
  selectedTrack = trackId;
  clearAiOpponents();
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
  startMenu.dataset.menuStep = menuStep;
  const titles = {
    intro: "The Paddock",
    "editor-choice": "Track Editor",
    "editor-default-track": "Default Tracks",
    track: "Choose Track",
    "car-category": "Choose Class",
    formula: "Formula Paint",
    lmp: "Prototype Paint",
    stock: "Stock Paint",
    jeep: "Jeep Paint",
    corvette: "Corvette Paint",
    "ai-opponents": "Quick Race",
    "time-trial-setup": "Time Trial",
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
  return ["formula", "lmp", "stock", "jeep", "corvette", "ai-opponents", "time-trial-setup"].includes(menuStep);
}

function updateMenuVisual() {
  const visual = menuStep === "intro" ? "intro" : (menuStep === "track" || menuStep === "editor-choice" || menuStep === "editor-default-track") ? "track" : menuStep === "car-category" ? "driver" : "car";
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
    "editor-choice": ["Track Editor", "Choose Starting Point"],
    "editor-default-track": ["Default Track", "Choose Layout"],
    track: ["Selected Track", getSelectedTrackLabel()],
    "car-category": ["Pick a Garage", "Driver Ready"],
    "ai-opponents": ["Race Grid", `${selectedAiOpponentCount} AI Opponent${selectedAiOpponentCount === 1 ? "" : "s"}`],
    "time-trial-setup": ["Stock Car Time Trial", selectedTimeTrialMode === "record-line" ? "Record Driving Line" : "Normal Run"],
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

function updateAiOpponentSelection() {
  const count = THREE.MathUtils.clamp(Math.round(Number(aiOpponentSlider?.value ?? selectedAiOpponentCount) || 3), 1, 5);
  selectedAiOpponentCount = count;
  if (aiOpponentSlider) aiOpponentSlider.value = String(count);
  if (aiOpponentReadout) aiOpponentReadout.textContent = String(count);
  if (gridPositionSlider) {
    const maxPosition = count + 1;
    gridPositionSlider.max = String(maxPosition);
    selectedGridPosition = THREE.MathUtils.clamp(selectedGridPosition, 1, maxPosition);
    gridPositionSlider.value = String(selectedGridPosition);
  }
  updateGridPositionReadout();
  if (menuStep === "ai-opponents") updateMenuVisual();
}

function updateGridPositionSelection() {
  const maxPosition = selectedAiOpponentCount + 1;
  selectedGridPosition = THREE.MathUtils.clamp(Math.round(Number(gridPositionSlider?.value ?? selectedGridPosition) || 1), 1, maxPosition);
  if (gridPositionSlider) gridPositionSlider.value = String(selectedGridPosition);
  updateGridPositionReadout();
}

function updateGridPositionReadout() {
  if (!gridPositionReadout) return;
  gridPositionReadout.textContent = formatOrdinal(selectedGridPosition);
}

function selectTimeTrialMode(mode) {
  selectedTimeTrialMode = mode === "record-line" ? "record-line" : "standard";
  updateTimeTrialModeSelection();
  updateMenuVisual();
}

function updateTimeTrialModeSelection() {
  timeTrialStandardButton?.classList.toggle("is-selected", selectedTimeTrialMode === "standard");
  timeTrialRecordLineButton?.classList.toggle("is-selected", selectedTimeTrialMode === "record-line");
}

function formatOrdinal(value) {
  const suffix = value % 10 === 1 && value % 100 !== 11
    ? "st"
    : value % 10 === 2 && value % 100 !== 12
      ? "nd"
      : value % 10 === 3 && value % 100 !== 13
        ? "rd"
        : "th";
  return `${value}${suffix}`;
}

function handleStartRaceClick() {
  if (selectedGameMode === "time-trial" && getCarProfile().kind === "stock") {
    updateTimeTrialModeSelection();
    setMenuStep("time-trial-setup");
    return;
  }
  if (selectedGameMode !== "quick-race") {
    startGame();
    return;
  }
  quickRacePaintStep = menuStep;
  updateAiOpponentSelection();
  setMenuStep("ai-opponents");
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

function startEditorTestDrive() {
  if (editorTrack.nodes.length < 3) return;
  trackDefinitions["editor-test"] = createTrackDefinitionFromEditor();
  selectedTrack = "editor-test";
  isEditorTestDrive = true;
  backToEditorButton.hidden = false;
  gameStarted = true;
  setPaused(false);
  keys.clear();
  stopEditorMusic();
  startMenu.classList.add("is-hidden");
  trackEditor.classList.add("is-hidden");
  scene.remove(track.group);
  track = createTrack(selectedTrack);
  scene.add(track.group);
  startEngineAudio();
  forceAudioProbe();
  resetCar();
}

function returnToTrackEditor() {
  if (!isEditorTestDrive) return;
  gameStarted = false;
  setPaused(false);
  keys.clear();
  backToEditorButton.hidden = true;
  isEditorTestDrive = false;
  scene.remove(track.group);
  selectedTrack = KATARA_TRACK_ID;
  track = createTrack(selectedTrack);
  scene.add(track.group);
  resetCar();
  trackEditor.classList.remove("is-hidden");
  startEditorMusic();
  renderTrackEditor();
}

function createTrackDefinitionFromEditor() {
  return createTrackDefinitionFromEditorData(editorTrack, "editor-test");
}

function createTrackDefinitionFromEditorData(sourceTrack, definitionId) {
  const nodes = sourceTrack.nodes ?? [];
  const startNode = THREE.MathUtils.clamp(sourceTrack.startNode ?? 0, 0, nodes.length - 1);
  const direction = sourceTrack.startDirection ?? 1;
  const nextNode = direction >= 0
    ? (startNode + 1) % nodes.length
    : (startNode - 1 + nodes.length) % nodes.length;
  const timeTrialStartNode = direction >= 0
    ? (startNode - 2 + nodes.length) % nodes.length
    : (startNode + 2) % nodes.length;
  const timeTrialNextNode = direction >= 0
    ? (timeTrialStartNode + 1) % nodes.length
    : (timeTrialStartNode - 1 + nodes.length) % nodes.length;
  const sampled = getEditorTrackSampledPlan(sourceTrack);
  const points = sampled.points;

  return {
    timeOfDay: sourceTrack.timeOfDay ?? "day",
    environment: sourceTrack.environment ?? "grass",
    points,
    start: editorPointToPlan(nodes[startNode]),
    next: editorPointToPlan(nodes[nextNode]),
    timeTrialStart: editorPointToPlan(nodes[timeTrialStartNode]),
    timeTrialNext: editorPointToPlan(nodes[timeTrialNextNode]),
    tension: 0.32,
    scale: 0.168,
    halfWidth: Math.max(6, averageEditorTrackWidth(sourceTrack) * 0.62),
    widthSamples: sampled.widths,
    kerbWidth: 1.2,
    detailSamples: 720,
    grassSize: [560, 420],
    cornerOnlyKerbs: true,
    extras: (group, extraTrackAreas, samples, obstacles) => addEditorTrackDetails(group, extraTrackAreas, samples, obstacles, sourceTrack, definitionId),
  };
}

function getEditorTrackSampledPlan(sourceTrack = editorTrack) {
  const points = [];
  const widths = [];
  const samplesPerSegment = 12;
  for (let segmentIndex = 0; segmentIndex < sourceTrack.nodes.length; segmentIndex += 1) {
    const segment = getEditorSegmentFromTrack(sourceTrack, segmentIndex);
    if (!segment) continue;
    const segmentSamples = sampleEditorSegment(segment.a, segment.b, segment.b.curve ?? 0, samplesPerSegment);
    const currentWidth = getEditorSegmentWidth(segment, segmentIndex) * 0.62;
    const nextSegment = getEditorSegmentFromTrack(sourceTrack, segmentIndex + 1);
    const nextWidth = nextSegment ? getEditorSegmentWidth(nextSegment, segmentIndex + 1) * 0.62 : currentWidth;
    for (let i = 0; i < segmentSamples.length - 1; i += 1) {
      const t = i / Math.max(1, segmentSamples.length - 1);
      const transitionT = THREE.MathUtils.clamp((t - 0.56) / 0.28, 0, 1);
      const smoothT = transitionT * transitionT * (3 - 2 * transitionT);
      points.push(editorPointToPlan(segmentSamples[i]));
      widths.push(THREE.MathUtils.lerp(currentWidth, nextWidth, smoothT));
    }
  }
  return { points, widths };
}

function getEditorSegmentFromTrack(sourceTrack, index) {
  if (!sourceTrack.nodes?.length) return null;
  const safeIndex = ((index % sourceTrack.nodes.length) + sourceTrack.nodes.length) % sourceTrack.nodes.length;
  return {
    a: sourceTrack.nodes[safeIndex],
    b: sourceTrack.nodes[(safeIndex + 1) % sourceTrack.nodes.length],
  };
}

function editorPointToPlan(node) {
  return [
    800 + (node.x - EDITOR_WORLD_WIDTH * 0.5) * 0.1733333333,
    450 + (node.y - EDITOR_WORLD_HEIGHT * 0.5) * 0.1733333333,
  ];
}

function averageEditorTrackWidth(sourceTrack = editorTrack) {
  if (!sourceTrack.nodes?.length) return 12;
  return sourceTrack.nodes.reduce((sum, node) => sum + (node.width ?? 15), 0) / sourceTrack.nodes.length;
}

function addEditorTestTrackDetails(group, extraTrackAreas, samples, obstacles = []) {
  addEditorTrackDetails(group, extraTrackAreas, samples, obstacles, editorTrack, "editor-test");
}

function addEditorTrackDetails(group, extraTrackAreas, samples, obstacles = [], sourceTrack = editorTrack, definitionId = "editor-test") {
  const halfWidth = trackDefinitions[definitionId].halfWidth;
  for (const kerb of sourceTrack.kerbs ?? []) {
    addKerbSurfaceObject(group, samples, {
      segment: kerb.segment ?? 0,
      side: kerb.side ?? 1,
      start: kerb.start ?? 0.16,
      end: kerb.end ?? 0.58,
      width: kerb.width ?? 1.35,
      height: kerb.height ?? 0.28,
      trackHalfWidth: halfWidth,
      segmentCount: sourceTrack.nodes.length,
    }, extraTrackAreas);
  }
  for (let segmentIndex = 0; segmentIndex < sourceTrack.nodes.length; segmentIndex += 1) {
    const features = getEditorTrackRoadFeatures(sourceTrack, segmentIndex);
    const segment = getEditorSegmentFromTrack(sourceTrack, segmentIndex);
    const segmentHalfWidth = segment ? getEditorSegmentWidth(segment, segmentIndex) * 0.62 : halfWidth;
    const segmentCount = sourceTrack.nodes.length;
    if (features.paintedKerbRight) addPaintedKerbObject(group, samples, { segment: segmentIndex, side: 1, trackHalfWidth: segmentHalfWidth, segmentCount }, extraTrackAreas);
    if (features.paintedKerbLeft) addPaintedKerbObject(group, samples, { segment: segmentIndex, side: -1, trackHalfWidth: segmentHalfWidth, segmentCount }, extraTrackAreas);
    if (features.kerbRight) addSausageKerbObject(group, samples, { segment: segmentIndex, side: 1, trackHalfWidth: segmentHalfWidth, segmentCount, definitionId }, extraTrackAreas);
    if (features.kerbLeft) addSausageKerbObject(group, samples, { segment: segmentIndex, side: -1, trackHalfWidth: segmentHalfWidth, segmentCount, definitionId }, extraTrackAreas);
    if (features.wallRight) addEditorWallObject(group, samples, { segment: segmentIndex, side: 1, trackHalfWidth: segmentHalfWidth, segmentCount, definitionId }, obstacles);
    if (features.wallLeft) addEditorWallObject(group, samples, { segment: segmentIndex, side: -1, trackHalfWidth: segmentHalfWidth, segmentCount, definitionId }, obstacles);
    if (features.grandstandRight) addRoadAttachedGrandstand(group, samples, { segment: segmentIndex, side: 1, trackHalfWidth: segmentHalfWidth, segmentCount });
    if (features.grandstandLeft) addRoadAttachedGrandstand(group, samples, { segment: segmentIndex, side: -1, trackHalfWidth: segmentHalfWidth, segmentCount });
  }
  addEditorSceneryObjects(group, obstacles, sourceTrack);
}

function getEditorTrackRoadFeatures(sourceTrack, segmentIndex) {
  if (sourceTrack === editorTrack) return getEditorRoadFeatures(segmentIndex);
  const feature = sourceTrack.roadFeatures?.[segmentIndex] ?? {};
  return {
    kerbRight: false,
    kerbLeft: false,
    paintedKerbRight: false,
    paintedKerbLeft: false,
    wallRight: false,
    wallLeft: false,
    grandstandRight: false,
    grandstandLeft: false,
    ...feature,
  };
}

function createRoadFeatureKerbSpec(segment, side, trackHalfWidth, segmentCount = editorTrack.nodes.length) {
  return {
    segment,
    side,
    start: 0,
    end: 1,
    width: 2.15,
    height: 0.34,
    trackHalfWidth,
    segmentCount,
  };
}

function addPaintedKerbObject(group, samples, spec, extraTrackAreas) {
  const redMaterial = new THREE.MeshStandardMaterial({ color: 0xc82024, roughness: 0.82, metalness: 0.01, flatShading: true });
  const segmentCount = Math.max(1, spec.segmentCount ?? editorTrack.nodes.length);
  const segmentStart = THREE.MathUtils.clamp((spec.segment ?? 0) / segmentCount, 0, 0.999);
  const segmentSpan = 1 / segmentCount;
  const startT = segmentStart;
  const endT = segmentStart + segmentSpan;
  const side = spec.side ?? 1;
  const width = 1.83;
  const height = 0.035;
  const centerOffset = side * ((spec.trackHalfWidth ?? 7.2) + width * 0.44);
  const centerPoints = [];
  const stripGeometries = [];
  const startIndex = Math.floor(startT * samples.length);
  const endIndex = Math.max(startIndex + 4, Math.floor(endT * samples.length));

  for (let i = startIndex; i <= endIndex; i += 2) {
    const point = getTrackPoseAt(samples, (i % samples.length) / samples.length, centerOffset).position;
    centerPoints.push(point);
  }

  for (let i = 0; i < centerPoints.length - 1; i += 1) {
    const current = centerPoints[i];
    const next = centerPoints[i + 1];
    const center = current.clone().lerp(next, 0.5);
    const length = Math.max(0.35, current.distanceTo(next));
    const angle = Math.atan2(next.x - current.x, next.z - current.z);
    const geometry = new THREE.BoxGeometry(width, height, length);
    const matrix = new THREE.Matrix4()
      .makeRotationY(angle)
      .setPosition(center.x, 0.17, center.z);
    geometry.applyMatrix4(matrix);
    stripGeometries.push(geometry);
  }

  const stripGeometry = mergeBufferGeometries(stripGeometries);
  if (stripGeometry) {
    const stripMesh = new THREE.Mesh(stripGeometry, redMaterial);
    stripMesh.receiveShadow = true;
    group.add(stripMesh);
  }

  extraTrackAreas.push({ kind: "painted-kerb", points: centerPoints, halfWidth: width * 0.5, height, surface: "painted-kerb" });
}

function mergeBufferGeometries(geometries) {
  if (!geometries.length) return null;
  let vertexCount = 0;
  let indexCount = 0;
  for (const geometry of geometries) {
    vertexCount += geometry.attributes.position.count;
    indexCount += geometry.index.count;
  }

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const indices = new Uint32Array(indexCount);
  let vertexOffset = 0;
  let indexOffset = 0;

  for (const geometry of geometries) {
    positions.set(geometry.attributes.position.array, vertexOffset * 3);
    normals.set(geometry.attributes.normal.array, vertexOffset * 3);
    const sourceIndex = geometry.index.array;
    for (let i = 0; i < sourceIndex.length; i += 1) {
      indices[indexOffset + i] = sourceIndex[i] + vertexOffset;
    }
    vertexOffset += geometry.attributes.position.count;
    indexOffset += sourceIndex.length;
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  merged.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  merged.setIndex(new THREE.BufferAttribute(indices, 1));
  merged.computeBoundingSphere();
  return merged;
}

function addSausageKerbObject(group, samples, spec, extraTrackAreas) {
  const material = new THREE.MeshStandardMaterial({ color: 0xffc400, roughness: 0.62, metalness: 0.03, flatShading: true });
  const segmentCount = Math.max(1, spec.segmentCount ?? editorTrack.nodes.length);
  const segmentStart = THREE.MathUtils.clamp((spec.segment ?? 0) / segmentCount, 0, 0.999);
  const segmentSpan = 1 / segmentCount;
  const startIndex = Math.floor(segmentStart * samples.length);
  const endIndex = Math.max(startIndex + 4, Math.floor((segmentStart + segmentSpan) * samples.length));
  const definition = trackDefinitions[spec.definitionId ?? "editor-test"];
  const widthSamples = getTrackWidthProfile(definition, samples.length, spec.trackHalfWidth ?? 7.2);
  const side = spec.side ?? 1;
  const sausageHeight = 0.2;
  const sausageTopWidth = 0.72;
  const sausageBaseWidth = sausageTopWidth * 2;
  const centerOffset = side * ((spec.trackHalfWidth ?? 7.2) + sausageBaseWidth * 0.28);
  const kerbPoints = [];

  for (let i = startIndex; i <= endIndex; i += 4) {
    kerbPoints.push(getTrackPoseAt(samples, (i % samples.length) / samples.length, centerOffset).position);
  }

  for (let i = 0; i < kerbPoints.length - 1; i += 1) {
    const current = kerbPoints[i];
    const next = kerbPoints[i + 1];
    const center = current.clone().lerp(next, 0.5);
    if (!isWallSegmentClearOfAsphalt(center, samples, widthSamples, startIndex, endIndex, definition)) continue;
    const length = Math.max(1.1, current.distanceTo(next));
    const angle = Math.atan2(next.x - current.x, next.z - current.z);
    const sausage = new THREE.Mesh(makeSausageKerbGeometry(length, sausageBaseWidth, sausageTopWidth, sausageHeight), material);
    sausage.position.copy(center);
    sausage.position.y = sausageHeight * 0.5 + 0.05;
    sausage.rotation.y = angle;
    sausage.castShadow = true;
    sausage.receiveShadow = true;
    group.add(sausage);
  }

  extraTrackAreas.push({ kind: "sausage", points: kerbPoints, halfWidth: sausageBaseWidth * 0.69, height: sausageHeight, surface: "sausage" });
}

function makeSausageKerbGeometry(length, baseWidth, topWidth, height) {
  const halfLength = length * 0.5;
  const halfBase = baseWidth * 0.5;
  const halfTop = topWidth * 0.5;
  const vertices = new Float32Array([
    -halfBase, 0, -halfLength,
    halfBase, 0, -halfLength,
    -halfTop, height, -halfLength,
    halfTop, height, -halfLength,
    -halfBase, 0, halfLength,
    halfBase, 0, halfLength,
    -halfTop, height, halfLength,
    halfTop, height, halfLength,
  ]);
  const indices = [
    0, 4, 6, 0, 6, 2,
    1, 3, 7, 1, 7, 5,
    2, 6, 7, 2, 7, 3,
    0, 1, 5, 0, 5, 4,
    4, 5, 7, 4, 7, 6,
    0, 2, 3, 0, 3, 1,
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function addEditorSceneryObjects(group, obstacles = [], sourceTrack = editorTrack) {
  for (const item of sourceTrack.scenery ?? []) {
    const position = editorPointToWorld(item);
    if (item.type === "trees") {
      addEditorTreeCluster(group, position.x, position.z, item.rotation ?? 0, obstacles);
    } else if (item.type === "cherry-trees") {
      addEditorCherryTreeCluster(group, position.x, position.z, item.rotation ?? 0, obstacles);
    } else if (item.type === "douglas-pines") {
      addEditorDouglasPines(group, position.x, position.z, item.rotation ?? 0, obstacles);
    } else if (item.type === "maple-tree") {
      addEditorMapleTree(group, position.x, position.z, item.rotation ?? 0, obstacles);
    } else if (item.type === "boulder-cluster") {
      addEditorBoulderCluster(group, position.x, position.z, item.rotation ?? 0, obstacles);
    } else if (item.type.startsWith("building")) {
      addEditorBuilding(group, position.x, position.z, item.rotation ?? 0, item.type, obstacles, item.variant);
    } else if (item.type === "lamp") {
      addEditorLamp(group, position.x, position.z, item.rotation ?? 0);
    } else if (item.type === "flower-bed") {
      addEditorFlowerBed(group, position.x, position.z, item.rotation ?? 0);
    }
  }
}

function addEditorWallObject(group, samples, spec, obstacles) {
  const concreteMaterial = new THREE.MeshStandardMaterial({ color: 0xd5d7d2, roughness: 0.68, metalness: 0.03, flatShading: true });
  const capMaterial = new THREE.MeshStandardMaterial({ color: 0xf05a3f, roughness: 0.56, metalness: 0.08, flatShading: true });
  const segmentCount = Math.max(1, spec.segmentCount ?? editorTrack.nodes.length);
  const segmentStart = THREE.MathUtils.clamp((spec.segment ?? 0) / segmentCount, 0, 0.999);
  const segmentSpan = 1 / segmentCount;
  const startIndex = Math.floor(segmentStart * samples.length);
  const endIndex = Math.max(startIndex + 4, Math.floor((segmentStart + segmentSpan) * samples.length));
  const definition = trackDefinitions[spec.definitionId ?? "editor-test"];
  const widthSamples = getTrackWidthProfile(definition, samples.length, spec.trackHalfWidth ?? 7.2);
  const side = spec.side ?? 1;
  const wallHeight = 1.6;
  const wallDepth = 0.72;
  const centerOffset = side * ((spec.trackHalfWidth ?? 7.2) + wallDepth * 0.65);
  const wallPoints = [];

  for (let i = startIndex; i <= endIndex; i += 4) {
    wallPoints.push(getTrackPoseAt(samples, (i % samples.length) / samples.length, centerOffset).position);
  }

  for (let i = 0; i < wallPoints.length - 1; i += 1) {
    const current = wallPoints[i];
    const next = wallPoints[i + 1];
    const center = current.clone().lerp(next, 0.5);
    if (!isWallSegmentClearOfAsphalt(center, samples, widthSamples, startIndex, endIndex, definition)) continue;
    const length = Math.max(1.1, current.distanceTo(next));
    const angle = Math.atan2(next.x - current.x, next.z - current.z);

    const barrier = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(wallDepth, wallHeight, length), concreteMaterial);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(wallDepth * 1.08, 0.18, length), capMaterial);
    base.position.y = wallHeight * 0.5;
    cap.position.y = wallHeight + 0.12;
    base.receiveShadow = true;
    barrier.add(base, cap);
    barrier.position.copy(center);
    barrier.rotation.y = angle;
    group.add(barrier);

    obstacles.push({
      kind: "wall",
      a: current.clone(),
      b: next.clone(),
      halfWidth: wallDepth * 0.72,
    });
  }
}

function isWallSegmentClearOfAsphalt(point, samples, widthSamples, ownStartIndex, ownEndIndex, definition = trackDefinitions["editor-test"]) {
  const nearbyBuffer = 18;
  for (let i = 0; i < samples.length; i += 1) {
    const forwardDistance = Math.abs(i - ownStartIndex);
    const inOwnRange = i >= ownStartIndex - nearbyBuffer && i <= ownEndIndex + nearbyBuffer;
    if (inOwnRange || forwardDistance > samples.length - nearbyBuffer) continue;
    const width = widthSamples[i] ?? definition?.halfWidth ?? 7.2;
    const dx = point.x - samples[i].x;
    const dz = point.z - samples[i].z;
    if (Math.sqrt(dx * dx + dz * dz) < width + 0.9) return false;
  }
  return true;
}

function addRoadAttachedGrandstand(group, samples, spec) {
  const segmentCount = Math.max(1, spec.segmentCount ?? editorTrack.nodes.length);
  const t = THREE.MathUtils.clamp(((spec.segment ?? 0) + 0.5) / segmentCount, 0, 0.999);
  const offset = (spec.trackHalfWidth ?? 7.2) + EDITOR_WALL_OUTER_EDGE + EDITOR_GRANDSTAND_WALL_GAP + EDITOR_GRANDSTAND_FRONT_EDGE;
  const pose = getTrackPoseAt(samples, t, spec.side * offset);
  addEditorGrandstand(group, pose.position.x, pose.position.z, -pose.angle + (spec.side > 0 ? Math.PI * 0.5 : -Math.PI * 0.5));
}

function editorPointToWorld(item) {
  const [planX, planY] = editorPointToPlan(item);
  return pointFromPlan(planX, planY, 0.168);
}

function addEditorTreeCluster(group, x, z, rotation = 0, obstacles = []) {
  const cluster = new THREE.Group();
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8c6239, roughness: 0.88, flatShading: true });
  const leafMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x4f9b52, roughness: 0.9, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x3f7f45, roughness: 0.9, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x67ad5d, roughness: 0.9, flatShading: true }),
  ];
  const spots = [
    [0, 0, 2.25],
    [-3.1, 2.0, 1.15],
    [2.8, 1.6, 1.45],
    [-1.5, -2.6, 0.95],
    [2.1, -2.4, 1.8],
  ];

  for (const [localX, localZ, scale] of spots) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.28 * scale, 1.4 * scale, 5), trunkMaterial);
    const leaves = new THREE.Mesh(new THREE.ConeGeometry(1.05 * scale, 2.4 * scale, 7), leafMaterials[Math.floor(scale * 10) % leafMaterials.length]);
    trunk.position.y = 0.7 * scale;
    leaves.position.y = 2.25 * scale;
    trunk.receiveShadow = true;
    leaves.receiveShadow = true;
    tree.add(trunk, leaves);
    tree.position.set(localX, 0, localZ);
    cluster.add(tree);
  }

  cluster.position.set(x, 0, z);
  const worldRotation = editorRotationToWorld(rotation);
  cluster.rotation.y = worldRotation;
  registerSceneryCullable(cluster, 440);
  group.add(cluster);

  for (const [localX, localZ, scale] of spots) {
    const worldOffset = new THREE.Vector3(localX, 0, localZ).applyAxisAngle(new THREE.Vector3(0, 1, 0), worldRotation);
    const trunkRadius = Math.max(0.55, 0.55 * scale);
    const hitboxScale = 0.75;
    obstacles.push({
      kind: "tree",
      x: x + worldOffset.x,
      z: z + worldOffset.z,
      rotation: worldRotation,
      width: trunkRadius * 2.1 * hitboxScale,
      depth: trunkRadius * 2.1 * hitboxScale,
    });
  }
}

function addEditorCherryTreeCluster(group, x, z, rotation = 0, obstacles = []) {
  const cluster = new THREE.Group();
  const sizeMultiplier = 2;
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x7a5237, roughness: 0.9, flatShading: true });
  const blossomMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xffa7cf, roughness: 0.9, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0xffc4dc, roughness: 0.9, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0xf58ab8, roughness: 0.9, flatShading: true }),
  ];
  const spots = [
    [0, 0, 1.2],
    [-2.6, 1.4, 0.92],
    [2.4, 1.2, 1.0],
    [-1.4, -2.2, 0.78],
    [2.0, -2.0, 0.86],
  ].map(([localX, localZ, scale]) => [localX * sizeMultiplier, localZ * sizeMultiplier, scale * sizeMultiplier]);

  for (const [localX, localZ, scale] of spots) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * scale, 0.28 * scale, 1.55 * scale, 5), trunkMaterial);
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25 * scale, 1), blossomMaterials[Math.floor(scale * 10) % blossomMaterials.length]);
    const crownB = new THREE.Mesh(new THREE.IcosahedronGeometry(0.82 * scale, 0), blossomMaterials[(Math.floor(scale * 10) + 1) % blossomMaterials.length]);
    trunk.position.y = 0.72 * scale;
    crown.position.set(0, 2.05 * scale, 0);
    crownB.position.set(0.58 * scale, 2.28 * scale, -0.2 * scale);
    trunk.receiveShadow = true;
    crown.receiveShadow = true;
    crownB.receiveShadow = true;
    tree.add(trunk, crown, crownB);
    tree.position.set(localX, 0, localZ);
    cluster.add(tree);
  }

  cluster.position.set(x, 0, z);
  const worldRotation = editorRotationToWorld(rotation);
  cluster.rotation.y = worldRotation;
  registerSceneryCullable(cluster, 460);
  group.add(cluster);
  addTreeObstacleSpots(obstacles, spots, x, z, worldRotation, 0.72);
}

function addEditorDouglasPines(group, x, z, rotation = 0, obstacles = []) {
  const cluster = new THREE.Group();
  const sizeMultiplier = 3;
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x6b4b32, roughness: 0.92, flatShading: true });
  const needleMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x1f5f42, roughness: 0.94, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x174832, roughness: 0.94, flatShading: true }),
  ];
  const spots = [
    [0, 0, 1.35],
    [-3.3, 1.7, 1.05],
    [3.0, 1.3, 1.16],
    [-1.6, -2.8, 0.92],
  ].map(([localX, localZ, scale]) => [localX * sizeMultiplier, localZ * sizeMultiplier, scale * sizeMultiplier]);

  for (const [localX, localZ, scale] of spots) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * scale, 0.26 * scale, 4.0 * scale, 6), trunkMaterial);
    trunk.position.y = 2 * scale;
    trunk.receiveShadow = true;
    tree.add(trunk);
    for (let tier = 0; tier < 4; tier += 1) {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry((1.55 - tier * 0.25) * scale, (3.4 - tier * 0.18) * scale, 7),
        needleMaterials[tier % needleMaterials.length],
      );
      cone.position.y = (3.2 + tier * 1.15) * scale;
      cone.receiveShadow = true;
      tree.add(cone);
    }
    tree.position.set(localX, 0, localZ);
    cluster.add(tree);
  }

  cluster.position.set(x, 0, z);
  const worldRotation = editorRotationToWorld(rotation);
  cluster.rotation.y = worldRotation;
  registerSceneryCullable(cluster, 500);
  group.add(cluster);
  addTreeObstacleSpots(obstacles, spots, x, z, worldRotation, 0.41);
}

function addEditorMapleTree(group, x, z, rotation = 0, obstacles = []) {
  const maple = new THREE.Group();
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x765238, roughness: 0.88, flatShading: true });
  const canopyMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x6fa642, roughness: 0.92, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x87b94c, roughness: 0.92, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x587f35, roughness: 0.94, flatShading: true }),
  ];
  const trunkHeight = 8.6;
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 2.16, trunkHeight, 7), trunkMaterial);
  trunk.position.y = trunkHeight * 0.5;
  trunk.receiveShadow = true;
  maple.add(trunk);

  const canopyTiers = [
    [0, 0, 0, 17.8, 8.8, 0.98],
    [-4.8, 0.2, 1.1, 15.2, 7.2, 0.9],
    [4.6, 0.0, -0.8, 14.8, 7.0, 0.86],
    [0.6, 0.3, -4.9, 15.6, 7.4, 0.88],
    [-0.8, 0.1, 4.7, 13.8, 6.7, 0.82],
    [0, 5.9, 0, 12.8, 8.4, 0.78],
  ];
  for (let i = 0; i < canopyTiers.length; i += 1) {
    const [localX, localY, localZ, radius, height, widthScale] = canopyTiers[i];
    const crown = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 9), canopyMaterials[i % canopyMaterials.length]);
    crown.scale.set(widthScale * 1.16, 1, widthScale);
    crown.position.set(localX, trunkHeight + 5.2 + localY, localZ);
    crown.rotation.y = i * 0.34;
    crown.receiveShadow = true;
    maple.add(crown);
  }

  maple.position.set(x, 0, z);
  const worldRotation = editorRotationToWorld(rotation);
  maple.rotation.y = worldRotation;
  registerSceneryCullable(maple, 560);
  group.add(maple);

  obstacles.push({
    kind: "tree",
    x,
    z,
    rotation: worldRotation,
    width: 3.1,
    depth: 3.1,
  });
}

function addEditorBoulderCluster(group, x, z, rotation = 0, obstacles = []) {
  const cluster = new THREE.Group();
  const rockMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x858982, roughness: 0.96, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x6f756d, roughness: 0.98, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x9a968b, roughness: 0.94, flatShading: true }),
  ];
  const rocks = [
    [0, 0, 1.65, 1.15, 1.35],
    [-1.8, 0.75, 1.2, 0.82, 1.05],
    [1.9, 0.62, 1.05, 0.75, 0.92],
    [-0.35, -1.35, 1.1, 0.78, 0.86],
    [1.25, -1.15, 0.78, 0.62, 0.74],
  ];
  for (let i = 0; i < rocks.length; i += 1) {
    const [localX, localZ, radius, heightScale, widthScale] = rocks[i];
    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(radius, 0), rockMaterials[i % rockMaterials.length]);
    rock.scale.set(widthScale, heightScale, 0.86 + (i % 2) * 0.18);
    rock.position.set(localX, radius * heightScale * 0.52, localZ);
    rock.rotation.set(0.15 * i, 0.7 * i, -0.09 * i);
    rock.receiveShadow = true;
    cluster.add(rock);
  }

  cluster.position.set(x, 0, z);
  const worldRotation = editorRotationToWorld(rotation);
  cluster.rotation.y = worldRotation;
  registerSceneryCullable(cluster, 430);
  group.add(cluster);

  obstacles.push({
    kind: "building",
    x,
    z,
    rotation: worldRotation,
    width: 5.8,
    depth: 4.4,
  });
}

function addTreeObstacleSpots(obstacles, spots, x, z, worldRotation, radiusScale) {
  for (const [localX, localZ, scale] of spots) {
    const worldOffset = new THREE.Vector3(localX, 0, localZ).applyAxisAngle(new THREE.Vector3(0, 1, 0), worldRotation);
    const trunkRadius = Math.max(0.55, radiusScale * scale);
    const hitboxScale = 0.75;
    obstacles.push({
      kind: "tree",
      x: x + worldOffset.x,
      z: z + worldOffset.z,
      rotation: worldRotation,
      width: trunkRadius * 2.1 * hitboxScale,
      depth: trunkRadius * 2.1 * hitboxScale,
    });
  }
}

function addEditorGrandstand(group, x, z, rotation = 0) {
  const stand = new THREE.Group();
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xbfc6c9, roughness: 0.56, metalness: 0.2, flatShading: true });
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xff7a1f, roughness: 0.62, metalness: 0.04, flatShading: true });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x202532, roughness: 0.48, metalness: 0.22, flatShading: true });
  const crowdColors = [0xf4d35e, 0xe94f37, 0x2d7dd2, 0x3cb371, 0xf7f7f2, 0x101820];

  const length = 68;
  const tiers = 6;
  const rowDepth = 2.7;
  const rowStep = 1.65;
  const deckDepth = tiers * 2.2;
  const deckZ = -tiers * 1.6;
  const roofDepth = 7;
  const roofZ = -tiers * 1.4;
  const frontEdge = rowDepth * 0.5;
  const backEdge = Math.min(deckZ - deckDepth * 0.5, roofZ - roofDepth * 0.5, -(tiers - 1) * rowStep - rowDepth * 0.5);
  const collisionDepth = frontEdge - backEdge;
  const visualCenterZ = (frontEdge + backEdge) * 0.5;
  for (let tier = 0; tier < tiers; tier += 1) {
    const row = new THREE.Mesh(new THREE.BoxGeometry(length, 0.9, rowDepth), seatMaterial);
    row.position.set(0, 0.8 + tier * 1.15, -tier * rowStep - visualCenterZ);
    row.receiveShadow = true;
    stand.add(row);
  }

  const deck = new THREE.Mesh(new THREE.BoxGeometry(length + 3.5, 0.7, deckDepth), frameMaterial);
  deck.position.set(0, 0.35, deckZ - visualCenterZ);
  deck.receiveShadow = true;
  stand.add(deck);

  const roof = new THREE.Mesh(new THREE.BoxGeometry(length + 5, 0.8, roofDepth), roofMaterial);
  roof.position.set(0, 8.8, roofZ - visualCenterZ);
  roof.rotation.x = -0.12;
  stand.add(roof);

  const crowdCount = 68;
  const crowdColumns = 34;
  for (let i = 0; i < crowdCount; i += 1) {
    const tier = i % tiers;
    const person = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 6, 4),
      new THREE.MeshStandardMaterial({ color: crowdColors[i % crowdColors.length], roughness: 0.9, flatShading: true }),
    );
    person.position.set(-length / 2 + 1.6 + (i % crowdColumns) * 2.0, 1.7 + tier * 1.15, -tier * rowStep - 0.35 - visualCenterZ);
    stand.add(person);
  }

  stand.position.set(x, 0, z);
  stand.rotation.y = editorRotationToWorld(rotation);
  registerSceneryCullable(stand, 650);
  group.add(stand);
}

function addEditorBuilding(group, x, z, rotation = 0, type = "building-small", obstacles = [], variant = undefined) {
  const buildingColor = buildingVariantColor(type, variant);
  const specs = {
    "building-small": [{ x: 0, z: 0, width: 10, depth: 10, height: 7, color: buildingColor ?? 0xb8bec4 }],
    "building-group": [
      { x: -5.5, z: -3.5, width: 8, depth: 8, height: 6, color: 0x4d91d4 },
      { x: 4.5, z: -1.5, width: 7, depth: 9, height: 8, color: 0x407fc0 },
      { x: -1.5, z: 6, width: 9, depth: 6, height: 5, color: 0x5fa5e6 },
    ],
    "building-tall": [{ x: 0, z: 0, width: 11, depth: 11, height: 26, color: 0x153f7a }],
    "building-super-tall": [{ x: 0, z: 0, width: 13, depth: 13, height: 58, color: buildingColor ?? 0x273a4a }],
    "building-skyscraper": [{ x: 0, z: 0, width: 13, depth: 13, height: 58, color: buildingColor ?? 0x273a4a }],
  }[type] ?? [{ x: 0, z: 0, width: 10, depth: 10, height: 7, color: 0x9bd4f5 }];
  const building = new THREE.Group();
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x26313a, roughness: 0.5, metalness: 0.14, flatShading: true });
  const glassMaterial = new THREE.MeshStandardMaterial({ color: 0xd9f5ff, roughness: 0.35, metalness: 0.08, flatShading: true });
  const litWindowMaterial = new THREE.MeshStandardMaterial({ color: 0xc4a268, roughness: 0.38, metalness: 0.03, flatShading: true });

  for (const spec of specs) {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.58, metalness: 0.04, flatShading: true });
    const body = new THREE.Mesh(new THREE.BoxGeometry(spec.width, spec.height, spec.depth), wallMaterial);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(spec.width + 0.9, 0.8, spec.depth + 0.9), roofMaterial);
    body.position.set(spec.x, spec.height * 0.5, spec.z);
    roof.position.set(spec.x, spec.height + 0.4, spec.z);
    body.receiveShadow = true;
    roof.receiveShadow = true;
    building.add(body, roof);

    addBuildingWindows(building, spec, glassMaterial, litWindowMaterial);
  }

  building.position.set(x, 0, z);
  const worldRotation = editorRotationToWorld(rotation);
  building.rotation.y = worldRotation;
  registerSceneryCullable(building, 750);
  group.add(building);

  for (const spec of specs) {
    const worldOffset = new THREE.Vector3(spec.x, 0, spec.z).applyAxisAngle(new THREE.Vector3(0, 1, 0), worldRotation);
    obstacles.push({
      kind: "building",
      x: x + worldOffset.x,
      z: z + worldOffset.z,
      rotation: worldRotation,
      width: (spec.width + 1.2) * 0.25,
      depth: (spec.depth + 1.2) * 0.25,
    });
  }
}

function addEditorLamp(group, x, z, rotation = 0) {
  const lamp = new THREE.Group();
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0xc6ced2, roughness: 0.42, metalness: 0.34, flatShading: true });
  const glowMaterial = new THREE.MeshStandardMaterial({ color: 0xffe28a, emissive: 0xffcf4a, emissiveIntensity: activeTimeOfDay === "day" ? 0.28 : 0.72, roughness: 0.4, flatShading: true });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 16, 6), poleMaterial);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.26, 5.8), poleMaterial);
  const light = new THREE.Mesh(new THREE.SphereGeometry(0.68, 10, 7), glowMaterial);
  const groundGlow = new THREE.Mesh(new THREE.PlaneGeometry(18, 30), getLampGroundGlowMaterial());
  pole.position.y = 8;
  arm.position.set(0, 15.7, 2.65);
  light.position.set(0, 15.45, 5.55);
  groundGlow.rotation.x = -Math.PI / 2;
  groundGlow.position.set(0, 0.035, 13.5);
  const glow = new THREE.PointLight(0xffc45c, sceneryLightIntensity(11.5, "lamp"), sceneryLightDistance(31, "lamp"), 1.7);
  glow.position.set(0, 15.4, 5.55);
  registerSceneryLight(glow, 82);
  pole.receiveShadow = true;
  arm.receiveShadow = true;
  lamp.add(groundGlow, pole, arm, light, glow);
  lamp.position.set(x, 0, z);
  lamp.rotation.y = editorRotationToWorld(rotation);
  lamp.scale.setScalar(0.85);
  registerSceneryCullable(lamp, 520);
  group.add(lamp);
}

function addEditorFlowerBed(group, x, z, rotation = 0) {
  const bed = new THREE.Group();
  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(4.8, 5.4, 0.28, 28),
    new THREE.MeshStandardMaterial({ color: 0x4a2b19, roughness: 0.96, flatShading: true }),
  );
  soil.scale.z = 0.55;
  soil.position.y = 0.14;
  soil.receiveShadow = true;
  bed.add(soil);

  const flowerColors = [0xff6fae, 0xffd84d, 0xf6f2e8, 0x9bdbff, 0xff8756];
  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x3f8f4d, roughness: 0.85, flatShading: true });
  for (let i = 0; i < 22; i += 1) {
    const angle = i * 2.399;
    const radius = 0.7 + (i % 7) * 0.55;
    const stemHeight = 0.56 + (i % 4) * 0.08;
    const flowerX = Math.cos(angle) * radius;
    const flowerZ = Math.sin(angle) * radius * 0.52;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, stemHeight, 5), stemMaterial);
    stem.position.set(flowerX, 0.28 + stemHeight * 0.5, flowerZ);
    bed.add(stem);

    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.25 + (i % 3) * 0.05, 6, 4),
      new THREE.MeshStandardMaterial({ color: flowerColors[i % flowerColors.length], roughness: 0.8, flatShading: true }),
    );
    flower.position.set(flowerX, 0.34 + stemHeight, flowerZ);
    bed.add(flower);
  }

  bed.position.set(x, 0, z);
  bed.scale.set(1.3, 1, 1.3);
  bed.rotation.y = editorRotationToWorld(rotation);
  registerSceneryCullable(bed, 360);
  group.add(bed);
}

function editorRotationToWorld(rotation = 0) {
  return Math.PI - rotation;
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
  setupQuickRaceOpponents();
  startRaceCountdown();
  updateTimeTrialHud();
}

function startEditorMusic() {
  if (editorAudio.element) {
    editorAudio.element.play().catch(() => {});
    return;
  }

  editorAudio.playlist = [...EDITOR_MUSIC_SRCS].sort(() => Math.random() - 0.5);
  editorAudio.index = 0;
  playNextEditorMusicTrack();
}

function playNextEditorMusicTrack() {
  if (!editorAudio.playlist.length) return;
  const src = editorAudio.playlist[editorAudio.index % editorAudio.playlist.length];
  editorAudio.index += 1;
  const audio = new Audio(src);
  editorAudio.element = audio;
  audio.preload = "auto";
  audio.volume = 0.3;
  audio.addEventListener("ended", playNextEditorMusicTrack, { once: true });
  audio.addEventListener("error", () => {
    if (editorAudio.element === audio) {
      editorAudio.element = null;
      if (editorAudio.index < editorAudio.playlist.length + 2) playNextEditorMusicTrack();
    }
  }, { once: true });
  audio.play().catch(() => {});
}

function stopEditorMusic() {
  if (!editorAudio.element) return;
  editorAudio.element.pause();
  editorAudio.element.currentTime = 0;
  editorAudio.element = null;
}
function startMenuMusic() {
  if (gameStarted || !trackEditor.classList.contains("is-hidden")) return;

  if (!menuAudio.element) {
    menuAudio.element = new Audio(MENU_THEME_SRC);
    menuAudio.element.loop = true;
    menuAudio.element.preload = "auto";
    menuAudio.element.volume = 0.35;
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
    const isCorvette = profile.kind === "corvette";
    const rpmRatio = profile.kind === "stock" || profile.kind === "lmp"
      ? THREE.MathUtils.clamp((carState.rpm - 1200) / 6000, 0, 1)
      : THREE.MathUtils.clamp((carState.rpm - (isCorvette ? 1800 : 2200)) / (isCorvette ? 8500 : 9800), 0, 1);
    audioState.element.playbackRate = isCorvette
      ? THREE.MathUtils.lerp(0.62, 1.55, rpmRatio)
      : profile.kind === "stock" || profile.kind === "lmp"
      ? THREE.MathUtils.lerp(0.58, 1.25, rpmRatio)
      : THREE.MathUtils.lerp(0.72, 1.85, rpmRatio);
    audioState.element.volume = THREE.MathUtils.lerp(0.08, profile.kind === "formula" ? 0.72 : isCorvette ? 0.74 : 0.62, throttle ? 1 : 0.2);
    if (audioState.ersElement) {
      const ersTargetVolume = boostActive && profile.hasErs ? (profile.kind === "corvette" ? 0.12 : 0.082) : 0;
      const boostFade = profile.kind === "corvette" ? (boostActive ? 2.5 : 1.5) : (boostActive ? 8 : 3.2);
      audioState.ersElement.volume = THREE.MathUtils.damp(audioState.ersElement.volume, ersTargetVolume, boostFade, dt);
      audioState.ersElement.playbackRate = THREE.MathUtils.lerp(profile.kind === "corvette" ? 0.48 : 0.72, profile.kind === "corvette" ? 0.82 : 1.18, rpmRatio);
    }
    if (audioState.brakeElement) {
      audioState.brakeElement.volume = THREE.MathUtils.damp(audioState.brakeElement.volume, hardBraking ? 0.24 : 0, hardBraking ? 10 : 4, dt);
    }
    return;
  }

  if (!audioState.context) return;

  const now = audioState.context.currentTime;
  const isCorvette = profile.kind === "corvette";
  const rpmRatio = profile.kind === "jeep"
    ? THREE.MathUtils.clamp((carState.rpm - 900) / 5200, 0, 1)
    : profile.kind === "stock" || profile.kind === "lmp"
      ? THREE.MathUtils.clamp((carState.rpm - 1200) / 6000, 0, 1)
      : THREE.MathUtils.clamp((carState.rpm - (isCorvette ? 1800 : 2200)) / (isCorvette ? 8500 : 9800), 0, 1);
  const jeepShiftCue = profile.kind === "jeep" && rpmRatio > 0.86;
  const throttleLift = throttle ? 1 : 0.48;
  const baseFrequency =
    profile.kind === "jeep"
      ? THREE.MathUtils.lerp(34, 170, rpmRatio)
      : profile.kind === "stock"
      ? THREE.MathUtils.lerp(44, 205, rpmRatio)
      : profile.kind === "lmp"
        ? THREE.MathUtils.lerp(58, 270, rpmRatio)
      : isCorvette
        ? THREE.MathUtils.lerp(56, 300, rpmRatio)
        : THREE.MathUtils.lerp(68, 360, rpmRatio);
  const v8Pulse = profile.kind === "formula" || isCorvette ? baseFrequency * 0.5 : profile.kind === "jeep" ? baseFrequency * 0.48 : baseFrequency * 0.62;

  audioState.engine.frequency.setTargetAtTime(baseFrequency, now, 0.035);
  audioState.sub.frequency.setTargetAtTime(v8Pulse, now, 0.045);
  audioState.grumble.frequency.setTargetAtTime(Math.max(profile.kind === "formula" ? 34 : 28, v8Pulse * 0.55), now, 0.055);
  audioState.ers.frequency.setTargetAtTime(THREE.MathUtils.lerp(profile.kind === "corvette" ? 185 : 245, profile.kind === "corvette" ? 335 : 520, rpmRatio), now, 0.08);
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
      : isCorvette
        ? THREE.MathUtils.lerp(560, 2200, rpmRatio)
        : THREE.MathUtils.lerp(650, 2600, rpmRatio),
    now,
    0.035,
  );
  audioState.lowShelf.gain.setTargetAtTime(profile.kind === "jeep" ? 15 : isCorvette ? THREE.MathUtils.lerp(12, 5, rpmRatio) : profile.kind === "formula" ? THREE.MathUtils.lerp(10, 4, rpmRatio) : 10, now, 0.08);
  audioState.engineGain.gain.setTargetAtTime(
    profile.kind === "formula" || isCorvette
      ? 0.05 + rpmRatio * 0.15 * throttleLift
      : profile.kind === "jeep"
        ? 0.096 + rpmRatio * 0.18 * throttleLift
        : 0.045 + rpmRatio * 0.12 * throttleLift,
    now,
    0.04,
  );
  audioState.subGain.gain.setTargetAtTime(
    profile.kind === "formula" || isCorvette
      ? 0.055 + (1 - rpmRatio) * 0.04 + throttle * 0.085
      : profile.kind === "jeep"
        ? 0.192 + throttle * 0.192
        : 0.08 + throttle * 0.11,
    now,
    0.06,
  );
  audioState.grumbleGain.gain.setTargetAtTime(
    profile.kind === "formula" || isCorvette
      ? 0.018 + throttle * 0.11 + (1 - rpmRatio) * 0.012
      : profile.kind === "jeep"
        ? 0.108 + throttle * 0.24 + (1 - rpmRatio) * 0.06
        : 0.055 + throttle * 0.14 + (1 - rpmRatio) * 0.025,
    now,
    0.08,
  );
  audioState.ersGain.gain.setTargetAtTime(
    boostActive && profile.hasErs ? (profile.kind === "corvette" ? 0.04 : 0.025) : 0.0001,
    now,
    profile.kind === "corvette" ? (boostActive ? 0.55 : 0.65) : (boostActive ? 0.16 : 0.18),
  );
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
          ? nitrousSample(t)
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
  const gearCycle = Math.floor(t / 0.18) % 4;
  const rev = (t % 0.18) / 0.18;
  const pulse = 58 + gearCycle * 5 + rev * 42;
  const main = Math.sin(Math.PI * 2 * pulse * t);
  const sub = Math.sin(Math.PI * 2 * pulse * 0.42 * t);
  const harmonic = Math.sin(Math.PI * 2 * pulse * 1.85 * t) * 0.16;
  const burble = Math.sin(Math.PI * 2 * 31 * t) * Math.sin(Math.PI * 2 * 7.5 * t);
  const shiftDip = rev > 0.84 ? 0.58 : 1;
  return (main * 0.26 + sub * 0.55 + harmonic + burble * 0.13) * shiftDip;
}

function ersSample(t) {
  const sweep = 335 + Math.sin(Math.PI * 2 * 17 * t) * 34;
  const buzz = Math.sign(Math.sin(Math.PI * 2 * sweep * t)) * 0.24;
  const wings = Math.sin(Math.PI * 2 * 650 * t + Math.sin(Math.PI * 2 * 23 * t) * 0.9) * 0.16;
  const tremolo = 0.48 + Math.sin(Math.PI * 2 * 15 * t) * 0.15;
  return (buzz + wings) * tremolo;
}

function nitrousSample(t) {
  const breath = Math.sin(Math.PI * 2 * 185 * t + Math.sin(Math.PI * 2 * 9 * t) * 1.1) * 0.28;
  const valve = Math.sin(Math.PI * 2 * 335 * t + Math.sin(Math.PI * 2 * 14 * t) * 1.4) * 0.12;
  const flutter = 0.72 + Math.sin(Math.PI * 2 * 14 * t) * 0.12 + Math.sin(Math.PI * 2 * 33 * t) * 0.06;
  return (breath + valve) * flutter;
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

function startRaceCountdown() {
  raceCountdownState.active = selectedGameMode === "quick-race";
  raceCountdownState.elapsed = 0;
  raceCountdownState.hideTime = 0;
  raceCountdownState.lastCue = "";
  if (!raceCountdownEl) return;
  if (!raceCountdownState.active) {
    raceCountdownEl.hidden = true;
    return;
  }
  showRaceCountdownCue("3");
}

function updateRaceCountdown(dt) {
  if (selectedGameMode !== "quick-race" || !gameStarted || isMenuOpen()) {
    if (raceCountdownEl) raceCountdownEl.hidden = true;
    raceCountdownState.active = false;
    raceCountdownState.hideTime = 0;
    return false;
  }
  if (isPaused) return raceCountdownState.active;

  if (raceCountdownState.active) {
    raceCountdownState.elapsed += dt;
    if (raceCountdownState.elapsed < 3) {
      showRaceCountdownCue(String(3 - Math.floor(raceCountdownState.elapsed)));
      return true;
    }
    showRaceCountdownCue("Go!");
    raceCountdownState.active = false;
    raceCountdownState.hideTime = 0.9;
    return false;
  }

  if (raceCountdownState.hideTime > 0) {
    raceCountdownState.hideTime = Math.max(0, raceCountdownState.hideTime - dt);
    if (raceCountdownState.hideTime === 0 && raceCountdownEl) raceCountdownEl.hidden = true;
  }
  return false;
}

function showRaceCountdownCue(label) {
  if (!raceCountdownEl || raceCountdownState.lastCue === label) return;
  raceCountdownState.lastCue = label;
  raceCountdownEl.textContent = label;
  raceCountdownEl.hidden = false;
  raceCountdownEl.classList.toggle("is-go", label === "Go!");
  raceCountdownEl.classList.remove("is-pulse");
  void raceCountdownEl.offsetWidth;
  raceCountdownEl.classList.add("is-pulse");
  playRaceCountdownBeep(label === "Go!");
}

function playRaceCountdownBeep(isGo = false) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = audioState.context || (AudioContext ? new AudioContext() : null);
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(isGo ? 660 : 520, now);
  if (isGo) osc.frequency.exponentialRampToValueAtTime(440, now + 0.52);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(isGo ? 0.16 : 0.1, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.62 : 0.16));
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(now);
  osc.stop(now + (isGo ? 0.68 : 0.2));
}

function angleDifference(target, current) {
  return Math.atan2(Math.sin(target - current), Math.cos(target - current));
}

function getTrackForwardAtSample(index = 0) {
  const samples = track.samples ?? [];
  if (!samples.length) return new THREE.Vector3(Math.sin(track.start.heading), 0, Math.cos(track.start.heading));
  const safeIndex = ((index % samples.length) + samples.length) % samples.length;
  const previous = samples[(safeIndex - 1 + samples.length) % samples.length];
  const next = samples[(safeIndex + 1) % samples.length];
  return next.clone().sub(previous).setY(0).normalize();
}

function getQuickRaceGridPose(gridPosition = 1) {
  const startIndex = track.startSampleIndex ?? 0;
  const startPoint = track.startLine?.start ?? new THREE.Vector3(track.start.x, 0, track.start.z);
  const forward = getTrackForwardAtSample(startIndex);
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const rowSpacing = 13.8;
  const laneOffset = 2.9;
  const gridStartBehindLine = 4;
  const rightLaneAdvance = 2.2;
  const safePosition = Math.max(1, Math.round(gridPosition));
  const row = Math.floor((safePosition - 1) / 2);
  const isRightLane = safePosition % 2 === 1;
  const side = isRightLane ? 1 : -1;
  const forwardOffset = -gridStartBehindLine - row * rowSpacing - (isRightLane ? 0 : rightLaneAdvance);
  const position = startPoint
    .clone()
    .addScaledVector(forward, forwardOffset)
    .addScaledVector(right, side * laneOffset);
  return {
    position,
    heading: Math.atan2(forward.x, forward.z),
    sampleIndex: ((startIndex - Math.round((Math.abs(forwardOffset)) / 1.3)) % (track.samples?.length ?? 1) + (track.samples?.length ?? 1)) % (track.samples?.length ?? 1),
    laneOffset: side * laneOffset,
  };
}

function clearAiOpponents() {
  for (const opponent of aiOpponents) {
    scene.remove(opponent.car.root);
  }
  aiOpponents.length = 0;
  updateAiDebugPanel(null);
  clearAiRacingLineDebug();
}

function setupQuickRaceOpponents() {
  clearAiOpponents();
  if (selectedGameMode !== "quick-race" || !gameStarted) return;
  const count = THREE.MathUtils.clamp(selectedAiOpponentCount, 1, 5);
  const carIds = getQuickRaceAiCarIds();
  const gridPositions = getAiGridPositions(count);
  const aiModel = getQuickRaceAiModelName();
  for (let i = 0; i < count; i += 1) {
    const carId = carIds[i % carIds.length] ?? "mersedeez";
    const aiCar = createSelectedCar(carId);
    tuneAiCarLights(aiCar);
    const pose = getQuickRaceGridPose(gridPositions[i]);
    aiCar.root.position.set(pose.position.x, track.groundY, pose.position.z);
    aiCar.root.rotation.set(0, pose.heading, 0);
    scene.add(aiCar.root);
    aiOpponents.push({
      aiModel,
      cyborg: aiModel === AI_CYBORG_MODEL_NAME ? createCyborgOpponentState(pose, i) : null,
      car: aiCar,
      carId,
      profile: getCarProfileById(carId),
      position: new THREE.Vector3(pose.position.x, track.groundY, pose.position.z),
      velocity: new THREE.Vector3(),
      heading: pose.heading,
      yawRate: 0,
      speed: 0,
      steer: 0,
      throttle: 0,
      brake: 0,
      stuckTimer: 0,
      recoveryTimer: 0,
      wheelSpin: 0,
      sampleIndex: pose.sampleIndex,
      sampleProgress: pose.sampleIndex,
      gridOffset: pose.laneOffset,
      racingLineOffset: 0,
      lineAggression: AI_SAFE_LINE_TUNING ? 0.12 : 0.56 + (i % 3) * 0.06,
      lineBias: AI_SAFE_LINE_TUNING ? (i % 2 === 0 ? -0.035 : 0.035) : (i % 2 === 0 ? -0.22 : 0.22) + (i - count * 0.5) * 0.03,
      pace: aiModel === AI_CYBORG_MODEL_NAME ? 0.985 + i * 0.012 : 1.06 + i * 0.018,
      gridPosition: gridPositions[i],
      debug: {
        grassFrames: 0,
        predictiveAvoidanceFrames: 0,
        wheelCorrectionFrames: 0,
        wallDangerFrames: 0,
        wallCorrectionFrames: 0,
        maxEdgeRatio: 0,
        lapTime: 0,
        lapDistance: 0,
        lastLapTime: null,
        lastLapAverageMph: null,
        lastLapPredictiveAvoidance: 0,
        lastLapWheelCorrections: 0,
        lastLapWallCorrections: 0,
        paceAdjustments: 0,
        laps: 0,
        cleanLaps: 0,
        lastLapClean: false,
        lastSampleIndex: pose.sampleIndex,
      },
    });
  }
  updateAiDebugStats();
  renderAiRacingLineDebug();
}

function getQuickRaceAiModelName() {
  return isCyborgQuickRaceAvailable() ? AI_CYBORG_MODEL_NAME : AI_CODEX_MODEL_NAME;
}

function isCyborgQuickRaceAvailable() {
  return selectedTrack === CYBORG_STOCK_TRACK_ID &&
    getCarProfile().kind === CYBORG_STOCK_CLASS &&
    kataraStockCyborgLine.samples.length > 0;
}

function createCyborgOpponentState(gridPose, opponentIndex = 0) {
  const line = kataraStockCyborgLine;
  const startProgress = getNearestCyborgProgress(line, gridPose.position);
  const laneOffsets = [0, -0.28, 0.28, -0.46, 0.46];
  return {
    line,
    progress: startProgress,
    targetProgress: startProgress,
    laneOffset: laneOffsets[opponentIndex % laneOffsets.length] ?? 0,
    smoothedLaneOffset: 0,
    mergeTimer: 4.5,
    headingBias: 0,
    lapTime: 0,
    lapDistance: 0,
    lastWrapped: false,
  };
}

function createCyborgRacingLine(training) {
  const laps = Array.isArray(training?.laps) ? training.laps : [];
  const bestLap = laps
    .filter((lap) => Array.isArray(lap.samples) && lap.samples.length > 8)
    .sort((a, b) => (a.lapTime ?? Infinity) - (b.lapTime ?? Infinity))[0];
  if (!bestLap) return { samples: [], totalDistance: 0, sourceLapTime: null };

  const samples = bestLap.samples.map((sample, index) => ({
    index,
    position: new THREE.Vector3(Number(sample.x) || 0, track?.groundY ?? 0, Number(sample.z) || 0),
    heading: Number(sample.heading) || 0,
    speed: Number(sample.speed) || 0,
    throttle: Number(sample.throttle) || 0,
    brake: Number(sample.brake) || 0,
    steer: Number(sample.steer) || 0,
    t: Number(sample.t) || 0,
    distance: 0,
  }));

  let totalDistance = 0;
  for (let i = 0; i < samples.length; i += 1) {
    samples[i].distance = totalDistance;
    const next = samples[(i + 1) % samples.length];
    const segmentLength = samples[i].position.distanceTo(next.position);
    totalDistance += Math.max(0.001, segmentLength);
  }

  return {
    samples,
    totalDistance,
    sourceLapTime: bestLap.lapTime ?? null,
    sourceLapNumber: bestLap.lapNumber ?? null,
  };
}

function getNearestCyborgProgress(line, position) {
  if (!line?.samples?.length) return 0;
  let bestIndex = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < line.samples.length; i += 1) {
    const distance = position.distanceToSquared(line.samples[i].position);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = i;
    }
  }
  return line.samples[bestIndex].distance;
}

function getNearestCyborgProgressNear(line, position, expectedProgress, searchMeters = 42) {
  if (!line?.samples?.length || !line.totalDistance) return 0;
  const wrappedExpected = ((expectedProgress % line.totalDistance) + line.totalDistance) % line.totalDistance;
  let bestProgress = wrappedExpected;
  let bestScore = Infinity;
  for (const sample of line.samples) {
    const progressDelta = getWrappedDistanceDelta(sample.distance, wrappedExpected, line.totalDistance);
    if (progressDelta < -12 || progressDelta > searchMeters) continue;
    const positionDistance = position.distanceToSquared(sample.position);
    const score = positionDistance + Math.abs(progressDelta) * 0.12;
    if (score < bestScore) {
      bestScore = score;
      bestProgress = sample.distance;
    }
  }
  return bestProgress;
}

function getWrappedDistanceDelta(progress, reference, totalDistance) {
  let delta = progress - reference;
  if (delta > totalDistance * 0.5) delta -= totalDistance;
  if (delta < -totalDistance * 0.5) delta += totalDistance;
  return delta;
}

function getCyborgTrackTarget(targetPosition, carPosition, startIndex = 0, learnedHeading = null) {
  const targetIndex = getNearestAiSampleIndex(targetPosition, track.samples, startIndex);
  const targetTrack = getAiTrackEdgeState(targetPosition, track.samples, targetIndex);
  const laneOffset = targetPosition.clone().sub(targetTrack.center).dot(targetTrack.normal);
  const currentIndex = getNearestAiSampleIndex(carPosition, track.samples, startIndex);
  return {
    position: targetPosition.clone(),
    heading: targetTrack.heading,
    learnedHeading,
    currentTrack: getAiTrackEdgeState(carPosition, track.samples, currentIndex),
    laneOffset,
    learnedHeadingBlend: 0.985,
    pointBlendOverride: 0.005,
    steerGainOverride: 0.52,
    steerDampOverride: 3,
  };
}

function getCyborgLinePose(line, progress, laneOffset = 0) {
  const samples = line?.samples ?? [];
  if (!samples.length || !line.totalDistance) {
    return { position: new THREE.Vector3(), heading: 0, speed: 0, throttle: 0, brake: 0, steer: 0, index: 0 };
  }
  const wrapped = ((progress % line.totalDistance) + line.totalDistance) % line.totalDistance;
  let lowerIndex = 0;
  for (let i = 0; i < samples.length; i += 1) {
    const current = samples[i];
    const next = samples[(i + 1) % samples.length];
    const nextDistance = i === samples.length - 1 ? line.totalDistance : next.distance;
    if (wrapped >= current.distance && wrapped <= nextDistance) {
      lowerIndex = i;
      break;
    }
  }

  const lower = samples[lowerIndex];
  const upper = samples[(lowerIndex + 1) % samples.length];
  const upperDistance = lowerIndex === samples.length - 1 ? line.totalDistance : upper.distance;
  const segmentLength = Math.max(0.001, upperDistance - lower.distance);
  const blend = THREE.MathUtils.clamp((wrapped - lower.distance) / segmentLength, 0, 1);
  const position = lower.position.clone().lerp(upper.position, blend);
  const heading = angleLerp(lower.heading, upper.heading, blend);
  const normal = new THREE.Vector3(Math.cos(heading), 0, -Math.sin(heading));
  position.addScaledVector(normal, laneOffset);
  position.y = track.groundY;
  return {
    position,
    heading,
    speed: THREE.MathUtils.lerp(lower.speed, upper.speed, blend),
    throttle: THREE.MathUtils.lerp(lower.throttle, upper.throttle, blend),
    brake: THREE.MathUtils.lerp(lower.brake, upper.brake, blend),
    steer: THREE.MathUtils.lerp(lower.steer, upper.steer, blend),
    index: lowerIndex,
  };
}

function getQuickRaceAiCarIds() {
  const playerKind = getCarProfile().kind;
  const pool = quickRaceAiCarPools[playerKind] ?? quickRaceAiCarPools.formula;
  const withoutPlayer = pool.filter((carId) => carId !== selectedCar);
  return withoutPlayer.length ? withoutPlayer : pool;
}

function getAiGridPositions(count) {
  const positions = [];
  const totalGridCars = count + 1;
  for (let position = 1; position <= totalGridCars; position += 1) {
    if (position !== selectedGridPosition) positions.push(position);
  }
  return positions;
}

function clearAiRacingLineDebug() {
  if (!aiRacingLineDebug) return;
  scene.remove(aiRacingLineDebug);
  aiRacingLineDebug.geometry?.dispose();
  aiRacingLineDebug.material?.dispose();
  aiRacingLineDebug = null;
}

function renderAiRacingLineDebug() {
  clearAiRacingLineDebug();
  if (selectedGameMode !== "quick-race" || !aiOpponents.length || !track.samples?.length) return;

  const positions = [];
  const colors = [];
  if (aiOpponents.some((opponent) => opponent.aiModel === AI_CYBORG_MODEL_NAME)) {
    renderCyborgRacingLineDebug(positions, colors);
  } else {
    renderCodexRacingLineDebug(positions, colors);
  }

  if (!positions.length) return;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
  });
  aiRacingLineDebug = new THREE.LineSegments(geometry, material);
  aiRacingLineDebug.renderOrder = 30;
  scene.add(aiRacingLineDebug);
}

function renderCodexRacingLineDebug(positions, colors) {
  const samples = track.samples;
  const sampleStep = 4;
  const color = new THREE.Color();
  const maxLines = Math.min(aiOpponents.length, 5);
  for (let opponentIndex = 0; opponentIndex < maxLines; opponentIndex += 1) {
    const opponent = aiOpponents[opponentIndex];
    const profile = opponent.profile ?? getCarProfileById(opponent.carId);
    const lineYOffset = 0.42 + opponentIndex * 0.025;
    const virtualOpponent = {
      ...opponent,
      position: null,
      speed: profile.maxForwardSpeed * (opponent.pace ?? 1) * 0.72,
    };
    for (let i = 0; i < samples.length; i += sampleStep) {
      const nextIndex = (i + sampleStep) % samples.length;
      const currentOffset = getAiRacingLineOffset(i, samples, virtualOpponent, null);
      const nextOffset = getAiRacingLineOffset(nextIndex, samples, virtualOpponent, null);
      const currentPose = getAiPathPose(i, samples, currentOffset);
      const nextPose = getAiPathPose(nextIndex, samples, nextOffset);
      currentPose.position.y = lineYOffset;
      nextPose.position.y = lineYOffset;
      const intent = getAiRacingIntent(virtualOpponent, i, samples, profile);
      const intentColor = getAiDebugIntentColor(intent, color);
      positions.push(
        currentPose.position.x, currentPose.position.y, currentPose.position.z,
        nextPose.position.x, nextPose.position.y, nextPose.position.z,
      );
      colors.push(
        intentColor.r, intentColor.g, intentColor.b,
        intentColor.r, intentColor.g, intentColor.b,
      );
    }
  }
}

function renderCyborgRacingLineDebug(positions, colors) {
  const line = kataraStockCyborgLine;
  if (!line.samples.length) return;
  const sampleStep = 5;
  const color = new THREE.Color();
  for (let opponentIndex = 0; opponentIndex < Math.min(aiOpponents.length, 5); opponentIndex += 1) {
    const opponent = aiOpponents[opponentIndex];
    const lineYOffset = 0.42 + opponentIndex * 0.025;
    for (let i = 0; i < line.samples.length; i += sampleStep) {
      const current = line.samples[i];
      const next = line.samples[(i + sampleStep) % line.samples.length];
      const currentPose = getCyborgLinePose(line, current.distance, opponent.cyborg?.laneOffset ?? 0);
      const nextPose = getCyborgLinePose(line, next.distance, opponent.cyborg?.laneOffset ?? 0);
      currentPose.position.y = lineYOffset;
      nextPose.position.y = lineYOffset;
      const intentColor = getAiDebugIntentColor(current, color);
      positions.push(
        currentPose.position.x, currentPose.position.y, currentPose.position.z,
        nextPose.position.x, nextPose.position.y, nextPose.position.z,
      );
      colors.push(
        intentColor.r, intentColor.g, intentColor.b,
        intentColor.r, intentColor.g, intentColor.b,
      );
    }
  }
}

function getAiDebugIntentColor(intent, target = new THREE.Color()) {
  if (intent.brake > 0.72 && intent.throttle < 0.08) return target.setHex(0xff2d2d);
  if (intent.throttle > 0.92 && intent.brake < 0.08) return target.setHex(0x2cff66);
  if (intent.brake > intent.throttle) return target.setHex(0xff8a26);
  return target.setHex(0xffd34a);
}

function tuneAiCarLights(aiCar) {
  for (const light of aiCar.lights?.headlights ?? []) {
    light.visible = false;
    light.intensity = 0;
  }
  for (const mesh of aiCar.lights?.headlightMeshes ?? []) {
    if (mesh.material?.emissiveIntensity !== undefined) {
      mesh.material.emissiveIntensity = shouldDefaultHeadlightsOn() ? 0.9 : 0.12;
    }
  }
}

function resetAiOpponentsToGrid() {
  if (selectedGameMode !== "quick-race") {
    clearAiOpponents();
    return;
  }
  for (let i = 0; i < aiOpponents.length; i += 1) {
    const opponent = aiOpponents[i];
    const pose = getQuickRaceGridPose(opponent.gridPosition ?? i + 1);
    opponent.position.set(pose.position.x, track.groundY, pose.position.z);
    opponent.velocity ??= new THREE.Vector3();
    opponent.velocity.set(0, 0, 0);
    opponent.heading = pose.heading;
    opponent.yawRate = 0;
    opponent.speed = 0;
    opponent.steer = 0;
    opponent.throttle = 0;
    opponent.brake = 0;
    opponent.stuckTimer = 0;
    opponent.recoveryTimer = 0;
    opponent.wheelSpin = 0;
    opponent.sampleIndex = pose.sampleIndex;
    opponent.sampleProgress = pose.sampleIndex;
    opponent.gridOffset = pose.laneOffset;
    opponent.racingLineOffset = 0;
    if (opponent.aiModel === AI_CYBORG_MODEL_NAME) {
      opponent.cyborg = createCyborgOpponentState(pose, i);
    }
    opponent.car.root.position.copy(opponent.position);
    opponent.car.root.rotation.set(0, opponent.heading, 0);
  }
}

function updateAiOpponents(dt) {
  if (selectedGameMode !== "quick-race" || !aiOpponents.length || !track.samples?.length) return;
  const samples = track.samples;
  for (const opponent of aiOpponents) {
    if (opponent.aiModel === AI_CYBORG_MODEL_NAME && opponent.cyborg) {
      updateCyborgAiOpponent(opponent, dt);
      continue;
    }
    let nearestIndex = getNearestAiSampleIndex(opponent.position, samples, opponent.sampleIndex ?? 0);
    updateAiLapDebug(opponent, nearestIndex, samples.length);
    opponent.sampleIndex = nearestIndex;
    opponent.sampleProgress = nearestIndex;

    const profile = opponent.profile ?? getCarProfileById(opponent.carId);
    const racing = getAiRacingIntent(opponent, nearestIndex, samples, profile);
    opponent.throttle = THREE.MathUtils.damp(opponent.throttle, racing.throttle, 4.2, dt);
    opponent.brake = THREE.MathUtils.damp(opponent.brake, racing.brake, 6.2, dt);

    const cornerAccelPenalty = 1 - racing.cornerSeverity * 0.14;
    const acceleration = profile.engineForce * 1.42 * opponent.throttle * cornerAccelPenalty;
    const braking = profile.brakeForce * 0.9 * opponent.brake;
    const drag = opponent.speed * opponent.speed * 0.0048 + 0.34;
    opponent.speed += (acceleration - braking - drag) * dt;
    opponent.speed = THREE.MathUtils.clamp(opponent.speed, 0, racing.maxSpeed);
    opponent.speed = THREE.MathUtils.damp(opponent.speed, Math.min(opponent.speed, racing.targetSpeed), racing.brake > 0.6 ? 3.4 : 0.08, dt);

    const targetProgress = (nearestIndex + racing.lookahead) % samples.length;
    const currentSurface = track.sample(opponent.position.x, opponent.position.z);
    const offTrackRecovery = currentSurface.kind === "grass";
    if (offTrackRecovery) opponent.recoveryTimer = Math.max(opponent.recoveryTimer ?? 0, 1.35);
    opponent.recoveryTimer = Math.max(0, (opponent.recoveryTimer ?? 0) - dt);

    const racingLineOffset = opponent.recoveryTimer > 0 ? 0 : getAiRacingLineOffset(targetProgress, samples, opponent, nearestIndex);
    const previousLineOffset = opponent.racingLineOffset ?? 0;
    const smoothedLineOffset = THREE.MathUtils.damp(previousLineOffset, racingLineOffset, AI_SAFE_LINE_TUNING ? 1.15 : 4.1, dt);
    const maxLineShift = (AI_SAFE_LINE_TUNING ? 2.2 : 7.5) * dt;
    opponent.racingLineOffset = THREE.MathUtils.clamp(smoothedLineOffset, previousLineOffset - maxLineShift, previousLineOffset + maxLineShift);
    const pathPose = getAiPathPose(
      targetProgress,
      samples,
      opponent.recoveryTimer > 0 ? 0 : (opponent.gridOffset ?? 0) + (opponent.racingLineOffset ?? 0),
    );
    pathPose.currentTrack = getAiTrackEdgeState(opponent.position, samples, nearestIndex);
    opponent.gridOffset = THREE.MathUtils.damp(opponent.gridOffset ?? 0, 0, 1.15, dt);
    keepAiTargetOnTrack(opponent, pathPose, samples, targetProgress, racing);
    applyAiRecoveryAndAvoidance(opponent, pathPose, racing, currentSurface);
    updateAiDrivenCar(opponent, pathPose, racing, profile, dt);
    opponent.car.root.position.copy(opponent.position);
    opponent.car.root.rotation.set(0, opponent.heading, 0);
    opponent.car.body.rotation.z = -opponent.steer * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.18;
    opponent.car.body.rotation.x = opponent.brake * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.035;
    opponent.wheelSpin -= opponent.speed * dt * 1.25;
    for (const wheel of Object.values(opponent.car.wheels)) {
      if (!wheel) continue;
      wheel.rotation.x = opponent.wheelSpin;
    }
    if (opponent.car.wheels.frontLeft) opponent.car.wheels.frontLeft.rotation.y = opponent.steer;
    if (opponent.car.wheels.frontRight) opponent.car.wheels.frontRight.rotation.y = opponent.steer;
    for (const mesh of opponent.car.lights?.brakeLights ?? []) {
      mesh.material.emissiveIntensity = opponent.brake > 0.2 ? 1.2 : 0.2;
      mesh.scale.y = opponent.brake > 0.2 ? 1.14 : 1;
    }
  }
  updateAiDebugStats();
}

function updateCyborgAiOpponent(opponent, dt) {
  const cyborg = opponent.cyborg;
  const line = cyborg.line;
  if (!line?.samples?.length || !line.totalDistance) return;

  const previousProgress = cyborg.progress;
  const profile = opponent.profile ?? getCarProfileById(opponent.carId);
  const expectedProgress = cyborg.progress + Math.max(3, opponent.speed) * dt;
  cyborg.progress = getNearestCyborgProgressNear(line, opponent.position, expectedProgress, 46);
  const learnedPose = getCyborgLinePose(line, cyborg.progress, cyborg.laneOffset);
  const currentTrack = getAiTrackEdgeState(opponent.position, track.samples, opponent.sampleIndex ?? 0);
  const learnedTrack = getAiTrackEdgeState(learnedPose.position, track.samples, opponent.sampleIndex ?? 0);
  const learnedLaneOffset = learnedPose.position.clone().sub(learnedTrack.center).dot(learnedTrack.normal);
  const laneError = learnedLaneOffset - currentTrack.offset;
  const laneDeadzone = 0.1;
  const laneCorrection = Math.abs(laneError) <= laneDeadzone
    ? 0
    : Math.sign(laneError) * Math.min(Math.abs(laneError) - laneDeadzone, 7);
  const maxHeadingBias = 0.16;
  const laneHeadingBias = THREE.MathUtils.clamp(laneCorrection * 0.024, -maxHeadingBias, maxHeadingBias);
  cyborg.headingBias = THREE.MathUtils.damp(cyborg.headingBias ?? 0, laneHeadingBias, 2.2, dt);
  const speedLookaheadDistance = THREE.MathUtils.clamp(opponent.speed * 0.82 + 18, 24, 56);
  cyborg.targetProgress = cyborg.progress + speedLookaheadDistance;
  const lookPose = getCyborgLinePose(line, cyborg.targetProgress, cyborg.laneOffset);
  const headingLookaheadDistance = speedLookaheadDistance * 0.125;
  const headingPose = getCyborgLinePose(line, cyborg.progress + headingLookaheadDistance, cyborg.laneOffset);
  const learnedTargetHeading = headingPose.heading + (cyborg.headingBias ?? 0);
  const steeringReferenceDistance = THREE.MathUtils.clamp(opponent.speed * 0.08 + 4, 4, 8);
  const forwardTarget = opponent.position
    .clone()
    .add(new THREE.Vector3(Math.sin(learnedTargetHeading), 0, Math.cos(learnedTargetHeading)).multiplyScalar(steeringReferenceDistance));
  const trackTarget = getCyborgTrackTarget(forwardTarget, opponent.position, opponent.sampleIndex ?? 0, learnedTargetHeading);
  const targetSpeed = Math.max(9, lookPose.speed * (opponent.pace ?? 1));
  const speedError = opponent.speed - targetSpeed;
  const learnedBrake = Math.max(lookPose.brake, learnedPose.brake);
  const brake = speedError > 2
    ? THREE.MathUtils.clamp(speedError / Math.max(5, profile.brakeForce * 0.22), 0.15, 1)
    : learnedBrake > 0.2 && opponent.speed > targetSpeed * 0.92
      ? learnedBrake
      : 0;
  const throttle = brake > 0.08
    ? 0
    : THREE.MathUtils.clamp(Math.max(lookPose.throttle, (targetSpeed - opponent.speed) / 7), 0.22, 1);
  const racing = {
    lookahead: metersToAiSamples(speedLookaheadDistance),
    targetSpeed,
    maxSpeed: profile.maxForwardSpeed * Math.max(0.9, opponent.pace ?? 1),
    cornerSeverity: THREE.MathUtils.clamp(Math.abs(angleDifference(headingPose.heading, learnedPose.heading)) / 0.55, 0, 1),
    throttle,
    brake,
    allowOffTrack: true,
    ignoreWalls: true,
    ignoreEdgePressure: true,
  };
  opponent.throttle = THREE.MathUtils.damp(opponent.throttle, racing.throttle, 6.4, dt);
  opponent.brake = THREE.MathUtils.damp(opponent.brake, racing.brake, 8.2, dt);
  const currentSurface = track.sample(opponent.position.x, opponent.position.z);
  if (!racing.ignoreWalls) applyAiRecoveryAndAvoidance(opponent, trackTarget, racing, currentSurface);
  updateAiDrivenCar(opponent, trackTarget, racing, profile, dt);
  const nearestIndex = getNearestAiSampleIndex(opponent.position, track.samples, opponent.sampleIndex ?? 0);
  opponent.sampleIndex = nearestIndex;
  opponent.sampleProgress = nearestIndex;
  cyborg.progress = getNearestCyborgProgressNear(line, opponent.position, cyborg.progress + Math.max(1, opponent.speed) * dt, 54);
  const wrappedLap = previousProgress > line.totalDistance * 0.82 && cyborg.progress < line.totalDistance * 0.18;
  if (opponent.debug && wrappedLap) completeCyborgAiLap(opponent);
  if (wrappedLap) {
    cyborg.lapTime = 0;
    cyborg.lapDistance = 0;
  } else {
    cyborg.lapTime += dt;
    cyborg.lapDistance += opponent.speed * dt;
  }

  opponent.car.root.position.copy(opponent.position);
  opponent.car.root.rotation.set(0, opponent.heading, 0);
  opponent.car.body.rotation.z = -opponent.steer * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.14;
  opponent.car.body.rotation.x = opponent.brake * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.032;
  opponent.wheelSpin -= opponent.speed * dt * 1.25;
  for (const wheel of Object.values(opponent.car.wheels)) {
    if (!wheel) continue;
    wheel.rotation.x = opponent.wheelSpin;
  }
  if (opponent.car.wheels.frontLeft) opponent.car.wheels.frontLeft.rotation.y = opponent.steer;
  if (opponent.car.wheels.frontRight) opponent.car.wheels.frontRight.rotation.y = opponent.steer;
  for (const mesh of opponent.car.lights?.brakeLights ?? []) {
    mesh.material.emissiveIntensity = opponent.brake > 0.2 ? 1.2 : 0.2;
    mesh.scale.y = opponent.brake > 0.2 ? 1.14 : 1;
  }
}

function completeCyborgAiLap(opponent) {
  if (!opponent.debug) return;
  const cleanLap = opponent.debug.grassFrames === 0 && opponent.debug.wallCorrectionFrames === 0;
  opponent.debug.lastLapTime = opponent.debug.lapTime;
  opponent.debug.lastLapAverageMph = opponent.debug.lapTime > 0
    ? (opponent.debug.lapDistance / opponent.debug.lapTime) * 2.237
    : 0;
  opponent.debug.lastLapPredictiveAvoidance = opponent.debug.predictiveAvoidanceFrames;
  opponent.debug.lastLapWheelCorrections = opponent.debug.wheelCorrectionFrames;
  opponent.debug.lastLapWallCorrections = opponent.debug.wallCorrectionFrames;
  opponent.debug.laps += 1;
  opponent.debug.cleanLaps += cleanLap ? 1 : 0;
  opponent.debug.lastLapClean = cleanLap;
  opponent.debug.grassFrames = 0;
  opponent.debug.predictiveAvoidanceFrames = 0;
  opponent.debug.wheelCorrectionFrames = 0;
  opponent.debug.wallDangerFrames = 0;
  opponent.debug.wallCorrectionFrames = 0;
  opponent.debug.maxEdgeRatio = 0;
  opponent.debug.lapTime = 0;
  opponent.debug.lapDistance = 0;
}

function getNearestAiSampleIndex(position, samples, startIndex = 0) {
  let bestIndex = startIndex;
  let bestDistance = Infinity;
  const backwardSearch = 12;
  const forwardSearch = 90;
  for (let offset = -backwardSearch; offset <= forwardSearch; offset += 1) {
    const index = (startIndex + offset + samples.length) % samples.length;
    const dx = position.x - samples[index].x;
    const dz = position.z - samples[index].z;
    const distance = dx * dx + dz * dz;
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  }
  return bestIndex;
}

function applyAiRecoveryAndAvoidance(opponent, targetPose, racing, surface) {
  const desiredHeading = Math.atan2(targetPose.position.x - opponent.position.x, targetPose.position.z - opponent.position.z);
  const headingError = Math.abs(angleDifference(desiredHeading, opponent.heading));
  if (headingError > 1.65 && opponent.speed > 20) {
    const panic = THREE.MathUtils.smoothstep(headingError, 1.65, 2.75);
    racing.brake = Math.max(racing.brake, panic * 0.35);
    racing.throttle = Math.min(racing.throttle, headingError > 2.45 ? 0.45 : 0.72);
    racing.targetSpeed = Math.min(racing.targetSpeed, THREE.MathUtils.lerp(18, 11, panic));
  }

  const recovering = opponent.recoveryTimer > 0 || surface.kind === "grass";
  if (recovering) {
    racing.brake = Math.max(racing.brake, opponent.speed > 13 ? 0.55 : 0.15);
    racing.throttle = opponent.speed < 18 ? Math.max(racing.throttle, 0.68) : Math.min(racing.throttle, 0.35);
    racing.targetSpeed = Math.min(racing.targetSpeed, 18);
  }

  const wallAvoidance = getAiWallAvoidance(opponent);
  if (!wallAvoidance) return;
  opponent.debug.wallDangerFrames += 1;
  targetPose.position.addScaledVector(wallAvoidance.normal, wallAvoidance.intensity * 11);
  racing.brake = Math.max(racing.brake, wallAvoidance.intensity * 0.85);
  racing.throttle *= 1 - wallAvoidance.intensity * 0.65;
  racing.targetSpeed = Math.min(racing.targetSpeed, THREE.MathUtils.lerp(18, 7, wallAvoidance.intensity));
}

function getAiWallAvoidance(opponent) {
  if (!track.obstacles?.length) return null;
  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const probeDistance = THREE.MathUtils.clamp(opponent.speed * 0.82 + 10, 12, 36);
  const probes = [
    opponent.position.clone().addScaledVector(forward, probeDistance),
    opponent.position.clone().addScaledVector(forward, probeDistance * 0.72).addScaledVector(right, 1.7),
    opponent.position.clone().addScaledVector(forward, probeDistance * 0.72).addScaledVector(right, -1.7),
  ];
  let best = null;
  for (const obstacle of track.obstacles) {
    if (obstacle.kind !== "wall") continue;
    for (const probe of probes) {
      const closest = closestPointOnSegmentVector(probe, obstacle.a, obstacle.b);
      const away = probe.clone().sub(closest);
      const distance = away.length();
      const dangerDistance = 6.8 + (obstacle.halfWidth ?? 0.45);
      if (distance > dangerDistance) continue;
      if (distance < 0.001) {
        const wallDirection = obstacle.b.clone().sub(obstacle.a).normalize();
        away.set(wallDirection.z, 0, -wallDirection.x);
      } else {
        away.multiplyScalar(1 / distance);
      }
      const intensity = THREE.MathUtils.clamp(1 - distance / dangerDistance, 0, 1);
      if (!best || intensity > best.intensity) best = { normal: away, intensity };
    }
  }
  return best;
}

function updateAiDrivenCar(opponent, targetPose, racing, profile, dt) {
  opponent.velocity ??= new THREE.Vector3();
  const toTarget = targetPose.position.clone().sub(opponent.position);
  const pointHeading = Math.atan2(toTarget.x, toTarget.z);
  const currentTrack = targetPose.currentTrack;
  const lateralError = currentTrack
    ? currentTrack.offset - (targetPose.laneOffset ?? 0)
    : 0;
  const edgePressure = currentTrack && !racing.ignoreEdgePressure
    ? THREE.MathUtils.smoothstep(Math.abs(currentTrack.offset), currentTrack.halfWidth - AI_HALF_WIDTH - 1.35, currentTrack.halfWidth - AI_HALF_WIDTH - 0.1)
    : 0;
  if (currentTrack) {
    opponent.debug.maxEdgeRatio = Math.max(opponent.debug.maxEdgeRatio, Math.abs(currentTrack.offset) / Math.max(currentTrack.halfWidth, 0.001));
  }
  const edgePush = currentTrack ? Math.sign(currentTrack.offset) * edgePressure * 0.42 : 0;
  const corridorHeading = currentTrack?.heading ?? targetPose.heading;
  const correctionHeading = corridorHeading - THREE.MathUtils.clamp(lateralError * 0.07 + edgePush, -0.62, 0.62);
  const pointBlend = targetPose.pointBlendOverride ?? (
    AI_SAFE_LINE_TUNING
      ? THREE.MathUtils.lerp(0.2, 0.08, edgePressure)
      : 0.72
  );
  const pointGuidedHeading = angleLerp(correctionHeading, pointHeading, pointBlend);
  const desiredHeading = Number.isFinite(targetPose.learnedHeading)
    ? angleLerp(pointGuidedHeading, targetPose.learnedHeading, targetPose.learnedHeadingBlend ?? 0.65)
    : pointGuidedHeading;
  const turnError = angleDifference(desiredHeading, opponent.heading);
  const speed = opponent.velocity.length();
  const aiLowSpeedSteer = profile.maxSteerLowSpeed * 1.22;
  const aiHighSpeedSteer = profile.maxSteerHighSpeed * 1.38;
  const maxSteer = THREE.MathUtils.lerp(
    aiLowSpeedSteer,
    aiHighSpeedSteer,
    THREE.MathUtils.smoothstep(speed, 8, 52),
  ) * THREE.MathUtils.lerp(1, 0.9, THREE.MathUtils.smoothstep(speed, 34, 70));
  const steerGain = targetPose.steerGainOverride ?? 1.12;
  const steerDamp = targetPose.steerDampOverride ?? 9.5;
  opponent.steer = THREE.MathUtils.damp(opponent.steer, THREE.MathUtils.clamp(turnError * steerGain, -maxSteer, maxSteer), steerDamp, dt);

  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  let forwardSpeed = opponent.velocity.dot(forward);
  let lateralSpeed = opponent.velocity.dot(right);
  const surface = track.sample(opponent.position.x, opponent.position.z);
  const currentWheelGrassCount = getAiWheelGrassCount(opponent);
  const offTrackScale = surface.kind === "grass" ? 0.46 : surface.kind === "kerb" || surface.kind === "sausage" ? 0.74 : 1;
  const steeringLoad = Math.abs(opponent.steer) / Math.max(maxSteer, 0.001);
  const cornerAccelPenalty = 1 - racing.cornerSeverity * 0.35 - steeringLoad * 0.16;
  if (edgePressure > 0.05) {
    opponent.throttle = Math.min(opponent.throttle, THREE.MathUtils.lerp(0.88, 0.42, edgePressure));
    opponent.brake = Math.max(opponent.brake, THREE.MathUtils.lerp(0.03, 0.22, edgePressure));
  }
  if (currentWheelGrassCount > 0) {
    const wheelRisk = currentWheelGrassCount / 4;
    opponent.throttle = Math.min(opponent.throttle, THREE.MathUtils.lerp(0.62, 0.2, wheelRisk));
    opponent.brake = Math.max(opponent.brake, THREE.MathUtils.lerp(0.16, 0.42, wheelRisk));
  }

  if (opponent.throttle > 0) {
    const powerFade = 1 - THREE.MathUtils.clamp(forwardSpeed / racing.maxSpeed, 0, 1);
    forwardSpeed += profile.engineForce * 1.45 * offTrackScale * opponent.throttle * Math.max(0.5, cornerAccelPenalty) * (0.45 + powerFade * 0.55) * dt;
  }
  if (opponent.brake > 0) {
    forwardSpeed = moveToward(forwardSpeed, 0, profile.brakeForce * 0.92 * opponent.brake * dt);
  }

  const grip = (surface.kind === "grass" ? profile.grassGrip : profile.baseGrip) * (1 + speed * speed * profile.downforce);
  lateralSpeed = THREE.MathUtils.damp(lateralSpeed, 0, grip, dt);
  forwardSpeed -= forwardSpeed * Math.abs(forwardSpeed) * 0.0034 * dt;
  forwardSpeed = moveToward(forwardSpeed, 0, 0.55 * dt);
  forwardSpeed = THREE.MathUtils.clamp(forwardSpeed, 0, racing.maxSpeed);

  const yawTarget = forwardSpeed * Math.tan(opponent.steer) / Math.max(2.5, profile.wheelbase);
  opponent.yawRate = THREE.MathUtils.damp(opponent.yawRate ?? 0, yawTarget, profile.yawResponse * 1.75, dt);
  opponent.yawRate = THREE.MathUtils.damp(opponent.yawRate, 0, profile.yawDamping * 0.11, dt);
  opponent.heading += opponent.yawRate * dt;

  forward.set(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  right.set(forward.z, 0, -forward.x);
  opponent.velocity.copy(forward).multiplyScalar(forwardSpeed).addScaledVector(right, lateralSpeed);
  const predictedPosition = opponent.position.clone().addScaledVector(opponent.velocity, dt);
  const predictedWheelGrassCount = getAiWheelGrassCountAt(opponent, predictedPosition, opponent.heading);
  if (!racing.allowOffTrack && predictedWheelGrassCount > 0) {
    const predictedRisk = predictedWheelGrassCount / 4;
    opponent.velocity.multiplyScalar(THREE.MathUtils.lerp(0.78, 0.42, predictedRisk));
    opponent.yawRate *= THREE.MathUtils.lerp(0.82, 0.45, predictedRisk);
    opponent.brake = Math.max(opponent.brake, THREE.MathUtils.lerp(0.18, 0.5, predictedRisk));
    opponent.throttle = Math.min(opponent.throttle, THREE.MathUtils.lerp(0.42, 0.12, predictedRisk));
    opponent.debug.predictiveAvoidanceFrames += 1;
  }
  opponent.position.addScaledVector(opponent.velocity, dt);
  if (!racing.allowOffTrack) {
    keepAiCarInsideTrack(opponent, track.samples);
    keepAiWheelsInsideTrack(opponent);
  }
  if (!racing.ignoreWalls) resolveAiWallSafety(opponent);
  const wheelGrassCount = getAiWheelGrassCount(opponent);
  if (wheelGrassCount > 0) {
    opponent.debug.grassFrames += 1;
    opponent.recoveryTimer = Math.max(opponent.recoveryTimer ?? 0, wheelGrassCount >= 2 ? 1.1 : 0.45);
    opponent.velocity.multiplyScalar(THREE.MathUtils.lerp(0.92, 0.72, wheelGrassCount / 4));
  }
  opponent.position.y = track.groundY;
  opponent.speed = opponent.velocity.length();
  opponent.debug.lapTime += dt;
  opponent.debug.lapDistance += opponent.speed * dt;

  const movingPoorly = opponent.speed < 1.4 && opponent.throttle > 0.45;
  opponent.stuckTimer = movingPoorly ? (opponent.stuckTimer ?? 0) + dt : Math.max(0, (opponent.stuckTimer ?? 0) - dt * 2);
  if (opponent.stuckTimer > 1.4) {
    opponent.heading = desiredHeading;
    opponent.yawRate = 0;
    opponent.velocity.copy(new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading))).multiplyScalar(3.2);
    opponent.speed = 3.2;
    opponent.stuckTimer = 0.35;
  }
}

function updateAiDebugStats() {
  if (typeof window === "undefined") return;
  window.paddockAiDebug = aiOpponents.map((opponent, index) => ({
    index,
    model: opponent.aiModel ?? AI_DRIVER_MODEL_NAME,
    carId: opponent.carId,
    speed: Number((opponent.speed ?? 0).toFixed(1)),
    pace: Number((opponent.pace ?? 1).toFixed(3)),
    grassFrames: opponent.debug?.grassFrames ?? 0,
    predictiveAvoidanceFrames: opponent.debug?.predictiveAvoidanceFrames ?? 0,
    wheelCorrectionFrames: opponent.debug?.wheelCorrectionFrames ?? 0,
    wallDangerFrames: opponent.debug?.wallDangerFrames ?? 0,
    wallCorrectionFrames: opponent.debug?.wallCorrectionFrames ?? 0,
    maxEdgeRatio: Number((opponent.debug?.maxEdgeRatio ?? 0).toFixed(3)),
    wheelGrassCount: getAiWheelGrassCount(opponent),
    lapTime: Number((opponent.debug?.lapTime ?? 0).toFixed(1)),
    lastLapTime: opponent.debug?.lastLapTime === null ? null : Number(opponent.debug.lastLapTime.toFixed(1)),
    lastLapAverageMph: opponent.debug?.lastLapAverageMph === null ? null : Number(opponent.debug.lastLapAverageMph.toFixed(1)),
    lastLapPredictiveAvoidance: opponent.debug?.lastLapPredictiveAvoidance ?? 0,
    lastLapWheelCorrections: opponent.debug?.lastLapWheelCorrections ?? 0,
    lastLapWallCorrections: opponent.debug?.lastLapWallCorrections ?? 0,
    lastLapCorrectionLoad: getAiLastLapCorrectionLoad(opponent),
    paceAdjustments: opponent.debug?.paceAdjustments ?? 0,
    laps: opponent.debug?.laps ?? 0,
    cleanLaps: opponent.debug?.cleanLaps ?? 0,
    lastLapClean: opponent.debug?.lastLapClean ?? false,
    sampleIndex: opponent.sampleIndex ?? 0,
  }));
  const averageLastLapMph = getAiAverageLastLapMph();
  const allHaveLapEvidence = aiOpponents.length > 0 && aiOpponents.every((opponent) => (opponent.debug?.laps ?? 0) > 0);
  const allHaveCleanLap = aiOpponents.length > 0 && aiOpponents.every((opponent) => (opponent.debug?.cleanLaps ?? 0) > 0);
  const allLatestLapsClean = aiOpponents.length > 0 && aiOpponents.every((opponent) => opponent.debug?.lastLapClean);
  const allLatestLapsStable = aiOpponents.length > 0 && aiOpponents.every((opponent) => getAiLastLapCorrectionLoad(opponent) <= AI_STABLE_CORRECTION_LOAD);
  const speedEvidenceGood = averageLastLapMph !== null && averageLastLapMph >= AI_REASONABLE_AVERAGE_MPH;
  const activeModelName = aiOpponents.every((opponent) => opponent.aiModel === AI_CYBORG_MODEL_NAME)
    ? AI_CYBORG_MODEL_NAME
    : AI_CODEX_MODEL_NAME;
  window.paddockAiDebugSummary = {
    model: activeModelName,
    allCleanLatestLap: allLatestLapsClean,
    allHaveCleanLap,
    allHaveLapEvidence,
    allLatestLapsStable,
    speedEvidenceGood,
    reasonableAverageMphTarget: AI_REASONABLE_AVERAGE_MPH,
    stableCorrectionLoadTarget: AI_STABLE_CORRECTION_LOAD,
    totalCleanLaps: aiOpponents.reduce((sum, opponent) => sum + (opponent.debug?.cleanLaps ?? 0), 0),
    totalGrassFrames: aiOpponents.reduce((sum, opponent) => sum + (opponent.debug?.grassFrames ?? 0), 0),
    totalPredictiveAvoidance: aiOpponents.reduce((sum, opponent) => sum + (opponent.debug?.predictiveAvoidanceFrames ?? 0), 0),
    totalWheelCorrections: aiOpponents.reduce((sum, opponent) => sum + (opponent.debug?.wheelCorrectionFrames ?? 0), 0),
    totalWallCorrections: aiOpponents.reduce((sum, opponent) => sum + (opponent.debug?.wallCorrectionFrames ?? 0), 0),
    averageLastLapMph,
    averagePace: getAiAveragePace(),
    goalReadyForReview: allHaveLapEvidence && allHaveCleanLap && allLatestLapsClean && allLatestLapsStable && speedEvidenceGood,
  };
  updateAiDebugPanel(window.paddockAiDebugSummary);
}

function updateAiDebugPanel(summary) {
  if (!aiDebugPanelEl || !aiDebugStatusEl || !aiDebugDetailEl) return;
  const shouldShow = selectedGameMode === "quick-race" && gameStarted && !isMenuOpen() && aiOpponents.length > 0;
  aiDebugPanelEl.hidden = !shouldShow;
  if (!shouldShow) return;

  aiDebugPanelEl.classList.toggle("is-ready", !!summary?.goalReadyForReview);
  aiDebugPanelEl.classList.toggle("is-warning", !!summary && !summary.goalReadyForReview);
  if (!summary?.allHaveLapEvidence) {
    aiDebugStatusEl.textContent = "Collecting lap data";
  } else if (summary.goalReadyForReview) {
    aiDebugStatusEl.textContent = "Clean, stable, fast";
  } else if (!summary.allCleanLatestLap || !summary.allHaveCleanLap) {
    aiDebugStatusEl.textContent = "Safety tuning active";
  } else if (!summary.allLatestLapsStable) {
    aiDebugStatusEl.textContent = "Stability tuning active";
  } else if (!summary.speedEvidenceGood) {
    aiDebugStatusEl.textContent = "Speed tuning active";
  } else {
    aiDebugStatusEl.textContent = "Reviewing AI";
  }

  const averageMph = summary?.averageLastLapMph ?? "--";
  const cleanLaps = summary?.totalCleanLaps ?? 0;
  const correctionLoad = Math.round((summary?.totalPredictiveAvoidance ?? 0) + (summary?.totalWheelCorrections ?? 0) + (summary?.totalWallCorrections ?? 0));
  aiDebugDetailEl.textContent = `${summary?.model ?? AI_DRIVER_MODEL_NAME} | Clean laps: ${cleanLaps} | Avg mph: ${averageMph} | Saves: ${correctionLoad}`;
}

function updateAiLapDebug(opponent, nearestIndex, sampleCount) {
  if (!opponent.debug || !sampleCount) return;
  const lastIndex = opponent.debug.lastSampleIndex ?? nearestIndex;
  if (lastIndex > sampleCount * 0.78 && nearestIndex < sampleCount * 0.22) {
    const cleanLap = opponent.debug.grassFrames === 0 && opponent.debug.wallCorrectionFrames === 0;
    opponent.debug.lastLapTime = opponent.debug.lapTime;
    opponent.debug.lastLapAverageMph = opponent.debug.lapTime > 0
      ? (opponent.debug.lapDistance / opponent.debug.lapTime) * 2.237
      : 0;
    opponent.debug.lastLapPredictiveAvoidance = opponent.debug.predictiveAvoidanceFrames;
    opponent.debug.lastLapWheelCorrections = opponent.debug.wheelCorrectionFrames;
    opponent.debug.lastLapWallCorrections = opponent.debug.wallCorrectionFrames;
    opponent.debug.laps += 1;
    opponent.debug.cleanLaps += cleanLap ? 1 : 0;
    opponent.debug.lastLapClean = cleanLap;
    tuneAiPaceAfterLap(opponent, cleanLap);
    opponent.debug.grassFrames = 0;
    opponent.debug.predictiveAvoidanceFrames = 0;
    opponent.debug.wheelCorrectionFrames = 0;
    opponent.debug.wallDangerFrames = 0;
    opponent.debug.wallCorrectionFrames = 0;
    opponent.debug.maxEdgeRatio = 0;
    opponent.debug.lapTime = 0;
    opponent.debug.lapDistance = 0;
  }
  opponent.debug.lastSampleIndex = nearestIndex;
}

function tuneAiPaceAfterLap(opponent, cleanLap) {
  const lapMph = opponent.debug.lastLapAverageMph ?? 0;
  const correctionLoad = getAiLastLapCorrectionLoad(opponent);
  const previousPace = opponent.pace ?? 1;
  let nextPace = previousPace;
  if (!cleanLap) {
    nextPace -= 0.035;
  } else if (correctionLoad > 18) {
    nextPace -= 0.018;
  } else if (correctionLoad > 8) {
    nextPace += lapMph < AI_REASONABLE_AVERAGE_MPH ? 0.012 : 0;
  } else if (lapMph < AI_REASONABLE_AVERAGE_MPH) {
    nextPace += 0.045;
  } else {
    nextPace += 0.012;
  }
  opponent.pace = THREE.MathUtils.clamp(nextPace, AI_MIN_PACE, AI_MAX_PACE);
  if (Math.abs(opponent.pace - previousPace) > 0.0001) opponent.debug.paceAdjustments += 1;
}

function getAiLastLapCorrectionLoad(opponent) {
  return Number((
    (opponent.debug?.lastLapPredictiveAvoidance ?? 0) * 0.25 +
    (opponent.debug?.lastLapWheelCorrections ?? 0) * 1.2 +
    (opponent.debug?.lastLapWallCorrections ?? 0) * 2
  ).toFixed(2));
}

function getAiAverageLastLapMph() {
  const speeds = aiOpponents
    .map((opponent) => opponent.debug?.lastLapAverageMph)
    .filter((speed) => Number.isFinite(speed));
  if (!speeds.length) return null;
  return Number((speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length).toFixed(1));
}

function getAiAveragePace() {
  if (!aiOpponents.length) return null;
  return Number((aiOpponents.reduce((sum, opponent) => sum + (opponent.pace ?? 1), 0) / aiOpponents.length).toFixed(3));
}

function getAiRacingLineOffset(progress, samples, opponent = null, currentIndex = null) {
  const length = samples.length;
  const index = Math.floor(((progress % length) + length) % length);
  const width = track.widthProfile?.[index] ?? 7.2;
  const usableWidth = Math.max(0, width - 3.25);
  const currentHeading = getSampleHeading(samples, index);
  const entryHeading = getSampleHeading(samples, index + 16);
  const apexHeading = getSampleHeading(samples, index + 46);
  const exitHeading = getSampleHeading(samples, index + 84);
  const entryBend = angleDifference(entryHeading, currentHeading);
  const apexBend = angleDifference(apexHeading, entryHeading);
  const exitBend = angleDifference(exitHeading, apexHeading);
  const bendTotal = Math.abs(entryBend) + Math.abs(apexBend) + Math.abs(exitBend);
  const bendStrength = THREE.MathUtils.smoothstep(bendTotal, 0.12, 0.95);
  if (AI_SAFE_LINE_TUNING) {
    const bendDirection = Math.sign(entryBend + apexBend * 1.25 + exitBend * 0.55) || 1;
    const bias = opponent?.lineBias ?? 0;
    const safeOutsideOffset = -bendDirection * usableWidth * 0.08 * bendStrength;
    return safeOutsideOffset + bias * usableWidth * 0.06;
  }
  if (bendStrength < 0.025) return (opponent?.lineBias ?? 0) * usableWidth * 0.18;

  const bendDirection = Math.sign(entryBend + apexBend * 1.25 + exitBend * 0.55) || 1;
  const phase = THREE.MathUtils.clamp(Math.abs(entryBend) / (bendTotal + 0.001), 0, 1);
  const aggression = (opponent?.lineAggression ?? 1) * 0.48;
  const bias = opponent?.lineBias ?? 0;
  const entryOffset = -bendDirection * usableWidth * 0.46;
  const apexOffset = bendDirection * usableWidth * 0.08;
  const exitOffset = -bendDirection * usableWidth * 0.28;
  const apexBlend = THREE.MathUtils.smoothstep(phase, 0.34, 0.94);
  const exitBlend = THREE.MathUtils.smoothstep(Math.abs(exitBend), 0.02, 0.24);
  const cornerOffset = THREE.MathUtils.lerp(entryOffset, apexOffset, apexBlend);
  let lineOffset = THREE.MathUtils.lerp(cornerOffset, exitOffset, exitBlend * 0.52) * bendStrength * aggression;

  if (currentIndex !== null && opponent?.position) {
    const edgeState = getAiTrackEdgeState(opponent.position, samples, currentIndex);
    const movingInside = Math.sign(lineOffset || bendDirection) === bendDirection;
    if (edgeState && movingInside && Math.abs(edgeState.offset) > edgeState.halfWidth * 0.34 && Math.sign(edgeState.offset) === bendDirection) {
      const edgePressure = THREE.MathUtils.smoothstep(Math.abs(edgeState.offset) / edgeState.halfWidth, 0.34, 0.72);
      lineOffset = THREE.MathUtils.lerp(lineOffset, -bendDirection * usableWidth * 0.42, edgePressure);
    }
  }

  return lineOffset + bias * usableWidth * 0.1;
}

function getAiTrackEdgeState(position, samples, index) {
  const safeIndex = ((index % samples.length) + samples.length) % samples.length;
  const previous = samples[(safeIndex - 1 + samples.length) % samples.length];
  const next = samples[(safeIndex + 1) % samples.length];
  const tangent = next.clone().sub(previous).setY(0).normalize();
  const normal = new THREE.Vector3(tangent.z, 0, -tangent.x);
  const center = samples[safeIndex];
  return {
    offset: position.clone().sub(center).dot(normal),
    halfWidth: track.widthProfile?.[safeIndex] ?? 7.2,
    center,
    normal,
    heading: Math.atan2(tangent.x, tangent.z),
  };
}

function keepAiCarInsideTrack(opponent, samples) {
  if (!samples?.length) return;
  const edgeIndex = getNearestAiSampleIndex(opponent.position, samples, opponent.sampleIndex ?? 0);
  opponent.sampleIndex = edgeIndex;
  opponent.sampleProgress = edgeIndex;
  const edgeState = getAiTrackEdgeState(opponent.position, samples, edgeIndex);
  if (!edgeState?.center || !edgeState?.normal) return;
  const offset = opponent.position.clone().sub(edgeState.center).dot(edgeState.normal);
  const safeHalfWidth = Math.max(1.5, edgeState.halfWidth - AI_HALF_WIDTH - AI_ROAD_MARGIN);
  if (Math.abs(offset) <= safeHalfWidth) return;

  const clampedOffset = Math.sign(offset) * safeHalfWidth;
  opponent.position.copy(edgeState.center).addScaledVector(edgeState.normal, clampedOffset);

  const tangent = new THREE.Vector3(Math.sin(edgeState.heading), 0, Math.cos(edgeState.heading));
  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  if (forward.dot(tangent) < 0) tangent.multiplyScalar(-1);
  const forwardSpeed = Math.max(0, opponent.velocity.dot(forward)) * 0.82;
  opponent.heading = angleLerp(opponent.heading, Math.atan2(tangent.x, tangent.z), 0.28);
  opponent.yawRate *= 0.55;
  opponent.velocity.copy(new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading))).multiplyScalar(forwardSpeed);
  opponent.speed = forwardSpeed;
}

function keepAiWheelsInsideTrack(opponent) {
  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const correction = new THREE.Vector3();
  let correctionCount = 0;

  for (const longitudinal of [AI_HALF_LENGTH, -AI_HALF_LENGTH]) {
    for (const lateral of [AI_HALF_WIDTH, -AI_HALF_WIDTH]) {
      const wheelPoint = opponent.position
        .clone()
        .addScaledVector(forward, longitudinal)
        .addScaledVector(right, lateral);
      const { edgeState, offset: wheelOffset } = getAiWheelTrackState(opponent, wheelPoint);
      const safeHalfWidth = Math.max(1.5, edgeState.halfWidth - AI_ROAD_MARGIN * 0.75);
      const excess = Math.abs(wheelOffset) - safeHalfWidth;
      if (excess <= 0) continue;
      correction.addScaledVector(edgeState.normal, -Math.sign(wheelOffset) * (excess + 0.08));
      correctionCount += 1;
    }
  }

  if (correctionCount <= 0) return;
  correction.multiplyScalar(1 / correctionCount);
  opponent.position.add(correction);
  opponent.velocity.multiplyScalar(0.86);
  opponent.yawRate *= 0.78;
  opponent.debug.wheelCorrectionFrames += 1;
}

function resolveAiWallSafety(opponent) {
  if (!track.obstacles?.length) return;
  const collisionRadius = AI_HALF_WIDTH + 0.25;
  for (const obstacle of track.obstacles) {
    if (obstacle.kind !== "wall") continue;
    const closest = closestPointOnSegmentVector(opponent.position, obstacle.a, obstacle.b);
    const away = opponent.position.clone().sub(closest);
    let distance = away.length();
    const safeDistance = collisionRadius + (obstacle.halfWidth ?? 0.45) + 0.35;
    if (distance > safeDistance) continue;
    if (distance < 0.001) {
      const wallDirection = obstacle.b.clone().sub(obstacle.a).normalize();
      away.set(wallDirection.z, 0, -wallDirection.x);
      distance = 1;
    }
    const normal = away.multiplyScalar(1 / distance);
    opponent.position.addScaledVector(normal, safeDistance - distance);
    const wallDirection = obstacle.b.clone().sub(obstacle.a).normalize();
    let tangentSpeed = opponent.velocity.dot(wallDirection);
    if (tangentSpeed < 0) wallDirection.multiplyScalar(-1);
    tangentSpeed = Math.abs(tangentSpeed);
    opponent.velocity.copy(wallDirection).multiplyScalar(tangentSpeed * 0.72).addScaledVector(normal, 0.65);
    opponent.heading = angleLerp(opponent.heading, Math.atan2(wallDirection.x, wallDirection.z), 0.32);
    opponent.yawRate *= 0.45;
    opponent.speed = opponent.velocity.length();
    opponent.debug.wallCorrectionFrames += 1;
  }
}

function getAiWheelGrassCount(opponent) {
  return getAiWheelGrassCountAt(opponent, opponent.position, opponent.heading);
}

function getAiWheelGrassCountAt(opponent, position, heading) {
  const forward = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  let grassCount = 0;
  for (const longitudinal of [AI_HALF_LENGTH, -AI_HALF_LENGTH]) {
    for (const lateral of [AI_HALF_WIDTH, -AI_HALF_WIDTH]) {
      const point = position
        .clone()
        .addScaledVector(forward, longitudinal)
        .addScaledVector(right, lateral);
      const { edgeState, offset } = getAiWheelTrackState(opponent, point);
      const wheelOffset = Math.abs(offset);
      if (wheelOffset > edgeState.halfWidth + 0.02) grassCount += 1;
    }
  }
  return grassCount;
}

function getAiWheelTrackState(opponent, point) {
  const edgeIndex = getNearestAiSampleIndex(point, track.samples, opponent.sampleIndex ?? 0);
  const edgeState = getAiTrackEdgeState(point, track.samples, edgeIndex);
  return {
    edgeState,
    offset: point.clone().sub(edgeState.center).dot(edgeState.normal),
  };
}

function getAiPathPose(progress, samples, laneOffset = 0) {
  const length = samples.length;
  const wrapped = ((progress % length) + length) % length;
  const lowerIndex = Math.floor(wrapped);
  const upperIndex = (lowerIndex + 1) % length;
  const blend = wrapped - lowerIndex;
  const position = samples[lowerIndex].clone().lerp(samples[upperIndex], blend);
  const width = THREE.MathUtils.lerp(
    track.widthProfile?.[lowerIndex] ?? 7.2,
    track.widthProfile?.[upperIndex] ?? track.widthProfile?.[lowerIndex] ?? 7.2,
    blend,
  );
  const previous = samples[(lowerIndex - 1 + length) % length];
  const next = samples[(lowerIndex + 2) % length];
  const tangent = next.clone().sub(previous).setY(0).normalize();
  const normal = new THREE.Vector3(tangent.z, 0, -tangent.x);
  position.addScaledVector(normal, THREE.MathUtils.clamp(laneOffset, -width + 3.05, width - 3.05));
  position.y = track.groundY;
  return {
    position,
    heading: Math.atan2(tangent.x, tangent.z),
    center: samples[lowerIndex].clone().lerp(samples[upperIndex], blend),
    normal,
    width,
    laneOffset: THREE.MathUtils.clamp(laneOffset, -width + 3.05, width - 3.05),
  };
}

function getAiRacingIntent(opponent, nearestIndex, samples, profile) {
  const speed = opponent.speed;
  const pace = opponent.pace ?? 0.72;
  const maxSpeed = profile.maxForwardSpeed * pace;
  const closeLookahead = metersToAiSamples(THREE.MathUtils.clamp(speed * 0.22 + 7, 8, 22));
  const farLookahead = metersToAiSamples(THREE.MathUtils.clamp(speed * 0.72 + 18, 18, 58));
  const middleLookahead = Math.round((closeLookahead + farLookahead) * 0.5);
  const cornerSeverity = getAiUpcomingCornerSeverity(nearestIndex, samples, [closeLookahead, middleLookahead, farLookahead]);
  const cornerSpeed = THREE.MathUtils.lerp(maxSpeed, Math.max(18, maxSpeed * 0.58), cornerSeverity);
  const desiredSpeed = cornerSeverity < 0.54 ? maxSpeed : Math.min(maxSpeed, cornerSpeed);
  const overspeed = speed - desiredSpeed;
  const brakeWindow = THREE.MathUtils.smoothstep(cornerSeverity, 0.48, 0.86);
  const brakingNeed = overspeed > 1.2
    ? THREE.MathUtils.clamp((overspeed / Math.max(4.6, profile.brakeForce * 0.24)) * brakeWindow, 0, 1)
    : 0;
  const brake = brakingNeed > 0.12 ? THREE.MathUtils.smoothstep(brakingNeed, 0.1, 0.62) : 0;
  const throttle = brake > 0.08
    ? 0
    : cornerSeverity < 0.64
      ? 1
      : THREE.MathUtils.clamp((desiredSpeed - speed) / 4.8, 0.55, 1);
  const speedLookahead = THREE.MathUtils.lerp(closeLookahead, farLookahead, THREE.MathUtils.clamp(speed / Math.max(maxSpeed, 1), 0, 1));
  const cornerLookaheadScale = THREE.MathUtils.lerp(1, 0.38, THREE.MathUtils.smoothstep(cornerSeverity, 0.18, 0.78));
  return {
    lookahead: Math.round(THREE.MathUtils.clamp(speedLookahead * cornerLookaheadScale, 10, farLookahead)),
    targetSpeed: desiredSpeed,
    maxSpeed,
    cornerSeverity,
    throttle,
    brake,
  };
}

function metersToAiSamples(meters) {
  return Math.max(1, Math.round(meters / Math.max(track.sampleSpacing ?? 1, 0.25)));
}

function getAiUpcomingCornerSeverity(startIndex, samples, lookaheads) {
  let severity = 0;
  const baseHeading = getSampleHeading(samples, startIndex);
  for (const lookahead of lookaheads) {
    const targetHeading = getSampleHeading(samples, startIndex + lookahead);
    const bend = Math.abs(angleDifference(targetHeading, baseHeading));
    const bendRate = bend / Math.max(lookahead, 1);
    const localSharpness = getAiLocalCornerSharpness(startIndex, samples, lookahead);
    const rateSeverity = THREE.MathUtils.smoothstep(Math.max(bendRate, localSharpness), 0.006, 0.034);
    const bendSeverity = THREE.MathUtils.smoothstep(bend, 0.16, 0.9);
    severity = Math.max(severity, Math.max(rateSeverity * 0.9, Math.min(rateSeverity, bendSeverity)));
  }
  return severity;
}

function getAiLocalCornerSharpness(startIndex, samples, lookahead) {
  const window = Math.max(8, Math.min(24, Math.round(lookahead * 0.28)));
  const step = Math.max(4, Math.round(window * 0.5));
  let sharpness = 0;
  for (let offset = step; offset <= lookahead; offset += step) {
    const before = getSampleHeading(samples, startIndex + offset - step);
    const after = getSampleHeading(samples, startIndex + offset + step);
    sharpness = Math.max(sharpness, Math.abs(angleDifference(after, before)) / Math.max(step * 2, 1));
  }
  return sharpness;
}

function keepAiTargetOnTrack(opponent, pathPose, samples, targetProgress, racing) {
  if (!pathPose?.center || !pathPose?.normal) return;
  const unsafe = getAiTargetUnsafeAmount(opponent, pathPose.position);
  if (unsafe <= 0) return;

  const targetIndex = Math.floor(((targetProgress % samples.length) + samples.length) % samples.length);
  const currentHeading = getSampleHeading(samples, targetIndex);
  const futureHeading = getSampleHeading(samples, targetIndex + Math.max(10, Math.round((racing?.lookahead ?? 20) * 0.45)));
  const bendDirection = Math.sign(angleDifference(futureHeading, currentHeading)) || Math.sign(pathPose.position.clone().sub(pathPose.center).dot(pathPose.normal)) || 1;
  const currentOffset = pathPose.position.clone().sub(pathPose.center).dot(pathPose.normal);
  const saferOffset = -bendDirection * Math.max(0, pathPose.width - 3.8) * 0.38;
  const centeredOffset = THREE.MathUtils.lerp(currentOffset, saferOffset, THREE.MathUtils.clamp(unsafe * 0.82, 0, 1));
  pathPose.position.copy(pathPose.center).addScaledVector(pathPose.normal, centeredOffset);
  pathPose.position.y = track.groundY;
  if (racing) {
    racing.throttle = Math.min(racing.throttle, THREE.MathUtils.lerp(0.82, 0.45, unsafe));
    racing.brake = Math.max(racing.brake, THREE.MathUtils.lerp(0.05, 0.28, unsafe));
    racing.targetSpeed = Math.min(racing.targetSpeed, THREE.MathUtils.lerp(racing.maxSpeed * 0.78, 16, unsafe));
  }
}

function getAiTargetUnsafeAmount(opponent, to) {
  const checks = 6;
  let unsafe = 0;
  const from = opponent.position;
  for (let i = 1; i <= checks; i += 1) {
    const blend = i / checks;
    const x = THREE.MathUtils.lerp(from.x, to.x, blend);
    const z = THREE.MathUtils.lerp(from.z, to.z, blend);
    const nextBlend = Math.min(1, blend + 1 / checks);
    const nextX = THREE.MathUtils.lerp(from.x, to.x, nextBlend);
    const nextZ = THREE.MathUtils.lerp(from.z, to.z, nextBlend);
    const dx = nextX - x;
    const dz = nextZ - z;
    const length = Math.hypot(dx, dz) || 1;
    const normalX = dz / length;
    const normalZ = -dx / length;
    const centerPoint = new THREE.Vector3(x, track.groundY, z);
    const leftPoint = new THREE.Vector3(x + normalX * AI_HALF_WIDTH, track.groundY, z + normalZ * AI_HALF_WIDTH);
    const rightPoint = new THREE.Vector3(x - normalX * AI_HALF_WIDTH, track.groundY, z - normalZ * AI_HALF_WIDTH);
    if (isAiPointOffTrackLocal(opponent, centerPoint, 0.1)) unsafe += blend * 1.15;
    if (isAiPointOffTrackLocal(opponent, leftPoint, AI_ROAD_MARGIN * 0.35)) unsafe += blend * 0.75;
    if (isAiPointOffTrackLocal(opponent, rightPoint, AI_ROAD_MARGIN * 0.35)) unsafe += blend * 0.75;
  }
  return THREE.MathUtils.clamp(unsafe / 3.1, 0, 1);
}

function isAiPointOffTrackLocal(opponent, point, margin = 0) {
  const { edgeState, offset } = getAiWheelTrackState(opponent, point);
  return Math.abs(offset) > edgeState.halfWidth - margin;
}

function getSampleHeading(samples, index) {
  const safeIndex = ((index % samples.length) + samples.length) % samples.length;
  const previous = samples[(safeIndex - 1 + samples.length) % samples.length];
  const next = samples[(safeIndex + 1) % samples.length];
  return Math.atan2(next.x - previous.x, next.z - previous.z);
}

function angleLerp(from, to, amount) {
  return from + angleDifference(to, from) * THREE.MathUtils.clamp(amount, 0, 1);
}

function resetCar({ keepTimeTrialLaps = false } = {}) {
  const gridPose = selectedGameMode === "quick-race" ? getQuickRaceGridPose(selectedGridPosition) : null;
  const spawn = gridPose
    ? { x: gridPose.position.x, z: gridPose.position.z, heading: gridPose.heading }
    : selectedGameMode === "time-trial" && track.timeTrialStart
      ? track.timeTrialStart
      : track.start;
  carState.position.set(spawn.x, track.groundY, spawn.z);
  carState.velocity.set(0, 0, 0);
  carState.heading = spawn.heading;
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
  carState.kerbJoltCooldown = 0;
  carState.kerbKickRoll = 0;
  carState.kerbKickPitch = 0;
  carState.kerbKickRollTarget = 0;
  carState.kerbKickPitchTarget = 0;
  carState.boostActive = false;
  carState.nitrousFlameScale = 0;
  carState.headlightsOn = shouldDefaultHeadlightsOn();
  car.root.position.copy(carState.position);
  car.root.rotation.set(0, carState.heading, 0);
  car.body.rotation.set(0, 0, 0);
  for (const wheel of Object.values(car.wheels)) {
    if (wheel) wheel.rotation.x = carState.wheelSpin;
  }
  if (car.wheels.frontLeft) car.wheels.frontLeft.rotation.y = carState.steer;
  if (car.wheels.frontRight) car.wheels.frontRight.rotation.y = carState.steer;
  updateErsHud();
  updateRevMeter();
  cameraPosition
    .copy(carState.position)
    .add(new THREE.Vector3(-8 * Math.sin(carState.heading), 5.2, -8 * Math.cos(carState.heading)));
  cameraTarget.copy(carState.position);
  updateCarLights(false, false);
  resetAiOpponentsToGrid();
  if (selectedGameMode === "time-trial") resetTimeTrialState({ clearLaps: !keepTimeTrialLaps });
  else updateTimeTrialHud();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






















































