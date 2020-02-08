const winston = require("winston");
const LEVEL = Symbol.for("level");

module.exports = namespaces => {
	const makeLogger = new MakeLogger(namespaces);

	return makeLogger.createLogger();
};

class MakeLogger {
	constructor(namespaces) {
		this.namespaces = namespaces;
		let [names, skips] = _parse(_getDEBUG());
		this.names = names;
		this.skips = skips;
	}

	createLogger() {
		const colorizer = winston.format.colorize();

		if (this.enable(this.namespaces)) {
			return winston.createLogger({
				level: "info",

				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.simple(),
					winston.format.printf(msg =>
						colorizer.colorize(
							msg.level,
							`${msg.timestamp} - ${msg.level}: ${msg.message}`
						)
					)
				),
				transports: [
					// new winston.transports.Console({
					// 	format: filterOnly('info'),
                    // }),
                    new winston.transports.Console({
						level: 'warn'
					})
					// new winston.transports.File({ filename: 'combined.log', level: 'debug' })
				]
			});
		} else {
			return winston.createLogger({
				silent: true
			});
		}
	}

	enable(namespaces) {
		if (namespaces[namespaces.length - 1] === "*") return true;

		for (let i = 0; i < this.skips.length; i++) {
			if (this.skips[i].test(namespaces)) return false;
		}

		for (let i = 0; i < this.names.length; i++) {
			if (this.names[i].test(namespaces)) return true;
		}

		return false;
	}
}

const _parse = namespaces => {
	names = [];
	skips = [];
	let split = (typeof namespaces === "string" ? namespaces : "").split(
		/[\s,]+/
	);

	for (let i = 0; i < split.length; i++) {
		if (!split[i]) continue;

		namespaces = split[i].replace(/\*/g, ".*?");

		if (namespaces[0] === "-") {
			skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
		} else {
			names.push(new RegExp("^" + namespaces + "$"));
		}
	}

	return [names, skips];
};

const _getDEBUG = () => {
	let valueFromDEBUG = "";

	if (typeof process !== "undefined" && "env" in process && process.env.DEBUG)
		valueFromDEBUG = process.env.DEBUG;

	return valueFromDEBUG;
};

const filterOnly = level => {
	return winston.format(info => {
		if (info[LEVEL] === level) {
			return info;
		}
	})();
}
