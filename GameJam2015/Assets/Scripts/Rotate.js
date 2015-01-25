//This script allows the user to rotate the player either left or right continuously	
	var speed : float = 6.0;
	var jumpSpeed : float = 8.0;
	var gravity : float = 20.0;
	private var moveDirection : Vector3 = Vector3.zero;
	var updateSpeed : float = 3.0;
	var turnSpeed : float = 50.0;

	function Update() {
		
		if (Input.GetButton("RotateRight")){
		 	transform.Rotate(0,turnSpeed * updateSpeed  * Time.deltaTime,0);
		 	updateSpeed += 0.0;
		 }
		if (Input.GetButtonUp("RotateRight")) updateSpeed = 1.0;
		if (Input.GetButton("RotateLeft")){
		    transform.Rotate(0,-turnSpeed * updateSpeed * Time.deltaTime,0);
		    updateSpeed += 0.0;
		 }
		if (Input.GetButtonUp("RotateLeft")) updateSpeed = 1.0;
	}
