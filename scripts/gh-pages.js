const ghpages = require('gh-pages');

ghpages.publish(
    '__sapper__/export/svelte-pianoroll-deploy',
    {
        branch: 'master',
        repo: 'https://github.com/jarmitage/svelte-pianoroll-deploy.git',
        user: {
            name: 'jarmitage',
            email: 'jack.armitage@me.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)