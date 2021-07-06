//OAuth token
var OAuth = "";
$.ajax({
	url: "https://id.twitch.tv/oauth2/token",
	data: {
		client_id: "tqahdriub350ewyf86ip5p1h4hzx6g",
		client_secret: "z4jclk0cli8m3m9yjzb9aq8lch7toc",
		grant_type: "client_credentials"
	},
	type: "POST",
	async: false,
	success: function (e) {
		OAuth = e.access_token;
	}
});

//User OAuth
$.ajax({
	url: "https://id.twitch.tv/oauth2/authorize",
	data: {
		client_id: "tqahdriub350ewyf86ip5p1h4hzx6g",
		redirect_uri: "http://localhost",
		response_type: "token",
		scope: "channel:read:redemptions"
	},
	type: "POST",
	async: false,
	success: function (e) {
		OAuth = e.access_token;
	}
});




OAuth = "3159ix5d7vxfgddiq2m5jjiaa3lfqf";