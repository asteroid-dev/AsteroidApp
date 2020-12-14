const j = global.jQuery || (global.jQuery = require("jquery-easing")), {
	remote: e,
	ipcRenderer: t
} = require("electron");

const p = require("../../package");

let s = null;
const n = [];

var url = process.env.URL;

function switchTab(e, t) {
	if (e === s) return;
	null !== s && (n[s].style.visibility = "hidden"), n[e].style.visibility = "visible", n[e].style.position = "absolute", n[e].style.width = "100%", n[e].style.bottom = "0";
	const i = document.getElementsByClassName("me__tab");
	for (let n = 0; n < i.length; n++) i[n].getAttribute("tab") === e && (i[n].classList.add("me__tab--active"), t && changeHeaderStyle(e, i)), i[n].getAttribute("tab") === s && i[n].classList.remove("me__tab--active");
	s = e
}

function changeHeaderStyle(e) {
	const t = document.getElementById("header"),
		s = document.getElementById("fullScreen"),
		i = document.getElementById("fullScreenIcon"),
		a = document.getElementById("index-btn"),
		l = document.getElementById("hotel-btn");
	"hotel" === e && (t.classList.add("me__header--app"), s.style.cssFloat = "none", s.style.borderTopLeftRadius = "0px", s.style.borderBottomLeftRadius = "0px", n[e].style.top = "0px", a.classList.add("notransition"), a.classList.add("me__tab--app"), a.offsetHeight, a.classList.remove("notransition"), l.style.display = "none", i.style.fontSize = "20px", i.style.transform = "rotate(45deg)", i.classList.remove("fa-expand-arrows-alt"), i.classList.add("fa-arrows-alt-v")), "index" === e && (t.classList.remove("me__header--app"), s.style.cssFloat = "right", s.style.borderTopLeftRadius = "5px", s.style.borderBottomLeftRadius = "5px", n[e].style.top = "55px", a.classList.add("notransition"), a.classList.remove("me__tab--app"), a.offsetHeight, a.classList.remove("notransition"), l.style.display = "inline-block", i.style.fontSize = "inherit", i.style.transform = "rotate(0)", i.classList.add("fa-expand-arrows-alt"), i.classList.remove("fa-arrows-alt-v"))
}

function logout() {
	const i = document.getElementsByClassName("logout__process")[0];
	n[s].style.visibility = "hidden", i.style.display = "block", setTimeout(() => {
		t.send("logout"), e.getCurrentWindow().close()
	}, 2e3)
}

function fullScreen() {
	t.send("fullScreen")
}

async function reload(e, o) {
	const i = document.getElementById("overlay");
	document.getElementById("meReloadIcon").classList.add("fa-spin");
	setTimeout(() => {
		document.getElementById("meReloadIcon").classList.remove("fa-spin")
	}, 1800);
	e && n[s].reload(), t.once("logged-in", (e, s) => {
		s && (i.style.display = "none", t.send("setMovable", {
			browserWindow: "home",
			movable: !0
		}), "index" === s && n[s].reload(), "hotel" === s && (n.index.reload(), n.hotel.reload()))
	});
}

async function createTab(e, t, s, i, a = null) {
	return new Promise((l, o) => {
		if (e in n) l();
		else {
			const o = document.getElementById("wrapper"),
				r = document.createElement("webview");
			r.src = t, r.style.display = "none", r.setAttribute("plugins", ""), r.setAttribute("id", e), r.setAttribute("class", "me__webview"), null !== a && r.setAttribute("preload", a), o.appendChild(r), n[e] = r, r.addEventListener("will-navigate", e => {
				switch (e.url) {
					case url + '/logout':
						logout();
						break;
				}
			});

			r.addEventListener('did-stop-loading', () => {
				r.blur();
				r.focus();
			});

			r.addEventListener('new-window', async (e) => {
				if (e.url.includes("/hotel")) {
					createTab("hotel", url + "/hotel", "Hotel", "hotel.gif").then(() => switchTab("hotel", !0));
				}
			});

			r.addEventListener('did-navigate', async (e) => {
				if (e.url === url + "/") {
					const i = document.getElementsByClassName("me__tab");
					if (i["hotel-btn"]) {
						i["hotel-btn"].style.visibility = "hidden";
					}
				}
			});

			const d = document.getElementById("navigation"),
				c = document.createElement("li"),
				u = document.createElement("img");
			u.src = `../resources/img/${i}`, u.style.verticalAlign = "-5.5px", u.style.marginRight = "4px", u.setAttribute("draggable", "false");
			const m = document.createElement("span");
			m.innerHTML = s, c.appendChild(u), c.appendChild(m), c.setAttribute("tab", e), c.setAttribute("id", e + "-btn"), c.classList.add("me__tab"), d.appendChild(c), c.addEventListener("click", () => {
				switchTab(c.getAttribute("tab"), !0)
			}), l()
		}
	})
}
async function init() {
	await createTab("index", url, "Home", "home.gif"), setTimeout(() => switchTab("index", !1), 500)
}
init().then(() => console.debug("Launcher home initialized")), document.getElementById("fullScreen").addEventListener("click", fullScreen), document.getElementById("reload").addEventListener("click", () => {
	reload(!0)
}), t.on("reloadSession", () => {
	reload(!1, !0)
});