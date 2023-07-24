# llaumebot

<img width="150" height="150" align="right" style="float: right; margin: 0 10px 0 0;" alt="music_disc" src="https://avatars.githubusercontent.com/u/55829314?v=4">

<a href="https://github.com/hmes98318/Music-Disc/releases"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/hmes98318/Music-Disc?style=for-the-badge"></a>
<a href="https://discord.js.org/"><img src="https://img.shields.io/badge/Discord.JS-v14.11.0-blue?style=for-the-badge&logo=DISCORD&logoColor=white" /></a> 
<a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.JS-v18.16.1-blue?style=for-the-badge&logo=Node.js&logoColor=white"></a> 
<a href="https://github.com/llaumegui/llaumebot/blob/main/LICENSE"><img alt="GitHub" src="https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge"></a>

### Discord.js v14 Music Bot  
Supports **YouTube**, **Spotify**, **SoundCloud** streams.


### Reference version  
[**node.js  `v18.16.1`**](https://nodejs.org/en/)  
[**discord.js  `v14.11.0`**](https://www.npmjs.com/package/discord.js)  

**FFMPEG** and **NodeJS** are required to run the bot properly.


## Deploying with node.js

### Clone the latest version of the repository
```
git clone https://github.com/llaumegui/llaumebot.git
```
or [**click here**](https://github.com/llaumegui/llaumebot/archive/refs/heads/main.zip) to download  


### Install the dependencies
install all the dependencies from [`package.json`](./package.json)  
```
npm install
```

### Configure environment
[`.env`](./.env) 
```env
TOKEN = YOUR_TOKEN
PREFIX = !
YOUTUBE_COOKIES = YOUR_COOKIES
PROXY = YOUR PROXY
GROMIT = "https://youtu.be/VimZfYsDHkc"
INVALID_COMMAND = false
```
<details> 
  <summary>Detailed description</summary>
  
  **`INVALID_COMMAND`** : Send a message to tell if the command sent is valid or not
  
</details>

