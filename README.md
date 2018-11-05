<p align="center">
  <img src="https://github.com/openforge/main-website/blob/master/src/assets/logo-openforge.png?raw=true"/>
</p>
<p align="center">
  <a href="http://www.openforge.io/">Official Website</a> |
  <a href="http://www.openforge.io/opportunities">Opportunities</a> |
  <a href="https://www.facebook.com/OpenForgeUS/">Facebook</a>
</p>

<h3 align="center">
  Leading By Example.
</h3>

<p align="center">
  Working with the latest technologies, designing the best products, and sharing our knowledge with the world wide community.
</p>

# OpenForge

The OpenForge Community is composed of team members and public contributors banded together for a common goal of leading by example.  We are experts in applying UI/UX and Software Architecture principles towards enhancing businesses nation (and world!) wide.

In addition to providing services for our clients; it is our belief that we should also focus on benefiting the community that surrounds us. For this reason; all OpenForge initiatives (that are not client related) are Open Sourced; including our design and business consulting resources which can be found on our Website at [www.openforge.io](http://openforge.io). 

If you are a community member who would like to take part of our paid (yes, we said PAID!) Open Source contributions please reach out to us via our [opportunities page](http://www.openforge.io/opportunities).   We also always encourage anyone to contribute to anything we are doing, and we hope to contribute to your projects as well!


# JuntoScope [![Build Status](https://travis-ci.org/openforge/JuntoScope.svg?branch=develop)](https://travis-ci.org/openforge/JuntoScope)
 
JuntoScope will help your team determine scopes for tasks in Teamwork.com© Projects more accurately, quickly, and efficiently to keep your projects within budget. Integrating with Teamwork Projects API, your team will be able to:

- Scope tasks anonymously and accurately without influence of others
- Determine team averages for scoped items to give the best estimate
- Allow team members to scope items easily through their mobile device
- Increase accuracy of scoped time for tasks within Teamwork Projects
- Prevent your team from going over scope
- Improve your ROI
- Decrease time spent scoping tasks

Stop wasting time estimating how long you think your team will need to complete Teamwork Tasks and get your accurate scope today!
 
 
## Getting Started
JuntoScope was made with love and care using [Ionic 3](https://github.com/ionic-team/ionic) :heart:

* [Download the installer](https://nodejs.org/) for Node.js 6 or greater (we recommend < 8)
* Install the ionic CLI globally: `npm install -g ionic`
 
## Setting up the project
_Disclaimer: We do not have our Firebase keys environment configuration published in the repository! When attempting to run this project it will fail immediately. If you have your own firebase environment configuration that you would like to use, please consult the following instructions:_

* Create a a folder called config under the src folder. Add a file called config.ts to the newly created folder.
* We setup our configuration to have 2 environments,but if you don't need that you can copy the same credentials from there firebase project in both configurations.
* Find your DEV and PROD firebase credentials (apiKey, authDomain, databaseUrl, etc.), and copy the object into this file. It should look like this:

```
export const FIREBASE_DEV_CONFIG = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}

export const FIREBASE_PROD_CONFIG = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
}
```

Now you need to deploy the firebase functions to your own firebase project. For this you just need to run this command:
```
firebase deploy --only functions
```
Or this other command if you have Firebase alias:
```
firebase use <your_alias> && firebase deploy --only functions
```
Once you have deployed the firebase functions copy the URL and add that to the same config file. The format should be the following :
```
export const FIREBASE_DEV_FUNCTIONS = '';
export const FIREBASE_PROD_FUNCTIONS = '';
```

For the last step you will need go to check and copy your Web Client ID. You can find it on by navigating to your Firebase Console > Authentication > Sign-in Method > Google and open Web SDK configuration. Then add it to the same config file. The format should be the following :
```
export const GOOGLE_WEB_CLIENT_ID_DEV = '';
export const GOOGLE_WEB_CLIENT_ID_PROD = '';
```

## Setting up locally
If you want to run the firebase functions locally, so you can debug easily your functions without the need to deploy them, we have you covered! Just run this command:
```
npm run firebase:serve
```
and you will have your firebase functions running locally, then you just need to add the URL that appears on the terminal on the config file.

## Configuring the native plugins
We are using the cordova native plugins to login with Google, Facebook and Twitter, so in order to configure them and use your own keys you can check here:
- [Google Plugin](https://github.com/EddyVerbruggen/cordova-plugin-googleplus)
- [Facebook Plugin](https://github.com/jeduan/cordova-plugin-facebook4)
- [Twitter Plugin](https://github.com/chroa/twitter-connect-plugin)

We know this can be messy, _we dealt with them all_, so feel free to open an issue with this info:
- The steps you did
- The plugin with you are facing the problem
- The shwoing error

We will read the issue and try to help you, _maybe the problem you have we have already dealt with it_

## Versioning & Changelog	
We utilize [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to generate a changelog from git metadata.	
 The following tools are used to achieve this purpose:	
- [commitizen](https://github.com/commitizen/cz-cli)	
- [cz-conventional-changelog](https://www.npmjs.com/package/cz-conventional-changelog)	
- [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)	
 With the current configuration, after a developer stages their changes for a commit. They can use the following npm script to walk them through committing their changes.	
 ```	
npm run cz	
```	
 Read more about the commit guidelines [here](http://conventionalcommits.org/)	
 After all changes have been committed, a release and a changelog can be triggered by using the npm [version](https://docs.npmjs.com/cli/version) command. And the current configuration takes care of generating the changelog file based on git metadata.
 

## Download the App!
[<img src="https://github.com/openforge/main-website/blob/master/src/assets/graphic-google-googleplaystore.png?raw=true" />](https://play.google.com/store/apps/details?id=com.openforge.juntoscope&hl=en_US)

[<img src="https://github.com/openforge/main-website/blob/master/src/assets/graphic-apple-appstore.png?raw=true" />](https://itunes.apple.com/us/app/juntoscope/id1421846154?mt=8)
