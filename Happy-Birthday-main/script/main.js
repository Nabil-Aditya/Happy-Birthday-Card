// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        if ( dataArr.length === dataArr.indexOf(customData) + 1 ) {
          showPasscodeScreen();
        }
      });
    });
};

// ─── Romantic floaters — hearts & petals rise from bottom ────
const createRomanticFloaters = () => {
  const items = ['❤️','💕','🌸','💗','🌷','💖','✨','🌺','🎀','💓','🌹','💝'];
  const count = 26;
  const vw    = window.innerWidth;
  const vh    = window.innerHeight;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el   = document.createElement('div');
      el.textContent = items[Math.floor(Math.random() * items.length)];

      const size  = 13 + Math.random() * 18;
      const startX = 10 + Math.random() * (vw - 60);
      const swayX  = (Math.random() - 0.5) * 80;
      const travelY = vh * (0.75 + Math.random() * 0.25);
      const dur    = 2400 + Math.random() * 1600;
      const rot    = (Math.random() - 0.5) * 40;

      el.style.cssText = [
        'position:fixed',
        `left:${startX}px`,
        `top:${vh + 10}px`,
        `font-size:${size}px`,
        'pointer-events:none',
        'z-index:9990',
        'user-select:none',
        'will-change:transform,opacity'
      ].join(';');
      document.body.appendChild(el);

      el.animate([
        { transform: `translate(0, 0) rotate(0deg)`,
          opacity: 0 },
        { transform: `translate(${swayX * 0.4}px, -${travelY * 0.15}px) rotate(${rot * 0.3}deg)`,
          opacity: 1,   offset: 0.1 },
        { transform: `translate(${swayX * 0.8}px, -${travelY * 0.55}px) rotate(${rot * 0.7}deg)`,
          opacity: 0.85, offset: 0.55 },
        { transform: `translate(${swayX}px, -${travelY}px) rotate(${rot}deg)`,
          opacity: 0 }
      ], {
        duration: dur,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      }).onfinish = () => el.remove();

    }, i * 65);
  }
};

// ─── Soft pink screen glow flash ─────────────────────────────
const birthdayFlash = () => {
  const flash = document.createElement('div');
  flash.style.cssText = [
    'position:fixed', 'inset:0',
    'background:radial-gradient(circle at 50% 40%, rgba(255,180,210,0.55), rgba(245,180,230,0.18))',
    'z-index:9989', 'pointer-events:none'
  ].join(';');
  document.body.appendChild(flash);

  flash.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 800, easing: 'ease-out', fill: 'forwards' }
  ).onfinish = () => flash.remove();
};

// ─── Passcode screen ─────────────────────────────────────────
const showPasscodeScreen = () => {
  const overlay  = document.getElementById('passcode-overlay');
  const dots     = overlay.querySelectorAll('.passcode-dots span');
  const dotsWrap = overlay.querySelector('.passcode-dots');
  const music    = document.getElementById('bg-music');
  const sfx      = document.getElementById('sfx-horn');
  const CORRECT  = '2506';
  let entered    = '';

  overlay.querySelectorAll('.numpad-btn:not(.empty)').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      if (val === 'del') {
        entered = entered.slice(0, -1);
      } else if (entered.length < 4) {
        entered += val;
      }
      dots.forEach((d, i) => d.classList.toggle('filled', i < entered.length));

      if (entered.length === 4) {
        if (entered === CORRECT) {
          if (music) { music.volume = 0.45; music.play().catch(() => {}); }
          overlay.style.display = 'none';
          showBirthdateReveal(music, sfx);
        } else {
          dotsWrap.classList.add('shake');
          dotsWrap.addEventListener('animationend', () => {
            dotsWrap.classList.remove('shake');
            entered = '';
            dots.forEach(d => d.classList.remove('filled'));
          }, { once: true });
        }
      }
    });
  });
};

const showBirthdateReveal = (music, sfx) => {
  const el = document.getElementById('birthdate-reveal');
  el.style.display = 'flex';

  const text = document.createElement('div');
  text.className = 'birthdate-display';
  text.textContent = '25 / 06 / 2006';
  el.appendChild(text);

  for (let i = 0; i < 38; i++) {
    setTimeout(() => {
      const p    = document.createElement('div');
      const size = 4 + Math.random() * 9;
      const x    = 10 + Math.random() * 80;
      const y    = 25 + Math.random() * 50;
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,200,220,${0.4+Math.random()*0.6});left:${x}%;top:${y}%;pointer-events:none`;
      el.appendChild(p);
      p.animate([
        { transform: 'scale(0)', opacity: 0 },
        { transform: `scale(1) translate(${(Math.random()-0.5)*60}px,-${30+Math.random()*80}px)`, opacity: 1, offset: 0.3 },
        { transform: `scale(0.4) translate(${(Math.random()-0.5)*110}px,-${90+Math.random()*120}px)`, opacity: 0 }
      ], { duration: 900 + Math.random() * 700, easing: 'ease-out', fill: 'forwards' }).onfinish = () => p.remove();
    }, i * 45);
  }

  text.animate(
    [{ opacity: 0, transform: 'scale(0.7)' }, { opacity: 1, transform: 'scale(1)' }],
    { duration: 700, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }
  );

  setTimeout(() => {
    text.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
    setTimeout(() => {
      el.style.display = 'none';
      animationTimeline(music, sfx);
    }, 500);
  }, 2800);
};

// ─── Make a Wish / Cake scene ────────────────────────────────
const showCakeSection = (tl) => {
  tl.pause();
  const section     = document.getElementById('cake-section');
  const wishBtn     = document.getElementById('wish-btn');
  const wishMsg     = document.getElementById('wish-message');
  const continueBtn = document.getElementById('continue-btn');

  wishBtn.style.opacity       = '1';
  wishBtn.style.pointerEvents = 'auto';
  wishMsg.style.opacity       = '0';
  continueBtn.style.opacity   = '0';
  document.querySelectorAll('.flame').forEach(f => f.classList.remove('out'));

  section.style.display = 'flex';
  section.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, fill: 'forwards' });

  wishBtn.addEventListener('click', () => {
    document.querySelectorAll('.flame').forEach(f => f.classList.add('out'));
    wishBtn.style.opacity       = '0';
    wishBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      wishMsg.style.opacity = '1';
      setTimeout(() => { continueBtn.style.opacity = '1'; }, 900);
    }, 600);

    continueBtn.addEventListener('click', () => {
      section.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
      setTimeout(() => { section.style.display = 'none'; tl.resume(); }, 400);
    }, { once: true });
  }, { once: true });
};

// ─── Animation Timeline ──────────────────────────────────────
const animationTimeline = (music, sfx) => {
  const nameSrc = document.querySelector('.one [data-node-name="name"]');
  const igName  = document.querySelector('.ig-dm-name');
  if (nameSrc && igName) igName.textContent = nameSrc.textContent + ' ❤️';

  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd          = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("").join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("").join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0, y: -20, rotationX: 5, skewX: "15deg"
  };
  const ideaTextTransLeave = {
    opacity: 0, y: 20, rotationY: 5, skewX: "-15deg"
  };

  const tl = new TimelineMax();

  tl
    .to(".container", 0.1, { visibility: "visible" })
    .from(".one",  0.7, { opacity: 0, y: 10 })
    .from(".two",  0.4, { opacity: 0, y: 10 })
    .to(".one",    0.7, { opacity: 0, y: 10 }, "+=2.5")
    .to(".two",    0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three",0.7, { opacity: 0, y: 10 })
    .to(".three",  0.7, { opacity: 0, y: 10 }, "+=2")

    // ─── IG DM scene ───
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .to(".ig-typing-indicator", 0.4, { opacity: 1 })
    .to(".ig-typing-indicator", 0.35, { opacity: 0 }, "+=1.6")
    .to(".ig-msg-bubble", 0.3, { opacity: 1 })
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.18, { scale: 1.2 })
    .to(".fake-btn", 0.18, { scale: 1 })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")

    // ─── Story paragraphs ───
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1",   0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2",   0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2, x: 10,
      backgroundColor: "#e8748a", color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4",   0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-5", 0.7, { y: 30, opacity: 0 }, "+=0.5")
    .to(".idea-5 .smiley", 0.7, { rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", 0.7, { opacity: 0 }, "+=2")

    // ─── "SO" big text ───
    .staggerFrom(".idea-6 span", 0.6, { scale: 1.4, opacity: 0, ease: Expo.easeOut }, 0.15)
    .staggerTo(".idea-6 span",   0.5, { scale: 1.4, opacity: 0, ease: Expo.easeOut }, 0.15, "+=1")

    // ─── Balloons + photo ───
    .staggerFromTo(".baloons img", 2.5,
      { opacity: 0.9, y: 1400 },
      { opacity: 1,   y: -1000 },
      0.2
    )
    .from(".lydia-dp", 0.7, {
      opacity: 0, y: 20, scale: 1.04, ease: Power2.easeOut
    }, "-=2")

    // ─── Hat lands → SFX + romantic floaters ───
    .from(".hat", 0.5, { y: -18, opacity: 0, ease: Power2.easeOut })
    .call(() => {
      if (sfx) { sfx.currentTime = 0; sfx.play().catch(() => {}); }
      birthdayFlash();
      createRomanticFloaters();
    })

    // ─── Birthday wish text ───
    .staggerFrom(".wish-hbd span", 0.45,
      { opacity: 0, y: 18, ease: Power2.easeOut }, 0.04)
    .staggerTo(".wish-hbd span", 0.5,
      { color: "#d4849a", ease: Expo.easeOut }, 0.04, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10 }, "party")
    .call(() => { showCakeSection(tl); }, null, null, "+=1.5")

    // ─── Confetti circles ───
    .staggerTo(".eight svg", 1.5, {
      visibility: "visible", opacity: 0, scale: 80,
      repeat: 3, repeatDelay: 1.4
    }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })

    // ─── Outro ───
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  // Replay
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
    if (music) { music.currentTime = 0; music.play().catch(() => {}); }
  });
};

fetchData();
