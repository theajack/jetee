const gulp = require('gulp');
const fs = require('fs');
const toc = require('gulp-markdown-toc');
let version = require('../package.json').version;
let files = [
    '../npm/jui/package.json',
    '../npm/lang/package.json',
    '../npm/less/package.json',
    '../npm/router/package.json',
    '../npm/stat/package.json',
    '../npm/valid/package.json',
];

function modVersion () {
    files.forEach(file => {
        let pkg = require(file);
        pkg.version = version;
        fs.writeFile(file.substr(1), JSON.stringify(pkg, null, 4), 'utf8', (err) => {
            if (err) throw err;
        });
    });
}

function task () {
    modVersion();
    copyToNPM();
}

function copyToNPM () {
    gulp.src('helper/README.md')
        .pipe(toc())
        .pipe(gulp.dest('.'))
        .pipe(gulp.dest('npm/jetee'))
        .pipe(gulp.dest('npm/jui'))
        .pipe(gulp.dest('npm/lang'))
        .pipe(gulp.dest('npm/less'))
        .pipe(gulp.dest('npm/router'))
        .pipe(gulp.dest('npm/stat'))
        .pipe(gulp.dest('npm/valid'));

    gulp.src(['src/jetee/*.d.ts'])
        .pipe(gulp.dest('npm/jetee'));

    gulp.src(['src/plugin/jui/*.d.ts'])
        .pipe(gulp.dest('npm/jui'));

    gulp.src(['src/plugin/poly/*.d.ts'])
        .pipe(gulp.dest('npm/poly'));

    gulp.src(['src/plugin/lang/*.d.ts'])
        .pipe(gulp.dest('npm/lang'));

    gulp.src(['src/plugin/less/*.d.ts'])
        .pipe(gulp.dest('npm/less'));

    gulp.src(['src/plugin/router/*.d.ts'])
        .pipe(gulp.dest('npm/router'));

    gulp.src(['src/plugin/stat/*.d.ts'])
        .pipe(gulp.dest('npm/stat'));
        
    gulp.src(['src/plugin/valid/*.d.ts'])
        .pipe(gulp.dest('npm/valid'));

}

task();