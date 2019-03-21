# 💣[Minesweeper](https://minesweeper.lnmai.com/)

### [Rules of MineSweeper](https://gist.github.com/lionel-lints/1b520163e892bf7913f594bd76363ff8)

### Levels

- Easy: 8x8 board with 10 mines.
- Hard: 10x10 board with 25 mines.
- Expert: 12x12 board with 40 mines

### Leaderboards

- Using Cheat - Defuse Mine 👀 will not count.
- Score will only be recorded if user's logged in - using Facebook login.

### Defuse Mine 👀

Easy win but meh

### Using Flags

- Using Flags is a good stragety to mark the mines, however you can be wrong sometimes
- You have certain amount of flags to place.
- Upon clicking on a 0 cell that expands the cells nearby, if your flags are placed within those cells, the game will refund those flags to you.
- Defusing Mines will also refund your flags, but you probably won't even need the flags anymore.

### Server code for Leaderboard

Using Heroku.

- Pros: fast and free.
- Cons: The Heroku filesystem is ephemeral - that means that any changes to the filesystem whilst the dyno is running only last until that dyno is shut down or restarted. Each dyno boots with a clean copy of the filesystem from the most recent deploy. Leaderboard will be reset. 😢

### Plugins/Dependencies

| dependencies         | Link                                               |
| -------------------- | -------------------------------------------------- |
| Moment               | https://www.npmjs.com/package/moment               |
| React-bootstrap      | https://react-bootstrap.github.io/                 |
| React-facebook-login | https://www.npmjs.com/package/react-facebook-login |
| react-notifications  | https://www.npmjs.com/package/react-notifications  |
| gh-pages             | https://www.npmjs.com/package/gh-pages             |
