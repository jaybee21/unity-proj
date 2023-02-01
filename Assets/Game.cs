using UnityEngine;
using System.Collections;

public class Game : MonoBehaviour {
	
	public GameObject prefab;

	//  for initialization
	void Start () {
			Instantiate(prefab, new Vector3(50, 2, 50), Quaternion.identity);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
