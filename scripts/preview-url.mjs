import fs from 'fs';

const { CONTAINER_NAME, REGION, USER_APP_PORT, LT_REMOTE_URL } = process.env;

if (CONTAINER_NAME && REGION && USER_APP_PORT && LT_REMOTE_URL) {
  const domain = new URL(LT_REMOTE_URL).hostname;
  const previewUrl = `https://${CONTAINER_NAME}-${REGION}-${USER_APP_PORT}.userapp.${domain}`;
  console.log(`  ➜  Preview: ${previewUrl}`);
  try {
    const readme = fs.readFileSync('README.md', 'utf8');
    if (readme.includes('{URL}')) {
      fs.writeFileSync('README.md', readme.replace('{URL}', previewUrl), 'utf8');
    }
  } catch (err) {
    console.error(`  ➜  Failed to update README.md: ${err.message}`);
  }
}
