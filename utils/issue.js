// const { Octokit } = require("@octokit/core");
// const { createAppAuth } = require("@octokit/auth-app");
const axios = require('axios');

// let secrets = {};

// try {
//   secrets = require('../secret.js');
// } catch (error) {
//   console.log('no secret json, on github action')
// }

// const octokit = new Octokit({
//   authStrategy: createAppAuth,
//   auth: {
//     id: 80430,
//     // installationId: 11101003,
//     clientId: "Iv1.a5af3e7df8287adb",
//     clientSecret: process.env.clientSecret,
//     privateKey: process.env.privateKey,
//     // clientSecret: process.env.clientSecret ? process.env.clientSecret : secrets.clientSecret,
//     // privateKey: process.env.privateKey ? process.env.privateKey : secrets.privateKey,
//   },
// });

// const octokit = new Octokit({ auth: `personal-access-token123` });

const open = async ({owner, repo, title, body}) => {
  try {    
    console.log('opening issue');
    const res = await axios.post(`https://api.github.com/repos/${owner}/${repo}/issues?access_token=${process.env.ACCESS_TOKEN}`, {
      title,
      body
    });
    // const res = await octokit.request('POST /repos/{owner}/{repo}/issues', {
    //   owner,
    //   repo,
    //   title,
    //   body,
    // });
    console.log('opened');
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const lock = async ({owner, repo, issueNumber}) => {
  console.log('locking issue');
  await axios.put(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/lock?access_token=${process.env.ACCESS_TOKEN}`, {
    lock_reason: 'resolved'
  })
  // await octokit.request('PUT /repos/{owner}/{repo}/issues/{issue_number}/lock', {
  //   owner: owner,
  //   repo: repo,
  //   issue_number: issueNumber,
  //   lock_reason: 'resolved'
  // });
  console.log('locked');
}

module.exports = {
  open,
  lock,
}

// lock({
//   owner: 'JosonKing',
//   repo: 'daily-fare',
//   issueNumber: 39,
// });
