const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')
  console.log(path.join(rootPath, 'windows', 'icon.ico'));

  return Promise.resolve({
    appDirectory: path.join(outPath, 'greco-app-win32-ia32/'),
    authors: 'Manuel Casanova/ @sudoMag',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Greco.exe',
    setupExe: 'GrecoAppInstaller.exe',
    setupIcon: path.join(rootPath, 'windows', 'icon.ico')
  })
}