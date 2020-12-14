const {
	app: e,
	ipcMain: n,
	session: r,
	Menu: t
} = require("electron"), s = require("path"), i = require("./Windows").getInstance(), o = require("./Window"), c = require("os"), l = require("../package"), p = require("./Menu");

e.setAppUserModelId("nl.habbo.AsteroidApp");

class u {
	static getInstance() {
		return u._instance || (u._instance = new u), u._instance
	}
	async init() {
		this._running || (this._running = !0, e.on("ready", () => this._ready()), n.on("renderHome", () => this.renderHome()), n.on("logout", () => this.renderHome()), n.on("fullScreen", (e, n) => i.get("home").toggleFullScreen()))
	}
	async _ready() {
		r.defaultSession.webRequest.onBeforeSendHeaders({
			urls: ["https://*." + process.env.SHORT_URL + "/*", "http://*." + process.env.SHORT_URL + "/*"]
		}, (e, n) => {
			e.requestHeaders["X-APP"] = this.getOsType(), n({
				cancel: !1,
				requestHeaders: e.requestHeaders
			}),
			e.requestHeaders["X-VERSION"] = l.version
		}), "darwin" === c.platform().toLowerCase() && t.setApplicationMenu(p);

		this.renderHome();
	}
	quit() {
		a.disconnect(), e.quit()
	}
	getOsType() {
		return "win32" === c.platform().toLowerCase() ? "windows" : "darwin" === c.platform().toLowerCase() ? "apple" : c.platform().toLowerCase()
	}
	loadFlash() {
		let n, r;
		switch (process.platform) {
			case "darwin":
				n = s.join(__dirname.includes(".asar") ? process.resourcesPath : __dirname, "../plugins/flash/osx/PepperFlashPlayer.plugin"), r = l.flash_version
				break;

			default:
				if (process.arch === 'x64' || process.arch === 'arm64')
					n = s.join(__dirname.includes(".asar") ? process.resourcesPath : __dirname, "../plugins/flash/win/x64/pepflashplayer.dll"), r = l.flash_version;
				else
					n = s.join(__dirname.includes(".asar") ? process.resourcesPath : __dirname, "../plugins/flash/win/x32/pepflashplayer.dll"), r = l.flash_version;
				break;
		}

		e.commandLine.appendSwitch("disable-renderer-backgrounding"), e.commandLine.appendSwitch("--enable-npapi"), e.commandLine.appendSwitch("--ppapi-flash-path", n), e.commandLine.appendSwitch("--ppapi-flash-version", r)
	}
	renderHome() {
		const e = new o(1200, 800, !0, !0, !1, "home");
		i.add("home", e)
	}
}
module.exports = u;