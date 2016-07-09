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
structre in target on. And outDir to specify the directory where the output files, ie the
js files should be placed. So typescript compiler will walk through the project directory,
and when it sees a typescript file, ie a .ts file, it compiles it and produces a .js files.
It them places it in the same path in outDir, that the source .ts file was, relative to the
root dir.
