const aliases = (prefix = `src`) => ({
	"@fuse": `${prefix}/@fuse`,
	"@history": `${prefix}/@history`,
	"@lodash": `${prefix}/@lodash`,
	"@mock-api": `${prefix}/@mock-api`,
	"app/store": `${prefix}/app/store`,
	"app/api": `${prefix}/app/api`,
	"app/shared-components": `${prefix}/app/shared-components`,
	"app/configs": `${prefix}/app/configs`,
	"app/theme-layout": `${prefix}/app/theme-layout`,
	"app/AppContext": `${prefix}/app/AppContext`,
	translations: `${prefix}/translations`,
	utils: `${prefix}/utils`,
});

module.exports = aliases;
