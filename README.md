# SKH ACM Website

A modern static landing page for the SKH ACM student chapter at Late G.N. Sapkal College of Engineering, Nashik.

This project showcases the ACM chapter's mission, faculty mentorship, activities, team members, and community events in a responsive and visually engaging format.

## Project Overview

- Built with plain HTML, CSS, and JavaScript
- Responsive single-page website
- Theme toggle (light/dark)
- Activity modal popups
- Photo gallery with autoplay and navigation
- Mobile-friendly navigation menu

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Static assets (images and branding)

## Project Structure

```text
SKH---ACM/
├── css/
│   └── style.css
├── images/
│   ├── asm-sapkal-logo.png
│   ├── prof-nr-wankhade.jpg
│   ├── glimpse-01.jpg
│   └── ...
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Features

- Hero section with chapter branding
- About ACM and About SKH ACM sections
- Faculty profile section
- Key points highlighting ACM values
- Activity cards with modal details
- Team showcase and campus glimpse gallery
- Contact and join section
- Theme persistence using browser localStorage

## Run Locally

Because this is a static website, you can open `index.html` directly in a browser.

For a local server, run:

```bash
cd "S:\RD projects\SKH - ACM\SKH---ACM"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Customization

The site includes editable placeholder text throughout the page. You can update content such as:

- chapter description
- member statistics
- event details
- faculty information
- team member names and photos
- contact links
- join ACM CTA text

Key places to edit:

- `index.html` for page content and structure
- `css/style.css` for design and layout
- `js/script.js` for interactive behavior and gallery logic

## Notes

This is a starter/draft website and some text blocks are intentionally marked as editable placeholders. These can be replaced with official information, real chapter details, and final branding before deployment.

## License

This project is intended for educational and institutional use. Please confirm licensing requirements before public deployment or redistribution.

## Credits

- Project: SKH ACM
- Institution: Late G.N. Sapkal College of Engineering, Nashik
- Design and development: Student chapter website initiative
