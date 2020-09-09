const issue = require('../utils/issue');

test('issue', async () => {
  let contents = [
    '1. **[Show HN: Linux sysadmin course, eight years on](https://news.ycombinator.com/item?id=24380969)**768 points by [snori74](https://news.ycombinator.com/user?id=snori74) 3 days ago | [84 comments](https://news.ycombinator.com/item?id=24380969)',
    '2. **[Ubuntu 20.04 LTS’ snap obsession has snapped me off of it](https://personal.jatan.space/2020/09/05/ubuntu-snap-obsession-has-snapped-me-off-of-it/)**599 points by [uncertainquark](https://news.ycombinator.com/user?id=uncertainquark) 3 days ago | [537 comments](https://news.ycombinator.com/item?id=24383276)',
  ]
  const res = await issue.open({
    owner: 'JosonKing',
    repo: 'daily-fare',
    title: `Daily fare SH to SZ @${new Date('2020-09-06').toISOString().slice(0, 10)}`,
    body: contents
  });

  const issueNumber = res.data.number;

  await issue.lock({
    owner: 'JosonKing',
    repo: 'daily-fare', 
    issueNumber,
  });
});
