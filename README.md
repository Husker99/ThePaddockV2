# The Paddock

A browser-based 3D arcade Formula racing prototype built with Three.js.

## What is in this first version

- A sharper racing-sim menu flow with retro arcade-inspired fonts, Back buttons, and a live spotlight showroom that spins the selected car during car selection.
- Formula, LMP, Stock Car, and Jeep class menus, with Ferraro, Mersedeez, and Alpeen Formula paint schemes plus four Stock Car, four LMP, and four Jeep paint options.
- Two closed 3D tracks based on the uploaded circuit references.
- A car spawn location based on the red marker in the reference.
- Stronger ERS boost with a HUD gauge, Shift activation, recharge, braking regen, five seconds of full-capacity use, quieter electrical whine, and rear-wing flattening while active.
- ERS electrical whine while boost is active.
- A flat red-and-white curved track extension based on the latest practice circuit reference.
- More low-poly scenery buildings, clouds, and a sun around the circuit.
- A clean low-poly visual style with grass, road, and kerbs.
- A shared low-poly Formula car model with Ferraro, Mersedeez, and Alpeen paint schemes, wedge-shaped bodywork, an ERS-flattening front wing that pivots from its front edge, clean rear wing, diffuser, halo, mirrors, driver helmet, suspension rods, rims, and visible front-wheel steering.
- Four NASCAR-inspired Stock Car paint schemes with visible wheels, heavier handling, stronger grass tolerance, hood cockpit view, conventional gas-engine sound, and no ERS.
- Four LMP paint schemes with covered prototype bodywork, a shorter early-sloping front wedge, stronger acceleration, rear-drive throttle-oversteer risk, heavy high-speed handling, and a top speed around 200 mph.
- Four tall off-road Jeep paint schemes, including a lighter desert camo, with slower manual five-gear driving, a GT-inspired rev/gear meter for manual cars only, mouse-button shifting, weaker brakes, deep mechanical engine sound, softer high-gear lugging, and noticeable body sway in hard turns.
- Toggleable behind-the-car chase and cockpit cameras, with a milder chase-camera speed pullback so the car stays closer at high speed.
- Mouse-drag chase camera orbit and scroll-wheel zoom.
- `Esc` opens car selection during a race, and `P` toggles pause.
- Formula 4-inspired arcade handling with about a 150 mph top speed, calmer Formula steering, softer Formula braking, reduced steering while accelerating, reduced acceleration while turning, stronger lift-off deceleration, speed-sensitive understeer, drag, lateral grip, grass-specific grip/acceleration/top-speed loss, and downforce-style high-speed grip.
- More detailed asphalt and grass materials, grass tufts, and dirt kick-up when driving through grass.
- Generated five-gear V8-style engine audio with automatic gear-change behavior, plus "The Paddock Theme" MP3 menu music at 50% volume.
- HUD readouts for speed, gear, and current surface.

## Controls

- `W` or `Up Arrow`: throttle
- `S` or `Down Arrow`: brake / reverse
- `A` or `Left Arrow`: steer left
- `D` or `Right Arrow`: steer right
- `Space`: toggle chase/cockpit camera
- `C`: handbrake
- Left mouse: shift manual cars up
- Right mouse: shift manual cars down
- `P`: pause / resume
- `Esc`: open car selection
- `R`: reset car

## How to run it

Node.js is already installed on this computer.

From this folder, run:

```powershell
npm.cmd install --cache .\.npm-cache
npm.cmd run dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Where the driving feel lives

The main handling values are in `src/main.js` inside the `tuning` object. That is where we will tune acceleration, braking, grip, steering response, downforce, and off-track behavior as the game evolves from arcade F1 toward sim-lite.
