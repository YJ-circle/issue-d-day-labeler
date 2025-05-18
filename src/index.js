const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token', { required: true });
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    // 1) 열린 이슈 목록 조회
    const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
      owner, repo, state: 'open'
    });

    for (const issue of issues) {
      for (const lbl of issue.labels) {
        // D-day → Overdue
        if (lbl.name === 'D-day') {
          await octokit.rest.issues.removeLabel({ owner, repo, issue_number: issue.number, name: 'D-day' });
          await octokit.rest.issues.addLabels({ owner, repo, issue_number: issue.number, labels: ['Overdue'] });
          continue;
        }
        // D-n 처리
        const m = /^D-(\d+)$/.exec(lbl.name);
        if (!m) continue;
        const next = Number(m[1]) - 1;
        await octokit.rest.issues.removeLabel({ owner, repo, issue_number: issue.number, name: lbl.name });
        if (next > 0) {
          await octokit.rest.issues.addLabels({ owner, repo, issue_number: issue.number, labels: [`D-${next}`] });
        } else if (next === 0) {
          await octokit.rest.issues.addLabels({ owner, repo, issue_number: issue.number, labels: ['D-day'] });
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();