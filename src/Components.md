## Layout
### Header

```html
<header id="header" class="header-wrap group">
  <div class="content absolute z-6 inset-0 bg-linear-to-b from-foreground to-transparent"></div>
  <div class="content h-full relative z-7 hidden xl:block">
    <div class="flex items-center justify-between gap-4 h-full">
      <nav class="nav-wrap">
        <a href="#" class="nav-link">Проєкти</a>
        <a href="#" class="nav-link">Блог</a>
        <a href="#" class="nav-link">Контакти</a>
      </nav>

      <a href="#" class="aspect-logo w-logo-lg">
        <img src="/img/common/logopng-sm.png" class="w-full" width="217" height="85" alt="">
      </a>

      <a href="tel:+380965558832" class="btn-primary">
        <span class="btn-primary-icon">
          <img src="/img/icons/btn-arrow.svg" width="24" height="24" alt="">
        </span>
        <span class="btn-primary-text">+380965558832</span>
      </a>
    </div>
  </div>
  <div id="header-mobile-content" class="header-mob-wrap">
    <div class="header-mob-top" id="headerTrigger">
      <div class="w-logo-sm aspect-logo">
        <img src="/img/common/logopng-sm.png" class="w-full" width="217" height="85" alt="">
      </div>
      <button type="button" class="size-12 group-[.mob-open]:hidden flex items-center justify-center">
        <img src="/img/icons/menu.svg" class="w-full" width="48" height="48" alt="">
      </button>
      <button type="button" class="hidden group-[.mob-open]:flex size-12 items-center justify-center">
        <img src="/img/icons/menu-close.svg" class="w-full" width="48" height="48" alt="">
      </button>
    </div>
    <div class="header-mob-inner">
      <nav class="nav-wrap w-full">
        <a href="#" class="nav-link">Проєкти</a>
        <a href="#" class="nav-link">Блог</a>
        <a href="#" class="nav-link">Контакти</a>
      </nav>

      <div class="header-contact">
        <p class="header-contact-text">Наш Email та номер телефону</p>
        <a class="header-contact-link" href="tel:+380965558832">+380965558832</a>
        <a class="header-contact-link" href="mailto:sapunova2025@gmail.com">sapunova2025@gmail.com</a>
      </div>

      <div class="header-button-wrap">
        <a href="tel:+380965558832" class="btn-primary --yellow">
          <span class="btn-primary-icon">
            <img src="/img/icons/btn-arrow.svg" width="24" height="24" alt="">
          </span>
          <span class="btn-primary-text">+380965558832</span>
        </a>
      </div>

      <div class="header-socials">
        <a href="#" class="header-socials-item">
          <span class="sr-only">SAPUNOVA - Facebook</span>
          <img src="/img/icons/soc-fb.svg" width="44" height="44" alt="Facebook">
        </a>
        <a href="#" class="header-socials-item">
          <span class="sr-only">SAPUNOVA - Instagram</span>
          <img src="/img/icons/soc-ig.svg" width="44" height="44" alt="Instagram">
        </a>
        <a href="#" class="header-socials-item">
          <span class="sr-only">SAPUNOVA - X</span>
          <img src="/img/icons/soc-x.svg" width="44" height="44" alt="X (Old Twitter)">
        </a>
      </div>
    </div>
    <!-- /.header-mob-inner -->
  </div>
  <!-- /#header-mobile-content -->
</header>
```
---
---




## Buttons
### Primary
```html
<a href="tel:+380965558832" class="btn-primary">
  <span class="btn-primary-icon">
    <img src="/img/icons/btn-arrow.svg" width="24" height="24" alt="">
  </span>
  <span class="btn-primary-text">+380965558832</span>
</a>
```
---
### Yellow Primary
```html
<a href="tel:+380965558832" class="btn-primary --yellow">
  <span class="btn-primary-icon">
    <img src="/img/icons/btn-arrow.svg" width="24" height="24" alt="">
  </span>
  <span class="btn-primary-text">+380965558832</span>
</a>
```
---
### Dark Primary
```html
<a href="#" class="btn-primary --dark">
  <span class="btn-primary-icon">
    <img src="/img/icons/btn-arrow-white.svg" width="24" height="24" alt="">
  </span>
  <span class="btn-primary-text">Обговорити цілі</span>
</a>
```

---

---