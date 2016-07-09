### Angular2/Typescript - A concise introduction

This is a concise intoduction to buliding angular2 applications
using Typescript.

Before we start, verify that you are running at least node v4.x.x
and npm 3.x.x by running node -v and npm -v in a terminal/console window. 

Make a new directory for the project and project.json with the following
content. You might want to change the name attribute to match with your
project.

    {
      "name": "angular2-quickstart",
      "version": "1.0.0",
      "scripts": {
        "start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" ",
        "lite": "lite-server",
        "postinstall": "typings install",
        "tsc": "tsc",
        "tsc:w": "tsc -w",
        "typings": "typings"
      },
      "license": "ISC",
      "dependencies": {
        "@angular/common": "2.0.0-rc.4",
        "@angular/compiler": "2.0.0-rc.4",
        "@angular/core": "2.0.0-rc.4",
        "@angular/forms": "0.2.0",
        "@angular/http": "2.0.0-rc.4",
        "@angular/platform-browser": "2.0.0-rc.4",
        "@angular/platform-browser-dynamic": "2.0.0-rc.4",
        "@angular/router": "3.0.0-beta.1",
        "@angular/router-deprecated": "2.0.0-rc.2",
        "@angular/upgrade": "2.0.0-rc.4",
        "systemjs": "0.19.27",
        "core-js": "^2.4.0",
        "reflect-metadata": "^0.1.3",
        "rxjs": "5.0.0-beta.6",
        "zone.js": "^0.6.12",
        "angular2-in-memory-web-api": "0.0.14",
        "bootstrap": "^3.3.6"
      },
      "devDependencies": {
        "concurrently": "^2.0.0",
        "lite-server": "^2.2.0",
        "typescript": "^1.8.10",
        "typings":"^1.0.4"
      }
    }

If you look at the dependencies, you can see entries starting with @angular. Those are
angular2 packages. Instead of a single file like first version, angular2 is made up of
a bunch of separate packages. If you are wondering about the '@' at the start, it is just
part of the name, and does not hold a special meaning.

You can also see Typescript as one of the dependencies.

Before you run npm install, you have to add one more file, typings.json, with the
following content.

    {
      "globalDependencies": {
        "core-js": "registry:dt/core-js#0.0.0+20160602141332",
        "jasmine": "registry:dt/jasmine#2.2.0+20160621224255",
        "node": "registry:dt/node#6.0.0+20160621231320"
      }
    }

This file will be used by the postinstall command, <i>typings install</i>, to install type definitions
for core javascript functions and couple of other libs, which will be used by the
typescript compiler, to look up argument and function return types of core Javascript
functions.

Now you can run <i>npm install</i>, and it will hopefully, run to completion. 
When <i>npm install</i> finishes, the postinstall command should run automatically,
and should result in the creation of a <i>typings</i> folder. If this is directory
is missing, please try running the command <i>npm run typings install</i>.

Ok, now we have installed everything to start building angular apps. Let us start
by adding a configuration file for the typescript compiler. The <i>tsconfig</i> file.

    {
      "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
        "outDir": "dist/",
        "rootDir": "app/"
      }
    }

We only need to tweak with the last two entries. The <i>rootDir</i> and <i>outDir</i>.
The first one, <i>rootDir</i> tells the compiler the directory to base the directory
structure in target on. And <i>outDir</i> to specify the directory where the output files, ie the
js files should be placed. So typescript compiler will walk through the project directory,
and when it sees a typescript file, ie a .ts file, it compiles it and produces a .js files.
It them places it in the same path in <i>outDir</i>, that the source .ts file was, relative to the
<i>rootDir</i>.

Now, let us create our index file. Create index.html in the project root, with the following content.
Until we have a proper build system in place, we will use the project folder as DocumentRoot.

    <html>
      <head>
        <base href="/">
        <title>Angular 2 QuickStart</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles.css">
        <!-- 1. Load libraries -->
         <!-- Polyfill(s) for older browsers -->
        <script src="node_modules/core-js/client/shim.min.js"></script>
        <script src="node_modules/zone.js/dist/zone.js"></script>
        <script src="node_modules/reflect-metadata/Reflect.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <!-- 2. Configure SystemJS -->
        <script src="systemjs.config.js"></script>
        <script>
          System.import('app').catch(function(err){ console.error(err); });
        </script>
      </head>
      <!-- 3. Display the application -->
      <body>
        <stomt-app>Loading...</stomt-app>
      </body>
    </html>
    
You will notice that there is a script tag with source as <i>systemjs.config.js</i>.
This contains the configuration for Systemjs module loader, which is actually responsible for loading
our app's code.

Create a file named <i>systemjs.config.js</i> in our project root folder with the following content.
    
    /**
     * System configuration for Angular 2 samples
     * Adjust as necessary for your application needs.
     */
    (function(global) {
      // map tells the System loader where to look for things
      var map = {
        'app':                        'dist',
        '@angular':                   'node_modules/@angular',
        'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
        'rxjs':                       'node_modules/rxjs'
      };
      // packages tells the System loader how to load when no filename and/or no extension
      var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
      };
      var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
      ];
      // Individual files (~300 requests):
      function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
      }
      // Bundled (~40 requests):
      function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
      }
      // Most environments should use UMD; some (Karma) need the individual index files
      var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
      // Add package entries for angular packages
      ngPackageNames.forEach(setPackageConfig);
      var config = {
        map: map,
        packages: packages
      };
      System.config(config);
    })(this);

The items we need to change is the <i>app</i> key in <i>map</i> and <i>package</i> objects.
The <i>app</i> key in map tells the loader to look in <i>dict</i> directory for app module.
The <i>app</i> key in package tells the loader to use the file, <i>main.js</i> in the dist folder,
for <i>app</i> module.

If you look back at our index.html file, you will that in the last script tag, we are loading the
<i>app</i> module. Here it is,

    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>

This bootstraps our app.
