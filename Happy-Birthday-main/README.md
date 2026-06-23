# 🎂 Happy Birthday, Jilaa

A personalized animated birthday wish page, built with HTML, CSS, and JavaScript.

---

## ✨ Features

- **Animated Instagram DM scene** — typing indicator, message reveal character by character, gradient send button
- **Romantic visual theme** — rose, blush, and mauve color palette with Cormorant Garamond + Nanum Myeongjo fonts
- **Birthday photo section** — profile photo with animated party hat landing on top of the head
- **Korean birthday message** — 생일 축하해. 네가 태어나줘서 정말 고마워.
- **Background music** — plays automatically on tap (browser-policy safe)
- **Balloon & confetti celebration** — full-screen animated celebration sequence
- **Tap to Begin overlay** — elegant start screen before the animation runs
- **Fully responsive** — works on mobile, tablet, and desktop

---

## 🗂️ Project Structure

```
happy-birthday/
├── index.html          # Main page & structure
├── customize.json      # Edit all text content here
├── style/
│   └── style.css       # Styling & animations
├── script/
│   └── main.js         # GSAP animation timeline
└── img/
    ├── profile.png     # Profile photo (IG DM avatar)
    ├── hat.svg         # Birthday party hat
    ├── ballon1–3.svg   # Balloon assets
    └── song.mp3        # Background music (add your own)
```

---

## ⚙️ Customization

All text is controlled from **`customize.json`**:

| Key | Description |
|-----|-------------|
| `name` | Recipient's name (shown in heading & IG DM header) |
| `textInChatBox` | Message typed in the IG DM |
| `wishHeading` | Big text shown with the photo |
| `wishText` | Subtitle below the photo |
| `imagePath` | Path to the main photo (e.g. `img/profile.png`) |

---

## 🎵 Adding Music

1. Put your `.mp3` file inside the `img/` folder
2. Open `index.html` and find:
   ```html
   <source src="" type="audio/mpeg">
   ```
3. Change it to:
   ```html
   <source src="img/song.mp3" type="audio/mpeg">
   ```

---

## 🎩 Adjusting the Hat Position

If the birthday hat isn't sitting perfectly on the head, open `style/style.css` and find:

```css
.six .hat {
  width: 22%;   /* size of the hat */
  top: -20%;    /* move up (more negative) or down */
  left: 44%;    /* move left or right */
}
```

Adjust `top` and `left` until it sits right on the head.

---

## 🚀 Running Locally

Serve with any local server (e.g. [Laragon](https://laragon.org), VS Code Live Server, or `npx serve .`) — do **not** open `index.html` directly as a file, because `fetch("customize.json")` requires an HTTP server.

---

## 📄 License

MIT
