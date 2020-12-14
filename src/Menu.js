const {
	Menu: e
} = require("electron"), u = [{
	label: "Quit Asteroid App",
	submenu: [{
		role: "quit"
	}]
}];
module.exports = e.buildFromTemplate(u);