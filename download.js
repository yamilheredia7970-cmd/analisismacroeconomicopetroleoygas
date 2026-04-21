import fs from 'fs';
import https from 'https';

const url = 'https://drive.google.com/uc?export=download&id=19EoUKieclzIIHCh-pzfjvSYKpJ2bZ-LM';
https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
            let data = [];
            res2.on('data', chunk => data.push(chunk));
            res2.on('end', () => {
                fs.writeFileSync('data.csv', Buffer.concat(data));
                console.log('Downloaded data.csv', Buffer.concat(data).length, 'bytes');
            });
        });
    } else {
        let data = [];
        res.on('data', chunk => data.push(chunk));
        res.on('end', () => {
            fs.writeFileSync('data.csv', Buffer.concat(data));
            console.log('Downloaded data.csv', Buffer.concat(data).length, 'bytes');
        });
    }
});
