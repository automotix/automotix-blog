var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    gutil        = require('gulp-util'),
    sourcemaps   = require('gulp-sourcemaps'),
    postcss      = require('gulp-postcss'),
    stylus       = require('gulp-stylus'),
    // nunjucks     = require('gulp-nunjucks-render'),
    autoprefixer = require('autoprefixer'),
    poststylus   = require('poststylus'),
    axis         = require('axis'),
    rupture      = require('rupture'),
    lost         = require('lost'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

// File path variables

var basePaths = {
    src: './',
    dest: './'
};
var paths = {
    html: {
        src: basePaths.src + 'templates/**/*.twig',
        dest: basePaths.dest + 'templates/**/*.twig'
    },
    images: {
        src: basePaths.src + 'images/**/*.{jpg,gif,png}',
        dest: basePaths.dest + 'images/'
    },
    scripts: {
        src: basePaths.src + 'static/**/*.js',
        dest: basePaths.dest + 'static/**/*.js'
    },
    styles: {
        src: basePaths.src + '',
        dest: basePaths.dest + ''
    },
    stylus: {
      src: basePaths.src + 'styles/**/*.styl',
      dest: basePaths.dest + 'styles/**/main.styl'
    }
};

// Tasks

gulp.task('browserSync', function() {
  browserSync({
      proxy: {
        // Enter your dev environment proxy
        // target: "localhost:8888/masamune/public"
        target: "localhost:8888/automotix-blog"
      }
    });
  });

gulp.task('watch', function() {
  gulp.watch(paths.stylus.src, ['css']).on('change', reload);
  gulp.watch(paths.html.src, ['html']).on('change', reload);
  gulp.watch(paths.scripts.src, ['js']).on('change', reload);
  gulp.watch(paths.images.src, ['img']).on('change', reload);
});

gulp.task('html', function() {
  return gulp.src(paths.html.src)
    // .pipe(nunjucks({
    //   path: ['app/views/layouts','app/views/includes']
    // }))
    // .pipe(gulp.dest(paths.html.dest))
});

gulp.task('css', function() {
  gulp.src(paths.stylus.dest)
    .pipe(plumber({errorHandler: function (err) { gutil.beep(); console.log(err);}}))
    .pipe(stylus({
      use: [
        poststylus([
          'autoprefixer',
          'lost'
        ]),
        axis(),
        rupture()
      ]
    }))
    // Compile everything into one file, main.css
    .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('js', function() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
});

gulp.task('img', function() {
  return gulp.src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
});

gulp.task('default', ['browserSync','watch']);
