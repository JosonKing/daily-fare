const dayjs = require('dayjs');
const getHeadlines = require('./utils/getHeadlines');
const issue = require('./utils/issue');

const owner = 'JosonKing';
const repo = 'daily-fare';

// run every day at 00:01 UTC
const run = async (date) => {
  const contents = await getHeadlines(date);
  console.log(contents)
  const res = await issue.open({
    owner,
    repo,
    title: `Daily fare SH to SZ @${dayjs(date).format('YYYY-MM-DD HH:mm')}`,
    body: contents
  });

  const issueNumber = res.data.number;

  await issue.lock({
    owner,
    repo, 
    issueNumber,
  });
}

run(new Date());
