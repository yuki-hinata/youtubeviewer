const express = require('express')
const { google } = require('googleapis');
const { readFavoriteIds, writeFavoriteIds } = require('../src/utils/favorite')

const YOUTUBE_API_KEY = 'AIzaSyACQV5DeXr1Qq32HgIWEQ5_NLW3c1qaz3Q'

const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY,
})

const router = express.Router();

router.get('/videos/search/:keyword', (req, res, next) => {
    const { keyword } = req.params;
    const { pageToken } = req.query;
    (async () => {
        // 検索結果を動画IDで取得
        const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
          part: 'id',
          q: keyword,
          type: 'video',
          maxResults: 20,
          pageToken,
        });
        // 動画の情報を取得
        const ids = idItems.map(({ id: { videoId } }) => videoId);
        const { data: { items } } = await youtube.videos.list({
          part: 'statistics,snippet',
          id: ids.join(','),
        });
        res.json({ items, nextPageToken });
      })().catch(next);
    });

    //readFavoriteIdを使ってファイルの中からお気に入りを持ってくる。
    router.get('/videos/favorites', (req, res, next) => {
      (async () => {
        const favoriteIds = await readFavoriteIds();
        if(!favoriteIds.length){
          res.json({ items: [] })
          return;
        }

        const { data: { items } } = await youtube.videos.list({
          part: 'statistics,snippet',
          id: favoriteIds.join(','),
        })
        res.json({ items })
      })().catch(next);
    })

    //動画詳細情報取得
    router.get('/videos/:videoId', (req, res, next) => {
      const { videoId } = req.params;
      (async () => {
        // 動画の情報を取得
        const { data: { items } } = await youtube.videos.list({
          part: 'statistics,snippet',
          id: videoId,
        });
        res.json(items[0]);
      })().catch(next);
    });

    // 関連動画取得
router.get('/videos/:videoId/related', (req, res, next) => {
  const { videoId: relatedToVideoId } = req.params;
  const { pageToken } = req.query;
  (async () => {
    // 関連動画のIDを取得
    const { data: { items: idItems, nextPageToken } } = await youtube.search.list({
      part: 'id',
      relatedToVideoId,
      type: 'video',
      maxResults: 20,
      pageToken,
    });
    // 動画の情報を取得
    const ids = idItems.map(({ id: { videoId } }) => videoId);
    const { data: { items } } = await youtube.videos.list({
      part: 'statistics,snippet',
      id: ids.join(','),
    });
    res.json({ items, nextPageToken });
  })().catch(next);
});

router.get('/favorites', (req, res, next) => {
  readFavoriteIds().then((data) => {
    res.json(data);
  }).catch(next)
})

//お気に入り登録解除
router.route('/favorites/:id')

.post((req, res, next) => {
  (async () => {
    const { id } = req.params;

    const favoriteIds = await readFavoriteIds()
    if(favoriteIds.indexOf(id) === -1){

      favoriteIds.unshift(id)

      writeFavoriteIds(favoriteIds)
    }
    res.end()
  })().catch(next)
})

.delete((req, res, next) => {
  (async () => {
    const { id } = req.params;
    
    const favoriteIds = await readFavoriteIds();
    const indexOfId = favoriteIds.indexOf(id);
    if(indexOfId !== -1){


      writeFavoriteIds(favoriteIds.filter((favoriteId) => (favoriteId !== id)))
    }
    res.end()
  })().catch(next)
})
    
module.exports = router;