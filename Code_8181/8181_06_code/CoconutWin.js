/* Script Provided by Will Goldstone as part of Unity Game Development Essentials book assets */
/* Please Do Not Remove this comment - this script is for reference only */

static var targets : int = 0;
private var haveWon : boolean = false;
var win : AudioClip;
var battery : GameObject;

function Update () {

	if(targets==3 && haveWon == false){
		targets=0;
		audio.PlayOneShot(win);
		var lastBattery : GameObject = Instantiate(battery, Vector3(transform.position.x, transform.position.y+2, transform.position.z), transform.rotation);
		haveWon = true;
	}
}

@script RequireComponent(AudioSource)