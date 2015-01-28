#pragma strict

var bubble : AudioClip;
var geyserShoot : AudioClip;
var isShooting = false;

function Start () {

}

function Update () {
	
	//while(isShooting == false)
	
		
}

function OnTriggerEnter(other : Collider)
{
	
	if (other.gameObject.tag == "Player")
	{
		if(Input.GetKey("w"))
		{
			isShooting = true;
			audio.PlayOneShot(geyserShoot, 1.0F);
		}
		isShooting = false;
	}

}
function OnTriggerStay(other : Collider)
{
	if (other.gameObject.tag == "Player")
	{
		if(Input.GetKey("w"))
		{
			isShooting = true;
			audio.PlayOneShot(geyserShoot, 1.0F);
		}
		isShooting = false;
	}
	
}
