const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require("markdown-it");

const { 
  getAllPosts, 
  getMiscPosts,
  getDreamPosts,
  getRandomDreamPosts,
  getCategoryList,
  getCategorisedPosts,
  getSketchPosts
} = require('./config/collections')

const { 
  readableDate 
} = require('./config/filters')

const { 
  imageShortcode 
} = require('./config/shortcodes')


module.exports = function(eleventyConfig) {

  const md = new markdownIt({
    html: true
  });
  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  
  /*================================*/
  /*   plugins and configurations   */
  /*================================*/
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
  })

  /*===================================================*/
  /* files that need to be copied to the build folder  */
  /*===================================================*/
  eleventyConfig.addPassthroughCopy('./src/assets/social-image.jpg')
  eleventyConfig.addPassthroughCopy('./src/assets/icons')
  eleventyConfig.addPassthroughCopy('./src/assets/sprite.svg')
  eleventyConfig.addPassthroughCopy({
      'node_modules/svg-icon-sprite/dist/svg-icon-sprite.js': 'assets/svg-icon-sprite.js'
  })


  /*=================*/
  /*     Layouts     */
  /*=================*/
  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('home', 'layouts/home')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')
  eleventyConfig.addLayoutAlias('dream', 'layouts/dream')
  eleventyConfig.addLayoutAlias('gallery', 'layouts/gallery')
  eleventyConfig.addLayoutAlias('blurb', 'layouts/blurb')


  /*=================*/
  /*   Collections   */
  /*=================*/
  eleventyConfig.addCollection('misc', getMiscPosts)
  eleventyConfig.addCollection('blog', getAllPosts)
  eleventyConfig.addCollection('dreams', getDreamPosts)
  eleventyConfig.addCollection('randomdreams', getRandomDreamPosts)
  eleventyConfig.addCollection('sketch', getSketchPosts)
  eleventyConfig.addCollection('categoryList', getCategoryList)
  eleventyConfig.addCollection('categorisedPosts', getCategorisedPosts)

  
  /*=================*/
  /*     Filters     */
  /*=================*/
  eleventyConfig.addFilter('readableDate', readableDate)
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  /*=================*/
  /*    shortcodes   */
  /*=================*/
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)



  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  }
}