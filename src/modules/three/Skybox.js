import { 
	TextureLoader, 
	MeshBasicMaterial, 
	BackSide, 
	BoxGeometry, 
	Mesh
} from "three"

export let Skybox_Mesh = null

export class Skybox {
	constructor(PATH) {
		this.PATH = PATH
	}

	Create(IMAGE_NAME, FORMAT) {
		const Materials = []
		const texture_ft = new TextureLoader().load(this.PATH+IMAGE_NAME+"Ft."+FORMAT)
		const texture_bk = new TextureLoader().load(this.PATH+IMAGE_NAME+"Bk."+FORMAT)
		const texture_up = new TextureLoader().load(this.PATH+IMAGE_NAME+"Up."+FORMAT)
		const texture_dn = new TextureLoader().load(this.PATH+IMAGE_NAME+"Dn."+FORMAT)
		const texture_rt = new TextureLoader().load(this.PATH+IMAGE_NAME+"Rt."+FORMAT)
		const texture_lf = new TextureLoader().load(this.PATH+IMAGE_NAME+"Lf."+FORMAT)

		Materials.push(new MeshBasicMaterial({map:texture_ft}))
		Materials.push(new MeshBasicMaterial({map:texture_bk}))
		Materials.push(new MeshBasicMaterial({map:texture_up}))
		Materials.push(new MeshBasicMaterial({map:texture_dn}))
		Materials.push(new MeshBasicMaterial({map:texture_rt}))
		Materials.push(new MeshBasicMaterial({map:texture_lf}))

		for (let i = 0; i < 6; i++) {
			Materials[i].side = BackSide
		}
		const Skybox_Geometry = new BoxGeometry(1e3,1e3,1e3)
		const Skybox_Mesh = new Mesh(Skybox_Geometry, Materials)

		return Skybox_Mesh
	}
}