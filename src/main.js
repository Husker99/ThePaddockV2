import * as THREE from "../node_modules/three/build/three.module.js";
import "./styles.css";
import kataraSpeedwayTrack from "./tracks/katara-speedway.json";
import kyoshiCircuitTrack from "./tracks/kyoshi-circuit.json";
import makoCityTrack from "./tracks/mako-city.json";
import yueRingTrack from "./tracks/yue-ring.json";
import kataraStockCyborgTraining from "./ai-training/katara-speedway-stock-cyborg-training.json";
import kataraFormulaCyborgTraining from "./ai-training/katara-speedway-formula-cyborg-training.json";
import kataraLmpCyborgTraining from "./ai-training/katara-speedway-lmp-cyborg-training.json";
import kyoshiStockCyborgTraining from "./ai-training/kyoshi-circuit-stock-cyborg-training.json";
import kyoshiFormulaCyborgTraining from "./ai-training/kyoshi-circuit-formula-cyborg-training.json";
import kyoshiLmpCyborgTraining from "./ai-training/kyoshi-circuit-lmp-cyborg-training.json";
import makoStockCyborgTraining from "./ai-training/mako-city-stock-cyborg-training.json";
import makoFormulaCyborgTraining from "./ai-training/mako-city-formula-cyborg-training.json";
import makoLmpCyborgTraining from "./ai-training/mako-city-lmp-cyborg-training.json";
import yueStockCyborgTraining from "./ai-training/yue-ring-stock-cyborg-training.json";
import yueFormulaCyborgTraining from "./ai-training/yue-ring-formula-cyborg-training.json";
import yueLmpCyborgTraining from "./ai-training/yue-ring-lmp-cyborg-training.json";

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
const goOnlineGameButton = document.querySelector("#go-online-game");
const onlineWeeklyTimeTrialButton = document.querySelector("#online-weekly-time-trial");
const onlineHostGameButton = document.querySelector("#online-host-game");
const onlineJoinGameButton = document.querySelector("#online-join-game");
const onlineJoinRoomButton = document.querySelector("#online-join-room");
const onlineRoomCodeInput = document.querySelector("#online-room-code-input");
const onlineJoinStatusEl = document.querySelector("#online-join-status");
const onlineLobbyBrowserStatusEl = document.querySelector("#online-lobby-browser-status");
const onlineLobbyRefreshButton = document.querySelector("#online-lobby-refresh");
const onlineLobbyListEl = document.querySelector("#online-lobby-list");
const onlineRoomModeEl = document.querySelector("#online-room-mode");
const onlineRoomCodeEl = document.querySelector("#online-room-code");
const onlineSessionRoomCodeEl = document.querySelector("#online-session-room-code");
const onlineRoomSummaryEl = document.querySelector("#online-room-summary");
const onlineRoomStatusEl = document.querySelector("#online-room-status");
const onlineRoomPlayersEl = document.querySelector("#online-room-players");
const onlineHostSettingsEl = document.querySelector("#online-host-settings");
const onlineAiOpponentSlider = document.querySelector("#online-ai-opponent-slider");
const onlineAiOpponentReadout = document.querySelector("#online-ai-opponent-readout");
const onlineRaceLapSlider = document.querySelector("#online-race-lap-slider");
const onlineRaceLapReadout = document.querySelector("#online-race-lap-readout");
const onlineAiDifficultySelect = document.querySelector("#online-ai-difficulty-select");
const onlineLobbyPrivacySelect = document.querySelector("#online-lobby-privacy");
const onlineRoomReadyButton = document.querySelector("#online-room-ready");
const onlineRoomStartDriveButton = document.querySelector("#online-room-start-drive");
const openTrackEditorButton = document.querySelector("#open-track-editor");
const settingsButton = document.querySelector("#settings-button");
const graphicsQualitySelect = document.querySelector("#settings-graphics-quality");
const defaultAiDifficultySelect = document.querySelector("#settings-default-ai-difficulty");
const defaultOpponentsSlider = document.querySelector("#settings-default-opponents");
const defaultOpponentsReadout = document.querySelector("#settings-default-opponents-readout");
const defaultRaceLapsSlider = document.querySelector("#settings-default-laps");
const defaultRaceLapsReadout = document.querySelector("#settings-default-laps-readout");
const defaultCameraSelect = document.querySelector("#settings-default-camera");
const playerEngineVolumeSlider = document.querySelector("#settings-player-engine-volume");
const playerEngineVolumeReadout = document.querySelector("#settings-player-engine-volume-readout");
const opponentEngineVolumeSlider = document.querySelector("#settings-opponent-engine-volume");
const opponentEngineVolumeReadout = document.querySelector("#settings-opponent-engine-volume-readout");
const wheelSurfaceVolumeSlider = document.querySelector("#settings-wheel-surface-volume");
const wheelSurfaceVolumeReadout = document.querySelector("#settings-wheel-surface-volume-readout");
const collisionVolumeSlider = document.querySelector("#settings-collision-volume");
const collisionVolumeReadout = document.querySelector("#settings-collision-volume-readout");
const crowdVolumeSlider = document.querySelector("#settings-crowd-volume");
const crowdVolumeReadout = document.querySelector("#settings-crowd-volume-readout");
const natureVolumeSlider = document.querySelector("#settings-nature-volume");
const natureVolumeReadout = document.querySelector("#settings-nature-volume-readout");
const musicVolumeSlider = document.querySelector("#settings-music-volume");
const musicVolumeReadout = document.querySelector("#settings-music-volume-readout");
const howToPlayButton = document.querySelector("#how-to-play-button");
const howToPlayTopicButtons = [...document.querySelectorAll("[data-how-to-play-topic]")];
const howToPlayTitleEl = document.querySelector("#how-to-play-title");
const howToPlaySummaryEl = document.querySelector("#how-to-play-summary");
const howToPlayListEl = document.querySelector("#how-to-play-list");
const howToPlayNoteEl = document.querySelector("#how-to-play-note");
const driverProfileButton = document.querySelector("#driver-profile-button");
const driverProfileNameInput = document.querySelector("#driver-profile-name");
const driverProfileTeamInput = document.querySelector("#driver-profile-team");
const driverProfileRecordsEl = document.querySelector("#driver-profile-records");
const timeTrialHistoryRecordsEl = document.querySelector("#time-trial-history-records");
const timeTrialExportRecordsButton = document.querySelector("#time-trial-export-records");
const timeTrialImportRecordsInput = document.querySelector("#time-trial-import-records");
const timeTrialRecordsStatusEl = document.querySelector("#time-trial-records-status");
const driverProfileCustomizerEl = document.querySelector("#driver-profile-customizer");
const teamPrimaryColorInput = document.querySelector("#team-primary-color");
const teamAccentColorInput = document.querySelector("#team-accent-color");
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
const timeTrialModeGridEl = document.querySelector("#time-trial-mode-options");
const timeTrialSetupStartButton = document.querySelector("#time-trial-setup-start");
const weeklyTimeTrialCardEl = document.querySelector("#weekly-time-trial-card");
const weeklyTimeTrialTitleEl = document.querySelector("#weekly-time-trial-title");
const weeklyTimeTrialResetEl = document.querySelector("#weekly-time-trial-reset");
const timeTrialGhostSelect = document.querySelector("#time-trial-ghost-select");
const timeTrialOnlineBrowserEl = document.querySelector("#time-trial-online-browser");
const timeTrialDownloadGhostsButton = document.querySelector("#time-trial-download-ghosts");
const timeTrialOnlineStatusEl = document.querySelector("#time-trial-online-status");
const timeTrialSelectedOnlineGhostEl = document.querySelector("#time-trial-selected-online-ghost");
const timeTrialOnlineListEl = document.querySelector("#time-trial-online-list");
const timeTrialOnlineFilterButtons = [...document.querySelectorAll("[data-online-ghost-filter]")];
const aiOpponentsBackButton = document.querySelector("#ai-opponents-back");
const aiOpponentSlider = document.querySelector("#ai-opponent-slider");
const aiOpponentReadout = document.querySelector("#ai-opponent-readout");
const gridPositionSlider = document.querySelector("#grid-position-slider");
const gridPositionReadout = document.querySelector("#grid-position-readout");
const quickRaceLapSlider = document.querySelector("#quick-race-lap-slider");
const quickRaceLapReadout = document.querySelector("#quick-race-lap-readout");
const aiDifficultySelect = document.querySelector("#ai-difficulty-select");
const carButtons = [...document.querySelectorAll("[data-car]")];
const carCategoryButtons = [...document.querySelectorAll("[data-car-category]")];
const backButtons = [...document.querySelectorAll("[data-menu-back]")];
const trackButtons = [...document.querySelectorAll("[data-track]")];
const speedEl = document.querySelector("#speed");
const gearEl = document.querySelector("#gear");
const surfaceEl = document.querySelector("#surface");
const draftCueEl = document.querySelector("#draft-cue");
const sessionMenuButton = document.querySelector("#session-menu-button");
const controlsEl = document.querySelector(".controls");
const ersPanelEl = document.querySelector(".ers-panel");
const ersControlHintEl = document.querySelector("#ers-control-hint");
const ersLabelEl = document.querySelector("#ers-label");
const ersFillEl = document.querySelector("#ers-fill");
const ersReadoutEl = document.querySelector("#ers-readout");
const pauseBadge = document.querySelector("#pause-badge");
const pauseMenuEl = document.querySelector("#pause-menu");
const pauseMenuModeEl = document.querySelector("#pause-menu-mode");
const pauseMenuTitleEl = document.querySelector("#pause-menu-title");
const pauseMenuDetailEl = document.querySelector("#pause-menu-detail");
const pauseMenuResumeButton = document.querySelector("#pause-menu-resume");
const pauseMenuResetButton = document.querySelector("#pause-menu-reset");
const pauseMenuRestartButton = document.querySelector("#pause-menu-restart");
const pauseMenuSettingsButton = document.querySelector("#pause-menu-settings");
const pauseMenuQuitButton = document.querySelector("#pause-menu-quit");
const revMeterEl = document.querySelector("#rev-meter");
const revFillEl = document.querySelector("#rev-fill");
const manualGearEl = document.querySelector("#manual-gear");
const timeTrialTimerEl = document.querySelector("#time-trial-timer");
const timeTrialTimerValueEl = document.querySelector("#time-trial-timer-value");
const timeTrialGhostDeltaEl = document.querySelector("#time-trial-ghost-delta");
const timeTrialSegmentEls = [...document.querySelectorAll("#time-trial-segments span")];
const timeTrialMessageEl = document.querySelector("#time-trial-message");
const timeTrialSectorDeltaEl = document.querySelector("#time-trial-sector-delta");
const timeTrialLapCardEl = document.querySelector("#time-trial-lap-card");
const timeTrialLapCardTitleEl = document.querySelector("#time-trial-lap-card-title");
const timeTrialLapCardTimeEl = document.querySelector("#time-trial-lap-card-time");
const timeTrialLapCardDetailEl = document.querySelector("#time-trial-lap-card-detail");
const timeTrialLocalBestEl = document.querySelector("#time-trial-local-best");
const raceCountdownEl = document.querySelector("#race-countdown");
const raceGridIntroEl = document.querySelector("#race-grid-intro");
const raceGridIntroModeEl = document.querySelector("#race-grid-intro-mode");
const raceGridIntroTrackEl = document.querySelector("#race-grid-intro-track");
const raceGridIntroClassEl = document.querySelector("#race-grid-intro-class");
const raceGridIntroLapsEl = document.querySelector("#race-grid-intro-laps");
const raceGridIntroPositionEl = document.querySelector("#race-grid-intro-position");
const quickRaceHudEl = document.querySelector("#quick-race-hud");
const quickRacePositionEl = document.querySelector("#quick-race-position");
const quickRaceLapEl = document.querySelector("#quick-race-lap");
const quickRacePenaltyTimerEl = document.querySelector("#quick-race-penalty-timer");
const quickRacePenaltyMessageEl = document.querySelector("#quick-race-penalty-message");
const bossModeMessageEl = document.querySelector("#boss-mode-message");
const raceLeaderboardEl = document.querySelector("#race-leaderboard");
const raceLeaderboardPositionEl = document.querySelector("#race-leaderboard-position");
const raceLeaderboardListEl = document.querySelector("#race-leaderboard-list");
const quickRaceResultsEl = document.querySelector("#quick-race-results");
const quickRaceResultsPositionEl = document.querySelector("#quick-race-results-position");
const quickRaceResultsListEl = document.querySelector("#quick-race-results-list");
const quickRaceResultsRestartButton = document.querySelector("#quick-race-results-restart");
const quickRaceResultsLobbyButton = document.querySelector("#quick-race-results-lobby");
const quickRaceResultsMenuButton = document.querySelector("#quick-race-results-menu");
const timeTrialResultsEl = document.querySelector("#time-trial-results");
const timeTrialLapsEl = document.querySelector("#time-trial-laps");
const timeTrialUploadSessionBestButton = document.querySelector("#time-trial-upload-session-best");
const drivingLineRecorderEl = document.querySelector("#driving-line-recorder");
const drivingLineStatusEl = document.querySelector("#driving-line-status");
const drivingLineExportButton = document.querySelector("#driving-line-export");
const aiDebugPanelEl = document.querySelector("#ai-debug-panel");
const aiDebugStatusEl = document.querySelector("#ai-debug-status");
const aiDebugDetailEl = document.querySelector("#ai-debug-detail");
const audioBasePath = `${import.meta.env.BASE_URL}audio/`;
const MENU_THEME_SRCS = [
  `${audioBasePath}the-paddock-theme.mp3`,
  `${audioBasePath}music-for-videos-night-drive-90s-synthwave-stargirl-180569.mp3`,
  `${audioBasePath}alex_kizenkov-drive-sport-rock-141945.mp3`,
];
const MENU_THEME_SRC = MENU_THEME_SRCS[Math.floor(Math.random() * MENU_THEME_SRCS.length)];
const CROWD_CHEER_SRC = `${audioBasePath}vishiv-crowd-cheering-in-stadium-435357.mp3`;
const NATURE_AMBIENCE_SRCS = {
  day: `${audioBasePath}freesound_community-butcher-bird-singing-16757.mp3`,
  sunset: `${audioBasePath}freesound_community-birds-chirping-75156.mp3`,
  night: `${audioBasePath}eryliaa-birds-crickets-and-crow-in-nature-ambience-432030.mp3`,
};
const RACE_INTRO_MUSIC_SRCS = {
  day: `${audioBasePath}dariocoiro-intro-530690.mp3`,
  sunset: `${audioBasePath}dariocoiro-intro-530690.mp3`,
  night: `${audioBasePath}dariocoiro-podcast-intro-530686.mp3`,
};
const EDITOR_MUSIC_SRCS = [`${audioBasePath}track-editor-1.mp3`, `${audioBasePath}track-editor-2.mp3`];
const TIME_TRIAL_RECORDS_KEY = "the-paddock:time-trial-records:v1";
const SUPABASE_URL = "https://dvckkaqlbyphlxyogbif.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gADFEoFX4NeCNuUqPKtX3w_3r-JpBEH";
const SUPABASE_TIME_TRIAL_RECORDS_URL = `${SUPABASE_URL}/rest/v1/time_trial_records`;
const SUPABASE_REALTIME_URL = `${SUPABASE_URL.replace("https://", "wss://")}/realtime/v1/websocket?apikey=${SUPABASE_PUBLISHABLE_KEY}&vsn=1.0.0`;
const ONLINE_LOBBY_TOPIC = "realtime:paddock-public-lobbies";
const GAME_SETTINGS_KEY = "the-paddock:settings:v1";

function getDefaultGameSettings() {
  return {
    graphicsQuality: "medium",
    defaultAiDifficulty: "beginner",
    defaultOpponents: 4,
    defaultRaceLaps: 3,
    defaultCamera: "chase",
    playerEngineVolume: 100,
    opponentEngineVolume: 100,
    wheelSurfaceVolume: 100,
    collisionVolume: 100,
    crowdVolume: 100,
    natureVolume: 100,
    musicVolume: 100,
  };
}

function normalizeGameSettings(settings = {}) {
  const defaults = getDefaultGameSettings();
  const normalized = { ...defaults, ...(settings ?? {}) };
  normalized.graphicsQuality = ["low", "medium", "high"].includes(normalized.graphicsQuality) ? normalized.graphicsQuality : defaults.graphicsQuality;
  normalized.defaultAiDifficulty = ["greg", "beginner", "standard", "amateur", "professional"].includes(normalized.defaultAiDifficulty) ? normalized.defaultAiDifficulty : defaults.defaultAiDifficulty;
  normalized.defaultOpponents = THREE.MathUtils.clamp(Math.round(Number(normalized.defaultOpponents) || defaults.defaultOpponents), 1, 10);
  normalized.defaultRaceLaps = THREE.MathUtils.clamp(Math.round(Number(normalized.defaultRaceLaps) || defaults.defaultRaceLaps), 1, 10);
  normalized.defaultCamera = normalized.defaultCamera === "cockpit" ? "cockpit" : "chase";
  for (const key of ["playerEngineVolume", "opponentEngineVolume", "wheelSurfaceVolume", "collisionVolume", "crowdVolume", "natureVolume", "musicVolume"]) {
    normalized[key] = THREE.MathUtils.clamp(Math.round(Number(normalized[key]) || 0), 0, 110);
  }
  return normalized;
}

function loadGameSettings() {
  try {
    return normalizeGameSettings(JSON.parse(window.localStorage?.getItem(GAME_SETTINGS_KEY) ?? "null"));
  } catch {
    return getDefaultGameSettings();
  }
}

let gameSettings = loadGameSettings();

function saveGameSettings() {
  try {
    window.localStorage?.setItem(GAME_SETTINGS_KEY, JSON.stringify(gameSettings));
  } catch {
    // Settings still apply for the current session if storage is blocked.
  }
}

function getGraphicsPixelRatio() {
  const deviceRatio = window.devicePixelRatio || 1;
  if (gameSettings.graphicsQuality === "low") return Math.min(deviceRatio, 0.65);
  if (gameSettings.graphicsQuality === "high") return Math.min(deviceRatio, 2);
  return Math.min(deviceRatio, 1.25);
}

function shouldUseMediumOrLowGraphics() {
  return gameSettings.graphicsQuality === "low" || gameSettings.graphicsQuality === "medium";
}

function settingVolume(key) {
  return THREE.MathUtils.clamp((gameSettings?.[key] ?? 100) / 100, 0, 1.1);
}

function getSceneryVisibilityMultiplier() {
  if (gameSettings.graphicsQuality === "low") return 0.38;
  if (gameSettings.graphicsQuality === "high") return 1.24;
  return 1;
}

function getSceneryLightVisibilityMultiplier(role = "ambient") {
  if (gameSettings.graphicsQuality === "low") {
    if (role === "lamp" && activeTimeOfDay === "sunset") return 0;
    if (role === "lamp" && activeTimeOfDay === "night") return 0.26;
    return role === "lamp" ? 0.38 : 0.55;
  }
  if (gameSettings.graphicsQuality === "high") return role === "lamp" ? 2 : 1.22;
  return 1;
}

function getEffectsDensityMultiplier() {
  if (gameSettings.graphicsQuality === "low") return 0.34;
  if (gameSettings.graphicsQuality === "high") return 1.12;
  return 0.72;
}

function getSparkSmokeDensityMultiplier() {
  if (gameSettings.graphicsQuality === "low") return 0.5;
  if (gameSettings.graphicsQuality === "medium") return 0.62;
  return 1;
}

function getCrashSparkDensityMultiplier() {
  if (gameSettings.graphicsQuality === "low") return 0;
  if (gameSettings.graphicsQuality === "medium") return 0.42;
  return 1;
}

function shouldUseOpponentHeadlightBeams() {
  return gameSettings.graphicsQuality === "high" && shouldDefaultHeadlightsOn();
}

function getOpponentHeadlightMaxDistance() {
  return 95;
}

function shouldShowOpponentHeadlightsAt(position) {
  if (!shouldUseOpponentHeadlightBeams() || !position) return false;
  if (isRaceGridIntroActive()) return true;
  return position.distanceToSquared(carState.position) <= getOpponentHeadlightMaxDistance() ** 2;
}

function getActiveAiHeadlightOpponents() {
  if (!shouldUseOpponentHeadlightBeams() || !aiOpponents.length) return new Set();
  if (isRaceGridIntroActive()) return new Set(aiOpponents);
  return new Set(
    aiOpponents
      .filter((opponent) => shouldShowOpponentHeadlightsAt(opponent.position))
      .sort((a, b) => a.position.distanceToSquared(carState.position) - b.position.distanceToSquared(carState.position))
      .slice(0, MAX_ACTIVE_AI_HEADLIGHT_BEAMS),
  );
}

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(getGraphicsPixelRatio());
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = gameSettings.graphicsQuality !== "low";
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const previewRenderer = new THREE.WebGLRenderer({ canvas: menuPreviewCanvas, antialias: true, alpha: true });
previewRenderer.setPixelRatio(getGraphicsPixelRatio());
previewRenderer.shadowMap.enabled = gameSettings.graphicsQuality !== "low";
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
sun.castShadow = gameSettings.graphicsQuality !== "low";
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -95;
sun.shadow.camera.right = 95;
sun.shadow.camera.top = 95;
sun.shadow.camera.bottom = -95;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 280;
sun.target.position.set(0, 0, 0);
scene.add(sun, sun.target);
const sunShadowFocus = new THREE.Vector3();

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
  sun.userData.timeOfDayOffset = new THREE.Vector3(...setting.sunPosition);
  updateSunShadowFocus(true);
}

function sceneryLightIntensity(baseIntensity, role = "ambient") {
  if (gameSettings.graphicsQuality === "low" && role === "lamp" && activeTimeOfDay === "sunset") return 0;
  if (gameSettings.graphicsQuality === "low" && role === "lamp" && activeTimeOfDay === "night") return baseIntensity * 1.9;
  const sunsetMultiplier = role === "lamp" ? 5.2 : 1.75;
  const nightMultiplier = role === "lamp" ? 6.4 : 2.25;
  if (activeTimeOfDay === "sunset") return baseIntensity * sunsetMultiplier;
  if (activeTimeOfDay === "night") return baseIntensity * nightMultiplier;
  return baseIntensity;
}

function sceneryLightDistance(baseDistance, role = "ambient") {
  if (gameSettings.graphicsQuality === "low" && role === "lamp" && activeTimeOfDay === "sunset") return 0;
  if (gameSettings.graphicsQuality === "low" && role === "lamp" && activeTimeOfDay === "night") return baseDistance * 0.95;
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

function registerSceneryLight(light, maxDistance = 125, role = "ambient") {
  light.userData.baseMaxDistance = maxDistance;
  light.userData.lightRole = role;
  sceneryLights.push(light);
  return light;
}

function registerSceneryCullable(object, maxDistance = 520) {
  markCostlySceneryShadow(object);
  object.userData.baseVisibleDistance = maxDistance;
  object.userData.baseHiddenDistance = maxDistance * 1.16;
  sceneryCullables.push(object);
  return object;
}

function preserveBaseShadowFlags(object) {
  object?.traverse?.((child) => {
    if (!child.isMesh || child.userData.baseShadowFlagsSaved) return;
    child.userData.baseCastShadow = child.castShadow;
    child.userData.baseReceiveShadow = child.receiveShadow;
    child.userData.baseShadowFlagsSaved = true;
  });
}

function markCostlySceneryShadow(object) {
  preserveBaseShadowFlags(object);
  object?.traverse?.((child) => {
    if (child.isMesh) child.userData.costlySceneryShadow = true;
  });
  return object;
}

function registerCrowdEmitter(object, { radius = 118, strength = 1 } = {}) {
  crowdEmitters.push({ object, radius, strength });
  return object;
}

function registerTreeAudioSource(x, z, type = "trees", weight = 1) {
  treeAudioSources.push({ position: new THREE.Vector3(x, 0, z), type, weight });
}

function rebuildNatureEmitters() {
  natureEmitters.length = 0;
  const unused = new Set(treeAudioSources.map((_, index) => index));
  for (let seedIndex = 0; seedIndex < treeAudioSources.length; seedIndex += 1) {
    if (!unused.has(seedIndex)) continue;
    const seed = treeAudioSources[seedIndex];
    const clusterIndexes = [seedIndex];
    unused.delete(seedIndex);
    for (const candidateIndex of [...unused]) {
      const candidate = treeAudioSources[candidateIndex];
      if (candidate.position.distanceTo(seed.position) <= 48) {
        clusterIndexes.push(candidateIndex);
        unused.delete(candidateIndex);
      }
    }
    const totalWeight = clusterIndexes.reduce((sum, index) => sum + (treeAudioSources[index].weight ?? 1), 0);
    if (clusterIndexes.length < 3 && totalWeight < 3.2) continue;
    if (Math.random() > 0.5) continue;
    const center = new THREE.Vector3();
    for (const index of clusterIndexes) center.addScaledVector(treeAudioSources[index].position, treeAudioSources[index].weight ?? 1);
    center.multiplyScalar(1 / Math.max(totalWeight, 0.001));
    natureEmitters.push({
      position: center,
      radius: THREE.MathUtils.clamp(92 + totalWeight * 8, 105, 155),
      strength: THREE.MathUtils.clamp(totalWeight / 5, 0.6, 1.45),
    });
  }
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
  updateSunShadowFocus();
}

function updateSunShadowFocus(force = false) {
  if (!sun.castShadow) return;
  const focus = gameStarted ? carState.position : camera.position;
  const snappedFocus = sunShadowFocus.copy(focus);
  snappedFocus.x = Math.round(snappedFocus.x / 8) * 8;
  snappedFocus.y = 0.14;
  snappedFocus.z = Math.round(snappedFocus.z / 8) * 8;
  const sunOffset = sun.userData.timeOfDayOffset ?? new THREE.Vector3(-60, 95, 42);
  const targetPosition = snappedFocus;
  const lightPosition = snappedFocus.clone().add(sunOffset);
  if (force) {
    sun.target.position.copy(targetPosition);
    sun.position.copy(lightPosition);
  } else {
    sun.target.position.lerp(targetPosition, 0.18);
    sun.position.lerp(lightPosition, 0.18);
  }
  sun.target.updateMatrixWorld();
  sun.shadow.camera.updateProjectionMatrix();
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
let pauseMenuOpen = false;
let pauseSettingsOpen = false;
let menuStep = "intro";
let selectedGameMode = "drive";
let selectedAiOpponentCount = gameSettings.defaultOpponents;
let selectedGridPosition = gameSettings.defaultOpponents + 1;
let selectedQuickRaceLapCount = gameSettings.defaultRaceLaps;
let selectedAiDifficulty = gameSettings.defaultAiDifficulty;
let quickRacePaintStep = "formula";
let timeTrialPaintStep = "stock";
let selectedTimeTrialMode = "standard";
let selectedTimeTrialGhostMode = "my-best";
let selectedOnlineGhostFilter = "top";
let selectedOnlineGhostRecordId = "";
let selectedHowToPlayTopic = "quick-start";
let selectedCar = "ferraro";
let selectedTrack = "katara-speedway";
let previewTrackId = null;
let previewCarCategory = null;
let driverProfile = loadDriverProfile();
let cameraMode = gameSettings.defaultCamera;
let editorTool = "select";
let selectedEditorNode = 0;
let selectedEditorSegment = 0;
let selectedEditorScenery = -1;
let draggedEditorNode = null;
let draggedEditorCurveSegment = null;
let editorGhostPoint = null;
let isEditorTestDrive = false;
let pendingEditorUndoSnapshot = null;
function isTimeTrialGameMode() {
  return selectedGameMode === "time-trial" || selectedGameMode === "weekly-time-trial";
}

function isOnlineRaceGameMode() {
  return selectedGameMode === "online-host" || selectedGameMode === "online-join" || selectedGameMode === "online-race";
}

function isRaceSessionGameMode() {
  return selectedGameMode === "quick-race" || isOnlineRaceGameMode();
}

const HOW_TO_PLAY_TOPICS = {
  "quick-start": {
    title: "Quick Start",
    summary: "Pick a mode, choose a track and car, then drive. The Paddock is happiest when you are learning the car one lap at a time.",
    bullets: [
      "Just Drive is the simplest way to test a car or explore a track with no pressure.",
      "Time Trial starts timing when you cross the start line and saves your best local laps.",
      "Quick Race adds AI opponents, lap counts, race position, penalties, and race results.",
      "Go Online is where weekly time trials, online rooms, and ghost racing live.",
    ],
    note: "Core driving: accelerate, brake, steer, boost with Shift when available, look behind with Q, headlights with H, and reset with R.",
  },
  "game-modes": {
    title: "Game Modes",
    summary: "Each mode is built around a different kind of racing session.",
    bullets: [
      "Just Drive is free practice with the car and track you select.",
      "Time Trial records lap times, sector performance, local bests, session ghosts, and online ghost uploads.",
      "Quick Race lets you set AI count, starting position, laps, and difficulty before racing.",
      "Go Online includes Weekly Time Trial, Host Game, and Join Game.",
      "Track Editor lets you build and export new circuits, scenery, time of day, and environment settings.",
    ],
    note: "Weekly Time Trial locks in a weekly track and car class so everyone competes under the same conditions.",
  },
  difficulty: {
    title: "Difficulty",
    summary: "AI difficulty changes pace, caution, rubberbanding, and how willing the field is to fight for position.",
    bullets: [
      "Greg is the gentlest mode: slower cars, very cautious margins, low overtake intent, and quarter-strength penalties.",
      "Beginner is slower, safer, and gets the strongest slowdown when ahead of human players.",
      "Standard is the balanced setting with cautious margins and sliding rubberbanding.",
      "Amateur is faster and can include boss drivers in Stock Car, Formula, and Prototype races.",
      "Professional has the highest overtake intent, stronger catch-up pressure, and the sharpest boss behavior.",
    ],
    note: "Boss drivers power up in the final smaller half of the race, so a 3 lap race turns them loose on lap 3.",
  },
  "ai-drivers": {
    title: "AI Drivers",
    summary: "The best AI uses the Cyborg model, which learns from recorded driving lines for a specific track and car class.",
    bullets: [
      "When a Cyborg model exists, AI cars use recorded laps to follow a better racing line.",
      "Without a Cyborg model, AI falls back to the general race model for that track.",
      "AI can overtake, slipstream, avoid nearby cars, and race with collision physics.",
      "Stock Car races can feature Geoff Corden, Formula races can feature Louisa Hampton, and Prototype races can feature Patricia Dempsey on Amateur or Professional.",
    ],
    note: "Recorded training laps are still the best way to make a specific car and track combo feel sharper.",
  },
  "time-trial-ghosts": {
    title: "Time Trial Ghosts",
    summary: "Ghosts let you race against your own best laps or online laps from other players.",
    bullets: [
      "Your session best ghost is saved automatically once you complete a valid lap.",
      "Use Upload Best Time near the lap table or in Driver Profile to send your best ghost online.",
      "Online Ghost opens the browser for uploaded laps, including Top 10 and This Week filters.",
      "My Best uses your saved local best for the selected track and car class.",
      "Session Best uses the best ghost from the current time trial session.",
    ],
    note: "Only the session best ghost is kept because slower ghosts do not help much once a faster lap exists.",
  },
  "quick-race": {
    title: "Quick Race",
    summary: "Quick Race is the main offline race mode with AI opponents and adjustable race settings.",
    bullets: [
      "Choose the number of opponents, your starting position, lap count, and AI difficulty.",
      "The starting grid follows the track centerline and spaces cars out before the start line.",
      "The race HUD shows lap, position, penalties, and a compact live leaderboard.",
      "After the finish, AI takes over your car for a slower joyride lap.",
    ],
    note: "Race penalties are served at the start line or halfway point instead of invalidating laps.",
  },
  "online-races": {
    title: "Online Races",
    summary: "Online racing is the newest part of the game, so it is built to work first and get more polished over time.",
    bullets: [
      "Host Game creates a room code and lets the host choose track, class, AI count, laps, and difficulty.",
      "Join Game lets other players enter the room code, ready up, and race together.",
      "Online races show room code, lap, position, and a live leaderboard while driving.",
      "Other players appear in their own team liveries, and online collision reactions are being built in stages.",
    ],
    note: "For now, the host controls the race setup and starts the race after players are ready.",
  },
  "track-editor": {
    title: "Track Editor",
    summary: "The editor is for building new circuits quickly, then exporting JSON so a track can become part of the game.",
    bullets: [
      "Start from scratch or from a default track, then move nodes to shape the circuit.",
      "Track Essentials controls name, start line, time of day, environment, and JSON export.",
      "Road tools add walls, sausage kerbs, painted kerbs, and other edge features.",
      "Scenery tools place trees, buildings, lamps, grandstands, flower beds, boulders, and more.",
    ],
    note: "Export JSON downloads the track data so it can be added as a selectable track later.",
  },
  "cars-boost": {
    title: "Cars & Boost",
    summary: "Each car class has its own personality, and some have special boost systems.",
    bullets: [
      "Formula cars use ERS, with stronger regen under braking and sparks near top speed when ERS is not active.",
      "Corvettes use Nitrous, which recharges quickly and fires blue exhaust flames while boosting.",
      "Cars can benefit from slipstream when following another car closely at speed.",
      "Team colors from Driver Profile become your default livery in time trials and the top livery choice elsewhere.",
    ],
    note: "Boost bars turn yellow when they are too low to trigger, but an already-active boost can keep draining.",
  },
};

const AI_DIFFICULTY_SETTINGS = {
  greg: {
    label: "Greg",
    cyborgBrakingLookaheadScale: 4.5,
    accelerationScale: 0.82,
    topSpeedScale: 0.8,
    safetyMarginScale: 5,
    rubberbandAheadSeconds: 2,
    rubberbandAheadAccelerationScale: 0.7,
    rubberbandBehindSeconds: null,
    rubberbandBehindAccelerationScale: 1,
    overtakeIntentScale: 0.5,
    penaltyScale: 0.25,
  },
  beginner: {
    label: "Beginner",
    cyborgBrakingLookaheadScale: 3,
    accelerationScale: 0.9,
    topSpeedScale: 0.9,
    safetyMarginScale: 4,
    rubberbandAheadSeconds: 2.5,
    rubberbandAheadAccelerationScale: 0.8,
    rubberbandBehindSeconds: 3,
    rubberbandBehindAccelerationScale: 1.03,
    rubberbandBehindMaxSeconds: 6,
    rubberbandBehindMaxAccelerationScale: 1.05,
    overtakeIntentScale: 0.75,
    penaltyScale: 0.5,
  },
  standard: {
    label: "Standard",
    cyborgBrakingLookaheadScale: 1.2,
    accelerationScale: 0.98,
    topSpeedScale: 0.96,
    safetyMarginScale: 2,
    rubberbandAheadSeconds: 2,
    rubberbandAheadAccelerationScale: 0.9,
    rubberbandAheadMaxSeconds: 4,
    rubberbandAheadMaxAccelerationScale: 0.83,
    rubberbandBehindSeconds: null,
    rubberbandBehindAccelerationScale: 1,
    overtakeIntentScale: 1,
  },
  amateur: {
    label: "Amateur",
    cyborgBrakingLookaheadScale: 0.8,
    accelerationScale: 1,
    topSpeedScale: 1,
    safetyMarginScale: 1,
    rubberbandAheadSeconds: 4,
    rubberbandAheadAccelerationScale: 0.85,
    rubberbandBehindSeconds: 2,
    rubberbandBehindAccelerationScale: 1.1,
    overtakeIntentScale: 1.08,
  },
  professional: {
    label: "Professional",
    cyborgBrakingLookaheadScale: 0.05,
    accelerationScale: 1,
    topSpeedScale: 1,
    safetyMarginScale: 1,
    rubberbandAheadSeconds: 5,
    rubberbandAheadAccelerationScale: 0.85,
    rubberbandBehindSeconds: 2,
    rubberbandBehindAccelerationScale: 1.12,
    overtakeIntentScale: 1.6,
  },
};
const editorUndoStack = [];
const timeTrialState = {
  running: false,
  currentTime: 0,
  laps: [],
  latestLapId: 0,
  localBest: null,
  sessionBest: null,
  sessionId: makeTimeTrialSessionId(),
  currentGhostSamples: [],
  ghostSampleTimer: 0,
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
  saveMessageTime: 0,
  saveMessageText: "My Best Saved",
  lapCardTime: 0,
  lapCard: null,
  ghostDelta: null,
  sectorDeltaTime: 0,
  sectorDeltaText: "",
  sectorDeltaValue: null,
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
const timeTrialGhost = {
  car: null,
  run: null,
  active: false,
};
const raceCountdownState = {
  active: false,
  introActive: false,
  introElapsed: 0,
  elapsed: 0,
  hideTime: 0,
  lastCue: "",
};
const quickRaceState = {
  active: false,
  entries: [],
  playerPosition: 1,
  elapsed: 0,
  pendingPenaltyTime: 0,
  servingPenaltyTime: 0,
  penaltyCooldown: 0,
  penaltyMessageTime: 0,
  penaltyMessageText: "",
  penaltyMessageServing: false,
  resultsShown: false,
  playerJoyride: null,
};
const raceLeaderboardState = {
  updateTimer: 0,
};
const bossModeState = {
  messageTime: 0,
  messageText: "",
  announcedIds: new Set(),
};
const onlineRoomState = {
  role: "none",
  roomCode: "",
  privacy: "public",
  topic: "",
  socket: null,
  heartbeatId: null,
  ref: 1,
  joinRef: "",
  connected: false,
  playerId: getOnlinePlayerId(),
  players: new Map(),
  hostSettings: null,
  ready: false,
  raceStarted: false,
  poseSendTimer: 0,
  remoteCars: new Map(),
  collisionSendCooldowns: new Map(),
  progress: new Map(),
  aiProgress: new Map(),
  gridOrder: [],
  elapsed: 0,
  localPenaltyTime: 0,
  localPenaltyCooldown: 0,
  localPenaltyMessageTime: 0,
  localPenaltyMessageText: "",
  localFinished: false,
  localFinishTime: null,
  resultsShown: false,
  lastError: "",
};
const onlineLobbyState = {
  socket: null,
  connected: false,
  heartbeatId: null,
  ref: 1,
  joinRef: "",
  lobbies: new Map(),
  announceId: null,
  cleanupId: null,
  lastRefreshTime: 0,
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
const TRACK_VERSION_BY_ID = {
  [KATARA_TRACK_ID]: "katara-speedway-v1",
  [KYOSHI_TRACK_ID]: "kyoshi-circuit-v1",
  [MAKO_TRACK_ID]: "mako-city-v1",
  [YUE_TRACK_ID]: "yue-ring-v1",
};
const sceneryLights = [];
const sceneryCullables = [];
const crowdEmitters = [];
const treeAudioSources = [];
const natureEmitters = [];
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
const AI_DRIVER_NAMES = [
  "Mario Andrettini",
  "Lewis Hammerton",
  "Ayrton Sennaford",
  "Jeff Gourdain",
  "Dale Earnhardly",
  "Richard Pettybone",
  "Sebastian Vettelle",
  "Jenson Buttonwood",
  "Fernando Alonzio",
  "Max Verstaffin",
  "Mika Hakkalinen",
  "Kimi Icekonen",
  "Niki Loudha",
  "Juan Manuel Fango",
  "Dan Gurnstone",
  "Phil Hilltop",
  "Sebi Bourdough",
  "Tom Kristensun",
  "Hurley Haygood",
  "Jackie Stewpot",
  "Emerson Fittypaldi",
  "Michael Shumarker",
  "Scott Speedwell",
  "Valentino Rosetti",
];
const raceModeCarCategories = new Set(["formula", "lmp", "stock"]);
const weeklyTimeTrialClassPool = ["formula", "lmp", "stock", "corvette"];
const weeklyTimeTrialTrackPool = [
  KATARA_TRACK_ID,
  KYOSHI_TRACK_ID,
  MAKO_TRACK_ID,
  YUE_TRACK_ID,
];
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
  if (pauseMenuOpen && event.code !== "Escape" && event.code !== "KeyP") {
    event.preventDefault();
    return;
  }
  keys.add(event.code);
  if (event.code === "Escape" && gameStarted && !event.repeat) {
    togglePauseMenu();
    return;
  }
  if (event.code === "KeyP" && gameStarted && !isMenuOpen() && !event.repeat) {
    togglePauseMenu();
    return;
  }
  if (gameStarted && !isPaused && !pauseMenuOpen) startEngineAudio();
  if (event.code === "KeyR" && !isPaused && !pauseMenuOpen) resetCar({ keepTimeTrialLaps: true });
  if (event.code === "KeyH" && gameStarted && !event.repeat && !pauseMenuOpen) toggleHeadlights();
  if (event.code === "Space" && gameStarted && !event.repeat && !pauseMenuOpen) toggleCameraMode();
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
goOnlineGameButton?.addEventListener("click", () => setMenuStep("go-online"));
onlineWeeklyTimeTrialButton?.addEventListener("click", startWeeklyOnlineTimeTrialFlow);
onlineHostGameButton?.addEventListener("click", startOnlineHostFlow);
onlineJoinGameButton?.addEventListener("click", () => {
  setOnlineJoinStatus("");
  startOnlineLobbyBrowser();
  setMenuStep("online-join");
});
onlineJoinRoomButton?.addEventListener("click", joinOnlineRoomFromInput);
onlineLobbyRefreshButton?.addEventListener("click", refreshOnlineLobbyBrowser);
onlineLobbyListEl?.addEventListener("click", handleOnlineLobbyListClick);
onlineRoomCodeInput?.addEventListener("input", () => {
  onlineRoomCodeInput.value = normalizeOnlineRoomCode(onlineRoomCodeInput.value);
  setOnlineJoinStatus("");
});
onlineRoomCodeInput?.addEventListener("keydown", (event) => {
  if (event.code === "Enter") joinOnlineRoomFromInput();
});
onlineRoomReadyButton?.addEventListener("click", toggleOnlineReady);
onlineRoomStartDriveButton?.addEventListener("click", startOnlineRaceFromLobby);
onlineAiOpponentSlider?.addEventListener("input", updateOnlineAiOpponentSelection);
onlineRaceLapSlider?.addEventListener("input", updateOnlineRaceLapSelection);
onlineAiDifficultySelect?.addEventListener("change", updateOnlineAiDifficultySelection);
onlineLobbyPrivacySelect?.addEventListener("change", updateOnlineLobbyPrivacySelection);
openTrackEditorButton.addEventListener("click", () => setMenuStep("editor-choice"));
settingsButton?.addEventListener("click", () => setMenuStep("settings"));
graphicsQualitySelect?.addEventListener("change", updateGameSettingsFromInputs);
defaultAiDifficultySelect?.addEventListener("change", updateGameSettingsFromInputs);
defaultOpponentsSlider?.addEventListener("input", updateGameSettingsFromInputs);
defaultRaceLapsSlider?.addEventListener("input", updateGameSettingsFromInputs);
defaultCameraSelect?.addEventListener("change", updateGameSettingsFromInputs);
playerEngineVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
opponentEngineVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
wheelSurfaceVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
collisionVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
crowdVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
natureVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
musicVolumeSlider?.addEventListener("input", updateGameSettingsFromInputs);
howToPlayButton?.addEventListener("click", () => setMenuStep("how-to-play"));
for (const button of howToPlayTopicButtons) {
  button.addEventListener("click", () => selectHowToPlayTopic(button.dataset.howToPlayTopic));
}
driverProfileButton?.addEventListener("click", () => setMenuStep("driver-profile"));
driverProfileNameInput?.addEventListener("input", updateDriverProfileFromInputs);
driverProfileTeamInput?.addEventListener("input", updateDriverProfileFromInputs);
teamPrimaryColorInput?.addEventListener("input", updateDriverProfileFromInputs);
teamAccentColorInput?.addEventListener("input", updateDriverProfileFromInputs);
timeTrialExportRecordsButton?.addEventListener("click", exportLocalTimeTrialRecords);
timeTrialImportRecordsInput?.addEventListener("change", importLocalTimeTrialRecords);
timeTrialHistoryRecordsEl?.addEventListener("click", handleTimeTrialHistoryClick);
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
trackNextButton?.addEventListener("click", () => setMenuStep("car-category"));
startButton.addEventListener("pointerenter", startMenuMusic);
for (const button of startRaceButtons) {
  button.addEventListener("pointerenter", startMenuMusic);
  button.addEventListener("click", handleStartRaceClick);
}
quickRaceStartButton?.addEventListener("pointerenter", startMenuMusic);
quickRaceStartButton?.addEventListener("click", startGame);
quickRaceResultsRestartButton?.addEventListener("click", restartQuickRaceFromResults);
quickRaceResultsLobbyButton?.addEventListener("click", returnToOnlineLobbyFromRace);
quickRaceResultsMenuButton?.addEventListener("click", returnToMainMenuFromRace);
sessionMenuButton?.addEventListener("click", () => openPauseMenu());
pauseMenuResumeButton?.addEventListener("click", () => closePauseMenu());
pauseMenuResetButton?.addEventListener("click", () => {
  resetCar({ keepTimeTrialLaps: true });
  closePauseMenu();
});
pauseMenuRestartButton?.addEventListener("click", () => restartCurrentSessionFromPauseMenu());
pauseMenuSettingsButton?.addEventListener("click", () => openSettingsFromPauseMenu());
pauseMenuQuitButton?.addEventListener("click", () => {
  closePauseMenu({ restorePause: false });
  returnToMainMenuFromRace();
});
timeTrialStandardButton?.addEventListener("click", () => selectTimeTrialMode("standard"));
timeTrialRecordLineButton?.addEventListener("click", () => selectTimeTrialMode("record-line"));
timeTrialGhostSelect?.addEventListener("change", updateTimeTrialGhostSelection);
timeTrialDownloadGhostsButton?.addEventListener("click", downloadOnlineTimeTrialGhostsForSelection);
timeTrialOnlineListEl?.addEventListener("click", handleOnlineGhostListClick);
timeTrialUploadSessionBestButton?.addEventListener("click", uploadCurrentSessionBestTimeTrial);
for (const button of timeTrialOnlineFilterButtons) {
  button.addEventListener("click", () => selectOnlineGhostFilter(button.dataset.onlineGhostFilter));
}
timeTrialSetupStartButton?.addEventListener("pointerenter", startMenuMusic);
timeTrialSetupStartButton?.addEventListener("click", startGame);
drivingLineExportButton?.addEventListener("click", exportDrivingLineRecording);
aiOpponentsBackButton?.addEventListener("click", () => setMenuStep(quickRacePaintStep));
aiOpponentSlider?.addEventListener("input", updateAiOpponentSelection);
gridPositionSlider?.addEventListener("input", updateGridPositionSelection);
quickRaceLapSlider?.addEventListener("input", updateQuickRaceLapSelection);
aiDifficultySelect?.addEventListener("change", updateAiDifficultySelection);
for (const button of carButtons) {
  button.addEventListener("click", () => selectCar(button.dataset.car));
}
for (const button of carCategoryButtons) {
  button.addEventListener("pointerenter", () => previewCarCategorySelection(button.dataset.carCategory));
  button.addEventListener("focus", () => previewCarCategorySelection(button.dataset.carCategory));
  button.addEventListener("pointerleave", () => clearCarCategoryPreview(button.dataset.carCategory));
  button.addEventListener("blur", () => clearCarCategoryPreview(button.dataset.carCategory));
  button.addEventListener("click", () => selectCarCategory(button.dataset.carCategory));
}
for (const button of backButtons) {
  button.addEventListener("click", () => {
    if (pauseSettingsOpen && button.closest("[data-menu-step=\"settings\"]")) {
      pauseSettingsOpen = false;
      startMenu.classList.add("is-hidden");
      openPauseMenu();
      return;
    }
    setMenuStep(button.dataset.menuBack);
  });
}
for (const button of trackButtons) {
  button.addEventListener("pointerenter", () => previewTrackSelection(button.dataset.track));
  button.addEventListener("focus", () => previewTrackSelection(button.dataset.track));
  button.addEventListener("pointerleave", () => clearTrackPreview(button.dataset.track));
  button.addEventListener("blur", () => clearTrackPreview(button.dataset.track));
  button.addEventListener("click", () => chooseTrackFromMenu(button.dataset.track));
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
  "louisa-hampton-formula": {
    primary: 0xdc101f,
    secondary: 0xf5f2ea,
    stripe: 0xf5f2ea,
    accent: 0xffd21f,
    rearWing: 0x101113,
    rearWingStripe: 0xf5f2ea,
    rim: 0x151515,
    sideStripeXs: [-0.34, 0.34],
    louisaBoss: true,
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
  "geoff-corden-stock": {
    primary: 0xf43a2f,
    secondary: 0x081a43,
    stripe: 0xffd42a,
    glass: 0x78c8ee,
    geoffBoss: true,
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
const PROFILE_TEAM_CAR_IDS = {
  formula: "profile-team-formula",
  lmp: "profile-team-lmp",
  stock: "profile-team-stock",
  jeep: "profile-team-jeep",
  corvette: "profile-team-corvette",
};
carPaintSchemes[PROFILE_TEAM_CAR_IDS.formula] = getDriverProfileFormulaScheme(driverProfile);
stockPaintSchemes[PROFILE_TEAM_CAR_IDS.stock] = getDriverProfileStockScheme(driverProfile);

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
  "patricia-dempsey-lmp": {
    primary: 0xff7a18,
    secondary: 0x1b9a4a,
    stripe: 0xf6f2e8,
    glass: 0x7edfff,
    patriciaBoss: true,
  },
};
lmpPaintSchemes[PROFILE_TEAM_CAR_IDS.lmp] = getDriverProfileLmpScheme(driverProfile);

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
jeepPaintSchemes[PROFILE_TEAM_CAR_IDS.jeep] = getDriverProfileJeepScheme(driverProfile);

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
corvettePaintSchemes[PROFILE_TEAM_CAR_IDS.corvette] = getDriverProfileCorvetteScheme(driverProfile);
updateProfileTeamLabels();

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
    boostPowerScale: 1.416,
    boostRechargeRate: 2,
    boostBrakeRechargeRate: 6.8,
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
carProfiles[PROFILE_TEAM_CAR_IDS.formula] = carProfiles.ferraro;
carProfiles["louisa-hampton-formula"] = carProfiles.ferraro;
for (const stockId of ["thunder-stock", "jade-stock", "grape-stock", "geoff-corden-stock"]) {
  carProfiles[stockId] = carProfiles["orange-stock"];
}
carProfiles[PROFILE_TEAM_CAR_IDS.stock] = carProfiles["orange-stock"];
for (const lmpId of ["scarlet-lmp", "ocean-lmp", "volt-lmp", "patricia-dempsey-lmp"]) {
  carProfiles[lmpId] = carProfiles.lmp;
}
carProfiles[PROFILE_TEAM_CAR_IDS.lmp] = carProfiles.lmp;
for (const corvetteId of ["vette-white", "vette-red", "vette-striped"]) {
  carProfiles[corvetteId] = carProfiles["vette-yellow"];
}
carProfiles[PROFILE_TEAM_CAR_IDS.corvette] = carProfiles["vette-yellow"];
for (const jeepId of ["forest-jeep", "rescue-jeep", "storm-jeep"]) {
  carProfiles[jeepId] = carProfiles["dune-jeep"];
}
carProfiles[PROFILE_TEAM_CAR_IDS.jeep] = carProfiles["dune-jeep"];

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
  collisionGripTimer: 0,
  collisionGripLoss: 0,
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
  opponentEngines: [],
  opponentEngineMaster: null,
  tireNoise: null,
  surfaceNoise: null,
  kerbNoise: null,
  tireGain: null,
  surfaceGain: null,
  kerbGain: null,
  tireFilter: null,
  surfaceFilter: null,
  kerbFilter: null,
  crowdBuffer: null,
  crowdLoading: false,
  crowdVoices: [],
  natureBuffers: {},
  natureLoading: {},
  natureVoices: [],
  natureVoiceTimeOfDay: "",
  collisionCooldown: 0,
};

const menuAudio = {
  element: null,
};
const editorAudio = {
  element: null,
  playlist: [],
  index: 0,
};
const raceIntroAudio = {
  element: null,
  timeOfDay: "",
};
startMenuMusic();

const clock = new THREE.Clock();
let cameraTarget = new THREE.Vector3();
let cameraPosition = new THREE.Vector3();
const scratchForward = new THREE.Vector3();
const scratchRight = new THREE.Vector3();
const scratchLightPosition = new THREE.Vector3();
const scratchZeroVelocity = new THREE.Vector3();
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
const AI_LAUNCH_STEER_LIMIT_SECONDS = 2;
const CYBORG_LINE_SAMPLE_DISTANCE = 1.25;
const CYBORG_BASE_BRAKING_LOOKAHEAD_SCALE = 0.1;
const BOSS_FAST_CYBORG_LINE_FRACTION = 0.4;
const BOSS_MODE_NEAR_PLAYER_SECONDS = 4;
const kataraStockCyborgLines = createCyborgRacingLines(kataraStockCyborgTraining);
const kataraStockCyborgLine = kataraStockCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const kataraFormulaCyborgLines = createCyborgRacingLines(kataraFormulaCyborgTraining);
const kataraFormulaCyborgLine = kataraFormulaCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const kataraLmpCyborgLines = createCyborgRacingLines(kataraLmpCyborgTraining);
const kataraLmpCyborgLine = kataraLmpCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const kyoshiStockCyborgLines = createCyborgRacingLines(kyoshiStockCyborgTraining);
const kyoshiStockCyborgLine = kyoshiStockCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const kyoshiFormulaCyborgLines = createCyborgRacingLines(kyoshiFormulaCyborgTraining);
const kyoshiFormulaCyborgLine = kyoshiFormulaCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const kyoshiLmpCyborgLines = createCyborgRacingLines(kyoshiLmpCyborgTraining);
const kyoshiLmpCyborgLine = kyoshiLmpCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const makoStockCyborgLines = createCyborgRacingLines(makoStockCyborgTraining);
const makoStockCyborgLine = makoStockCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const makoFormulaCyborgLines = createCyborgRacingLines(makoFormulaCyborgTraining);
const makoFormulaCyborgLine = makoFormulaCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const makoLmpCyborgLines = createCyborgRacingLines(makoLmpCyborgTraining);
const makoLmpCyborgLine = makoLmpCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const yueStockCyborgLines = createCyborgRacingLines(yueStockCyborgTraining);
const yueStockCyborgLine = yueStockCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const yueFormulaCyborgLines = createCyborgRacingLines(yueFormulaCyborgTraining);
const yueFormulaCyborgLine = yueFormulaCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const yueLmpCyborgLines = createCyborgRacingLines(yueLmpCyborgTraining);
const yueLmpCyborgLine = yueLmpCyborgLines[0] ?? { samples: [], totalDistance: 0, sourceLapTime: null };
const cyborgLineBanksByClass = {
  stock: {
    [KATARA_TRACK_ID]: { lines: kataraStockCyborgLines, fallback: kataraStockCyborgLine },
    [KYOSHI_TRACK_ID]: { lines: kyoshiStockCyborgLines, fallback: kyoshiStockCyborgLine },
    [MAKO_TRACK_ID]: { lines: makoStockCyborgLines, fallback: makoStockCyborgLine },
    [YUE_TRACK_ID]: { lines: yueStockCyborgLines, fallback: yueStockCyborgLine },
  },
  formula: {
    [KATARA_TRACK_ID]: { lines: kataraFormulaCyborgLines, fallback: kataraFormulaCyborgLine },
    [KYOSHI_TRACK_ID]: { lines: kyoshiFormulaCyborgLines, fallback: kyoshiFormulaCyborgLine },
    [MAKO_TRACK_ID]: { lines: makoFormulaCyborgLines, fallback: makoFormulaCyborgLine },
    [YUE_TRACK_ID]: { lines: yueFormulaCyborgLines, fallback: yueFormulaCyborgLine },
  },
  lmp: {
    [KATARA_TRACK_ID]: { lines: kataraLmpCyborgLines, fallback: kataraLmpCyborgLine },
    [KYOSHI_TRACK_ID]: { lines: kyoshiLmpCyborgLines, fallback: kyoshiLmpCyborgLine },
    [MAKO_TRACK_ID]: { lines: makoLmpCyborgLines, fallback: makoLmpCyborgLine },
    [YUE_TRACK_ID]: { lines: yueLmpCyborgLines, fallback: yueLmpCyborgLine },
  },
};
let aiRacingLineDebug = null;
let wasLookingBehind = false;
const slipstreamDebugCones = new Map();
const SHOW_SLIPSTREAM_DEBUG_CONES = false;
const SHOW_AI_RACING_LINE_DEBUG = false;
const AI_LAUNCH_LANE_LOCK_SECONDS = 3;
const AI_LAUNCH_LANE_MERGE_SECONDS = 7;
const AI_START_PACK_CAUTION_SECONDS = 12;
const RACE_GRID_INTRO_SECONDS = 6;
const MAX_ACTIVE_AI_HEADLIGHT_BEAMS = 4;
const LOW_GRAPHICS_SIMPLE_CAR_DISTANCE = 140;
const ONLINE_REMOTE_INTERPOLATION_DELAY_MS = 180;
const ONLINE_REMOTE_MAX_PREDICTION_MS = 260;
const ONLINE_REMOTE_MAX_SNAP_DISTANCE = 18;
const SLIPSTREAM_MIN_SPEED = 20;
const SLIPSTREAM_START_DISTANCE = 0;
const SLIPSTREAM_PEAK_DISTANCE = 38.5;
const SLIPSTREAM_END_DISTANCE = 55;
const CAR_VISUAL_RIDE_HEIGHT = 0.11;
scene.add(dirtGroup);
initDirtParticles();
initCollisionSmokeParticles();
initSparkParticles();

resetCar();
renderer.setAnimationLoop(update);

function update() {
  const dt = Math.min(clock.getDelta(), 1 / 30);
  const raceStartBlocked = updateRaceCountdown(dt);
  if (gameStarted && !isPaused && !isMenuOpen() && !raceStartBlocked) {
    if (isQuickRacePlayerFinished()) updatePostRacePlayerJoyride(dt);
    else updateCar(dt);
  }
  if (gameStarted && !isPaused && !isMenuOpen() && !raceStartBlocked) updateAiOpponents(dt);
  if (gameStarted && !isPaused && !isMenuOpen() && !raceStartBlocked) resolveRaceCarCollisions(dt);
  if (gameStarted && !isPaused && !isMenuOpen() && !raceStartBlocked) resolveOnlineSoftRemoteCollisions(dt);
  updateOnlineRaceNetworking(dt);
  updateTimeTrialGhost(dt);
  updateSlipstreamDebugCones();
  updateQuickRaceState(dt, raceStartBlocked);
  updateRaceLeaderboard(dt);
  updateBossModeHud(dt);
  if (!gameStarted || isPaused || isMenuOpen()) updateRevMeter();
  if (isTimeTrialGameMode()) {
    updateTimeTrialLapCard(dt);
    updateTimeTrialHud();
  }
  if (selectedGameMode !== "quick-race" || isPaused || isMenuOpen()) updateAiDebugPanel(window.paddockAiDebugSummary ?? null);
  if (isMenuOpen()) updateMenuPreview(dt);
  updateCamera(dt);
  updateSkyObjects();
  updateSceneryVisibility();
  updateSceneryLights();
  updateSessionMenuButton();
  updateControlsReminderVisibility();
  audioState.collisionCooldown = Math.max(0, (audioState.collisionCooldown ?? 0) - dt);
  updateCrowdAudio(dt);
  updateNatureAudio(dt);
  updateOpponentEngineAudio(dt);
  updateOnlineSessionRoomCodeHud();
  if (!gameStarted || isPaused || isMenuOpen() || raceStartBlocked) updateDraftCue(0);
  renderer.render(scene, camera);
}

function updateSceneryLights() {
  if (!sceneryLights.length) return;
  const reference = gameStarted ? carState.position : camera.position;
  for (const light of sceneryLights) {
    light.getWorldPosition(scratchLightPosition);
    const maxDistance = (light.userData.baseMaxDistance ?? 125) * getSceneryLightVisibilityMultiplier(light.userData.lightRole);
    light.visible = scratchLightPosition.distanceToSquared(reference) < maxDistance * maxDistance;
  }
}

function updateSceneryVisibility() {
  if (!sceneryCullables.length) return;
  const reference = gameStarted ? carState.position : camera.position;
  for (const object of sceneryCullables) {
    object.getWorldPosition(scratchLightPosition);
    const distanceSq = scratchLightPosition.distanceToSquared(reference);
    const multiplier = getSceneryVisibilityMultiplier();
    const visibleDistanceSq = ((object.userData.baseVisibleDistance ?? 520) * multiplier) ** 2;
    const hiddenDistanceSq = ((object.userData.baseHiddenDistance ?? 603) * multiplier) ** 2;
    object.visible = object.visible
      ? distanceSq < hiddenDistanceSq
      : distanceSq < visibleDistanceSq;
  }
}

function resolveRaceCarCollisions(dt) {
  if (!(selectedGameMode === "quick-race" || isOnlineRaceGameMode()) || !aiOpponents.length) return;
  const bodies = [
    {
      kind: "player",
      position: carState.position,
      velocity: carState.velocity,
      headingRef: carState,
      get heading() { return carState.heading; },
      profile: getCarProfile(),
      root: car.root,
    },
    ...aiOpponents.map((opponent) => ({
      kind: "ai",
      opponent,
      position: opponent.position,
      velocity: opponent.velocity,
      headingRef: opponent,
      get heading() { return opponent.heading; },
      profile: opponent.profile ?? getCarProfileById(opponent.carId),
      root: opponent.car.root,
    })),
  ];

  for (let i = 0; i < bodies.length; i += 1) {
    for (let j = i + 1; j < bodies.length; j += 1) {
      resolveRaceCarPairCollision(bodies[i], bodies[j], dt);
    }
  }

  syncCarVisualRoot(car.root, carState.position);
  car.root.rotation.set(0, carState.heading, 0);
  for (const opponent of aiOpponents) {
    opponent.speed = opponent.velocity.length();
    syncCarVisualRoot(opponent.car.root, opponent.position);
    opponent.car.root.rotation.set(0, opponent.heading, 0);
  }
}

function syncCarVisualRoot(root, position) {
  if (!root || !position) return;
  root.position.copy(position);
  root.position.y += CAR_VISUAL_RIDE_HEIGHT;
}

function resolveRaceCarPairCollision(a, b, dt) {
  const boxA = getRaceCarCollisionBox(a);
  const boxB = getRaceCarCollisionBox(b);
  const overlap = getOrientedBoxOverlap(boxA, boxB);
  if (!overlap) return;

  const normal = overlap.normal;
  const contactPoint = a.position.clone().add(b.position).multiplyScalar(0.5);
  const contactSeverityA = getCollisionContactSeverity(a, normal);
  const contactSeverityB = getCollisionContactSeverity(b, normal.clone().multiplyScalar(-1));
  const impactBias = Math.max(contactSeverityA.frontRear, contactSeverityB.frontRear);
  const scrapeBias = Math.max(contactSeverityA.side, contactSeverityB.side);
  const correction = overlap.depth + 0.015;
  const totalInvMass = boxA.invMass + boxB.invMass;
  if (totalInvMass <= 0) return;
  a.position.addScaledVector(normal, -correction * (boxA.invMass / totalInvMass));
  b.position.addScaledVector(normal, correction * (boxB.invMass / totalInvMass));

  const relativeVelocity = b.velocity.clone().sub(a.velocity);
  const closingSpeed = relativeVelocity.dot(normal);
  const impactSpeed = Math.abs(closingSpeed);
  if (closingSpeed < 0) {
    const restitution = THREE.MathUtils.lerp(0.16, 0.86, impactBias);
    const impulseStrength = -((1 + restitution) * closingSpeed) / totalInvMass;
    a.velocity.addScaledVector(normal, -impulseStrength * boxA.invMass);
    b.velocity.addScaledVector(normal, impulseStrength * boxB.invMass);
  }
  if (a.kind === "player" || b.kind === "player") playCollisionSound(impactSpeed, "car");
  if (impactSpeed > 13) spawnCrashSparks(contactPoint, normal, impactSpeed);

  const scrapeAxis = new THREE.Vector3(normal.z, 0, -normal.x);
  const scrapeSpeed = b.velocity.clone().sub(a.velocity).dot(scrapeAxis);
  const scrapeDrag = THREE.MathUtils.lerp(0.018, 0.085, scrapeBias) * THREE.MathUtils.clamp(Math.abs(scrapeSpeed) / 24, 0.35, 1.25);
  a.velocity.addScaledVector(scrapeAxis, scrapeSpeed * scrapeDrag);
  b.velocity.addScaledVector(scrapeAxis, -scrapeSpeed * scrapeDrag);

  const yawKick = THREE.MathUtils.clamp(normal.x * Math.cos(a.heading) - normal.z * Math.sin(a.heading), -1, 1) * THREE.MathUtils.lerp(0.006, 0.026, impactBias);
  a.headingRef.heading -= yawKick;
  b.headingRef.heading += yawKick;
  if (a.kind === "player") applyCollisionGripLoss(impactSpeed, scrapeBias);
  if (b.kind === "player") applyCollisionGripLoss(impactSpeed, scrapeBias);
}

function getCollisionContactSeverity(body, normal) {
  const forward = new THREE.Vector3(Math.sin(body.heading), 0, Math.cos(body.heading));
  const frontRear = Math.abs(normal.dot(forward));
  const side = 1 - frontRear;
  return { frontRear, side };
}

function applyCollisionGripLoss(impactSpeed, scrapeBias = 0) {
  const severity = THREE.MathUtils.clamp((impactSpeed - 7) / 26, 0, 1);
  if (severity <= 0) return;
  carState.collisionGripLoss = Math.max(carState.collisionGripLoss, THREE.MathUtils.lerp(0.12, 0.42, severity) * THREE.MathUtils.lerp(0.78, 1, 1 - scrapeBias));
  carState.collisionGripTimer = Math.max(carState.collisionGripTimer, THREE.MathUtils.lerp(0.3, 0.85, severity));
}

function getRaceCarCollisionBox(body) {
  const dims = getRaceCarCollisionDimensions(body.profile?.kind);
  const forward = new THREE.Vector3(Math.sin(body.heading), 0, Math.cos(body.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const speed = body.velocity?.length?.() ?? 0;
  return {
    center: body.position,
    forward,
    right,
    halfLength: dims.halfLength,
    halfWidth: dims.halfWidth,
    invMass: 1 / THREE.MathUtils.lerp(dims.mass, dims.mass * 1.35, THREE.MathUtils.smoothstep(speed, 12, 48)),
  };
}

function getRaceCarCollisionDimensions(kind = "formula") {
  if (kind === "stock") return { halfLength: 2.64, halfWidth: 1.31, mass: 1.22 };
  if (kind === "lmp") return { halfLength: 2.72, halfWidth: 1.23, mass: 1.08 };
  if (kind === "jeep") return { halfLength: 2.26, halfWidth: 1.23, mass: 1.3 };
  if (kind === "corvette") return { halfLength: 2.58, halfWidth: 1.19, mass: 1.12 };
  return { halfLength: 2.76, halfWidth: 1.18, mass: 0.92 };
}

function getOrientedBoxOverlap(a, b) {
  const axes = [a.forward, a.right, b.forward, b.right];
  const delta = b.center.clone().sub(a.center);
  let minOverlap = Infinity;
  let bestAxis = null;
  for (const axis of axes) {
    const projectionDistance = Math.abs(delta.dot(axis));
    const radiusA = getBoxProjectionRadius(a, axis);
    const radiusB = getBoxProjectionRadius(b, axis);
    const overlap = radiusA + radiusB - projectionDistance;
    if (overlap <= 0) return null;
    if (overlap < minOverlap) {
      minOverlap = overlap;
      bestAxis = axis.clone().multiplyScalar(delta.dot(axis) < 0 ? -1 : 1);
    }
  }
  return { normal: bestAxis, depth: minOverlap };
}

function getBoxProjectionRadius(box, axis) {
  return box.halfLength * Math.abs(axis.dot(box.forward)) + box.halfWidth * Math.abs(axis.dot(box.right));
}

function getPlayerSlipstreamBody() {
  return {
    id: "player",
    position: carState.position,
    velocity: carState.velocity,
    heading: carState.heading,
  };
}

function getAiSlipstreamBody(opponent) {
  return {
    id: opponent.id ?? `ai-${opponent.gridPosition ?? 0}`,
    position: opponent.position,
    velocity: opponent.velocity,
    heading: opponent.heading,
  };
}

function getSlipstreamBodies() {
  if (!gameStarted || isMenuOpen()) return [];
  return [
    getPlayerSlipstreamBody(),
    ...aiOpponents.map((opponent, index) => ({
      id: opponent.id ?? `ai-${index}`,
      position: opponent.position,
      velocity: opponent.velocity,
      heading: opponent.heading,
    })),
  ];
}

function getSlipstreamStrength(trailingBody) {
  if (!trailingBody || (trailingBody.velocity?.length?.() ?? 0) < SLIPSTREAM_MIN_SPEED) return 0;
  let best = 0;
  for (const lead of getSlipstreamBodies()) {
    if (lead.id === trailingBody.id) continue;
    const leadSpeed = lead.velocity?.length?.() ?? 0;
    if (leadSpeed < SLIPSTREAM_MIN_SPEED) continue;
    const leadForward = new THREE.Vector3(Math.sin(lead.heading), 0, Math.cos(lead.heading));
    const leadRight = new THREE.Vector3(leadForward.z, 0, -leadForward.x);
    const delta = trailingBody.position.clone().sub(lead.position);
    const behindDistance = -delta.dot(leadForward);
    if (behindDistance < SLIPSTREAM_START_DISTANCE || behindDistance > SLIPSTREAM_END_DISTANCE) continue;
    const lateral = Math.abs(delta.dot(leadRight));
    const allowedWidth = THREE.MathUtils.lerp(2.2, 4.6, THREE.MathUtils.clamp(behindDistance / SLIPSTREAM_END_DISTANCE, 0, 1));
    if (lateral > allowedWidth) continue;
    const trailingForward = new THREE.Vector3(Math.sin(trailingBody.heading), 0, Math.cos(trailingBody.heading));
    const alignment = trailingForward.dot(leadForward);
    if (alignment < 0.62) continue;
    const speedFactor = THREE.MathUtils.smoothstep(Math.min(leadSpeed, trailingBody.velocity.length()), SLIPSTREAM_MIN_SPEED, 44);
    const distanceFactor = behindDistance <= SLIPSTREAM_PEAK_DISTANCE
      ? THREE.MathUtils.smoothstep(behindDistance, SLIPSTREAM_START_DISTANCE, SLIPSTREAM_PEAK_DISTANCE)
      : 1 - THREE.MathUtils.smoothstep(behindDistance, SLIPSTREAM_PEAK_DISTANCE, SLIPSTREAM_END_DISTANCE);
    const lateralFactor = 1 - THREE.MathUtils.smoothstep(lateral, allowedWidth * 0.28, allowedWidth);
    const alignmentFactor = THREE.MathUtils.smoothstep(alignment, 0.62, 0.96);
    best = Math.max(best, speedFactor * distanceFactor * lateralFactor * alignmentFactor);
  }
  return THREE.MathUtils.clamp(best, 0, 1);
}

function updateDraftCue(strength = 0) {
  const active = gameStarted && !isMenuOpen() && strength > 0.08;
  if (draftCueEl) {
    draftCueEl.hidden = !active;
    draftCueEl.style.opacity = active ? String(THREE.MathUtils.lerp(0.72, 1, THREE.MathUtils.clamp(strength, 0, 1))) : "0";
  }
  speedEl?.parentElement?.classList.toggle("is-drafting", active);
}

function getLeadSlipstreamActivity(leadBody, bodies) {
  let best = 0;
  for (const trailing of bodies) {
    if (trailing.id === leadBody.id) continue;
    best = Math.max(best, getSlipstreamStrengthFromLead(trailing, leadBody));
  }
  return best;
}

function getSlipstreamStrengthFromLead(trailingBody, lead) {
  if ((trailingBody.velocity?.length?.() ?? 0) < SLIPSTREAM_MIN_SPEED || (lead.velocity?.length?.() ?? 0) < SLIPSTREAM_MIN_SPEED) return 0;
  const leadForward = new THREE.Vector3(Math.sin(lead.heading), 0, Math.cos(lead.heading));
  const leadRight = new THREE.Vector3(leadForward.z, 0, -leadForward.x);
  const delta = trailingBody.position.clone().sub(lead.position);
  const behindDistance = -delta.dot(leadForward);
  if (behindDistance < SLIPSTREAM_START_DISTANCE || behindDistance > SLIPSTREAM_END_DISTANCE) return 0;
  const lateral = Math.abs(delta.dot(leadRight));
  const allowedWidth = THREE.MathUtils.lerp(2.2, 4.6, THREE.MathUtils.clamp(behindDistance / SLIPSTREAM_END_DISTANCE, 0, 1));
  if (lateral > allowedWidth) return 0;
  const trailingForward = new THREE.Vector3(Math.sin(trailingBody.heading), 0, Math.cos(trailingBody.heading));
  const alignment = trailingForward.dot(leadForward);
  if (alignment < 0.62) return 0;
  const speedFactor = THREE.MathUtils.smoothstep(Math.min(lead.velocity.length(), trailingBody.velocity.length()), SLIPSTREAM_MIN_SPEED, 44);
  const distanceFactor = behindDistance <= SLIPSTREAM_PEAK_DISTANCE
    ? THREE.MathUtils.smoothstep(behindDistance, SLIPSTREAM_START_DISTANCE, SLIPSTREAM_PEAK_DISTANCE)
    : 1 - THREE.MathUtils.smoothstep(behindDistance, SLIPSTREAM_PEAK_DISTANCE, SLIPSTREAM_END_DISTANCE);
  const lateralFactor = 1 - THREE.MathUtils.smoothstep(lateral, allowedWidth * 0.28, allowedWidth);
  const alignmentFactor = THREE.MathUtils.smoothstep(alignment, 0.62, 0.96);
  return THREE.MathUtils.clamp(speedFactor * distanceFactor * lateralFactor * alignmentFactor, 0, 1);
}

function updateSlipstreamDebugCones() {
  if (!SHOW_SLIPSTREAM_DEBUG_CONES) {
    for (const cone of slipstreamDebugCones.values()) cone.visible = false;
    return;
  }
  const visible = gameStarted && !isMenuOpen();
  const bodies = visible ? getSlipstreamBodies() : [];
  const activeIds = new Set();
  for (const lead of bodies) {
    const activity = getLeadSlipstreamActivity(lead, bodies);
    if (activity <= 0.08) continue;
    activeIds.add(lead.id);
    const cone = getSlipstreamDebugCone(lead.id);
    const forward = new THREE.Vector3(Math.sin(lead.heading), 0, Math.cos(lead.heading));
    const apex = lead.position.clone().addScaledVector(forward, 2.8);
    cone.position.copy(apex).addScaledVector(forward, -SLIPSTREAM_END_DISTANCE * 0.5);
    cone.position.y = track.groundY + 1.1;
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), forward);
    cone.material.opacity = THREE.MathUtils.lerp(0.14, 0.36, activity);
    cone.visible = true;
  }
  for (const [id, cone] of slipstreamDebugCones.entries()) {
    if (!activeIds.has(id)) cone.visible = false;
  }
}

function getSlipstreamDebugCone(id) {
  if (slipstreamDebugCones.has(id)) return slipstreamDebugCones.get(id);
  const material = new THREE.MeshBasicMaterial({
    color: 0x39a7ff,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const cone = new THREE.Mesh(new THREE.ConeGeometry(4.8, SLIPSTREAM_END_DISTANCE, 24, 1, true), material);
  cone.renderOrder = 6;
  scene.add(cone);
  slipstreamDebugCones.set(id, cone);
  return cone;
}

function updateCar(dt) {
  const profile = getCarProfile();
  const rawThrottle = pressed("KeyW", "ArrowUp") ? 1 : 0;
  const throttle = isQuickRacePenaltyServing() ? 0 : rawThrottle;
  const brake = pressed("KeyS", "ArrowDown") ? 1 : 0;
  const ersPressed = pressed("ShiftLeft", "ShiftRight");
  const steerInput = (pressed("KeyA", "ArrowLeft") ? 1 : 0) - (pressed("KeyD", "ArrowRight") ? 1 : 0);
  const handbrake = pressed("KeyC") ? 1 : 0;
  const surface = track.sample(carState.position.x, carState.position.z);
  const wheelSurface = getWheelSurfaceState();
  updateQuickRacePenalties(dt, wheelSurface);
  updateOnlineRacePenalties(dt, wheelSurface);

  scratchForward.set(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  scratchRight.set(scratchForward.z, 0, -scratchForward.x);

  let forwardSpeed = carState.velocity.dot(scratchForward);
  let lateralSpeed = carState.velocity.dot(scratchRight);
  const speedAbs = carState.velocity.length();
  const slipstreamStrength = getSlipstreamStrength(getPlayerSlipstreamBody());
  updateDraftCue(slipstreamStrength);
  const topSpeedRatio = THREE.MathUtils.clamp(speedAbs / profile.maxForwardSpeed, 0, 1);
  carState.collisionGripTimer = Math.max(0, carState.collisionGripTimer - dt);
  if (carState.collisionGripTimer <= 0) carState.collisionGripLoss = THREE.MathUtils.damp(carState.collisionGripLoss, 0, 3.5, dt);
  const collisionGripScale = 1 - THREE.MathUtils.clamp(carState.collisionGripLoss, 0, 0.42);
  const coasting = throttle === 0 && brake === 0 ? 1 : 0;
  const lmpCoastTurnBoost = profile.kind === "lmp" && coasting
    ? THREE.MathUtils.lerp(1.38, 1.18, topSpeedRatio)
    : 1;
  const canStartBoost = carState.ers >= getBoostStartThreshold(profile);
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
  const slipstreamTopSpeedScale = 1 + slipstreamStrength * 0.0585;
  const slipstreamPowerScale = 1 + slipstreamStrength * 0.104;
  const slipstreamDragScale = 1 - slipstreamStrength * 0.286;
  const maxForwardSpeed = profile.maxForwardSpeed * surfaceTopSpeedScale * (boostActive ? boostPowerScale : 1) * slipstreamTopSpeedScale;
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
  const grip = surfaceGrip * downforceGrip * coastRotationBoost * (handbrake ? tuning.handbrakeGrip : 1) * collisionGripScale;

  if (throttle) {
    const powerFade = 1 - THREE.MathUtils.clamp(forwardSpeed / maxForwardSpeed, 0, 1);
    const steeringLoad = Math.abs(carState.steer) / Math.max(maxSteer, 0.001);
    const cornerAccelPenalty = 1 - 0.28 * steeringLoad * THREE.MathUtils.smoothstep(speedAbs, 2, 42);
    const gearPowerScale = getManualPowerScale(forwardSpeed, profile);
    forwardSpeed +=
      profile.engineForce *
      surfaceAccelerationScale *
      (boostActive ? boostPowerScale : 1) *
      slipstreamPowerScale *
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

  const activeDrag = (tuning.drag + coasting * tuning.coastDrag) * slipstreamDragScale;
  const activeRollingResistance =
    tuning.rollingResistance +
    coasting * tuning.coastRollingResistance;
  forwardSpeed -= forwardSpeed * Math.abs(forwardSpeed) * activeDrag * dt;
  forwardSpeed = applyManualGearMismatchDrag(forwardSpeed, profile, dt);
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
  recordTimeTrialGhostSample(dt, {
    throttle,
    brake,
    steerInput,
    boostActive,
  });
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

  syncCarVisualRoot(car.root, carState.position);
  car.root.rotation.set(0, carState.heading, 0);

  const rollStrength = profile.kind === "jeep" ? 0.42 : 0.1;
  const rollTarget = carState.steer * THREE.MathUtils.clamp(speedAbs / (profile.kind === "jeep" ? 24 : 45), 0, 1) * rollStrength;
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
  setCarBodyLean(
    car,
    grassRockPitch + kerbWheelPitch + carState.kerbKickPitch,
    carState.visualRoll + grassRockRoll + kerbWheelRoll + carState.kerbKickRoll,
  );

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
  updateSurfaceAudio(dt, {
    speedAbs,
    brake,
    handbrake,
    lateralSpeed,
    yawRate: carState.yawRate,
    wheelSurface,
    offTrackEnvironment,
  });
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
    playCollisionSound(impactSpeed, obstacle.kind);
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
  const impactSeverity = Math.pow(hitRatio, 1.55);
  const scrapeSeverity = 1 - impactSeverity;
  const scrapeScale = THREE.MathUtils.lerp(0.92, 0.16, impactSeverity);
  const bounce = incomingSpeed > 0 ? Math.min(incomingSpeed * THREE.MathUtils.lerp(0.018, 0.13, impactSeverity), 1.05) : 0;

  carState.velocity
    .copy(wallDirection)
    .multiplyScalar(tangentSpeed * scrapeScale)
    .addScaledVector(normal, bounce);
  carState.yawRate *= THREE.MathUtils.lerp(0.88, 0.2, impactSeverity);
  const cornerKick = THREE.MathUtils.clamp(normal.x * scratchForward.z - normal.z * scratchForward.x, -1, 1);
  if (hitRatio > 0.28) carState.heading += cornerKick * THREE.MathUtils.lerp(0.026, 0.095, impactSeverity);
  applyCollisionGripLoss(Math.max(incomingSpeed, speedAbs * impactSeverity), scrapeSeverity);

  if (incomingSpeed > 3.5 && carState.collisionSmokeCooldown <= 0) {
    spawnCollisionSmoke(closest, normal, incomingSpeed);
    carState.collisionSmokeCooldown = 0.28;
  }
  playCollisionSound(Math.max(incomingSpeed, speedAbs > 4 ? 7 : 0), "wall");
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

  const rechargeRate = getBoostRechargeRate(profile, brake);
  carState.ers = Math.min(100, carState.ers + rechargeRate * dt);
}

function getBoostStartThreshold(profile) {
  if (profile.kind === "corvette") return 20;
  if (profile.kind === "formula") return 10;
  return 0.001;
}

function getBoostRechargeRate(profile, brake = false) {
  if (brake && Number.isFinite(profile.boostBrakeRechargeRate)) return profile.boostBrakeRechargeRate;
  return profile.boostRechargeRate ?? (brake ? 4 : 2);
}

function updateAiErs(opponent, dt, boostRequested, brake, profile) {
  if (!profile.hasErs) {
    opponent.ers = 0;
    opponent.boostActive = false;
    return false;
  }

  opponent.ers = THREE.MathUtils.clamp(opponent.ers ?? 100, 0, 100);
  const canStartBoost = opponent.ers >= getBoostStartThreshold(profile);
  const boostActive = Boolean(boostRequested && opponent.ers > 0 && (opponent.boostActive || canStartBoost));
  opponent.boostActive = boostActive;

  if (boostActive) {
    opponent.ers = Math.max(0, opponent.ers - (profile.boostDrainRate ?? 20) * dt);
    return true;
  }

  const rechargeRate = getBoostRechargeRate(profile, brake);
  opponent.ers = Math.min(100, opponent.ers + rechargeRate * dt);
  return false;
}

function updateTimeTrial(dt, wheelSurface) {
  if (!isTimeTrialGameMode() || !track.startLine) return;
  if (timeTrialState.running) timeTrialState.currentTime += dt;
  timeTrialState.wallPenaltyCooldown = Math.max(0, timeTrialState.wallPenaltyCooldown - dt);
  timeTrialState.wallPenaltyMessageTime = Math.max(0, timeTrialState.wallPenaltyMessageTime - dt);
  timeTrialState.trackLimitsPenaltyCooldown = Math.max(0, timeTrialState.trackLimitsPenaltyCooldown - dt);
  timeTrialState.trackLimitsPenaltyMessageTime = Math.max(0, timeTrialState.trackLimitsPenaltyMessageTime - dt);
  timeTrialState.saveMessageTime = Math.max(0, timeTrialState.saveMessageTime - dt);
  timeTrialState.segmentStatusHoldTime = Math.max(0, timeTrialState.segmentStatusHoldTime - dt);
  timeTrialState.sectorDeltaTime = Math.max(0, timeTrialState.sectorDeltaTime - dt);
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
    } else if (timeTrialState.running && timeTrialState.invalidated) {
      showTimeTrialLapCard({
        title: "Lap Invalidated",
        lapTime: timeTrialState.currentTime,
        segments: timeTrialState.currentSegments,
        details: ["Off Track", "Ghost not saved"],
        valid: false,
      });
    }
    timeTrialState.running = true;
    timeTrialState.currentTime = 0;
    resetTimeTrialSegments();
    startTimeTrialGhostLap();
    timeTrialState.invalidated = false;
    startDrivingLineRecordingLap();
    carState.ers = 100;
    updateErsHud();
  }

  timeTrialState.lastLineSide = currentSide;
}

function startTimeTrialGhostLap() {
  timeTrialState.currentGhostSamples = [];
  timeTrialState.ghostSampleTimer = 0;
}

function recordTimeTrialGhostSample(dt, input) {
  if (!isTimeTrialGameMode() || !timeTrialState.running || !track.samples?.length) return;
  timeTrialState.ghostSampleTimer += dt;
  if (timeTrialState.ghostSampleTimer < 0.05 && timeTrialState.currentGhostSamples.length > 0) return;
  timeTrialState.ghostSampleTimer = 0;
  const sampleIndex = getNearestSampleIndex(track.samples, carState.position);
  timeTrialState.currentGhostSamples.push({
    t: roundDrivingLineNumber(timeTrialState.currentTime),
    x: roundDrivingLineNumber(carState.position.x),
    y: roundDrivingLineNumber(carState.position.y),
    z: roundDrivingLineNumber(carState.position.z),
    heading: roundDrivingLineNumber(carState.heading),
    speed: roundDrivingLineNumber(carState.velocity.length()),
    throttle: input.throttle,
    brake: input.brake,
    steer: input.steerInput,
    boost: input.boostActive ? 1 : 0,
    ers: roundDrivingLineNumber(carState.ers),
    sampleIndex,
    progress: roundDrivingLineNumber(sampleIndex / Math.max(1, track.samples.length - 1), 5),
  });
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
  showTimeTrialSectorDelta(index, segmentTime);
  timeTrialState.currentSegmentStartTime = timeTrialState.currentTime;
  timeTrialState.currentSegmentIndex = Math.min(3, index + 1);
  updateTimeTrialHud();
}

function showTimeTrialSectorDelta(index, segmentTime) {
  const ghostSegments = timeTrialGhost.run?.segments ?? timeTrialGhost.run?.lap?.segments;
  const reference = Array.isArray(ghostSegments) ? ghostSegments[index] : null;
  if (!Number.isFinite(reference) || !Number.isFinite(segmentTime) || segmentTime <= 0) return;
  const delta = segmentTime - reference;
  timeTrialState.sectorDeltaValue = delta;
  timeTrialState.sectorDeltaText = `Sector ${index + 1}: ${formatSignedDelta(delta)}`;
  timeTrialState.sectorDeltaTime = 2.6;
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
  if (!isTimeTrialGameMode() || !timeTrialState.running) return;
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
  timeTrialState.currentGhostSamples = [];
  timeTrialState.ghostSampleTimer = 0;
  timeTrialState.invalidated = false;
  timeTrialState.wallPenaltyCooldown = 0;
  timeTrialState.wallPenaltyMessageTime = 0;
  timeTrialState.trackLimitsPenaltyCooldown = 0;
  timeTrialState.trackLimitsPenaltyMessageTime = 0;
  timeTrialState.saveMessageTime = 0;
  timeTrialState.saveMessageText = "My Best Saved";
  timeTrialState.lapCardTime = 0;
  timeTrialState.lapCard = null;
  timeTrialState.ghostDelta = null;
  timeTrialState.sectorDeltaTime = 0;
  timeTrialState.sectorDeltaText = "";
  timeTrialState.sectorDeltaValue = null;
  if (clearLaps) {
    timeTrialState.laps = [];
    timeTrialState.latestLapId = 0;
    timeTrialState.sessionBest = null;
    timeTrialState.sessionId = makeTimeTrialSessionId();
    loadLocalTimeTrialBest();
    refreshSelectedTimeTrialGhost();
    refreshTimeTrialBestReferences();
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
  const previousSessionBest = timeTrialState.sessionBest?.lapTime ?? Infinity;
  const previousLocalBest = timeTrialState.localBest?.lapTime ?? Infinity;
  const referenceGhostRun = timeTrialGhost.run;
  recordDrivingLineLap(lapTime);
  timeTrialState.latestLapId += 1;
  const ghostSamples = timeTrialState.currentGhostSamples.map((sample) => ({ ...sample }));
  timeTrialState.laps.push({ id: timeTrialState.latestLapId, time: lapTime, segments: [...timeTrialState.currentSegments], ghostSamples });
  timeTrialState.laps.sort((a, b) => a.time - b.time);
  const record = createLocalTimeTrialRecord(lapTime, timeTrialState.currentSegments, ghostSamples);
  maybeSaveSessionTimeTrialBest(record);
  maybeSaveLocalTimeTrialBest(record);
  refreshSelectedTimeTrialGhost();
  refreshTimeTrialBestReferences();
  const details = [
    ...getTimeTrialGhostComparisonDetails(lapTime, referenceGhostRun),
    lapTime < previousLocalBest ? "New My Best" : "",
  ].filter(Boolean);
  showTimeTrialLapCard({
    title: lapTime < previousLocalBest ? "New My Best" : "Lap Complete",
    lapTime,
    segments: timeTrialState.currentSegments,
    details,
    valid: true,
  });
  updateTimeTrialHud();
}

function getTimeTrialGhostComparisonDetails(lapTime, ghostRun) {
  const details = [];
  const ghostLapTime = ghostRun?.lapTime;
  if (Number.isFinite(ghostLapTime)) details.push(`Vs Ghost ${formatSignedDelta(lapTime - ghostLapTime)}`);
  return details;
}

function showTimeTrialLapCard({ title, lapTime, segments = [], details = [], valid = true }) {
  timeTrialState.lapCard = {
    title,
    lapTime,
    segments: [...segments],
    details,
    valid,
  };
  timeTrialState.lapCardTime = valid ? 8 : 6.4;
  updateTimeTrialLapCard(0);
}

function updateTimeTrialLapCard(dt) {
  if (timeTrialState.lapCardTime > 0) timeTrialState.lapCardTime = Math.max(0, timeTrialState.lapCardTime - dt);
  const visible = isTimeTrialGameMode() && gameStarted && !isMenuOpen() && timeTrialState.lapCard && timeTrialState.lapCardTime > 0;
  if (!timeTrialLapCardEl) return;
  timeTrialLapCardEl.hidden = !visible;
  if (!visible) return;
  const card = timeTrialState.lapCard;
  timeTrialLapCardEl.classList.toggle("is-invalidated", !card.valid);
  if (timeTrialLapCardTitleEl) timeTrialLapCardTitleEl.textContent = card.title;
  if (timeTrialLapCardTimeEl) timeTrialLapCardTimeEl.textContent = formatLapTime(card.lapTime);
  if (timeTrialLapCardDetailEl) timeTrialLapCardDetailEl.textContent = card.details.join("  |  ");
}

function refreshTimeTrialBestReferences() {
  const candidates = [
    ...(timeTrialState.localBest ? [{ time: timeTrialState.localBest.lapTime, segments: timeTrialState.localBest.segments }] : []),
    ...timeTrialState.laps,
  ].filter((lap) => Number.isFinite(lap.time ?? lap.lapTime) && Array.isArray(lap.segments));
  candidates.sort((a, b) => (a.time ?? a.lapTime) - (b.time ?? b.lapTime));
  timeTrialState.bestLapSegments = candidates[0]?.segments ? [...candidates[0].segments] : null;
  const fastest = [Infinity, Infinity, Infinity];
  for (const lap of candidates) {
    for (let i = 0; i < 3; i += 1) {
      const segment = lap.segments[i];
      if (Number.isFinite(segment) && segment > 0) fastest[i] = Math.min(fastest[i], segment);
    }
  }
  timeTrialState.fastestSegments = fastest.some(Number.isFinite) ? fastest : null;
}

function getTimeTrialStorageKey(versionOverride = null) {
  const profile = getCarProfile();
  const trackVersion = versionOverride ?? trackDefinitions[selectedTrack]?.version ?? "local-v1";
  return [
    "the-paddock",
    "time-trial-best",
    selectedTrack,
    trackVersion,
    profile.kind,
  ].join(":");
}

function getLegacyTimeTrialStorageKey(carId = selectedCar, versionOverride = null) {
  const profile = getCarProfileById(carId);
  const trackVersion = versionOverride ?? trackDefinitions[selectedTrack]?.version ?? "local-v1";
  return [
    "the-paddock",
    "time-trial-best",
    selectedTrack,
    trackVersion,
    profile.kind,
    carId,
    track.environment ?? "grass",
    track.timeOfDay ?? "day",
  ].join(":");
}

function loadLocalTimeTrialBest() {
  timeTrialState.localBest = null;
  clearTimeTrialGhost();
  try {
    let raw = window.localStorage?.getItem(getTimeTrialStorageKey());
    if (!raw) {
      raw = window.localStorage?.getItem(getTimeTrialStorageKey("local-v1"));
      if (raw) window.localStorage?.setItem(getTimeTrialStorageKey(), raw);
    }
    if (!raw) {
      raw = getLegacyTimeTrialBestForClass();
      if (raw) window.localStorage?.setItem(getTimeTrialStorageKey(), raw);
    }
    if (!raw) {
      raw = getEnvironmentTimeTrialBestForClass();
      if (raw) window.localStorage?.setItem(getTimeTrialStorageKey(), raw);
    }
    if (!raw) return;
    const best = JSON.parse(raw);
    if (!best || !Number.isFinite(best.lapTime) || !Array.isArray(best.segments)) return;
    timeTrialState.localBest = best;
  } catch {
    timeTrialState.localBest = null;
  }
}

function getLegacyTimeTrialBestForClass() {
  const profile = getCarProfile();
  const carIds = Object.entries(carProfiles)
    .filter(([, candidate]) => candidate?.kind === profile.kind)
    .map(([carId]) => carId);
  let bestRaw = "";
  let bestTime = Infinity;
  for (const carId of carIds) {
    try {
      const raw = window.localStorage?.getItem(getLegacyTimeTrialStorageKey(carId)) ??
        window.localStorage?.getItem(getLegacyTimeTrialStorageKey(carId, "local-v1"));
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (Number.isFinite(parsed?.lapTime) && parsed.lapTime < bestTime) {
        bestTime = parsed.lapTime;
        bestRaw = raw;
      }
    } catch {
      // Ignore old malformed local entries.
    }
  }
  return bestRaw;
}

function getEnvironmentTimeTrialBestForClass() {
  const profile = getCarProfile();
  const prefix = [
    "the-paddock",
    "time-trial-best",
    selectedTrack,
    trackDefinitions[selectedTrack]?.version ?? "local-v1",
    profile.kind,
  ].join(":");
  let bestRaw = "";
  let bestTime = Infinity;
  try {
    for (let i = 0; i < (window.localStorage?.length ?? 0); i += 1) {
      const key = window.localStorage.key(i);
      if (!key?.startsWith(`${prefix}:`)) continue;
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (Number.isFinite(parsed?.lapTime) && parsed.lapTime < bestTime) {
        bestTime = parsed.lapTime;
        bestRaw = raw;
      }
    }
  } catch {
    return bestRaw;
  }
  return bestRaw;
}

function makeTimeTrialSessionId() {
  return `tts-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createLocalTimeTrialRecord(lapTime, segments, ghostSamples = []) {
  const profile = getCarProfile();
  const hasGhost = Array.isArray(ghostSamples) && ghostSamples.length >= 20;
  const record = {
    type: "the-paddock-time-trial-record",
    version: 1,
    source: "local",
    id: makeTimeTrialRecordId(lapTime, segments),
    sessionId: timeTrialState.sessionId,
    sessionBest: false,
    uploadedAt: null,
    createdAt: new Date().toISOString(),
    game: {
      version: "local-v1",
      mode: "time-trial",
    },
    driver: {
      name: driverProfile.driverName || "Driver Name",
      team: driverProfile.teamName || "Team Name",
      primaryColor: normalizeHexColor(driverProfile.primaryColor, "#242833"),
      accentColor: normalizeHexColor(driverProfile.accentColor, "#f6f2e8"),
    },
    track: {
      id: selectedTrack,
      name: getSelectedTrackLabel(),
      version: trackDefinitions[selectedTrack]?.version ?? "local-v1",
    },
    car: {
      id: selectedCar,
      name: getSelectedCarLabel(),
      class: profile.kind,
    },
    lap: {
      clean: true,
      penaltySeconds: 0,
      invalidated: false,
      lapTime: roundDrivingLineNumber(lapTime),
      formattedLapTime: formatLapTime(lapTime),
      segments: segments.map((segment) => roundDrivingLineNumber(segment)),
      formattedSegments: segments.map((segment) => formatLapTime(segment)),
    },
  };
  if (hasGhost) {
    record.ghost = {
      sampleRateHz: 20,
      samples: ghostSamples.map((sample) => ({ ...sample })),
    };
  }
  return record;
}

function makeTimeTrialRecordId(lapTime, segments) {
  const base = [
    selectedTrack,
    trackDefinitions[selectedTrack]?.version ?? "local-v1",
    getCarProfile().kind,
    roundDrivingLineNumber(lapTime),
    ...segments.map((segment) => roundDrivingLineNumber(segment)),
    Date.now(),
  ].join(":");
  let hash = 0;
  for (let i = 0; i < base.length; i += 1) {
    hash = ((hash << 5) - hash + base.charCodeAt(i)) | 0;
  }
  return `tt-${Math.abs(hash).toString(36)}-${Date.now().toString(36)}`;
}

function maybeSaveLocalTimeTrialBest(record) {
  const lapTime = record?.lap?.lapTime;
  const segments = record?.lap?.segments;
  if (!Number.isFinite(lapTime) || lapTime <= 0 || !Array.isArray(segments) || segments.length < 3) return;
  const currentBest = timeTrialState.localBest;
  if (currentBest?.lapTime && lapTime >= currentBest.lapTime) return;
  const bestBase = {
    type: "the-paddock-local-time-trial-best",
    version: 2,
    recordId: record.id,
    createdAt: record.createdAt,
    driver: record.driver,
    track: record.track,
    car: record.car,
    lapTime,
    formattedLapTime: record.lap.formattedLapTime,
    segments,
    sourceRecord: {
      type: record.type,
      version: record.version,
    },
  };
  const bestWithGhost = record.ghost?.samples?.length ? {
    ...bestBase,
    ghost: {
      sampleRateHz: 20,
      samples: record.ghost.samples.map((sample) => ({ ...sample })),
    },
  } : bestBase;
  let savedBest = bestWithGhost;
  try {
    window.localStorage?.setItem(getTimeTrialStorageKey(), JSON.stringify(savedBest));
  } catch {
    savedBest = bestBase;
    try {
      window.localStorage?.setItem(getTimeTrialStorageKey(), JSON.stringify(savedBest));
    } catch {
      return;
    }
  }
  timeTrialState.localBest = savedBest;
  timeTrialState.saveMessageTime = 3;
  timeTrialState.saveMessageText = "My Best Saved";
}

function maybeSaveSessionTimeTrialBest(record) {
  const lapTime = record?.lap?.lapTime;
  if (!Number.isFinite(lapTime) || !record?.ghost?.samples?.length) return;
  if (timeTrialState.sessionBest?.lapTime && lapTime >= timeTrialState.sessionBest.lapTime) return;
  record.sessionBest = true;
  saveSessionBestTimeTrialRecord(record);
  timeTrialState.sessionBest = createBestFromTimeTrialRecord(record);
}

function saveSessionBestTimeTrialRecord(record) {
  if (!isValidTimeTrialRecord(record) || !record.ghost?.samples?.length) return false;
  try {
    const records = loadLocalTimeTrialRecords()
      .filter((candidate) => candidate.sessionId !== record.sessionId);
    records.push(record);
    saveLocalTimeTrialRecords(records);
    return true;
  } catch {
    return false;
  }
}

function loadLocalTimeTrialRecords() {
  try {
    const raw = window.localStorage?.getItem(TIME_TRIAL_RECORDS_KEY);
    const records = JSON.parse(raw ?? "[]");
    return Array.isArray(records) ? records.filter(isValidTimeTrialRecord) : [];
  } catch {
    return [];
  }
}

function saveLocalTimeTrialRecords(records) {
  const sorted = [...records]
    .filter(isValidTimeTrialRecord)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 80);
  try {
    window.localStorage?.setItem(TIME_TRIAL_RECORDS_KEY, JSON.stringify(sorted));
    return sorted;
  } catch {
    const compact = sorted.map((record, index) => index < 10 ? record : stripTimeTrialRecordGhost(record));
    try {
      window.localStorage?.setItem(TIME_TRIAL_RECORDS_KEY, JSON.stringify(compact));
      return compact;
    } catch {
      const minimal = sorted.map(stripTimeTrialRecordGhost);
      window.localStorage?.setItem(TIME_TRIAL_RECORDS_KEY, JSON.stringify(minimal));
      return minimal;
    }
  }
}

function saveLocalTimeTrialRecord(record) {
  if (!isValidTimeTrialRecord(record)) return false;
  try {
    const records = loadLocalTimeTrialRecords();
    const existingIndex = records.findIndex((candidate) => candidate.id === record.id);
    if (existingIndex >= 0) records[existingIndex] = record;
    else records.push(record);
    saveLocalTimeTrialRecords(records);
    return true;
  } catch {
    return false;
  }
}

function updateLocalTimeTrialRecord(recordId, updater) {
  try {
    const records = loadLocalTimeTrialRecords();
    const index = records.findIndex((record) => record.id === recordId);
    if (index < 0) return null;
    const updated = updater({ ...records[index] });
    if (!isValidTimeTrialRecord(updated)) return null;
    records[index] = updated;
    saveLocalTimeTrialRecords(records);
    return updated;
  } catch {
    return null;
  }
}

function isValidTimeTrialRecord(record) {
  return record?.type === "the-paddock-time-trial-record" &&
    Number.isFinite(record?.lap?.lapTime) &&
    Array.isArray(record?.lap?.segments) &&
    record.lap.segments.length >= 3 &&
    Boolean(record?.track?.id) &&
    Boolean(record?.car?.class);
}

function stripTimeTrialRecordGhost(record) {
  const { ghost, ...rest } = record;
  return rest;
}

function exportLocalTimeTrialRecords() {
  const records = loadLocalTimeTrialRecords();
  const payload = {
    type: "the-paddock-time-trial-records-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    driver: {
      name: driverProfile.driverName || "Driver Name",
      team: driverProfile.teamName || "Team Name",
    },
    recordCount: records.length,
    records,
  };
  downloadJsonFile(`the-paddock-time-trial-records-${safeFileName(driverProfile.teamName)}.json`, payload);
  setTimeTrialRecordsStatus(`Exported ${records.length} local record${records.length === 1 ? "" : "s"}.`);
}

async function importLocalTimeTrialRecords(event) {
  const file = event.target?.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const incoming = Array.isArray(parsed) ? parsed : parsed.records;
    if (!Array.isArray(incoming)) throw new Error("No records found");
    const current = loadLocalTimeTrialRecords();
    const byId = new Map(current.map((record) => [record.id, record]));
    let added = 0;
    let skipped = 0;
    for (const record of incoming) {
      const normalized = normalizeImportedTimeTrialRecord(record);
      if (!normalized) {
        skipped += 1;
        continue;
      }
      normalized.source = "imported";
      normalized.importedAt = new Date().toISOString();
      if (!byId.has(normalized.id)) added += 1;
      byId.set(normalized.id, normalized);
    }
    const merged = saveLocalTimeTrialRecords([...byId.values()]);
    syncBestRecordsFromHistory(merged);
    loadLocalTimeTrialBest();
    refreshSelectedTimeTrialGhost();
    updateDriverProfilePage();
    setTimeTrialRecordsStatus(`Imported ${added} record${added === 1 ? "" : "s"}.${skipped ? ` Skipped ${skipped}.` : ""}`);
  } catch {
    setTimeTrialRecordsStatus("Import failed. That file does not look like a Paddock time-trial records export.");
  } finally {
    if (event.target) event.target.value = "";
  }
}

function normalizeImportedTimeTrialRecord(record) {
  if (!record || typeof record !== "object") return null;
  if (record.type === "the-paddock-local-time-trial-best" && Number.isFinite(record.lapTime)) {
    const imported = {
      type: "the-paddock-time-trial-record",
      version: 1,
      id: record.recordId ?? `imported-${record.track?.id ?? "track"}-${record.car?.class ?? "car"}-${record.lapTime}`,
      createdAt: record.createdAt ?? new Date().toISOString(),
      game: { version: "imported-local", mode: "time-trial" },
      driver: record.driver ?? { name: "Driver Name", team: "Team Name" },
      track: record.track,
      car: record.car,
      lap: {
        clean: true,
        penaltySeconds: 0,
        invalidated: false,
        lapTime: record.lapTime,
        formattedLapTime: record.formattedLapTime ?? formatLapTime(record.lapTime),
        segments: record.segments ?? [],
        formattedSegments: (record.segments ?? []).map((segment) => formatLapTime(segment)),
      },
    };
    if (record.ghost?.samples?.length) imported.ghost = record.ghost;
    return isValidTimeTrialRecord(imported) ? imported : null;
  }
  return isValidTimeTrialRecord(record) ? record : null;
}

function syncBestRecordsFromHistory(records = loadLocalTimeTrialRecords()) {
  const bestByKey = new Map();
  for (const record of records.filter((candidate) => candidate.source === "local")) {
    const key = getTimeTrialRecordBestKey(record);
    const existing = bestByKey.get(key);
    if (!existing || record.lap.lapTime < existing.lap.lapTime) bestByKey.set(key, record);
  }
  for (const record of bestByKey.values()) {
    try {
      const best = createBestFromTimeTrialRecord(record);
      window.localStorage?.setItem(getTimeTrialStorageKeyForRecord(record), JSON.stringify(best));
    } catch {
      // Keep imported history even if best sync cannot be written.
    }
  }
}

function getTimeTrialRecordBestKey(record) {
  return [
    record.track.id,
    record.track.version ?? "local-v1",
    record.car.class,
  ].join(":");
}

function createBestFromTimeTrialRecord(record) {
  const best = {
    type: "the-paddock-local-time-trial-best",
    version: 2,
    recordId: record.id,
    createdAt: record.createdAt,
    driver: record.driver,
    track: record.track,
    car: record.car,
    lapTime: record.lap.lapTime,
    formattedLapTime: record.lap.formattedLapTime,
    segments: record.lap.segments,
    sourceRecord: {
      type: record.type,
      version: record.version,
    },
  };
  if (record.ghost?.samples?.length) best.ghost = record.ghost;
  return best;
}

function getTimeTrialStorageKeyForRecord(record) {
  return [
    "the-paddock",
    "time-trial-best",
    record.track.id,
    record.track.version ?? "local-v1",
    record.car.class,
  ].join(":");
}

function setTimeTrialRecordsStatus(message) {
  if (!timeTrialRecordsStatusEl) return;
  timeTrialRecordsStatusEl.textContent = message;
}

async function handleTimeTrialHistoryClick(event) {
  const button = event.target?.closest?.("[data-upload-time-trial-record]");
  if (!button) return;
  const recordId = button.dataset.uploadTimeTrialRecord;
  const record = loadLocalTimeTrialRecords().find((candidate) => candidate.id === recordId);
  if (!record) {
    setTimeTrialRecordsStatus("Could not find that ghost locally.");
    return;
  }
  button.disabled = true;
  button.textContent = "Uploading";
  const uploaded = await uploadTimeTrialRecordToSupabase(record);
  if (uploaded) {
    updateLocalTimeTrialRecord(record.id, (current) => ({
      ...current,
      uploadedAt: new Date().toISOString(),
    }));
    setTimeTrialRecordsStatus("Ghost uploaded properly.");
  } else {
    setTimeTrialRecordsStatus("Ghost upload failed. Local ghost is still saved.");
  }
  updateTimeTrialHistoryRecords();
}

function setTimeTrialOnlineStatus(message) {
  if (!timeTrialOnlineStatusEl) return;
  timeTrialOnlineStatusEl.textContent = message;
  updateTimeTrialOnlineGhostControls();
}

async function uploadCurrentSessionBestTimeTrial() {
  const recordId = timeTrialState.sessionBest?.recordId;
  const record = loadLocalTimeTrialRecords().find((candidate) => candidate.id === recordId);
  if (!record || !canUploadTimeTrialRecord(record)) return;
  if (timeTrialUploadSessionBestButton) {
    timeTrialUploadSessionBestButton.disabled = true;
    timeTrialUploadSessionBestButton.textContent = "Uploading";
  }
  const uploaded = await uploadTimeTrialRecordToSupabase(record);
  if (uploaded) {
    updateLocalTimeTrialRecord(record.id, (current) => ({
      ...current,
      uploadedAt: new Date().toISOString(),
    }));
    timeTrialState.saveMessageTime = 3;
    timeTrialState.saveMessageText = "Best Time Uploaded";
    setTimeTrialRecordsStatus("Ghost uploaded properly.");
    updateTimeTrialHistoryRecords();
  }
  updateTimeTrialHud();
}

function getSupabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    ...extra,
  };
}

function createSupabaseTimeTrialRow(record) {
  const segments = record?.lap?.segments ?? [];
  return {
    record_id: record.id,
    driver_name: record.driver?.name ?? "Driver Name",
    team_name: record.driver?.team ?? "Team Name",
    track_id: record.track?.id,
    track_version: record.track?.version ?? "local-v1",
    car_class: record.car?.class,
    car_id: record.car?.id ?? null,
    car_name: record.car?.name ?? null,
    lap_time: record.lap?.lapTime,
    segment_1: segments[0],
    segment_2: segments[1],
    segment_3: segments[2],
    ghost: record.ghost ?? null,
    record,
  };
}

function canUploadTimeTrialRecord(record) {
  return isValidTimeTrialRecord(record) &&
    Array.isArray(record.ghost?.samples) &&
    record.ghost.samples.length >= 20 &&
    record.lap.clean &&
    !record.lap.invalidated;
}

async function uploadTimeTrialRecordToSupabase(record) {
  if (!canUploadTimeTrialRecord(record)) return false;
  try {
    const response = await fetch(`${SUPABASE_TIME_TRIAL_RECORDS_URL}?on_conflict=record_id`, {
      method: "POST",
      headers: getSupabaseHeaders({
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      }),
      body: JSON.stringify(createSupabaseTimeTrialRow(record)),
    });
    if (!response.ok) throw new Error(await response.text());
    setTimeTrialOnlineStatus("Uploaded clean lap online.");
    return true;
  } catch {
    setTimeTrialOnlineStatus("Online upload failed.");
    return false;
  }
}

async function downloadOnlineTimeTrialGhostsForSelection() {
  if (selectedOnlineGhostFilter === "mine") {
    const records = getMatchingOnlineTimeTrialGhostRecords();
    selectedOnlineGhostRecordId = records[0]?.id ?? "";
    renderOnlineGhostList(records);
    refreshSelectedTimeTrialGhost();
    setTimeTrialOnlineStatus(records.length
      ? `Loaded ${records.length} uploaded ghost${records.length === 1 ? "" : "s"}.`
      : "No uploaded ghosts found for this track and car class yet.");
    return;
  }
  const carClass = getCarProfile().kind;
  const trackVersion = trackDefinitions[selectedTrack]?.version ?? "local-v1";
  setTimeTrialOnlineStatus("Loading online ghosts...");
  try {
    const query = {
      select: "record,created_at",
      track_id: `eq.${selectedTrack}`,
      car_class: `eq.${carClass}`,
      order: "lap_time.asc",
      limit: "10",
    };
    if (selectedOnlineGhostFilter !== "week") {
      query.track_version = `eq.${trackVersion}`;
    }
    if (selectedOnlineGhostFilter === "week") {
      query.created_at = `gte.${getMostRecentSundayFivePacificIso()}`;
    }
    const params = new URLSearchParams(query);
    const response = await fetch(`${SUPABASE_TIME_TRIAL_RECORDS_URL}?${params.toString()}`, {
      method: "GET",
      headers: getSupabaseHeaders({ Accept: "application/json" }),
    });
    if (!response.ok) throw new Error(await response.text());
    const rows = await response.json();
    const onlineRecords = rows
      .map((row) => {
        const record = normalizeImportedTimeTrialRecord(row.record);
        return record ? {
          ...record,
          source: "online",
          uploadedAt: row.created_at ?? record.uploadedAt,
          downloadedAt: new Date().toISOString(),
        } : null;
      })
      .filter(Boolean)
      .map((record) => ({
        ...record,
        source: "online",
      }));
    if (!onlineRecords.length) {
      selectedOnlineGhostRecordId = "";
      renderOnlineGhostList([]);
      setTimeTrialOnlineStatus(selectedOnlineGhostFilter === "week"
        ? "No ghosts found since Sunday 5pm Pacific."
        : "No online ghosts found for this track and car class yet.");
      return;
    }
    const current = loadLocalTimeTrialRecords();
    const byId = new Map(current.map((record) => [record.id, record]));
    for (const record of onlineRecords) byId.set(record.id, record);
    saveLocalTimeTrialRecords([...byId.values()]);
    selectedOnlineGhostRecordId = onlineRecords[0].id;
    renderOnlineGhostList(onlineRecords);
    if (selectedTimeTrialGhostMode === "online") refreshSelectedTimeTrialGhost();
    updateDriverProfilePage();
    setTimeTrialOnlineStatus(`Loaded ${onlineRecords.length} online ghost${onlineRecords.length === 1 ? "" : "s"}.`);
  } catch {
    renderOnlineGhostList([]);
    setTimeTrialOnlineStatus("Online download failed. Check Supabase table setup.");
  }
}

function selectOnlineGhostFilter(filter, options = {}) {
  selectedOnlineGhostFilter = selectedGameMode === "weekly-time-trial"
    ? (filter === "mine" ? "mine" : "week")
    : ["week", "mine"].includes(filter)
      ? filter
      : "top";
  selectedOnlineGhostRecordId = "";
  for (const button of timeTrialOnlineFilterButtons) {
    button.classList.toggle("is-selected", button.dataset.onlineGhostFilter === selectedOnlineGhostFilter);
  }
  if (options.skipDownload) return;
  if (selectedOnlineGhostFilter === "mine") {
    const records = getMatchingOnlineTimeTrialGhostRecords();
    selectedOnlineGhostRecordId = records[0]?.id ?? "";
    renderOnlineGhostList(records);
    refreshSelectedTimeTrialGhost();
    setTimeTrialOnlineStatus(records.length
      ? `Loaded ${records.length} uploaded ghost${records.length === 1 ? "" : "s"}.`
      : "No uploaded ghosts found for this track and car class yet.");
    return;
  }
  downloadOnlineTimeTrialGhostsForSelection();
}

function handleOnlineGhostListClick(event) {
  const button = event.target?.closest?.("[data-select-online-ghost]");
  if (!button) return;
  selectedOnlineGhostRecordId = button.dataset.selectOnlineGhost;
  refreshSelectedTimeTrialGhost();
  renderOnlineGhostList(getMatchingOnlineTimeTrialGhostRecords());
}

function renderOnlineGhostList(records = getMatchingOnlineTimeTrialGhostRecords()) {
  if (!timeTrialOnlineListEl) return;
  timeTrialOnlineListEl.replaceChildren();
  const selectedRecord = records.find((record) => record.id === selectedOnlineGhostRecordId) ?? records[0] ?? null;
  if (timeTrialSelectedOnlineGhostEl) {
    timeTrialSelectedOnlineGhostEl.hidden = !selectedRecord;
    timeTrialSelectedOnlineGhostEl.textContent = selectedRecord
      ? `Selected: ${selectedRecord.driver?.name ?? "Driver Name"} - ${formatLapTime(selectedRecord.lap?.lapTime ?? 0)}`
      : "";
  }
  if (!records.length) {
    const empty = document.createElement("li");
    empty.className = "is-empty";
    empty.textContent = "No ghosts loaded.";
    timeTrialOnlineListEl.appendChild(empty);
    return;
  }
  for (const [index, record] of records.slice(0, 10).entries()) {
    const row = document.createElement("li");
    row.className = record.id === selectedOnlineGhostRecordId ? "is-selected" : "";
    const driver = record.driver?.name ?? "Driver Name";
    const team = record.driver?.team ?? "Team Name";
    const shield = getTeamShieldMarkup(record.driver);
    row.innerHTML = `
      <div>
        <strong class="online-driver-name"><span class="online-rank">${index + 1}</span>${shield}${driver}</strong>
        <span>${team}</span>
        <small>${formatOnlineGhostSegmentSummary(record.lap.segments)}</small>
      </div>
      <div>
        <strong>${formatLapTime(record.lap.lapTime)}</strong>
        <small>${formatHistoryDate(record.createdAt)}</small>
        <button class="profile-action-button" type="button" data-select-online-ghost="${record.id}">${record.id === selectedOnlineGhostRecordId ? "Selected" : "Race This Ghost"}</button>
      </div>
    `;
    timeTrialOnlineListEl.appendChild(row);
  }
}

function getMostRecentSundayFivePacificIso(now = new Date()) {
  const parts = getPacificDateParts(now);
  const dayOffset = parts.weekday % 7;
  let cutoffUtc = Date.UTC(parts.year, parts.month - 1, parts.day - dayOffset, 17 + 8, 0, 0, 0);
  let cutoff = new Date(cutoffUtc);
  const actualHour = getPacificDateParts(cutoff).hour;
  cutoff = new Date(cutoff.getTime() + (17 - actualHour) * 60 * 60 * 1000);
  if (now < cutoff) cutoff = new Date(cutoff.getTime() - 7 * 24 * 60 * 60 * 1000);
  return cutoff.toISOString();
}

function formatOnlineGhostSegmentSummary(segments = []) {
  if (!Array.isArray(segments) || segments.length < 3) return "-- / -- / --";
  return segments.map(formatSegmentTime).join(" / ");
}

function formatSignedDelta(delta) {
  if (!Number.isFinite(delta)) return "--";
  const sign = delta > 0 ? "+" : delta < 0 ? "-" : "+";
  return `${sign}${Math.abs(delta).toFixed(1)}`;
}

function getTeamShieldMarkup(driver = {}) {
  const primary = normalizeHexColor(driver?.primaryColor, "#242833");
  const accent = normalizeHexColor(driver?.accentColor, "#f6f2e8");
  return `<span class="team-shield-badge" style="--team-primary: ${primary}; --team-accent: ${accent};" aria-hidden="true"></span>`;
}

function getPacificDateParts(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hourCycle: "h23",
    weekday: "short",
  });
  const values = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  const weekdays = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    weekday: weekdays[values.weekday] ?? 0,
  };
}

function refreshSelectedTimeTrialGhost() {
  clearTimeTrialGhost();
  if (selectedTimeTrialGhostMode === "off") return;
  const selectedRun = getSelectedTimeTrialGhostRun();
  if (selectedRun) setTimeTrialGhostRun(selectedRun);
}

function getSelectedTimeTrialGhostRun() {
  if (selectedTimeTrialGhostMode === "session-best") return timeTrialState.sessionBest;
  if (selectedTimeTrialGhostMode === "imported") return getBestImportedTimeTrialGhostRun();
  if (selectedTimeTrialGhostMode === "online") return getBestOnlineTimeTrialGhostRun();
  return timeTrialState.localBest;
}

function getBestImportedTimeTrialGhostRun() {
  return getBestExternalTimeTrialGhostRun((record) => record.source === "imported" || record.importedAt || record.game?.version === "imported-local");
}

function getBestOnlineTimeTrialGhostRun() {
  const records = getMatchingOnlineTimeTrialGhostRecords();
  const selected = selectedOnlineGhostRecordId
    ? records.find((record) => record.id === selectedOnlineGhostRecordId)
    : null;
  const record = selected ?? records[0];
  return record ? createBestFromTimeTrialRecord(record) : null;
}

function getBestExternalTimeTrialGhostRun(sourceFilter) {
  const matching = loadLocalTimeTrialRecords()
    .filter(sourceFilter)
    .filter((record) => record.ghost?.samples?.length >= 2)
    .filter((record) => record.track?.id === selectedTrack)
    .filter((record) => (record.track?.version ?? "local-v1") === (trackDefinitions[selectedTrack]?.version ?? "local-v1"))
    .filter((record) => record.car?.class === getCarProfile().kind)
    .sort((a, b) => a.lap.lapTime - b.lap.lapTime);
  return matching[0] ? createBestFromTimeTrialRecord(matching[0]) : null;
}

function getMatchingOnlineTimeTrialGhostRecords() {
  return loadLocalTimeTrialRecords()
    .filter((record) => selectedOnlineGhostFilter === "mine"
      ? Boolean(record.uploadedAt)
      : record.source === "online" || record.downloadedAt)
    .filter((record) => record.ghost?.samples?.length >= 2)
    .filter((record) => record.track?.id === selectedTrack)
    .filter((record) => selectedOnlineGhostFilter === "week" ||
      (record.track?.version ?? "local-v1") === (trackDefinitions[selectedTrack]?.version ?? "local-v1"))
    .filter((record) => record.car?.class === getCarProfile().kind)
    .filter((record) => selectedOnlineGhostFilter !== "week" ||
      new Date(record.uploadedAt ?? record.downloadedAt ?? record.createdAt) >= new Date(getMostRecentSundayFivePacificIso()))
    .sort((a, b) => a.lap.lapTime - b.lap.lapTime);
}

function clearTimeTrialGhost() {
  if (timeTrialGhost.car?.root) scene.remove(timeTrialGhost.car.root);
  timeTrialGhost.car = null;
  timeTrialGhost.run = null;
  timeTrialGhost.active = false;
  timeTrialGhost.progressSamples = [];
  timeTrialState.ghostDelta = null;
}

function setTimeTrialGhostRun(best) {
  clearTimeTrialGhost();
  const samples = best?.ghost?.samples;
  if (!Array.isArray(samples) || samples.length < 2) return;
  const ghostCar = createSelectedCar(best.car?.id ?? selectedCar);
  applyCarVisualQuality(ghostCar, { isPlayer: false });
  styleTimeTrialGhostCar(ghostCar);
  ghostCar.root.visible = false;
  scene.add(ghostCar.root);
  timeTrialGhost.car = ghostCar;
  timeTrialGhost.run = best;
  timeTrialGhost.active = true;
  timeTrialGhost.progressSamples = buildTimeTrialGhostProgressSamples(samples);
}

function styleTimeTrialGhostCar(ghostCar) {
  ghostCar.root.traverse((object) => {
    if (object.isLight) {
      object.visible = false;
      object.intensity = 0;
    }
    if (!object.isMesh || !object.material) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    const ghostMaterials = materials.map((material) => {
      const clone = material.clone();
      clone.transparent = true;
      clone.opacity = 0.34;
      clone.depthWrite = false;
      if (clone.color) clone.color.lerp(new THREE.Color(0x7fc7ff), 0.52);
      if (clone.emissive) {
        clone.emissive.setHex(0x2c8fd8);
        clone.emissiveIntensity = Math.max(clone.emissiveIntensity ?? 0, 0.16);
      }
      return clone;
    });
    object.material = Array.isArray(object.material) ? ghostMaterials : ghostMaterials[0];
    object.castShadow = false;
    object.receiveShadow = false;
    object.renderOrder = 8;
  });
}

function updateTimeTrialGhost(dt) {
  if (selectedTimeTrialGhostMode === "off" || !timeTrialGhost.active || !timeTrialGhost.car?.root || !isTimeTrialGameMode() || !gameStarted || isMenuOpen()) {
    if (timeTrialGhost.car?.root) timeTrialGhost.car.root.visible = false;
    timeTrialState.ghostDelta = null;
    return;
  }
  const samples = timeTrialGhost.run?.ghost?.samples ?? [];
  if (!timeTrialState.running || samples.length < 2 || timeTrialState.currentTime <= 0.12) {
    timeTrialGhost.car.root.visible = false;
    timeTrialState.ghostDelta = null;
    return;
  }
  const pose = getTimeTrialGhostPose(samples, timeTrialState.currentTime);
  if (!pose) {
    timeTrialGhost.car.root.visible = false;
    timeTrialState.ghostDelta = null;
    return;
  }
  timeTrialGhost.car.root.visible = true;
    timeTrialGhost.car.root.position.set(pose.x, track.groundY + CAR_VISUAL_RIDE_HEIGHT, pose.z);
  timeTrialGhost.car.root.rotation.set(0, pose.heading, 0);
  if (timeTrialGhost.car.wheels?.frontLeft) timeTrialGhost.car.wheels.frontLeft.rotation.y = pose.steer ?? 0;
  if (timeTrialGhost.car.wheels?.frontRight) timeTrialGhost.car.wheels.frontRight.rotation.y = pose.steer ?? 0;
  const spin = -(pose.distance ?? 0) * 1.35;
  for (const wheel of timeTrialGhost.car.wheelMeshes ?? []) {
    if (wheel) wheel.rotation.x = spin;
  }
  updateRearWing(dt, Boolean(pose.boost), timeTrialGhost.car);
  updateTimeTrialLiveGhostDelta();
}

function buildTimeTrialGhostProgressSamples(samples = []) {
  return samples
    .map((sample) => {
      let progress = Number(sample.progress);
      if (!Number.isFinite(progress) && track.samples?.length && Number.isFinite(sample.x) && Number.isFinite(sample.z)) {
        const index = getNearestSampleIndex(track.samples, new THREE.Vector3(sample.x, track.groundY, sample.z));
        progress = index / Math.max(1, track.samples.length - 1);
      }
      return {
        t: Number(sample.t),
        progress,
      };
    })
    .filter((sample) => Number.isFinite(sample.t) && Number.isFinite(sample.progress))
    .sort((a, b) => a.progress - b.progress);
}

function updateTimeTrialLiveGhostDelta() {
  if (!timeTrialState.running || !timeTrialGhost.active || !timeTrialGhost.progressSamples?.length || !track.samples?.length) {
    timeTrialState.ghostDelta = null;
    return;
  }
  const progress = getNearestSampleIndex(track.samples, carState.position) / Math.max(1, track.samples.length - 1);
  const ghostTime = getGhostTimeAtProgress(timeTrialGhost.progressSamples, progress);
  timeTrialState.ghostDelta = Number.isFinite(ghostTime) ? timeTrialState.currentTime - ghostTime : null;
}

function getGhostTimeAtProgress(progressSamples, progress) {
  if (!progressSamples?.length) return null;
  if (progress <= progressSamples[0].progress) return progressSamples[0].t;
  for (let i = 0; i < progressSamples.length - 1; i += 1) {
    const lower = progressSamples[i];
    const upper = progressSamples[i + 1];
    if (progress < lower.progress || progress > upper.progress) continue;
    const span = Math.max(0.00001, upper.progress - lower.progress);
    const blend = THREE.MathUtils.clamp((progress - lower.progress) / span, 0, 1);
    return THREE.MathUtils.lerp(lower.t, upper.t, blend);
  }
  return progressSamples[progressSamples.length - 1].t;
}

function getTimeTrialGhostPose(samples, currentTime) {
  if (currentTime > (samples[samples.length - 1]?.t ?? 0) + 0.18) return null;
  let lowerIndex = 0;
  for (let i = 0; i < samples.length - 1; i += 1) {
    if (currentTime >= samples[i].t && currentTime <= samples[i + 1].t) {
      lowerIndex = i;
      break;
    }
  }
  const lower = samples[lowerIndex];
  const upper = samples[Math.min(samples.length - 1, lowerIndex + 1)];
  const span = Math.max(0.001, upper.t - lower.t);
  const blend = THREE.MathUtils.clamp((currentTime - lower.t) / span, 0, 1);
  const x = THREE.MathUtils.lerp(lower.x, upper.x, blend);
  const z = THREE.MathUtils.lerp(lower.z, upper.z, blend);
  return {
    x,
    z,
    heading: angleLerp(lower.heading, upper.heading, blend),
    steer: THREE.MathUtils.lerp(lower.steer ?? 0, upper.steer ?? 0, blend),
    boost: THREE.MathUtils.lerp(lower.boost ?? 0, upper.boost ?? 0, blend) > 0.45,
    distance: (currentTime / Math.max(0.001, samples[samples.length - 1].t)) * (timeTrialGhost.run?.lapTime ?? 0) * 38,
  };
}

function isDrivingLineRecordingAvailable() {
  return isTimeTrialGameMode() && selectedTimeTrialMode === "record-line";
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
    ers: roundDrivingLineNumber(carState.ers),
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
    version: 2,
    createdAt: new Date().toISOString(),
    track: {
      id: selectedTrack,
      name: getSelectedTrackLabel(),
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
  const visible = isTimeTrialGameMode() && gameStarted && !isMenuOpen() && drivingLineRecorder.active;
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
  const isTimeTrial = isTimeTrialGameMode() && gameStarted && !isMenuOpen();
  if (timeTrialTimerEl) timeTrialTimerEl.hidden = !isTimeTrial;
  if (timeTrialMessageEl) timeTrialMessageEl.hidden = !isTimeTrial || (!timeTrialState.invalidated && timeTrialState.wallPenaltyMessageTime <= 0 && timeTrialState.trackLimitsPenaltyMessageTime <= 0 && timeTrialState.saveMessageTime <= 0);
  if (!isTimeTrial && timeTrialLapCardEl) timeTrialLapCardEl.hidden = true;
  if (!isTimeTrial && timeTrialGhostDeltaEl) timeTrialGhostDeltaEl.hidden = true;
  if (!isTimeTrial && timeTrialSectorDeltaEl) timeTrialSectorDeltaEl.hidden = true;
  if (!isTimeTrial && timeTrialUploadSessionBestButton) timeTrialUploadSessionBestButton.hidden = true;
  if (timeTrialResultsEl) timeTrialResultsEl.hidden = !isTimeTrial;
  updateDrivingLineRecorderHud();
  if (!isTimeTrial) return;

  if (timeTrialTimerValueEl) timeTrialTimerValueEl.textContent = timeTrialState.running ? formatLapTime(timeTrialState.currentTime) : "0:00.0";
  else timeTrialTimerEl.textContent = timeTrialState.running ? formatLapTime(timeTrialState.currentTime) : "0:00.0";
  updateTimeTrialGhostDeltaHud();
  updateTimeTrialSectorDeltaHud();
  if (timeTrialLocalBestEl) {
    const best = timeTrialState.localBest;
    timeTrialLocalBestEl.innerHTML = best
      ? `<span>My Best</span><strong>${formatLapTime(best.lapTime)}</strong><small>${formatSegmentSummary(best.segments)}</small>`
      : `<span>My Best</span><strong>--</strong><small>Valid laps save here</small>`;
  }
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
    timeTrialMessageEl.textContent = timeTrialState.saveMessageTime > 0
      ? timeTrialState.saveMessageText || "My Best Saved"
      : timeTrialState.invalidated
      ? "Invalidated Lap - Off Track"
      : timeTrialState.trackLimitsPenaltyMessageTime > 0
        ? "2 Second Penalty - Track Limits"
        : "1 Second Penalty - Wall Contact";
    timeTrialMessageEl.classList.toggle("is-invalidated", timeTrialState.invalidated);
    timeTrialMessageEl.classList.toggle("is-saved", timeTrialState.saveMessageTime > 0);
  }
  if (!timeTrialLapsEl) return;
  updateTimeTrialUploadSessionBestButton();

  timeTrialLapsEl.replaceChildren();
  for (const [index, lap] of timeTrialState.laps.entries()) {
    const row = document.createElement("li");
    row.className = lap.id === timeTrialState.latestLapId ? "is-latest" : "";
    row.innerHTML = `<span>${index + 1}</span><strong>${formatLapTime(lap.time)}</strong><small>${formatSegmentSummary(lap.segments)}</small>`;
    timeTrialLapsEl.appendChild(row);
  }
  updateDrivingLineRecorderHud();
}

function updateTimeTrialGhostDeltaHud() {
  if (!timeTrialGhostDeltaEl) return;
  const delta = timeTrialState.ghostDelta;
  const visible = timeTrialState.running && Number.isFinite(delta);
  timeTrialGhostDeltaEl.hidden = !visible;
  if (!visible) return;
  timeTrialGhostDeltaEl.textContent = formatSignedDelta(delta);
  timeTrialGhostDeltaEl.classList.toggle("is-ahead", delta <= 0);
  timeTrialGhostDeltaEl.classList.toggle("is-behind", delta > 0);
}

function updateTimeTrialSectorDeltaHud() {
  if (!timeTrialSectorDeltaEl) return;
  const visible = timeTrialState.sectorDeltaTime > 0 && timeTrialState.sectorDeltaText;
  timeTrialSectorDeltaEl.hidden = !visible;
  if (!visible) return;
  timeTrialSectorDeltaEl.textContent = timeTrialState.sectorDeltaText;
  timeTrialSectorDeltaEl.classList.toggle("is-ahead", (timeTrialState.sectorDeltaValue ?? 0) <= 0);
  timeTrialSectorDeltaEl.classList.toggle("is-behind", (timeTrialState.sectorDeltaValue ?? 0) > 0);
}

function updateTimeTrialUploadSessionBestButton() {
  if (!timeTrialUploadSessionBestButton) return;
  const record = getCurrentSessionBestTimeTrialRecord();
  timeTrialUploadSessionBestButton.hidden = !record;
  timeTrialUploadSessionBestButton.disabled = !record || Boolean(record.uploadedAt) || !canUploadTimeTrialRecord(record);
  timeTrialUploadSessionBestButton.textContent = record?.uploadedAt ? "Best Time Uploaded" : "Upload Best Time";
}

function getCurrentSessionBestTimeTrialRecord() {
  const recordId = timeTrialState.sessionBest?.recordId;
  if (!recordId) return null;
  return loadLocalTimeTrialRecords().find((candidate) => candidate.id === recordId) ?? null;
}

function formatSegmentSummary(segments = []) {
  if (!Array.isArray(segments) || segments.length < 3) return "S1 -- / S2 -- / S3 --";
  return segments.map((segment, index) => `S${index + 1} ${formatSegmentTime(segment)}`).join(" / ");
}

function formatSegmentTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "--";
  return `${seconds.toFixed(1)}s`;
}

function formatLapTime(seconds) {
  const totalTenths = Math.max(0, Math.round(seconds * 10));
  const minutes = Math.floor(totalTenths / 600);
  const wholeSeconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${minutes}:${String(wholeSeconds).padStart(2, "0")}.${tenths}`;
}

function updateRearWing(dt, boostActive, carModel = car) {
  const targetRearAngle = boostActive ? 0 : carModel.rearWingStandardAngle;
  const targetFrontAngle = boostActive ? 0 : carModel.frontWingStandardAngle;
  if (carModel.rearWing && Number.isFinite(targetRearAngle)) {
    carModel.rearWing.rotation.x = THREE.MathUtils.damp(carModel.rearWing.rotation.x, targetRearAngle, 7.5, dt);
  }
  if (carModel.frontWing && Number.isFinite(targetFrontAngle)) {
    carModel.frontWing.rotation.x = THREE.MathUtils.damp(carModel.frontWing.rotation.x, targetFrontAngle, 7.5, dt);
  }
}

function toggleHeadlights() {
  carState.headlightsOn = !carState.headlightsOn;
  updateCarLights(false, false);
}

function applyHeadlightQuality(carModel, { isPlayer = false, forceVisible = null } = {}) {
  if (!carModel?.lights) return;
  const qualityRangeScale = isPlayer && gameSettings.graphicsQuality === "high" ? 1.2 : 1;
  const qualityAngleScale = isPlayer && gameSettings.graphicsQuality === "high" ? 1.1 : 1;
  for (const light of carModel.lights.headlights ?? []) {
    const baseIntensity = light.userData.baseIntensity ?? light.intensity ?? 0;
    const baseDistance = light.userData.baseDistance ?? light.distance ?? 0;
    const baseAngle = light.userData.baseAngle ?? light.angle ?? 0.34;
    light.intensity = baseIntensity;
    light.distance = baseDistance * qualityRangeScale;
    light.angle = baseAngle * qualityAngleScale;
    if (forceVisible !== null) light.visible = forceVisible;
  }
}

function updateCarLights(brake = false, boostActive = false, dt = 1 / 60) {
  if (!car?.lights) return;
  const nitrousFlameActive = getCarProfile().kind === "corvette" && boostActive;
  carState.nitrousFlameScale = THREE.MathUtils.damp(carState.nitrousFlameScale, nitrousFlameActive ? 1 : 0, nitrousFlameActive ? 3.1 : 5.4, dt);
  const headlightsOn = carState.headlightsOn;
  applyHeadlightQuality(car, { isPlayer: true, forceVisible: headlightsOn });
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
  ersFillEl.classList.toggle("is-low", profile.hasErs && carState.ers < getBoostStartThreshold(profile));
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

  for (let i = 0; i < 64; i += 1) {
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
    const burstMultiplier = (environment === "dirt" ? 2 : environment === "tarmac" ? 0.5 : 1) * getEffectsDensityMultiplier();
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

function spawnFormulaSparks(dt, profile, boostActive, forwardSpeed, speedAbs, source = null) {
  if (profile.kind !== "formula" || boostActive || forwardSpeed <= 0) return;
  if (speedAbs < profile.maxForwardSpeed * 0.98) return;
  if (Math.random() > dt * 14.4 * getSparkSmokeDensityMultiplier()) return;

  const sourcePosition = source?.position ?? carState.position;
  const sourceForward = source?.forward ?? scratchForward;
  const sourceRight = source?.right ?? scratchRight;
  const rearPosition = sourcePosition
    .clone()
    .addScaledVector(sourceForward, -2.05)
    .add(new THREE.Vector3(0, 0.32, 0));
  const burstCount = 1;

  for (let i = 0; i < burstCount; i += 1) {
    const particle = sparkParticles.find((item) => item.userData.life <= 0);
    if (!particle) return;

    particle.visible = true;
    particle.position.copy(rearPosition);
    particle.position.addScaledVector(sourceRight, THREE.MathUtils.randFloatSpread(0.46));
    const orangeSpark = Math.random() < 0.34;
    particle.material.color.setHex(orangeSpark ? 0xff9f2e : 0xfff05a);
    particle.material.emissive.setHex(orangeSpark ? 0xff7a1f : 0xffdf2a);
    particle.userData.glow.material.color.setHex(orangeSpark ? 0xff9a2a : 0xffe45c);
    particle.userData.maxLife = THREE.MathUtils.randFloat(0.18, 0.34);
    particle.userData.life = particle.userData.maxLife;
    particle.userData.glow.material.opacity = 0.42;
    particle.userData.glow.scale.setScalar(0.9);
    particle.userData.velocity
      .copy(sourceForward)
      .multiplyScalar(THREE.MathUtils.randFloat(-4.8, -8.2))
      .addScaledVector(sourceRight, THREE.MathUtils.randFloatSpread(1.25))
      .add(new THREE.Vector3(0, THREE.MathUtils.randFloat(14, 19), 0));
    particle.scale.setScalar(0.5);
  }
}

function spawnCrashSparks(position, normal, impactSpeed = 0) {
  const density = getCrashSparkDensityMultiplier();
  if (density <= 0) return;
  const strength = THREE.MathUtils.clamp((impactSpeed - 10) / 28, 0, 1);
  if (strength <= 0) return;
  const burstCount = Math.round(THREE.MathUtils.lerp(4, 15, strength) * density);
  const tangent = new THREE.Vector3(normal.z, 0, -normal.x).normalize();
  for (let i = 0; i < burstCount; i += 1) {
    const particle = sparkParticles.find((item) => item.userData.life <= 0);
    if (!particle) return;
    const orangeSpark = Math.random() < 0.42;
    particle.visible = true;
    particle.position.copy(position);
    particle.position.y = Math.max(position.y + 0.45, track.groundY + 0.58);
    particle.position.addScaledVector(tangent, THREE.MathUtils.randFloatSpread(0.9));
    particle.material.color.setHex(orangeSpark ? 0xffa332 : 0xfff05a);
    particle.material.emissive.setHex(orangeSpark ? 0xff7a1f : 0xffdf2a);
    particle.userData.glow.material.color.setHex(orangeSpark ? 0xff9a2a : 0xffe45c);
    particle.userData.maxLife = THREE.MathUtils.randFloat(0.16, 0.38);
    particle.userData.life = particle.userData.maxLife;
    particle.userData.glow.material.opacity = 0.48;
    particle.userData.glow.scale.setScalar(0.9 + strength * 0.8);
    particle.userData.velocity
      .copy(normal)
      .multiplyScalar(THREE.MathUtils.randFloat(2.5, 7.5) * (0.7 + strength))
      .addScaledVector(tangent, THREE.MathUtils.randFloatSpread(7.2) * (0.6 + strength))
      .add(new THREE.Vector3(0, THREE.MathUtils.randFloat(4.5, 12) * (0.75 + strength), 0));
    particle.scale.setScalar(THREE.MathUtils.lerp(0.34, 0.62, strength));
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
  const burstCount = Math.round(THREE.MathUtils.clamp(speedAbs / 4, 5, 12) * getSparkSmokeDensityMultiplier());
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
  if (isRaceGridIntroActive()) {
    updateRaceGridIntroCamera(dt);
    return;
  }
  const profile = getCarProfile();
  const lookingBehind = gameStarted && !isMenuOpen() && !isPaused && pressed("KeyQ");
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
    const desiredTarget = lookingBehind
      ? carState.position
        .clone()
        .addScaledVector(scratchForward, -18)
        .addScaledVector(scratchRight, -carState.steer * target.steerLook * 0.45)
        .add(new THREE.Vector3(0, target.height - 0.28 + cockpitBump, 0))
      : carState.position
        .clone()
        .addScaledVector(scratchForward, target.forward)
        .addScaledVector(scratchRight, carState.steer * target.steerLook + cockpitRockRoll * 2.1)
        .add(new THREE.Vector3(0, target.height - cockpitRockPitch * 1.4 + cockpitBump, 0));

    cameraPosition.copy(desiredPosition);
    cameraTarget.copy(desiredTarget);
    camera.position.copy(desiredPosition);
    camera.lookAt(cameraTarget);
    wasLookingBehind = lookingBehind;
    return;
  }

  const speed = carState.velocity.length();
  const chaseDistance = THREE.MathUtils.lerp(8.8, 9.7, THREE.MathUtils.clamp(speed / 90, 0, 1)) * chaseCamera.zoom;
  const chaseHeight = THREE.MathUtils.lerp(4.4, 4.75, THREE.MathUtils.clamp(speed / 90, 0, 1)) * THREE.MathUtils.lerp(0.85, 1.18, chaseCamera.zoom);
  const orbitAngle = carState.heading + (lookingBehind ? 0 : Math.PI) + chaseCamera.orbitYaw;
  const orbitDirection = new THREE.Vector3(Math.sin(orbitAngle), 0, Math.cos(orbitAngle));
  const desiredPosition = carState.position
    .clone()
    .addScaledVector(orbitDirection, chaseDistance)
    .add(new THREE.Vector3(0, chaseHeight, 0));
  const desiredTarget = carState.position
    .clone()
    .addScaledVector(scratchForward, lookingBehind ? -2.2 : 4.8)
    .add(new THREE.Vector3(0, lookingBehind ? 1.42 : 1.6, 0));

  if (lookingBehind !== wasLookingBehind) {
    cameraPosition.copy(desiredPosition);
    cameraTarget.copy(desiredTarget);
    wasLookingBehind = lookingBehind;
  } else {
    cameraPosition.lerp(desiredPosition, 1 - Math.exp(-dt * 5.2));
    cameraTarget.lerp(desiredTarget, 1 - Math.exp(-dt * 8.0));
  }
  camera.position.copy(cameraPosition);
  camera.lookAt(cameraTarget);
}

function updateRaceGridIntroCamera(dt) {
  const polePose = getQuickRaceGridPose(1);
  const rawProgress = THREE.MathUtils.clamp((raceCountdownState.introElapsed - 0.5) / Math.max(1, RACE_GRID_INTRO_SECONDS - 0.5), 0, 1);
  const progress = THREE.MathUtils.smoothstep(rawProgress, 0, 1);
  scratchForward.set(Math.sin(polePose.heading), 0, Math.cos(polePose.heading));
  scratchRight.set(scratchForward.z, 0, -scratchForward.x);
  const desiredPosition = polePose.position
    .clone()
    .addScaledVector(scratchForward, THREE.MathUtils.lerp(9.8, 8.4, progress))
    .addScaledVector(scratchRight, THREE.MathUtils.lerp(-2.6, -5.8, progress))
    .add(new THREE.Vector3(0, THREE.MathUtils.lerp(2.15, 5.4, progress), 0));
  const gridTarget = polePose.position
    .clone()
    .addScaledVector(scratchForward, -8)
    .add(new THREE.Vector3(0, 1.2, 0));
  const playerTarget = carState.position
    .clone()
    .add(new THREE.Vector3(0, 1.35, 0));
  const desiredTarget = gridTarget.lerp(playerTarget, progress * 0.72);
  cameraPosition.lerp(desiredPosition, 1 - Math.exp(-dt * 6));
  cameraTarget.lerp(desiredTarget, 1 - Math.exp(-dt * 7.5));
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
  crowdEmitters.length = 0;
  treeAudioSources.length = 0;
  natureEmitters.length = 0;
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
  rebuildNatureEmitters();
  addCloudsAndSun(group, trackId === "generated");
  applySceneShadowQuality(group);

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
  markCostlySceneryShadow(bridge);
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
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xbfc6c9, roughness: 0.86, metalness: 0, flatShading: true });
  const seatMaterial = new THREE.MeshStandardMaterial({ color: spec.color, roughness: 0.9, metalness: 0, flatShading: true });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x202532, roughness: 0.88, metalness: 0, flatShading: true });
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
  markCostlySceneryShadow(stand);
  registerCrowdEmitter(stand, { radius: 125, strength: Math.max(0.75, (spec.length ?? 36) / 56) });
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
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    flatShading: true,
  });
  material.userData.racePaint = true;
  material.userData.baseRoughness = roughness;
  material.userData.baseMetalness = metalness;
  return material;
}

function createCarDecalMaterial(text, {
  bg = "#111315",
  fg = "#f6f2e8",
  accent = null,
  width = 256,
  height = 96,
  font = "900 48px Arial",
} = {}) {
  const decalCanvas = document.createElement("canvas");
  decalCanvas.width = width;
  decalCanvas.height = height;
  const ctx = decalCanvas.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  if (accent) {
    ctx.fillStyle = accent;
    ctx.fillRect(0, height - Math.max(8, height * 0.12), width, Math.max(8, height * 0.12));
  }
  ctx.fillStyle = fg;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
  const texture = new THREE.CanvasTexture(decalCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshBasicMaterial({ map: texture, transparent: true });
}

function addFlatDecal(parent, text, position, rotation, size, options = {}) {
  const decal = new THREE.Mesh(new THREE.PlaneGeometry(size.width, size.height), createCarDecalMaterial(text, options));
  decal.position.set(position.x, position.y, position.z);
  decal.rotation.set(rotation.x ?? 0, rotation.y ?? 0, rotation.z ?? 0);
  decal.renderOrder = 8;
  parent.add(decal);
  return decal;
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

  if (scheme.louisaBoss) addLouisaHamptonFormulaDetails(body, { stripeMaterial, accentMaterial, carbon });

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

function addLouisaHamptonFormulaDetails(body, { stripeMaterial, accentMaterial, carbon }) {
  const centerWhite = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.046, 2.15), stripeMaterial);
  centerWhite.position.set(0, 0.88, -0.38);
  body.add(centerWhite);

  const redPin = createRacePaintMaterial(0xdc101f, 0.24, 0.42);
  for (const x of [-0.22, 0.22]) {
    const pinstripe = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.052, 2.05), redPin);
    pinstripe.position.set(x, 0.91, -0.36);
    body.add(pinstripe);
  }

  const blackFloorFlash = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.04, 0.16), carbon);
  blackFloorFlash.position.set(0, 0.52, -1.12);
  body.add(blackFloorFlash);

  for (const x of [-1.03, 1.03]) {
    const sideSponsor = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.038, 0.76), stripeMaterial);
    sideSponsor.position.set(x, 0.72, -0.22);
    sideSponsor.rotation.z = x > 0 ? -0.03 : 0.03;
    body.add(sideSponsor);

    addFlatDecal(
      body,
      "LH",
      { x: x * 1.006, y: 0.934, z: -0.25 },
      { x: -Math.PI / 2, y: 0, z: x > 0 ? -Math.PI / 2 : Math.PI / 2 },
      { width: 0.5, height: 0.22 },
      { bg: "#f5f2ea", fg: "#dc101f", accent: "#ffd21f", width: 220, height: 92, font: "900 54px Arial" },
    );
  }

  const noseBadge = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.05, 0.42), accentMaterial);
  noseBadge.position.set(0, 0.68, 2.18);
  body.add(noseBadge);

  addFlatDecal(
    body,
    "FERRARO",
    { x: 0, y: 0.935, z: 0.54 },
    { x: -Math.PI / 2, y: 0, z: 0 },
    { width: 1.08, height: 0.28 },
    { bg: "#dc101f", fg: "#f5f2ea", accent: "#ffd21f", width: 320, height: 92, font: "900 40px Arial" },
  );
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
  const tailLamp = new THREE.MeshStandardMaterial({ color: 0xc51622, emissive: 0xb00012, emissiveIntensity: 0.22, roughness: 0.28, flatShading: true });
  const brakeLights = [];

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

  if (scheme.geoffBoss) addGeoffCordenStockDetails(body, { red: orange, navy: darkerOrange, yellow: blue, black });

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

  for (const x of [-0.72, -0.38, 0.38, 0.72]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.08), tailLamp.clone());
    tail.position.set(x, 0.7, -2.84);
    body.add(tail);
    brakeLights.push(tail);
  }

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

  return { root, body, wheels, wheelMeshes, lights: { brakeLights } };
}

function addGeoffCordenStockDetails(body, { red, navy, yellow, black }) {
  const flameOrange = createRacePaintMaterial(0xff7a18, 0.28, 0.24);
  const flameYellow = createRacePaintMaterial(0xffd42a, 0.26, 0.22);
  const whiteMaterial = createRacePaintMaterial(0xf6f2e8, 0.32, 0.18);
  const deepBlue = createRacePaintMaterial(0x06173d, 0.32, 0.2);

  const rearDeckPanel = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.055, 1.12), deepBlue);
  rearDeckPanel.position.set(0, 1.03, -1.86);
  rearDeckPanel.rotation.x = 0.04;
  body.add(rearDeckPanel);

  const rearBumperPanel = new THREE.Mesh(new THREE.BoxGeometry(2.12, 0.42, 0.065), deepBlue);
  rearBumperPanel.position.set(0, 0.77, -2.9);
  body.add(rearBumperPanel);

  for (const x of [-1.085, 1.085]) {
    const sideBluePanel = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.62, 2.35), deepBlue);
    sideBluePanel.position.set(x, 0.83, -0.78);
    body.add(sideBluePanel);

    const lowerBlueSweep = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.24, 3.0), deepBlue);
    lowerBlueSweep.position.set(x, 0.55, -0.18);
    lowerBlueSweep.rotation.y = x > 0 ? 0.08 : -0.08;
    body.add(lowerBlueSweep);
  }

  const hoodPanel = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.052, 0.74), navy);
  hoodPanel.position.set(0, 1.04, 1.65);
  hoodPanel.rotation.x = -0.1;
  body.add(hoodPanel);

  addFlatDecal(
    body,
    "CORDEN",
    { x: 0, y: 1.078, z: 1.68 },
    { x: -Math.PI / 2 - 0.1, y: 0, z: 0 },
    { width: 1.05, height: 0.3 },
    { bg: "#081a43", fg: "#f6f2e8", accent: "#ffcf24", width: 300, height: 92, font: "900 38px Arial" },
  );

  for (const [x, z, length, angle, material] of [
    [-0.42, 1.05, 0.92, -0.55, flameYellow],
    [-0.18, 1.0, 1.18, -0.32, flameOrange],
    [0.16, 1.02, 1.24, 0.3, flameYellow],
    [0.44, 1.08, 0.96, 0.52, flameOrange],
  ]) {
    const flame = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.058, length), material);
    flame.position.set(x, 1.075, z);
    flame.rotation.x = -0.1;
    flame.rotation.y = angle;
    body.add(flame);
  }

  const roofPlate = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.055, 0.72), yellow);
  roofPlate.position.set(0, 1.69, -0.56);
  body.add(roofPlate);
  addFlatDecal(
    body,
    "24",
    { x: 0, y: 1.724, z: -0.56 },
    { x: -Math.PI / 2, y: 0, z: 0 },
    { width: 0.86, height: 0.5 },
    { bg: "#ffd42a", fg: "#081a43", width: 220, height: 130, font: "900 82px Arial" },
  );

  for (const x of [-1.075, 1.075]) {
    const sideNumberBase = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.56, 0.72), whiteMaterial);
    sideNumberBase.position.set(x, 1.02, -0.15);
    body.add(sideNumberBase);
    addFlatDecal(
      body,
      "24",
      { x, y: 1.03, z: -0.15 },
      { x: 0, y: x > 0 ? Math.PI / 2 : -Math.PI / 2, z: 0 },
      { width: 0.62, height: 0.48 },
      { bg: "#f6f2e8", fg: "#081a43", accent: "#f43a2f", width: 190, height: 140, font: "900 74px Arial" },
    );

    for (const [z, material] of [[0.64, flameYellow], [0.34, flameOrange], [-0.58, flameYellow]]) {
      const sideFlame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.72), material);
      sideFlame.position.set(x, 0.82, z);
      sideFlame.rotation.y = x > 0 ? 0.24 : -0.24;
      body.add(sideFlame);
    }
  }

  const deckStripe = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.05, 0.22), black);
  deckStripe.position.set(0, 1.12, -2.2);
  body.add(deckStripe);
}

function setupCarSuspensionBody(carModel) {
  if (!carModel?.body || carModel.suspensionBody) return carModel;
  const wheelPivots = new Set(Object.values(carModel.wheels ?? {}).filter(Boolean));
  const suspensionBody = new THREE.Group();
  suspensionBody.name = "SuspensionBody";
  carModel.body.add(suspensionBody);
  for (const child of [...carModel.body.children]) {
    if (child === suspensionBody || wheelPivots.has(child)) continue;
    suspensionBody.add(child);
  }
  carModel.suspensionBody = suspensionBody;
  return carModel;
}

function getCarSuspensionBody(carModel) {
  return carModel?.suspensionBody ?? carModel?.body ?? null;
}

function setCarBodyLean(carModel, pitch = 0, roll = 0) {
  const suspensionBody = getCarSuspensionBody(carModel);
  if (!suspensionBody) return;
  suspensionBody.rotation.set(pitch, 0, roll);
  if (carModel.body && carModel.body !== suspensionBody) carModel.body.rotation.set(0, 0, 0);
}

function createSelectedCar(carId) {
  let model;
  if (corvettePaintSchemes[carId]) model = setupCarSuspensionBody(addUniversalHeadlights(createCorvette(carId), "corvette"));
  else if (lmpPaintSchemes[carId]) model = setupCarSuspensionBody(addUniversalHeadlights(createLeMansPrototype(carId), "lmp"));
  else if (stockPaintSchemes[carId]) model = setupCarSuspensionBody(addUniversalHeadlights(createStockCar(carId), "stock"));
  else if (jeepPaintSchemes[carId]) model = setupCarSuspensionBody(addUniversalHeadlights(createJeep(carId), "jeep"));
  else model = setupCarSuspensionBody(addUniversalHeadlights(createFormulaCar(carId), "formula"));
  preserveBaseShadowFlags(model.root);
  applyCarVisualQuality(model, { isPlayer: true });
  return model;
}

function createSelectedCarForDriverProfile(carId, profile = driverProfile) {
  if (!Object.values(PROFILE_TEAM_CAR_IDS).includes(carId)) return createSelectedCar(carId);
  const previousSchemes = {
    formula: carPaintSchemes[PROFILE_TEAM_CAR_IDS.formula],
    lmp: lmpPaintSchemes[PROFILE_TEAM_CAR_IDS.lmp],
    stock: stockPaintSchemes[PROFILE_TEAM_CAR_IDS.stock],
    jeep: jeepPaintSchemes[PROFILE_TEAM_CAR_IDS.jeep],
    corvette: corvettePaintSchemes[PROFILE_TEAM_CAR_IDS.corvette],
  };
  carPaintSchemes[PROFILE_TEAM_CAR_IDS.formula] = getDriverProfileFormulaScheme(profile);
  lmpPaintSchemes[PROFILE_TEAM_CAR_IDS.lmp] = getDriverProfileLmpScheme(profile);
  stockPaintSchemes[PROFILE_TEAM_CAR_IDS.stock] = getDriverProfileStockScheme(profile);
  jeepPaintSchemes[PROFILE_TEAM_CAR_IDS.jeep] = getDriverProfileJeepScheme(profile);
  corvettePaintSchemes[PROFILE_TEAM_CAR_IDS.corvette] = getDriverProfileCorvetteScheme(profile);
  const model = createSelectedCar(carId);
  carPaintSchemes[PROFILE_TEAM_CAR_IDS.formula] = previousSchemes.formula;
  lmpPaintSchemes[PROFILE_TEAM_CAR_IDS.lmp] = previousSchemes.lmp;
  stockPaintSchemes[PROFILE_TEAM_CAR_IDS.stock] = previousSchemes.stock;
  jeepPaintSchemes[PROFILE_TEAM_CAR_IDS.jeep] = previousSchemes.jeep;
  corvettePaintSchemes[PROFILE_TEAM_CAR_IDS.corvette] = previousSchemes.corvette;
  return model;
}

function addUniversalHeadlights(car, kind = "formula") {
  const headlightColor = 0xffc45c;
  const headlightIntensity = 24.48;
  const headlightDistance = 633.6;
  const headlightAngle = kind === "jeep" ? 0.396 : 0.341;
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
    emissive: headlightColor,
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
    realBeam = new THREE.SpotLight(headlightColor, headlightIntensity, headlightDistance, headlightAngle, 0.62, 1.12);
    car.body.add(realBeam, realBeam.target);
    car.lights.headlights.push(realBeam);
  }
  realBeam.color.setHex(headlightColor);
  realBeam.position.set(0, layout.y + 0.58, layout.z + 0.28);
  realBeam.target.position.set(0, layout.targetY - 1.6, layout.targetZ);
  realBeam.intensity = headlightIntensity;
  realBeam.distance = headlightDistance;
  realBeam.angle = headlightAngle;
  realBeam.userData.baseIntensity = headlightIntensity;
  realBeam.userData.baseDistance = headlightDistance;
  realBeam.userData.baseAngle = headlightAngle;
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
  const tailLamp = new THREE.MeshStandardMaterial({ color: 0xc51622, emissive: 0xb00012, emissiveIntensity: 0.22, roughness: 0.28, flatShading: true });
  const brakeLights = [];

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

  if (scheme.patriciaBoss) {
    addPatriciaDempseyLmpDetails(body, { white, red, blue, carbon });
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

  for (const x of [-0.54, -0.18, 0.18, 0.54]) {
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.08, 0.07), tailLamp.clone());
    tail.position.set(x, 0.58, -2.72);
    body.add(tail);
    brakeLights.push(tail);
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

  return { root, body, wheels, wheelMeshes, lights: { brakeLights } };
}

function addPatriciaDempseyLmpDetails(body, { white, red, blue, carbon }) {
  const orange = white;
  const green = red;
  const cream = blue;
  const darkGreen = new THREE.MeshStandardMaterial({ color: 0x0b4f2f, roughness: 0.42, metalness: 0.12, flatShading: true });
  const numberMaterial = new THREE.MeshStandardMaterial({ color: 0xf8f3dc, roughness: 0.32, metalness: 0.1, flatShading: true });
  const blackNumber = new THREE.MeshStandardMaterial({ color: 0x111314, roughness: 0.7, flatShading: true });

  for (const x of [-0.5, 0.5]) {
    const creamStripe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.065, 5.1), cream);
    creamStripe.position.set(x, 0.9, 0.08);
    creamStripe.rotation.z = -x * 0.04;
    body.add(creamStripe);
  }

  for (const [x, z, rot, material] of [
    [-0.82, 1.25, -0.32, green],
    [-0.82, 0.55, 0.28, darkGreen],
    [-0.82, -0.15, -0.26, cream],
    [-0.82, -0.85, 0.3, green],
    [0.82, 1.25, 0.32, green],
    [0.82, 0.55, -0.28, darkGreen],
    [0.82, -0.15, 0.26, cream],
    [0.82, -0.85, -0.3, green],
  ]) {
    const diamond = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.46), material);
    diamond.position.set(x, 0.86, z);
    diamond.rotation.y = rot;
    diamond.rotation.z = 0.55;
    body.add(diamond);
  }

  for (const x of [-1.01, 1.01]) {
    const sidePanel = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.055, 2.6), green);
    sidePanel.position.set(x, 0.69, -0.15);
    sidePanel.rotation.z = x > 0 ? -0.05 : 0.05;
    body.add(sidePanel);

    const lowerCream = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.06, 1.95), cream);
    lowerCream.position.set(x * 1.02, 0.54, 0.18);
    lowerCream.rotation.z = x > 0 ? -0.08 : 0.08;
    body.add(lowerCream);

    const divePlane = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.035, 0.18), carbon);
    divePlane.position.set(x * 1.34, 0.54, 1.94);
    divePlane.rotation.y = x > 0 ? -0.28 : 0.28;
    divePlane.rotation.z = x > 0 ? -0.08 : 0.08;
    body.add(divePlane);
  }

  const noseCream = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 1.72), cream);
  noseCream.position.set(0, 0.75, 1.72);
  body.add(noseCream);

  const noseGreen = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.07, 1.38), green);
  noseGreen.position.set(0, 0.8, 1.64);
  body.add(noseGreen);

  const dorsalGreen = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 1.46), green);
  dorsalGreen.position.set(0, 1.59, -0.78);
  body.add(dorsalGreen);

  const wingSplash = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.07, 0.14), cream);
  wingSplash.position.set(0, 1.12, -2.98);
  wingSplash.rotation.x = 0.16;
  body.add(wingSplash);

  for (const [x, z] of [[0, 0.16], [-0.88, -0.86], [0.88, -0.86]]) {
    const numberPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.055, 28), numberMaterial);
    numberPlate.rotation.x = Math.PI / 2;
    numberPlate.position.set(x, x === 0 ? 1.21 : 0.82, z);
    body.add(numberPlate);

    const numberFiveA = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.065, 0.045), blackNumber);
    numberFiveA.position.set(x - 0.07, numberPlate.position.y + 0.035, z - 0.045);
    body.add(numberFiveA);
    const numberFiveB = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.065, 0.045), blackNumber);
    numberFiveB.position.set(x - 0.07, numberPlate.position.y + 0.035, z + 0.045);
    body.add(numberFiveB);
    const numberFiveC = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.065, 0.045), blackNumber);
    numberFiveC.position.set(x + 0.1, numberPlate.position.y + 0.035, z - 0.045);
    body.add(numberFiveC);
  }

  const heritageStripe = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.065, 4.9), darkGreen);
  heritageStripe.position.set(0, 0.91, 0.05);
  body.add(heritageStripe);

  for (const z of [1.05, 0.25, -0.55]) {
    const crossBand = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.06, 0.08), green);
    crossBand.position.set(0, 0.93, z);
    crossBand.rotation.y = z > 0 ? 0.16 : -0.16;
    body.add(crossBand);
  }
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

function applyManualGearMismatchDrag(forwardSpeed, profile = getCarProfile(), dt = 1 / 60) {
  if (profile.kind !== "jeep" || profile.transmission !== "manual" || carState.gear <= 0 || forwardSpeed <= 0) return forwardSpeed;
  const { end: bandEnd } = getManualGearBand(carState.gear, profile);
  const overspeed = forwardSpeed - bandEnd;
  if (overspeed <= 0) return forwardSpeed;
  const mismatch = THREE.MathUtils.clamp(overspeed / Math.max(3, bandEnd), 0, 2.2);
  const engineBrake = THREE.MathUtils.lerp(8, 34, THREE.MathUtils.clamp(mismatch / 1.6, 0, 1));
  return moveToward(forwardSpeed, bandEnd, engineBrake * mismatch * dt);
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

function getDefaultCarForCategory(category) {
  return {
    formula: PROFILE_TEAM_CAR_IDS.formula,
    lmp: PROFILE_TEAM_CAR_IDS.lmp,
    stock: PROFILE_TEAM_CAR_IDS.stock,
    jeep: PROFILE_TEAM_CAR_IDS.jeep,
    corvette: PROFILE_TEAM_CAR_IDS.corvette,
  }[category] ?? "red";
}

function previewCarCategorySelection(category) {
  if (menuStep !== "car-category") return;
  if (isRaceModeCarCategoryRestricted() && !raceModeCarCategories.has(category)) return;
  previewCarCategory = category;
  for (const button of carCategoryButtons) {
    button.classList.toggle("is-selected", button.dataset.carCategory === previewCarCategory);
  }
  updateMenuVisual();
}

function clearCarCategoryPreview(category) {
  if (menuStep !== "car-category" || previewCarCategory !== category) return;
  previewCarCategory = null;
  for (const button of carCategoryButtons) {
    button.classList.remove("is-selected");
  }
  updateMenuVisual();
}

function selectCarCategory(category) {
  if (isRaceModeCarCategoryRestricted() && !raceModeCarCategories.has(category)) return;
  previewCarCategory = category;
  selectCar(getDefaultCarForCategory(category));
  if (isTimeTrialGameMode()) {
    const backButton = document.querySelector("[data-menu-step=\"time-trial-setup\"] [data-menu-back]");
    if (backButton) backButton.dataset.menuBack = "car-category";
    updateTimeTrialModeSelection();
    setMenuStep("time-trial-setup");
    return;
  }
  setMenuStep(category);
}

function isRaceModeCarCategoryRestricted() {
  return selectedGameMode === "quick-race" || selectedGameMode === "online-host";
}

function updateCarCategoryAvailability() {
  const restricted = isRaceModeCarCategoryRestricted();
  for (const button of carCategoryButtons) {
    const category = button.dataset.carCategory;
    const unavailable = restricted && !raceModeCarCategories.has(category);
    button.hidden = false;
    button.disabled = unavailable;
    button.classList.toggle("is-coming-soon", unavailable);
  }
}

function startGameModeSelection(mode, backStep = "intro") {
  selectedGameMode = mode;
  selectedTimeTrialMode = "standard";
  const trackBackButton = document.querySelector("[data-menu-step=\"track\"] [data-menu-back]");
  if (trackBackButton) trackBackButton.dataset.menuBack = backStep;
  updateTimeTrialModeSelection();
  clearAiOpponents();
  if (selectedGameMode !== "quick-race" && selectedGameMode !== "online-host") selectedAiOpponentCount = 0;
  else applyRaceDefaultsFromSettings();
  updateTimeTrialHud();
  updateCarCategoryAvailability();
  setMenuStep("track");
}

function startWeeklyOnlineTimeTrialFlow() {
  const challenge = getWeeklyTimeTrialChallenge();
  selectedGameMode = "weekly-time-trial";
  selectedTimeTrialMode = "standard";
  selectedTimeTrialGhostMode = "online";
  selectedOnlineGhostFilter = "week";
  clearAiOpponents();
  selectedAiOpponentCount = 0;
  selectTrack(challenge.trackId);
  selectCar(challenge.carId);
  const backButton = document.querySelector("[data-menu-step=\"time-trial-setup\"] [data-menu-back]");
  if (backButton) backButton.dataset.menuBack = "go-online";
  selectOnlineGhostFilter("week", { skipDownload: true });
  updateTimeTrialModeSelection();
  renderWeeklyTimeTrialCard();
  updateTimeTrialHud();
  setMenuStep("time-trial-setup");
  downloadOnlineTimeTrialGhostsForSelection();
}

function getWeeklyTimeTrialChallenge(now = new Date()) {
  const weekStartIso = getMostRecentSundayFivePacificIso(now);
  const seed = hashStringToUint32(`the-paddock-weekly:${weekStartIso}`);
  const trackId = weeklyTimeTrialTrackPool[seed % weeklyTimeTrialTrackPool.length] ?? KATARA_TRACK_ID;
  const carClass = weeklyTimeTrialClassPool[Math.floor(seed / Math.max(1, weeklyTimeTrialTrackPool.length)) % weeklyTimeTrialClassPool.length] ?? "stock";
  const carId = PROFILE_TEAM_CAR_IDS[carClass] ?? PROFILE_TEAM_CAR_IDS.stock;
  return { trackId, carClass, carId, weekStartIso };
}

function hashStringToUint32(text = "") {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function renderWeeklyTimeTrialCard() {
  const isWeekly = selectedGameMode === "weekly-time-trial";
  if (weeklyTimeTrialCardEl) weeklyTimeTrialCardEl.hidden = !isWeekly;
  if (!isWeekly) return;
  if (weeklyTimeTrialTitleEl) weeklyTimeTrialTitleEl.textContent = `${getSelectedTrackLabel()} / ${getCarClassLabel(getCarProfile().kind)}`;
  if (weeklyTimeTrialResetEl) weeklyTimeTrialResetEl.textContent = `Resets Sunday at 5pm Pacific`;
}

function startOnlineHostFlow() {
  selectedGameMode = "online-host";
  clearAiOpponents();
  applyRaceDefaultsFromSettings();
  onlineRoomState.privacy = "public";
  if (onlineLobbyPrivacySelect) onlineLobbyPrivacySelect.value = onlineRoomState.privacy;
  const roomCode = generateOnlineRoomCode();
  connectOnlineRoom(roomCode, "host");
  startGameModeSelection("online-host", "go-online");
}

function completeOnlineHostSetup() {
  if (!onlineRoomState.roomCode) connectOnlineRoom(generateOnlineRoomCode(), "host");
  onlineRoomState.privacy = onlineLobbyPrivacySelect?.value === "private" ? "private" : "public";
  onlineRoomState.hostSettings = getOnlineRoomSettingsPayload();
  onlineRoomState.ready = true;
  onlineRoomState.players.set(onlineRoomState.playerId, getOnlineRoomPlayerPayload());
  sendOnlineRoomEvent("host_settings", onlineRoomState.hostSettings);
  sendOnlineRoomEvent("player_ready", getOnlineRoomPlayerPayload());
  startOnlinePublicLobbyAnnouncements();
  renderOnlineRoom();
  setMenuStep("online-room");
}

function joinOnlineRoomFromInput() {
  const roomCode = normalizeOnlineRoomCode(onlineRoomCodeInput?.value ?? "");
  if (roomCode.length < 4) {
    setOnlineJoinStatus("Enter the room code from the host.", "is-warning");
    return;
  }
  selectedGameMode = "online-join";
  connectOnlineRoom(roomCode, "guest");
  setMenuStep("online-room");
}

function startOnlineLobbyBrowser() {
  pruneOnlineLobbyList();
  renderOnlineLobbyList();
  if (onlineLobbyState.socket?.readyState === WebSocket.OPEN || onlineLobbyState.socket?.readyState === WebSocket.CONNECTING) {
    sendOnlineLobbyEvent("lobby_request", { requestedAt: Date.now() });
    return;
  }
  disconnectOnlineLobbyBrowser();
  try {
    onlineLobbyState.socket = new WebSocket(SUPABASE_REALTIME_URL);
    onlineLobbyState.socket.addEventListener("open", () => {
      joinOnlineLobbyChannel();
      onlineLobbyState.heartbeatId = window.setInterval(sendOnlineLobbyHeartbeat, 25000);
      setOnlineLobbyStatus("Looking for public lobbies...", "is-warning");
    });
    onlineLobbyState.socket.addEventListener("message", handleOnlineLobbyRealtimeMessage);
    onlineLobbyState.socket.addEventListener("close", () => {
      onlineLobbyState.connected = false;
      if (onlineLobbyState.heartbeatId) window.clearInterval(onlineLobbyState.heartbeatId);
      onlineLobbyState.heartbeatId = null;
    });
    onlineLobbyState.socket.addEventListener("error", () => {
      setOnlineLobbyStatus("Could not load public lobbies.", "is-bad");
    });
  } catch {
    setOnlineLobbyStatus("This browser could not load public lobbies.", "is-bad");
  }
}

function disconnectOnlineLobbyBrowser() {
  if (onlineLobbyState.heartbeatId) window.clearInterval(onlineLobbyState.heartbeatId);
  onlineLobbyState.heartbeatId = null;
  if (onlineLobbyState.socket) {
    try {
      onlineLobbyState.socket.close();
    } catch {
      // The socket may already be closed.
    }
  }
  onlineLobbyState.socket = null;
  onlineLobbyState.connected = false;
}

function joinOnlineLobbyChannel() {
  sendOnlineLobbyRealtimeMessage(ONLINE_LOBBY_TOPIC, "phx_join", {
    config: {
      broadcast: { ack: false, self: true },
      presence: { enabled: false },
      private: false,
    },
  });
}

function sendOnlineLobbyHeartbeat() {
  sendOnlineLobbyRealtimeMessage("phoenix", "heartbeat", {});
}

function sendOnlineLobbyRealtimeMessage(topic, event, payload = {}) {
  const socket = onlineLobbyState.socket;
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;
  const ref = String(onlineLobbyState.ref++);
  if (event === "phx_join") onlineLobbyState.joinRef = ref;
  socket.send(JSON.stringify({
    topic,
    event,
    payload,
    ref,
    join_ref: topic === "phoenix" ? undefined : onlineLobbyState.joinRef || ref,
  }));
  return true;
}

function sendOnlineLobbyEvent(event, payload = {}) {
  return sendOnlineLobbyRealtimeMessage(ONLINE_LOBBY_TOPIC, "broadcast", { type: "broadcast", event, payload });
}

function startOnlinePublicLobbyAnnouncements() {
  if (onlineRoomState.role !== "host" || onlineRoomState.privacy !== "public") return;
  startOnlineLobbyBrowser();
  if (!onlineLobbyState.announceId) {
    onlineLobbyState.announceId = window.setInterval(announceOnlinePublicLobby, 5000);
  }
  announceOnlinePublicLobby();
}

function stopOnlinePublicLobbyAnnouncements() {
  if (onlineLobbyState.announceId) window.clearInterval(onlineLobbyState.announceId);
  onlineLobbyState.announceId = null;
}

function announceOnlinePublicLobby() {
  if (onlineRoomState.role !== "host" || onlineRoomState.privacy !== "public" || !onlineRoomState.roomCode || gameStarted || onlineRoomState.raceStarted) return;
  onlineRoomState.hostSettings ??= getOnlineRoomSettingsPayload();
  sendOnlineLobbyEvent("lobby_announce", getOnlinePublicLobbyPayload());
}

function getOnlinePublicLobbyPayload() {
  const settings = onlineRoomState.hostSettings ?? getOnlineRoomSettingsPayload();
  return {
    roomCode: onlineRoomState.roomCode,
    privacy: onlineRoomState.privacy,
    raceStarted: Boolean(onlineRoomState.raceStarted || gameStarted),
    hostName: driverProfile.driverName || "Driver Name",
    trackName: settings.trackName,
    carClass: settings.carClass,
    laps: settings.laps,
    aiOpponentCount: settings.aiOpponentCount,
    aiDifficulty: settings.aiDifficulty,
    playerCount: Math.max(1, onlineRoomState.players.size),
    updatedAt: Date.now(),
  };
}

function handleOnlineLobbyRealtimeMessage(event) {
  let message = null;
  try {
    message = JSON.parse(event.data);
  } catch {
    return;
  }
  if (message.topic !== ONLINE_LOBBY_TOPIC) return;
  if (message.event === "phx_reply" && message.payload?.status === "ok") {
    onlineLobbyState.connected = true;
    setOnlineLobbyStatus("Listening for public lobbies...", "is-good");
    refreshOnlineLobbyBrowser();
    return;
  }
  if (message.event !== "broadcast") return;
  const broadcastEvent = message.payload?.event;
  const payload = message.payload?.payload ?? {};
  if (broadcastEvent === "lobby_announce") {
    receiveOnlineLobbyAnnouncement(payload);
  } else if (broadcastEvent === "lobby_request") {
    announceOnlinePublicLobby();
  }
}

function refreshOnlineLobbyBrowser() {
  onlineLobbyState.lastRefreshTime = performance.now();
  pruneOnlineLobbyList();
  renderOnlineLobbyList();
  if (!onlineLobbyState.socket || onlineLobbyState.socket.readyState === WebSocket.CLOSED) {
    startOnlineLobbyBrowser();
    return;
  }
  sendOnlineLobbyEvent("lobby_request", { requestedAt: Date.now() });
}

function receiveOnlineLobbyAnnouncement(payload = {}) {
  if (!payload.roomCode || payload.privacy !== "public" || payload.raceStarted) return;
  onlineLobbyState.lobbies.set(payload.roomCode, {
    ...payload,
    lastSeen: performance.now(),
  });
  pruneOnlineLobbyList();
  renderOnlineLobbyList();
}

function pruneOnlineLobbyList() {
  const now = performance.now();
  for (const [roomCode, lobby] of onlineLobbyState.lobbies.entries()) {
    if (now - (lobby.lastSeen ?? 0) > 15000) onlineLobbyState.lobbies.delete(roomCode);
  }
}

function setOnlineLobbyStatus(text, className = "") {
  if (!onlineLobbyBrowserStatusEl) return;
  onlineLobbyBrowserStatusEl.textContent = text;
  onlineLobbyBrowserStatusEl.classList.remove("is-good", "is-warning", "is-bad");
  if (className) onlineLobbyBrowserStatusEl.classList.add(className);
}

function renderOnlineLobbyList() {
  if (!onlineLobbyListEl) return;
  onlineLobbyListEl.replaceChildren();
  const lobbies = [...onlineLobbyState.lobbies.values()]
    .sort((a, b) => (b.lastSeen ?? 0) - (a.lastSeen ?? 0));
  if (!lobbies.length) {
    const empty = document.createElement("li");
    empty.className = "is-empty";
    empty.textContent = onlineLobbyState.connected ? "No public lobbies yet. Try Refresh, or enter a private room code." : "Connecting to the public lobby list...";
    onlineLobbyListEl.appendChild(empty);
    return;
  }
  for (const lobby of lobbies) {
    const row = document.createElement("li");
    const players = Math.max(1, Number(lobby.playerCount) || 1);
    const ai = Math.max(0, Number(lobby.aiOpponentCount) || 0);
    row.innerHTML = `
      <div>
        <strong>${escapeHtml(lobby.hostName || "Host")} - ${escapeHtml(lobby.trackName || "Track")}</strong>
        <small>${escapeHtml(getCarClassLabel(lobby.carClass || "stock"))} / ${Number(lobby.laps) || 3} laps / ${players} player${players === 1 ? "" : "s"} / ${ai} AI</small>
      </div>
      <button class="profile-action-button" type="button" data-join-public-lobby="${escapeHtml(lobby.roomCode)}">Join</button>
    `;
    onlineLobbyListEl.appendChild(row);
  }
}

function handleOnlineLobbyListClick(event) {
  const button = event.target?.closest?.("[data-join-public-lobby]");
  if (!button) return;
  const roomCode = normalizeOnlineRoomCode(button.dataset.joinPublicLobby);
  if (!roomCode) return;
  if (onlineRoomCodeInput) onlineRoomCodeInput.value = roomCode;
  setOnlineJoinStatus(`Joining public lobby ${roomCode}...`, "is-good");
  selectedGameMode = "online-join";
  connectOnlineRoom(roomCode, "guest");
  setMenuStep("online-room");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[char]));
}

function getOnlinePlayerId() {
  try {
    const key = "the-paddock:online-player-id";
    const saved = window.localStorage?.getItem(key);
    if (saved) return saved;
    const id = (window.crypto?.randomUUID?.() ?? `player-${Date.now()}-${Math.floor(Math.random() * 100000)}`).replace(/[^a-z0-9-]/gi, "");
    window.localStorage?.setItem(key, id);
    return id;
  } catch {
    return `player-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  }
}

function generateOnlineRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 4; i += 1) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

function normalizeOnlineRoomCode(value = "") {
  return String(value).toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
}

function connectOnlineRoom(roomCode, role) {
  removeOnlineRemoteCars();
  disconnectOnlineRoom();
  onlineRoomState.role = role;
  onlineRoomState.roomCode = normalizeOnlineRoomCode(roomCode);
  onlineRoomState.topic = `realtime:paddock-${onlineRoomState.roomCode.toLowerCase()}`;
  onlineRoomState.hostSettings = role === "host" ? getOnlineRoomSettingsPayload() : null;
  onlineRoomState.ready = role === "host";
  onlineRoomState.raceStarted = false;
  onlineRoomState.poseSendTimer = 0;
  onlineRoomState.progress.clear();
  onlineRoomState.aiProgress.clear();
  onlineRoomState.gridOrder = [];
  resetOnlineRaceRunState();
  onlineRoomState.players = new Map([[onlineRoomState.playerId, getOnlineRoomPlayerPayload()]]);
  onlineRoomState.connected = false;
  onlineRoomState.lastError = "";
  renderOnlineRoom();

  try {
    onlineRoomState.socket = new WebSocket(SUPABASE_REALTIME_URL);
    onlineRoomState.socket.addEventListener("open", () => {
      joinOnlineRealtimeChannel();
      onlineRoomState.heartbeatId = window.setInterval(sendOnlineHeartbeat, 25000);
      renderOnlineRoomStatus("Connecting to room...", "is-warning");
    });
    onlineRoomState.socket.addEventListener("message", handleOnlineRealtimeMessage);
    onlineRoomState.socket.addEventListener("close", () => {
      onlineRoomState.connected = false;
      renderOnlineRoomStatus("Room connection closed. Reopen the room to reconnect.", "is-warning");
      if (onlineRoomState.heartbeatId) window.clearInterval(onlineRoomState.heartbeatId);
      onlineRoomState.heartbeatId = null;
    });
    onlineRoomState.socket.addEventListener("error", () => {
      onlineRoomState.lastError = "Could not connect to the online room.";
      renderOnlineRoomStatus(onlineRoomState.lastError, "is-bad");
    });
  } catch {
    onlineRoomState.lastError = "This browser could not open the online room connection.";
    renderOnlineRoomStatus(onlineRoomState.lastError, "is-bad");
  }
}

function disconnectOnlineRoom() {
  stopOnlinePublicLobbyAnnouncements();
  if (onlineRoomState.heartbeatId) window.clearInterval(onlineRoomState.heartbeatId);
  onlineRoomState.heartbeatId = null;
  if (onlineRoomState.socket) {
    try {
      onlineRoomState.socket.close();
    } catch {
      // The socket may already be closed.
    }
  }
  onlineRoomState.socket = null;
  onlineRoomState.connected = false;
}

function joinOnlineRealtimeChannel() {
  sendOnlineRealtimeMessage(onlineRoomState.topic, "phx_join", {
    config: {
      broadcast: { ack: false, self: false },
      presence: { enabled: false },
      private: false,
    },
  });
}

function sendOnlineHeartbeat() {
  sendOnlineRealtimeMessage("phoenix", "heartbeat", {});
}

function sendOnlineRealtimeMessage(topic, event, payload = {}) {
  const socket = onlineRoomState.socket;
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;
  const ref = String(onlineRoomState.ref++);
  if (event === "phx_join") onlineRoomState.joinRef = ref;
  socket.send(JSON.stringify({
    topic,
    event,
    payload,
    ref,
    join_ref: topic === "phoenix" ? undefined : onlineRoomState.joinRef || ref,
  }));
  return true;
}

function sendOnlineRoomEvent(event, payload = {}) {
  return sendOnlineRealtimeMessage(onlineRoomState.topic, "broadcast", { type: "broadcast", event, payload });
}

function handleOnlineRealtimeMessage(event) {
  let message = null;
  try {
    message = JSON.parse(event.data);
  } catch {
    return;
  }
  if (message.topic !== onlineRoomState.topic) return;
  if (message.event === "phx_reply" && message.payload?.status === "ok") {
    onlineRoomState.connected = true;
    renderOnlineRoomStatus(`Connected to room ${onlineRoomState.roomCode}.`, "is-good");
    sendOnlineRoomEvent("player_joined", getOnlineRoomPlayerPayload());
    if (onlineRoomState.role === "host") sendOnlineRosterUpdate();
    return;
  }
  if (message.event !== "broadcast") return;
  const broadcastEvent = message.payload?.event;
  const payload = message.payload?.payload ?? {};
  if (broadcastEvent === "player_joined" || broadcastEvent === "player_ready") {
    if (payload.playerId) onlineRoomState.players.set(payload.playerId, payload);
    if (onlineRoomState.role === "host") sendOnlineRosterUpdate();
    renderOnlineRoom();
  } else if (broadcastEvent === "host_settings") {
    applyOnlineHostSettings(payload);
    renderOnlineRoom();
  } else if (broadcastEvent === "roster_update") {
    applyOnlineRosterUpdate(payload);
    renderOnlineRoom();
  } else if (broadcastEvent === "race_start") {
    beginOnlineRaceFromMessage(payload);
  } else if (broadcastEvent === "player_pose") {
    receiveOnlinePlayerPose(payload);
  } else if (broadcastEvent === "car_collision") {
    receiveOnlineCarCollision(payload);
  }
}

function getOnlineRoomPlayerPayload() {
  return {
    playerId: onlineRoomState.playerId,
    role: onlineRoomState.role,
    driverName: driverProfile.driverName || "Driver Name",
    teamName: driverProfile.teamName || "Team Name",
    primaryColor: driverProfile.primaryColor,
    accentColor: driverProfile.accentColor,
    selectedTrack,
    trackName: getSelectedTrackLabel(),
    selectedCar,
    carName: getSelectedCarLabel(),
    carClass: getCarProfile().kind,
    ready: onlineRoomState.ready,
  };
}

function getOnlineRoomSettingsPayload() {
  return {
    hostPlayerId: onlineRoomState.playerId,
    selectedTrack,
    trackName: getSelectedTrackLabel(),
    selectedCar,
    carName: getSelectedCarLabel(),
    carClass: getCarProfile().kind,
    laps: selectedQuickRaceLapCount,
    aiOpponentCount: selectedAiOpponentCount,
    aiDifficulty: selectedAiDifficulty,
    privacy: onlineRoomState.privacy,
  };
}

function getOnlineRosterPayload() {
  return {
    hostSettings: onlineRoomState.hostSettings ?? getOnlineRoomSettingsPayload(),
    players: [...onlineRoomState.players.values()],
  };
}

function sendOnlineRosterUpdate() {
  if (onlineRoomState.role !== "host") return;
  onlineRoomState.hostSettings ??= getOnlineRoomSettingsPayload();
  onlineRoomState.players.set(onlineRoomState.playerId, getOnlineRoomPlayerPayload());
  sendOnlineRoomEvent("host_settings", onlineRoomState.hostSettings);
  sendOnlineRoomEvent("roster_update", getOnlineRosterPayload());
}

function applyOnlineRosterUpdate(payload = {}) {
  if (payload.hostSettings) applyOnlineHostSettings(payload.hostSettings);
  const players = Array.isArray(payload.players) ? payload.players : [];
  if (!players.length) return;
  for (const player of players) {
    if (player?.playerId) onlineRoomState.players.set(player.playerId, player);
  }
  onlineRoomState.players.set(onlineRoomState.playerId, getOnlineRoomPlayerPayload());
}

function applyOnlineHostSettings(settings = {}) {
  if (!settings.selectedTrack || !settings.selectedCar) return;
  onlineRoomState.hostSettings = settings;
  selectedQuickRaceLapCount = THREE.MathUtils.clamp(Math.round(Number(settings.laps ?? selectedQuickRaceLapCount) || 3), 1, 10);
  selectedAiOpponentCount = THREE.MathUtils.clamp(Math.round(Number(settings.aiOpponentCount ?? selectedAiOpponentCount) || 0), 0, 10);
  selectedAiDifficulty = AI_DIFFICULTY_SETTINGS[settings.aiDifficulty] ? settings.aiDifficulty : selectedAiDifficulty;
  onlineRoomState.privacy = settings.privacy === "private" ? "private" : "public";
  updateOnlineHostSettingsControls();
  if (onlineRoomState.role === "guest" && !gameStarted) {
    if (selectedTrack !== settings.selectedTrack) selectTrack(settings.selectedTrack);
    if (selectedCar !== settings.selectedCar) selectCar(settings.selectedCar);
  }
}

function toggleOnlineReady() {
  onlineRoomState.ready = !onlineRoomState.ready;
  onlineRoomState.players.set(onlineRoomState.playerId, getOnlineRoomPlayerPayload());
  sendOnlineRoomEvent("player_ready", getOnlineRoomPlayerPayload());
  renderOnlineRoomStatus(onlineRoomState.ready ? "Ready. Waiting for the host to start." : "Not ready.", onlineRoomState.ready ? "is-good" : "is-warning");
  renderOnlineRoom();
}

function updateOnlineAiOpponentSelection() {
  const count = THREE.MathUtils.clamp(Math.round(Number(onlineAiOpponentSlider?.value ?? selectedAiOpponentCount) || 0), 0, 10);
  selectedAiOpponentCount = count;
  if (onlineAiOpponentSlider) onlineAiOpponentSlider.value = String(count);
  if (onlineAiOpponentReadout) onlineAiOpponentReadout.textContent = String(count);
  syncOnlineHostSettingsFromControls();
}

function updateOnlineRaceLapSelection() {
  const laps = THREE.MathUtils.clamp(Math.round(Number(onlineRaceLapSlider?.value ?? selectedQuickRaceLapCount) || 3), 1, 10);
  selectedQuickRaceLapCount = laps;
  if (onlineRaceLapSlider) onlineRaceLapSlider.value = String(laps);
  if (onlineRaceLapReadout) onlineRaceLapReadout.textContent = String(laps);
  syncOnlineHostSettingsFromControls();
}

function updateOnlineAiDifficultySelection() {
  const value = onlineAiDifficultySelect?.value ?? selectedAiDifficulty;
  selectedAiDifficulty = AI_DIFFICULTY_SETTINGS[value] ? value : "standard";
  if (onlineAiDifficultySelect) onlineAiDifficultySelect.value = selectedAiDifficulty;
  syncOnlineHostSettingsFromControls();
}

function updateOnlineLobbyPrivacySelection() {
  onlineRoomState.privacy = onlineLobbyPrivacySelect?.value === "private" ? "private" : "public";
  if (onlineRoomState.privacy === "public") {
    startOnlinePublicLobbyAnnouncements();
    announceOnlinePublicLobby();
  } else {
    stopOnlinePublicLobbyAnnouncements();
  }
  renderOnlineRoom();
}

function syncOnlineHostSettingsFromControls() {
  if (onlineRoomState.role !== "host" || menuStep !== "online-room") return;
  onlineRoomState.hostSettings = getOnlineRoomSettingsPayload();
  sendOnlineRosterUpdate();
  announceOnlinePublicLobby();
  renderOnlineRoom();
}

function startOnlineRaceFromLobby() {
  if (onlineRoomState.role !== "host") {
    renderOnlineRoomStatus("Waiting for the host to start the race.", "is-warning");
    return;
  }
  onlineRoomState.hostSettings = getOnlineRoomSettingsPayload();
  stopOnlinePublicLobbyAnnouncements();
  const payload = {
    ...onlineRoomState.hostSettings,
    gridOrder: createOnlineGridOrder(),
    startAt: Date.now() + 1800,
  };
  sendOnlineRoomEvent("host_settings", onlineRoomState.hostSettings);
  sendOnlineRoomEvent("race_start", payload);
  beginOnlineRaceFromMessage(payload);
}

function beginOnlineRaceFromMessage(payload = {}) {
  if (gameStarted && isOnlineRaceGameMode()) return;
  applyOnlineHostSettings(payload);
  onlineRoomState.gridOrder = Array.isArray(payload.gridOrder) && payload.gridOrder.length
    ? payload.gridOrder
    : createOnlineGridOrder();
  onlineRoomState.raceStarted = true;
  resetOnlineRaceRunState();
  renderOnlineRoomStatus("Starting online race...", "is-good");
  const delay = Math.max(0, Number(payload.startAt ?? Date.now()) - Date.now());
  window.setTimeout(() => {
    selectedGameMode = onlineRoomState.role === "host" ? "online-host" : "online-join";
    startGame();
  }, delay);
}

function resetOnlineRaceRunState() {
  onlineRoomState.elapsed = 0;
  onlineRoomState.progress.clear();
  onlineRoomState.collisionSendCooldowns.clear();
  onlineRoomState.localPenaltyTime = 0;
  onlineRoomState.localPenaltyCooldown = 0;
  onlineRoomState.localPenaltyMessageTime = 0;
  onlineRoomState.localPenaltyMessageText = "";
  onlineRoomState.localFinished = false;
  onlineRoomState.localFinishTime = null;
  onlineRoomState.resultsShown = false;
  resetBossModeState();
  if (quickRaceResultsEl && isOnlineRaceGameMode()) quickRaceResultsEl.hidden = true;
}

function createOnlineGridOrder() {
  const players = [...onlineRoomState.players.values()]
    .filter((player) => player?.playerId)
    .map((player) => player.playerId);
  if (!players.includes(onlineRoomState.playerId)) players.push(onlineRoomState.playerId);
  return shuffleOnlineGridOrder([...new Set(players)], onlineRoomState.roomCode || "online");
}

function shuffleOnlineGridOrder(playerIds, seedText = "online") {
  let seed = hashStringToUint32(`${seedText}:${playerIds.join(",")}:${Date.now()}`);
  for (let i = playerIds.length - 1; i > 0; i -= 1) {
    seed = Math.imul(seed ^ (seed >>> 13), 1664525) + 1013904223;
    const j = Math.abs(seed) % (i + 1);
    [playerIds[i], playerIds[j]] = [playerIds[j], playerIds[i]];
  }
  return playerIds;
}

function getOnlineGridPositionForPlayer(playerId = onlineRoomState.playerId) {
  const index = onlineRoomState.gridOrder.indexOf(playerId);
  const aiCount = THREE.MathUtils.clamp(Math.round(Number(onlineRoomState.hostSettings?.aiOpponentCount ?? selectedAiOpponentCount) || 0), 0, 10);
  return aiCount + (index >= 0 ? index + 1 : 1);
}

function updateOnlineRaceNetworking(dt) {
  if (!isOnlineRaceGameMode()) {
    updateOnlineRemoteCars(dt, false);
    return;
  }
  const raceStartBlocked = raceCountdownState.active;
  if (gameStarted && !isMenuOpen() && !isPaused && !raceStartBlocked) {
    onlineRoomState.elapsed += dt;
    updateLocalOnlineRaceProgress();
    updateOnlineAiRaceProgress();
    updateOnlineFinishState();
    onlineRoomState.poseSendTimer += dt;
    if (onlineRoomState.poseSendTimer >= 1 / 12) {
      onlineRoomState.poseSendTimer = 0;
      sendOnlineRoomEvent("player_pose", getOnlinePosePayload());
    }
  }
  updateOnlineRemoteCars(dt, gameStarted && !isMenuOpen());
  updateOnlineRaceHud();
  if (onlineRoomState.resultsShown) renderOnlineRaceResults();
}

function updateOnlineAiRaceProgress() {
  if (!aiOpponents.length) return;
  const totalLaps = getOnlineRaceLapCount();
  for (let i = 0; i < aiOpponents.length; i += 1) {
    const opponent = aiOpponents[i];
    const id = opponent.id ?? `ai-${i}`;
    const previous = onlineRoomState.aiProgress.get(id);
    if (previous?.finished) continue;
    const progress = getOnlineRaceProgressForPosition(opponent.position, id, onlineRoomState.aiProgress);
    const finished = progress.lap >= totalLaps;
    onlineRoomState.aiProgress.set(id, {
      playerId: id,
      label: opponent.displayName ?? `AI ${i + 1}`,
      ...progress,
      penaltyTime: 0,
      finished,
      finishTime: finished ? onlineRoomState.elapsed : null,
      adjustedFinishTime: finished ? onlineRoomState.elapsed : null,
      lastSeen: performance.now(),
      isAi: true,
    });
  }
}

function updateLocalOnlineRaceProgress() {
  const progress = getOnlineRaceProgressForPosition(carState.position, onlineRoomState.playerId, onlineRoomState.progress);
  onlineRoomState.progress.set(onlineRoomState.playerId, {
    playerId: onlineRoomState.playerId,
    ...progress,
    penaltyTime: onlineRoomState.localPenaltyTime,
    finished: onlineRoomState.localFinished,
    finishTime: onlineRoomState.localFinishTime,
    adjustedFinishTime: onlineRoomState.localFinishTime === null ? null : onlineRoomState.localFinishTime + onlineRoomState.localPenaltyTime,
    lastSeen: performance.now(),
  });
}

function getOnlineRaceProgressForPosition(position, entityId = onlineRoomState.playerId, progressMap = onlineRoomState.progress) {
  const samples = track.samples ?? [];
  if (!samples.length) return { lap: 0, progress: 0, raceDistance: 0 };
  const previous = progressMap.get(entityId);
  const previousIndex = previous?.sampleIndex ?? track.startSampleIndex ?? 0;
  const nearestIndex = getNearestQuickRaceSampleIndex(position, previousIndex);
  const relativeIndex = getQuickRaceRelativeSampleIndex(nearestIndex);
  const progress = relativeIndex / samples.length;
  let lap = previous?.lap ?? 0;
  let started = previous?.started ?? false;
  if (previous) {
    if (previous.progress > 0.78 && progress < 0.22) {
      if (started) lap += 1;
      else started = true;
    } else if (previous.progress < 0.22 && progress > 0.78 && started) {
      if (lap > 0) lap -= 1;
      else started = false;
    }
  }
  const startBonus = started ? 1 : 0;
  return { lap, progress, started, raceDistance: startBonus + lap + progress, sampleIndex: nearestIndex };
}

function updateOnlineFinishState() {
  if (onlineRoomState.localFinished) return;
  const totalLaps = getOnlineRaceLapCount();
  const progress = onlineRoomState.progress.get(onlineRoomState.playerId);
  if (!progress || progress.lap < totalLaps) return;
  onlineRoomState.localFinished = true;
  onlineRoomState.localFinishTime = onlineRoomState.elapsed;
  updateLocalOnlineRaceProgress();
  sendOnlineRoomEvent("player_pose", getOnlinePosePayload());
  showOnlineRaceResults();
}

function getOnlineRaceLapCount() {
  return Math.max(1, Number(onlineRoomState.hostSettings?.laps ?? selectedQuickRaceLapCount) || 3);
}

function updateOnlineRacePenalties(dt, wheelSurface) {
  if (!isOnlineRaceGameMode() || !gameStarted || isPaused || isMenuOpen() || onlineRoomState.localFinished) return;
  onlineRoomState.localPenaltyCooldown = Math.max(0, onlineRoomState.localPenaltyCooldown - dt);
  onlineRoomState.localPenaltyMessageTime = Math.max(0, onlineRoomState.localPenaltyMessageTime - dt);
  if (onlineRoomState.localPenaltyCooldown > 0) return;
  if (wheelSurface?.grassCount === 4) {
    addOnlineRacePenalty(3, "Off Track");
  } else if (wheelSurface?.frontGrassCount === 2 || wheelSurface?.rearGrassCount === 2) {
    addOnlineRacePenalty(2, "Track Limits");
  }
}

function addOnlineRacePenalty(seconds, reason) {
  const scaledSeconds = getScaledRacePenaltySeconds(seconds);
  onlineRoomState.localPenaltyTime += scaledSeconds;
  onlineRoomState.localPenaltyCooldown = 5;
  onlineRoomState.localPenaltyMessageTime = 5;
  onlineRoomState.localPenaltyMessageText = `${getOnlineRacePositionLabel()} - Lap ${getOnlineRaceCurrentLap()}: ${formatRacePenaltyNotice(scaledSeconds, reason)}`;
}

function getOnlineRacePositionLabel() {
  const standings = getOnlineRaceStandings();
  const playerIndex = standings.findIndex((entry) => entry.playerId === onlineRoomState.playerId);
  return `${playerIndex >= 0 ? playerIndex + 1 : 1} / ${Math.max(1, standings.length)}`;
}

function getOnlineRaceCurrentLap() {
  const progress = onlineRoomState.progress.get(onlineRoomState.playerId) ?? { lap: 0 };
  return THREE.MathUtils.clamp((progress.lap ?? 0) + 1, 1, getOnlineRaceLapCount());
}

function getOnlinePosePayload() {
  const progress = getOnlineRaceProgressForPosition(carState.position, onlineRoomState.playerId, onlineRoomState.progress);
  return {
    ...getOnlineRoomPlayerPayload(),
    t: performance.now(),
    x: roundOnlinePoseNumber(carState.position.x),
    y: roundOnlinePoseNumber(carState.position.y),
    z: roundOnlinePoseNumber(carState.position.z),
    heading: roundOnlinePoseNumber(carState.heading),
    steer: roundOnlinePoseNumber(carState.steer),
    wheelSpin: roundOnlinePoseNumber(carState.wheelSpin),
    speed: roundOnlinePoseNumber(carState.velocity.length()),
    lap: progress.lap,
    progress: roundOnlinePoseNumber(progress.progress),
    raceDistance: roundOnlinePoseNumber(progress.raceDistance),
    penaltyTime: roundOnlinePoseNumber(onlineRoomState.localPenaltyTime),
    finished: onlineRoomState.localFinished,
    finishTime: onlineRoomState.localFinishTime,
    adjustedFinishTime: onlineRoomState.localFinishTime === null ? null : roundOnlinePoseNumber(onlineRoomState.localFinishTime + onlineRoomState.localPenaltyTime),
    boostActive: Boolean(carState.boostActive),
    throttle: pressed("KeyW", "ArrowUp") ? 1 : 0,
    brake: pressed("KeyS", "ArrowDown") ? 1 : 0,
  };
}

function roundOnlinePoseNumber(value) {
  return Math.round((Number(value) || 0) * 1000) / 1000;
}

function receiveOnlinePlayerPose(payload = {}) {
  if (!payload.playerId || payload.playerId === onlineRoomState.playerId) return;
  if (!isOnlineRaceGameMode() && !onlineRoomState.raceStarted) return;
  onlineRoomState.players.set(payload.playerId, {
    ...(onlineRoomState.players.get(payload.playerId) ?? {}),
    ...payload,
  });
  onlineRoomState.progress.set(payload.playerId, {
    playerId: payload.playerId,
    lap: Math.max(0, Number(payload.lap) || 0),
    progress: Math.max(0, Number(payload.progress) || 0),
    raceDistance: Math.max(0, Number(payload.raceDistance) || 0),
    penaltyTime: Math.max(0, Number(payload.penaltyTime) || 0),
    finished: Boolean(payload.finished),
    finishTime: Number.isFinite(Number(payload.finishTime)) ? Number(payload.finishTime) : null,
    adjustedFinishTime: Number.isFinite(Number(payload.adjustedFinishTime)) ? Number(payload.adjustedFinishTime) : null,
    lastSeen: performance.now(),
  });
  let remote = onlineRoomState.remoteCars.get(payload.playerId);
  if (!remote) {
    remote = createOnlineRemoteCar(payload);
    onlineRoomState.remoteCars.set(payload.playerId, remote);
  }
  const snapshot = createOnlineRemoteSnapshot(payload, performance.now());
  remote.lastSeen = snapshot.receivedAt;
  remote.snapshots.push(snapshot);
  while (remote.snapshots.length > 10) remote.snapshots.shift();
  remote.target.position.copy(snapshot.position);
  remote.target.heading = snapshot.heading;
  remote.target.velocity.copy(snapshot.velocity);
  remote.target.steer = snapshot.steer;
  remote.target.wheelSpin = snapshot.wheelSpin;
  remote.target.boostActive = snapshot.boostActive;
  remote.target.throttle = snapshot.throttle;
  remote.target.brake = snapshot.brake;
  if (!remote.hasRenderedSnapshot) {
    remote.car.root.position.copy(snapshot.position);
    remote.car.root.rotation.y = snapshot.heading;
    remote.hasRenderedSnapshot = true;
  }
  remote.car.root.visible = true;
}

function createOnlineRemoteSnapshot(payload = {}, receivedAt = performance.now()) {
  const heading = Number(payload.heading) || 0;
  const speed = Number(payload.speed) || 0;
  return {
    receivedAt,
    position: new THREE.Vector3(Number(payload.x) || 0, track.groundY + CAR_VISUAL_RIDE_HEIGHT, Number(payload.z) || 0),
    heading,
    velocity: new THREE.Vector3(
      Math.sin(heading) * speed,
      0,
      Math.cos(heading) * speed,
    ),
    steer: Number(payload.steer) || 0,
    wheelSpin: Number(payload.wheelSpin) || 0,
    boostActive: Boolean(payload.boostActive),
    throttle: Number(payload.throttle) > 0.1 ? 1 : 0,
    brake: Number(payload.brake) > 0.1,
  };
}

function getInterpolatedOnlineRemoteSnapshot(remote, now = performance.now()) {
  const snapshots = remote?.snapshots ?? [];
  if (!snapshots.length) return null;
  const renderTime = now - ONLINE_REMOTE_INTERPOLATION_DELAY_MS;
  while (snapshots.length > 2 && snapshots[1].receivedAt < renderTime - 80) snapshots.shift();
  let previous = snapshots[0];
  let next = null;
  for (let i = 1; i < snapshots.length; i += 1) {
    next = snapshots[i];
    if (next.receivedAt >= renderTime) break;
    previous = next;
    next = null;
  }
  if (next && next.receivedAt > previous.receivedAt) {
    const blend = THREE.MathUtils.clamp((renderTime - previous.receivedAt) / (next.receivedAt - previous.receivedAt), 0, 1);
    return blendOnlineRemoteSnapshots(previous, next, blend);
  }
  const latest = snapshots[snapshots.length - 1];
  const predictSeconds = THREE.MathUtils.clamp((renderTime - latest.receivedAt) / 1000, 0, ONLINE_REMOTE_MAX_PREDICTION_MS / 1000);
  return {
    ...latest,
    position: latest.position.clone().addScaledVector(latest.velocity, predictSeconds),
  };
}

function blendOnlineRemoteSnapshots(a, b, blend) {
  const heading = angleLerp(a.heading, b.heading, blend);
  return {
    receivedAt: THREE.MathUtils.lerp(a.receivedAt, b.receivedAt, blend),
    position: a.position.clone().lerp(b.position, blend),
    heading,
    velocity: a.velocity.clone().lerp(b.velocity, blend),
    steer: THREE.MathUtils.lerp(a.steer, b.steer, blend),
    wheelSpin: THREE.MathUtils.lerp(a.wheelSpin, b.wheelSpin, blend),
    boostActive: blend < 0.5 ? a.boostActive : b.boostActive,
    throttle: THREE.MathUtils.lerp(a.throttle, b.throttle, blend),
    brake: blend < 0.5 ? a.brake : b.brake,
  };
}

function applyOnlineRemoteSnapshot(remote, pose, dt) {
  if (!remote?.car?.root || !pose) return;
  const root = remote.car.root;
  const distance = root.position.distanceTo(pose.position);
  if (!remote.hasRenderedSnapshot || distance > ONLINE_REMOTE_MAX_SNAP_DISTANCE) {
    root.position.copy(pose.position);
    root.rotation.y = pose.heading;
  } else {
    root.position.lerp(pose.position, 1 - Math.exp(-dt * 18));
    root.rotation.y = angleLerp(root.rotation.y, pose.heading, 1 - Math.exp(-dt * 16));
  }
  remote.renderedVelocity.copy(pose.velocity);
  remote.target.position.copy(pose.position);
  remote.target.heading = pose.heading;
  remote.target.velocity.copy(pose.velocity);
  remote.target.steer = pose.steer;
  remote.target.wheelSpin = pose.wheelSpin;
  remote.target.boostActive = pose.boostActive;
  remote.target.throttle = pose.throttle;
  remote.target.brake = pose.brake;
  remote.hasRenderedSnapshot = true;
}

function createOnlineRemoteCar(payload = {}) {
  const ghostCar = createSelectedCarForDriverProfile(payload.selectedCar ?? selectedCar, {
    driverName: payload.driverName || "Driver Name",
    teamName: payload.teamName || "Team Name",
    primaryColor: payload.primaryColor || "#242833",
    accentColor: payload.accentColor || "#f6f2e8",
  });
  ghostCar.root.visible = false;
  applyCarVisualQuality(ghostCar, { isPlayer: false });
  scene.add(ghostCar.root);
  return {
    car: ghostCar,
    carId: payload.selectedCar ?? selectedCar,
    target: {
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      heading: 0,
      steer: 0,
      wheelSpin: 0,
      boostActive: false,
      throttle: 0,
      brake: false,
    },
    snapshots: [],
    renderedVelocity: new THREE.Vector3(),
    hasRenderedSnapshot: false,
    lastSeen: performance.now(),
  };
}

function applyOnlineGhostMaterial(root) {
  root.traverse((object) => {
    if (object.isLight) {
      object.visible = false;
      object.intensity = 0;
      return;
    }
    object.castShadow = false;
    object.receiveShadow = false;
    if (!object.isMesh || !object.material) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    const ghostMaterials = materials.map((material) => {
      const clone = material.clone();
      clone.transparent = true;
      clone.opacity = 0.46;
      clone.depthWrite = false;
      clone.emissive?.multiplyScalar?.(0.35);
      return clone;
    });
    object.material = Array.isArray(object.material) ? ghostMaterials : ghostMaterials[0];
  });
}

function updateOnlineRemoteCars(dt, visible) {
  const now = performance.now();
  for (const [playerId, remote] of onlineRoomState.remoteCars.entries()) {
    const stale = now - remote.lastSeen > 1600;
    remote.car.root.visible = visible && !stale;
    if (stale) continue;
    const pose = getInterpolatedOnlineRemoteSnapshot(remote, now);
    applyOnlineRemoteSnapshot(remote, pose, dt);
    if (remote.car.wheels?.frontLeft) remote.car.wheels.frontLeft.rotation.y = remote.target.steer;
    if (remote.car.wheels?.frontRight) remote.car.wheels.frontRight.rotation.y = remote.target.steer;
    for (const wheel of remote.car.wheelMeshes ?? []) {
      if (wheel) wheel.rotation.x = remote.target.wheelSpin;
    }
    updateRearWing(dt, remote.target.boostActive, remote.car);
    const remoteHeadlightsOn = shouldShowOpponentHeadlightsAt(remote.car.root.position);
    applyHeadlightQuality(remote.car, { isPlayer: false, forceVisible: remoteHeadlightsOn });
    for (const light of remote.car.lights?.headlights ?? []) {
      light.visible = remoteHeadlightsOn;
      light.intensity = remoteHeadlightsOn ? (light.userData.baseIntensity ?? 16) * 0.45 : 0;
    }
    for (const brakeLight of remote.car.lights?.brakeLights ?? []) {
      if (!brakeLight.material?.emissive) continue;
      brakeLight.material.emissiveIntensity = remote.target.brake ? 2.4 : 0.18;
    }
    updateLowGraphicsCarDetail(remote.car, remote.car.root.position);
  }
}

function resolveOnlineSoftRemoteCollisions(dt) {
  if (!isOnlineRaceGameMode() || !onlineRoomState.remoteCars.size || onlineRoomState.localFinished) return;
  for (const [playerId, cooldown] of onlineRoomState.collisionSendCooldowns.entries()) {
    const nextCooldown = cooldown - dt;
    if (nextCooldown <= 0) onlineRoomState.collisionSendCooldowns.delete(playerId);
    else onlineRoomState.collisionSendCooldowns.set(playerId, nextCooldown);
  }
  const playerBody = {
    kind: "player",
    position: carState.position,
    velocity: carState.velocity,
    headingRef: carState,
    get heading() { return carState.heading; },
    profile: getCarProfile(),
    root: car.root,
  };
  const playerBox = getRaceCarCollisionBox(playerBody);
  for (const [playerId, remote] of onlineRoomState.remoteCars.entries()) {
    if (!remote.car.root.visible) continue;
    const remoteBox = getRaceCarCollisionBox({
      kind: "remote",
      position: remote.car.root.position,
      velocity: remote.renderedVelocity ?? remote.target.velocity ?? scratchZeroVelocity,
      headingRef: { heading: remote.car.root.rotation.y },
      get heading() { return remote.car.root.rotation.y; },
      profile: getCarProfileById(remote.carId ?? selectedCar),
      root: remote.car.root,
    });
    const overlap = getOrientedBoxOverlap(playerBox, remoteBox);
    if (!overlap) continue;
    const normal = overlap.normal;
    const intoRemoteSpeed = carState.velocity.dot(normal);
    const correction = Math.min(overlap.depth + 0.02, 0.85);
    carState.position.addScaledVector(normal, -correction * 0.72);
    const remoteSpeedIntoPlayer = (remote.renderedVelocity ?? remote.target.velocity ?? scratchZeroVelocity).dot(normal);
    const impactSpeed = Math.max(0, intoRemoteSpeed - remoteSpeedIntoPlayer);
    if (intoRemoteSpeed > 0) carState.velocity.addScaledVector(normal, -intoRemoteSpeed * 0.42);
    const scrapeAxis = new THREE.Vector3(normal.z, 0, -normal.x);
    const scrapeSpeed = carState.velocity.dot(scrapeAxis);
    carState.velocity.addScaledVector(scrapeAxis, -scrapeSpeed * 0.035);
    const yawKick = THREE.MathUtils.clamp(normal.x * Math.cos(carState.heading) - normal.z * Math.sin(carState.heading), -1, 1) * 0.08;
    carState.yawRate += yawKick * dt;
    spawnCollisionSmoke(carState.position, normal, Math.max(4, Math.abs(intoRemoteSpeed), impactSpeed));
    if (impactSpeed > 13) spawnCrashSparks(carState.position.clone().add(remote.car.root.position).multiplyScalar(0.5), normal, impactSpeed);
    playCollisionSound(Math.max(Math.abs(intoRemoteSpeed), impactSpeed), "car");
    sendOnlineCollisionNudge(playerId, normal, overlap.depth, impactSpeed, yawKick);
  }
  syncCarVisualRoot(car.root, carState.position);
}

function sendOnlineCollisionNudge(targetPlayerId, normal, depth, impactSpeed, yawKick) {
  if (!targetPlayerId || onlineRoomState.collisionSendCooldowns.has(targetPlayerId)) return;
  const impulse = THREE.MathUtils.clamp(depth * 1.8 + impactSpeed * 0.05, 0.08, 1.25);
  onlineRoomState.collisionSendCooldowns.set(targetPlayerId, 0.18);
  sendOnlineRoomEvent("car_collision", {
    fromPlayerId: onlineRoomState.playerId,
    targetPlayerId,
    nx: roundOnlinePoseNumber(normal.x),
    nz: roundOnlinePoseNumber(normal.z),
    impulse: roundOnlinePoseNumber(impulse),
    yaw: roundOnlinePoseNumber(yawKick),
    t: performance.now(),
  });
}

function receiveOnlineCarCollision(payload = {}) {
  if (!isOnlineRaceGameMode() || !gameStarted || isMenuOpen() || onlineRoomState.localFinished) return;
  if (payload.targetPlayerId !== onlineRoomState.playerId) return;
  if (payload.fromPlayerId === onlineRoomState.playerId) return;
  const normal = new THREE.Vector3(Number(payload.nx) || 0, 0, Number(payload.nz) || 0);
  if (normal.lengthSq() < 0.0001) return;
  normal.normalize();
  const impulse = THREE.MathUtils.clamp(Number(payload.impulse) || 0, 0, 1.25);
  carState.position.addScaledVector(normal, impulse * 0.58);
  carState.velocity.addScaledVector(normal, impulse * 5.6);
  carState.yawRate += THREE.MathUtils.clamp(Number(payload.yaw) || 0, -0.12, 0.12);
  spawnCollisionSmoke(carState.position, normal, Math.max(4, impulse * 8));
  syncCarVisualRoot(car.root, carState.position);
}

function updateOnlineRaceHud() {
  const visible = isOnlineRaceGameMode() && gameStarted && !isMenuOpen();
  if (quickRaceHudEl) quickRaceHudEl.hidden = !visible;
  if (!visible) return;
  const entries = getOnlineRaceStandings();
  const playerIndex = entries.findIndex((entry) => entry.playerId === onlineRoomState.playerId);
  const playerProgress = onlineRoomState.progress.get(onlineRoomState.playerId) ?? { lap: 0 };
  const totalPlayers = Math.max(1, entries.length);
  const totalLaps = getOnlineRaceLapCount();
  const currentLap = getOnlineRaceCurrentLap();
  if (quickRacePositionEl) quickRacePositionEl.textContent = `${playerIndex >= 0 ? playerIndex + 1 : 1} / ${totalPlayers}`;
  if (quickRaceLapEl) quickRaceLapEl.textContent = onlineRoomState.localFinished ? `Finished - ${totalLaps} Laps` : `Lap ${currentLap} / ${totalLaps}`;
  if (quickRacePenaltyTimerEl) {
    quickRacePenaltyTimerEl.hidden = onlineRoomState.localPenaltyTime <= 0.05;
    quickRacePenaltyTimerEl.textContent = `+${formatQuickRacePenaltyTime(onlineRoomState.localPenaltyTime)}`;
  }
  if (quickRacePenaltyMessageEl) {
    quickRacePenaltyMessageEl.hidden = onlineRoomState.localPenaltyMessageTime <= 0 || !onlineRoomState.localPenaltyMessageText;
    quickRacePenaltyMessageEl.textContent = onlineRoomState.localPenaltyMessageText;
    quickRacePenaltyMessageEl.classList.toggle("is-serving", false);
  }
}

function getOnlineRaceStandings() {
  const now = performance.now();
  const playerIds = new Set([...onlineRoomState.players.keys(), ...onlineRoomState.progress.keys()]);
  const standings = [];
  for (const playerId of playerIds) {
    const progress = onlineRoomState.progress.get(playerId);
    if (!progress && playerId !== onlineRoomState.playerId) continue;
    if (progress?.lastSeen && playerId !== onlineRoomState.playerId && now - progress.lastSeen > 3500) continue;
    standings.push({
      playerId,
      raceDistance: progress?.raceDistance ?? 0,
      lap: progress?.lap ?? 0,
      progress: progress?.progress ?? 0,
      penaltyTime: progress?.penaltyTime ?? 0,
      finished: progress?.finished ?? false,
      finishTime: progress?.finishTime ?? null,
      adjustedFinishTime: progress?.adjustedFinishTime ?? null,
      player: onlineRoomState.players.get(playerId) ?? null,
    });
  }
  for (const [aiId, progress] of onlineRoomState.aiProgress.entries()) {
    standings.push({
      playerId: aiId,
      raceDistance: progress?.raceDistance ?? 0,
      lap: progress?.lap ?? 0,
      progress: progress?.progress ?? 0,
      penaltyTime: 0,
      finished: progress?.finished ?? false,
      finishTime: progress?.finishTime ?? null,
      adjustedFinishTime: progress?.adjustedFinishTime ?? null,
      player: { driverName: progress?.label ?? "AI" },
      isAi: true,
    });
  }
  standings.sort((a, b) => {
    if (a.finished && b.finished) return (a.adjustedFinishTime ?? Infinity) - (b.adjustedFinishTime ?? Infinity);
    if (a.finished !== b.finished) return a.finished ? -1 : 1;
    return b.raceDistance - a.raceDistance;
  });
  return standings;
}

function showOnlineRaceResults() {
  onlineRoomState.resultsShown = true;
  renderOnlineRaceResults();
  if (quickRaceResultsEl) quickRaceResultsEl.hidden = false;
}

function renderOnlineRaceResults() {
  if (!quickRaceResultsListEl) return;
  if (quickRaceResultsRestartButton) quickRaceResultsRestartButton.hidden = true;
  if (quickRaceResultsLobbyButton) quickRaceResultsLobbyButton.hidden = false;
  if (quickRaceResultsMenuButton) quickRaceResultsMenuButton.textContent = "Main Menu";
  const titleEl = quickRaceResultsEl?.querySelector("header span");
  if (titleEl) titleEl.textContent = "Online Race Complete";
  const ordered = getOnlineRaceStandings();
  const totalPlayers = Math.max(1, ordered.length);
  const playerIndex = ordered.findIndex((entry) => entry.playerId === onlineRoomState.playerId);
  if (quickRaceResultsPositionEl) quickRaceResultsPositionEl.textContent = `${playerIndex >= 0 ? playerIndex + 1 : 1} / ${totalPlayers}`;
  quickRaceResultsListEl.replaceChildren();
  for (const [index, entry] of ordered.entries()) {
    const row = document.createElement("li");
    row.className = entry.playerId === onlineRoomState.playerId ? "is-player" : "";
    const player = entry.player ?? {};
    const label = player.driverName || (entry.playerId === onlineRoomState.playerId ? "You" : "Driver");
    const time = entry.finished
      ? formatLapTime(entry.adjustedFinishTime ?? entry.finishTime ?? 0)
      : `Lap ${Math.min(getOnlineRaceLapCount(), (entry.lap ?? 0) + 1)} / ${getOnlineRaceLapCount()}`;
    const penalty = entry.penaltyTime > 0.05 ? ` +${formatQuickRacePenaltyTime(entry.penaltyTime)} penalties` : "";
    row.innerHTML = `<span>${index + 1}</span><strong>${label}</strong><small>${time}${penalty}</small>`;
    quickRaceResultsListEl.appendChild(row);
  }
}

function removeOnlineRemoteCars() {
  for (const remote of onlineRoomState.remoteCars.values()) {
    scene.remove(remote.car.root);
  }
  onlineRoomState.remoteCars.clear();
  onlineRoomState.collisionSendCooldowns.clear();
}

function renderOnlineRoom() {
  const modeLabel = onlineRoomState.role === "host" ? "Host Game" : onlineRoomState.role === "guest" ? "Join Game" : "Online Room";
  if (onlineRoomModeEl) onlineRoomModeEl.textContent = modeLabel;
  if (onlineRoomCodeEl) onlineRoomCodeEl.textContent = `Room ${onlineRoomState.roomCode || "----"}`;
  if (onlineRoomSummaryEl) {
    const settings = onlineRoomState.hostSettings ?? getOnlineRoomSettingsPayload();
    const privacyLabel = onlineRoomState.privacy === "private" ? "Private" : "Public";
    onlineRoomSummaryEl.textContent = onlineRoomState.hostSettings || onlineRoomState.role === "host"
      ? `${privacyLabel} / ${settings.trackName} / ${getCarClassLabel(settings.carClass)} / ${settings.carName} / ${settings.laps ?? 3} laps / ${settings.aiOpponentCount ?? 0} AI`
      : "Waiting for the host room.";
  }
  if (onlineRoomPlayersEl) {
    onlineRoomPlayersEl.replaceChildren();
    const players = [...onlineRoomState.players.values()];
    for (const player of players) {
      const row = document.createElement("li");
      const state = player.role === "host" ? "Host" : player.ready ? "Ready" : "Not Ready";
      row.innerHTML = `<span>${player.driverName || "Driver Name"}</span><span>${state}</span>`;
      onlineRoomPlayersEl.appendChild(row);
    }
  }
  updateOnlineHostSettingsControls();
  if (onlineRoomReadyButton) {
    onlineRoomReadyButton.textContent = onlineRoomState.ready ? "Ready" : "Ready Up";
    onlineRoomReadyButton.hidden = onlineRoomState.role === "host";
    onlineRoomReadyButton.disabled = onlineRoomState.role === "host";
  }
  if (onlineRoomStartDriveButton) {
    onlineRoomStartDriveButton.hidden = onlineRoomState.role !== "host";
    onlineRoomStartDriveButton.disabled = onlineRoomState.role !== "host" || !onlineRoomState.connected;
  }
  if (!onlineRoomStatusEl?.textContent) {
    renderOnlineRoomStatus(
      onlineRoomState.role === "host" ? "Host chooses the setup, then starts the race." : "Press Ready Up, then wait for the host to start.",
      "is-warning",
    );
  }
}

function updateOnlineHostSettingsControls() {
  if (onlineHostSettingsEl) onlineHostSettingsEl.hidden = onlineRoomState.role !== "host";
  if (onlineLobbyPrivacySelect) onlineLobbyPrivacySelect.value = onlineRoomState.privacy === "private" ? "private" : "public";
  if (onlineAiOpponentSlider) onlineAiOpponentSlider.value = String(selectedAiOpponentCount);
  if (onlineAiOpponentReadout) onlineAiOpponentReadout.textContent = String(selectedAiOpponentCount);
  if (onlineRaceLapSlider) onlineRaceLapSlider.value = String(selectedQuickRaceLapCount);
  if (onlineRaceLapReadout) onlineRaceLapReadout.textContent = String(selectedQuickRaceLapCount);
  if (onlineAiDifficultySelect) onlineAiDifficultySelect.value = selectedAiDifficulty;
}

function updateOnlineSessionRoomCodeHud() {
  if (!onlineSessionRoomCodeEl) return;
  const visible = isOnlineRaceGameMode() && gameStarted && !isMenuOpen() && Boolean(onlineRoomState.roomCode);
  onlineSessionRoomCodeEl.hidden = !visible;
  if (!visible) return;
  const valueEl = onlineSessionRoomCodeEl.querySelector("strong");
  if (valueEl) valueEl.textContent = onlineRoomState.roomCode;
}

function renderOnlineRoomStatus(text, className = "") {
  if (!onlineRoomStatusEl) return;
  onlineRoomStatusEl.textContent = text;
  onlineRoomStatusEl.classList.remove("is-good", "is-warning", "is-bad");
  if (className) onlineRoomStatusEl.classList.add(className);
}

function setOnlineJoinStatus(text, className = "") {
  if (!onlineJoinStatusEl) return;
  onlineJoinStatusEl.textContent = text;
  onlineJoinStatusEl.classList.remove("is-good", "is-warning", "is-bad");
  if (className) onlineJoinStatusEl.classList.add(className);
}

function previewTrackSelection(trackId) {
  if (menuStep !== "track") return;
  previewTrackId = trackId;
  for (const button of trackButtons) {
    button.classList.toggle("is-selected", button.dataset.track === previewTrackId);
  }
  updateMenuVisual();
}

function clearTrackPreview(trackId) {
  if (menuStep !== "track" || previewTrackId !== trackId) return;
  previewTrackId = null;
  for (const button of trackButtons) {
    button.classList.remove("is-selected");
  }
  updateMenuVisual();
}

function chooseTrackFromMenu(trackId) {
  previewTrackId = trackId;
  selectTrack(trackId);
  setMenuStep("car-category");
}

function selectTrack(trackId) {
  selectedTrack = trackId;
  clearAiOpponents();
  for (const button of trackButtons) {
    button.classList.toggle("is-selected", menuStep === "track" && button.dataset.track === (previewTrackId ?? selectedTrack));
  }

  scene.remove(track.group);
  track = createTrack(selectedTrack);
  scene.add(track.group);
  resetCar();
  updateMenuVisual();
}

function setMenuStep(step) {
  menuStep = step;
  if (menuStep === "track") {
    previewTrackId = null;
    for (const button of trackButtons) button.classList.remove("is-selected");
  }
  if (menuStep === "car-category") {
    previewCarCategory = null;
    for (const button of carCategoryButtons) button.classList.remove("is-selected");
  }
  startMenu.dataset.menuStep = menuStep;
  const titles = {
    intro: "The Paddock",
    settings: "Settings",
    "how-to-play": "How to Play",
    "driver-profile": "Driver Profile",
    "go-online": "Go Online",
    "online-join": "Join Game",
    "online-room": "Online Room",
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
  if (menuStep === "time-trial-setup" && selectedGameMode === "weekly-time-trial") menuTitle.textContent = "Weekly Time Trial";
  for (const stepEl of menuSteps) {
    stepEl.classList.toggle("is-hidden", stepEl.dataset.menuStep !== menuStep);
  }
  if (menuStep === "settings") renderSettingsMenu();
  if (menuStep === "how-to-play") renderHowToPlayTopic();
  if (menuStep === "car-category") updateCarCategoryAvailability();
  if (menuStep === "driver-profile") updateDriverProfilePage();
  if (menuStep === "online-room") renderOnlineRoom();
  if (menuStep === "time-trial-setup") renderWeeklyTimeTrialCard();
  updateMenuVisual();
}

function renderSettingsMenu() {
  gameSettings = normalizeGameSettings(gameSettings);
  if (graphicsQualitySelect) graphicsQualitySelect.value = gameSettings.graphicsQuality;
  if (defaultAiDifficultySelect) defaultAiDifficultySelect.value = gameSettings.defaultAiDifficulty;
  setSliderWithReadout(defaultOpponentsSlider, defaultOpponentsReadout, gameSettings.defaultOpponents);
  setSliderWithReadout(defaultRaceLapsSlider, defaultRaceLapsReadout, gameSettings.defaultRaceLaps);
  if (defaultCameraSelect) defaultCameraSelect.value = gameSettings.defaultCamera;
  setSliderWithReadout(playerEngineVolumeSlider, playerEngineVolumeReadout, gameSettings.playerEngineVolume, "%");
  setSliderWithReadout(opponentEngineVolumeSlider, opponentEngineVolumeReadout, gameSettings.opponentEngineVolume, "%");
  setSliderWithReadout(wheelSurfaceVolumeSlider, wheelSurfaceVolumeReadout, gameSettings.wheelSurfaceVolume, "%");
  setSliderWithReadout(collisionVolumeSlider, collisionVolumeReadout, gameSettings.collisionVolume, "%");
  setSliderWithReadout(crowdVolumeSlider, crowdVolumeReadout, gameSettings.crowdVolume, "%");
  setSliderWithReadout(natureVolumeSlider, natureVolumeReadout, gameSettings.natureVolume, "%");
  setSliderWithReadout(musicVolumeSlider, musicVolumeReadout, gameSettings.musicVolume, "%");
}

function setSliderWithReadout(slider, readout, value, suffix = "") {
  if (slider) slider.value = String(value);
  if (readout) readout.textContent = `${value}${suffix}`;
}

function updateGameSettingsFromInputs() {
  gameSettings = normalizeGameSettings({
    ...gameSettings,
    graphicsQuality: graphicsQualitySelect?.value,
    defaultAiDifficulty: defaultAiDifficultySelect?.value,
    defaultOpponents: defaultOpponentsSlider?.value,
    defaultRaceLaps: defaultRaceLapsSlider?.value,
    defaultCamera: defaultCameraSelect?.value,
    playerEngineVolume: playerEngineVolumeSlider?.value,
    opponentEngineVolume: opponentEngineVolumeSlider?.value,
    wheelSurfaceVolume: wheelSurfaceVolumeSlider?.value,
    collisionVolume: collisionVolumeSlider?.value,
    crowdVolume: crowdVolumeSlider?.value,
    natureVolume: natureVolumeSlider?.value,
    musicVolume: musicVolumeSlider?.value,
  });
  saveGameSettings();
  renderSettingsMenu();
  applyGraphicsSettings();
  applyMenuAudioVolume();
  applyRaceDefaultsFromSettings();
}

function applyGraphicsSettings() {
  renderer.setPixelRatio(getGraphicsPixelRatio());
  previewRenderer.setPixelRatio(getGraphicsPixelRatio());
  renderer.shadowMap.enabled = gameSettings.graphicsQuality !== "low";
  previewRenderer.shadowMap.enabled = gameSettings.graphicsQuality !== "low";
  sun.castShadow = gameSettings.graphicsQuality !== "low";
  previewKeyLight.castShadow = gameSettings.graphicsQuality !== "low";
  applySceneShadowQuality();
  applyHeadlightQuality(car, { isPlayer: true, forceVisible: carState.headlightsOn });
  applyCarVisualQuality(car, { isPlayer: true });
  const activeAiHeadlights = getActiveAiHeadlightOpponents();
  for (const opponent of aiOpponents) {
    tuneAiCarLights(opponent.car, opponent.position, activeAiHeadlights.has(opponent));
    applyCarVisualQuality(opponent.car, { isPlayer: false });
    updateLowGraphicsCarDetail(opponent.car, opponent.position);
  }
  for (const remote of onlineRoomState.remoteCars.values()) {
    const headlightsOn = shouldShowOpponentHeadlightsAt(remote.car.root.position);
    applyHeadlightQuality(remote.car, { isPlayer: false, forceVisible: headlightsOn });
    for (const light of remote.car.lights?.headlights ?? []) {
      light.visible = headlightsOn;
      light.intensity = headlightsOn ? (light.userData.baseIntensity ?? 16) * 0.45 : 0;
    }
    applyCarVisualQuality(remote.car, { isPlayer: false });
    updateLowGraphicsCarDetail(remote.car, remote.car.root.position);
  }
}

function applyCarVisualQuality(carModel, { isPlayer = false } = {}) {
  if (!carModel?.root) return;
  const allowShine = gameSettings.graphicsQuality === "high" || (gameSettings.graphicsQuality === "medium" && isPlayer);
  const allowShadow = gameSettings.graphicsQuality === "high" || (gameSettings.graphicsQuality === "medium" && isPlayer);
  carModel.root.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = allowShadow && object.userData.baseCastShadow !== false;
      object.receiveShadow = allowShadow && object.userData.baseReceiveShadow !== false;
    }
    const materials = object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : [];
    for (const material of materials) {
      if (!material || material.metalness === undefined || material.roughness === undefined) continue;
      if (material.userData.baseMetalness === undefined) material.userData.baseMetalness = material.metalness;
      if (material.userData.baseRoughness === undefined) material.userData.baseRoughness = material.roughness;
      material.metalness = allowShine ? material.userData.baseMetalness : 0;
      material.roughness = allowShine ? material.userData.baseRoughness : Math.max(0.86, material.userData.baseRoughness);
      material.needsUpdate = true;
    }
  });
}

function applySceneShadowQuality(root = scene) {
  root.traverse((object) => {
    if (!object.isMesh || !object.userData.costlySceneryShadow) return;
    object.castShadow = !shouldUseMediumOrLowGraphics() && object.userData.baseCastShadow !== false;
    object.receiveShadow = !shouldUseMediumOrLowGraphics() && object.userData.baseReceiveShadow !== false;
  });
}

function applyMenuAudioVolume() {
  if (menuAudio.element) menuAudio.element.volume = 0.35 * settingVolume("musicVolume");
  if (editorAudio.element) editorAudio.element.volume = 0.3 * settingVolume("musicVolume");
  if (raceIntroAudio.element) raceIntroAudio.element.volume = 0.58 * settingVolume("musicVolume");
}

function applyRaceDefaultsFromSettings() {
  selectedAiOpponentCount = gameSettings.defaultOpponents;
  selectedGridPosition = selectedAiOpponentCount + 1;
  selectedQuickRaceLapCount = gameSettings.defaultRaceLaps;
  selectedAiDifficulty = AI_DIFFICULTY_SETTINGS[gameSettings.defaultAiDifficulty] ? gameSettings.defaultAiDifficulty : "beginner";
  if (aiOpponentSlider) aiOpponentSlider.value = String(selectedAiOpponentCount);
  if (quickRaceLapSlider) quickRaceLapSlider.value = String(selectedQuickRaceLapCount);
  if (aiDifficultySelect) aiDifficultySelect.value = selectedAiDifficulty;
  if (onlineAiOpponentSlider) onlineAiOpponentSlider.value = String(selectedAiOpponentCount);
  if (onlineRaceLapSlider) onlineRaceLapSlider.value = String(selectedQuickRaceLapCount);
  if (onlineAiDifficultySelect) onlineAiDifficultySelect.value = selectedAiDifficulty;
  updateAiOpponentSelection();
  updateQuickRaceLapSelection();
  updateAiDifficultySelection();
  updateOnlineAiOpponentSelection();
  updateOnlineRaceLapSelection();
  updateOnlineAiDifficultySelection();
}

function selectHowToPlayTopic(topic) {
  selectedHowToPlayTopic = HOW_TO_PLAY_TOPICS[topic] ? topic : "quick-start";
  renderHowToPlayTopic();
}

function renderHowToPlayTopic() {
  const topic = HOW_TO_PLAY_TOPICS[selectedHowToPlayTopic] ?? HOW_TO_PLAY_TOPICS["quick-start"];
  for (const button of howToPlayTopicButtons) {
    button.classList.toggle("is-selected", button.dataset.howToPlayTopic === selectedHowToPlayTopic);
  }
  if (howToPlayTitleEl) howToPlayTitleEl.textContent = topic.title;
  if (howToPlaySummaryEl) howToPlaySummaryEl.textContent = topic.summary;
  if (howToPlayListEl) {
    howToPlayListEl.replaceChildren();
    for (const bullet of topic.bullets) {
      const item = document.createElement("li");
      item.textContent = bullet;
      howToPlayListEl.appendChild(item);
    }
  }
  if (howToPlayNoteEl) howToPlayNoteEl.textContent = topic.note;
}

function updateDriverProfilePage() {
  applyDriverProfileToInputs();
  const records = getLocalTimeTrialBestRecords();
  if (!driverProfileRecordsEl) return;
  driverProfileRecordsEl.replaceChildren();
  if (!records.length) {
    const empty = document.createElement("li");
    empty.className = "is-empty";
    empty.textContent = "No saved time trial bests yet.";
    driverProfileRecordsEl.appendChild(empty);
    updateTimeTrialHistoryRecords();
    return;
  }
  for (const record of records) {
    const row = document.createElement("li");
    row.innerHTML = `
      <div>
        <strong>${record.trackName}</strong>
        <span>${record.carClassLabel}</span>
      </div>
      <div>
        <strong>${formatLapTime(record.lapTime)}</strong>
        <span>${formatOnlineGhostSegmentSummary(record.segments)}</span>
      </div>
    `;
    driverProfileRecordsEl.appendChild(row);
  }
  updateTimeTrialHistoryRecords();
}

function getDefaultDriverProfile() {
  return {
    driverName: "Driver Name",
    teamName: "Team Name",
    primaryColor: "#242833",
    accentColor: "#f6f2e8",
  };
}

function loadDriverProfile() {
  try {
    const saved = JSON.parse(window.localStorage?.getItem("the-paddock:driver-profile") ?? "null");
    return { ...getDefaultDriverProfile(), ...(saved ?? {}) };
  } catch {
    return getDefaultDriverProfile();
  }
}

function saveDriverProfile() {
  try {
    window.localStorage?.setItem("the-paddock:driver-profile", JSON.stringify(driverProfile));
  } catch {
    // Profile edits still apply during this session if local storage is unavailable.
  }
}

function applyDriverProfileToInputs() {
  if (driverProfileNameInput) driverProfileNameInput.value = driverProfile.driverName || "Driver Name";
  if (driverProfileTeamInput) driverProfileTeamInput.value = driverProfile.teamName || "Team Name";
  if (teamPrimaryColorInput) teamPrimaryColorInput.value = normalizeHexColor(driverProfile.primaryColor, "#242833");
  if (teamAccentColorInput) teamAccentColorInput.value = normalizeHexColor(driverProfile.accentColor, "#f6f2e8");
  updateProfileTeamLabels();
  updateDriverProfilePreviewScheme();
}

function updateDriverProfileFromInputs() {
  const previousPrimary = driverProfile.primaryColor;
  const previousAccent = driverProfile.accentColor;
  driverProfile = {
    driverName: driverProfileNameInput?.value || "Driver Name",
    teamName: driverProfileTeamInput?.value || "Team Name",
    primaryColor: normalizeHexColor(teamPrimaryColorInput?.value, "#242833"),
    accentColor: normalizeHexColor(teamAccentColorInput?.value, "#f6f2e8"),
  };
  saveDriverProfile();
  updateDriverProfilePreviewScheme();
  updateProfileTeamLabels();
  const colorsChanged = previousPrimary !== driverProfile.primaryColor || previousAccent !== driverProfile.accentColor;
  if (menuStep === "driver-profile") {
    if (previewTitle) previewTitle.textContent = driverProfile.teamName || "Team Name";
    if (colorsChanged) updateMenuPreviewCar(true);
  }
  if (colorsChanged && Object.values(PROFILE_TEAM_CAR_IDS).includes(selectedCar)) refreshSelectedProfileTeamCar();
}

function updateProfileTeamLabels() {
  const label = driverProfile.teamName || "Team Name";
  for (const carId of Object.values(PROFILE_TEAM_CAR_IDS)) {
    const textEl = document.querySelector(`[data-car="${carId}"] strong`);
    if (textEl) textEl.textContent = label;
  }
}

function refreshSelectedProfileTeamCar() {
  if (!car?.root) return;
  scene.remove(car.root);
  car = createSelectedCar(selectedCar);
  scene.add(car.root);
  resetCar({ keepTimeTrialLaps: true });
}

function updateDriverProfilePreviewScheme() {
  carPaintSchemes[PROFILE_TEAM_CAR_IDS.formula] = getDriverProfileFormulaScheme(driverProfile);
  lmpPaintSchemes[PROFILE_TEAM_CAR_IDS.lmp] = getDriverProfileLmpScheme(driverProfile);
  stockPaintSchemes[PROFILE_TEAM_CAR_IDS.stock] = getDriverProfileStockScheme(driverProfile);
  jeepPaintSchemes[PROFILE_TEAM_CAR_IDS.jeep] = getDriverProfileJeepScheme(driverProfile);
  corvettePaintSchemes[PROFILE_TEAM_CAR_IDS.corvette] = getDriverProfileCorvetteScheme(driverProfile);
}

function getDriverProfileFormulaScheme(profile = getDefaultDriverProfile()) {
  const primary = hexColorToNumber(profile.primaryColor, 0x242833);
  const accent = hexColorToNumber(profile.accentColor, 0xf6f2e8);
  return {
    primary,
    secondary: darkenHexColor(profile.primaryColor, 0.5, 0x12151d),
    stripe: accent,
    accent,
    rearWing: accent,
    rearWingStripe: primary,
    sideStripeXs: [-0.34, 0.34],
    rim: accent,
  };
}

function getDriverProfileLmpScheme(profile = getDefaultDriverProfile()) {
  return {
    primary: hexColorToNumber(profile.primaryColor, 0x242833),
    secondary: darkenHexColor(profile.primaryColor, 0.52, 0x12151d),
    stripe: hexColorToNumber(profile.accentColor, 0xf6f2e8),
    glass: 0x9fd7ff,
  };
}

function getDriverProfileStockScheme(profile = getDefaultDriverProfile()) {
  return {
    primary: hexColorToNumber(profile.primaryColor, 0x242833),
    secondary: darkenHexColor(profile.primaryColor, 0.52, 0x12151d),
    stripe: hexColorToNumber(profile.accentColor, 0xf6f2e8),
    glass: 0x9fd7ff,
  };
}

function getDriverProfileJeepScheme(profile = getDefaultDriverProfile()) {
  return {
    primary: hexColorToNumber(profile.primaryColor, 0x242833),
    secondary: darkenHexColor(profile.primaryColor, 0.48, 0x12151d),
    stripe: hexColorToNumber(profile.accentColor, 0xf6f2e8),
    accent: hexColorToNumber(profile.accentColor, 0xf6f2e8),
    glass: 0x9fd7ff,
    camo: false,
  };
}

function getDriverProfileCorvetteScheme(profile = getDefaultDriverProfile()) {
  return {
    primary: hexColorToNumber(profile.primaryColor, 0x242833),
    secondary: darkenHexColor(profile.primaryColor, 0.48, 0x12151d),
    stripe: hexColorToNumber(profile.accentColor, 0xf6f2e8),
    glass: 0x9fd7ff,
    rim: hexColorToNumber(profile.accentColor, 0xf6f2e8),
    stripes: false,
  };
}

function normalizeHexColor(value, fallback) {
  const text = String(value ?? "").trim();
  return /^#[0-9a-f]{6}$/i.test(text) ? text : fallback;
}

function hexColorToNumber(value, fallback) {
  const normalized = normalizeHexColor(value, "");
  return normalized ? Number.parseInt(normalized.slice(1), 16) : fallback;
}

function darkenHexColor(value, amount = 0.52, fallback = 0x12151d) {
  const colorNumber = hexColorToNumber(value, null);
  if (colorNumber === null) return fallback;
  const color = new THREE.Color(colorNumber);
  color.multiplyScalar(amount);
  return color.getHex();
}

function getLocalTimeTrialBestRecords() {
  const prefix = "the-paddock:time-trial-best:";
  const records = [];
  try {
    for (let i = 0; i < (window.localStorage?.length ?? 0); i += 1) {
      const key = window.localStorage.key(i);
      if (!key?.startsWith(prefix)) continue;
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const best = JSON.parse(raw);
      if (!Number.isFinite(best?.lapTime)) continue;
      records.push({
        lapTime: best.lapTime,
        segments: best.segments ?? [],
        trackId: best.track?.id ?? "unknown-track",
        trackName: best.track?.name ?? "Unknown Track",
        carClassLabel: getCarClassLabel(best.car?.class),
      });
    }
  } catch {
    return records;
  }
  const bestByTrack = new Map();
  for (const record of records) {
    const existing = bestByTrack.get(record.trackId);
    if (!existing || record.lapTime < existing.lapTime) bestByTrack.set(record.trackId, record);
  }
  return [...bestByTrack.values()].sort((a, b) => a.trackName.localeCompare(b.trackName));
}

function updateTimeTrialHistoryRecords() {
  if (!timeTrialHistoryRecordsEl) return;
  seedTimeTrialHistoryFromExistingBests();
  const records = loadLocalTimeTrialRecords()
    .filter(isDisplayableSessionBestGhostRecord)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  timeTrialHistoryRecordsEl.replaceChildren();
  if (!records.length) {
    const empty = document.createElement("li");
    empty.className = "is-empty";
    empty.textContent = "No session-best ghosts saved yet.";
    timeTrialHistoryRecordsEl.appendChild(empty);
    setTimeTrialRecordsStatus("Your best ghost from each Time Trial session will save here.");
    return;
  }
  setTimeTrialRecordsStatus(`${records.length} session-best ghost${records.length === 1 ? "" : "s"} saved.`);
  for (const record of records.slice(0, 20)) {
    const row = document.createElement("li");
    const recordLabels = [
      record.driver?.name ?? "Driver Name",
      record.driver?.team ?? "Team Name",
      record.uploadedAt ? "Uploaded" : "Not Uploaded",
    ].filter(Boolean);
    const uploadLabel = record.uploadedAt ? "Uploaded" : "Upload Ghost";
    row.innerHTML = `
      <div>
        <strong>${record.track.name ?? "Unknown Track"}</strong>
        <span>${getCarClassLabel(record.car.class)}</span>
        <small>${recordLabels.join(" / ")}</small>
      </div>
      <div>
        <strong>${formatLapTime(record.lap.lapTime)}</strong>
        <span>${formatOnlineGhostSegmentSummary(record.lap.segments)}</span>
        <small>${formatHistoryDate(record.createdAt)}</small>
        <button class="profile-action-button profile-upload-button" type="button" data-upload-time-trial-record="${record.id}" ${record.uploadedAt ? "disabled" : ""}>${uploadLabel}</button>
      </div>
    `;
    timeTrialHistoryRecordsEl.appendChild(row);
  }
}

function isDisplayableSessionBestGhostRecord(record) {
  return record?.source === "local" &&
    record.sessionBest === true &&
    Array.isArray(record.ghost?.samples) &&
    record.ghost.samples.length >= 20;
}

function seedTimeTrialHistoryFromExistingBests() {
  const existingRecords = loadLocalTimeTrialRecords();
  if (existingRecords.length) return;
}

function getAllLocalTimeTrialBests() {
  const prefix = "the-paddock:time-trial-best:";
  const bests = [];
  try {
    for (let i = 0; i < (window.localStorage?.length ?? 0); i += 1) {
      const key = window.localStorage.key(i);
      if (!key?.startsWith(prefix)) continue;
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const best = JSON.parse(raw);
      if (Number.isFinite(best?.lapTime)) bests.push(best);
    }
  } catch {
    return bests;
  }
  return bests;
}

function formatHistoryDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved locally";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function getCarClassLabel(kind = "") {
  return {
    formula: "Formula",
    lmp: "Le Mans Prototype",
    stock: "Stock Car",
    jeep: "Jeep",
    corvette: "Corvette",
  }[kind] ?? capitalizeLabel(kind || "Car");
}

function capitalizeLabel(value = "") {
  return String(value)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getSelectedCarLabel() {
  return document.querySelector(`[data-car="${selectedCar}"] strong`)?.textContent ?? "The Paddock";
}

function getSelectedTrackLabel() {
  return getTrackLabelById(selectedTrack);
}

function getTrackLabelById(trackId) {
  return document.querySelector(`[data-track="${trackId}"] strong`)?.textContent ?? trackDefinitions[trackId]?.name ?? "Practice Track";
}

function isPaintMenuStep() {
  return ["formula", "lmp", "stock", "jeep", "corvette", "ai-opponents", "time-trial-setup"].includes(menuStep);
}

function updateMenuVisual() {
  const visual = menuStep === "intro" || menuStep === "settings" || menuStep === "how-to-play" || menuStep === "go-online" || menuStep === "online-join" || menuStep === "online-room"
    ? "intro"
    : (menuStep === "track" || menuStep === "editor-choice" || menuStep === "editor-default-track")
      ? "track"
      : menuStep === "driver-profile"
          ? "profile"
          : "car";
  for (const visualEl of showroomVisuals) {
    visualEl.classList.toggle("is-hidden", visualEl.dataset.showroomVisual !== visual);
  }
  const visibleTrackMapId = menuStep === "track" ? previewTrackId : selectedTrack;
  for (const map of trackMaps) {
    map.classList.toggle("is-hidden", !visibleTrackMapId || map.dataset.trackMap !== visibleTrackMapId);
    map.classList.toggle("is-selected", !!visibleTrackMapId && map.dataset.trackMap === visibleTrackMapId);
  }
  menuPreviewCanvas.classList.toggle("is-hidden", !isMenuPreviewCarStep());
  driverProfileCustomizerEl?.classList.toggle("is-hidden", menuStep !== "driver-profile");

  const labels = {
    intro: ["Ready to Roll", "Just Drive"],
    settings: ["Race Setup", "Settings"],
    "how-to-play": ["Driver Guide", "How to Play"],
    "driver-profile": ["Driver Profile", "My Garage"],
    "go-online": ["Online Racing", "Go Online"],
    "online-join": ["Online Racing", "Join Game"],
    "online-room": ["Room Code", onlineRoomState.roomCode || "Waiting"],
    "editor-choice": ["Track Editor", "Choose Starting Point"],
    "editor-default-track": ["Default Track", "Choose Layout"],
    track: previewTrackId ? ["Track Preview", getTrackLabelById(previewTrackId)] : ["Track Preview", "Hover a Track"],
    "car-category": previewCarCategory ? ["Class Preview", getCarClassLabel(previewCarCategory)] : ["Class Preview", "Hover a Class"],
    "ai-opponents": ["Race Grid", `${selectedAiOpponentCount} AI - ${getAiDifficultyLabel()}`],
    "time-trial-setup": selectedGameMode === "weekly-time-trial"
      ? ["Weekly Time Trial", `${getSelectedTrackLabel()} / ${getCarClassLabel(getCarProfile().kind)}`]
      : ["Time Trial", selectedTimeTrialMode === "record-line" ? "Record Driving Line" : "Normal Run"],
  };
  const [label, title] = labels[menuStep] ?? ["Selected Machine", getSelectedCarLabel()];
  const labelEl = previewTitle?.previousElementSibling;
  const showroomLabelEl = previewTitle?.closest(".showroom-label");
  if (showroomLabelEl) showroomLabelEl.hidden = menuStep === "intro";
  if (labelEl) labelEl.textContent = label;
  if (previewTitle) previewTitle.textContent = title;

  if (isMenuPreviewCarStep()) {
    updateMenuPreviewCar();
  } else if (previewCar) {
    previewScene.remove(previewCar.root);
    previewCar = null;
    previewCarId = "";
  }
}

function isMenuPreviewCarStep() {
  return isPaintMenuStep() || menuStep === "driver-profile" || (menuStep === "car-category" && !!previewCarCategory);
}

function updateAiOpponentSelection() {
  const count = THREE.MathUtils.clamp(Math.round(Number(aiOpponentSlider?.value ?? selectedAiOpponentCount) || 4), 1, 10);
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

function updateQuickRaceLapSelection() {
  const laps = THREE.MathUtils.clamp(Math.round(Number(quickRaceLapSlider?.value ?? selectedQuickRaceLapCount) || 3), 1, 10);
  selectedQuickRaceLapCount = laps;
  if (quickRaceLapSlider) quickRaceLapSlider.value = String(laps);
  if (quickRaceLapReadout) quickRaceLapReadout.textContent = String(laps);
  if (menuStep === "ai-opponents") updateMenuVisual();
}

function updateAiDifficultySelection() {
  const value = aiDifficultySelect?.value ?? selectedAiDifficulty;
  selectedAiDifficulty = AI_DIFFICULTY_SETTINGS[value] ? value : "standard";
  if (aiDifficultySelect) aiDifficultySelect.value = selectedAiDifficulty;
  if (menuStep === "ai-opponents") updateMenuVisual();
}

function getAiDifficultyLabel() {
  return AI_DIFFICULTY_SETTINGS[selectedAiDifficulty]?.label ?? AI_DIFFICULTY_SETTINGS.standard.label;
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
  if (selectedGameMode === "weekly-time-trial") {
    selectedTimeTrialMode = "standard";
    selectedTimeTrialGhostMode = "online";
    selectedOnlineGhostFilter = selectedOnlineGhostFilter === "mine" ? "mine" : "week";
  }
  timeTrialStandardButton?.classList.toggle("is-selected", selectedTimeTrialMode === "standard");
  timeTrialRecordLineButton?.classList.toggle("is-selected", selectedTimeTrialMode === "record-line");
  if (timeTrialModeGridEl) timeTrialModeGridEl.hidden = selectedGameMode === "weekly-time-trial";
  if (timeTrialSetupStartButton) timeTrialSetupStartButton.textContent = selectedGameMode === "weekly-time-trial" ? "Start Weekly Time Trial" : "Start Time Trial";
  if (timeTrialGhostSelect) timeTrialGhostSelect.value = selectedTimeTrialGhostMode;
  for (const button of timeTrialOnlineFilterButtons) {
    button.hidden = selectedGameMode === "weekly-time-trial" && button.dataset.onlineGhostFilter === "top";
  }
  updateTimeTrialOnlineGhostControls();
}

function updateTimeTrialGhostSelection() {
  const value = timeTrialGhostSelect?.value ?? "my-best";
  selectedTimeTrialGhostMode = ["my-best", "session-best", "online", "off"].includes(value) ? value : "my-best";
  if (timeTrialGhostSelect) timeTrialGhostSelect.value = selectedTimeTrialGhostMode;
  updateTimeTrialOnlineGhostControls();
  refreshSelectedTimeTrialGhost();
  if (selectedTimeTrialGhostMode === "online") {
    const records = getMatchingOnlineTimeTrialGhostRecords();
    if (records.length) {
      if (!selectedOnlineGhostRecordId) selectedOnlineGhostRecordId = records[0].id;
      renderOnlineGhostList(records);
      refreshSelectedTimeTrialGhost();
    } else {
      downloadOnlineTimeTrialGhostsForSelection();
    }
  }
}

function updateTimeTrialOnlineGhostControls() {
  const showOnlineControls = selectedTimeTrialGhostMode === "online";
  if (timeTrialOnlineBrowserEl) timeTrialOnlineBrowserEl.hidden = !showOnlineControls;
  if (timeTrialOnlineStatusEl) timeTrialOnlineStatusEl.hidden = !showOnlineControls || !timeTrialOnlineStatusEl.textContent;
  if (showOnlineControls) renderOnlineGhostList();
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
  if (isTimeTrialGameMode()) {
    timeTrialPaintStep = menuStep;
    const backButton = document.querySelector("[data-menu-step=\"time-trial-setup\"] [data-menu-back]");
    if (backButton) backButton.dataset.menuBack = timeTrialPaintStep;
    updateTimeTrialModeSelection();
    setMenuStep("time-trial-setup");
    return;
  }
  if (selectedGameMode === "online-host") {
    completeOnlineHostSetup();
    return;
  }
  if (selectedGameMode !== "quick-race") {
    startGame();
    return;
  }
  quickRacePaintStep = menuStep;
  updateAiOpponentSelection();
  updateQuickRaceLapSelection();
  updateAiDifficultySelection();
  setMenuStep("ai-opponents");
}

function updateMenuPreviewCar(force = false) {
  if (!menuPreviewReady || !menuPreviewCanvas || !isMenuPreviewCarStep()) return;
  const profilePreview = menuStep === "driver-profile";
  const categoryPreview = menuStep === "car-category" && !!previewCarCategory;
  const carId = profilePreview
    ? PROFILE_TEAM_CAR_IDS.stock
    : categoryPreview
      ? getDefaultCarForCategory(previewCarCategory)
      : selectedCar;
  const previewId = profilePreview
    ? `${carId}:${driverProfile.primaryColor}:${driverProfile.accentColor}`
    : categoryPreview
      ? `${carId}:category-preview`
      : carId;
  if (!force && previewCarId === previewId) {
    if (previewTitle) previewTitle.textContent = profilePreview
      ? driverProfile.teamName || "Team Name"
      : categoryPreview
        ? getCarClassLabel(previewCarCategory)
        : getSelectedCarLabel();
    return;
  }
  const previousRotationY = previewCar?.root?.rotation?.y ?? Math.PI * 0.18;
  previewCarId = previewId;
  if (previewCar) previewScene.remove(previewCar.root);
  if (profilePreview) updateDriverProfilePreviewScheme();
  previewCar = createSelectedCar(carId);
  previewCar.root.position.set(0, 0, 0);
  previewCar.root.rotation.set(0, force ? previousRotationY : Math.PI * 0.18, 0);
  const profile = getCarProfileById(carId) ?? (profilePreview ? carProfiles["orange-stock"] : getCarProfile());
  const scale = profile.kind === "jeep" ? 0.72 : profile.kind === "formula" ? 0.66 : 0.68;
  previewCar.root.scale.setScalar(scale);
  previewScene.add(previewCar.root);
  if (previewTitle) previewTitle.textContent = profilePreview
    ? driverProfile.teamName || "Team Name"
    : categoryPreview
      ? getCarClassLabel(previewCarCategory)
      : getSelectedCarLabel();
}

function updateMenuPreview(dt) {
  if (!isMenuPreviewCarStep()) return;
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
    setCarBodyLean(previewCar, 0, Math.sin(clock.elapsedTime * 1.6) * 0.012);
  }
  previewRenderer.render(previewScene, previewCamera);
}

function isMenuOpen() {
  return !startMenu.classList.contains("is-hidden");
}

function shouldPauseSimulationForPauseMenu() {
  return !isOnlineRaceGameMode() || onlineRoomState.role === "host";
}

function updateSessionMenuButton() {
  if (!sessionMenuButton) return;
  sessionMenuButton.hidden = !gameStarted || isMenuOpen() || !trackEditor.classList.contains("is-hidden");
}

function updateControlsReminderVisibility() {
  if (!controlsEl) return;
  controlsEl.hidden = gameStarted && isRaceSessionGameMode();
}

function updatePauseMenuContent() {
  if (!pauseMenuEl) return;
  const modeLabels = {
    drive: "Just Drive",
    "time-trial": "Time Trial",
    "weekly-time-trial": "Weekly Time Trial",
    "quick-race": "Quick Race",
    "online-race": "Online Race",
  };
  const modeLabel = modeLabels[selectedGameMode] ?? "Session";
  const onlineGuest = isOnlineRaceGameMode() && onlineRoomState.role !== "host";
  if (pauseMenuModeEl) pauseMenuModeEl.textContent = onlineGuest ? "Menu Open" : "Paused";
  if (pauseMenuTitleEl) pauseMenuTitleEl.textContent = modeLabel;
  if (pauseMenuDetailEl) {
    pauseMenuDetailEl.textContent = onlineGuest
      ? "Online races keep running while this menu is open."
      : `${getSelectedTrackLabel()} / ${getSelectedCarLabel()}`;
  }
  if (pauseMenuRestartButton) {
    pauseMenuRestartButton.hidden = isOnlineRaceGameMode();
    pauseMenuRestartButton.textContent = selectedGameMode === "quick-race" ? "Restart Race" : "Restart Session";
  }
  if (pauseMenuSettingsButton) pauseMenuSettingsButton.disabled = onlineGuest;
}

function openPauseMenu() {
  if (!gameStarted || isMenuOpen()) return;
  pauseMenuOpen = true;
  if (pauseMenuEl) pauseMenuEl.hidden = false;
  updatePauseMenuContent();
  if (shouldPauseSimulationForPauseMenu()) setPaused(true);
  else {
    keys.clear();
    silencePlayerEngineAudio();
  }
  stopRaceIntroMusic();
}

function closePauseMenu({ restorePause = true } = {}) {
  pauseMenuOpen = false;
  pauseSettingsOpen = false;
  if (pauseMenuEl) pauseMenuEl.hidden = true;
  if (restorePause) setPaused(false);
  keys.clear();
}

function togglePauseMenu() {
  if (pauseMenuOpen) closePauseMenu();
  else openPauseMenu();
}

function restartCurrentSessionFromPauseMenu() {
  closePauseMenu({ restorePause: false });
  if (selectedGameMode === "quick-race") {
    restartQuickRaceFromResults();
    return;
  }
  resetCar();
  setPaused(false);
}

function openSettingsFromPauseMenu() {
  if (isOnlineRaceGameMode() && onlineRoomState.role !== "host") {
    if (pauseMenuDetailEl) pauseMenuDetailEl.textContent = "Settings are locked during an online race unless you are the host.";
    return;
  }
  pauseMenuOpen = false;
  if (pauseMenuEl) pauseMenuEl.hidden = true;
  pauseSettingsOpen = true;
  setPaused(true);
  setMenuStep("settings");
  startMenu.classList.remove("is-hidden");
  pauseBadge.hidden = true;
  keys.clear();
}

function setPaused(paused) {
  isPaused = paused;
  pauseBadge.hidden = !isPaused || isMenuOpen() || pauseMenuOpen;
  if (isPaused) keys.clear();
  if (isPaused || isMenuOpen() || pauseMenuOpen) silencePlayerEngineAudio();
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
    version: sourceTrack.version ?? TRACK_VERSION_BY_ID[definitionId] ?? `${definitionId}-v1`,
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
      registerTreeAudioSource(position.x, position.z, item.type, 1.4);
    } else if (item.type === "cherry-trees") {
      addEditorCherryTreeCluster(group, position.x, position.z, item.rotation ?? 0, obstacles);
      registerTreeAudioSource(position.x, position.z, item.type, 1.35);
    } else if (item.type === "douglas-pines") {
      addEditorDouglasPines(group, position.x, position.z, item.rotation ?? 0, obstacles);
      registerTreeAudioSource(position.x, position.z, item.type, 1.8);
    } else if (item.type === "maple-tree") {
      addEditorMapleTree(group, position.x, position.z, item.rotation ?? 0, obstacles);
      registerTreeAudioSource(position.x, position.z, item.type, 1.65);
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
  markCostlySceneryShadow(cluster);
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
  markCostlySceneryShadow(cluster);
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
  markCostlySceneryShadow(cluster);
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
  markCostlySceneryShadow(maple);
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
  markCostlySceneryShadow(cluster);
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
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xbfc6c9, roughness: 0.86, metalness: 0, flatShading: true });
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0xff7a1f, roughness: 0.9, metalness: 0, flatShading: true });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x202532, roughness: 0.88, metalness: 0, flatShading: true });
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
  markCostlySceneryShadow(stand);
  registerSceneryCullable(stand, 650);
  registerCrowdEmitter(stand, { radius: 132, strength: 1.15 });
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
  markCostlySceneryShadow(building);
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
  registerSceneryLight(glow, 82, "lamp");
  pole.receiveShadow = true;
  arm.receiveShadow = true;
  lamp.add(groundGlow, pole, arm, light, glow);
  lamp.position.set(x, 0, z);
  lamp.rotation.y = editorRotationToWorld(rotation);
  lamp.scale.setScalar(0.85);
  markCostlySceneryShadow(lamp);
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
  markCostlySceneryShadow(bed);
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
  stopRaceIntroMusic();
  setMenuStep("car-category");
  startMenu.classList.remove("is-hidden");
  pauseBadge.hidden = true;
  keys.clear();
}

function openWeeklyTimeTrialMenu() {
  setPaused(true);
  stopRaceIntroMusic();
  selectedTimeTrialMode = "standard";
  selectedTimeTrialGhostMode = "online";
  selectedOnlineGhostFilter = selectedOnlineGhostFilter === "mine" ? "mine" : "week";
  const backButton = document.querySelector("[data-menu-step=\"time-trial-setup\"] [data-menu-back]");
  if (backButton) backButton.dataset.menuBack = "go-online";
  updateTimeTrialModeSelection();
  renderWeeklyTimeTrialCard();
  setMenuStep("time-trial-setup");
  startMenu.classList.remove("is-hidden");
  pauseBadge.hidden = true;
  keys.clear();
}

function startGame() {
  closePauseMenu({ restorePause: false });
  gameStarted = true;
  setPaused(false);
  startMenu.classList.add("is-hidden");
  stopMenuMusic();
  startEngineAudio();
  forceAudioProbe();
  cameraMode = gameSettings.defaultCamera;
  resetCar();
  setupQuickRaceOpponents();
  resetQuickRaceState();
  startRaceCountdown();
  updateTimeTrialHud();
  updateQuickRaceHud();
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
  audio.volume = 0.3 * settingVolume("musicVolume");
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
    menuAudio.element.volume = 0.35 * settingVolume("musicVolume");
  }
  menuAudio.element.volume = 0.35 * settingVolume("musicVolume");
  menuAudio.element.play().catch(() => {});
}

function stopMenuMusic() {
  if (menuAudio.element) {
    menuAudio.element.pause();
    menuAudio.element.currentTime = 0;
    menuAudio.element = null;
  }

}

function startRaceIntroMusic() {
  const src = RACE_INTRO_MUSIC_SRCS[activeTimeOfDay];
  if (!src) {
    stopRaceIntroMusic();
    return;
  }
  if (raceIntroAudio.element && raceIntroAudio.timeOfDay === activeTimeOfDay) {
    raceIntroAudio.element.currentTime = 0;
  } else {
    stopRaceIntroMusic();
    raceIntroAudio.element = new Audio(src);
    raceIntroAudio.element.preload = "auto";
    raceIntroAudio.element.loop = false;
    raceIntroAudio.timeOfDay = activeTimeOfDay;
  }
  raceIntroAudio.element.volume = 0.58 * settingVolume("musicVolume");
  raceIntroAudio.element.play().catch(() => {});
}

function stopRaceIntroMusic() {
  if (!raceIntroAudio.element) return;
  raceIntroAudio.element.pause();
  raceIntroAudio.element.currentTime = 0;
  raceIntroAudio.element = null;
  raceIntroAudio.timeOfDay = "";
}

function startEngineAudio() {
  if (pauseMenuOpen || isMenuOpen() || isPaused) {
    silencePlayerEngineAudio();
    return;
  }
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
    audioState.element.volume = 0.34 * settingVolume("playerEngineVolume");
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
  const opponentEngineMaster = context.createGain();
  const tireNoise = createLoopingNoiseSource(context);
  const surfaceNoise = createLoopingNoiseSource(context);
  const kerbNoise = createLoopingNoiseSource(context);
  const tireFilter = context.createBiquadFilter();
  const surfaceFilter = context.createBiquadFilter();
  const kerbFilter = context.createBiquadFilter();
  const tireGain = context.createGain();
  const surfaceGain = context.createGain();
  const kerbGain = context.createGain();
  const shiftGain = context.createGain();
  const compressor = context.createDynamicsCompressor();

  engine.type = "triangle";
  sub.type = "triangle";
  grumble.type = "sine";
  ers.type = "sawtooth";
  brake.type = "sawtooth";
  tireFilter.type = "bandpass";
  tireFilter.frequency.value = 950;
  tireFilter.Q.value = 1.1;
  surfaceFilter.type = "lowpass";
  surfaceFilter.frequency.value = 650;
  kerbFilter.type = "bandpass";
  kerbFilter.frequency.value = 170;
  kerbFilter.Q.value = 0.9;
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
  opponentEngineMaster.gain.value = 0.42 * settingVolume("opponentEngineVolume");
  tireGain.gain.value = 0;
  surfaceGain.gain.value = 0;
  kerbGain.gain.value = 0;
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
  tireNoise.connect(tireFilter);
  tireFilter.connect(tireGain);
  tireGain.connect(master);
  surfaceNoise.connect(surfaceFilter);
  surfaceFilter.connect(surfaceGain);
  surfaceGain.connect(master);
  kerbNoise.connect(kerbFilter);
  kerbFilter.connect(kerbGain);
  kerbGain.connect(master);
  opponentEngineMaster.connect(master);
  shiftGain.connect(master);
  master.connect(compressor);
  compressor.connect(context.destination);

  engine.start();
  sub.start();
  grumble.start();
  ers.start();
  brake.start();
  tireNoise.start();
  surfaceNoise.start();
  kerbNoise.start();

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
  audioState.opponentEngineMaster = opponentEngineMaster;
  audioState.tireNoise = tireNoise;
  audioState.surfaceNoise = surfaceNoise;
  audioState.kerbNoise = kerbNoise;
  audioState.tireGain = tireGain;
  audioState.surfaceGain = surfaceGain;
  audioState.kerbGain = kerbGain;
  audioState.tireFilter = tireFilter;
  audioState.surfaceFilter = surfaceFilter;
  audioState.kerbFilter = kerbFilter;
  audioState.filter = filter;
  audioState.lowShelf = lowShelf;
  audioState.shiftGain = shiftGain;
}

function silencePlayerEngineAudio() {
  if (audioState.element) audioState.element.volume = 0;
  if (audioState.ersElement) audioState.ersElement.volume = 0;
  if (audioState.brakeElement) audioState.brakeElement.volume = 0;
  if (!audioState.context) return;
  const now = audioState.context.currentTime;
  for (const gain of [
    audioState.engineGain,
    audioState.subGain,
    audioState.grumbleGain,
    audioState.ersGain,
    audioState.brakeGain,
  ]) {
    gain?.gain?.setTargetAtTime(0, now, 0.04);
  }
}

function updateEngineAudio(dt, forwardSpeed, throttle, boostActive, profile, hardBraking = false) {
  if (!gameStarted || isPaused || isMenuOpen() || pauseMenuOpen) {
    silencePlayerEngineAudio();
    return;
  }
  const playerVolume = settingVolume("playerEngineVolume");
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
    audioState.element.volume = THREE.MathUtils.lerp(0.08, profile.kind === "formula" ? 0.72 : isCorvette ? 0.74 : 0.62, throttle ? 1 : 0.2) * playerVolume;
    if (audioState.ersElement) {
      const ersTargetVolume = boostActive && profile.hasErs ? (profile.kind === "corvette" ? 0.12 : 0.082) * playerVolume : 0;
      const boostFade = profile.kind === "corvette" ? (boostActive ? 2.5 : 1.5) : (boostActive ? 8 : 3.2);
      audioState.ersElement.volume = THREE.MathUtils.damp(audioState.ersElement.volume, ersTargetVolume, boostFade, dt);
      audioState.ersElement.playbackRate = THREE.MathUtils.lerp(profile.kind === "corvette" ? 0.48 : 0.72, profile.kind === "corvette" ? 0.82 : 1.18, rpmRatio);
    }
    if (audioState.brakeElement) {
      audioState.brakeElement.volume = THREE.MathUtils.damp(audioState.brakeElement.volume, hardBraking ? 0.12 * playerVolume : 0, hardBraking ? 3.2 : 2.4, dt);
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
    hardBraking ? THREE.MathUtils.lerp(460, 1080, rpmRatio) : THREE.MathUtils.lerp(74, 104, rpmRatio),
    now,
    hardBraking ? 0.13 : 0.18,
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
    (profile.kind === "formula" || isCorvette
      ? 0.05 + rpmRatio * 0.15 * throttleLift
      : profile.kind === "jeep"
        ? 0.096 + rpmRatio * 0.18 * throttleLift
        : 0.045 + rpmRatio * 0.12 * throttleLift) * playerVolume,
    now,
    0.04,
  );
  audioState.subGain.gain.setTargetAtTime(
    (profile.kind === "formula" || isCorvette
      ? 0.055 + (1 - rpmRatio) * 0.04 + throttle * 0.085
      : profile.kind === "jeep"
        ? 0.192 + throttle * 0.192
        : 0.08 + throttle * 0.11) * playerVolume,
    now,
    0.06,
  );
  audioState.grumbleGain.gain.setTargetAtTime(
    (profile.kind === "formula" || isCorvette
      ? 0.018 + throttle * 0.11 + (1 - rpmRatio) * 0.012
      : profile.kind === "jeep"
        ? 0.108 + throttle * 0.24 + (1 - rpmRatio) * 0.06
        : 0.055 + throttle * 0.14 + (1 - rpmRatio) * 0.025) * playerVolume,
    now,
    0.08,
  );
  audioState.ersGain.gain.setTargetAtTime(
    boostActive && profile.hasErs ? (profile.kind === "corvette" ? 0.04 : 0.025) * playerVolume : 0.0001,
    now,
    profile.kind === "corvette" ? (boostActive ? 0.55 : 0.65) : (boostActive ? 0.16 : 0.18),
  );
  audioState.brakeGain.gain.setTargetAtTime(
    hardBraking ? 0.036 * playerVolume : jeepShiftCue ? 0.018 * playerVolume : 0.0001,
    now,
    hardBraking ? 0.18 : 0.26,
  );

  audioState.lastGear = carState.gear;

  if (Math.abs(forwardSpeed) < 0.5 && !throttle) {
    audioState.engine.frequency.setTargetAtTime(82, now, 0.08);
  }
}

function createLoopingNoiseSource(context) {
  const bufferSize = Math.floor(context.sampleRate * 1.2);
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  let previous = 0;
  for (let i = 0; i < bufferSize; i += 1) {
    const white = Math.random() * 2 - 1;
    previous = previous * 0.58 + white * 0.42;
    data[i] = previous;
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function updateSurfaceAudio(dt, state = {}) {
  if (!audioState.context || audioState.element || !audioState.tireGain) return;
  const now = audioState.context.currentTime;
  if (!gameStarted || isPaused || isMenuOpen() || pauseMenuOpen) {
    audioState.tireGain.gain.setTargetAtTime(0, now, 0.12);
    audioState.surfaceGain.gain.setTargetAtTime(0, now, 0.12);
    audioState.kerbGain.gain.setTargetAtTime(0, now, 0.12);
    return;
  }
  const speed = state.speedAbs ?? 0;
  const speedFactor = THREE.MathUtils.smoothstep(speed, 6, 52);
  const brakeScrub = state.brake && speed > 16 ? THREE.MathUtils.smoothstep(speed, 16, 58) * 0.32 : 0;
  const turnScrub = THREE.MathUtils.clamp(Math.abs(state.lateralSpeed ?? 0) / 12 + Math.abs(state.yawRate ?? 0) * 0.38, 0, 1);
  const handbrakeScrub = state.handbrake ? 0.45 : 0;
  const surfaceVolume = settingVolume("wheelSurfaceVolume");
  const tireTarget = Math.min(0.065, (turnScrub * 0.0375 + brakeScrub * 0.09 + handbrakeScrub * 0.5) * speedFactor) * surfaceVolume;
  const wheelSurface = state.wheelSurface ?? {};
  const offTrackRatio = wheelSurface.grassRatio ?? 0;
  const surfaceTarget = Math.min(0.075, offTrackRatio * THREE.MathUtils.smoothstep(speed, 5, 38) * (state.offTrackEnvironment === "dirt" ? 0.09 : 0.0575)) * surfaceVolume;
  const kerbRatio = Math.max(wheelSurface.kerbRatio ?? 0, wheelSurface.paintedKerbRatio ?? 0);
  const sausageRatio = wheelSurface.sausageRatio ?? 0;
  const kerbTarget = Math.min(0.09, (kerbRatio * 0.0525 + sausageRatio * 0.09) * THREE.MathUtils.smoothstep(speed, 5, 34)) * surfaceVolume;
  audioState.tireFilter.frequency.setTargetAtTime(THREE.MathUtils.lerp(740, 1850, speedFactor), now, 0.08);
  audioState.tireFilter.Q.setTargetAtTime(THREE.MathUtils.lerp(0.8, 2.1, turnScrub), now, 0.08);
  audioState.surfaceFilter.frequency.setTargetAtTime(state.offTrackEnvironment === "tarmac" ? 980 : state.offTrackEnvironment === "dirt" ? 560 : 680, now, 0.12);
  audioState.kerbFilter.frequency.setTargetAtTime(THREE.MathUtils.lerp(115, 340, THREE.MathUtils.clamp(speed / 44, 0, 1)), now, 0.05);
  audioState.kerbFilter.Q.setTargetAtTime(THREE.MathUtils.lerp(0.7, 1.7, sausageRatio), now, 0.08);
  audioState.tireGain.gain.setTargetAtTime(tireTarget, now, 0.075);
  audioState.surfaceGain.gain.setTargetAtTime(surfaceTarget, now, 0.11);
  audioState.kerbGain.gain.setTargetAtTime(kerbTarget, now, 0.045);
}

function ensureOpponentEngineVoices() {
  if (!audioState.context || !audioState.opponentEngineMaster) return [];
  if (audioState.opponentEngines.length) return audioState.opponentEngines;
  for (let i = 0; i < 3; i += 1) {
    const voice = createOpponentEngineVoice(audioState.context);
    voice.output.connect(audioState.opponentEngineMaster);
    audioState.opponentEngines.push(voice);
  }
  return audioState.opponentEngines;
}

function createOpponentEngineVoice(context) {
  const engine = context.createOscillator();
  const sub = context.createOscillator();
  const filter = context.createBiquadFilter();
  const engineGain = context.createGain();
  const subGain = context.createGain();
  const panner = context.createStereoPanner?.() ?? null;
  const output = context.createGain();
  engine.type = "sawtooth";
  sub.type = "triangle";
  filter.type = "lowpass";
  filter.frequency.value = 900;
  filter.Q.value = 0.7;
  engineGain.gain.value = 0;
  subGain.gain.value = 0;
  output.gain.value = 0;
  engine.connect(filter);
  filter.connect(engineGain);
  sub.connect(subGain);
  engineGain.connect(panner ?? output);
  subGain.connect(panner ?? output);
  if (panner) panner.connect(output);
  engine.start();
  sub.start();
  return {
    engine,
    sub,
    filter,
    engineGain,
    subGain,
    panner,
    output,
    assignedId: "",
    lastFront: null,
    passSwell: 0,
  };
}

function updateOpponentEngineAudio(dt) {
  if (audioState.element) return;
  if (audioState.opponentEngineMaster) audioState.opponentEngineMaster.gain.setTargetAtTime(0.42 * settingVolume("opponentEngineVolume"), audioState.context.currentTime, 0.12);
  if (!gameStarted || isPaused || isMenuOpen() || pauseMenuOpen || !audioState.context || !audioState.opponentEngineMaster) {
    fadeOpponentEngineVoices(dt);
    return;
  }
  const candidates = getOpponentEngineCandidates();
  const voices = ensureOpponentEngineVoices();
  const now = audioState.context.currentTime;
  for (let i = 0; i < voices.length; i += 1) {
    const voice = voices[i];
    const candidate = candidates[i];
    if (!candidate) {
      setOpponentEngineVoiceGain(voice, 0, now, dt);
      voice.assignedId = "";
      continue;
    }
    updateOpponentEngineVoice(voice, candidate, now, dt);
  }
}

function updateCrowdAudio(dt) {
  if (audioState.element) return;
  if (!gameStarted || isPaused || isMenuOpen() || pauseMenuOpen || !audioState.context || !crowdEmitters.length || settingVolume("crowdVolume") <= 0) {
    fadeCrowdVoices(dt);
    return;
  }
  ensureCrowdAudio();
  if (!audioState.crowdBuffer || !audioState.crowdVoices.length) return;

  const candidates = getCrowdAudioCandidates();
  const now = audioState.context.currentTime;
  for (let i = 0; i < audioState.crowdVoices.length; i += 1) {
    const voice = audioState.crowdVoices[i];
    const candidate = candidates[i];
    if (!candidate) {
      voice.output.gain.setTargetAtTime(0, now, Math.max(0.18, dt * 3));
      continue;
    }
    voice.output.gain.setTargetAtTime(candidate.gain, now, 0.32);
    voice.panner?.pan.setTargetAtTime(candidate.pan, now, 0.2);
  }
}

function ensureCrowdAudio() {
  if (!audioState.context || audioState.element || audioState.crowdLoading) return;
  if (!audioState.crowdBuffer) {
    audioState.crowdLoading = true;
    fetch(CROWD_CHEER_SRC)
      .then((response) => response.arrayBuffer())
      .then((buffer) => audioState.context.decodeAudioData(buffer))
      .then((decoded) => {
        audioState.crowdBuffer = decoded;
        audioState.crowdLoading = false;
        createCrowdVoices();
      })
      .catch(() => {
        audioState.crowdLoading = false;
      });
    return;
  }
  if (!audioState.crowdVoices.length) createCrowdVoices();
}

function createCrowdVoices() {
  if (!audioState.context || !audioState.crowdBuffer || audioState.crowdVoices.length) return;
  const voiceCount = 4;
  for (let i = 0; i < voiceCount; i += 1) {
    const source = audioState.context.createBufferSource();
    const filter = audioState.context.createBiquadFilter();
    const output = audioState.context.createGain();
    const panner = audioState.context.createStereoPanner?.() ?? null;
    source.buffer = audioState.crowdBuffer;
    source.loop = true;
    source.playbackRate.value = 0.96 + i * 0.025;
    filter.type = "lowpass";
    filter.frequency.value = 2100;
    output.gain.value = 0;
    source.connect(filter);
    filter.connect(panner ?? output);
    if (panner) panner.connect(output);
    output.connect(audioState.context.destination);
    const offset = audioState.crowdBuffer.duration ? (i * 7.3) % audioState.crowdBuffer.duration : 0;
    source.start(0, offset);
    audioState.crowdVoices.push({ source, filter, output, panner });
  }
}

function fadeCrowdVoices(dt) {
  if (!audioState.context || !audioState.crowdVoices.length) return;
  const now = audioState.context.currentTime;
  for (const voice of audioState.crowdVoices) voice.output.gain.setTargetAtTime(0, now, Math.max(0.16, dt * 3));
}

function getCrowdAudioCandidates() {
  const forward = new THREE.Vector3(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const raceEnergy = selectedGameMode === "quick-race" || isOnlineRaceGameMode()
    ? 1
    : isTimeTrialGameMode()
      ? 0.42
      : 0.32;
  const qualityScale = gameSettings.graphicsQuality === "low" ? 0.72 : gameSettings.graphicsQuality === "high" ? 1.08 : 1;
  const candidates = [];
  for (const emitter of crowdEmitters) {
    if (!emitter.object?.visible) continue;
    emitter.object.getWorldPosition(scratchLightPosition);
    const distance = scratchLightPosition.distanceTo(carState.position);
    const radius = (emitter.radius ?? 118) * qualityScale;
    if (distance > radius) continue;
    const falloff = 1 - distance / radius;
    const offset = scratchLightPosition.clone().sub(carState.position);
    const side = THREE.MathUtils.clamp(offset.dot(right) / Math.max(distance, 1), -1, 1);
    const front = THREE.MathUtils.clamp(offset.dot(forward) / Math.max(distance, 1), -1, 1);
    const directionalGain = THREE.MathUtils.lerp(0.74, 1.08, (front + 1) * 0.5);
    const gain = Math.min(0.19, falloff * falloff * directionalGain * (emitter.strength ?? 1) * raceEnergy * settingVolume("crowdVolume"));
    if (gain <= 0.002) continue;
    candidates.push({ gain, pan: side * 0.78, score: distance });
  }
  return candidates.sort((a, b) => b.gain - a.gain || a.score - b.score).slice(0, 4);
}

function updateNatureAudio(dt) {
  const src = NATURE_AMBIENCE_SRCS[activeTimeOfDay];
  if (audioState.element) return;
  const sessionMenuSilencesNature = !pauseMenuOpen && (isPaused || isMenuOpen());
  if (!src || !gameStarted || sessionMenuSilencesNature || !audioState.context || !natureEmitters.length || settingVolume("natureVolume") <= 0) {
    fadeNatureVoices(dt);
    return;
  }
  ensureNatureAudio(activeTimeOfDay, src);
  const buffer = audioState.natureBuffers[activeTimeOfDay];
  if (!buffer || !audioState.natureVoices.length) return;

  const candidates = getNatureAudioCandidates();
  const now = audioState.context.currentTime;
  for (let i = 0; i < audioState.natureVoices.length; i += 1) {
    const voice = audioState.natureVoices[i];
    const candidate = candidates[i];
    if (!candidate) {
      voice.output.gain.setTargetAtTime(0, now, Math.max(0.2, dt * 3));
      continue;
    }
    voice.output.gain.setTargetAtTime(candidate.gain, now, 0.46);
    voice.panner?.pan.setTargetAtTime(candidate.pan, now, 0.28);
  }
}

function ensureNatureAudio(timeOfDay, src) {
  if (!audioState.context || audioState.element || audioState.natureLoading[timeOfDay]) return;
  if (!audioState.natureBuffers[timeOfDay]) {
    audioState.natureLoading[timeOfDay] = true;
    fetch(src)
      .then((response) => response.arrayBuffer())
      .then((buffer) => audioState.context.decodeAudioData(buffer))
      .then((decoded) => {
        audioState.natureBuffers[timeOfDay] = decoded;
        audioState.natureLoading[timeOfDay] = false;
        createNatureVoices(timeOfDay);
      })
      .catch(() => {
        audioState.natureLoading[timeOfDay] = false;
      });
    return;
  }
  if (audioState.natureVoiceTimeOfDay !== timeOfDay) stopNatureVoices();
  if (!audioState.natureVoices.length) createNatureVoices(timeOfDay);
}

function createNatureVoices(timeOfDay) {
  if (!audioState.context || !audioState.natureBuffers[timeOfDay] || audioState.natureVoices.length) return;
  const buffer = audioState.natureBuffers[timeOfDay];
  audioState.natureVoiceTimeOfDay = timeOfDay;
  for (let i = 0; i < 3; i += 1) {
    const source = audioState.context.createBufferSource();
    const filter = audioState.context.createBiquadFilter();
    const output = audioState.context.createGain();
    const panner = audioState.context.createStereoPanner?.() ?? null;
    source.buffer = buffer;
    source.loop = true;
    source.playbackRate.value = 0.98 + i * 0.018;
    filter.type = "lowpass";
    filter.frequency.value = 3200;
    output.gain.value = 0;
    source.connect(filter);
    filter.connect(panner ?? output);
    if (panner) panner.connect(output);
    output.connect(audioState.context.destination);
    const offset = buffer.duration ? (i * 9.7) % buffer.duration : 0;
    source.start(0, offset);
    audioState.natureVoices.push({ source, filter, output, panner });
  }
}

function stopNatureVoices() {
  for (const voice of audioState.natureVoices) {
    try {
      voice.source.stop();
    } catch {
      // The loop may already be stopped during a time-of-day switch.
    }
  }
  audioState.natureVoices.length = 0;
  audioState.natureVoiceTimeOfDay = "";
}

function fadeNatureVoices(dt) {
  if (!audioState.context || !audioState.natureVoices.length) return;
  const now = audioState.context.currentTime;
  for (const voice of audioState.natureVoices) voice.output.gain.setTargetAtTime(0, now, Math.max(0.18, dt * 3));
}

function getNatureAudioCandidates() {
  const forward = new THREE.Vector3(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const crowdSuppression = getNatureCrowdSuppression();
  const qualityScale = gameSettings.graphicsQuality === "low" ? 0.78 : gameSettings.graphicsQuality === "high" ? 1.08 : 1;
  const candidates = [];
  for (const emitter of natureEmitters) {
    const distance = emitter.position.distanceTo(carState.position);
    const radius = (emitter.radius ?? 120) * qualityScale;
    if (distance > radius) continue;
    const falloff = 1 - distance / radius;
    const offset = emitter.position.clone().sub(carState.position);
    const side = THREE.MathUtils.clamp(offset.dot(right) / Math.max(distance, 1), -1, 1);
    const front = THREE.MathUtils.clamp(offset.dot(forward) / Math.max(distance, 1), -1, 1);
    const directionalGain = THREE.MathUtils.lerp(0.82, 1.08, (front + 1) * 0.5);
    const gain = Math.min(0.096, falloff * falloff * directionalGain * (emitter.strength ?? 1) * crowdSuppression * settingVolume("natureVolume") * 0.8);
    if (gain <= 0.002) continue;
    candidates.push({ gain, pan: side * 0.68, score: distance });
  }
  return candidates.sort((a, b) => b.gain - a.gain || a.score - b.score).slice(0, 3);
}

function getNatureCrowdSuppression() {
  let strongest = 0;
  for (const emitter of crowdEmitters) {
    if (!emitter.object) continue;
    emitter.object.getWorldPosition(scratchLightPosition);
    const distance = scratchLightPosition.distanceTo(carState.position);
    if (distance > 95) continue;
    strongest = Math.max(strongest, 1 - distance / 95);
  }
  return THREE.MathUtils.lerp(1, 0.12, strongest);
}

function fadeOpponentEngineVoices(dt) {
  if (!audioState.opponentEngines?.length || !audioState.context) return;
  const now = audioState.context.currentTime;
  for (const voice of audioState.opponentEngines) setOpponentEngineVoiceGain(voice, 0, now, dt);
}

function getOpponentEngineCandidates() {
  const candidates = [];
  const forward = new THREE.Vector3(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  for (const opponent of aiOpponents) {
    addOpponentEngineCandidate(candidates, {
      id: opponent.id ?? `ai-${opponent.gridPosition ?? candidates.length}`,
      position: opponent.position,
      velocity: opponent.velocity,
      speed: opponent.speed ?? opponent.velocity?.length?.() ?? 0,
      throttle: opponent.throttle ?? 0,
      profile: opponent.profile ?? getCarProfileById(opponent.carId),
    }, forward, right);
  }
  for (const [playerId, remote] of onlineRoomState.remoteCars.entries()) {
    if (!remote.car.root.visible) continue;
    addOpponentEngineCandidate(candidates, {
      id: `remote-${playerId}`,
      position: remote.car.root.position,
      velocity: remote.target.velocity,
      speed: remote.target.velocity?.length?.() ?? 0,
      throttle: remote.target.throttle ?? (remote.target.brake ? 0 : 0.45),
      profile: getCarProfileById(remote.carId ?? selectedCar),
    }, forward, right);
  }
  return candidates.sort((a, b) => a.score - b.score).slice(0, 3);
}

function addOpponentEngineCandidate(candidates, source, forward, right) {
  const distance = source.position.distanceTo(carState.position);
  if (distance > 86) return;
  const offset = source.position.clone().sub(carState.position);
  const side = THREE.MathUtils.clamp(offset.dot(right) / Math.max(distance, 1), -1, 1);
  const front = THREE.MathUtils.clamp(offset.dot(forward) / Math.max(distance, 1), -1, 1);
  const direction = offset.clone().multiplyScalar(1 / Math.max(distance, 0.001));
  const relativeSpeed = Math.abs((source.velocity ?? scratchZeroVelocity).clone().sub(carState.velocity).dot(direction));
  candidates.push({
    ...source,
    distance,
    side,
    front,
    relativeSpeed,
    score: distance - Math.max(0, front) * 8,
  });
}

function updateOpponentEngineVoice(voice, candidate, now, dt) {
  const { profile, distance, side, front, relativeSpeed } = candidate;
  const speedRatio = THREE.MathUtils.clamp((candidate.speed ?? 0) / Math.max(profile.maxForwardSpeed ?? 1, 1), 0, 1.15);
  const throttle = THREE.MathUtils.clamp(candidate.throttle ?? 0, 0, 1);
  const classTone = getOpponentEngineTone(profile.kind);
  const doppler = THREE.MathUtils.clamp(1 + getOpponentClosingSpeed(candidate) * 0.0024, 0.92, 1.08);
  if (voice.engine.type !== classTone.wave) voice.engine.type = classTone.wave;
  if (voice.sub.type !== classTone.subWave) voice.sub.type = classTone.subWave;
  const isNewAssignment = voice.assignedId !== candidate.id;
  if (isNewAssignment) {
    voice.lastFront = front;
    voice.passSwell = 0;
  }
  voice.assignedId = candidate.id;
  const crossedClose = voice.lastFront !== null && Math.sign(voice.lastFront) !== Math.sign(front) && distance < 18 && relativeSpeed > 10;
  const alongsideFast = distance < 10 && Math.abs(side) > 0.42 && Math.abs(front) < 0.58 && relativeSpeed > 6;
  if (crossedClose || alongsideFast) voice.passSwell = Math.max(voice.passSwell ?? 0, crossedClose ? 1 : 0.55);
  voice.lastFront = front;
  voice.passSwell = Math.max(0, (voice.passSwell ?? 0) - dt * 1.85);
  const passSwell = voice.passSwell ?? 0;
  const baseFrequency = THREE.MathUtils.lerp(classTone.low, classTone.high, speedRatio) * doppler * (1 + passSwell * 0.035);
  const distanceGain = Math.pow(THREE.MathUtils.clamp(1 - distance / 86, 0, 1), 1.55);
  const frontGain = THREE.MathUtils.lerp(0.58, 1.08, (front + 1) * 0.5);
  const throttleGain = THREE.MathUtils.lerp(0.38, 1, throttle);
  const sideBySideBoost = distance < 12 && Math.abs(side) > 0.38 && Math.abs(front) < 0.65
    ? THREE.MathUtils.lerp(1, 1.32, THREE.MathUtils.clamp((12 - distance) / 8, 0, 1))
    : 1;
  const startBoost = getCurrentRaceElapsed() < 7 ? 1.16 : 1;
  const passBoost = 1 + passSwell * 0.45;
  const behindSoftening = front < -0.35 ? 0.72 : 1;
  const targetGain = Math.min(0.115, classTone.gain * distanceGain * frontGain * throttleGain * sideBySideBoost * startBoost * passBoost * behindSoftening);
  voice.engine.frequency.setTargetAtTime(baseFrequency, now, 0.055);
  voice.sub.frequency.setTargetAtTime(baseFrequency * classTone.subRatio, now, 0.07);
  voice.filter.Q.setTargetAtTime(classTone.q + passSwell * 0.45, now, 0.08);
  voice.filter.frequency.setTargetAtTime(THREE.MathUtils.lerp(classTone.filterLow, classTone.filterHigh, speedRatio) * (1 + passSwell * 0.22), now, 0.08);
  voice.engineGain.gain.setTargetAtTime(targetGain * classTone.engineMix, now, 0.075);
  voice.subGain.gain.setTargetAtTime(targetGain * classTone.subMix, now, 0.09);
  setOpponentEngineVoiceGain(voice, 1, now, dt);
  voice.panner?.pan.setTargetAtTime(THREE.MathUtils.clamp(side * 0.88, -0.88, 0.88), now, 0.08);
}

function setOpponentEngineVoiceGain(voice, gain, now, dt) {
  voice.output.gain.setTargetAtTime(gain, now, gain > 0 ? 0.09 : Math.max(0.08, dt * 2));
  if (gain <= 0) {
    voice.engineGain.gain.setTargetAtTime(0, now, 0.12);
    voice.subGain.gain.setTargetAtTime(0, now, 0.12);
  }
}

function getOpponentEngineTone(kind = "formula") {
  if (kind === "stock") return { low: 42, high: 182, subRatio: 0.46, filterLow: 310, filterHigh: 1150, gain: 0.14, engineMix: 0.6, subMix: 0.82, q: 0.58, wave: "triangle", subWave: "sine" };
  if (kind === "lmp") return { low: 66, high: 285, subRatio: 0.55, filterLow: 560, filterHigh: 2050, gain: 0.116, engineMix: 0.84, subMix: 0.38, q: 0.82, wave: "sawtooth", subWave: "triangle" };
  if (kind === "corvette") return { low: 52, high: 250, subRatio: 0.47, filterLow: 390, filterHigh: 1500, gain: 0.12, engineMix: 0.64, subMix: 0.72, q: 0.62, wave: "triangle", subWave: "sine" };
  if (kind === "jeep") return { low: 34, high: 142, subRatio: 0.44, filterLow: 250, filterHigh: 820, gain: 0.104, engineMix: 0.55, subMix: 0.86, q: 0.5, wave: "triangle", subWave: "sine" };
  return { low: 92, high: 435, subRatio: 0.48, filterLow: 760, filterHigh: 3150, gain: 0.096, engineMix: 0.94, subMix: 0.24, q: 1.05, wave: "sawtooth", subWave: "triangle" };
}

function getOpponentClosingSpeed(opponent) {
  const toOpponent = opponent.position.clone().sub(carState.position);
  const distance = Math.max(toOpponent.length(), 0.001);
  toOpponent.multiplyScalar(1 / distance);
  const relativeVelocity = (opponent.velocity ?? scratchZeroVelocity).clone().sub(carState.velocity);
  return -relativeVelocity.dot(toOpponent);
}

function playCollisionSound(impactSpeed = 0, kind = "car") {
  if (!audioState.context || audioState.element || isPaused || isMenuOpen() || pauseMenuOpen) return;
  if ((audioState.collisionCooldown ?? 0) > 0 && impactSpeed < 18) return;
  const now = audioState.context.currentTime;
  const collisionVolume = settingVolume("collisionVolume");
  const strength = THREE.MathUtils.clamp((impactSpeed - 2) / 32, 0, 1);
  if (strength <= 0.02) return;
  audioState.collisionCooldown = THREE.MathUtils.lerp(0.18, 0.07, strength);
  const thud = audioState.context.createOscillator();
  const scrape = createOneShotNoise(audioState.context, 0.16);
  const thudGain = audioState.context.createGain();
  const scrapeGain = audioState.context.createGain();
  const scrapeFilter = audioState.context.createBiquadFilter();
  thud.type = kind === "wall" ? "triangle" : "sine";
  thud.frequency.setValueAtTime(kind === "wall" ? 72 : kind === "car" ? 92 : 58, now);
  thud.frequency.exponentialRampToValueAtTime(kind === "wall" ? 34 : 42, now + 0.13);
  scrapeFilter.type = kind === "car" ? "bandpass" : "lowpass";
  scrapeFilter.frequency.setValueAtTime(kind === "car" ? 520 : kind === "wall" ? 290 : 220, now);
  scrapeFilter.Q.value = kind === "car" ? 1.2 : 0.65;
  thudGain.gain.setValueAtTime(0.001, now);
  thudGain.gain.exponentialRampToValueAtTime(THREE.MathUtils.lerp(0.1575, 1.08, strength) * collisionVolume, now + 0.012);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + THREE.MathUtils.lerp(0.1, 0.24, strength));
  scrapeGain.gain.setValueAtTime(0.001, now);
  scrapeGain.gain.exponentialRampToValueAtTime(THREE.MathUtils.lerp(0.099, 0.72, strength) * collisionVolume, now + 0.01);
  scrapeGain.gain.exponentialRampToValueAtTime(0.001, now + THREE.MathUtils.lerp(0.07, 0.18, strength));
  thud.connect(thudGain);
  scrape.connect(scrapeFilter);
  scrapeFilter.connect(scrapeGain);
  thudGain.connect(audioState.context.destination);
  scrapeGain.connect(audioState.context.destination);
  thud.start(now);
  scrape.start(now);
  thud.stop(now + 0.28);
  scrape.stop(now + 0.2);
}

function createOneShotNoise(context, seconds = 0.15) {
  const bufferSize = Math.max(1, Math.floor(context.sampleRate * seconds));
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    const envelope = 1 - i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * envelope;
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  return source;
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
  const raceMode = selectedGameMode === "quick-race" || isOnlineRaceGameMode();
  raceCountdownState.introActive = raceMode;
  raceCountdownState.introElapsed = 0;
  raceCountdownState.active = false;
  raceCountdownState.elapsed = 0;
  raceCountdownState.hideTime = 0;
  raceCountdownState.lastCue = "";
  if (raceCountdownEl) raceCountdownEl.hidden = true;
  if (!raceMode) {
    hideRaceGridIntro();
    stopRaceIntroMusic();
    return;
  }
  showRaceGridIntro();
  startRaceIntroMusic();
}

function updateRaceCountdown(dt) {
  if (!(selectedGameMode === "quick-race" || isOnlineRaceGameMode()) || !gameStarted || isMenuOpen()) {
    if (raceCountdownEl) raceCountdownEl.hidden = true;
    hideRaceGridIntro();
    stopRaceIntroMusic();
    raceCountdownState.introActive = false;
    raceCountdownState.active = false;
    raceCountdownState.hideTime = 0;
    return false;
  }
  if (isPaused) return raceCountdownState.active;

  if (raceCountdownState.introActive) {
    raceCountdownState.introElapsed += dt;
    if (raceCountdownState.introElapsed < RACE_GRID_INTRO_SECONDS) return true;
    raceCountdownState.introActive = false;
    raceCountdownState.active = true;
    raceCountdownState.elapsed = 0;
    hideRaceGridIntro();
    stopRaceIntroMusic();
    showRaceCountdownCue("3");
    return true;
  }

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

function isRaceGridIntroActive() {
  return raceCountdownState.introActive && gameStarted && !isMenuOpen() && !isPaused;
}

function showRaceGridIntro() {
  if (!raceGridIntroEl) return;
  const laps = isOnlineRaceGameMode() ? getOnlineRaceLapCount() : selectedQuickRaceLapCount;
  const position = selectedGameMode === "quick-race"
    ? selectedGridPosition
    : getOnlineGridPositionForPlayer();
  raceGridIntroEl.hidden = false;
  raceGridIntroEl.classList.remove("is-ready");
  void raceGridIntroEl.offsetWidth;
  raceGridIntroEl.classList.add("is-ready");
  if (raceGridIntroModeEl) raceGridIntroModeEl.textContent = isOnlineRaceGameMode() ? "Online Race" : "Quick Race";
  if (raceGridIntroTrackEl) raceGridIntroTrackEl.textContent = getSelectedTrackLabel();
  if (raceGridIntroClassEl) raceGridIntroClassEl.textContent = getCarClassLabel(getCarProfile().kind);
  if (raceGridIntroLapsEl) raceGridIntroLapsEl.textContent = `${laps} ${laps === 1 ? "Lap" : "Laps"}`;
  if (raceGridIntroPositionEl) raceGridIntroPositionEl.textContent = `Starting ${formatOrdinal(position)}`;
}

function hideRaceGridIntro() {
  if (raceGridIntroEl) raceGridIntroEl.hidden = true;
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
  const samples = track.samples ?? [];
  const rowSpacing = 27.32;
  const laneOffset = 2.9;
  const gridStartBehindLine = 4;
  const rightLaneAdvance = 13.2;
  const safePosition = Math.max(1, Math.round(gridPosition));
  const row = Math.floor((safePosition - 1) / 2);
  const isRightLane = safePosition % 2 === 1;
  const side = isRightLane ? 1 : -1;
  const distanceBehindStart = gridStartBehindLine + row * rowSpacing + (isRightLane ? 0 : rightLaneAdvance);
  const sampleSpacing = Math.max(track.sampleSpacing ?? 1.3, 0.25);
  const sampleProgress = samples.length
    ? startIndex - distanceBehindStart / sampleSpacing
    : startIndex;
  const centerPose = samples.length
    ? getAiPathPose(sampleProgress, samples, 0)
    : {
      position: new THREE.Vector3(track.start.x, track.groundY, track.start.z),
      heading: track.start.heading,
      normal: new THREE.Vector3(Math.cos(track.start.heading), 0, -Math.sin(track.start.heading)),
      width: 7.2,
    };
  const lateralOffset = THREE.MathUtils.clamp(side * laneOffset, -centerPose.width + 3.05, centerPose.width - 3.05);
  const position = centerPose.position
    .clone()
    .addScaledVector(centerPose.normal, lateralOffset);
  return {
    position,
    heading: centerPose.heading,
    sampleIndex: ((Math.floor(sampleProgress) % (samples.length || 1)) + (samples.length || 1)) % (samples.length || 1),
    laneOffset: lateralOffset,
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
  if (!(selectedGameMode === "quick-race" || isOnlineRaceGameMode()) || !gameStarted) return;
  const minAi = selectedGameMode === "quick-race" ? 1 : 0;
  const count = THREE.MathUtils.clamp(selectedAiOpponentCount, minAi, 10);
  if (count <= 0) return;
  const carIds = getQuickRaceAiCarIds();
  const gridPositions = isOnlineRaceGameMode()
    ? Array.from({ length: count }, (_, index) => index + 1)
    : getAiGridPositions(count);
  const bossOpponentIndex = getAiBossOpponentIndex(gridPositions, count);
  const aiModel = getQuickRaceAiModelName();
  const aiNameRoster = createAiDriverNameRoster(count, bossOpponentIndex);
  for (let i = 0; i < count; i += 1) {
    const carId = getAiOpponentCarId(i, carIds, bossOpponentIndex);
    const displayName = getAiOpponentDisplayName(i, bossOpponentIndex, aiNameRoster);
    const isBoss = i === bossOpponentIndex;
    const aiCar = createSelectedCar(carId);
    applyCarVisualQuality(aiCar, { isPlayer: false });
    const pose = getQuickRaceGridPose(gridPositions[i]);
    syncCarVisualRoot(aiCar.root, new THREE.Vector3(pose.position.x, track.groundY, pose.position.z));
    aiCar.root.rotation.set(0, pose.heading, 0);
    tuneAiCarLights(aiCar, aiCar.root.position, false);
    scene.add(aiCar.root);
    aiOpponents.push({
      id: `ai-${i}`,
      displayName,
      isBoss,
      bossModeActive: false,
      aiModel,
      cyborg: aiModel === AI_CYBORG_MODEL_NAME ? createCyborgOpponentState(pose, i, isBoss) : null,
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
      overtakeWatchTime: 0,
      overtakeHoldTime: 0,
      overtakeLaneOffset: 0,
      overtakeIntent: null,
      ers: 100,
      boostActive: false,
      wheelSpin: 0,
      sampleIndex: pose.sampleIndex,
      sampleProgress: pose.sampleIndex,
      gridOffset: pose.laneOffset,
      launchLaneOffset: pose.laneOffset,
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

function resetQuickRaceState() {
  quickRaceState.active = selectedGameMode === "quick-race" && gameStarted;
  quickRaceState.entries = [];
  quickRaceState.playerPosition = 1;
  quickRaceState.elapsed = 0;
  quickRaceState.pendingPenaltyTime = 0;
  quickRaceState.servingPenaltyTime = 0;
  quickRaceState.penaltyCooldown = 0;
  quickRaceState.penaltyMessageTime = 0;
  quickRaceState.penaltyMessageText = "";
  quickRaceState.penaltyMessageServing = false;
  quickRaceState.resultsShown = false;
  quickRaceState.playerJoyride = null;
  resetBossModeState();
  if (quickRaceResultsEl) quickRaceResultsEl.hidden = true;
  if (!quickRaceState.active || !track.samples?.length) {
    updateQuickRaceHud();
    return;
  }
  quickRaceState.entries.push(createQuickRaceEntry("player", "Player", "player", null, carState.position));
  for (let i = 0; i < aiOpponents.length; i += 1) {
    const opponent = aiOpponents[i];
    quickRaceState.entries.push(createQuickRaceEntry(opponent.id ?? `ai-${i}`, opponent.displayName ?? `AI ${i + 1}`, "ai", opponent, opponent.position));
  }
  updateQuickRaceHud();
}

function createQuickRaceEntry(id, label, type, source, position) {
  const index = getNearestQuickRaceSampleIndex(position, track.startSampleIndex ?? 0);
  const relativeIndex = getQuickRaceRelativeSampleIndex(index);
  return {
    id,
    label,
    type,
    source,
    sampleIndex: index,
    lastRelativeIndex: relativeIndex,
    completedLaps: 0,
    started: false,
    finished: false,
    finishTime: null,
    totalProgress: relativeIndex,
  };
}

function updateQuickRaceState(dt, raceStartBlocked = false) {
  if (selectedGameMode !== "quick-race" || !gameStarted || isMenuOpen()) {
    quickRaceState.active = false;
    updateQuickRaceHud();
    return;
  }
  if (!quickRaceState.active) resetQuickRaceState();
  if (!quickRaceState.active) return;
  quickRaceState.penaltyMessageTime = Math.max(0, quickRaceState.penaltyMessageTime - dt);
  if (!raceStartBlocked && !isPaused) {
    quickRaceState.elapsed += dt;
    for (const entry of quickRaceState.entries) updateQuickRaceEntry(entry);
  }
  updateQuickRaceOrder();
  if (quickRaceState.resultsShown) renderQuickRaceResults();
  updateQuickRaceHud();
}

function updateQuickRaceEntry(entry) {
  if (entry.finished || !track.samples?.length) return;
  const position = entry.type === "player" ? carState.position : entry.source?.position;
  if (!position) return;
  const nearestIndex = getNearestQuickRaceSampleIndex(position, entry.sampleIndex);
  const relativeIndex = getQuickRaceRelativeSampleIndex(nearestIndex);
  const sampleCount = track.samples.length;
  const crossedStart = entry.lastRelativeIndex > sampleCount * 0.78 && relativeIndex < sampleCount * 0.22;
  const crossedHalfway = entry.lastRelativeIndex < sampleCount * 0.5 && relativeIndex >= sampleCount * 0.5;
  if (crossedStart) {
    if (entry.started) entry.completedLaps += 1;
    else entry.started = true;
  } else if (entry.lastRelativeIndex < sampleCount * 0.22 && relativeIndex > sampleCount * 0.78 && entry.started) {
    entry.completedLaps = Math.max(0, entry.completedLaps - 1);
  }
  entry.sampleIndex = nearestIndex;
  entry.lastRelativeIndex = relativeIndex;
  const startBonus = entry.started ? sampleCount : 0;
  entry.totalProgress = startBonus + entry.completedLaps * sampleCount + relativeIndex;
  if (entry.type === "player" && (crossedStart || crossedHalfway)) startQuickRacePenaltyService();
  if (entry.completedLaps >= selectedQuickRaceLapCount) {
    entry.finished = true;
    entry.finishTime = quickRaceState.elapsed;
    entry.totalProgress = (selectedQuickRaceLapCount + 1) * sampleCount;
    if (entry.type === "player") showQuickRaceResults();
  }
}

function updateQuickRaceOrder() {
  const ordered = getQuickRaceOrderedEntries();
  const playerIndex = ordered.findIndex((entry) => entry.type === "player");
  quickRaceState.playerPosition = playerIndex >= 0 ? playerIndex + 1 : 1;
}

function updateQuickRaceHud() {
  if (isOnlineRaceGameMode()) {
    updateOnlineRaceHud();
    return;
  }
  const visible = selectedGameMode === "quick-race" && gameStarted && !isMenuOpen() && quickRaceState.entries.length > 0;
  if (quickRaceHudEl) quickRaceHudEl.hidden = !visible;
  if (!visible) {
    if (quickRacePenaltyTimerEl) quickRacePenaltyTimerEl.hidden = true;
    if (quickRacePenaltyMessageEl) quickRacePenaltyMessageEl.hidden = true;
    return;
  }
  const playerEntry = quickRaceState.entries.find((entry) => entry.type === "player");
  const totalCars = quickRaceState.entries.length;
  const penaltyTime = quickRaceState.pendingPenaltyTime + quickRaceState.servingPenaltyTime;
  if (quickRacePositionEl) quickRacePositionEl.textContent = `${quickRaceState.playerPosition} / ${totalCars}`;
  if (quickRaceLapEl && playerEntry) {
    const currentLap = playerEntry.finished
      ? selectedQuickRaceLapCount
      : Math.min(selectedQuickRaceLapCount, playerEntry.completedLaps + 1);
    quickRaceLapEl.textContent = playerEntry.finished ? `Finished - ${selectedQuickRaceLapCount} Laps` : `Lap ${currentLap} / ${selectedQuickRaceLapCount}`;
  }
  if (quickRacePenaltyTimerEl) {
    quickRacePenaltyTimerEl.hidden = penaltyTime <= 0.05;
    quickRacePenaltyTimerEl.textContent = `+${formatQuickRacePenaltyTime(penaltyTime)}`;
  }
  if (quickRacePenaltyMessageEl) {
    quickRacePenaltyMessageEl.hidden = quickRaceState.penaltyMessageTime <= 0 || !quickRaceState.penaltyMessageText;
    quickRacePenaltyMessageEl.textContent = quickRaceState.penaltyMessageText;
    quickRacePenaltyMessageEl.classList.toggle("is-serving", quickRaceState.penaltyMessageServing);
  }
}

function updateRaceLeaderboard(dt) {
  const visible = shouldShowRaceLeaderboard();
  if (raceLeaderboardEl) raceLeaderboardEl.hidden = !visible;
  if (!visible) {
    raceLeaderboardState.updateTimer = 0;
    return;
  }

  raceLeaderboardState.updateTimer += dt;
  const needsInitialRows = !raceLeaderboardListEl?.children?.length;
  if (raceLeaderboardState.updateTimer < 0.7 && !needsInitialRows) return;
  raceLeaderboardState.updateTimer = 0;

  const rows = getRaceLeaderboardRows();
  const playerIndex = rows.findIndex((row) => row.isPlayer);
  if (raceLeaderboardPositionEl) raceLeaderboardPositionEl.textContent = `${playerIndex >= 0 ? playerIndex + 1 : 1} / ${Math.max(1, rows.length)}`;
  if (!raceLeaderboardListEl) return;
  raceLeaderboardListEl.replaceChildren();

  const playerRow = rows[playerIndex] ?? rows.find((row) => row.isPlayer);
  for (const [index, row] of rows.entries()) {
    const item = document.createElement("li");
    item.className = row.isPlayer ? "is-player" : "";

    const position = document.createElement("span");
    position.textContent = `${index + 1}`;
    const name = document.createElement("strong");
    name.textContent = row.label;
    if (row.bossModeActive) {
      const bossIcon = document.createElement("span");
      bossIcon.className = "boss-push-icon";
      bossIcon.textContent = ">>";
      name.appendChild(bossIcon);
    }
    const gap = document.createElement("small");
    gap.textContent = getRaceLeaderboardGapText(row, playerRow);

    item.append(position, name, gap);
    raceLeaderboardListEl.appendChild(item);
  }
}

function shouldShowRaceLeaderboard() {
  if (!gameStarted || isMenuOpen()) return false;
  if (selectedGameMode === "quick-race") return quickRaceState.active && quickRaceState.entries.length > 0 && !quickRaceState.resultsShown;
  if (isOnlineRaceGameMode()) return onlineRoomState.raceStarted && !onlineRoomState.resultsShown;
  return false;
}

function getRaceLeaderboardRows() {
  if (selectedGameMode === "quick-race") return getQuickRaceLeaderboardRows();
  if (isOnlineRaceGameMode()) return getOnlineRaceLeaderboardRows();
  return [];
}

function getQuickRaceLeaderboardRows() {
  const sampleSpacing = estimateAiSampleSpacing();
  return getQuickRaceOrderedEntries().map((entry) => {
    const isPlayer = entry.type === "player";
    const speed = isPlayer ? carState.velocity.length() : entry.source?.speed ?? entry.source?.velocity?.length?.() ?? 0;
    return {
      id: entry.id,
      label: isPlayer ? getDriverProfileDisplayName() : entry.label,
      isPlayer,
      bossModeActive: Boolean(entry.source?.bossModeActive),
      finished: entry.finished,
      raceMeters: entry.totalProgress * sampleSpacing,
      speed,
    };
  });
}

function getOnlineRaceLeaderboardRows() {
  const sampleSpacing = estimateAiSampleSpacing();
  const lapDistance = Math.max(1, (track.samples?.length ?? 1) * sampleSpacing);
  return getOnlineRaceStandings().map((entry) => {
    const isPlayer = entry.playerId === onlineRoomState.playerId;
    const remote = onlineRoomState.remoteCars.get(entry.playerId);
    const aiOpponent = entry.isAi ? aiOpponents.find((opponent) => opponent.id === entry.playerId) : null;
    const speed = isPlayer
      ? carState.velocity.length()
      : entry.isAi
        ? aiOpponent?.speed ?? 0
        : remote?.target?.velocity?.length?.() ?? 0;
    return {
      id: entry.playerId,
      label: isPlayer ? getDriverProfileDisplayName() : entry.player?.driverName || (entry.isAi ? "AI" : "Driver"),
      isPlayer,
      bossModeActive: Boolean(aiOpponent?.bossModeActive),
      finished: entry.finished,
      raceMeters: (entry.raceDistance ?? 0) * lapDistance,
      speed,
    };
  });
}

function getRaceLeaderboardGapText(row, playerRow) {
  if (!playerRow || row.isPlayer) return "Driver";
  if (row.finished && !playerRow.finished) return "Finished";
  if (playerRow.finished && !row.finished) return "Running";
  const gapMeters = row.raceMeters - playerRow.raceMeters;
  const absGap = Math.abs(gapMeters);
  if (absGap < 2.5) return "Even";
  const speedReference = Math.max(16, (Math.max(row.speed ?? 0, 0) + Math.max(playerRow.speed ?? 0, 0)) * 0.5);
  const seconds = absGap / speedReference;
  return gapMeters > 0
    ? `${seconds.toFixed(1)}s ahead`
    : `${seconds.toFixed(1)}s behind`;
}

function getDriverProfileDisplayName() {
  const name = String(driverProfile.driverName || "").trim();
  return name || "Driver Name";
}

function updateQuickRacePenalties(dt, wheelSurface) {
  if (selectedGameMode !== "quick-race" || !gameStarted || !quickRaceState.active) return;
  quickRaceState.penaltyCooldown = Math.max(0, quickRaceState.penaltyCooldown - dt);
  if (quickRaceState.servingPenaltyTime > 0) {
    quickRaceState.servingPenaltyTime = Math.max(0, quickRaceState.servingPenaltyTime - dt);
    if (quickRaceState.servingPenaltyTime > 0) {
      showQuickRacePenaltyMessage(`Serving Penalty - ${formatQuickRacePenaltyTime(quickRaceState.servingPenaltyTime)}`, 0.22, true);
    }
  }
  if (quickRaceState.penaltyCooldown > 0 || quickRaceState.servingPenaltyTime > 0) return;
  if (wheelSurface?.grassCount === 4) {
    addQuickRacePenalty(3, "Off Track");
  } else if (wheelSurface?.frontGrassCount === 2 || wheelSurface?.rearGrassCount === 2) {
    addQuickRacePenalty(2, "Track Limits");
  }
}

function addQuickRacePenalty(seconds, reason) {
  const scaledSeconds = getScaledRacePenaltySeconds(seconds);
  quickRaceState.pendingPenaltyTime += scaledSeconds;
  quickRaceState.penaltyCooldown = 5;
  showQuickRacePenaltyMessage(getQuickRacePenaltyNotice(formatRacePenaltyNotice(scaledSeconds, reason)), 5, false);
}

function startQuickRacePenaltyService() {
  if (quickRaceState.pendingPenaltyTime <= 0 || quickRaceState.servingPenaltyTime > 0) return;
  quickRaceState.servingPenaltyTime = quickRaceState.pendingPenaltyTime;
  quickRaceState.pendingPenaltyTime = 0;
  showQuickRacePenaltyMessage(`Serving Penalty - ${formatQuickRacePenaltyTime(quickRaceState.servingPenaltyTime)}`, 1, true);
}

function showQuickRacePenaltyMessage(message, seconds = 2, serving = false) {
  quickRaceState.penaltyMessageText = message;
  quickRaceState.penaltyMessageTime = Math.max(quickRaceState.penaltyMessageTime, seconds);
  quickRaceState.penaltyMessageServing = serving;
}

function resetBossModeState() {
  bossModeState.messageTime = 0;
  bossModeState.messageText = "";
  bossModeState.announcedIds.clear();
  if (bossModeMessageEl) bossModeMessageEl.hidden = true;
}

function showBossModeMessage(message, seconds = 4) {
  bossModeState.messageText = message;
  bossModeState.messageTime = Math.max(bossModeState.messageTime, seconds);
}

function updateBossModeHud(dt) {
  bossModeState.messageTime = Math.max(0, bossModeState.messageTime - dt);
  const visible = gameStarted && !isMenuOpen() && bossModeState.messageTime > 0 && bossModeState.messageText;
  if (!bossModeMessageEl) return;
  bossModeMessageEl.hidden = !visible;
  if (visible) bossModeMessageEl.textContent = bossModeState.messageText;
}

function getQuickRacePenaltyNotice(reason) {
  const playerEntry = quickRaceState.entries.find((entry) => entry.type === "player");
  const lap = playerEntry
    ? Math.min(selectedQuickRaceLapCount, playerEntry.completedLaps + 1)
    : 1;
  return `${quickRaceState.playerPosition} / ${quickRaceState.entries.length} - Lap ${lap}: ${reason}`;
}

function getScaledRacePenaltySeconds(seconds) {
  return Math.max(0, seconds * (getAiDifficultySetting().penaltyScale ?? 1));
}

function formatRacePenaltyNotice(seconds, reason) {
  const value = Number.isInteger(seconds) ? String(seconds) : seconds.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  const unit = Math.abs(seconds - 1) < 0.001 ? "Second" : "Seconds";
  return `${value} ${unit} Penalty - ${reason}`;
}

function isQuickRacePenaltyServing() {
  return selectedGameMode === "quick-race" && quickRaceState.servingPenaltyTime > 0;
}

function isQuickRacePlayerFinished() {
  if (selectedGameMode !== "quick-race" || !quickRaceState.active) return false;
  return quickRaceState.entries.some((entry) => entry.type === "player" && entry.finished);
}

function updatePostRacePlayerJoyride(dt) {
  if (!track.samples?.length) return;
  const profile = getCarProfile();
  const joyride = quickRaceState.playerJoyride ??= createPostRacePlayerJoyrideState();
  joyride.car = car;
  joyride.profile = profile;
  joyride.position = carState.position;
  joyride.velocity = carState.velocity;
  joyride.heading = carState.heading;
  joyride.yawRate = carState.yawRate;
  joyride.steer = carState.steer;
  joyride.wheelSpin = carState.wheelSpin;
  joyride.speed = carState.velocity.length();
  joyride.sampleIndex = getNearestAiSampleIndex(carState.position, track.samples, joyride.sampleIndex ?? track.startSampleIndex ?? 0);
  if (joyride.cyborg?.line?.samples?.length) {
    updatePostRaceCyborgJoyride(joyride, profile, dt);
    syncPostRacePlayerCarFromJoyride(joyride, profile, dt);
    return;
  }
  const lookaheadMeters = THREE.MathUtils.clamp(joyride.speed * 0.42 + 11, 12, 34);
  const targetProgress = joyride.sampleIndex + metersToAiSamples(lookaheadMeters);
  const targetPose = getAiPathPose(targetProgress, track.samples, 0);
  targetPose.currentTrack = getAiTrackEdgeState(carState.position, track.samples, joyride.sampleIndex);
  targetPose.pointBlendOverride = 0.22;
  targetPose.steerGainOverride = 0.92;
  targetPose.steerDampOverride = 8.2;
  const targetSpeed = profile.maxForwardSpeed * 0.6 * THREE.MathUtils.lerp(0.58, 0.84, THREE.MathUtils.smoothstep(joyride.speed, 5, 30));
  const overspeed = joyride.speed - targetSpeed;
  const racing = {
    lookahead: metersToAiSamples(lookaheadMeters),
    targetSpeed,
    maxSpeed: profile.maxForwardSpeed * 0.6,
    cornerSeverity: 0.18,
    throttle: overspeed > 2.5 ? 0 : 0.58,
    brake: overspeed > 4 ? THREE.MathUtils.clamp(overspeed / 14, 0, 0.45) : 0,
    boostActive: false,
    collisionAvoidance: 0,
    allowOffTrack: false,
    ignoreWalls: false,
    ignoreEdgePressure: false,
    softenGrassEmergencySlowdown: true,
  };
  keepAiTargetOnTrack(joyride, targetPose, track.samples, targetProgress, racing);
  applyAiRecoveryAndAvoidance(joyride, targetPose, racing, track.sample(carState.position.x, carState.position.z));
  joyride.throttle = THREE.MathUtils.damp(joyride.throttle ?? 0, racing.throttle, 2.2, dt);
  joyride.brake = THREE.MathUtils.damp(joyride.brake ?? 0, racing.brake, 3.6, dt);
  updateAiDrivenCar(joyride, targetPose, racing, profile, dt);
  syncPostRacePlayerCarFromJoyride(joyride, profile, dt);
}

function updatePostRaceCyborgJoyride(joyride, profile, dt) {
  const cyborg = joyride.cyborg;
  const line = cyborg.line;
  const expectedProgress = cyborg.progress + Math.max(2, joyride.speed) * dt;
  cyborg.progress = getNearestCyborgProgressNear(line, joyride.position, expectedProgress, 42);
  const effectiveLaneOffset = cyborg.laneOffset ?? 0;
  const learnedPose = getCyborgLinePose(line, cyborg.progress, effectiveLaneOffset);
  const speedLookaheadDistance = THREE.MathUtils.clamp(joyride.speed * 0.54 + 10, 12, 32);
  const targetPose = getCyborgLinePose(line, cyborg.progress + speedLookaheadDistance, effectiveLaneOffset);
  const headingPose = getCyborgLinePose(line, cyborg.progress + THREE.MathUtils.clamp(joyride.speed * 0.08 + 3, 3, 7), effectiveLaneOffset);
  const learnedTargetHeading = headingPose.heading;
  const steeringReferenceDistance = THREE.MathUtils.clamp(joyride.speed * 0.08 + 4, 4, 8);
  const forwardTarget = joyride.position
    .clone()
    .add(new THREE.Vector3(Math.sin(learnedTargetHeading), 0, Math.cos(learnedTargetHeading)).multiplyScalar(steeringReferenceDistance));
  const trackTarget = getCyborgTrackTarget(forwardTarget, joyride.position, joyride.sampleIndex ?? 0, learnedTargetHeading, 0.3);
  const maxSpeed = profile.maxForwardSpeed * 0.6;
  const targetSpeed = Math.min(maxSpeed, Math.max(8, targetPose.speed * 0.6));
  const speedError = joyride.speed - targetSpeed;
  const learnedBrake = Math.max(targetPose.brake ?? 0, learnedPose.brake ?? 0);
  const brake = speedError > 2
    ? THREE.MathUtils.clamp(speedError / Math.max(5, profile.brakeForce * 0.22), 0.12, 0.55)
    : learnedBrake > 0.25 && joyride.speed > targetSpeed * 0.95
      ? learnedBrake * 0.55
      : 0;
  const throttle = brake > 0.08
    ? 0
    : THREE.MathUtils.clamp(Math.max(learnedPose.throttle ?? 0.35, (targetSpeed - joyride.speed) / 9), 0.24, 0.68);
  const racing = {
    lookahead: metersToAiSamples(speedLookaheadDistance),
    targetSpeed,
    maxSpeed,
    cornerSeverity: THREE.MathUtils.clamp(Math.abs(angleDifference(headingPose.heading, learnedPose.heading)) / 0.72, 0, 1),
    throttle,
    brake,
    boostActive: false,
    collisionAvoidance: 0,
    allowOffTrack: false,
    ignoreWalls: false,
    ignoreEdgePressure: false,
    softenGrassEmergencySlowdown: true,
  };
  keepAiTargetOnTrack(joyride, trackTarget, track.samples, joyride.sampleIndex + racing.lookahead, racing);
  applyAiRecoveryAndAvoidance(joyride, trackTarget, racing, track.sample(joyride.position.x, joyride.position.z));
  joyride.throttle = THREE.MathUtils.damp(joyride.throttle ?? 0, racing.throttle, 1.8, dt);
  joyride.brake = THREE.MathUtils.damp(joyride.brake ?? 0, racing.brake, 5.4, dt);
  updateAiDrivenCar(joyride, trackTarget, racing, profile, dt);
  joyride.sampleIndex = getNearestAiSampleIndex(joyride.position, track.samples, joyride.sampleIndex ?? 0);
  cyborg.progress = getNearestCyborgProgressNear(line, joyride.position, cyborg.progress + Math.max(1, joyride.speed) * dt, 48);
}

function syncPostRacePlayerCarFromJoyride(joyride, profile, dt) {
  carState.heading = joyride.heading;
  carState.yawRate = joyride.yawRate;
  carState.steer = joyride.steer;
  carState.wheelSpin = joyride.wheelSpin;
  carState.boostActive = false;
  carState.ers = Math.min(100, carState.ers + (profile.boostRechargeRate ?? 2) * dt);
  const forward = new THREE.Vector3(Math.sin(carState.heading), 0, Math.cos(carState.heading));
  const forwardSpeed = carState.velocity.dot(forward);
  carState.gear = getAutoGear(forwardSpeed, profile, joyride.throttle, joyride.brake);
  carState.rpm = getEngineRpm(forwardSpeed, joyride.throttle > 0.1, carState.gear, profile);
  updateEngineAudio(dt, forwardSpeed, joyride.throttle, false, profile, false);
  syncCarVisualRoot(car.root, carState.position);
  car.root.rotation.set(0, carState.heading, 0);
  const suspensionBody = getCarSuspensionBody(car);
  setCarBodyLean(
    car,
    THREE.MathUtils.damp(suspensionBody?.rotation.x ?? 0, 0, 5, dt),
    THREE.MathUtils.damp(suspensionBody?.rotation.z ?? 0, 0, 5, dt),
  );
  if (car.wheels.frontLeft) car.wheels.frontLeft.rotation.y = carState.steer;
  if (car.wheels.frontRight) car.wheels.frontRight.rotation.y = carState.steer;
  carState.wheelSpin -= Math.max(0, forwardSpeed) * dt * 1.25;
  for (const wheel of car.wheelMeshes ?? []) {
    if (wheel) wheel.rotation.x = carState.wheelSpin;
  }
  updateRearWing(dt, false, car);
  updateCarLights(joyride.brake > 0.1, false, dt);
  speedEl.textContent = `${Math.round(Math.abs(forwardSpeed) * 2.237)} mph`;
  gearEl.textContent = carState.gear === -1 ? "R" : carState.gear === 0 ? "N" : `${carState.gear}`;
  const surface = track.sample(carState.position.x, carState.position.z);
  surfaceEl.textContent = surface.kind === "grass" ? "Grass" : surface.kind === "painted-kerb" ? "Painted Kerb" : surface.kind === "sausage" ? "Sausage" : surface.kind === "kerb" ? "Kerb" : "Track";
  updateErsHud();
  updateRevMeter();
}

function createPostRacePlayerJoyrideState() {
  const cyborgLine = getCyborgLineForOpponent(0);
  return {
    id: "player-joyride",
    car,
    carId: selectedCar,
    profile: getCarProfile(),
    position: carState.position,
    velocity: carState.velocity,
    heading: carState.heading,
    yawRate: carState.yawRate,
    steer: carState.steer,
    throttle: 0,
    brake: 0,
    speed: carState.velocity.length(),
    wheelSpin: carState.wheelSpin,
    sampleIndex: track.startSampleIndex ?? 0,
    cyborg: cyborgLine?.samples?.length
      ? {
        line: cyborgLine,
        progress: getNearestCyborgProgress(cyborgLine, carState.position),
        laneOffset: 0,
      }
      : null,
    stuckTimer: 0,
    recoveryTimer: 0,
    debug: {
      grassFrames: 0,
      predictiveAvoidanceFrames: 0,
      wheelCorrectionFrames: 0,
      wallDangerFrames: 0,
      wallCorrectionFrames: 0,
      maxEdgeRatio: 0,
      lapTime: 0,
      lapDistance: 0,
    },
  };
}

function showQuickRaceResults() {
  quickRaceState.resultsShown = true;
  renderQuickRaceResults();
  if (quickRaceResultsEl) quickRaceResultsEl.hidden = false;
}

function renderQuickRaceResults() {
  if (!quickRaceResultsListEl) return;
  if (quickRaceResultsRestartButton) quickRaceResultsRestartButton.hidden = false;
  if (quickRaceResultsLobbyButton) quickRaceResultsLobbyButton.hidden = true;
  if (quickRaceResultsMenuButton) quickRaceResultsMenuButton.textContent = "Main Menu";
  const titleEl = quickRaceResultsEl?.querySelector("header span");
  if (titleEl) titleEl.textContent = "Race Complete";
  const ordered = getQuickRaceOrderedEntries();
  const totalCars = Math.max(1, ordered.length);
  const playerIndex = ordered.findIndex((entry) => entry.type === "player");
  if (quickRaceResultsPositionEl) quickRaceResultsPositionEl.textContent = `${playerIndex + 1 || 1} / ${totalCars}`;
  quickRaceResultsListEl.replaceChildren();
  for (const [index, entry] of ordered.entries()) {
    const row = document.createElement("li");
    row.className = entry.type === "player" ? "is-player" : "";
    const name = entry.type === "player" ? "You" : entry.label;
    const status = entry.finished
      ? formatLapTime(entry.finishTime ?? 0)
      : `Lap ${Math.min(selectedQuickRaceLapCount, entry.completedLaps + 1)} / ${selectedQuickRaceLapCount}`;
    row.innerHTML = `
      <span>${index + 1}</span>
      <strong>${name}</strong>
      <small>${status}</small>
    `;
    quickRaceResultsListEl.appendChild(row);
  }
}

function getQuickRaceOrderedEntries() {
  return [...quickRaceState.entries].sort((a, b) => {
    if (a.finished && b.finished) return (a.finishTime ?? 0) - (b.finishTime ?? 0);
    if (a.finished !== b.finished) return a.finished ? -1 : 1;
    return b.totalProgress - a.totalProgress;
  });
}

function restartQuickRaceFromResults() {
  closePauseMenu({ restorePause: false });
  selectedGameMode = "quick-race";
  gameStarted = true;
  setPaused(false);
  keys.clear();
  startMenu.classList.add("is-hidden");
  resetCar();
  setupQuickRaceOpponents();
  resetQuickRaceState();
  startRaceCountdown();
}

function returnToOnlineLobbyFromRace() {
  if (!isOnlineRaceGameMode() || onlineRoomState.role === "none") {
    returnToMainMenuFromRace();
    return;
  }
  closePauseMenu({ restorePause: false });
  gameStarted = false;
  setPaused(false);
  stopRaceIntroMusic();
  keys.clear();
  clearAiOpponents();
  removeOnlineRemoteCars();
  onlineRoomState.raceStarted = false;
  onlineRoomState.ready = onlineRoomState.role === "host";
  onlineRoomState.players.set(onlineRoomState.playerId, getOnlineRoomPlayerPayload());
  resetOnlineRaceRunState();
  resetQuickRaceState();
  clearTimeTrialGhost();
  startMenu.classList.remove("is-hidden");
  setMenuStep("online-room");
  renderOnlineRoomStatus(
    onlineRoomState.role === "host"
      ? "Back in the lobby. Adjust the setup or start another race."
      : "Back in the lobby. Ready up for the next race.",
    onlineRoomState.role === "host" ? "is-good" : "is-warning",
  );
  if (onlineRoomState.role === "host") {
    sendOnlineRosterUpdate();
    startOnlinePublicLobbyAnnouncements();
  } else {
    sendOnlineRoomEvent("player_ready", getOnlineRoomPlayerPayload());
  }
  updateMenuVisual();
  updateTimeTrialHud();
  updateQuickRaceHud();
}

function leaveOnlineRoomForMainMenu() {
  stopOnlinePublicLobbyAnnouncements();
  disconnectOnlineRoom();
  removeOnlineRemoteCars();
  onlineRoomState.role = "none";
  onlineRoomState.roomCode = "";
  onlineRoomState.topic = "";
  onlineRoomState.hostSettings = null;
  onlineRoomState.ready = false;
  onlineRoomState.raceStarted = false;
  onlineRoomState.gridOrder = [];
  onlineRoomState.players = new Map();
  resetOnlineRaceRunState();
  selectedGameMode = "drive";
}

function returnToMainMenuFromRace() {
  const shouldLeaveOnlineRoom = isOnlineRaceGameMode() || onlineRoomState.role !== "none";
  closePauseMenu({ restorePause: false });
  gameStarted = false;
  setPaused(false);
  stopRaceIntroMusic();
  keys.clear();
  clearAiOpponents();
  removeOnlineRemoteCars();
  if (shouldLeaveOnlineRoom) leaveOnlineRoomForMainMenu();
  resetQuickRaceState();
  clearTimeTrialGhost();
  startMenu.classList.remove("is-hidden");
  setMenuStep("intro");
  updateMenuVisual();
  updateTimeTrialHud();
  updateQuickRaceHud();
}

function formatQuickRacePenaltyTime(seconds) {
  return `${Math.max(0, seconds).toFixed(1)} Seconds`;
}

function getNearestQuickRaceSampleIndex(position, startIndex = 0) {
  const samples = track.samples ?? [];
  if (!samples.length) return 0;
  let bestIndex = startIndex;
  let bestDistance = Infinity;
  for (let offset = -36; offset <= 120; offset += 1) {
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

function getQuickRaceRelativeSampleIndex(index) {
  const sampleCount = track.samples?.length ?? 0;
  if (!sampleCount) return 0;
  const startIndex = track.startSampleIndex ?? 0;
  return (index - startIndex + sampleCount) % sampleCount;
}

function getQuickRaceAiModelName() {
  return isCyborgQuickRaceAvailable() ? AI_CYBORG_MODEL_NAME : AI_CODEX_MODEL_NAME;
}

function isCyborgQuickRaceAvailable() {
  const bank = getSelectedCyborgLineBank();
  return Boolean(bank?.fallback?.samples?.length);
}

function getCyborgBrakingLookaheadScale() {
  const setting = getAiDifficultySetting();
  return CYBORG_BASE_BRAKING_LOOKAHEAD_SCALE * setting.cyborgBrakingLookaheadScale;
}

function getAiDifficultySetting() {
  return AI_DIFFICULTY_SETTINGS[selectedAiDifficulty] ?? AI_DIFFICULTY_SETTINGS.standard;
}

function getCurrentRaceElapsed() {
  if (selectedGameMode === "quick-race") return quickRaceState.elapsed ?? 0;
  if (isOnlineRaceGameMode()) return onlineRoomState.elapsed ?? 0;
  return 0;
}

function getAiLaunchLaneHold() {
  const elapsed = getCurrentRaceElapsed();
  if (elapsed < AI_LAUNCH_LANE_LOCK_SECONDS) return 1;
  const mergeProgress = THREE.MathUtils.clamp(
    (elapsed - AI_LAUNCH_LANE_LOCK_SECONDS) / Math.max(0.001, AI_LAUNCH_LANE_MERGE_SECONDS - AI_LAUNCH_LANE_LOCK_SECONDS),
    0,
    1,
  );
  return 1 - THREE.MathUtils.smoothstep(mergeProgress, 0, 1);
}

function isAiLaunchOvertakeLocked() {
  return getCurrentRaceElapsed() < AI_LAUNCH_LANE_LOCK_SECONDS;
}

function getAiLaunchSteerScale() {
  return getCurrentRaceElapsed() < AI_LAUNCH_STEER_LIMIT_SECONDS ? 0.5 : 1;
}

function updateAiDifficultyModifiers(opponent, dt) {
  const setting = getAiDifficultySetting();
  updateAiBossModeState(opponent);
  const rubberbandScale = getAiRubberbandAccelerationScale(opponent, setting);
  const rubberbandBrakeScale = getAiRubberbandBrakeScale(opponent, setting);
  const bossCatchupScale = getAiBossCatchupAccelerationScale(opponent);
  const bossCatchupBrakeScale = getAiBossCatchupBrakeScale(opponent);
  const bossModePressureScale = getAiBossModePressureScale(opponent);
  const targetAccelerationScale = (setting.accelerationScale ?? 1) * rubberbandScale * bossModePressureScale.acceleration;
  opponent.difficultyAccelerationScale = THREE.MathUtils.damp(
    opponent.difficultyAccelerationScale ?? targetAccelerationScale * bossCatchupScale,
    targetAccelerationScale * bossCatchupScale,
    3.2,
    dt,
  );
  const targetBrakeScale = Math.max(rubberbandBrakeScale, bossCatchupBrakeScale);
  opponent.difficultyBrakeScale = THREE.MathUtils.damp(
    opponent.difficultyBrakeScale ?? targetBrakeScale,
    targetBrakeScale,
    3.2,
    dt,
  );
  opponent.difficultySafetyMarginScale = setting.safetyMarginScale ?? 1;
  opponent.difficultyOvertakeIntentScale = (setting.overtakeIntentScale ?? 1) * (opponent.bossModeActive ? 1.4 : 1);
  opponent.difficultyTopSpeedScale = (setting.topSpeedScale ?? 1) * getAiBossCatchupTopSpeedScale(opponent) * bossModePressureScale.topSpeed;
}

function getAiRubberbandAccelerationScale(opponent, setting) {
  const gapSeconds = getAiHumanGapSeconds(opponent);
  if (!Number.isFinite(gapSeconds)) return 1;
  if (Number.isFinite(setting.rubberbandAheadSeconds) && gapSeconds > setting.rubberbandAheadSeconds) {
    const aheadScale = getAiAheadRubberbandScale(gapSeconds, setting);
    return opponent.bossModeActive ? THREE.MathUtils.lerp(1, aheadScale, 0.5) : aheadScale;
  }
  if (Number.isFinite(setting.rubberbandBehindSeconds) && gapSeconds < -setting.rubberbandBehindSeconds) {
    return getAiBehindRubberbandScale(gapSeconds, setting);
  }
  return 1;
}

function getAiAheadRubberbandScale(gapSeconds, setting) {
  const startSeconds = setting.rubberbandAheadSeconds;
  const startScale = setting.rubberbandAheadAccelerationScale ?? 1;
  const maxSeconds = setting.rubberbandAheadMaxSeconds;
  const maxScale = setting.rubberbandAheadMaxAccelerationScale;
  if (!Number.isFinite(maxSeconds) || !Number.isFinite(maxScale) || maxSeconds <= startSeconds) return startScale;
  const blend = THREE.MathUtils.clamp((gapSeconds - startSeconds) / (maxSeconds - startSeconds), 0, 1);
  return THREE.MathUtils.lerp(startScale, maxScale, blend);
}

function getAiBehindRubberbandScale(gapSeconds, setting) {
  const behindSeconds = Math.abs(gapSeconds);
  const startSeconds = setting.rubberbandBehindSeconds;
  const startScale = setting.rubberbandBehindAccelerationScale ?? 1;
  const maxSeconds = setting.rubberbandBehindMaxSeconds;
  const maxScale = setting.rubberbandBehindMaxAccelerationScale;
  if (!Number.isFinite(maxSeconds) || !Number.isFinite(maxScale) || maxSeconds <= startSeconds) return startScale;
  const blend = THREE.MathUtils.clamp((behindSeconds - startSeconds) / (maxSeconds - startSeconds), 0, 1);
  return THREE.MathUtils.lerp(startScale, maxScale, blend);
}

function getAiRubberbandBrakeScale(opponent, setting) {
  const gapSeconds = getAiHumanGapSeconds(opponent);
  if (!Number.isFinite(gapSeconds) || !Number.isFinite(setting.rubberbandBehindSeconds)) return 1;
  if (gapSeconds >= -setting.rubberbandBehindSeconds) return 1;
  const maxSeconds = Number.isFinite(setting.rubberbandBehindMaxSeconds)
    ? setting.rubberbandBehindMaxSeconds
    : setting.rubberbandBehindSeconds + 2;
  const blend = THREE.MathUtils.clamp(
    (Math.abs(gapSeconds) - setting.rubberbandBehindSeconds) / Math.max(0.001, maxSeconds - setting.rubberbandBehindSeconds),
    0,
    1,
  );
  const maxBonus = selectedAiDifficulty === "beginner" ? 0.02 : 0.03;
  return 1 + maxBonus * (0.5 + blend * 0.5);
}

function updateAiBossModeState(opponent) {
  if (!opponent?.isBoss) return;
  const active = isAiBossModeLapActive(opponent);
  if (active && !opponent.bossModeActive) showBossModeMessage(`${opponent.displayName} is in boss mode`);
  opponent.bossModeActive = active;
}

function getAiBossCatchupAccelerationScale(opponent) {
  if (!opponent?.isBoss) return 1;
  return getAiBossGapToLeadHumanSeconds(opponent) < -1 ? 1.05 : 1;
}

function getAiBossCatchupTopSpeedScale(opponent) {
  if (!opponent?.isBoss) return 1;
  return getAiBossGapToLeadHumanSeconds(opponent) < -1 ? 1.05 : 1;
}

function getAiBossCatchupBrakeScale(opponent) {
  if (!opponent?.isBoss) return 1;
  return getAiBossGapToLeadHumanSeconds(opponent) < -1 ? 1.03 : 1;
}

function getAiBossModePressureScale(opponent) {
  if (!opponent?.isBoss || !opponent.bossModeActive) return { acceleration: 1, topSpeed: 1 };
  const gapSeconds = Math.abs(getAiHumanGapSeconds(opponent));
  if (!Number.isFinite(gapSeconds)) return { acceleration: 1, topSpeed: 1 };
  const pressure = 1 - THREE.MathUtils.smoothstep(gapSeconds, 0.75, BOSS_MODE_NEAR_PLAYER_SECONDS);
  return {
    acceleration: THREE.MathUtils.lerp(1, 1.07, pressure),
    topSpeed: THREE.MathUtils.lerp(1, 1.035, pressure),
  };
}

function getAiRaceCompletionRatio(opponent) {
  if (!track.samples?.length) return 0;
  const sampleSpacing = estimateAiSampleSpacing();
  const lapDistance = Math.max(1, track.samples.length * sampleSpacing);
  const totalRaceDistance = lapDistance * (getCurrentRaceLapCount() + 1);
  const raceDistance = getAiRaceDistanceMeters(opponent, sampleSpacing, lapDistance);
  return THREE.MathUtils.clamp(raceDistance / Math.max(1, totalRaceDistance), 0, 1);
}

function isAiBossModeLapActive(opponent) {
  const totalLaps = getCurrentRaceLapCount();
  const finalHalfLaps = Math.max(1, Math.floor(totalLaps / 2));
  const activationCompletedLaps = Math.max(0, totalLaps - finalHalfLaps);
  return getAiCompletedRaceLaps(opponent) >= activationCompletedLaps;
}

function getAiCompletedRaceLaps(opponent) {
  if (selectedGameMode === "quick-race") {
    const entry = quickRaceState.entries.find((candidate) => candidate.source === opponent || candidate.id === opponent.id);
    return Math.max(0, entry?.completedLaps ?? 0);
  }
  if (isOnlineRaceGameMode()) {
    const progress = onlineRoomState.aiProgress.get(opponent.id);
    return Math.max(0, progress?.lap ?? 0);
  }
  return 0;
}

function getCurrentRaceLapCount() {
  if (isOnlineRaceGameMode()) return getOnlineRaceLapCount();
  return selectedQuickRaceLapCount;
}

function getAiBossGapToLeadHumanSeconds(opponent) {
  if (!track.samples?.length) return 0;
  const sampleSpacing = estimateAiSampleSpacing();
  const lapDistance = Math.max(1, track.samples.length * sampleSpacing);
  const aiDistance = getAiRaceDistanceMeters(opponent, sampleSpacing, lapDistance);
  const humanDistances = getHumanRaceDistancesMeters(lapDistance, sampleSpacing);
  if (!humanDistances.length || !Number.isFinite(aiDistance)) return 0;
  const leadHumanDistance = Math.max(...humanDistances);
  const speedReference = Math.max(22, opponent.speed ?? 0, carState.velocity?.length?.() ?? 0);
  return (aiDistance - leadHumanDistance) / speedReference;
}

function getAiHumanGapSeconds(opponent) {
  if (!track.samples?.length) return 0;
  const sampleSpacing = estimateAiSampleSpacing();
  const lapDistance = Math.max(1, track.samples.length * sampleSpacing);
  const aiDistance = getAiRaceDistanceMeters(opponent, sampleSpacing, lapDistance);
  const humanDistances = getHumanRaceDistancesMeters(lapDistance, sampleSpacing);
  if (!humanDistances.length || !Number.isFinite(aiDistance)) return 0;
  const fastestHumanDistance = Math.max(...humanDistances);
  const slowestHumanDistance = Math.min(...humanDistances);
  const rawGapMeters = aiDistance > fastestHumanDistance
    ? aiDistance - fastestHumanDistance
    : aiDistance < slowestHumanDistance
      ? aiDistance - slowestHumanDistance
      : 0;
  const speedReference = Math.max(22, opponent.speed ?? 0, carState.velocity?.length?.() ?? 0);
  return rawGapMeters / speedReference;
}

function getAiRaceDistanceMeters(opponent, sampleSpacing, lapDistance) {
  if (selectedGameMode === "quick-race") {
    const entry = quickRaceState.entries.find((candidate) => candidate.source === opponent || candidate.id === opponent.id);
    if (!entry) return (opponent.sampleProgress ?? opponent.sampleIndex ?? 0) * sampleSpacing;
    return (entry.completedLaps * track.samples.length + entry.totalProgress) * sampleSpacing;
  }
  if (isOnlineRaceGameMode()) {
    const progress = onlineRoomState.aiProgress.get(opponent.id);
    if (progress) return progress.raceDistance * lapDistance;
  }
  return (opponent.sampleProgress ?? opponent.sampleIndex ?? 0) * sampleSpacing;
}

function getHumanRaceDistancesMeters(lapDistance, sampleSpacing) {
  if (selectedGameMode === "quick-race") {
    const playerEntry = quickRaceState.entries.find((entry) => entry.type === "player");
    if (playerEntry) return [(playerEntry.completedLaps * track.samples.length + playerEntry.totalProgress) * sampleSpacing];
  }
  if (isOnlineRaceGameMode()) {
    const distances = [];
    for (const progress of onlineRoomState.progress.values()) {
      if (!progress?.isAi) distances.push((progress.raceDistance ?? 0) * lapDistance);
    }
    if (distances.length) return distances;
    const localProgress = getOnlineRaceProgressForPosition(carState.position, onlineRoomState.playerId, onlineRoomState.progress);
    return [(localProgress.raceDistance ?? 0) * lapDistance];
  }
  return [];
}

function estimateAiSampleSpacing() {
  if (!track.samples?.length) return 1;
  const samples = track.samples;
  const step = Math.max(1, Math.floor(samples.length / 80));
  let total = 0;
  let count = 0;
  for (let i = 0; i < samples.length; i += step) {
    total += samples[i].distanceTo(samples[(i + step) % samples.length]) / step;
    count += 1;
  }
  return count ? total / count : 1;
}

function createCyborgOpponentState(gridPose, opponentIndex = 0, bossOnlyFastLines = false) {
  const line = getCyborgLineForOpponent(opponentIndex, bossOnlyFastLines);
  const startProgress = getNearestCyborgProgress(line, gridPose.position);
  const laneOffsets = [0, -0.28, 0.28, -0.46, 0.46];
  const trainedLaneOffset = laneOffsets[opponentIndex % laneOffsets.length] ?? 0;
  return {
    line,
    progress: startProgress,
    targetProgress: startProgress,
    laneOffset: trainedLaneOffset,
    trainedLaneOffset,
    launchLaneOffset: gridPose.laneOffset ?? trainedLaneOffset,
    smoothedLaneOffset: 0,
    mergeTimer: 4.5,
    launchOrientationTimer: 3,
    headingBias: 0,
    lapTime: 0,
    lapDistance: 0,
    lastWrapped: false,
  };
}

function getCyborgLineForOpponent(opponentIndex = 0, bossOnlyFastLines = false) {
  const bank = getSelectedCyborgLineBank();
  const allLines = bank?.lines ?? [];
  const fallback = bank?.fallback ?? { samples: [], totalDistance: 0, sourceLapTime: null };
  const lines = bossOnlyFastLines ? getFastestCyborgLines(allLines) : allLines;
  if (!lines.length) return fallback;
  const lineOrder = [0, 2, 4, 1, 3, 5, 6, 7, 8];
  const index = lineOrder[opponentIndex % lineOrder.length] % lines.length;
  return lines[index] ?? lines[0];
}

function getFastestCyborgLines(lines = []) {
  if (!lines.length) return [];
  const count = Math.max(1, Math.ceil(lines.length * BOSS_FAST_CYBORG_LINE_FRACTION));
  return lines.slice(0, count);
}

function getSelectedCyborgLineBank() {
  const carClass = getCarProfile().kind;
  return cyborgLineBanksByClass[carClass]?.[selectedTrack] ?? null;
}

function createCyborgRacingLines(training) {
  const laps = Array.isArray(training?.laps) ? training.laps : [];
  return laps
    .filter((lap) => Array.isArray(lap.samples) && lap.samples.length > 8)
    .sort((a, b) => (a.lapTime ?? Infinity) - (b.lapTime ?? Infinity))
    .map((lap) => createCyborgRacingLineFromLap(lap));
}

function createCyborgRacingLineFromLap(lap) {
  if (!lap) return { samples: [], totalDistance: 0, sourceLapTime: null };

  const samples = lap.samples.map((sample, index) => ({
    index,
    position: new THREE.Vector3(Number(sample.x) || 0, track?.groundY ?? 0, Number(sample.z) || 0),
    heading: Number(sample.heading) || 0,
    speed: Number(sample.speed) || 0,
    throttle: Number(sample.throttle) || 0,
    brake: Number(sample.brake) || 0,
    steer: Number(sample.steer) || 0,
    boost: Number(sample.boost) || 0,
    ers: Number(sample.ers ?? 100),
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
    sourceLapTime: lap.lapTime ?? null,
    sourceLapNumber: lap.lapNumber ?? null,
    sourceLapLabel: lap.formattedLapTime ?? "",
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

function getCyborgTrackTarget(targetPosition, carPosition, startIndex = 0, learnedHeading = null, launchOrientationBlend = 0) {
  const targetIndex = getNearestAiSampleIndex(targetPosition, track.samples, startIndex);
  const targetTrack = getAiTrackEdgeState(targetPosition, track.samples, targetIndex);
  const laneOffset = targetPosition.clone().sub(targetTrack.center).dot(targetTrack.normal);
  const currentIndex = getNearestAiSampleIndex(carPosition, track.samples, startIndex);
  return {
    position: targetPosition.clone(),
    heading: targetTrack.heading,
    learnedHeading,
    launchOrientationBlend,
    currentTrack: getAiTrackEdgeState(carPosition, track.samples, currentIndex),
    laneOffset,
    learnedHeadingBlend: 0.985,
    pointBlendOverride: 0.005,
    steerGainOverride: 0.92,
    steerDampOverride: 9,
  };
}

function getCyborgWallHeadingBias(opponent) {
  if (!track.obstacles?.length) return 0;
  const carRadius = AI_HALF_WIDTH;
  let strongestBias = 0;
  let strongestIntensity = 0;
  for (const obstacle of track.obstacles) {
    if (obstacle.kind !== "wall") continue;
    const closest = closestPointOnSegmentVector(opponent.position, obstacle.a, obstacle.b);
    const away = opponent.position.clone().sub(closest);
    let distance = away.length();
    const wallClearance = distance - carRadius - (obstacle.halfWidth ?? 0.45);
    if (wallClearance > 0.2) continue;
    const wallDirection = obstacle.b.clone().sub(obstacle.a).normalize();
    if (distance < 0.001) {
      away.set(wallDirection.z, 0, -wallDirection.x);
      distance = 1;
    } else {
      away.multiplyScalar(1 / distance);
    }
    const awayHeading = Math.atan2(away.x, away.z);
    const turnAway = angleDifference(awayHeading, opponent.heading);
    const intensity = THREE.MathUtils.clamp(1 - Math.max(0, wallClearance) / 0.2, 0, 1);
    if (intensity > strongestIntensity) {
      strongestIntensity = intensity;
      strongestBias = THREE.MathUtils.clamp(turnAway * 0.16, -0.12, 0.12) * intensity;
    }
  }
  return strongestBias;
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
    boost: THREE.MathUtils.lerp(lower.boost ?? 0, upper.boost ?? 0, blend),
    ers: THREE.MathUtils.lerp(lower.ers ?? 100, upper.ers ?? 100, blend),
    index: lowerIndex,
  };
}

function getQuickRaceAiCarIds() {
  const playerKind = getCarProfile().kind;
  const pool = quickRaceAiCarPools[playerKind] ?? quickRaceAiCarPools.formula;
  const withoutPlayer = pool.filter((carId) => carId !== selectedCar);
  return withoutPlayer.length ? withoutPlayer : pool;
}

function getAiOpponentCarId(index = 0, carIds = [], bossOpponentIndex = -1) {
  const bossCarId = getAiBossCarIdForCurrentRace();
  if (index === bossOpponentIndex && bossCarId) return bossCarId;
  return carIds[index % carIds.length] ?? "mersedeez";
}

function createAiDriverNameRoster(aiCount = 0, bossOpponentIndex = -1) {
  const roster = [...AI_DRIVER_NAMES];
  let seed = hashStringToUint32(`${selectedTrack}:${getCarProfile().kind}:${selectedAiDifficulty}:${selectedQuickRaceLapCount}:${aiCount}`);
  for (let i = roster.length - 1; i > 0; i -= 1) {
    seed = Math.imul(seed ^ (seed >>> 13), 1664525) + 1013904223;
    const j = Math.abs(seed) % (i + 1);
    [roster[i], roster[j]] = [roster[j], roster[i]];
  }
  const assigned = [];
  for (let i = 0; i < aiCount; i += 1) {
    assigned[i] = i === bossOpponentIndex ? "" : roster[assigned.filter(Boolean).length % roster.length];
  }
  return assigned;
}

function getAiOpponentDisplayName(index = 0, bossOpponentIndex = -1, aiNameRoster = []) {
  const bossName = getAiBossNameForCurrentRace();
  if (index === bossOpponentIndex && bossName) return bossName;
  return aiNameRoster[index] || AI_DRIVER_NAMES[index % AI_DRIVER_NAMES.length];
}

function getAiBossOpponentIndex(gridPositions = [], aiCount = 0) {
  if (!getAiBossNameForCurrentRace() || aiCount <= 0) return -1;
  const humanCount = selectedGameMode === "quick-race"
    ? 1
    : Math.max(1, onlineRoomState.gridOrder.length || onlineRoomState.players.size || 1);
  const totalGridCars = Math.max(1, aiCount + humanCount);
  const frontCutoff = Math.max(1, Math.ceil(totalGridCars * 0.5));
  const candidates = gridPositions
    .map((gridPosition, index) => ({ gridPosition, index }))
    .filter((candidate) => candidate.gridPosition <= frontCutoff)
    .filter((candidate) => aiCount <= 1 || candidate.gridPosition !== 1);
  const pool = candidates.length ? candidates : gridPositions.map((gridPosition, index) => ({ gridPosition, index }));
  if (!pool.length) return -1;
  return pool[Math.floor(Math.random() * pool.length)].index;
}

function getAiBossNameForCurrentRace() {
  if (!(selectedAiDifficulty === "amateur" || selectedAiDifficulty === "professional")) return "";
  const kind = getCarProfile().kind;
  if (kind === "stock") return "Geoff Corden";
  if (kind === "formula") return "Louisa Hampton";
  if (kind === "lmp") return "Patricia Dempsey";
  return "";
}

function getAiBossCarIdForCurrentRace() {
  if (!(selectedAiDifficulty === "amateur" || selectedAiDifficulty === "professional")) return "";
  const kind = getCarProfile().kind;
  if (kind === "stock") return "geoff-corden-stock";
  if (kind === "formula") return "louisa-hampton-formula";
  if (kind === "lmp") return "patricia-dempsey-lmp";
  return "";
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
  if (!SHOW_AI_RACING_LINE_DEBUG) return;
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
  const line = getSelectedCyborgLineBank()?.fallback ?? { samples: [] };
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

function setCarDetailObjectVisible(object, visible) {
  if (object) object.visible = visible;
}

function setCarDetailObjectsVisible(carModel, visible) {
  for (const wheel of carModel?.wheelMeshes ?? []) setCarDetailObjectVisible(wheel, visible);
  setCarDetailObjectVisible(carModel?.wheels?.frontLeft, visible);
  setCarDetailObjectVisible(carModel?.wheels?.frontRight, visible);
  setCarDetailObjectVisible(carModel?.wheels?.rearLeft, visible);
  setCarDetailObjectVisible(carModel?.wheels?.rearRight, visible);
  setCarDetailObjectVisible(carModel?.frontWing, visible);
  setCarDetailObjectVisible(carModel?.rearWing, visible);
  for (const mesh of carModel?.lights?.headlightMeshes ?? []) setCarDetailObjectVisible(mesh, visible);
  for (const mesh of carModel?.lights?.brakeLights ?? []) setCarDetailObjectVisible(mesh, visible);
}

function updateLowGraphicsCarDetail(carModel, position = null) {
  if (!carModel?.root) return;
  const reference = position ?? carModel.root.position;
  const useSimpleDetail = gameSettings.graphicsQuality === "low"
    && gameStarted
    && reference
    && reference.distanceToSquared(carState.position) > LOW_GRAPHICS_SIMPLE_CAR_DISTANCE ** 2;
  if (carModel.root.userData.lowGraphicsSimpleDetail === useSimpleDetail) return;
  carModel.root.userData.lowGraphicsSimpleDetail = useSimpleDetail;
  setCarDetailObjectsVisible(carModel, !useSimpleDetail);
}

function tuneAiCarLights(aiCar, position = null, allowBeam = true) {
  const headlightsOn = allowBeam && shouldShowOpponentHeadlightsAt(position ?? aiCar?.root?.position);
  applyHeadlightQuality(aiCar, { isPlayer: false, forceVisible: headlightsOn });
  for (const light of aiCar.lights?.headlights ?? []) {
    light.visible = headlightsOn;
    light.intensity = headlightsOn ? (light.userData.baseIntensity ?? 16) * 0.55 : 0;
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
    opponent.ers = 100;
    opponent.boostActive = false;
    opponent.wheelSpin = 0;
    opponent.sampleIndex = pose.sampleIndex;
    opponent.sampleProgress = pose.sampleIndex;
    opponent.gridOffset = pose.laneOffset;
    opponent.launchLaneOffset = pose.laneOffset;
    opponent.racingLineOffset = 0;
    if (opponent.aiModel === AI_CYBORG_MODEL_NAME) {
      opponent.cyborg = createCyborgOpponentState(pose, i, opponent.isBoss);
    }
    syncCarVisualRoot(opponent.car.root, opponent.position);
    opponent.car.root.rotation.set(0, opponent.heading, 0);
    updateRearWing(1, false, opponent.car);
    for (const wheelPivot of Object.values(opponent.car.wheels ?? {})) {
      if (!wheelPivot) continue;
      wheelPivot.rotation.x = 0;
      wheelPivot.rotation.y = 0;
    }
    for (const wheel of opponent.car.wheelMeshes ?? []) {
      if (wheel) wheel.rotation.x = opponent.wheelSpin;
    }
  }
}

function updateAiOpponents(dt) {
  if (!(selectedGameMode === "quick-race" || isOnlineRaceGameMode()) || !aiOpponents.length || !track.samples?.length) return;
  const samples = track.samples;
  const activeAiHeadlights = getActiveAiHeadlightOpponents();
  for (const opponent of aiOpponents) {
    updateAiDifficultyModifiers(opponent, dt);
    if (opponent.aiModel === AI_CYBORG_MODEL_NAME && opponent.cyborg) {
      updateCyborgAiOpponent(opponent, dt, activeAiHeadlights);
      continue;
    }
    let nearestIndex = getNearestAiSampleIndex(opponent.position, samples, opponent.sampleIndex ?? 0);
    updateAiLapDebug(opponent, nearestIndex, samples.length);
    opponent.sampleIndex = nearestIndex;
    opponent.sampleProgress = nearestIndex;

    const profile = opponent.profile ?? getCarProfileById(opponent.carId);
    const racing = getAiRacingIntent(opponent, nearestIndex, samples, profile);
    const topSpeedScale = opponent.difficultyTopSpeedScale ?? 1;
    racing.maxSpeed *= topSpeedScale;
    racing.targetSpeed = Math.min(racing.targetSpeed * topSpeedScale, racing.maxSpeed);
    opponent.throttle = THREE.MathUtils.damp(opponent.throttle, racing.throttle, 4.2, dt);
    opponent.brake = THREE.MathUtils.damp(opponent.brake, racing.brake, 6.2, dt);

    const cornerAccelPenalty = 1 - racing.cornerSeverity * 0.14;
    const acceleration = profile.engineForce * 1.42 * (opponent.difficultyAccelerationScale ?? 1) * opponent.throttle * cornerAccelPenalty;
    const braking = profile.brakeForce * 0.9 * (opponent.difficultyBrakeScale ?? 1) * opponent.brake;
    const drag = opponent.speed * opponent.speed * 0.0048 + 0.34;
    opponent.speed += (acceleration - braking - drag) * dt;
    opponent.speed = THREE.MathUtils.clamp(opponent.speed, 0, racing.maxSpeed);
    opponent.speed = THREE.MathUtils.damp(opponent.speed, Math.min(opponent.speed, racing.targetSpeed), racing.brake > 0.6 ? 3.4 : 0.08, dt);

    const targetProgress = (nearestIndex + racing.lookahead) % samples.length;
    const currentSurface = track.sample(opponent.position.x, opponent.position.z);
    const offTrackRecovery = currentSurface.kind === "grass";
    if (offTrackRecovery) opponent.recoveryTimer = Math.max(opponent.recoveryTimer ?? 0, 1.35);
    opponent.recoveryTimer = Math.max(0, (opponent.recoveryTimer ?? 0) - dt);

    const launchLaneHold = getAiLaunchLaneHold();
    const overtakeOffset = updateAiOvertakeLaneOffset(opponent, dt);
    const normalLaneOffset = opponent.recoveryTimer > 0 ? 0 : getAiRacingLineOffset(targetProgress, samples, opponent, nearestIndex) + overtakeOffset;
    const launchLaneOffset = opponent.launchLaneOffset ?? opponent.gridOffset ?? 0;
    const racingLineOffset = THREE.MathUtils.lerp(normalLaneOffset, launchLaneOffset, launchLaneHold);
    const previousLineOffset = opponent.racingLineOffset ?? 0;
    const smoothedLineOffset = THREE.MathUtils.damp(previousLineOffset, racingLineOffset, AI_SAFE_LINE_TUNING ? 1.15 : 4.1, dt);
    const maxLineShift = (AI_SAFE_LINE_TUNING ? 2.2 : 7.5) * dt;
    opponent.racingLineOffset = THREE.MathUtils.clamp(smoothedLineOffset, previousLineOffset - maxLineShift, previousLineOffset + maxLineShift);
    const pathPose = getAiPathPose(
      targetProgress,
      samples,
      opponent.recoveryTimer > 0 ? 0 : (opponent.racingLineOffset ?? 0),
    );
    pathPose.currentTrack = getAiTrackEdgeState(opponent.position, samples, nearestIndex);
    opponent.gridOffset = THREE.MathUtils.damp(opponent.gridOffset ?? 0, 0, 1.15, dt);
    keepAiTargetOnTrack(opponent, pathPose, samples, targetProgress, racing);
    applyAiRecoveryAndAvoidance(opponent, pathPose, racing, currentSurface);
    applyAiTrafficAwareness(opponent, pathPose, racing, dt);
    updateAiDrivenCar(opponent, pathPose, racing, profile, dt);
    syncCarVisualRoot(opponent.car.root, opponent.position);
    opponent.car.root.rotation.set(0, opponent.heading, 0);
    tuneAiCarLights(opponent.car, opponent.position, activeAiHeadlights.has(opponent));
    updateLowGraphicsCarDetail(opponent.car, opponent.position);
    updateRearWing(dt, false, opponent.car);
    setCarBodyLean(
      opponent.car,
      opponent.brake * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.035,
      opponent.steer * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.18,
    );
    opponent.wheelSpin -= opponent.speed * dt * 1.25;
    for (const wheel of opponent.car.wheelMeshes ?? []) {
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

function updateCyborgAiOpponent(opponent, dt, activeAiHeadlights = getActiveAiHeadlightOpponents()) {
  const cyborg = opponent.cyborg;
  const line = cyborg.line;
  if (!line?.samples?.length || !line.totalDistance) return;

  const previousProgress = cyborg.progress;
  const profile = opponent.profile ?? getCarProfileById(opponent.carId);
  cyborg.launchOrientationTimer = Math.max(0, (cyborg.launchOrientationTimer ?? 0) - dt);
  const expectedProgress = cyborg.progress + Math.max(3, opponent.speed) * dt;
  cyborg.progress = getNearestCyborgProgressNear(line, opponent.position, expectedProgress, 46);
  const currentTrack = getAiTrackEdgeState(opponent.position, track.samples, opponent.sampleIndex ?? 0);
  const launchLaneHold = getAiLaunchLaneHold();
  const overtakeOffset = updateAiOvertakeLaneOffset(opponent, dt);
  const baseLaneOffset = THREE.MathUtils.lerp(cyborg.trainedLaneOffset ?? cyborg.laneOffset ?? 0, cyborg.launchLaneOffset ?? cyborg.laneOffset ?? 0, launchLaneHold);
  cyborg.laneOffset = baseLaneOffset;
  const effectiveLaneOffset = baseLaneOffset + overtakeOffset * (1 - launchLaneHold);
  const learnedPose = getCyborgLinePose(line, cyborg.progress, effectiveLaneOffset);
  const learnedTrack = getAiTrackEdgeState(learnedPose.position, track.samples, opponent.sampleIndex ?? 0);
  const learnedLaneOffset = learnedPose.position.clone().sub(learnedTrack.center).dot(learnedTrack.normal);
  const laneError = learnedLaneOffset - currentTrack.offset;
  const laneErrorAbs = Math.abs(laneError);
  const laneDeadzone = 0.1;
  const laneCorrection = laneErrorAbs <= laneDeadzone
    ? 0
    : Math.sign(laneError) * Math.min(laneErrorAbs - laneDeadzone, 7);
  const wallBias = getCyborgWallHeadingBias(opponent);
  const maxHeadingBias = 0.16;
  const laneHeadingBias = THREE.MathUtils.clamp(laneCorrection * 0.024 + wallBias, -maxHeadingBias, maxHeadingBias);
  cyborg.headingBias = THREE.MathUtils.damp(cyborg.headingBias ?? 0, laneHeadingBias, 2.2, dt);
  const speedLookaheadDistance = THREE.MathUtils.clamp(opponent.speed * 0.82 + 18, 24, 56);
  const brakingLookaheadDistance = speedLookaheadDistance * getCyborgBrakingLookaheadScale();
  cyborg.targetProgress = cyborg.progress + brakingLookaheadDistance;
  const lookPose = getCyborgLinePose(line, cyborg.targetProgress, effectiveLaneOffset);
  const headingLookaheadDistance = speedLookaheadDistance * 0.125;
  const headingPose = getCyborgLinePose(line, cyborg.progress + headingLookaheadDistance, effectiveLaneOffset);
  const learnedTargetHeading = headingPose.heading + (cyborg.headingBias ?? 0);
  const steeringReferenceDistance = THREE.MathUtils.clamp(opponent.speed * 0.08 + 4, 4, 8);
  const forwardTarget = opponent.position
    .clone()
    .add(new THREE.Vector3(Math.sin(learnedTargetHeading), 0, Math.cos(learnedTargetHeading)).multiplyScalar(steeringReferenceDistance));
  const launchOrientationBlend = cyborg.launchOrientationTimer > 0 ? 0.5 : 0;
  const trackTarget = getCyborgTrackTarget(forwardTarget, opponent.position, opponent.sampleIndex ?? 0, learnedTargetHeading, launchOrientationBlend);
  const throttlePose = getCyborgLinePose(line, cyborg.progress, effectiveLaneOffset);
  const topSpeedScale = opponent.difficultyTopSpeedScale ?? 1;
  const rawTargetSpeed = Math.max(9, lookPose.speed * (opponent.pace ?? 1) * topSpeedScale);
  const lineErrorSlowdown = THREE.MathUtils.clamp((laneErrorAbs - 0.2) / 6, 0, 1);
  const lineSpeedScale = THREE.MathUtils.lerp(1, 0.42, lineErrorSlowdown);
  const targetSpeed = rawTargetSpeed * lineSpeedScale;
  const speedError = opponent.speed - targetSpeed;
  const learnedBrake = Math.max(lookPose.brake, learnedPose.brake);
  const brake = speedError > 2
    ? THREE.MathUtils.clamp(speedError / Math.max(5, profile.brakeForce * 0.22), 0.15, 1)
    : learnedBrake > 0.2 && opponent.speed > targetSpeed * 0.92
      ? learnedBrake
      : 0;
  const throttle = brake > 0.08
    ? 0
    : THREE.MathUtils.clamp(Math.max(throttlePose.throttle, (targetSpeed - opponent.speed) / 7), 0.22, 1);
  const boostRequested = profile.hasErs && throttle > 0.15 && Math.max(learnedPose.boost ?? 0, throttlePose.boost ?? 0) > 0.45;
  const boostActive = updateAiErs(opponent, dt, boostRequested, brake > 0.08, profile);
  const boostPowerScale = boostActive ? (profile.boostPowerScale ?? 1.18) : 1;
  const racing = {
    lookahead: metersToAiSamples(brakingLookaheadDistance),
    targetSpeed,
    maxSpeed: profile.maxForwardSpeed * Math.max(0.9, opponent.pace ?? 1) * topSpeedScale * boostPowerScale,
    cornerSeverity: THREE.MathUtils.clamp(Math.abs(angleDifference(headingPose.heading, learnedPose.heading)) / 0.55, 0, 1),
    throttle,
    brake,
    boostActive,
    allowOffTrack: true,
    ignoreWalls: false,
    ignoreEdgePressure: true,
    softenGrassEmergencySlowdown: true,
  };
  opponent.throttle = THREE.MathUtils.damp(opponent.throttle, racing.throttle, 1.6, dt);
  opponent.brake = THREE.MathUtils.damp(opponent.brake, racing.brake, 8.2, dt);
  const currentSurface = track.sample(opponent.position.x, opponent.position.z);
  if (!racing.ignoreWalls) applyAiRecoveryAndAvoidance(opponent, trackTarget, racing, currentSurface);
  applyAiTrafficAwareness(opponent, trackTarget, racing, dt);
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
    if (profile.hasErs) opponent.ers = Math.max(opponent.ers ?? 0, Number(learnedPose.ers ?? 100));
  } else {
    cyborg.lapTime += dt;
    cyborg.lapDistance += opponent.speed * dt;
  }

  syncCarVisualRoot(opponent.car.root, opponent.position);
  opponent.car.root.rotation.set(0, opponent.heading, 0);
  tuneAiCarLights(opponent.car, opponent.position, activeAiHeadlights.has(opponent));
  updateLowGraphicsCarDetail(opponent.car, opponent.position);
  updateRearWing(dt, opponent.boostActive, opponent.car);
  setCarBodyLean(
    opponent.car,
    opponent.brake * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.032,
    opponent.steer * THREE.MathUtils.clamp(opponent.speed / 45, 0, 1) * 0.14,
  );
  opponent.wheelSpin -= opponent.speed * dt * 1.25;
  for (const wheel of opponent.car.wheelMeshes ?? []) {
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

function applyAiTrafficAwareness(opponent, targetPose, racing, dt = 1 / 60) {
  const nearbyCars = getTrafficAwarenessCars(opponent);
  if (!nearbyCars.length) {
    updateAiOvertakeIntent(opponent, null, 0, 0, dt);
    return;
  }

  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  let headingBias = 0;
  let strongestFollowLift = 0;
  let strongestCollisionRisk = 0;
  let bestOvertakeCandidate = null;
  let bestOvertakeScore = 0;
  let startPackPressure = 0;
  const lowSpeedAvoidanceScale = THREE.MathUtils.lerp(2.2, 1, THREE.MathUtils.smoothstep(opponent.speed ?? 0, 4, 24));
  const futureBox = getPredictedTrafficCollisionBox(opponent, 0.4, 0.32);
  const raceElapsed = getCurrentRaceElapsed();

  for (const other of nearbyCars) {
    const delta = other.position.clone().sub(opponent.position);
    const ahead = delta.dot(forward);
    const lateral = delta.dot(right);
    const absLateral = Math.abs(lateral);
    const relativeClosing = opponent.velocity.clone().sub(other.velocity).dot(forward);
    const otherForward = new THREE.Vector3(Math.sin(other.heading ?? 0), 0, Math.cos(other.heading ?? 0));
    const similarDirection = forward.dot(otherForward) > 0.65;
    const opponentHasTrackPosition = similarDirection && ahead < -0.55;

    const followRange = raceElapsed < 10 ? 5 : 14;
    if (ahead > 0.2 && ahead < followRange && absLateral < 2.25 && relativeClosing > -2) {
      const followIntensity = (1 - ahead / followRange) * (1 - absLateral / 2.25);
      strongestFollowLift = Math.max(strongestFollowLift, followIntensity);
      if (raceElapsed < AI_START_PACK_CAUTION_SECONDS) startPackPressure = Math.max(startPackPressure, followIntensity);
    }
    if (ahead > 2.2 && ahead < 24 && absLateral < 2.8 && relativeClosing > -1.5) {
      const candidateScore = (1 - ahead / 24) * (1 - absLateral / 2.8) * THREE.MathUtils.smoothstep(opponent.speed ?? 0, 10, 34);
      if (candidateScore > bestOvertakeScore) {
        bestOvertakeScore = candidateScore;
        bestOvertakeCandidate = other;
      }
    }

    if (ahead > -2.2 && ahead < 5.8 && absLateral < 2.15) {
      const sideIntensity = (1 - absLateral / 2.15) * (1 - Math.abs(ahead - 1.2) / 8);
      const awaySign = lateral >= 0 ? -1 : 1;
      headingBias += awaySign * THREE.MathUtils.clamp(sideIntensity, 0, 1) * 0.135 * lowSpeedAvoidanceScale;
      if (raceElapsed < AI_START_PACK_CAUTION_SECONDS) startPackPressure = Math.max(startPackPressure, sideIntensity * 0.68);
    }
    if (ahead > -4.2 && ahead < 4.8 && absLateral > 0.75 && absLateral < 3.8) {
      const alongsideIntensity = (1 - Math.abs(ahead) / 4.8) * (1 - (absLateral - 0.75) / 3.05);
      const awaySign = lateral >= 0 ? -1 : 1;
      const trackPositionSteeringScale = opponentHasTrackPosition ? 0.42 : 1;
      headingBias += awaySign * THREE.MathUtils.clamp(alongsideIntensity, 0, 1) * 0.18 * trackPositionSteeringScale;
      if (raceElapsed < AI_START_PACK_CAUTION_SECONDS) startPackPressure = Math.max(startPackPressure, alongsideIntensity * (opponentHasTrackPosition ? 0.3 : 0.72));
      if (!opponentHasTrackPosition && alongsideIntensity > 0.35 && raceElapsed >= 5) {
        racing.throttle *= THREE.MathUtils.lerp(1, 0.93, alongsideIntensity);
        racing.targetSpeed *= THREE.MathUtils.lerp(1, 0.95, alongsideIntensity);
      }
    }

    const otherFutureBox = getPredictedTrafficCollisionBox(other, 0.4, 0.22);
    const futureOverlap = getOrientedBoxOverlap(futureBox, otherFutureBox);
    if (futureOverlap) {
      const futureDelta = otherFutureBox.center.clone().sub(futureBox.center);
      const futureAhead = futureDelta.dot(forward);
      const futureLateral = futureDelta.dot(right);
      const awaySign = futureLateral >= 0 ? -1 : 1;
      const opponentWillHaveTrackPosition = similarDirection && futureAhead < -0.55;
      const overlapRisk = THREE.MathUtils.clamp(futureOverlap.depth / 1.25, 0, 1);
      const closingRisk = THREE.MathUtils.clamp(relativeClosing / 16, 0.15, 1);
      const diagonalRisk = THREE.MathUtils.smoothstep(Math.abs(futureLateral), 0.25, 2.8);
      const risk = overlapRisk * THREE.MathUtils.lerp(1, 1.28, diagonalRisk) * closingRisk;
      if (!opponentWillHaveTrackPosition) strongestCollisionRisk = Math.max(strongestCollisionRisk, risk);
      if (raceElapsed < AI_START_PACK_CAUTION_SECONDS && !opponentWillHaveTrackPosition) startPackPressure = Math.max(startPackPressure, risk);
      const launchSteeringBoost = raceElapsed < 5 ? 1.85 : 1;
      const futureSteeringScale = opponentWillHaveTrackPosition ? 0.35 : 1;
      headingBias += awaySign * risk * THREE.MathUtils.lerp(0.12, 0.22, lowSpeedAvoidanceScale - 1) * launchSteeringBoost * futureSteeringScale;
      if (!opponentWillHaveTrackPosition && futureAhead > -1.5 && raceElapsed >= 5) strongestFollowLift = Math.max(strongestFollowLift, risk * 0.84);
    }
  }

  updateAiOvertakeIntent(opponent, bestOvertakeCandidate, bestOvertakeScore, getAiCenterlineOvertakeSide(opponent), dt);

  if (raceElapsed < AI_START_PACK_CAUTION_SECONDS && startPackPressure > 0.05) {
    const cornerPressure = THREE.MathUtils.smoothstep(racing.cornerSeverity ?? 0, 0.24, 0.74);
    const speedPressure = THREE.MathUtils.smoothstep(opponent.speed ?? 0, 16, 42);
    const buffer = THREE.MathUtils.clamp(startPackPressure * cornerPressure * speedPressure, 0, 1);
    if (buffer > 0.04) {
      racing.brake = Math.max(racing.brake, THREE.MathUtils.lerp(0.04, 0.24, buffer));
      racing.throttle *= THREE.MathUtils.lerp(1, 0.72, buffer);
      racing.targetSpeed = Math.min(racing.targetSpeed, THREE.MathUtils.lerp(racing.maxSpeed * 0.94, racing.maxSpeed * 0.68, buffer));
      opponent.brake = Math.max(opponent.brake, racing.brake);
      opponent.throttle = Math.min(opponent.throttle, racing.throttle);
    }
  }

  const collisionThrottleBrakeRisk = raceElapsed < 5 ? 0 : strongestCollisionRisk;
  if (strongestFollowLift > 0 || collisionThrottleBrakeRisk > 0) {
    const highSpeedFollowScale = THREE.MathUtils.lerp(1, 0.55, THREE.MathUtils.smoothstep(opponent.speed ?? 0, 28, 58));
    const followAvoidance = THREE.MathUtils.clamp(Math.max(strongestFollowLift * 2.4, collisionThrottleBrakeRisk * 2.85) * highSpeedFollowScale, 0, 1);
    racing.collisionAvoidance = Math.max(racing.collisionAvoidance ?? 0, followAvoidance);
    racing.throttle *= THREE.MathUtils.lerp(1, 0.06, followAvoidance);
    racing.brake = Math.max(racing.brake, THREE.MathUtils.lerp(0, 0.82, followAvoidance));
    racing.targetSpeed *= THREE.MathUtils.lerp(1, 0.38, followAvoidance);
    opponent.throttle = Math.min(opponent.throttle, racing.throttle);
    opponent.brake = Math.max(opponent.brake, racing.brake);
  }

  targetPose.trafficHeadingBias = THREE.MathUtils.clamp(headingBias, -0.21 * lowSpeedAvoidanceScale, 0.21 * lowSpeedAvoidanceScale);
}

function updateAiOvertakeIntent(opponent, candidate, score, preferredSide, dt) {
  const overtakeScale = opponent.difficultyOvertakeIntentScale ?? 1;
  if (isAiLaunchOvertakeLocked()) {
    opponent.overtakeWatchTime = 0;
    opponent.overtakeHoldTime = 0;
    opponent.overtakeIntent = null;
    return;
  }
  if (!candidate || score <= 0.08) {
    opponent.overtakeWatchTime = Math.max(0, (opponent.overtakeWatchTime ?? 0) - dt * 1.8);
    opponent.overtakeHoldTime = Math.max(0, (opponent.overtakeHoldTime ?? 0) - dt);
    if ((opponent.overtakeWatchTime ?? 0) <= 0 && (opponent.overtakeHoldTime ?? 0) <= 0) opponent.overtakeIntent = null;
    return;
  }
  opponent.overtakeWatchTime = Math.min(2, (opponent.overtakeWatchTime ?? 0) + dt * overtakeScale);
  if (opponent.overtakeWatchTime < 0.7 / Math.max(0.45, overtakeScale)) return;
  const existingSide = opponent.overtakeIntent?.side;
  const side = existingSide || preferredSide || getAiFallbackOvertakeSide(opponent, candidate);
  opponent.overtakeHoldTime = Math.max(opponent.overtakeHoldTime ?? 0, 2.2 * Math.min(1.25, Math.max(0.85, overtakeScale)));
  opponent.overtakeIntent = {
    active: true,
    side,
    targetId: candidate.id ?? "player",
    confidence: THREE.MathUtils.clamp(score, 0, 1),
    towardCenterline: preferredSide !== 0,
  };
}

function updateAiOvertakeLaneOffset(opponent, dt) {
  opponent.overtakeHoldTime = Math.max(0, (opponent.overtakeHoldTime ?? 0) - dt);
  const intent = opponent.overtakeIntent;
  const targetOffset = intent?.active && (opponent.overtakeHoldTime ?? 0) > 0
    ? intent.side * THREE.MathUtils.lerp(2.2, 3.25, intent.confidence ?? 0)
    : 0;
  opponent.overtakeLaneOffset = THREE.MathUtils.damp(opponent.overtakeLaneOffset ?? 0, targetOffset, targetOffset ? 2.6 : 3.8, dt);
  if (Math.abs(opponent.overtakeLaneOffset) < 0.05 && targetOffset === 0) opponent.overtakeLaneOffset = 0;
  return opponent.overtakeLaneOffset ?? 0;
}

function getAiCenterlineOvertakeSide(opponent) {
  const trackState = getAiTrackEdgeState(opponent.position, track.samples, opponent.sampleIndex ?? 0);
  if (!trackState) return 0;
  if (trackState.offset > 0.45) return -1;
  if (trackState.offset < -0.45) return 1;
  return 0;
}

function getAiFallbackOvertakeSide(opponent, candidate) {
  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const lateral = candidate.position.clone().sub(opponent.position).dot(right);
  return lateral >= 0 ? -1 : 1;
}

function getPredictedTrafficCollisionBox(body, lookaheadSeconds = 0.4, margin = 0) {
  const velocity = body.velocity ?? new THREE.Vector3();
  const heading = body.heading ?? 0;
  const predictedPosition = body.position.clone().addScaledVector(velocity, lookaheadSeconds);
  const dims = getRaceCarCollisionDimensions(body.profile?.kind);
  const predictedHeading = heading + (body.yawRate ?? 0) * lookaheadSeconds;
  const forward = new THREE.Vector3(Math.sin(predictedHeading), 0, Math.cos(predictedHeading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const speed = velocity.length?.() ?? 0;
  return {
    center: predictedPosition,
    forward,
    right,
    halfLength: dims.halfLength + margin,
    halfWidth: dims.halfWidth + margin,
    invMass: 1 / THREE.MathUtils.lerp(dims.mass, dims.mass * 1.35, THREE.MathUtils.smoothstep(speed, 12, 48)),
  };
}

function getTrafficAwarenessCars(opponent) {
  const cars = [{
    id: "player",
    position: carState.position,
    velocity: carState.velocity,
    heading: carState.heading,
    yawRate: carState.yawRate,
    profile: getCarProfile(),
  }];
  for (const other of aiOpponents) {
    if (other === opponent) continue;
    cars.push({
      id: other.id ?? `ai-${other.gridPosition ?? 0}`,
      position: other.position,
      velocity: other.velocity,
      heading: other.heading,
      yawRate: other.yawRate,
      profile: other.profile,
    });
  }
  return cars;
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

function applyAiWallPrediction(opponent, targetPose, racing) {
  const danger = getAiPredictedWallDanger(opponent, 0.2);
  if (!danger) return;
  opponent.debug.wallDangerFrames += 1;
  const intensity = danger.intensity;
  targetPose.position.addScaledVector(danger.normal, THREE.MathUtils.lerp(2.5, 10, intensity));
  targetPose.trafficHeadingBias = THREE.MathUtils.clamp(
    (targetPose.trafficHeadingBias ?? 0) + danger.turnAway * THREE.MathUtils.lerp(0.12, 0.34, intensity),
    -0.42,
    0.42,
  );
  racing.brake = Math.max(racing.brake, THREE.MathUtils.lerp(0.18, 0.92, intensity));
  racing.throttle *= THREE.MathUtils.lerp(0.72, 0.04, intensity);
  racing.targetSpeed = Math.min(racing.targetSpeed, THREE.MathUtils.lerp(22, 7, intensity));
  opponent.brake = Math.max(opponent.brake ?? 0, racing.brake);
  opponent.throttle = Math.min(opponent.throttle ?? 1, racing.throttle);
}

function getAiPredictedWallDanger(opponent, lookaheadSeconds = 0.2) {
  if (!track.obstacles?.length) return null;
  const predictedPosition = opponent.position.clone().addScaledVector(opponent.velocity ?? scratchZeroVelocity, lookaheadSeconds);
  const predictedHeading = opponent.heading + (opponent.yawRate ?? 0) * lookaheadSeconds;
  const forward = new THREE.Vector3(Math.sin(predictedHeading), 0, Math.cos(predictedHeading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const dims = getRaceCarCollisionDimensions((opponent.profile ?? getCarProfileById(opponent.carId))?.kind);
  const checkPoints = [
    predictedPosition.clone().addScaledVector(forward, dims.halfLength).addScaledVector(right, dims.halfWidth),
    predictedPosition.clone().addScaledVector(forward, dims.halfLength).addScaledVector(right, -dims.halfWidth),
    predictedPosition.clone().addScaledVector(forward, dims.halfLength * 0.35).addScaledVector(right, dims.halfWidth),
    predictedPosition.clone().addScaledVector(forward, dims.halfLength * 0.35).addScaledVector(right, -dims.halfWidth),
    predictedPosition.clone(),
  ];
  let best = null;
  for (const obstacle of track.obstacles) {
    if (obstacle.kind !== "wall") continue;
    for (const point of checkPoints) {
      const closest = closestPointOnSegmentVector(point, obstacle.a, obstacle.b);
      const away = point.clone().sub(closest);
      let distance = away.length();
      const dangerDistance = (obstacle.halfWidth ?? 0.45) + 1.65;
      if (distance > dangerDistance) continue;
      const wallDirection = obstacle.b.clone().sub(obstacle.a).normalize();
      if (distance < 0.001) {
        away.set(wallDirection.z, 0, -wallDirection.x);
        distance = 1;
      } else {
        away.multiplyScalar(1 / distance);
      }
      const intensity = THREE.MathUtils.clamp(1 - distance / dangerDistance, 0, 1);
      const awayHeading = Math.atan2(away.x, away.z);
      const turnAway = THREE.MathUtils.clamp(angleDifference(awayHeading, opponent.heading), -1, 1);
      if (!best || intensity > best.intensity) best = { normal: away, intensity, turnAway };
    }
  }
  return best;
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
  if (!racing.ignoreWalls) applyAiWallPrediction(opponent, targetPose, racing);
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
  let desiredHeading = Number.isFinite(targetPose.learnedHeading)
    ? angleLerp(pointGuidedHeading, targetPose.learnedHeading, targetPose.learnedHeadingBlend ?? 0.65)
    : pointGuidedHeading;
  if (Number.isFinite(targetPose.learnedHeading) && targetPose.launchOrientationBlend > 0) {
    desiredHeading = angleLerp(desiredHeading, targetPose.learnedHeading, targetPose.launchOrientationBlend);
  }
  desiredHeading += targetPose.trafficHeadingBias ?? 0;
  const turnError = angleDifference(desiredHeading, opponent.heading);
  const speed = opponent.velocity.length();
  const aiLowSpeedSteer = profile.maxSteerLowSpeed * 1.22;
  const aiHighSpeedSteer = profile.maxSteerHighSpeed * 1.38;
  const maxSteer = THREE.MathUtils.lerp(
    aiLowSpeedSteer,
    aiHighSpeedSteer,
    THREE.MathUtils.smoothstep(speed, 8, 52),
  ) * THREE.MathUtils.lerp(1, 0.9, THREE.MathUtils.smoothstep(speed, 34, 70)) * getAiLaunchSteerScale();
  const steerGain = targetPose.steerGainOverride ?? 1.12;
  const steerDamp = targetPose.steerDampOverride ?? 9.5;
  opponent.steer = THREE.MathUtils.damp(opponent.steer, THREE.MathUtils.clamp(turnError * steerGain, -maxSteer, maxSteer), steerDamp, dt);

  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  let forwardSpeed = opponent.velocity.dot(forward);
  let lateralSpeed = opponent.velocity.dot(right);
  const surface = track.sample(opponent.position.x, opponent.position.z);
  const currentWheelGrassCount = getAiWheelGrassCount(opponent);
  const offTrackScale = surface.kind === "grass" ? 0.7 : surface.kind === "kerb" || surface.kind === "sausage" ? 0.74 : 1;
  const slipstreamStrength = getSlipstreamStrength(getAiSlipstreamBody(opponent));
  const slipstreamPowerScale = 1 + slipstreamStrength * 0.104;
  const slipstreamDragScale = 1 - slipstreamStrength * 0.286;
  const slipstreamMaxSpeed = racing.maxSpeed * (1 + slipstreamStrength * 0.0585);
  const steeringLoad = Math.abs(opponent.steer) / Math.max(maxSteer, 0.001);
  const cornerAccelPenalty = 1 - racing.cornerSeverity * 0.35 - steeringLoad * 0.16;
  if (edgePressure > 0.05) {
    opponent.throttle = Math.min(opponent.throttle, THREE.MathUtils.lerp(0.88, 0.42, edgePressure));
    opponent.brake = Math.max(opponent.brake, THREE.MathUtils.lerp(0.03, 0.22, edgePressure));
  }
  if (currentWheelGrassCount > 0 && !racing.softenGrassEmergencySlowdown) {
    const wheelRisk = currentWheelGrassCount / 4;
    opponent.throttle = Math.min(opponent.throttle, THREE.MathUtils.lerp(0.62, 0.2, wheelRisk));
    opponent.brake = Math.max(opponent.brake, THREE.MathUtils.lerp(0.16, 0.42, wheelRisk));
  }
  if ((selectedGameMode === "quick-race" || isOnlineRaceGameMode()) && getCurrentRaceElapsed() < 2 && (racing.collisionAvoidance ?? 0) <= 0.08) {
    opponent.throttle = 1;
    opponent.brake = 0;
    racing.throttle = 1;
    racing.brake = 0;
  }

  if (opponent.throttle > 0) {
    const powerFade = 1 - THREE.MathUtils.clamp(forwardSpeed / slipstreamMaxSpeed, 0, 1);
    const boostPowerScale = racing.boostActive ? (profile.boostPowerScale ?? 1.18) : 1;
    forwardSpeed += profile.engineForce * 1.45 * (opponent.difficultyAccelerationScale ?? 1) * offTrackScale * slipstreamPowerScale * boostPowerScale * opponent.throttle * Math.max(0.5, cornerAccelPenalty) * (0.45 + powerFade * 0.55) * dt;
  }
  if (opponent.brake > 0) {
    forwardSpeed = moveToward(forwardSpeed, 0, profile.brakeForce * 0.92 * (opponent.difficultyBrakeScale ?? 1) * opponent.brake * dt);
  }

  const grip = (surface.kind === "grass" ? profile.grassGrip : profile.baseGrip) * (1 + speed * speed * profile.downforce);
  lateralSpeed = THREE.MathUtils.damp(lateralSpeed, 0, grip, dt);
  forwardSpeed -= forwardSpeed * Math.abs(forwardSpeed) * 0.0034 * slipstreamDragScale * dt;
  forwardSpeed = moveToward(forwardSpeed, 0, 0.55 * dt);
  forwardSpeed = THREE.MathUtils.clamp(forwardSpeed, 0, slipstreamMaxSpeed);

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
  spawnFormulaSparks(dt, profile, racing.boostActive, forwardSpeed, opponent.velocity.length(), { position: opponent.position, forward, right });
  const wheelGrassCount = getAiWheelGrassCount(opponent);
  if (wheelGrassCount > 0) {
    opponent.debug.grassFrames += 1;
    opponent.recoveryTimer = Math.max(opponent.recoveryTimer ?? 0, wheelGrassCount >= 2 ? 1.1 : 0.45);
    const grassSlowdown = racing.softenGrassEmergencySlowdown
      ? THREE.MathUtils.lerp(0.998, 0.982, wheelGrassCount / 4)
      : THREE.MathUtils.lerp(0.92, 0.72, wheelGrassCount / 4);
    opponent.velocity.multiplyScalar(grassSlowdown);
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
  const profile = opponent.profile ?? getCarProfileById(opponent.carId);
  const dims = getRaceCarCollisionDimensions(profile.kind);
  const forward = new THREE.Vector3(Math.sin(opponent.heading), 0, Math.cos(opponent.heading));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);
  const collisionPoints = [
    opponent.position.clone().addScaledVector(forward, dims.halfLength).addScaledVector(right, dims.halfWidth),
    opponent.position.clone().addScaledVector(forward, dims.halfLength).addScaledVector(right, -dims.halfWidth),
    opponent.position.clone().addScaledVector(forward, -dims.halfLength).addScaledVector(right, dims.halfWidth),
    opponent.position.clone().addScaledVector(forward, -dims.halfLength).addScaledVector(right, -dims.halfWidth),
    opponent.position.clone().addScaledVector(forward, dims.halfLength * 0.35).addScaledVector(right, dims.halfWidth),
    opponent.position.clone().addScaledVector(forward, dims.halfLength * 0.35).addScaledVector(right, -dims.halfWidth),
  ];
  for (const obstacle of track.obstacles) {
    if (obstacle.kind !== "wall") continue;
    for (const point of collisionPoints) {
      const closest = closestPointOnSegmentVector(point, obstacle.a, obstacle.b);
      const away = point.clone().sub(closest);
      let distance = away.length();
      const safeDistance = (obstacle.halfWidth ?? 0.45) + 0.28;
      if (distance > safeDistance) continue;
      const wallDirection = obstacle.b.clone().sub(obstacle.a).normalize();
      if (distance < 0.001) {
        away.set(wallDirection.z, 0, -wallDirection.x);
        distance = 1;
      }
      const normal = away.multiplyScalar(1 / distance);
      const penetration = safeDistance - distance;
      opponent.position.addScaledVector(normal, penetration + 0.08);
      const incomingSpeed = -opponent.velocity.dot(normal);
      let tangentSpeed = opponent.velocity.dot(wallDirection);
      if (tangentSpeed < 0) wallDirection.multiplyScalar(-1);
      tangentSpeed = Math.abs(tangentSpeed);
      const scrapeSeverity = THREE.MathUtils.clamp(incomingSpeed / Math.max(opponent.speed ?? opponent.velocity.length(), 0.001), 0, 1);
      opponent.velocity
        .copy(wallDirection)
        .multiplyScalar(tangentSpeed * THREE.MathUtils.lerp(0.84, 0.28, scrapeSeverity))
        .addScaledVector(normal, incomingSpeed > 0 ? Math.min(incomingSpeed * 0.08, 0.65) : 0.22);
      opponent.heading = angleLerp(opponent.heading, Math.atan2(wallDirection.x, wallDirection.z), THREE.MathUtils.lerp(0.18, 0.44, scrapeSeverity));
      opponent.yawRate *= THREE.MathUtils.lerp(0.7, 0.24, scrapeSeverity);
      opponent.speed = opponent.velocity.length();
      opponent.recoveryTimer = Math.max(opponent.recoveryTimer ?? 0, 0.75);
      opponent.debug.wallCorrectionFrames += 1;
      return;
    }
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
  const safetyScale = opponent.difficultySafetyMarginScale ?? 1;

  const targetIndex = Math.floor(((targetProgress % samples.length) + samples.length) % samples.length);
  const currentHeading = getSampleHeading(samples, targetIndex);
  const futureHeading = getSampleHeading(samples, targetIndex + Math.max(10, Math.round((racing?.lookahead ?? 20) * 0.45)));
  const bendDirection = Math.sign(angleDifference(futureHeading, currentHeading)) || Math.sign(pathPose.position.clone().sub(pathPose.center).dot(pathPose.normal)) || 1;
  const currentOffset = pathPose.position.clone().sub(pathPose.center).dot(pathPose.normal);
  const saferOffset = -bendDirection * Math.max(0, pathPose.width - 3.8) * THREE.MathUtils.lerp(0.38, 0.18, THREE.MathUtils.clamp(safetyScale - 1, 0, 2) / 2);
  const centeredOffset = THREE.MathUtils.lerp(currentOffset, saferOffset, THREE.MathUtils.clamp(unsafe * 0.82 * safetyScale, 0, 1));
  pathPose.position.copy(pathPose.center).addScaledVector(pathPose.normal, centeredOffset);
  pathPose.position.y = track.groundY;
  if (racing) {
    const caution = THREE.MathUtils.clamp(unsafe * THREE.MathUtils.lerp(1, 1.55, THREE.MathUtils.clamp(safetyScale - 1, 0, 2) / 2), 0, 1);
    racing.throttle = Math.min(racing.throttle, THREE.MathUtils.lerp(0.82, 0.45, caution));
    racing.brake = Math.max(racing.brake, THREE.MathUtils.lerp(0.05, 0.28, caution));
    racing.targetSpeed = Math.min(racing.targetSpeed, THREE.MathUtils.lerp(racing.maxSpeed * 0.78, 16, caution));
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
  const safetyScale = opponent.difficultySafetyMarginScale ?? 1;
  return Math.abs(offset) > edgeState.halfWidth - margin * safetyScale;
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
  const gridPose = selectedGameMode === "quick-race"
    ? getQuickRaceGridPose(selectedGridPosition)
    : isOnlineRaceGameMode()
      ? getQuickRaceGridPose(getOnlineGridPositionForPlayer())
      : null;
  const spawn = gridPose
    ? { x: gridPose.position.x, z: gridPose.position.z, heading: gridPose.heading }
    : isTimeTrialGameMode() && track.timeTrialStart
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
  carState.collisionGripTimer = 0;
  carState.collisionGripLoss = 0;
  carState.boostActive = false;
  carState.nitrousFlameScale = 0;
  carState.headlightsOn = shouldDefaultHeadlightsOn();
  syncCarVisualRoot(car.root, carState.position);
  car.root.rotation.set(0, carState.heading, 0);
  setCarBodyLean(car, 0, 0);
  for (const wheelPivot of Object.values(car.wheels)) {
    if (!wheelPivot) continue;
    wheelPivot.rotation.x = 0;
    wheelPivot.rotation.y = 0;
  }
  for (const wheel of car.wheelMeshes ?? []) {
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
  if (isTimeTrialGameMode()) resetTimeTrialState({ clearLaps: !keepTimeTrialLaps });
  else updateTimeTrialHud();
  if (selectedGameMode === "quick-race" && gameStarted) resetQuickRaceState();
  else updateQuickRaceHud();
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






















































