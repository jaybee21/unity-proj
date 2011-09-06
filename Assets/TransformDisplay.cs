using UnityEngine;
using System.Collections;

public class TransformDisplay : MonoBehaviour {
	public Transform player;
	public GUIText guiText;

	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		guiText.text = player.position.ToString();
	}
}
