import OS from './os/os'
const os = new OS()

os.init()

if (location.hostname !== 'localhost') {
  os.about()
}
