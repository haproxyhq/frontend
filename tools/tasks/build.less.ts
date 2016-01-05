import {join}               from 'path';
import {APP_SRC, APP_DEST}  from '../config';

export = function buildLess(gulp, plugins, option) {
  return function () {
    return gulp.src(join(APP_SRC, '**/css', '*.less'))
      .pipe(plugins.less())
      .pipe(gulp.dest(APP_DEST));
  };
}
