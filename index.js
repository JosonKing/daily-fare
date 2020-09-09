const getHeadlines = require('./utils/getHeadlines');
const issue = require('./utils/issue');

// run every day at 00:01 UTC
const run = async (date) => {
  const contents = await getHeadlines(date);
  console.log(contents)
  const res = await issue.open({
    owner: 'JosonKing',
    repo: 'daily-fare',
    title: `Daily fare SH to SZ @${new Date(date).toISOString().slice(0, 10)}`,
    body: contents
  });

  const issueNumber = res.data.number;

  await issue.lock({
    owner: 'JosonKing',
    repo: 'daily-fare', 
    issueNumber,
  });
}

run(new Date());
