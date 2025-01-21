# Token Border Supplements 

Formerly Hex Token Size Support

A Foundry VTT add-on module that enhances how token borders are displayed allowing improved visual clarity, especially for large tokens on hexagonal grids.

# Installation

Search for Token Border Supplements in the foundry module browser.

# How it works

This module provides several options for the display of borders in settings. On gridless scenes, square tokens are changed to circular. 

## Module Configuration

* **Always Show Border** - Always render the token's border. Defaults to `false`.
* **Border Width** - Set the border width for tokens. Defaults to the Foundry default value of 4.
* **Keep Border Behind Token** - Force the border to render behind the token. Defaults to `false`.
* **Fill Border Contents** - Add a translucent fill to the token's border. This can be conditionally shown with the same modes as token names and bars. Defaults to `Never`.

Additionally, there are colorpicker settings in order to set the border color for tokens depending on their current state and affiliation. Color configuation is per-client.

## Token Appearance Settings

* **Hide Border** - When **Always Show Border** is enabled, this setting allows the token to override it. Defaults to false.
* **Hide Border Fill** - When **Fill Border Contents** is enabled, this setting hides it for just this token. Defaults to false.

### Older Versions
* [V10-11 Readme](https://codeberg.org/Bolts/hex-size-support/src/tag/v3.2/README.md)
* [V9 Readme](https://codeberg.org/Bolts/hex-size-support/src/tag/v1.3.0/README.md)
