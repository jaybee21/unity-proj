private var doorIsOpen : boolean = false;
private var doorTimer : float = 0.0;
private var currentDoor : GameObject;
private var haveMatches : boolean = false;

var matchGUI : GameObject;
var doorOpenSound : AudioClip;
var doorShutSound : AudioClip;
var batteryCollect : AudioClip;

function OnControllerColliderHit(hit: ControllerColliderHit){
	
	if(hit.collider.gameObject == GameObject.Find("campfire")){
		
		if(haveMatches){
			lightFire();	
		}else{
			TextHints.textOn=true;
			TextHints.message = "I'll need some matches to light this camp fire..";	
		}
		
	}
	
	var crosshairObj : GameObject = GameObject.Find("Crosshair");
	var crosshair : GUITexture = crosshairObj.GetComponent(GUITexture);
	
	if(hit.collider == GameObject.Find("mat").collider){
		CoconutThrow.canThrow=true;
		crosshair.enabled = true;
		TextHints.textOn=true;
		TextHints.message = "Knock down all 3 to win a battery!";
		GameObject.Find("TextHint GUI").transform.position.y = 0.2;
	}else{
		CoconutThrow.canThrow=false;
		crosshair.enabled = false;
		GameObject.Find("TextHint GUI").transform.position.y = 0.5;
	}
}

function Door(aClip : AudioClip, openCheck : boolean, animName : String, thisDoor: GameObject){
	audio.PlayOneShot(aClip);
	doorIsOpen = openCheck;
	
	var myOutpost : GameObject = GameObject.Find("outpost");
	myOutpost.animation.Play(animName);
}

function Update(){
	
	var hit : RaycastHit;

	if (Physics.Raycast (transform.position, transform.forward, hit, 3)) {
		if(hit.collider.gameObject.tag=="outpostDoor" && doorIsOpen == false && BatteryCollect.charge >= 4){
			Door(doorOpenSound, true, "dooropen", currentDoor);
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
			Door(doorShutSound, false, "doorshut", currentDoor);
			doorTimer = 0.0;
		}
	}	
}

function OnTriggerEnter(collisionInfo : Collider){

	if(collisionInfo.gameObject.tag == "battery"){
		BatteryCollect.charge++;
		audio.PlayOneShot(batteryCollect);
		Destroy(collisionInfo.gameObject);	
	}
	if(collisionInfo.gameObject.name == "matchbox"){
		Destroy(collisionInfo.gameObject);
		haveMatches=true;	
		audio.PlayOneShot(batteryCollect);
		var matchGUIobj : GameObject = Instantiate(matchGUI, Vector3(0.15,0.1,0), transform.rotation);
			matchGUIobj.name = "matchGUI";
	}
}

function lightFire(){
	var campfire : GameObject = GameObject.Find("campfire");	
	var campSound : AudioSource = campfire.GetComponent(AudioSource);
		campSound.Play();
		
	var flames : GameObject = GameObject.Find("FireSystem");
	var flameEmitter : ParticleEmitter = flames.GetComponent(ParticleEmitter);
		flameEmitter.emit = true;
		
	var smoke : GameObject = GameObject.Find("SmokeSystem");
	var smokeEmitter : ParticleEmitter = smoke.GetComponent(ParticleEmitter);
		smokeEmitter.emit = true;
		
		Destroy(GameObject.Find("matchGUI"));
		
		TextHints.textOn=true;
		TextHints.message = "You Lit the Fire, you'll survive, well done!";
		
		yield new WaitForSeconds(5);

		Application.LoadLevel("Menu");
}


@script RequireComponent(AudioSource)