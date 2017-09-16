var gulp 		 	= require('gulp'),	
	lost			= require('lost'),
 	gutil 		 	= require('gulp-util'),
	postcss 	 	= require('gulp-postcss'),
	rucksack		= require('rucksack-css'),
	fontMagician	= require('postcss-font-magician'),
	sourcemaps	 	= require('gulp-sourcemaps');

var paths = {
	cssSource: './app/assets/styles/main.css',
	cssDest: './app/temp/styles'
}

// config for urlrewrite
var config = {
    imports: true,
    properties: [ 'background', 'content' ],
    rules: [
        { from: '../../images/', to: '../../assets/images/' }
    ]
};

gulp.task('styles', function(){

	return gulp.src(paths.cssSource)
		.pipe( sourcemaps.init())
		.pipe(postcss([
			require('postcss-partial-import')({prefix: '_', extension: '.css'}),
				require('postcss-assets')({ basePath: `app`, loadPaths: ['assets/images']}), // assets url handling
					require("postcss-url")(),
						fontMagician(),	// https://github.com/jonathantneal/postcss-font-magician	 		
							require("postcss-cssnext")(),
								rucksack(), // http://simplaio.github.io/rucksack/docs/#
									require('postcss-nesting'),
										lost(), // lost must be after nesting, so that media queries can work with it http://lostgrid.org/lostgrid-example.html
											require("postcss-reporter")(),
			]))
		.on('error', gutil.log, function(err){
			this.emit('end');
		})
  		.pipe(sourcemaps.write('./'))
  		.pipe(gulp.dest(paths.cssDest));
});		
