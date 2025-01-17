/**
 * @param {TokenConfig} app
 * @param {JQuery<HTMLElement>} $el
 * @param {object} data
 */
export function extendTokenConfig(app, $el) {
	$el.find("[name=mirrorX]").closest(".form-group").after(`
	<div class="form-group slim">
		<label>${game.i18n.localize("hex-size-support.tokenConfig.hideBorder.label")}</label>
		<div class="form-fields">
			<input type="checkbox" step="1" name="flags.hex-size-support.hideBorder" ${
				app.object.getFlag("hex-size-support", "hideBorder") ? "checked" : ""
			}>
		</div>
	</div>` +
				(game.settings.get("hex-size-support", "fillBorder")
					? `
	<div class="form-group slim">
		<label>${game.i18n.localize("hex-size-support.tokenConfig.hideFill.label")}</label>
		<div class="form-fields">
			<input type="checkbox" step="1" name="flags.hex-size-support.hideFill" ${
				app.object.getFlag("hex-size-support", "hideFill") ? "checked" : ""
			}>
		</div>
	</div>
	`
					: "")
		);

	let scale = $el.find("[name=scale]");
	scale.attr("max", Number(5.0));
	scale.attr("step", Number(0.01));
	// Re-apply the value to prevent the old step from rounding it
	scale.val(Math.abs(app.document.texture.scaleX));

	app.setPosition();
}
