module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    // 所填写的type枚举不能为空
    'type-empty': [2, 'never'],
    // type枚举为小写
    'type-case': [2, 'always', 'lower-case'],
    // 代码修改范围可以为空
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'subject-empty': [0, 'never']
  }
}
