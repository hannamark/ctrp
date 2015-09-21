/**
 * Created by singhs10 on 9/15/15.
 */
var gulp = require('gulp');
var reporter = require('gulp-protractor-cucumber-html-report');
gulp.task('default', function() {
    // place code for your default task here
  //
});
gulp.task('protractor-cucumber-html-report', function(){
    gulp.src('./cucumber-test-results.json')
        .pipe(protractorReport({
            dest: 'reports/'
        }));
});