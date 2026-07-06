<template>
  <svg
    class="ornament-garland"
    viewBox="0 0 360 78"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M40 0 L40 20" fill="none" stroke="currentColor" stroke-width="1.2" />
    <path d="M110 0 L110 30" fill="none" stroke="currentColor" stroke-width="1.2" />
    <path d="M180 0 L180 16" fill="none" stroke="currentColor" stroke-width="1.2" />
    <path d="M250 0 L250 26" fill="none" stroke="currentColor" stroke-width="1.2" />
    <path d="M320 0 L320 18" fill="none" stroke="currentColor" stroke-width="1.2" />

    <path
      d="M40 20 L40 34 M31 27 L49 27 M34 20 L46 34 M46 20 L34 34"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    />

    <circle cx="110" cy="39" r="10" fill="none" stroke="currentColor" stroke-width="1.6" />
    <path d="M100 39 L120 39 M110 29 L110 49" stroke="currentColor" stroke-width="0.9" />

    <path
      d="M180 16 L185 25 L180 34 L175 25 Z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    />
    <path d="M180 20 L180 30" stroke="currentColor" stroke-width="0.9" />

    <path
      d="M250 26
         L262 26
         C 262 36, 258 46, 250 50
         C 242 46, 238 36, 238 26
         Z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    />
    <path d="M242 26 L242 33 M250 26 L250 36 M258 26 L258 33" stroke="currentColor" stroke-width="0.8" />

    <path
      d="M320 18
         C 312 22, 310 32, 320 37
         C 330 32, 328 22, 320 18 Z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
    />
    <circle cx="320" cy="41" r="2.4" fill="currentColor" />

    <g stroke="currentColor" stroke-width="1">
      <path d="M70 10 L70 20 M64 15 L76 15 M66 11 L74 19 M74 11 L66 19" />
      <path d="M150 6 L150 14 M145 10 L155 10 M147 7 L153 13 M153 7 L147 13" />
      <path d="M290 8 L290 16 M285 12 L295 12 M287 9 L293 15 M293 9 L287 15" />
    </g>
  </svg>
</template>

<style scoped>
.ornament-garland {
  width: 260px;
  max-width: 65vw;
  height: auto;
  color: var(--gold-text);
  opacity: 0.85;
}
</style>
