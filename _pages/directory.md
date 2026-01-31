---
layout: page
title: Directory
description: Browse profiles and projects.
permalink: /directory/
body_class: page-directory
---

<div class="directory-controls">
  <div class="form-group mb-3">
    <label for="directorySearch" class="sr-only">Search profiles</label>
    <input id="directorySearch" type="search" class="form-control" placeholder="Search profiles…" autocomplete="off">
  </div>
</div>

<div id="directoryGrid" class="row directory-grid">
  {% assign items = site.posts | sort: 'title' %}
  {% for post in items %}
    {% assign avatar = post['profile-pic'] %}
    {% assign intro = post.intro %}
    {% assign slug = post.slug %}
    <div class="col-12 col-md-6 col-lg-4 directory-item" data-title="{{ post.title | downcase }}" data-slug="{{ slug | downcase }}" data-intro="{{ intro | downcase }}">
      <a class="directory-card" href="{{ post.url | relative_url }}">
        <div class="directory-card-inner">
          {% if avatar %}
            <img class="directory-avatar" src="{{ avatar }}" alt="{{ post.title }}">
          {% else %}
            <div class="directory-avatar directory-avatar--placeholder" aria-hidden="true"></div>
          {% endif %}

          <div class="directory-meta">
            <div class="directory-title">{{ post.title }}</div>
            <div class="directory-handle">@{{ slug }}</div>
            {% if intro %}
              <div class="directory-intro">{{ intro }}</div>
            {% endif %}
          </div>
        </div>
      </a>
    </div>
  {% endfor %}
</div>

<script>
(function () {
  var input = document.getElementById('directorySearch');
  var items = Array.prototype.slice.call(document.querySelectorAll('.directory-item'));

  function normalize(s) {
    return (s || '').toString().toLowerCase().trim();
  }

  function filter() {
    var q = normalize(input.value);
    items.forEach(function (el) {
      var hay = (el.getAttribute('data-title') || '') + ' ' + (el.getAttribute('data-slug') || '') + ' ' + (el.getAttribute('data-intro') || '');
      el.style.display = hay.indexOf(q) !== -1 ? '' : 'none';
    });
  }

  if (input) {
    input.addEventListener('input', filter);
  }
})();
</script>
