function cURLrequest(destination, action="GET", token, curlData={}){
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
			//alert(JSON.stringify(e.responseText));
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
		broadcaster_id: "83513015",
		reward_id: (iguanaStatus === "ACTIVATED" ? deactivateID : activateID),
		status: "UNFULFILLED",
	};
	var requests = cURLrequest("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions", "GET", OAuth, curlData);






	if(requests[0]){
		if(requests[0].reward.title == "Activate Iguana" && iguanaStatus == "DEACTIVATED"){
			iguanaStatus = "ACTIVATED";
			$("#activate")[0].play();
			setTimeout(function() {
				$("#iguanaImage").fadeIn(1000);
			}, 2000);
			//Set to redeemed
		}
		else if(requests[0].reward.title == "Deactivate Iguana" && iguanaStatus == "ACTIVATED"){
			iguanaStatus = "DEACTIVATED";
			$("#deactivate")[0].play();
			setTimeout(function() {
				$("#iguanaImage").fadeOut(1000);
			}, 2000);
		}


		curlData["status"] = "FULFILLED";
		curlData["id"] = requests[0].id;
		//Set to redeemed
		cURLrequest("https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions", "PATCH", OAuth, curlData);
	}

	setTimeout(function() {}, 1000);
}