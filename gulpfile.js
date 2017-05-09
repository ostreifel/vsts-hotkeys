const path = require("path");
const gulp = require('gulp');
const webpack = require('gulp-webpack');
const ts = require("gulp-typescript");
const clean = require("gulp-clean");
const yargs = require("yargs");
const exec = require('child_process').exec;
const rename = require('gulp-rename');

const args =  yargs.argv;

const jsFolder = 'js';
const contentFolder = 'dist';

const tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});
gulp.task('clean', () => {
    return gulp.src([contentFolder, jsFolder])
        .pipe(clean());
})
gulp.task('build', ['clean'], () => {
    const tsResult = gulp.src(['scripts/**/*.tsx', 'scripts/**/*.ts'])
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest(jsFolder));
});

gulp.task('webpack', ['build'], () => {
    return webpack(require('./webpack.config.js'))
        .pipe(gulp.dest(`${contentFolder}`));
});

gulp.task('default', ['webpack']);
