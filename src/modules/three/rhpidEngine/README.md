<h1 align="center">rhpidEngine</h1>
<p align="center"><i>A Simple WebGL / ThreeJS Character, Movement, and Physics Engine.</i></p>
<br>
<h1>What is this?</h1>
<p>rhpidEngine provides basic physics, movement controls, and a character.<br>
Customizing, extensibility, speed, and simplicity are all priority.</p>
<h1>Usage</h1>
<p>rhpidEngine requires three.js you can install it with npm:</p>

```bash 
cd Project_DIR/
npm install three
```
<p>three.js: https://github.com/mrdoob/three.js/<br>
npm: https://www.npmjs.com/</p>
<h3><ins>Create a Root</ins></h3>
<p>This is how you can move, interact, and have a character controller for your scene, it is the basis to getting a character.</p>

```javascript
import { rE_RootPlayer } from 'rhpidEngine/rE_Root'
import { Clock } from 'three'

const dtClock = new Clock()

const RootMover      = new rE_RootPlayer(Camera, WebGL_Renderer)
const RootObject     = RootMover.Create()
const RootMove       = RootMover.ApplyMovement() //Give the root movement, this is hooked to rE_Bind
const CameraControls = RootMover.Camera() //Have an orbital camera to follow the root, this is hooked to rE_Bind and updated within optionally if created.

Scene.add(RootObject)

WebGL_Renderer.setAnimationLoop((delta) => {
	const deltaTime = dtClock.getDelta() //It is very recommended to have deltaTime for movement.
	RootMove.update(deltaTime)
	...
})
```

<h3><ins>Create the Character</ins></h3>

```javascript
import { CharacterRig } from 'rhpidEngine/rE_Character'

const CharacterNew = new CharacterRig()
const Character    = CharacterNew.Create()

Scene.add(...Character.Limbs)

WebGL_Renderer.setAnimationLoop((delta) => {
	CharacterNew.RootJoint_update() //Update the root first
	//Animations can play here before "Joints_update()" (Recommended)
	CharacterNew.Joints_update() //Update the rest of the body parts
	...
})
```

<h4>Root has properties: <code>WalkSpeed</code>, <code>JumpHeight</code>, <code>HipHeight</code>, <code>Color</code>.</h4>

---