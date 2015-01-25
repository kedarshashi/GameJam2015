/// This script moves the character controller forward 
	/// and sideways based on the arrow keys.
	/// It also jumps when pressing space.
	/// Make sure to attach a character controller to the same game object.
	/// It is recommended that you make only one call to Move or SimpleMove per frame.	
	var speed : float = .00000000000000000002;
	var isLStillDown = false;
	var isRStillDown = false;
	private var moveDirection : Vector3 = Vector3.zero;
	var AudioFile: AudioClip;
	var previousPress : String;
	var currentPress : String;
	public var tripped;
	var tripTimer : float = .4;
	var deltatimer : float;
	
	//Upgraded walking tool
	var leftFootTime : float;
	var rightFootTime : float;
	var sleftFootTime : float;
	
	var timeBetweenLR : float;
	var timeBetweenRL : float;
	
	var upperBound : float;
	var lowerBound : float;
	 
	
	function Start()
	{
		tripped = false;
		previousPress = "";
		deltatimer = 0;
	}
	
	//----------------------------=Update=------------------------
	function Update() 
	{
		currentPress = "";
		//var controller : CharacterController = GetComponent(CharacterController);
		// Check if the button was pressed and was not in previous frame
		if (Input.GetButtonDown("StepLeft") && (isLStillDown == false)) {
			
			leftFootTime = Time.realtimeSinceStartup;
			currentPress = "left";
			
			//did they stop moving counter
			deltatimer = 0;
			
			doITrip();
			advancedTripping();
			
			if (tripped == false)
			{
				
				// We stepped left
				transform.Translate(Vector3.forward * speed * Time.deltaTime);
				transform.Translate(Vector3.forward * speed * Time.deltaTime);
				transform.Translate(Vector3.forward * speed * Time.deltaTime);


				//transform.localPosition += transform.forward * speed * Time.deltaTime;
				
			
				
				isLStillDown = true;
				// Move the controller and make sound
				audio.clip = AudioFile;
				audio.Play();
				previousPress = currentPress;

				
			}
			else
			{
				test();
				print("finished tripping");
				tripped= false;
				previousPress = "";

			}
				
	
		}
		// Check if the button was pressed and was not in previous frame
		else if (Input.GetButtonDown("StepRight") && (isRStillDown == false)) {
			
			rightFootTime = Time.realtimeSinceStartup;
			deltatimer = 0;
			currentPress = "right";
			
			//Determining if I've tripped
			doITrip();
			advancedTripping();
			
			
			if (tripped == false)
			{
			
				// We stepped right
				transform.Translate(Vector3.forward * speed * Time.deltaTime);
				transform.Translate(Vector3.forward * speed * Time.deltaTime);
				transform.Translate(Vector3.forward * speed * Time.deltaTime);


				//transform.localPosition += transform.forward * speed * Time.deltaTime;
				
				
				isRStillDown = true;
				// Move the controller
				audio.clip = AudioFile;
				audio.Play();
				previousPress = currentPress;

			}
			else
			{
				//tripStun();
				//StartCoroutine(WaitForStunToEnd());
				test();
				print("finished tripping");
				tripped= false;
				previousPress = "";
			}
			
	
		}
		else
		{
			// If they have stopped moving, then allow any step
			deltatimer += Time.deltaTime;
			if(deltatimer >= tripTimer)
			{
				previousPress = "";
			}
			rigidbody.velocity = Vector3(0,0,0);
		}
		
		
		
	}
	//--------------------------------------------------------------------
	
	function doITrip()
	{
		if(previousPress == currentPress && previousPress != "")
		{
			tripped = true;
			//Debug.log("tripping");
		}
	
	}
	
	function tripping()
	{
		//Debug.log("YOU FELL!");

		tripTimer -= Time.deltaTime;
		
		while(tripTimer >= 0)
		{
			tripTimer -= Time.deltaTime;

			//Debug.log("YOU FELL!");
		}
		
	}
	
	
	//Advanced Tripping
	function advancedTripping()
	{
		if(previousPress == "Left")
		{
			timeBetweenLR = rightFootTime - leftFootTime;
			if(timeBetweenLR > upperBound || timeBetweenLR < lowerBound)
			{
				tripped = true;
			}
			
			upperBound = timeBetweenLR + .02;
			lowerBound = timeBetweenLR - .02;
		}
		else
		{
		if(timeBetweenRL > upperBound || timeBetweenRL < lowerBound)
		{
			tripped = true;
		}
			timeBetweenRL = leftFootTime - rightFootTime;
			upperBound = timeBetweenRL + .02;
			lowerBound = timeBetweenRL - .02;

		}
		
	}
	

	     function tripStun() 
	     {
     	 	// Wait a frame
 
     		// Wait 0.2 seconds
     		return new WaitForSeconds(2.0f);
		}
		
		
		
		
		
		
		
	function test()	
	{	
		// - After 0 seconds, prints "Starting 0.0"
		// - After 0 seconds, prints "Before WaitAndPrint Finishes 0.0"
		// - After 2 seconds, prints "WaitAndPrint 2.0"
		//print ("Starting " + Time.time);
		// Start function WaitAndPrint as a coroutine. And continue execution while it is running
	
		// this is the same as WaitAndPrint(2.0) as the compiler does it for you automatically
		StartCoroutine(WaitAndPrint(2.0)); 
		//print ("Before WaitAndPrint Finishes " + Time.time);
	}
	function WaitAndPrint (waitTime : float) {
		// suspend execution for waitTime seconds
		yield WaitForSeconds (waitTime);
		//print ("WaitAndPrint "+ Time.time);
	}
		
	
		
		
		
		
	
	function LateUpdate() 
	{
		if(Input.GetButtonUp("StepLeft")) isLStillDown = false;
		if(Input.GetButtonUp("StepRight")) isRStillDown = false;
	}
	
	
	
	
	
	
	
	