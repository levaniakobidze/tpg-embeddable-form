import { deleteAsync } from 'del';

async function cleanDist() {
  try {
    const deletedPaths = await deleteAsync(['./dist/**', '!./dist']);
    console.log('Deleted files and folders:\n', deletedPaths);
  } catch (err) {
    console.error('Error cleaning dist folder:', err);
  }
}

cleanDist();
