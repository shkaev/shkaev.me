# Photo Storage via Cloudflare R2

The photo archive should not be pushed through Git. Large JPEG sets now resolve
through `PUBLIC_PHOTO_BASE_URL`, so the site can load photos either:

- locally from `public/photo-imports/...` when the env var is absent
- from R2/CDN when `PUBLIC_PHOTO_BASE_URL` is set

## Recommended setup

1. Create an R2 bucket, for example `shkaev-photo-archive`.
2. In Cloudflare R2, connect a custom domain, for example
   `photos.shkaev.me`.
3. Create R2 API tokens with object read/write access for that bucket.
4. Upload the local `public/photo-imports/` directory to the bucket, preserving
   paths.
5. Set:

   ```bash
   PUBLIC_PHOTO_BASE_URL=https://photos.shkaev.me
   ```

6. Rebuild the site. Archive cards, gallery thumbs, and lightbox display images
   will all resolve through the new base URL automatically.

## Suggested bucket layout

Keep the same directory structure as the local `public` folder:

```text
photo-imports/
  film/
    display/
    thumbs/
    card-covers/
  ekaterinburg/
    display/
    thumbs/
    card-covers/
  ...
```

## Environment variables

Copy [.env.example](/Users/shkaev/Desktop/Codex Projects/shkaev.me/.env.example)
to `.env` and fill these:

```bash
PUBLIC_PHOTO_BASE_URL=https://photos.shkaev.me
R2_ACCOUNT_ID=<cloudflare account id>
R2_BUCKET_NAME=shkaev-photo-archive
AWS_ACCESS_KEY_ID=<r2 access key id>
AWS_SECRET_ACCESS_KEY=<r2 secret access key>
```

## Uploading with AWS CLI

R2 works through its S3-compatible endpoint. After AWS CLI is installed:

```bash
npm run r2:sync
```

The sync script uploads `public/photo-imports` into:

```text
s3://<bucket>/photo-imports
```

You can also pass a custom source directory or prefix:

```bash
bash scripts/r2-sync.sh public/photo-imports photo-imports
```

## Dashboard steps

1. In Cloudflare, open `R2 Object Storage`.
2. Create bucket `shkaev-photo-archive` or another name you prefer.
3. Open the bucket `Settings`.
4. Under `Custom Domains`, connect `photos.shkaev.me`.
5. Under `Manage R2 API tokens`, create a token with object read/write access
   to that bucket.
6. Put those credentials into `.env`.
7. Run `npm run r2:sync`.
8. Set `PUBLIC_PHOTO_BASE_URL` to your R2 custom domain.
9. Run `npm run build` and verify the site loads images from the new domain.

## After the first successful upload

## Current target sizes

- `thumbs`: `640px`
- `card-covers`: `1024px`
- `display`: `1920px`

Only after the bucket is live and the site works against
`PUBLIC_PHOTO_BASE_URL`:

- stop tracking `public/photo-imports/` in Git
- stop tracking `data/photo-imports/` in Git unless you explicitly want raw
  import artifacts in the repo
- rewrite the local unpushed commit so the heavy photo payload never reaches the
  remote repository
