/* GLOBAL VARIABLES */
var activateID = "886bd9e5-17dc-4c46-921d-0d63a1656940";
var deactivateID = "ffb71cc6-a1e6-412c-9827-a5e2b7568ad4";
var iguanaStatus = true;
var isRunning = false;

var broadcaster = "83513015";

function cURLrequest(destination, token, curlData={}, action="GET"){
	$.ajax({
		url: destination,
		type: action,
		data: curlData,
		async: false,
		headers: {
			"client-id":"tqahdriub350ewyf86ip5p1h4hzx6g", 
			"Authorization":"Bearer " + String(token)
		},
		success: function (e) {
			//$("#data").text(iguanaStatus + JSON.stringify(e.data, null, 4));
			response = e.data;
		},
		error: function(e) {
			//response = JSON.stringify(e.responseText);
			$("#error").text(JSON.stringify(e.responseText));
		}
	});

	return response;
}


function checkIguana(){
	//runTime++;
	//$("#timer").text("Running Time: " + String(runTime));
	
	//var curlUrl = "https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions?broadcaster_id=83513015&reward_id=886bd9e5-17dc-4c46-921d-0d63a1656940&status=UNFULFILLED";

	curlData = {
		broadcaster_id: broadcaster,
		reward_id: (iguanaStatus ? deactivateID : activateID),
		status: "UNFULFILLED",
	};
	var requests = cURLrequest("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions", userOAuth, curlData, "GET");






	if(requests[0]){
		if(requests[0].reward.title == "Activate Iguana" && !iguanaStatus){
			iguanaStatus = true;
			$("#activate")[0].play();
			setTimeout(function() {
				$("#iguanaImage").fadeIn(1000);
			}, 2000);
			//Set to redeemed
		}
		else if(requests[0].reward.title == "Deactivate Iguana" && iguanaStatus){
			iguanaStatus = false;
			$("#deactivate")[0].play();
			setTimeout(function() {
				$("#iguanaImage").fadeOut(1000);
			}, 2000);
		}


		curlData["status"] = "FULFILLED";
		curlData["id"] = requests[0].id;
		//Set to redeemed
		cURLrequest("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions", userOAuth, curlData, "PATCH");
	}

}


function checkRedeems(){
	curlData = {
		broadcaster_id: broadcaster,
		reward_id: (iguanaStatus ? deactivateID : activateID),
		status: "UNFULFILLED",
	};
	var requests = cURLrequest("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions", userOAuth, curlData, "GET");

	return requests[0];
}



function toggleIguana(redeem){
	//Set isRunning for 5 seconds while function runs, to avoid it running twice
	isRunning = true; 
	setTimeout(function() {isRunning = false;}, 5000);

	if(redeem.reward.title == "Activate Iguana"/* && !iguanaStatus*/){
		//iguanaStatus = true;
		$("#activate")[0].play();
		setTimeout(function() {
			$("#iguanaImage").fadeIn(1500);
		}, 2500);
		//Set to redeemed
	}
	else if(redeem.reward.title == "Deactivate Iguana"/* && iguanaStatus*/){
		//iguanaStatus = false;
		$("#deactivate")[0].play();
		setTimeout(function() {
			$("#iguanaImage").fadeOut(1500);
		}, 2500);
	}
	
	
	curlData = {
		broadcaster_id: broadcaster,
		reward_id: (iguanaStatus ? deactivateID : activateID),
		status: "FULFILLED",
		id: redeem.id
	};
	
	//Set to redeemed
	cURLrequest("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions", userOAuth, curlData, "PATCH");
	iguanaStatus = !iguanaStatus;
}






function mainLoop(){
	//while(true){
		//if there's a redeem, then toggle iguana
		if(!isRunning){
			if(nextUpdate = checkRedeems()){
				toggleIguana(nextUpdate);
			}
		}
	//}
}



