export class tick_Profile {
	constructor(WebGL_SCENE) {
		this.WebGL_SCENE = WebGL_SCENE
		this.WebGL_SCENE.setAnimationLoop((deltaTime) => {

		})
	}
	
	preTick(pre_f) {
		try {pre_f()} catch(e) {
			console.warn("rE_Tick preTick ERR:", e)
		}
	}
	postTick(post_f) {
		try {post_f()} catch(e) {
			console.warn("rE_Tick postTick ERR:", e)
		}
	}
}