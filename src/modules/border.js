export function registerBorderWrappers() {
	// Make gridless tokens round
	libWrapper.register(
		"hex-size-support",
		"Token.prototype.getShape",
		/** @this {Token} */
		function (wrapped) {
			const size = this.getSize();
			if (canvas.grid.isGridless && size.width === size.height) {
				return new PIXI.Circle(size.width / 2, size.height / 2, size.width / 2);
			}
			return wrapped();
		},
		"MIXED"
	);

	libWrapper.register(
		"hex-size-support",
		"Token.prototype._refreshState",
		/** @this {Token} */
		function (wrapped) {
			/** @type {boolean} */
			const hideBorder = this.document.getFlag("hex-size-support", "hideBorder");
			const hideFill = this.document.getFlag("hex-size-support", "hideFill");
			wrapped();
			if (this.hover && game.settings.get("hex-size-support", "borderBehindToken")) {
				this.addChildAt(this.voidMesh, this.getChildIndex(this.border) + 1);
				this.zIndex = this.mesh.zIndex = 2;
			}
			if (game.settings.get("hex-size-support", "alwaysShowBorder")) {
				this.border.visible = !this.document.isSecret;
			}
			const fillMode = game.settings.get("hex-size-support", "fillBorder");
			switch (fillMode) {
				case "control":
					this.borderFill.visible = this.controlled;
					break;
				case "always":
					this.borderFill.visible = !this.document.isSecret;
					break;
				case "hover":
					this.borderFill.visible = this.hover || this.layer.highlightObjects;
					break;
				case "owner_hov":
					this.borderFill.visible = this.isOwner && (this.hover || this.layer.highlightObjects);
					break;
				case "owner":
					this.borderFill.visible = this.isOwner;
				case "none":
				default:
					this.borderFill.visible = false;
					break;
			}
			this.borderFill.tint = this._getBorderColor.call({
				isOwner: this.isOwner,
				controlled: false,
				document: this.document,
				actor: this.actor,
			});
			if (hideBorder) this.border.visible = false;
			if (hideFill) this.borderFill.visible = false;
		},
		"WRAPPER"
	);

	// Add layer for border fill
	libWrapper.register(
		"hex-size-support",
		"Token.prototype._draw",
		/** @this {Token} */
		async function (wrapped, options) {
			await wrapped(options);
			this.borderFill ||= this.addChildAt(new PIXI.Graphics(), 0);
		},
		"WRAPPER"
	);
	libWrapper.register(
		"hex-size-support",
		"Token.prototype._refreshBorder",
		/** @this {Token} */
		function (wrapped) {
			wrapped();
			if (game.settings.get("hex-size-support", "fillBorder") === "none") return;
			this.borderFill.clear();
			this.borderFill.beginFill(0xffffff, 0.3);
			this.borderFill.drawShape(this.shape);
		},
		"WRAPPER"
	);
}
