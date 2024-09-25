# Tailwind CSS fluid

Brings fluid typography & spacing to Tailwind CSS.

## Installation

Add the package:

```shell
npm install @martijn.cuppens/tailwindcss-fluid
```

Add the plugin in your Tailwind config:

```js
module.exports = {
  plugins: [
    require('@martijn.cuppens/tailwindcss-fluid'),
  ],
}
```

Now you can use the `fluid:` modifier in your classes. If you want to use the rescaling without `fluid:` modifier, skip to the [without modifier](#without-modifier-new-in-v2) section.

## What does it do?

With tailwind CSS fluid you can use `fluid:` classes to use fluid rescaling in your web application. This will make lots of responsive modifier classes redundant. For example the following example:

```html
<section class="py-8 md:py-16 xl:py-20">
  <h2 class="text-5xl md:text-6xl xl:text-7xl">
    Title
  </h2>
  <h3 class="text-4xl md:text-5xl xl:text-6xl">
    Subtitle
  </h3>
</section>
```

can be simplified to:

```html
<section class="fluid:py-20">
  <h2 class="fluid:text-7xl">
    Title
  </h2>
  <h3 class="fluid:text-6xl">
    Subtitle
  </h3>
</section>
```

## Without modifier (new in [v2](https://github.com/MartijnCuppens/tailwind-fluid/releases/tag/v2.0.0))

If you prefer not to use the modifier, but instead want `padding`, `margin`, `gap`, and `font-size` to rescale by default, you can use the **PostCSS** plugin which is included. You'll need to add `@martijn.cuppens/tailwindcss-fluid/auto` to your PostCSS config. Make sure to add it after `tailwindcss`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    '@martijn.cuppens/tailwindcss-fluid/auto': {},
    autoprefixer: {},
  }
}
```

### Result

With this option enabled, you'll be able to leave out the `fluid:` prefix:

```html
<section class="py-8 md:py-16 xl:py-20">
  <h2 class="text-5xl md:text-6xl xl:text-7xl">
    Title
  </h2>
  <h3 class="text-4xl md:text-5xl xl:text-6xl">
    Subtitle
  </h3>
</section>
```

can be simplified to:

```html
<section class="py-20">
  <h2 class="text-7xl">
    Title
  </h2>
  <h3 class="text-6xl">
    Subtitle
  </h3>
</section>
```

Sweet 🤤

## Container based resizing

You can use the fluid rescaling in combination with container queries. Like [@tailwindcss/container-queries
](https://github.com/tailwindlabs/tailwindcss-container-queries), you can use the `@container` wrappers, but instead of defining each sm/md/lg breakpoint, you can just use the `@container` variant. I highly recommend to use named containers to avoid unwanted inheritance of parent containers.

```html
<section class="@container/widget">
  <h2 class="@container/widget:text-7xl">
    This title will rescale to the size of `.@container/widget`
  </h2>
  <p>
    ...
  </p>
</section>
```

## Options

### Tailwind plugin options

```js
module.exports = {
  plugins: [
    require('@martijn.cuppens/tailwindcss-fluid')({
      minimum: 1.5,     // Minimum size that needs fluid rescaling (in rem).
      breakpoint: 1200, // Max screen width where the fluid rescaling is applied to (in px).
      unitPrecision: 5, // Rounding accuracy for calculated fluid resizing.
      remValue: 16,     // Value of 1rem, needed for calculations.
    }),
  ],
}
```

## Configuring the PostCSS plugin

You can add more properties that rescale to the `properties` array. Properties are checked with a `startsWith()` test. This way you don't need to add `padding-top`, `padding-right`,... but can instead just use `padding`.

```js
module.exports = {
  plugins: {
    '@martijn.cuppens/tailwindcss-fluid/auto': { properties: ['font-size', 'width', 'height', 'padding'] },
  }
}

```

## Demo (without PostCSS plugin)

[Demo on Tailwind Play](https://play.tailwindcss.com/Xk2FSQgCvM)
