/* Script Provided by Will Goldstone as part of Unity Game Development Essentials book assets */
/* Please Do Not Remove this comment - this script is for reference only */

var levelToLoad : String;
var normalTexture : Texture2D;
var rollOverTexture : Texture2D;
var beep : AudioClip;
var QuitButton : boolean = false;

function OnMouseEnter(){
	guiTexture.texture = rollOverTexture;
}
function OnMouseExit(){
	guiTexture.texture = normalTexture;	
}

function OnMouseUp(){
	audio.PlayOneShot(beep);
	yield new WaitForSeconds(0.35);
		
	if(QuitButton){
		Application.Quit();
		Debug.Log("This part works!");
	}
	else{
		Application.LoadLevel(levelToLoad);	
	}
}

@script RequireComponent(AudioSource)