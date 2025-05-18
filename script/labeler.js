const issues = await github.paginate(
  github.rest.issues.listForRepo,
  { owner: context.repo.owner, repo: context.repo.repo, state: 'open' }
);

for (const issue of issues) {
  for (const lbl of issue.labels) {
    if (lbl.name === 'D-day') {
      // D-day → Overdue
      await github.rest.issues.removeLabel({ issue_number: issue.number, name: 'D-day', ...context.repo });
      await github.rest.issues.addLabels({ issue_number: issue.number, labels: ['Overdue'], ...context.repo });
      continue;
    }
    const m = /^D-(\d+)$/.exec(lbl.name);
    if (!m) continue;
    const next = +m[1] - 1;
    await github.rest.issues.removeLabel({ issue_number: issue.number, name: lbl.name, ...context.repo });
    if (next > 0) {
      await github.rest.issues.addLabels({ issue_number: issue.number, labels: [`D-${next}`], ...context.repo });
    } else if (next === 0) {
      await github.rest.issues.addLabels({ issue_number: issue.number, labels: ['D-day'], ...context.repo });
    }
  }
}
