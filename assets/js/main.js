/**
* Template Name: Craftivo
* Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
* Updated: Oct 04 2025 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint === 'undefined') return;
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof imagesLoaded !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        if (typeof Isotope === 'undefined') return;
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) {
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
        }
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let configEl = swiperElement.querySelector(".swiper-config");
      if (!configEl) return;
      let config = {};
      try {
        config = JSON.parse(configEl.innerHTML.trim());
      } catch(e) { console.warn('Invalid Swiper config JSON', e); }

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config); // if you use this elsewhere
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(el).scrollMarginTop;
          window.scrollTo({
            top: el.offsetTop - parseInt(scrollMarginTop || '0', 10),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /* ==========================================================
     BLOG System (detail pages + slider links)
     ========================================================== */

  // 1) Blog registry (Kubernetes intentionally excluded)
  const BLOGS = [
    {
      slug: 'blog-terraform-modules',
      title: 'Building Reusable Terraform Modules for AWS',
      href: 'blog-terraform-modules.html',
      tags: ['terraform','aws','iac']
    },
    {
      slug: 'blog-secure-cicd-jenkins-docker',
      title: 'Implementing Secure CI/CD Pipelines with Jenkins & Docker',
      href: 'blog-secure-cicd-jenkins-docker.html',
      tags: ['cicd','jenkins','docker','devsecops']
    },
    {
      slug: 'blog-cloud-migration-strategies',
      title: 'Strategies for Successful Cloud Migration',
      href: 'blog-cloud-migration-strategies.html',
      tags: ['cloud','migration','aws','azure']
    },
    {
      slug: 'blog-monitoring-vs-observability',
      title: 'Monitoring vs Observability',
      href: 'blog-monitoring-vs-observability.html',
      tags: ['monitoring','observability','otel']
    }
  ];

  // 2) Helper utils
  function slugify(txt) {
    return (txt || '')
      .toLowerCase()
      .replace(/&/g,' and ')
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/^-+|-+$/g,'');
  }

  function findBlogByText(text) {
    const s = slugify(text);
    return BLOGS.find(b => s.includes(slugify(b.title)) || s.includes(b.slug)) || null;
  }

  // 3) Hydrate slider cards: add correct "Read more" links
  //    Works with either .blog-card or any element having [data-blog-link]
  function hydrateBlogSliderLinks() {
    const cards = document.querySelectorAll('.blog-card, [data-blog-link]');
    cards.forEach(card => {
      const titleEl = card.querySelector('.blog-title, h3, h4, .card-title');
      const linkEl = card.querySelector('a.blog-link, a.read-more, a[href="#"], a[href="javascript:void(0)"]') || card.querySelector('a');
      if (!titleEl || !linkEl) return;

      const blog = findBlogByText(titleEl.textContent.trim());
      if (!blog) return; // silently ignore non-registered cards (e.g., Kubernetes)

      linkEl.setAttribute('href', blog.href);
      linkEl.setAttribute('aria-label', `Read ${blog.title}`);
    });
  }
  window.addEventListener('load', hydrateBlogSliderLinks);

  // 4) Blog detail enhancements (run on each blog detail page)
  function enhanceBlogDetailPage() {
    // Detect presence of an article body
    const article = document.querySelector('article, .service-details .col-lg-8');
    if (!article) return;

    // 4a) Add anchor links to headings (h2/h3) for shareable deep links
    const headings = article.querySelectorAll('h2, h3');
    headings.forEach(h => {
      if (!h.id) h.id = slugify(h.textContent);
      // Skip if an anchor already exists
      if (h.querySelector('.anchor-link')) return;
      const a = document.createElement('a');
      a.href = `#${h.id}`;
      a.className = 'anchor-link';
      a.innerHTML = '<i class="bi bi-link-45deg" aria-hidden="true"></i>';
      a.style.marginLeft = '8px';
      a.setAttribute('aria-label', 'Copy section link');
      a.addEventListener('click', function(e) {
        // Copy to clipboard on click
        e.preventDefault();
        const url = `${location.origin}${location.pathname}#${h.id}`;
        navigator.clipboard?.writeText(url);
        a.classList.add('text-success');
        setTimeout(() => a.classList.remove('text-success'), 900);
        history.replaceState(null, '', `#${h.id}`);
      });
      h.appendChild(a);
    });

    // 4b) Optional: auto Table of Contents if a container exists
    const toc = document.querySelector('[data-toc], #toc');
    if (toc) {
      const list = document.createElement('ol');
      list.className = 'list-unstyled';
      headings.forEach(h => {
        const li = document.createElement('li');
        li.style.marginBottom = '8px';
        li.innerHTML = `<a href="#${h.id}">${h.textContent.replace(/\s*$/,'')}</a>`;
        list.appendChild(li);
      });
      toc.innerHTML = '';
      toc.appendChild(list);
    }

    // 4c) Reading time (place result into #reading-time if present)
    const readingTimeEl = document.querySelector('#reading-time, [data-reading-time]');
    if (readingTimeEl) {
      const text = article.innerText || '';
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));
      readingTimeEl.textContent = `${minutes} min read`;
    }

    // 4d) “Copy link” and social share (elements with [data-share] optional)
    const shareWrap = document.querySelector('[data-share]');
    if (shareWrap) {
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent(document.title);
      shareWrap.innerHTML = `
        <button class="btn btn-sm btn-outline-secondary me-2" data-copy-link>
          <i class="bi bi-clipboard"></i> Copy link
        </button>
        <a class="btn btn-sm btn-outline-primary me-2" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}">
          <i class="bi bi-twitter-x"></i> Tweet
        </a>
        <a class="btn btn-sm btn-outline-primary me-2" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}">
          <i class="bi bi-linkedin"></i> Share
        </a>
      `;
      shareWrap.querySelector('[data-copy-link]')?.addEventListener('click', () => {
        navigator.clipboard?.writeText(window.location.href);
      });
    }

    // 4e) Code blocks: add “Copy” button
    article.querySelectorAll('pre > code').forEach(code => {
      const pre = code.parentElement;
      pre.style.position = 'relative';
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm btn-outline-light';
      btn.textContent = 'Copy';
      btn.style.position = 'absolute';
      btn.style.top = '8px';
      btn.style.right = '8px';
      btn.addEventListener('click', () => {
        const text = code.innerText;
        navigator.clipboard?.writeText(text);
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 1000);
      });
      pre.appendChild(btn);
    });
  }

  // Run on load for detail pages
  window.addEventListener('load', enhanceBlogDetailPage);

})();
