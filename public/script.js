(function ($) {
  var quips = [
    'Get married',
    'Are really excited about filing jointly',
    'Totally aren\'t being forced to do this',
    'Pug tested, Cody approved',
    'Lowered expectations, increased ABV',
    'Are both Cody\'s real dad',
    'Sponsored by...beer',
    'What\'s next? Cats marrying dogs?',
    'Ruin marriage for the rest of us'
  ]
  var len = quips.length
  var max = len * 10
  var slow = 3000

  function main (el, idx) {
    el.text(quips[idx % len])
    el.fadeIn(slow, function () {
      el.fadeOut(slow, function () {
        main(el, idx >= max ? 0 : idx + 1)
      })
    })
  }

  $(function () {
    main($('#fader'), 0)
  })
})(window.$)
