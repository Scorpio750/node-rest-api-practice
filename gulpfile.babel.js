import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import rename from 'gulp-rename'
import nodemon from 'gulp-nodemon'

const config = {
    sassPath: './app/scss/style.scss'
}

gulp.task('sass', () => {
    return gulp.src(config.sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public'));
});

gulp.task('babelify', () => {
    return gulp.src('./server.js')
        .pipe(babel({
            presets: 'es2015'
        }))
        .pipe(rename('server.babel.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('serve', ['sass', 'babelify'], () => {
    nodemon({
        script: 'server.babel.js',
        ext: 'js html'
    })
		.on('restart', () => {
			console.log('restarted!');
		})
		.on('crash', () => {
			console.error('Application has crashed!\n');
		});
});

gulp.task('default', ['serve']);

gulp.watch(config.sassPath, ['sass']);
gulp.watch('./server.js', ['serve']);
