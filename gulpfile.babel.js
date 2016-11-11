require(`events`).EventEmitter.prototype._maxListeners = 100;
`use strict`;

import gulpConfig from './gulp.config';
import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import scss from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import htmlImport from 'gulp-html-import'
import htmlMin from 'gulp-htmlmin';
import sourceMaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import imageMin from 'gulp-imagemin';

gulp.task(`img`, () => {
	return gulp.src(gulpConfig.src.img)
		.pipe(imageMin())
		.pipe(gulp.dest(gulpConfig.dest.img))
});

gulp.task(`html`, () => {
	return gulp.src(gulpConfig.src.html)
		.pipe(htmlImport(gulpConfig.htmlImport))
		.pipe(htmlMin(gulpConfig.htmlMin))
		.pipe(gulp.dest(gulpConfig.dest.html))
		.pipe(browserSync.reload(gulpConfig.browserSyncStream));
});

gulp.task(`scss`, () => {
	return gulp.src(gulpConfig.src.scss)
		.pipe(sourceMaps.init())
		.pipe(scss({
			outputStyle: `compressed`
		}).on(`error`, scss.logError))
		.pipe(autoPrefixer(gulpConfig.autoPrefixer))
		.pipe(sourceMaps.write(gulpConfig.mapsDest))
		.pipe(gulp.dest(gulpConfig.dest.scss))
		.pipe(browserSync.reload(gulpConfig.browserSyncStream));
});

gulp.task(`js`, () => {
	return browserify(gulpConfig.src.js, gulpConfig.browserify)
		.transform(babelify, gulpConfig.babelify)
		.transform(`uglifyify`, gulpConfig.uglifyify)
		.bundle()
		.pipe(source(gulpConfig.dest.nameJsBuildFile))
		.pipe(gulp.dest(gulpConfig.dest.js))
		.pipe(browserSync.reload(gulpConfig.browserSyncStream));
});

gulp.task(`watch`, [`html`, `scss`, `js`], () => {
	browserSync(gulpConfig.browserSyncConfig);
	gulp.watch(gulpConfig.watch.html, [`html`]);
	gulp.watch(gulpConfig.watch.scss, [`scss`]);
	gulp.watch(gulpConfig.watch.js, [`js`]);
});

gulp.task(`default`, [`img`, `watch`]);