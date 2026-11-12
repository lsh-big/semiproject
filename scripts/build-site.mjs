// Cross-platform build of both frontends. --check leaves no output files.
import {createRequire} from 'node:module'
import {cpSync,rmSync} from 'node:fs'
import {fileURLToPath,pathToFileURL} from 'node:url'
import path from 'node:path'
const root=fileURLToPath(new URL('../',import.meta.url))
const check=process.argv.includes('--check')
const pages=process.argv.includes('--pages')
const output=path.join(root,'frontend/dist')
if(pages&&!check)rmSync(output,{recursive:true,force:true})
for(const app of ['frontend','ai-fashion']){
  const dir=path.join(root,app)
  const require=createRequire(path.join(dir,'package.json'))
  const {build}=await import(pathToFileURL(require.resolve('vite')).href)
  const outDir=pages?path.join(output,'app',...(app==='ai-fashion'?['ai-fashion']:[])):
    app==='ai-fashion'?path.join(output,'ai-fashion'):undefined
  await build({root:dir,...(check?{publicDir:false,build:{write:false}}:
    outDir?{build:{outDir,emptyOutDir:true}}:{})})
}
if(pages&&!check)cpSync(path.join(root,'project-site'),output,{recursive:true})
console.log(check?'Both frontend code builds passed (no output written).':
  pages?'GitHub Pages site: frontend/dist':'Combined site: frontend/dist')
