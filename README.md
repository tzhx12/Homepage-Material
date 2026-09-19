# hello-world

我的第一个 GitHub 仓库，用来完整走一遍本地提交 → 推送到远端的流程。

## 日常改动怎么提交

改完文件后，三步：

```bash
git add .
git commit -m "描述这次改了什么"
git push
```

`git add .` 把改动放进暂存区，`git commit` 记录成本地的一个版本，`git push` 推到 GitHub。

想先看看自己改了哪些文件，用 `git status`；想看具体改了哪几行，用 `git diff`。

## 接下来可以做

- [ ] 把上面的标题和描述换成这个仓库真正要做的事
- [ ] 按实际需要替换 `.gitignore`（现在是一份跨平台的通用模板）
- [ ] 如果你想让它在自己主页上展示，可以把仓库改名成和用户名一样（`tzhx12`），README 就会显示在 GitHub 个人主页上

## 许可

MIT 许可，详见 [LICENSE](LICENSE)。
