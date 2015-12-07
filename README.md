## Website Performance Optimization portfolio project

### Requirements

1. Install Node.js: http://nodejs.org
2. Install depencencies through npm. Inside the project folder type 'npm install'
3. Gulp ha been used for optimization. A PageSpeed Insight task is included for quick psi testing.
4. For psi testing through gulp, just type 'gulp psi'. Gulp will build the production version of the
Website and then rate it through PageSpeed Insight.
5. If testing must be done manually, the 'ngrok-url' gulp task can be used. By typing
'gulp ngrok' the website will be built and a tunnel will automatically be opened by ngrok.

### Optimizations
#### index.html
To improve the psi score, I've implemented gulp, to automatically optimize images,
minimize js and css and inline essential css.

### pizza.html
To keep the framerate during scrolling at 60fps, if modified the updatePositions
method, to cache all possible values and to use transform property, which does not
trigger layout nor paint.
