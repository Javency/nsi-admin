var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'), //sass编译
    uglify= require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //文件重命名
    imagemin = require('gulp-imagemin'), //图片压缩
    cache = require('gulp-cache'), //缓存

    browserSync = require("browser-sync"), //浏览器自动刷新
    autoprefix = require('gulp-autoprefixer'),   //自动浏览器添加前缀
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');   //替换路径名字

// 静态资源路径，根据各自项目实际情况调整

var devRoot = 'dev/',
    distRoot = 'dist/';

var devPath = {
    css : devRoot + 'scss/',
    js : devRoot + 'js/',
    images : devRoot + 'images/',
    pic : devRoot + 'pic/'
};

var distPath = {
    css : distRoot + 'css/',
    js : distRoot + 'js/',
    images : distRoot + 'images/',
    pic : distRoot + 'pic/'
};


// sass生成压缩
gulp.task('sass', function () {
    sass(devPath.css + '**/*.scss', {
            require:'octopusUI',
            style:'compressed'
        })
    .pipe(autoprefix())
    .pipe(gulp.dest(distPath.css))
    .pipe(rev())       //给文件添加hash编码
    .pipe(gulp.dest(distPath.css))
    .pipe(rev.manifest())     //生成rev-mainfest.json文件作为记录
    .pipe(gulp.dest("dist/rev/css"))    //生成rev-mainfest.json文件的存放路径
    .pipe(browserSync.reload({stream:true}))
});

// sass生成未压缩
gulp.task('cssfull', function () {
    sass(devPath.css + '**/*.scss', {
            require:'octopusUI',
            style:'compact'
        })
    .pipe(rename({suffix:'.full'}))
    .pipe(gulp.dest(distPath.css));
});

// js压缩
gulp.task('jsmin', function () {
    gulp.src(devPath.js+'**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(distPath.js))
    .pipe(rev())
    .pipe(gulp.dest(distPath.js))
    .pipe(rev.manifest())
    .pipe(gulp.dest("dist/rev/js"))   //生成rev-mainfest.json文件的存放路径
});


// 样式图片压缩
gulp.task('imagemin', function () {
    gulp.src(devPath.images + '/**/*')
        .pipe(cache(imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(distPath.images));
});

// 数据图片压缩
gulp.task('picmin', function () {
    gulp.src(devPath.pic + '/**/*')
        .pipe(cache(imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(distPath.pic));
});

//路径名的替换
gulp.task("rev",function(){
        gulp.src(["dist/**/*.json","dist/**/*.html"])
        .pipe(revCollector())
        .pipe(gulp.dest("dist"))
});

// 实时监听
gulp.task('watch', ['sass','jsmin','imagemin','picmin','rev'],function () {
    // browserSync({
    //     server:{
    //         baseDir: 'dist/'
    //     },
    //     port:80
    // });
    gulp.watch(devPath.css + '**/*.scss', ['sass']);
    gulp.watch(devPath.js + '**/*.js', ['jsmin']);
    gulp.watch(devPath.images + '**/*', ['imagemin']);
    gulp.watch(devPath.pic + '**/*', ['picmin']);
});

// gulp任务
gulp.task('default',['watch']);