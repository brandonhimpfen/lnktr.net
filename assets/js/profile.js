document.addEventListener("DOMContentLoaded", function () {
  initShareButton();
  initSupportPanel();
  initProfileTabs();
  initCopyButtons();
  initShopCollections();
});

function initShareButton() {
  var shareBtn = document.getElementById("shareBtn");
  if (!shareBtn) return;

  shareBtn.addEventListener("click", async function () {
    var shareData = {
      title: document.title,
      text: "Check out this profile",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {}
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      flashButtonText(shareBtn, "Copied");
    } catch (e) {
      flashButtonText(shareBtn, "Failed");
    }
  });
}

function initSupportPanel() {
  var supportToggle = document.getElementById("supportToggle");
  var supportPanelWrap = document.getElementById("supportPanelWrap");
  if (!supportToggle || !supportPanelWrap) return;

  supportToggle.addEventListener("click", function () {
    var isOpen = supportPanelWrap.classList.toggle("open");
    supportToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initProfileTabs() {
  var linksToggle = document.getElementById("linksToggle");
  var shopToggle = document.getElementById("shopToggle");
  var linksView = document.getElementById("linksView");
  var shopCollectionsView = document.getElementById("shopCollectionsView");
  var productsView = document.getElementById("productsView");
  var shopNote = document.querySelector("[data-shop-note]");

  if (!linksToggle || !linksView) return;

  function showLinks() {
    linksToggle.classList.add("active");
    linksView.classList.remove("d-none");

    if (shopToggle) shopToggle.classList.remove("active");
    if (shopCollectionsView) shopCollectionsView.classList.add("d-none");
    if (productsView) productsView.classList.add("d-none");
    if (shopNote) shopNote.classList.add("d-none");
  }

  function showShop() {
    if (!shopToggle || !shopCollectionsView) return;
    shopToggle.classList.add("active");
    linksToggle.classList.remove("active");
    linksView.classList.add("d-none");
    if (productsView) productsView.classList.add("d-none");
    shopCollectionsView.classList.remove("d-none");
    if (shopNote) shopNote.classList.remove("d-none");
  }

  linksToggle.addEventListener("click", showLinks);
  if (shopToggle) shopToggle.addEventListener("click", showShop);

  showLinks();
}

function initCopyButtons() {
  var buttons = document.querySelectorAll(".lnktr-copy-btn");
  if (!buttons.length) return;

  buttons.forEach(function (button) {
    button.addEventListener("click", async function (event) {
      event.stopPropagation();
      var value = button.getAttribute("data-copy-value");
      var originalText = button.textContent;

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "Copied";
        button.classList.add("copied");
      } catch (e) {
        button.textContent = "Failed";
      }

      setTimeout(function () {
        button.textContent = originalText;
        button.classList.remove("copied");
      }, 1600);
    });
  });
}

function initShopCollections() {
  var collectionButtons = document.querySelectorAll("[data-collection]");
  var shopCollectionsView = document.getElementById("shopCollectionsView");
  var productsView = document.getElementById("productsView");
  var productsGrid = document.getElementById("productsGrid");
  var productsCollectionTitle = document.getElementById("productsCollectionTitle");
  var productsCollectionCount = document.getElementById("productsCollectionCount");
  var backToCollections = document.getElementById("backToCollections");

  if (!collectionButtons.length || !productsView || !productsGrid) return;

  collectionButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var raw = button.getAttribute("data-collection");
      if (!raw) return;

      var collection;
      try {
        collection = JSON.parse(raw);
      } catch (e) {
        return;
      }

      productsCollectionTitle.textContent = collection.name || "Collection";
      productsCollectionCount.textContent = (collection.products ? collection.products.length : 0) + " products";

      var html = "";
      (collection.products || []).forEach(function (product) {
        html += '<div class="col-6 mb-3">';
        html += '  <a href="' + escapeHtmlAttr(product.url || "#") + '" class="lnktr-product-card">';
        html += '    <img src="' + escapeHtmlAttr(product.image || "") + '" alt="' + escapeHtmlAttr(product.name || "Product") + '" class="lnktr-product-image" loading="lazy">';
        html += '    <span class="lnktr-card-info">';
        html += '      <span class="lnktr-card-title">' + escapeHtmlText(product.name || "Product") + '</span>';
        html += '    </span>';
        html += '  </a>';
        html += '</div>';
      });

      productsGrid.innerHTML = html;
      shopCollectionsView.classList.add("d-none");
      productsView.classList.remove("d-none");
    });
  });

  if (backToCollections) {
    backToCollections.addEventListener("click", function () {
      productsView.classList.add("d-none");
      shopCollectionsView.classList.remove("d-none");
    });
  }
}

function flashButtonText(button, text) {
  var icon = button.querySelector("i");
  if (!icon) return;
  var originalClass = icon.className;
  icon.className = "fas fa-check";
  button.setAttribute("aria-label", text);

  setTimeout(function () {
    icon.className = originalClass;
    button.setAttribute("aria-label", "Share profile");
  }, 1400);
}

function escapeHtmlText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeHtmlAttr(value) {
  return escapeHtmlText(value);
}
