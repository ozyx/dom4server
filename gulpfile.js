const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const tsProject = ts.createProject("tsconfig.json");

// clean the contents of the distribution directory
gulp.task("clean", function () {
  return del("dist/**/*");
});

gulp.task("compile", ["clean"], function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("default", ["compile"]);