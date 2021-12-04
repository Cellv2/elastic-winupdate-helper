# Purpose

This project's aim is to ease the restarting of ElasticSearch nodes within a cluster. It should allow an individual to connect to a cluster, check the health of it and also perform simple API calls to allow for rolling restarts as described in the [ElasticSearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/restart-cluster.html).

## Features

- Input a cluster address:port to view the status and health. This should refresh every x seconds and include:
  - The cluster health (green/yellow/red)
  - Node list currently in cluster (_cat/nodes)
    - [Investigate] Maybe a way of telling which have left? On connect save node list or something?
  - Initialising/reallocating shards
- Have a button to backup cluster settings (localstorage? just in case anything crashes, we then have a backup)
- Have a button to display / output the backed up cluster settings
- [?] Have a button to display differences in current cluster settings when compared to saved cluster settings
- Have a button to restore cluster settings
- Have a button to lock cluster (disable reallocation)
- Have a button to flush the cluster
  - [v2] Check the cluster version. If >8.0, check whether _flush/synced config is set to true. If yes, prevent command from being run and display warning to user advising to disable to config setting
- Have a button to unlock the cluster (allow reallocation and optionally alter the concurrent shard reallocation count)
- [v2] Have a menu / sidebar with a list of known clusters. Click on one connects to that cluster
- [v2] Have a filter for the list of known clusters
- Have a config area which allows you to:
  - Set how often the cluster status / health data should refresh. Defaults to 5 secs
  - Set the lock reallocation type (primaries, all)
  - Set lock reallocation for only persistent, or persistent and transient (to account for potential cluster settings already writing to transient)
  - Enable / disable the concurrent shard reallocation count update when unlocking the cluster
  - Set the concurrent shard reallocation count. Only comes into effect if 'concurrent shard reallocation updates' is enabled
  - Set whether to use _flush/synced rather than \_flush (_flush/synced is [deprecated in 7.6, and will be removed in 8.0](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-synced-flush-api.html))
  - [v2] Display a list of known clusters for the menu / sidebar, with a '-' button to remove that cluster. Prompt before removing
  - [v2] Update the list of known clusters for the menu / sidebar. Can enter a single string or an array of strings to add multiple

## Other

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
