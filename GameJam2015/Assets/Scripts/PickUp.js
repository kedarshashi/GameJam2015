#pragma strict

public var food : GameObject;
public var amountFood : int;
public var swoosh : AudioClip;

function Start () 
{
	amountFood = 0;
}

function Update () 
{

}

function OnTriggerEnter(other : Collider)
{
	if (other.gameObject.tag == "Food") 
		{
			other.gameObject.SetActive(false);
			amountFood = amountFood + 1;
			//setCountText();
		}
	if (other.gameObject.tag == "Geyser")
	{
		if(Input.GetKey("w"))
		{
			sendFood();
		}
	}
	
	if (other.gameObject.tag == "Mouse")
	{
		other.gameObject.audio.loop = true;
		other.gameObject.audio.playOnAwake = true;
	}
}
function OnTriggerStay(other : Collider)
{
	if (other.gameObject.tag == "Food") 
		{
			other.gameObject.SetActive(false);
			amountFood = amountFood + 1;
			//setCountText();
		}
	if (other.gameObject.tag == "Geyser")
	{
		if(Input.GetKey("w"))
		{
			sendFood();
		}
	}
	
}

//Attempt to send food up a geyser
function sendFood()
{
	if(amountFood >= 1)
	{
		amountFood = amountFood - 1;
		audio.PlayOneShot(swoosh,1F);
	}
	else
	{
		
		//Say "Oh no, I'm out of Food"
	}
}
