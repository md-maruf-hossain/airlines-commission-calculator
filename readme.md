# Fare Discount Calculator

A small tool I built for calculating net airfare charges after BSP discount, AIT, and service charge — the kind of calculation travel agents usually do in an Excel sheet, just faster and a lot nicer to look at.

## Why this exists

If you've worked with airline ticketing, you know the drill: base fare, taxes, a BSP discount percentage, AIT on top, sometimes a service charge — and you're doing this math over and over for every ticket. This app just takes those five numbers and gives you the final net charge instantly, without opening a spreadsheet.

## What it looks like

The design is built around a boarding-pass idea. Left side is where you punch in the numbers (like filling out a ticket), right side is a dark "departure board" that updates live as you type, with the final Net Charge Amount highlighted at the bottom. There's also a light/dark mode toggle in the header if you prefer working in the dark.

## How the math works

```
Total Airfare            = Base Fare + Total Taxes
BSP Discount Amount      = Base Fare × BSP Discount %
Air Fare after Discount  = Total Airfare − BSP Discount Amount
AIT Amount                = Total Airfare × AIT %
Net Charge Amount        = Air Fare after Discount + AIT Amount + Service Charge
```

Everything is in BDT (৳).

## Running it

No build step, no dependencies to install. Just open `index.html` in a browser. That's it.

## A couple of notes

- Defaults are pre-filled with sample numbers (Base Fare 8848, Taxes 2350, BSP 7%, AIT 0.3%) — change them or hit "Reset to defaults" anytime.
- The app opens in light mode by default. Dark mode only kicks in if you tap the toggle — it doesn't follow your system theme.
- Numbers animate smoothly when you change an input, instead of just snapping to the new value.

Built with plain HTML, CSS, and JavaScript — nothing fancy under the hood, just something that felt right for the job.