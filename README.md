# Issue D-Day Labeler

이 프로젝트는 GitHub 이슈의 마감일(D-Day)에 따라 자동으로 라벨을 부여해주는 GitHub Action입니다. 
이슈 트래킹을 보다 효율적으로 할 수 있게 도와줍니다.

## 주요 기능
이슈의 마감일까지 남은 일수(D-Day)에 따라 라벨을 자동으로 추가/갱신합니다.

## 사용 방법
`.github/workflows` 디렉토리에 제공된 예시를 참고해서 워크플로우 파일을 추가하면 됩니다.

```yaml
name: Decrement D-n labels on issues

on:
  schedule:
    - cron: '0 15 * * *'  # 매일 밤 12시에 실행 (KST 기준)
  workflow_dispatch:  # 직접 실행 (테스트용 실제 사용시 제거)
permissions:
  issues: write

jobs:
  d-day:
    runs-on: ubuntu-latest
    steps:
      - name: Update D-n Labels
        uses: yj-circle/issue-d-day-labeler@v1.0.1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

## 기여 방법

1. 이슈 및 PR은 언제든 환영합니다!
2. 버그, 개선 사항, 새로운 기능 등 자유롭게 Issue를 등록해주세요.

문의 및 제안은 [이슈](https://github.com/YJ-circle/issue-d-day-labeler/issues)를 통해 남겨주세요.

---
참고자료:
- https://d2.naver.com/helloworld/8149881
- https://github.com/naver/d-day-labeler
- https://devocean.sk.com/blog/techBoardDetail.do?ID=165255
