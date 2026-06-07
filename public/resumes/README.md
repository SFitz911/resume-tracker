# Resume PDFs

Place your resume PDF files in this folder.

Files here are served as static assets by Next.js.
For example, `sean-resume.pdf` is accessible at `/resumes/sean-resume.pdf`.

## Usage

1. Export your resume as PDF.
2. Name it something URL-friendly (no spaces): `sean-resume.pdf`
3. Drop it in this folder.
4. In the Generator, enter the filename in the "Resume PDF Filename" field.
5. The tracked resume page will link to `/resumes/sean-resume.pdf`.

## Important

- No upload system exists yet. Manually place PDFs here.
- Files in `public/` are committed to git and deployed with the app.
- Keep file sizes reasonable (under 5 MB) for fast downloads.
