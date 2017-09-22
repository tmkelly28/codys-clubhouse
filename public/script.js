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
  var goingStatus = {
    yes: 'Yay! See you there!',
    no: 'Aww! No worries - we\'ll catch up soon!'
  }
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
    var $main = $('#main-wrapper')
    var $rsvp = $('#rsvp')
    var $rsvpForm = $('#rsvp-form')
    var $back = $('.back-btn')
    var $form = $('form')
    var $submit = $('#submit')
    var $going = $('#going')
    var $goingMessage = $('#going-message')
    $rsvp.on('click', function () {
      $main.fadeOut(function () {
        $rsvpForm.fadeIn()
      })
    })
    $back.on('click', function () {
      $going.fadeOut()
      $rsvpForm.fadeOut(function () {
        $main.fadeIn()
      })
    })
    $submit.on('click', function () {
      var data = $form.serializeArray()
      $.post('/rsvp', data)
        .then(function () {
          $goingMessage.text(goingStatus[data[3].value])
          $rsvpForm.fadeOut(function () {
            $going.fadeIn()
          })
        })
        .catch(function () {
          $goingMessage.text('Oh man, something went wrong. Computers, am I right? Please try again, if you don\'t mind. If it still doesn\'t work, please email us directly!')
          $rsvpForm.fadeOut(function () {
            $going.fadeIn()
          })
        })
    })
    main($('#fader'), 0)
  })
})(window.$)
