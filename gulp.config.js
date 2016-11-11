const gulpConfig = {
	src: {
		img: `resources/img/*`,
		html: `resources/index.html`,
		scss: `resources/config/scss/main.scss`,
		js: `resources/config/js/main.js`
	},
	dest: {
		img: `build/img`,
		html: `./`,
		scss: `build/css`,
		nameJsBuildFile: `main.js`,
		js: `build/js`
	},
	watch: {
		html: `resources/**/*.html`,
		scss: `resources/**/*.scss`,
		js: [
			`resources/**/*.js`
		]
	},
	htmlImport: `resources/parts/`,
	htmlMin: {
		collapseWhitespace: true
	},
	autoPrefixer: {
		browsers: [
			`last 2 versions`
		],
		cascade: false
	},
	browserify: {
		debug: true
	},
	babelify: {
		compact: false,
		presets: [
			`es2015`,
			`react`
		],
		sourceMaps: false
	},
	uglifyify: {
		global: true
	},
	mapsDest: `../maps`,
	browserSyncConfig: {
		server: {
			baseDir: `./`
		},
		online: true
	},
	browserSyncStream: {
		stream: true
	}
};

export default gulpConfig;