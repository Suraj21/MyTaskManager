var gulp = require("gulp");

gulp.task("Copy-dist-to-wwwroot",() => {
  return gulp.src("./dist/TaskManager/**/*")
  .pipe(gulp.dest("D:\\Development\\Angular\\Angular_11_durgasoft\\18.12.+Update+Task+Status+Page\\18.12. Update Task Status Page\\MvcTaskManager\\MvcTaskManager\\wwwroot"));
});


gulp.task("default", () => {
  gulp.watch("./dist/TaskManager",gulp.series("Copy-dist-to-wwwroot"));
});
