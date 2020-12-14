class t {
	constructor() {
		this._windows = []
	}
	static getInstance() {
		return t._instance || (t._instance = new t), t._instance
	}
	add(t, n) {
		this._windows[t] = n
	}
	get(t) {
		return this._windows[t]
	}
	exist(t) {
		return t in this._windows
	}
}
module.exports = t;