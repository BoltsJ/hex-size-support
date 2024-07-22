export function registerGridWrapper() {
	libWrapper.register(
		"hex-size-support",
		"BaseGrid.implementationFor",
		/** @param {number} grid_type */
		function (wrapped, grid_type) {
			const types = CONST.GRID_TYPES;
			if ([types.HEXEVENR, types.HEXODDR, types.HEXEVENQ, types.HEXODDQ].includes(grid_type))
				return HSSHexagonalGrid;
			return wrapped(grid_type);
		},
		"MIXED"
	);
}

/**
 * Borders are defined by an array of point arrays. All of the points in the
 * array are normalized to the size of the bounding box around the token, so
 * 0,0 is the top left corner, and 1,1 is the bottom right. The points are
 * automatically scaled and shifted as necessary by foundry.
 */
const BORDER_EXTENSIONS = {
	POINTY: {
		5: [
			[0, 7 / 16],
			[1 / 10, 6 / 16],
			[1 / 10, 4 / 16],
			[2 / 10, 3 / 16],
			[2 / 10, 1 / 16],
			[3 / 10, 0],
			[4 / 10, 1 / 16],
			[5 / 10, 0],
			[6 / 10, 1 / 16],
			[7 / 10, 0],
			[8 / 10, 1 / 16],
			[8 / 10, 3 / 16],
			[9 / 10, 4 / 16],
			[9 / 10, 6 / 16],
			[1, 7 / 16],
			[1, 9 / 16],
			[9 / 10, 10 / 16],
			[9 / 10, 12 / 16],
			[8 / 10, 13 / 16],
			[8 / 10, 15 / 16],
			[7 / 10, 1],
			[6 / 10, 15 / 16],
			[5 / 10, 1],
			[4 / 10, 15 / 16],
			[3 / 10, 1],
			[2 / 10, 15 / 16],
			[2 / 10, 13 / 16],
			[1 / 10, 12 / 16],
			[1 / 10, 10 / 16],
			[0, 9 / 16],
		],
		6: [
			[0, 7 / 19],
			[1 / 12, 6 / 19],
			[1 / 12, 4 / 19],
			[2 / 12, 3 / 19],
			[2 / 12, 1 / 19],
			[3 / 12, 0],
			[4 / 12, 1 / 19],
			[5 / 12, 0],
			[6 / 12, 1 / 19],
			[7 / 12, 0],
			[8 / 12, 1 / 19],
			[9 / 12, 0],
			[10 / 12, 1 / 19],
			[10 / 12, 3 / 19],
			[11 / 12, 4 / 19],
			[11 / 12, 6 / 19],
			[1, 7 / 19],
			[1, 9 / 19],
			[11 / 12, 10 / 19],
			[11 / 12, 12 / 19],
			[10 / 12, 13 / 19],
			[10 / 12, 15 / 19],
			[9 / 12, 16 / 19],
			[9 / 12, 18 / 19],
			[8 / 12, 1],
			[7 / 12, 18 / 19],
			[6 / 12, 1],
			[5 / 12, 18 / 19],
			[4 / 12, 1],
			[3 / 12, 18 / 19],
			[3 / 12, 16 / 19],
			[2 / 12, 15 / 19],
			[2 / 12, 13 / 19],
			[1 / 12, 12 / 19],
			[1 / 12, 10 / 19],
			[0, 9 / 19],
		],
		7: [
			[0, 10 / 22],
			[1 / 14, 9 / 22],
			[1 / 14, 7 / 22],
			[2 / 14, 6 / 22],
			[2 / 14, 4 / 22],
			[3 / 14, 3 / 22],
			[3 / 14, 1 / 22],
			[4 / 14, 0],
			[5 / 14, 1 / 22],
			[6 / 14, 0],
			[7 / 14, 1 / 22],
			[8 / 14, 0],
			[9 / 14, 1 / 22],
			[10 / 14, 0],
			[11 / 14, 1 / 22],
			[11 / 14, 3 / 22],
			[12 / 14, 4 / 22],
			[12 / 14, 6 / 22],
			[13 / 14, 7 / 22],
			[13 / 14, 9 / 22],
			[1, 10 / 22],
			[1, 12 / 22],
			[13 / 14, 13 / 22],
			[13 / 14, 15 / 22],
			[12 / 14, 16 / 22],
			[12 / 14, 18 / 22],
			[11 / 14, 19 / 22],
			[11 / 14, 21 / 22],
			[10 / 14, 1],
			[9 / 14, 21 / 22],
			[8 / 14, 1],
			[7 / 14, 21 / 22],
			[6 / 14, 1],
			[5 / 14, 21 / 22],
			[4 / 14, 1],
			[3 / 14, 21 / 22],
			[3 / 14, 19 / 22],
			[2 / 14, 18 / 22],
			[2 / 14, 16 / 22],
			[1 / 14, 15 / 22],
			[1 / 14, 13 / 22],
			[0, 12 / 22],
		],
	},
	FLAT: {
		5: [
			[7 / 16, 0],
			[6 / 16, 1 / 10],
			[4 / 16, 1 / 10],
			[3 / 16, 2 / 10],
			[1 / 16, 2 / 10],
			[0, 3 / 10],
			[1 / 16, 4 / 10],
			[0, 5 / 10],
			[1 / 16, 6 / 10],
			[0, 7 / 10],
			[1 / 16, 8 / 10],
			[3 / 16, 8 / 10],
			[4 / 16, 9 / 10],
			[6 / 16, 9 / 10],
			[7 / 16, 1],
			[9 / 16, 1],
			[10 / 16, 9 / 10],
			[12 / 16, 9 / 10],
			[13 / 16, 8 / 10],
			[15 / 16, 8 / 10],
			[1, 7 / 10],
			[15 / 16, 6 / 10],
			[1, 5 / 10],
			[15 / 16, 4 / 10],
			[1, 3 / 10],
			[15 / 16, 2 / 10],
			[13 / 16, 2 / 10],
			[12 / 16, 1 / 10],
			[10 / 16, 1 / 10],
			[9 / 16, 0],
		],
		6: [
			[7 / 19, 0],
			[6 / 19, 1 / 12],
			[4 / 19, 1 / 12],
			[3 / 19, 2 / 12],
			[1 / 19, 2 / 12],
			[0, 3 / 12],
			[1 / 19, 4 / 12],
			[0, 5 / 12],
			[1 / 19, 6 / 12],
			[0, 7 / 12],
			[1 / 19, 8 / 12],
			[0, 9 / 12],
			[1 / 19, 10 / 12],
			[3 / 19, 10 / 12],
			[4 / 19, 11 / 12],
			[6 / 19, 11 / 12],
			[7 / 19, 1],
			[9 / 19, 1],
			[10 / 19, 11 / 12],
			[12 / 19, 11 / 12],
			[13 / 19, 10 / 12],
			[15 / 19, 10 / 12],
			[16 / 19, 9 / 12],
			[18 / 19, 9 / 12],
			[1, 8 / 12],
			[18 / 19, 7 / 12],
			[1, 6 / 12],
			[18 / 19, 5 / 12],
			[1, 4 / 12],
			[18 / 19, 3 / 12],
			[16 / 19, 3 / 12],
			[15 / 19, 2 / 12],
			[13 / 19, 2 / 12],
			[12 / 19, 1 / 12],
			[10 / 19, 1 / 12],
			[9 / 19, 0],
		],
		7: [
			[10 / 22, 0],
			[9 / 22, 1 / 14],
			[7 / 22, 1 / 14],
			[6 / 22, 2 / 14],
			[4 / 22, 2 / 14],
			[3 / 22, 3 / 14],
			[1 / 22, 3 / 14],
			[0, 4 / 14],
			[1 / 22, 5 / 14],
			[0, 6 / 14],
			[1 / 22, 7 / 14],
			[0, 8 / 14],
			[1 / 22, 9 / 14],
			[0, 10 / 14],
			[1 / 22, 11 / 14],
			[3 / 22, 11 / 14],
			[4 / 22, 12 / 14],
			[6 / 22, 12 / 14],
			[7 / 22, 13 / 14],
			[9 / 22, 13 / 14],
			[10 / 22, 1],
			[12 / 22, 1],
			[13 / 22, 13 / 14],
			[15 / 22, 13 / 14],
			[16 / 22, 12 / 14],
			[18 / 22, 12 / 14],
			[19 / 22, 11 / 14],
			[21 / 22, 11 / 14],
			[1, 10 / 14],
			[21 / 22, 9 / 14],
			[1, 8 / 14],
			[21 / 22, 7 / 14],
			[1, 6 / 14],
			[21 / 22, 5 / 14],
			[1, 4 / 14],
			[21 / 22, 3 / 14],
			[19 / 22, 3 / 14],
			[18 / 22, 2 / 14],
			[16 / 22, 2 / 14],
			[15 / 22, 1 / 14],
			[13 / 22, 1 / 14],
			[12 / 22, 0],
		],
	},
};

/**
 * Fixes orientation of size 2 and extends the hex borders with additional sizes
 */
export function extendHexBorders() {
	const pointy_borders = foundry.utils.deepClone(HexagonalGrid.POINTY_HEX_BORDERS);
	const flat_borders = foundry.utils.deepClone(HexagonalGrid.FLAT_HEX_BORDERS);

	// Flip the size 2 polygons
	pointy_borders[2] = pointy_borders[2].map(p => [p[0], 1 - p[1]]);
	flat_borders[2] = flat_borders[2].map(p => [1 - p[0], p[1]]);

	// Add any extra polygons
	HexagonalGrid.POINTY_HEX_BORDERS = {
		...pointy_borders,
		...BORDER_EXTENSIONS.POINTY,
	};
	HexagonalGrid.FLAT_HEX_BORDERS = {
		...flat_borders,
		...BORDER_EXTENSIONS.FLAT,
	};
}

/**
 * Determine whether the token should use the alternate orientation
 * @param {Token} token
 */
export function isAltOrientation(token) {
	return !!(
		game.settings.get("hex-size-support", "altOrientationDefault") ^
		(token.document.getFlag("hex-size-support", "alternateOrientation") ?? false)
	);
}

/**
 * Improve border support for hexagonal grids
 */
class HSSHexagonalGrid extends HexagonalGrid {
	/**
	 * Get a border polygon based on the width and height of a given token for
	 * the alternate orientation.
	 * @param {number} w  The width of the token in hexes.
	 * @param {number} h  The height of the token in hexes.
	 * @param {number} p  The padding size in pixels.
	 * @returns {number[]|null}
	 */
	getAltBorderPolygon(w, h, p) {
		// Flip the points if it's alternate orientation
		// this is the only real change from the foundry default
		const points = (
			this.columnar ? this.constructor.FLAT_HEX_BORDERS[w] : this.constructor.POINTY_HEX_BORDERS[w]
		)?.map(p => [1 - p[0], 1 - p[1]]);

		if (w !== h || !points) return null;
		const p2 = p / 2;
		const p4 = p / 4;
		({ width: w, height: h } = this.getRect(w, h));
		return this.getPolygon(-p4, -p4, w + p2, h + p2, points);
	}

	/**
	 * Implement special rules for snapping tokens of various sizes on a hex grid.
	 * @param {number} x     The X co-ordinate of the hexagon's top-left bounding box.
	 * @param {number} y     The Y co-ordinate of the hexagon's top-left bounding box.
	 * @param {Token} token  The token.
	 * @returns {[number, number]}
	 * @protected
	 */
	_adjustSnapForTokenSize(x, y, token) {
		if (token.document.height !== token.document.width)
			return super._adjustSnapForTokenSize(x, y, token);
		// Are we using alternate orentation? 1 = yes, 0 = no
		const alt_shape = isAltOrientation(token) ? 1 : 0;
		/** @type {number | undefined} */
		const token_size =
			token.document.width === token.document.height ? token.document.width : undefined;
		if (token_size <= 1) return super._adjustSnapForTokenSize(x, y, token);
		// Set grid offset based on size and orientation
		const shift_val = Math.floor((token_size + alt_shape - 1) / 2) % 2;
		if (this.columnar) y -= (shift_val * this.h) / 2;
		else x -= (shift_val * this.w) / 2;
		return [x, y];
	}

	/**
	 * Implement special rules for determining the grid position of tokens of various sizes on a hex grid.
	 * @param {number} row          The row number.
	 * @param {number} col          The column number.
	 * @param {Token} token         The token.
	 * @returns {[number, number]}  The adjusted row and column number.
	 * @protected
	 */
	_adjustPositionForTokenSize(row, col, token) {
		const size = token.document.height === token.document.width ? token.document.width : undefined;
		if (size) {
			const alt_shape = isAltOrientation(token) ? 1 : 0;
			const offset = Math.floor((size + alt_shape - 1) / 2) % 2;
			if (this.columnar) row += offset;
			if (!this.columnar) col += offset;
		}
		return [row, col];
	}

	/** @override
	 * @param {number} x
	 * @param {number} y
	 * @param {number} interval
	 * @param {object} obj
	 * @param {Token} obj.token
	 */
	getSnappedPosition(x, y, interval = 1, { token } = {}) {
		// Use the default behavior if we're not snapping a token
		if (!token) return super.getSnappedPosition(x, y, interval, { token });

		// Are we using alternate orentation? 1 = yes, 0 = no
		const alt_shape = isAltOrientation(token) ? 1 : 0;
		/** @type {number | undefined} */
		const token_size =
			token.document.width === token.document.height ? token.document.width : undefined;
		if (token_size === undefined || token_size <= 1)
			return super.getSnappedPosition(x, y, interval, { token });
		// Set grid offset based on size and orientation
		const shift_val = Math.floor((token_size + alt_shape - 1) / 2) % 2;
		if (this.columnar) y += (shift_val * this.h) / 2;
		else x += (shift_val * this.w) / 2;
		const offset = HexagonalGrid.pixelsToOffset({ x, y }, this.options, "round");
		const point = HexagonalGrid.offsetToPixels(offset, this.options);
		const [x0, y0] = this._adjustSnapForTokenSize(point.x, point.y, token);
		return { x: x0, y: y0 };
	}
}
