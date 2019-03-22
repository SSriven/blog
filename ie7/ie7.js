/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'sriven\'">' + entity + '</span>' + html;
	}
	var icons = {
		'srivenIcon-uniE90F': '&#xe90f;',
		'srivenIcon-4': '&#xe910;',
		'srivenIcon--': '&#xe911;',
		'srivenIcon-5': '&#xe912;',
		'srivenIcon-6': '&#xe913;',
		'srivenIcon-7': '&#xe916;',
		'srivenIcon-8': '&#xe917;',
		'srivenIcon-9': '&#xe918;',
		'srivenIcon-2svg': '&#xe902;',
		'srivenIcon-3': '&#xe903;',
		'srivenIcon-2': '&#xe904;',
		'srivenIcon-1': '&#xe908;',
		'srivenIcon-uniE90B': '&#xe90b;',
		'srivenIcon-qq': '&#xe900;',
		'srivenIcon-uniE907': '&#xe907;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/srivenIcon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
