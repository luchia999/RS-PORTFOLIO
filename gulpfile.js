import gulp, { parallel } from 'gulp';

import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

import rename from 'gulp-rename';
import { deleteAsync } from 'del';

import webpackStream from 'webpack-stream';
import htmlmin from 'gulp-htmlmin';
import svgSprite from 'gulp-svg-sprite';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

function styles() {
  return gulp.src('src/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 version']))
    .pipe(cleanCSS())
    .pipe(htmlmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src(['src/*.html'])
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src('src/app.js')
    .pipe(webpackStream({
        mode: 'production',
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-env', { targets: 'defaults' }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function svg() {
  return gulp.src('src/assets/images/icons/*.svg')
    .pipe(svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite.svg',
          },
        },
      }))
    .pipe(gulp.dest('src/assets/images'));
}

function server() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
}

function copy() {
  return gulp.src(['src/assets/fonts/*', 'src/assets/images/!(icons)/**/*'], { base: 'src' })
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({
        once: true,
      }))
}

function clean() {
  return deleteAsync(['dist/**']);
}

function watch() {
  gulp.watch(['src/assets/fonts/*', 'src/assets/images/**/*', '!src/assets/images/!(icons)/*' ], copy);
  gulp.watch(['src/assets/images/icons/*'], svg);
  gulp.watch(['src/app.js'], scripts);
  gulp.watch(['src/style.scss', 'src/scss/*'], styles);
  gulp.watch(['src/*.html'], html);
}

export { svg }

export default gulp.series(clean, gulp.parallel(copy, html, styles, scripts),
  gulp.parallel(server, watch)
);

export let build = gulp.series(clean, html, copy, styles, scripts);



//npm init
//npm i -D gulp
//npm install sass gulp-sass --save-dev
//gulp styles
//npm install --save-dev gulp-autoprefixer
//npm install gulp-clean-css --save-dev
//gulp styles
//npm i -D gulp-rename
//gulp styles
// npm install del -D
//gulp clean
//gulp cony
//npm install --save-dev gulp-svg-sprite
//gulp svg
//gulp
//npm install --save-dev webpack-stream
//npm i babel-loader @babel/preset-env -D
//gulp scripts
//npm i browser-sync -D
//gulp
//gulp build
//npm i gulp-htmlmin -D
//gulp html
//gulp

