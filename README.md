# Tailwind CSS fluid

Brings fluid typography & spacing to Tailwind.

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

Now you can use the `fluid:` modifier in your classes.

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

## Options

```js
module.exports = {
  plugins: [
    require('@martijn.cuppens/tailwindcss-fluid')({
      minimum: 1.25,         // Minimum size that needs fluid rescaling (in rem).
      breakpoint: 1200,      // Max screen width where the fluid rescaling is applied to (in px).
      factor: 10,            // Strength of resizing.
      twoDimensional: false, // Set to true if you want to resize to the smallest size of your device.
      unitPrecision: 5,      // Rounding accuracy for calculated fluid resizing.
      remValue: 16,          // Value of 1rem, needed for calculations.
    }),
  ],
}
```

## Demo

[Demo on Tailwind Play](https://play.tailwindcss.com/Xk2FSQgCvM)
