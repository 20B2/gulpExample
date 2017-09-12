const gulp = require('gulp')
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

gulp.task('css', function(){
    // var target = gulp.src('./src/index.html');

    var sources = gulp.src('./src/css/*.css');

    sources.pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/src/cs'));

})

gulp.task('js', function(){
    var sources = gulp.src('./src/js/*.js');

    sources.pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/src/js'))
})

gulp.task('inject', function(){
    var target = gulp.src('./src/index.html');
    
    var sources = gulp.src(['./src/css/*.css', './src/js/*.js'], {read:false});
    
    target.pipe(inject(sources))
        .pipe(gulp.dest('./dist/src'));
})

// gulp.task('html', function(){
//     var sources = gulp.src('./src/*.html');

//     sources.pipe(gulp.dest('./dist/src'));
// })


gulp.task('default', ['css', 'js', 'inject']);

gulp.task('watch', function(){
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/css/*.cs', ['css']);
    // gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/index.html', ['inject']);
})