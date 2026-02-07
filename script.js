// 🔑 API KEY
const API_KEY = "AIzaSyDxJWcYkSgm3D5LNXHuD4aZ9y4psygAouE";

// 📺 Playlists
const PLAYLISTS = {
  g1: "PLjLTHvFUYuHc_d2ljbRA2o8tlZ2fyN6T7",
  g2: "PLjLTHvFUYuHccB4q7iBtvOqwPNT5Vriy_",
  g3: "PLjLTHvFUYuHcWpX9T9Cn9oyOTkdax2GBk",
  g4: "PLjLTHvFUYuHcWfHs6uOJ7iet5K63PFQj0",
  g5: "PLjLTHvFUYuHf9KBs6WydJKwoXHRS6O8pY",
  g6: "PLjLTHvFUYuHfO9xOopi_XHkiwqtrB1y7Y",

  p1: "PLjLTHvFUYuHf-6VwRi4iSyZIJgt1GfZXJ",
  p2: "PLjLTHvFUYuHdcAIJPO1UjRaOisEtsUABa",
  p3: "PLjLTHvFUYuHdhNvraddfS5ju6qE9kt_Yo",

  s1: "PLjLTHvFUYuHcE7E_zukTqG-uHD0qgE9xl",
  s2: "PLjLTHvFUYuHc-ABOCXyZYZByzqSubZsJW",
  s3: "PLjLTHvFUYuHcp9nsV8ohx_1qZ8rjwEBAF"
};

// 🧠 اسم الصفحة
const pageName = window.location.pathname
  .split("/")
  .pop()
  .replace(".html", "");

// 🆔 playlist id
const playlistId = PLAYLISTS[pageName];

// ❌ صفحة الخطأ (صورة)
function showError() {
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.innerHTML = `
    <div style="
      width:100vw;
      height:100vh;
      overflow:hidden;
    ">
      <img
        src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1"
        style="
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        "
        alt=""
      >
    </div>
  `;
}


// ▶️ تشغيل
if (!playlistId) {
  showError("ERROR 404 - PAGE NOT FOUND");
} else {
  fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  )
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        showError("ERROR 404 - PLAYLIST NOT FOUND");
        return;
      }

      const container = document.getElementById("videos");

      data.items.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;

        const div = document.createElement("div");
        div.style.marginBottom = "20px";

        div.innerHTML = `
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1"
            frameborder="0"
            allowfullscreen>
          </iframe>
        `;

        container.appendChild(div);
      });
    })
    .catch(() => {
      showError("ERROR - API NOT WORKING");
    });
}
