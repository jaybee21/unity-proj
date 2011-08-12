/* Script Provided by Will Goldstone as part of Unity Game Development Essentials book assets */
/* Please Do Not Remove this comment - this script is for reference only */
var startPosition : float = -1.0;
var endPosition : float = 0.5;
var speed : float = 1.0;
private var StartTime : float;

function Start(){
	StartTime = Time.time;
}

function Update () {
	
	transform.position.x = Mathf.Lerp(startPosition, endPosition, (Time.time-StartTime)*speed);
	
}