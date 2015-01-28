#pragma strict



public var player : Camera;
public var roar : AudioClip;
public var alerted : AudioClip;
public var previousPress: String = "";
public var currentPress: String = "";
public var heTripped;
var tripTimer : float = .4;
var deltatimer : float;

function Start () 
{
	previousPress = "";
	heTripped = false;
	//var player : GameObject;
	//var objaScript : WalkScript = player.GetComponent(typeof(WalkScript)) as WalkScript;	
	// This will return the game object named Hand in the scene.
	//other = player.GetComponent("WalkScript");
	//heTripped = objaScript.tripped;
}

// Update is called once per frame
function Update ()
{
	//print(heTripped);

	if (Input.GetButtonDown("StepLeft")) 
	{
			
		currentPress = "left";
			
		//did they stop moving counter
		deltatimer = 0;
		didHeTrip();
			
			if (heTripped == false)
			{
				
				previousPress = currentPress;
			}
			else
			{
				heardTrip();
				heTripped= false;
				previousPress = "";
			}
			

	}
	else if (Input.GetButtonDown("StepRight") ) 
	{
		
		deltatimer = 0;
		currentPress = "right";
		
		didHeTrip();
			
		if (heTripped == false)
		{
				
			previousPress = currentPress;
		}
		else
		{
			heardTrip();
			heTripped= false;
			previousPress = "";
		}
			
	}
	else
	{
		deltatimer += Time.deltaTime;
		if(deltatimer >= tripTimer)
		{
			previousPress = "";
		}
	}
			
	//print(heTripped);
	//heardTrip();
	
}



// If you run into the Lion
function OnTriggerEnter (theCollider : Collider)
{
	if(theCollider.tag == "Player")
	{
		audio.PlayOneShot (roar, 1F);
		audio.loop = false;

		eaten();
	}
		
		
}


// Endgame by being eaten
function eaten()	
{	
	// - After 0 seconds, prints "Starting 0.0"
	// - After 0 seconds, prints "Before WaitAndPrint Finishes 0.0"
	// - After 2 seconds, prints "WaitAndPrint 2.0"
	print ("Starting " + Time.time);
	// Start function WaitAndPrint as a coroutine. And continue execution while it is running
	
	// this is the same as WaitAndPrint(2.0) as the compiler does it for you automatically
	StartCoroutine(WaitAndPrint(2.0)); 
}
function WaitAndPrint (waitTime : float) {
	// suspend execution for waitTime seconds
	yield WaitForSeconds (waitTime);
	Application.LoadLevel (Application.loadedLevelName);
}
function heardTrip()
{
	audio.PlayOneShot (alerted, 1F);

	transform.position = Vector3.MoveTowards(transform.position, player.transform.position, 1);
}

function didHeTrip()
{
	if(previousPress == currentPress && previousPress != "")
	{
		heTripped = true;
		//Debug.log("tripping");
	}
}
	
	
	
	
	
	
	
	
	
	
	