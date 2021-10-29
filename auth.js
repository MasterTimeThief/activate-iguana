//OAuth token
var appOAuth = "";
var userOAuth = "";

//OAuth client credentials
$.ajax({
	url: "https://id.twitch.tv/oauth2/token",
	data: {
		client_id: "tqahdriub350ewyf86ip5p1h4hzx6g",
		client_secret: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
		grant_type: "client_credentials"
	},
	type: "POST",
	async: false,
	success: function (e) {
		appOAuth = e.access_token;
	}
});

//User OAuth (OAuth implicit code)
$.ajax({
	url: "https://id.twitch.tv/oauth2/authorize",
	data: {
		client_id: "tqahdriub350ewyf86ip5p1h4hzx6g",
		redirect_uri: "http://localhost",
		response_type: "token",
		scope: "channel:manage:redemptions"
	},
	type: "GET",
	async: false,
	success: function (e) {
		console.log(e);
		userOAuth = e.access_token;
	},
	error: function(e) {
		//response = JSON.stringify(e.responseText);
		console.log(JSON.stringify(e.responseText));
	}
});




//userOAuth = "3159ix5d7vxfgddiq2m5jjiaa3lfqf";