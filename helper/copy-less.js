const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.src(`src/plugins/less/index.js`)
    .pipe(rename(function (path) {
        path.basename = path.basename.replace('index.js', 'jetee.less.min.js');
        return path;
    }))
    .pipe(gulp.dest('npm/less'));
