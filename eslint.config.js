// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'dist',
    'public',
    '.github',
    '.vscode',
    'shims.d.ts',
    'tsconfig.json',
  ],
})
