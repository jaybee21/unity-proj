/* Script Provided by Will Goldstone as part of Unity Game Development Essentials book assets */
/* Please Do Not Remove this comment - this script is for reference only */
var batteryCollect : AudioClip;
private var doorIsOpen : boolean = false;
private var doorTimer : float = 0.0;
private var currentDoor : GameObject;

var doorOpenTime : float = 3.0;
var doorOpenSound : AudioClip;
var doorShutSound : AudioClip;


/*
function OnControllerColliderHit(hit: ControllerColliderHit){
	if(hit.gameObject.tag == "outpostDoor" && doorIsOpen == false){
		currentDoor = hit.gameObject;
		Door(doorOpenSound, true, "dooropen", currentDoor);
	}
}
*/


function Door(aClip : AudioClip, openCheck : boolean, animName : String, thisDoor : GameObject){
	audio.PlayOneShot(aClip);
	doorIsOpen = openCheck;
	thisDoor.transform.parent.animation.Play(animName);
}

function Update(){
	
	var hit : RaycastHit;

	if (Physics.Raycast (transform.position, transform.forward, hit, 3)) {
		if(hit.collider.gameObject.tag=="outpostDoor" && doorIsOpen == false && BatteryCollect.charge >= 4){
			Door(doorOpenSound, true, "dooropen");
			GameObject.Find("Battery GUI").GetComponent(GUITexture).enabled=false;
		}else if(hit.collider.gameObject.tag=="outpostDoor" && doorIsOpen == false && BatteryCollect.charge < 4){
			GameObject.Find("Battery GUI").GetComponent(GUITexture).enabled=true;	
			TextHints.message = "The door seems to need more power to open..";
			TextHints.textOn = true;
		}
	}

	
	if(doorIsOpen){
		doorTimer += Time.deltaTime;
		
		if(doorTimer > 3){
			Door(doorShutSound, false, "doorshut");
			doorTimer = 0.0;
		}
	}	
}

function OnTriggerEnter(collisionInfo : Collider){	if(collisionInfo.gameObject.tag == "battery"){		BatteryCollect.charge++;		audio.PlayOneShot(batteryCollect);		Destroy(collisionInfo.gameObject);		}}

@script RequireComponent(AudioSource)