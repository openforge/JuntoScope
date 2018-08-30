# JuntoScope	
 This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.	
 ## Development	
 Run `ng serve` which should open the app in a new browser tab.	
 Run `npm run firebase:serve` which should serve Firebase cloud functions locally for testing at `http://localhost:5000/junto-scope-dev/us-central1/api`	
 #### Versioning & Changelog	
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
