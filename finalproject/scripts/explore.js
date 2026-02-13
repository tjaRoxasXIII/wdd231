let exploreGames = [];
let originalGames = [];

async function fetchTopSellers() {
  try {
    const url = "https://store.steampowered.com/api/featuredcategories";
    const proxied = "https://corsproxy.io/?" + encodeURIComponent(url);
    const response = await fetch(proxied);
    if (!response.ok) throw new Error("Failed to load top sellers");
    const data = await response.json();
    return data.top_sellers.items;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function searchSteam(query) {
  try {
    const url = `https://steamcommunity.com/actions/SearchApps/${query}`;
    const proxied = "https://corsproxy.io/?" + encodeURIComponent(url);
    const response = await fetch(proxied);
    if (!response.ok) throw new Error("Search request failed");
    return response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function fetchDetails(appid) {
  try {
    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
    const proxied = "https://corsproxy.io/?" + encodeURIComponent(url);
    const response = await fetch(proxied);
    if (!response.ok) throw new Error("Details request failed");
    const data = await response.json();
    const entry = data[appid];
    if (!entry || !entry.success) return null;

    let price = entry.data.price_overview ? entry.data.price_overview.final : 0;
    const currency = entry.data.price_overview ? entry.data.price_overview.currency : "USD";

    if (currency === "JPY") {
      price = price / 150;
    }

    if (price === 0) {
      if (entry.data.is_free === true) {
        price = 0;
      } else {
        price = "Out of Stock";
      }
    }

    return {
      appid,
      name: entry.data.name,
      header_image: entry.data.header_image,
      price,
      ccu: entry.data.ccu || 0
    };

  } catch (err) {
    console.error(err);
    return null;
  }
}

async function loadDefaultGames() {
  try {
    const top = await fetchTopSellers();
    const ids = top.slice(0, 60).map(g => g.id);

    const batchSize = 5;
    const results = [];

    for (let i = 0; i < ids.length; i += batchSize) {
      const batch = ids.slice(i, i + batchSize);
      const detailBatch = await Promise.all(batch.map(id => fetchDetails(id)));
      results.push(...detailBatch.filter(Boolean));
      await new Promise(res => setTimeout(res, 150));
    }

    exploreGames = results;
    originalGames = [...exploreGames];

  } catch (err) {
    console.error(err);
  }
}

async function loadSearchGames(query) {
  try {
    const results = await searchSteam(query);
    const details = await Promise.all(results.slice(0, 10).map(g => fetchDetails(g.appid)));
    exploreGames = details.filter(Boolean);
  } catch (err) {
    console.error(err);
  }
}

function renderExploreCards() {
  const gameList = document.getElementById("game-list");
  gameList.innerHTML = "";

  exploreGames.forEach(game => {
    const item = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h3");
    const price = document.createElement("p");

    img.src = game.header_image;
    img.alt = game.name;
    title.textContent = game.name;

    if (game.price === "Out of Stock") {
      price.textContent = "Out of Stock";
    } else {
      price.textContent = game.price > 0 ? `$${(game.price / 100).toFixed(2)}` : "Free";
    }

    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(price);
    gameList.appendChild(item);
  });
}

async function loadExploreGames() {
  try {
    await loadDefaultGames();
    renderExploreCards();
  } catch (err) {
    console.error(err);
  }
}

document.getElementById("search-button").addEventListener("click", async () => {
  try {
    const q = document.getElementById("search").value.trim();
    if (q.length === 0) {
      exploreGames = [...originalGames];
      renderExploreCards();
      return;
    }
    await loadSearchGames(q);
    renderExploreCards();
  } catch (err) {
    console.error(err);
  }
});

loadExploreGames();