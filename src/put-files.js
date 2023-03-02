import * as web3Storage from 'web3.storage'

const fileData = {
  _: [ 'testile.txt' ],
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg1NkNlNUViRjI1RDkzQkQ0MjVkODU0MkMwNWYxNTZFOEZiMUQ0MzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQxMjE3MzA5MjYsIm5hbWUiOiJldmlkZW5jZXRva2VuIn0.W5O6x_h2rLxSLmL8f3BNZo80LTYIGQZ6TA0xi5fJJzY'
}

async function transfer (input) {
  // const args = minimist(process.argv.slice(2))
  const fileData = {
    _: [ 'testile.txt' ],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg1NkNlNUViRjI1RDkzQkQ0MjVkODU0MkMwNWYxNTZFOEZiMUQ0MzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQxMjE3MzA5MjYsIm5hbWUiOiJldmlkZW5jZXRva2VuIn0.W5O6x_h2rLxSLmL8f3BNZo80LTYIGQZ6TA0xi5fJJzY'
  }
  const args = fileData;
  const token = fileData.token

  console.log("The Arguments Passed are: ");
  // console.log(args);

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (args._.length < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  const storage = new web3Storage.Web3Storage({ token })
  const files = []

  for (const path of args._) {
    const pathFiles = await web3Storage.getFilesFromPath(path)
    console.log("Fetched FIle Path= ", pathFiles);
    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added with CID:', cid)
}

transfer(fileData)